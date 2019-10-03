import React, { Component } from "react";
import SearchForm from "./searchForm";
import SearchResults from "./searchResults";

class Search extends Component {
  state = {
    searchText: "",
    mongoDbQuery: "",
    humanQuery: ""
  };
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid" style={{ border: "solid blue" }}>
          <div className="row">
              <div className="col-xl2">
                  <SearchForm></SearchForm>
              </div>
              <div>
                  <SearchResults></SearchResults>
              </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Search;
