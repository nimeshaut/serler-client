import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import { getUser, saveUser } from "../../../services/userService";
import { getGenders } from "../../../services/genderService";
import { getRoles } from "../../../services/roleService";
import { debug } from "util";

// const options = [
//   { label: "One", value: 1 },
//   { label: "Two", value: 2 },
//   { label: "Three", value: 3 }
// ];
class UserForm extends Form {
  state = {
    data: {
      name: "",
      genderId: "",
      roleId: "",
      email: ""
      // selectedRoles: []
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
    // selectedRoles: Joi.array()
    //   .label("Role Ids")
  };

  async populateUser() {
    try {
      const userId = this.props.match.params.id;
      if (userId === "new") return;
      const { data: user } = await getUser(userId);

      // const selectedRoles = this.state.roles.filter(role => role._id == user.role._id );
      const mappedValues = this.mapToViewModel(user);
      //const mappedValues = this.mapToViewModel(user, selectedRoles);
      this.setState({ data: mappedValues });
      var a = this.state;
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

  mapToViewModel(user /*, selectedRoles*/) {
    return {
      _id: user._id,
      name: user.name,
      genderId: user.gender._id,
      email: user.email,
      roleId: user.role._id
      // selectedRoles: selectedRoles
    };
  }

  doSubmit = async () => {
    await saveUser(this.state.data);

    this.props.history.push("/admin/users");
  };

  render() {
    return (
      <div className="container">
        <h1>User Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderSelect("roleId", "Role", this.state.roles)}
          {this.renderSelect("genderId", "Gender", this.state.genders)}
          {/* {this.renderMultiSelect("roleIds", "Roles", this.state.roles, this.state.data.selectedRoles )} */}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default UserForm;
