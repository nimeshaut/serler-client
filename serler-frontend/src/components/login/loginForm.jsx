import React from "react";
import Joi from "joi-browser";
import { Redirect } from 'react-router-dom';

import Form from "../common/form";
import auth from "../../services/authService";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
    redirectToReferer: false
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  // componentDidMount(){
  //   const user = auth.getCurrentUser();
  //   console.log("Current user info");
  //   console.log(user);
  // }
  doSubmit = async () => {
    // Call the server
    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      this.setState({redirectToReferer: true});
      // if (user.role === "Admin") window.location = "/admin/dashboard";
      // if (user.role === "Analyzer") window.location = "/analyst/dashboard";
      // if (user.role === "Moderator") window.location = "/moderator/dashboard";
      //window.location = "/user/dashboard";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    const {redirectToReferer} = this.state;
    if(redirectToReferer){
      const user = auth.getCurrentUser();
      if (user.role === "Admin") window.location = "/admin/dashboard";
      if (user.role === "Analyzer")  window.location = "/analyst/dashboard";
      if (user.role === "Moderator")  window.location = "/moderator/dashboard";
      if (user.role === "User") window.location = "/User/dashboard";
    }
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit} className="form-signin" width="400">
          <img
            className="mb-4"
            src="SerlerLogo.png"
            alt=""
            width="100"
            height="100"
          />
          <h1>Login</h1>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </React.Fragment>
    );
  }
}

export default LoginForm;
