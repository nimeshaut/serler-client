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
        
          <div className="row">
              <div className="col-xl4">
                  <SearchForm></SearchForm>
              </div>
              <div  className="col-xl8">
                  <SearchResults></SearchResults>
              </div>
          </div>
        
      </React.Fragment>
    );
  }
}

export default Search;
