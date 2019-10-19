import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Table from "../../common/table";


class gendersTable extends Component {
  columns = [
    { path: "name", label: "Name", content: gender => <Link to={`/admin/genders/${gender._id}`}>{gender.name}</Link> },
    
    {
      key: "delete",
      content: gender => (
        <button
          onClick={() => this.props.onDelete(gender)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { genders, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={genders}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default gendersTable;
