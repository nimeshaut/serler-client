import React, { Component } from "react";
import SearchForm from "./searchForm";
import SearchResults from "./searchResults";
import { getSearchFields } from './../../services/searchFieldService';

import './search.css';

class SearchNew extends Component {
  state = {
    searchText: "",
    mongoDbQuery: "",
    humanQuery: "",
    searchFields:[{}]
  };

  async componentDidMount(){
    const searchFields = await getSearchFields();
    this.setState({searchFields});
    //console.log("Search fields fetched is", searchFields);
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <SearchForm searchFields={this.state.searchFields}></SearchForm>
          <SearchResults></SearchResults>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchNew;
