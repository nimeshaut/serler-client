import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import TaskMethodologiesTable from "./taskMethodologiesTable";

import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import {
  getTaskMethodologies,
  deleteTaskMethodology
} from "../../../services/taskMethodologyService";

class TaskMethodologies extends Component {
  state = {
    taskMethodologies: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: taskMethodologies } = await getTaskMethodologies();
    this.setState({ taskMethodologies });
  }

  handleDelete = async taskMethodology => {
    const originalMethodologies = this.state.taskMethodologies;
    const taskMethodologies = originalMethodologies.filter(
      u => u._id !== taskMethodology._id
    );
    this.setState({taskMethodologies });
    try {
      await deleteTaskMethodology(taskMethodology._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This methodology has already been deleted");
      if (ex.response && ex.response.status === 401)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 403)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 400) toast.error("Bad Request");
      this.setState({ originalMethodologies });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      taskMethodologies: allMethodologies
    } = this.state;
    const sorted = _.orderBy(
      allMethodologies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const taskMethodologies = paginate(sorted, currentPage, pageSize);
    return { totalCount: allMethodologies.length, data: taskMethodologies };
  };

  render() {
    
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <Link
          to="/admin/taskMethodologies/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Methodology
        </Link>
        <p> Showing {totalCount} methodologies from the database</p>
        <TaskMethodologiesTable
          methodologies={data}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        ></TaskMethodologiesTable>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        ></Pagination>
      </React.Fragment>
    );
  }
}

export default TaskMethodologies;
