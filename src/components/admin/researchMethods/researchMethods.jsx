import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import ResearchMethodsTable from "./researchMethodsTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { getResearchMethods, deleteResearchMethod } from "../../../services/researchMethodService";

class Genders extends Component {
  state = {
    researchMethods: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: researchMethods } = await getResearchMethods();
    this.setState({ researchMethods});
  }

  handleDelete = async researchMethod => {
    const originalResearchMethods = this.state.researchMethods;
    const researchMethods = originalResearchMethods.filter(u => u._id !== researchMethod._id);
    this.setState({ researchMethods });
    try {
      await deleteResearchMethod(researchMethod._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This research method has already been deleted");
      if (ex.response && ex.response.status === 401)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 403)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 400) toast.error("Bad Request");
      this.setState({ researchMethods: originalResearchMethods });
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
      researchMethods: allResearchMethods
    } = this.state;
    const sorted = _.orderBy(allResearchMethods, [sortColumn.path], [sortColumn.order]);
    const researchMethods = paginate(sorted, currentPage, pageSize);
    return { totalCount: allResearchMethods.length, data: researchMethods };
  };

  render() {
    const { length: researchMethodsCount } = this.state.researchMethods;
    const { pageSize, currentPage, sortColumn } = this.state;

    // if (researchMethodsCount === 0) return <p>There are no research methods in the database</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <Link
          to="/admin/researchmethods/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Research Method
        </Link>
        <p> Showing {totalCount} research methods from the database</p>
        <ResearchMethodsTable
          researchMethods={data}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        ></ResearchMethodsTable>
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

export default Genders;
