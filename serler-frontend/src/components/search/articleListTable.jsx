import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Table from "../common/table";


class articleTable extends Component {
  columns = [
    { path: "title", label: "Title", content: article => <Link to={`/search/article/${article._id}`}>{article.title}</Link>},
    { path: "status.name", label: "Status"},
    { path: "submitter.name", label: "Submitter"},
    { path: "createdDate", label: "Created Date"}
  ];

  render() {
    const { articles, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={articles}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default articleTable;
