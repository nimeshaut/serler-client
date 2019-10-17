import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import UsersTable from "./usersTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { getUsers, deleteUser } from "../../../services/userService";

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: users } = await getUsers();
    this.setState({ users });
  }

  handleDelete = async user => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter(u => u._id !== user._id);
    this.setState({ users });
    try {
      await deleteUser(user._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This user has already been deleted");
      if (ex.response && ex.response.status === 401)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 403)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 400) toast.error("Bad Request");
      this.setState({ users: originalUsers });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, users: allUsers } = this.state;
    const sorted = _.orderBy(allUsers, [sortColumn.path], [sortColumn.order]);
    const users = paginate(sorted, currentPage, pageSize);
    return { totalCount: allUsers.length, data: users };
  };

  render() {
    const { length: usersCount } = this.state.users;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (usersCount === 0) return <p>There are no users in the database</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <p> Showing {totalCount} users from the database</p>
        <UsersTable
          users={data}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        ></UsersTable>
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

export default Users;
