import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import {getResearchMethod, saveResearchMethod } from "../../../services/researchMethodService";

class ResearchMethodForm extends Form {
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

  async populateResearchMethod() {
    try {
      const researchMethodId = this.props.match.params.id;
      if (researchMethodId === "new") return;
      const { data: researchMethod } = await getResearchMethod(researchMethodId);
      this.setState({ data: this.mapToViewModel(researchMethod) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateResearchMethod();
  }

  mapToViewModel(researchMethod) {
    return {
      _id: researchMethod._id,
      name: researchMethod.name
    };
  }

  doSubmit = async () => {
    await saveResearchMethod(this.state.data);

    this.props.history.push("/admin/researchMethods");
  };

  render() {
    return (
      <div>
        <h1>Research Methods Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ResearchMethodForm;
