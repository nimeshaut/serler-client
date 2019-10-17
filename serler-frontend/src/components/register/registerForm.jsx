import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { toast } from 'react-toastify';

import * as userService from '../../services/userService';
import * as genderService from '../../services/genderService' ;
import auth from '../../services/authService';

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    genders: [],
    errors: {}
  };

  async componentDidMount() {
    const {data: genders} = await genderService.getGenders();
    this.setState({genders});
  }

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password"),
    name: Joi.string()
      .required()
      .label("Name"),
    genderId: Joi.string()
      .required()
      .label("Gender"),
  };

  doSubmit = async () => {
    // Call the server
    try{
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.data.headers['x-auth-token']);
      
      window.location="/user";;
    }
    catch(ex){
     
      if (ex.response && ex.response.status === 404)
        toast.error("This user has already been deleted");
      if (ex.response && ex.response.status === 401)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 403)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 400) toast.error("Bad Request");
      const errors = {...this.state.errors};
      errors.email = ex.response.data;
      this.setState({errors});
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSelect("genderId", "Gender", this.state.genders)}

          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
