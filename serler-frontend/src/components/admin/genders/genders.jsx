import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import GendersTable from "./gendersTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { getGenders, deleteGender } from "../../../services/genderService";

class Genders extends Component {
  state = {
    genders: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: genders } = await getGenders();
    this.setState({ genders });
  }

  handleDelete = async gender => {
    const originalGenders = this.state.genders;
    const genders = originalGenders.filter(u => u._id !== gender._id);
    this.setState({ genders });
    try {
      await deleteGender(gender._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This gender has already been deleted");
      if (ex.response && ex.response.status === 401)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 403)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 400) toast.error("Bad Request");
      this.setState({ genders: originalGenders });
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
      genders: allGenders
    } = this.state;
    const sorted = _.orderBy(allGenders, [sortColumn.path], [sortColumn.order]);
    const genders = paginate(sorted, currentPage, pageSize);
    return { totalCount: allGenders.length, data: genders };
  };

  render() {
    const { length: gendersCount } = this.state.genders;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (gendersCount === 0) return <p>There are no genders in the database</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <Link
          to="/admin/genders/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Gender
        </Link>
        <p> Showing {totalCount} genders from the database</p>
        <GendersTable
          genders={data}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        ></GendersTable>
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
