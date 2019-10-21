import React from "react";
import Joi from "joi-browser";
import Form from "../../common/form";
import {getParticipant, saveParticipant} from "../../../services/participantService";

class ParticipantForm extends Form {
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

  async populateParticipant() {
    try {
      const participantId = this.props.match.params.id;
      if (participantId === "new") return;
      const { data: participant } = await getParticipant(participantId);
      this.setState({ data: this.mapToViewModel(participant) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateParticipant();
  }

  mapToViewModel(participant) {
    return {
      _id: participant._id,
      name: participant.name
    };
  }

  doSubmit = async () => {
    await saveParticipant(this.state.data);

    this.props.history.push("/admin/participants");
  };

  render() {
    return (
      <div>
        <h1>Participants Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default ParticipantForm;
