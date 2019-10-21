import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class TaskMethodologiesTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: methodology => (
        <Link to={`/admin/taskMethodologies/${methodology._id}`}>
          {methodology.name}
        </Link>
      )
    },

    {
      key: "delete",
      content: methodology => (
        <button
          onClick={() => this.props.onDelete(methodology)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { methodologies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={methodologies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default TaskMethodologiesTable;
