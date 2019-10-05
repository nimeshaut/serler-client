import React, { Component } from "react";
import SearchForm from "./searchForm";
import SearchResults from "./searchResults";

class Search extends Component {
  state = {
    searchText: "",
    mongoDbQuery: "",
    humanQuery: ""
  };

  componentDidMount() {
    
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <SearchForm></SearchForm>

          <SearchResults></SearchResults>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
