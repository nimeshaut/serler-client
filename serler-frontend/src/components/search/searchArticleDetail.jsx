import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getArticle } from "../../services/articleService";


class ArticleForm extends Component {

    state = {
        data: {
            title: "",
            content: "",
            tags: "",
            status: "",
            submitter: "",
            moderator: "",
            analyst: "",
            rejector: "",
            createdDate: ""
        }
    };

    async populateArticle() {
        try {
            const articleId = this.props.match.params.id;
            console.log('query id: ', articleId);
            const { data: article } = await getArticle(articleId);
            //   console.log('query article: ', article);
            // console.log('map to view model: ', this.mapToViewModel(article));
            this.setState({ data: this.mapToViewModel(article) });
        } catch (ex) {
            //    console.log('error...');
            if (ex.response && ex.response.status === 404)
                this.props.history.replace("/not-found");
        }
    }

    async componentDidMount() {
        await this.populateArticle();
    }

    mapToViewModel = (article) => {
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

    render() {
        return (
            <div className="container">
                <table className="table">
                    <tbody>
                        <tr>
                            <td>
                            Title
                            </td>
                            <td>
                            {this.state.data.title}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Content
                            </td>
                            <td>
                            {this.state.data.content}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Tags
                            </td>
                            <td>
                            {this.state.data.tags}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Status
                            </td>
                            <td>
                            {this.state.data.status}
                            </td>
                        </tr>
                        <tr>
                            <td>Submitter</td>
                            <td>
                            {this.state.data.submitter}
                            </td>
                        </tr>
                        <tr>
                            <td>
                            Moderator
                            </td>
                            <td>
                            {this.state.data.moderator}
                            </td>
                        </tr>
                        <tr>
                            <td>Analyst</td>
                            <td>
                            {this.state.data.analyst}
                            </td>
                        </tr>
                        <tr>
                            <td>Rejector</td>
                            <td>
                            {this.state.data.rejector}
                            </td>
                        </tr>
                        <tr>
                            <td>Created Date</td>
                            <td>
                                {this.state.data.createdDate}
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <Link to="/search/article" className="btn btn-info">Back</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ArticleForm;
