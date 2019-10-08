import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { ToastContainer } from "react-toastify";
import QueryByExample from "./queryByExampleComponent";
import SearchBuilder from "./searchBuilder";

class SearchForm extends Component {
  state = {
    data: {
      searchFields: [{}]
    },
    queryList: [],
    numChildren: 0,
    genders: [],
    roles: [],
    searchedFields: [],
    // dateFrom: Date.now(),
    // dateTo: Date.now(),
    errors: {}
  };
  // schema = {
  //   searchString: Joi.string()
  //     .allow("")
  //     .label("Search String"),
  //   dateFrom: Joi.date(),
  //   dateTo: Joi.date()
  // };

  // constructor(props) {
  //   super(props);
  //   this.onAddClick = this.onAddClick.bind(this);
  // }
  // async componentDidMount() {}

  onAddSearch = (combineUsing, search) => {
    const nextSearchedFields = this.state.searchedFields.slice();
    nextSearchedFields.push({ search, combineUsing });
    this.setState({ searchedFields: nextSearchedFields });
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

  doSubmit = async () => {
    // await saveGender(this.state.data);
    // this.props.history.push("/admin/genders");
    // <i
    //         className="fa fa-plus-circle btn btn-primary"
    //         style={{ cursor: "pointer" }}
    //         onClick={this.onAddClick}
    //       > And</i>
    //       <i
    //         className="fa fa-plus-circle btn btn-primary"
    //         style={{ cursor: "pointer" }}
    //         onClick={this.onAddClick}
    //       > Or</i>
    //       <div className="queryList-container">
    //         {this.state.queryList.map(child => child)}
    //       </div>
    //       <br />
    //       {/* {this.renderButton("Search")} */}
  };

  handleSearch() {
    console.log("handle search here");
  }

  onAddClick() {
    console.log(this.state.queryList);
    this.setState({
      queryList: [...this.state.queryList, <QueryByExample />]
    });
    //console.log(this.props);
  }
  render() {
    console.log("search fields from parent", this.props.searchFields);
    return (
      <div className="col-3" style={{ border: "solid red" }}>
        <h1>Search Form</h1>
        {/* {this.renderInput("searchString", "Search")} */}
        <input name="searchString" id="searchString" className="form-control" />
        <hr />
        Date Range
        <div className="form-inline mb-2">
          Frm:
          {/* {this.renderSimpleInput("dateFrom", "Date From", "date")} */}
          <input name="dateFrom" type="date" style={{ width: 150 }}></input>
          To:
          {/* {this.renderSimpleInput("dateTo", "To", "date")} */}
          <input name="dateTo" type="date" style={{ width: 150 }}></input>
          <hr />
        </div>
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
        <hr />
        <button
          className="btn btn-primary btn-sm m-2"
          onClick={this.handleSearch}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchForm;
