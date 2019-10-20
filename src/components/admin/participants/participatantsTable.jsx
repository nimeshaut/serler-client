import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class ParticipantsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: participant => (
        <Link to={`/admin/participants/${participant._id}`}>
          {participant.name}
        </Link>
      )
    },

    {
      key: "delete",
      content: participant => (
        <button
          onClick={() => this.props.onDelete(participant)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { participants, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={participants}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ParticipantsTable;
