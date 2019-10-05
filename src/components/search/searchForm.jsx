import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { ToastContainer } from "react-toastify";

class SearchForm extends Form {
  state = {
    data: {
      searchString: ""
    },
    genders: [],
    roles: [],
    errors: {}
  };
  schema = {
    searchString: Joi.string().allow('')
      .label("Search String"),
    dateFrom: Joi.date(),
    dateTo: Joi.date()
  };

  doSubmit = async () => {
    // await saveGender(this.state.data);
    // this.props.history.push("/admin/genders");
  };
  render() {
    return (
      <div className="col-3" style={{ border: "solid red" }}>
        <h1>Search Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("searchString", "Search")}
          <hr />
          Date Range 
          <div className="form-inline mb-2">
            Frm:
            {this.renderSimpleInput("dateFrom", "Date From", "date")}
            To:
            {this.renderSimpleInput("dateTo", "To", "date")}
            <hr />
          </div>
          
          <i className="fa fa-plus-circle btn btn-primary" style={{cursor:"pointer"}}></i>
          <br />
          {this.renderButton("Search")}
        </form>
      </div>
    );
  }
}

export default SearchForm;
