import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import ParticipantsTable from "./participatantsTable";

import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import {
  getParticipants,
  deleteParticipant
} from "../../../services/participantService";

class Participants extends Component {
  state = {
    participants: [],
    currentPage: 1,
    pageSize: 5,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidMount() {
    const { data: participants } = await getParticipants();
    this.setState({ participants });
  }

  handleDelete = async participant => {
    const originalParticipants = this.state.participants;
    const participants = originalParticipants.filter(
      u => u._id !== participant._id
    );
    this.setState({ participants });
    try {
      await deleteParticipant(participant._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This participant has already been deleted");
      if (ex.response && ex.response.status === 401)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 403)
        toast.error("Access Denied");
      if (ex.response && ex.response.status === 400) toast.error("Bad Request");
      this.setState({ originalParticipants });
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
      participants: allParticipants
    } = this.state;
    const sorted = _.orderBy(
      allParticipants,
      [sortColumn.path],
      [sortColumn.order]
    );
    const participants = paginate(sorted, currentPage, pageSize);
    return { totalCount: allParticipants.length, data: participants };
  };

  render() {
    
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <Link
          to="/admin/participants/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Participant
        </Link>
        <p> Showing {totalCount} participants from the database</p>
        <ParticipantsTable
          participants={data}
          sortColumn={sortColumn}
          onDelete={this.handleDelete}
          onSort={this.handleSort}
        ></ParticipantsTable>
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

export default Participants;
