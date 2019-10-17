import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import { getUser, saveUser } from "../../../services/userService";
import { getGenders } from "../../../services/genderService";
import { getRoles } from "../../../services/roleService";

class UserForm extends Form {
  state = {
    data: {
      name: "",
      genderId: "",
      roleId: "",
      email: ""
    },
    genders: [],
    roles: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name"),
    email: Joi.string()
      .required()
      .label("Email"),
    genderId: Joi.string()
      .required()
      .label("Gender"),
    roleId: Joi.string()
      .required()
      .label("Role")
  };

  async populateUser() {
    
    try {
      const userId = this.props.match.params.id;
      if (userId === "new") return;
      const { data: user } = await getUser(userId);
      this.setState({ data: this.mapToViewModel(user) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }
 
  async populateDropdownData() {
    const { data: genders } = await getGenders();
    const { data: roles } = await getRoles();
    this.setState({ genders, roles });
  }

  async componentDidMount() {
    await this.populateDropdownData();
    await this.populateUser();
  }

  mapToViewModel(user) {
    return {
      _id: user._id,
      name: user.name,
      genderId: user.gender._id,
      email: user.email,
      roleId: user.role._id
    };
  }

  doSubmit = async () => {
    await saveUser(this.state.data);

    this.props.history.push("/admin/users");
  };

  render() {
    return (
      <div>
        <h1>User Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderSelect("roleId", "Role", this.state.roles)}
          {this.renderSelect("genderId", "Gender", this.state.genders)}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default UserForm;
