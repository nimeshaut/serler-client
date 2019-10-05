import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { ToastContainer } from 'react-toastify';

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
      dateTo: Joi.date(),
      
  };

  doSubmit = async () => {
    // await saveGender(this.state.data);

    // this.props.history.push("/admin/genders");
  };
  render() {
    return (
      <div style={{ border: "solid red" }}>
        <h1>Search Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("search", "Search")}
          <hr/>
          {this.renderInput("dateFrom", "Date From", "date")}
          {this.renderInput("dateTo", "To", "date")}
          {this.renderButton("Search")}
        </form>
      </div>
    );
  }
}

export default SearchForm;
