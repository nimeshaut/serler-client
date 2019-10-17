import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Table from "../../common/table";


class usersTable extends Component {
  columns = [
    { path: "name", label: "Name", content: user => <Link to={`/admin/users/${user._id}`}>{user.name}</Link> },
    { path: "email", label: "Email" },
    { path: "gender.name", label: "Gender" },
    { path: "role.name", label: "Role" },
    {
      key: "delete",
      content: user => (
        <button
          onClick={() => this.props.onDelete(user)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { users, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default usersTable;
