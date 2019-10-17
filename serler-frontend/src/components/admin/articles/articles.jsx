import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import auth from "../../../services/authService";
import _ from "lodash";
import ArticleTable from "./articleTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { getArticles, deleteArticle } from "../../../services/articleService";

class Article extends Component {
    state = {
        articles: [],
        currentPage: 1,
        pageSize: 5,
        sortColumn: [
            { path: "title", order: "asc" },
            { path: "status", order: "asc" },
            { path: "submitter", order: "asc" }
        ]
    };

    async componentDidMount() {
        const { data: articles } = await getArticles();
        this.setState({ articles });
    }

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    handleSort = sortColumn => {
        this.setState({ sortColumn });
    };

    handleDelete = async article => {
        const originalArticles = this.state.articles;
        const articles = originalArticles.filter(u => u._id !== article._id);
        this.setState({ articles });
        deleteArticle(article._id).then((res) => {
            toast.success('Delete successfully!', 3000, 'fa-check');
            setTimeout(() => {
                this.props.history.push("/admin/article");
            }, 5000);
        }).catch((ex) => {
            if (ex.response && ex.response.status === 404)
                toast.error("This article has already been deleted");
            if (ex.response && ex.response.status === 401)
                toast.error("Access Denied");
            if (ex.response && ex.response.status === 403)
                toast.error("Access Denied");
            if (ex.response && ex.response.status === 400) toast.error("Bad Request");
            this.setState({ statuses: originalArticles });
        });
    };

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
                <dir className="row">
                    <div className="col-md-3">
                        <div className="list-group">
                            <Link to="/admin/article" className="list-group-item active">Articles</Link>
                            <Link to="/Admin/article/publish" className="list-group-item">Publish</Link>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <ArticleTable
                            articles={data}
                            sortColumn={sortColumn}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        ></ArticleTable>
                        <p> Showing {totalCount} articles from the database</p>
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        ></Pagination>
                    </div>
                </dir>
            </div>
        );
    };
}

export default Article;