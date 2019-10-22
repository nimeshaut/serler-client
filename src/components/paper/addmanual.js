import React, { Component } from 'react';
import { withRouter } from "react-router";
const axios = require('axios');

class AddManual extends Component {
    constructor(props) {
        super(props)
        this.state = {
            papertitle: "",
            authors: [],
            author: "",
            year: "",
            source: "",
            publisher: "",
            volume: "",
            number: "",
            pages: "",
            link: "",
            noOfLikes: "0"
        };
        this.addAuthor=this.addAuthor.bind(this);
    }

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { papertitle, authors, year, source, publisher, volume, number, pages, link, noOfLikes } = this.state;

        axios.post('https://serler-api.herokuapp.com/paper/addmanual', { papertitle, authors, year, source, publisher, volume, number, pages, link, noOfLikes })
            .then((result) => {
            });
        this.props.history.push('/paper');
    }

    addAuthor = (e) => {
        e.preventDefault();
        const { authors } = this.state;
        const { author } = this.state;
        this.setState({
            authors: [...authors, author]
        })
    }

    render() {
        const { papertitle, author, year, source, publisher, volume, number, pages, link } = this.state;
        const {authors} = this.state;
        return (
            <div>
                <h1>Add Paper Manually</h1>
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <label for="papertitle">Title</label>
                        <input type="text" value={papertitle} onChange={this.onChange} class="form-control" id="papertitle" placeholder="Paper Title *"></input>
                    </div>
                    <form id="author-form" className="form">
                        <div className="form-group">
                            <label for="author">Author (Last Name, First Name)</label>
                            <input class="form-control" id="author" value={author} onChange={this.onChange} placeholder="Author *"></input>
                        </div>
                        <button onClick={(e) => {this.addAuthor(e)}} className="btn-primary">Add</button>
                    </form>
                    <div className="content">
                        <table className="table">
                            <tbody>
                                {
                                    authors.map(name => {
                                        return (
                                            <small>Author added: {name}<br></br></small>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div class="form-row">
                        <div class="col-7">
                            <label for="source">Source</label>
                            <input type="text" value={source} onChange={this.onChange} class="form-control" id="source" placeholder="Source *"></input>
                        </div>
                        <div class="col">
                            <label for="year">Publisher</label>
                            <input type="text" value={publisher} onChange={this.onChange} class="form-control" id="publisher" placeholder="Publisher"></input>
                        </div>
                    </div>
                    <br></br>
                    <div class="form-row">
                        <div class="col">
                            <label for="volume">Volume</label>
                            <input type="text" value={volume} onChange={this.onChange} class="form-control" id="volume" placeholder="Volume"></input>
                        </div>
                        <div class="col">
                            <label for="number">Number</label>
                            <input type="text" value={number} onChange={this.onChange} class="form-control" id="number" placeholder="Number"></input>
                        </div>
                        <div class="col">
                            <label for="pages">Pages</label>
                            <input type="text" value={pages} onChange={this.onChange} class="form-control" id="pages" placeholder="Pages"></input>
                        </div>
                        <div class="col">
                            <label for="year">Year</label>
                            <input type="text" value={year} onChange={this.onChange} class="form-control" id="year" placeholder="Year *"></input>
                        </div>
                    </div>
                    <br></br>
                    <div class="form-group">
                        <label for="link">Link</label>
                        <input type="text" value={link} onChange={this.onChange} class="form-control" id="link" placeholder="Link *"></input>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <br></br>
                <br></br>
            </div>

        );
    }
}

export default AddManual;
