import React, { Component } from 'react';
import { withRouter} from "react-router";
const axios = require('axios');

class AddBibtex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            papertitle: "",
            authors: [],
            year: "",
            source: "",
            publisher: "",
            volume: "",
            number: "",
            pages: "",
            link: "",
            noOfLikes: "0",
        };
        this.submitBib = this.submitBib.bind(this);
    }

    submitBib = (e) => {
        this.setState({ value: e.target.value });
        var value = e.target.value;
        var bibjson = value.replace(/(\w+)\s*=\s*\{/g, "\"$1\": \"")
            .replace(/\}(?=\s*[,\}])/g, "\"")
            .replace(/@(\w+)\s*\{([^,]*)/, "{\"$1\": \"$2\"");
        var bibobj = JSON.parse(bibjson);

        var regex = /"([^"]*)"/;
        var str = JSON.stringify(bibobj);
        var source = regex.exec(str)[1];

        const authortext = bibobj.author;
        console.log(authortext);

        const authorsArray = authortext.split(" and ");
        
        this.setState({authors: authorsArray});
        this.setState({source: source});
        this.setState({papertitle: bibobj.title});
        this.setState({year: bibobj.year});
        this.setState({publisher: bibobj.publisher});
        this.setState({volume: bibobj.volume});
        this.setState({number: bibobj.number});
        this.setState({pages: bibobj.pages});
        this.setState({link: bibobj.url});
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

    addAuthorArray = (e) => {
        e.preventDefault();
        const {author} = this.state;
    }

    render() {
        const {
            papertitle,
            authors,
            year,
            publisher,
            volume,
            number,
            pages,
            link, source, noOfLikes} = this.state;
        return (
            <div>
                <h1>Add Paper Using Bibtex</h1>
                <div>
                    <form>
                        <div class="text-area">
                            <h3>Paste Bibtex Below</h3>
                            <textarea value={this.state.value} onChange={this.submitBib} id="bibtex" cols={120} rows={10} ></textarea>
                        </div>
                    </form>
                </div>
                <br></br>
                <br></br>
                <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                        <label for="papertitle">Title</label>
                        <input type="text" value={papertitle} onChange={this.onChange} class="form-control" id="papertitle" placeholder="Paper Title *"></input>
                    </div>
                    <div class="form-group">
                            <label for="author">Author</label>
                            <input type="text" value={authors} onChange={this.onChange} class="form-control" id="authors" placeholder="Author *"></input>
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

export default AddBibtex;
