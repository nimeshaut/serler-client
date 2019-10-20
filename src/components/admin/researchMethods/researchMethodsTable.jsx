import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class researchMethodsTable extends Component {
  columns = [
    {
      path: "name",
      label: "Name",
      content: researchMethods => (
        <Link to={`/admin/researchMethods/${researchMethods._id}`}>
          {researchMethods.name}
        </Link>
      )
    },

    {
      key: "delete",
      content: researchMethods => (
        <button
          onClick={() => this.props.onDelete(researchMethods)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { genders: researchMethods, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={researchMethods}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default researchMethodsTable;
