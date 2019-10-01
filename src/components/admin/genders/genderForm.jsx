import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import {getGender, saveGender } from "../../../services/genderService";

class GenderForm extends Form {
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

  async populateGender() {
    try {
      const genderId = this.props.match.params.id;
      if (genderId === "new") return;
      const { data: gender } = await getGender(genderId);
      this.setState({ data: this.mapToViewModel(gender) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGender();
  }

  mapToViewModel(gender) {
    return {
      _id: gender._id,
      name: gender.name
    };
  }

  doSubmit = async () => {
    await saveGender(this.state.data);

    this.props.history.push("/admin/genders");
  };

  render() {
    return (
      <div>
        <h1>Gender Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default GenderForm;
