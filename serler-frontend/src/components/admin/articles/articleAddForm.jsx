import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import auth from "../../../services/authService";
import { saveArticle } from "../../../services/articleService";

class ArticleAddForm extends Component {

    constructor(props) {
        super(props);
        this.changeInputValue = this.changeInputValue.bind(this);
    }

    state = {
        data: {
            title: "",
            content: "",
            tags: "",
            submitter: ""
        },
        errors: {}
    };

    async componentDidMount() {
        const user = auth.getCurrentUser();
        this.state.data.submitter = user._id;
        this.setState({ user })
        // console.log('current user: ', this.state);
    }

    changeInputValue = (e) => {
        this.state.data[e.target.name] = e.target.value;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let savedInfo = this.state.data;
        // if (savedInfo.tags) {
        //     savedInfo.tags = savedInfo.tags.split(';');
        // }
        console.log('saved info: ', savedInfo);
        saveArticle(savedInfo).then((res) => {
            toast.success('Saved successfully!', 3000, 'fa-check');
            setTimeout(() => {
                this.props.history.push("/admin/article");
            }, 4000);
        }).catch((error) => {
            toast.error('Delete error!', 3000, 'fa-times');
            console.log(error);
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Add article</h1>
                <form onSubmit={this.handleSubmit} method="POST">
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-2">
                                <label className="control-label">Title</label>
                            </div>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" required name="title" placeholder="title" onChange={this.changeInputValue} />
                                <input type="hidden" name="submitter" value={this.state.data.submitter} />
                            </div>
                        </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">
                                        Tags
                                    </label>
                                </div>
                                <div className="col-sm-6">
                                    <input type="text" className="form-control" name="tags" onChange={this.changeInputValue} placeholder="tags" />
                                </div>
                                <div className="col-sm-4">
                                    <span className="text-danger" style={{ fontSize: 10 }}>*Multiple tags are separated with comma</span>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-2">
                                    <label className="control-label">
                                        Content
                                    </label>
                                </div>
                                <div className="col-sm-6">
                                    <textarea type="text" onChange={this.changeInputValue} className="form-control" name="content" placeholder="content" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-6">
                                    <Link to="/admin/article" className="btn btn-info">Back</Link>
                                </div>
                                <div className="col-sm-6 text-left">
                                    <button className="btn btn-success">Save</button>
                                </div>
                            </div>
                        </div>
                </form>
            </div>
        );
    }
}
        
export default ArticleAddForm;
