import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { ToastContainer } from "react-toastify";

class SearchForm extends Form {
  state = {
    data: {
      search: ""
    },
    genders: [],
    roles: [],
    errors: {}
  };
  schema = {
    search: Joi.string()
      .required()
      .label("Search"),
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
          {this.renderInput("search", "Search")}
          <hr />
          Date Range 
          <div className="form-inline mb-2">
            Frm:
            {this.renderSimpleInput("dateFrom", "Date From", "date")}
            To:
            {this.renderSimpleInput("dateTo", "To", "date")}
            <hr />
          </div>
          {this.renderButton("Search")}
        </form>
      </div>
    );
  }
}

export default SearchForm;
