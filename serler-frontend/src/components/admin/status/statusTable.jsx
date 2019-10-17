import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Table from "../../common/table";


class statusTable extends Component {
  columns = [
    { path: "name", label: "Name", content: status => <Link to={`/admin/status/${status._id}`}>{status.name}</Link> },
    
    {
      key: "delete",
      content: status => (
        <button
          onClick={() => this.props.onDelete(status)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { statuses, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={statuses}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default statusTable;
