import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import {getRole, saveRole } from "../../../services/roleService";

class RoleForm extends Form {
  state = {
    data: {
      name: ""
    },

    errors: {}
  };

  schema = {
    _id: Joi.string(),
    name: Joi.string()
      .required()
      .label("Name")
  };

  async populateRole() {
    try {
      const roleId = this.props.match.params.id;
      if (roleId === "new") return;
      const { data: role } = await getRole(roleId);
      this.setState({ data: this.mapToViewModel(role) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateRole();
  }

  mapToViewModel(role) {
    return {
      _id: role._id,
      name: role.name
    };
  }

  doSubmit = async () => {
    await saveRole(this.state.data);

    this.props.history.push("/admin/roles");
  };

  render() {
    return (
      <div>
        <h1>Role Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default RoleForm;
