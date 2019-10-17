import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";
import ArticleListTable from "./articleListTable";
import Pagination from "../common/pagination";
import { paginate } from "../../utils/paginate";
import { getArticles, conditionQuery } from "../../services/articleService";

class Search extends Component {

    constructor(props) {
        super(props);
        this.changeInputValue = this.changeInputValue.bind(this);
    }

    state = {
        articles: [],
        currentPage: 1,
        pageSize: 5,
        sortColumn: [
            { path: "title", order: "asc" },
            { path: "status", order: "asc" },
            { path: "submitter", order: "asc" }
        ],
        queryCondition: {
            title: "",
            tags: "",
            submitter: ""
        }
    };

    async componentDidMount() {
        const { data: articles } = await getArticles();
        console.log('articles are: ', articles);
        this.setState({ articles });
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    changeInputValue = (e) => {
        this.state.queryCondition[e.target.name] = e.target.value;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        console.log('submitted query condition is: ', this.state.queryCondition);
        await conditionQuery(this.state.queryCondition).then((res) => {
            console.log(res.data);
            const articles = res.data;
            this.setState({ articles })
        }).catch((error) => {
            console.log(error);
        });
    }

    getPagedData = () => {
        const {
            pageSize,
            currentPage,
            sortColumn,
            articles: allArticles
        } = this.state;

        let fields = []
        let orders = []
        for (let i = 0; i < sortColumn.length; ++i) {
            fields.push(_.pick(sortColumn[i], ['path']));
            orders.push(_.pick(sortColumn[i], ['order']));
        }

        const sorted = _.orderBy(allArticles, fields, orders);
        const articles = paginate(sorted, currentPage, pageSize);
        return { totalCount: allArticles.length, data: articles };
    };

    render() {
        const { length: articlesCount } = this.state.articles;
        const { pageSize, currentPage, sortColumn } = this.state;

        if (articlesCount === 0) return <p>There are no article in the database</p>;

        const { totalCount, data } = this.getPagedData();

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-7">
                        <ArticleListTable
                            articles={data}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />
                        <p> Showing {totalCount} articles from the database</p>
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                    <div className="col-md-5">
                        <div style={{ border: "1px solid #17a2b8", padding: 0 }}>
                            <div className="text-left" style={{ color: "white", backgroundColor: "#17a2b8", padding: 10 }}>
                                <h4>Article query</h4>
                            </div>
                            <form className="form-horizontal" onSubmit={this.handleSubmit} style={{ width: "80%", margin: 'auto', padding: 10 }}>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label className="control-label">Title</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <input type="text" onChange={this.changeInputValue} className="form-control" name="title" placeholder="Title" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label className="control-label">Tags</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <input type="text" onChange={this.changeInputValue} className="form-control" name="tags" placeholder="Tags" />
                                        </div>
                                    </div>
                                    <p className="text-danger text-center" style={{ fontSize: 10 }}>*multiple tags are separated with comma</p>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <label className="control-label">Author</label>
                                        </div>
                                        <div className="col-sm-10">
                                            <input type="text" onChange={this.changeInputValue} className="form-control" name="submitter" placeholder="Author" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-info">Query</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default Search;