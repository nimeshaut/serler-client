import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Table from "../../common/table";


class rolesTable extends Component {
  columns = [
    { path: "name", label: "Name", content: role => <Link to={`/admin/roles/${role._id}`}>{role.name}</Link> },
    
    {
      key: "delete",
      content: role => (
        <button
          onClick={() => this.props.onDelete(role)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { roles, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={roles}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default rolesTable;
