import React, { Component } from "react";
// import { SavedSearch } from "./savedSearch";
import SearchResults from "./searchResults";
import SearchBuilder from "./searchBuilder";
import { saveSearch } from "./../../services/searchService";
import "./search.css";

class Search extends Component {
  state = {
    count: 0,
    humanReadableString: "",
    mongoDbQueryString: "",
    searchedFields: [],
    searchText: "",
    dateFrom: null,
    dateTo: null,
    queryResults: [],
    tempId: 0
  };

  onAddSearch = (combineUsing, search) => {
    debugger;
    const nextSearchedFields = this.state.searchedFields.slice();
    nextSearchedFields.push({ search, combineUsing });
    this.setState({ searchedFields: nextSearchedFields });
  };
  onAddDate = (date, range) => {
  debugger;
    if (range === "from") {
      this.setState({ "dateFrom": date });
    } else if (range === "to") {
      this.setState({ "dateTo": date });
    }
  };
  onRemoveSearch = index => {
    const nextSearchedFields = this.state.searchedFields.filter(
      (_, candidate) => candidate !== index
    );

    // Reset first searched field to have no "combineBy" directive.
    if (
      nextSearchedFields.length > 0 &&
      nextSearchedFields[0].combineUsing !== null
    ) {
      nextSearchedFields[0].combineUsing = null;
    }

    this.setState({ searchedFields: nextSearchedFields });
  };

  handleSearch = async () => {
    const payload = {
      "searchText": this.state.searchText,
      "dateFrom": this.state.dateFrom,
      "dateTo": this.state.dateTo,
      "queries": this.state.searchedFields
    };

    
    const responseJson = await saveSearch(payload);

    
    console.log(responseJson.data);
    this.setState({ queryResults: responseJson.data });
  };
  render() {
    return (
      <React.Fragment>
        <div className="row">
        <div className="col-3" style={{ border: "solid red" }}>
            <input
              type="text"
              className="form-control"
              value={this.state.searchText}
              onChange={event =>
                this.setState({ searchText: event.target.value })
              }
            />
            <button
              className="btn btn-primary btn-sm m-2"
              onClick={this.handleSearch}
            >
              Search
            </button>
            <hr />
            <h5>Date Range</h5>
            <div className="form-group">
              From
              <input
                type="date"
                value={this.state.dateFrom || ""}
                className="form-control form-control-sm"
                onChange={event => this.onAddDate(event.target.value, "from")}
              />
            </div>
            <div className="form-group">
              To
              <input
                type="date"
                value={this.state.dateTo || ""}
                className="form-control form-control-sm"
                onChange={event => this.onAddDate(event.target.value, "to")}
              />
            </div>
            <hr />
            <ul className="searchedFields">
              {this.state.searchedFields.map((searchField, index) => {
                return (
                  <li key={index}>
                    {searchField.combineUsing && (
                      <span className="combineUsing">
                        {searchField.combineUsing}
                      </span>
                    )}
                    <span className="field">{searchField.search.field}</span>
                    <span className="operation">
                      {searchField.search.operation}
                    </span>
                    <span className="operand">
                      {typeof searchField.search.operand === "string"
                        ? searchField.search.operand
                        : `${searchField.search.operand.from} and ${searchField.search.operand.to}`}
                    </span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => this.onRemoveSearch(index)}
                    >
                      remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <SearchBuilder
              showAsFirst={this.state.searchedFields.length === 0}
              onAdd={this.onAddSearch}
            />
          </div>
            <SearchResults  results={this.state.queryResults} />
          
        </div>

        <span className="badge badge-primary"> {this.state.count} </span>
      </React.Fragment>
    );
  }
}

export default Search;
