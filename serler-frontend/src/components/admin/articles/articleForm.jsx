import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";
import Form from "../../common/form";
import { getArticle, saveArticle } from "../../../services/articleService";


class ArticleForm extends Form {

    constructor(props) {
        super(props);
        this.changeInputValue = this.changeInputValue.bind(this);
    }

    state = {
        data: {
            title: "",
            content: "",
            tags: "",
            status: {},
            submitter: {},
            moderator: {},
            analyst: {},
            rejector: {},
            createdDate: ""
        },
        articles: [],
        errors: {}
    };

    async populateArticle() {
        try {
            const articleId = this.props.match.params.id;
            console.log('query id: ', articleId);
            if (articleId === "new") {
                return;
            }
            const { data: article } = await getArticle(articleId);
            //   console.log('query article: ', article);
            console.log('map to view model: ', this.mapToViewModel(article));
            this.setState({ data: this.mapToViewModel(article) });
        } catch (ex) {
            //    console.log('error...');
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        console.log('article form mount...');
        await this.populateArticle();
    }

    mapToViewModel(article) {
        let rs = {
            _id: article._id,
            title: article.title,
            content: article.content,
            tags: article.tags.join(';'),
            createdDate: article.createdDate
        };
        if (article.status) {
            rs.status = article.status.name;
        }
        if (article.submitter) {
            rs.submitter = article.submitter.name;
        }
        if (article.moderator) {
            rs.moderator = article.moderator.name;
        } else {
            rs.moderator = "";
        }
        if (article.analyst) {
            rs.analyst = article.analyst.name;
        } else {
            rs.analyst = "";
        }
        if (article.rejector) {
            rs.rejector = article.rejector.name;
        } else {
            rs.rejector = "";
        }
        console.log('result is: ', rs);
        return rs;
    }

    schema = {
        _id: Joi.string(),
        title: Joi.string()
          .required()
          .label("Title")
      };

    changeInputValue = (e) => {
        this.state.data[e.target.name] = e.target.value;
    }

    doSubmit = async () => {
        console.log('save info: ', this.state.data);
        await saveArticle(this.state.data);
        this.props.history.push("/admin/article");
    };

    submittHandle = async (e) => {
        e.preventDefault();
        let updatedInfo = _.pick(this.state.data, ['_id', 'title', 'tags', 'content']);
        if (updatedInfo.tags) {
            updatedInfo.tags = updatedInfo.tags.split(';');
        }
        console.log('save info: ', updatedInfo);
        saveArticle(updatedInfo).then((res) => {
            toast.success('Update successfully!', 3000, 'fa-check');
            setTimeout(() => {
                this.props.history.push("/admin/article");
            }, 5000);
        }).catch((error) => {
            toast.error('Delete error!', 3000, 'fa-times');
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container">
                <form className="form-horizontal" onSubmit={this.submittHandle} style={{ border: '1px solid #efefef', padding: 20 }}>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="control-label">Title</label>
                            </div>
                            <div className="col-sm-10">
                                <input name="content" required className="form-control" name="title" onChange={this.changeInputValue} defaultValue={this.state.data.title} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="control-label">Content</label>
                            </div>
                            <div className="col-sm-10">
                                <textarea name="content" className="form-control" onChange={this.changeInputValue} defaultValue={this.state.data.content}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="control-label">Tags<span className="text-danger" style={{ fontSize: 10 }}>(Multiple tags are separated with comma)</span></label>
                            </div>
                            <div className="col-sm-10">
                                <input name="content" className="form-control" name="tags" onChange={this.changeInputValue} defaultValue={this.state.data.tags} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="control-label">Status</label>
                            </div>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={this.state.data.status} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2 text-left">
                                <label className="control-label">Submitter</label>
                            </div>
                            <div className="col-sm-10 text-right">
                                <input type="text" className="form-control" value={this.state.data.submitter} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="control-label">Moderator</label>
                            </div>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={this.state.data.moderator} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="control-label">Analyst</label>
                            </div>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={this.state.data.analyst} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="control-label">Rejector</label>
                            </div>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" value={this.state.data.rejector} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="control-label">Created Date</label>
                            </div>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" disabled value={this.state.data.createdDate} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-6">
                                <Link to="/admin/article" className="btn btn-info">Back</Link>
                            </div>
                            <div className="col-sm-6">
                                <button className="btn btn-danger">Modify</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default ArticleForm;
