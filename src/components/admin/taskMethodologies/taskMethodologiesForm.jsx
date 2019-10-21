import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";

import {getTaskMethodology, saveTaskMethodology} from './../../../services/taskMethodologyService';

class TaskMethodologyForm extends Form {
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

  async populateMethodologies() {
    try {
      const methodologyId = this.props.match.params.id;
      if (methodologyId === "new") return;
      const { data: taskMethodology } = await getTaskMethodology(methodologyId);
      this.setState({ data: this.mapToViewModel(taskMethodology) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateMethodologies();
  }

  mapToViewModel(taskMethodology) {
    return {
      _id: taskMethodology._id,
      name: taskMethodology.name
    };
  }

  doSubmit = async () => {
    await saveTaskMethodology(this.state.data);

    this.props.history.push("/admin/taskMethodologies");
  };

  render() {
    return (
      <div>
        <h1>Task Methodologies Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default TaskMethodologyForm;
