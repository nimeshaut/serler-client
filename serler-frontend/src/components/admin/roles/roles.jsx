import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import RolesTable from "./rolesTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { getRoles, deleteRole } from "../../../services/roleService";

class Roles extends Component {
  state = {
    roles: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: roles } = await getRoles();
    this.setState({ roles });
  }

  handleDelete = async role => {
    const originalRoles = this.state.roles;
    const roles = originalRoles.filter(u => u._id !== role._id);
    this.setState({ roles });
    try {
      await deleteRole(role._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This role has already been deleted");
      if (ex.response && ex.response.status === 401)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 403)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 400) toast.error("Bad Request");
      this.setState({ roles: originalRoles });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, roles: allRoles } = this.state;
    const sorted = _.orderBy(allRoles, [sortColumn.path], [sortColumn.order]);
    const roles = paginate(sorted, currentPage, pageSize);
    return { totalCount: allRoles.length, data: roles };
  };

  render() {
    const { length: rolesCount } = this.state.roles;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (rolesCount === 0) return <p>There are no roles in the database</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <Link
          to="/admin/roles/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Role
        </Link>
        <p> Showing {totalCount} roles from the database</p>
        <RolesTable
          roles={data}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        ></RolesTable>
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

export default Roles;
