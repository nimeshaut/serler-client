import React, { Component } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import StatusTable from "./statusTable";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import { getStatuses, deleteStatus, getStatus, saveStatus } from "../../../services/statusService";

class Status extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        statuses: [],
        currentPage: 1,
        pageSize: 5,
        sortColumn: { path: "name", order: "asc" },
        data: {
            name: ""
        },
    };

    async componentDidMount() {
        const { data: statuses } = await getStatuses();
        this.setState({ statuses });
    }

    handleDelete = async status => {
        const originalStatues = this.state.statuses;
        const statuses = originalStatues.filter(u => u._id !== status._id);
        this.setState({ statuses });
        try {
            await deleteStatus(status._id);
        } catch (ex) {
            if (ex.response && ex.response.status === 404)
                toast.error("This status has already been deleted");
            if (ex.response && ex.response.status === 401)
                toast.error("Access Denied");
            if (ex.response && ex.response.status === 403)
                toast.error("Access Denied");
            if (ex.response && ex.response.status === 400) 
                toast.error("Bad Request");
            this.setState({ statuses: originalStatues });
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
            statuses: allStatuses
        } = this.state;
        const sorted = _.orderBy(allStatuses, [sortColumn.path], [sortColumn.order]);
        const statuses = paginate(sorted, currentPage, pageSize);
        return { totalCount: allStatuses.length, data: statuses };
    };

    handleSubmit = async (event) => {
        // clear error tips
        this.state.tips = "";
        event.preventDefault()
        const name = this.state.name;
        console.log(`the submitted name value is: ${name}`);

        saveStatus({name: name}).then((result) => {
            // window.location.reload();
            this.componentDidMount();
        }).catch((error) => {
            console.log(error);
            this.setState({
                tips: 'the status has existed'
            });
        })
    };

    handleChange = async (event) => {
        // console.log('the current status value is : %s', event.target.value);
        this.setState({name: event.target.value});
    }

    render() {
        const { length: statusesCount } = this.state.statuses;
        const { pageSize, currentPage, sortColumn } = this.state;

        if (statusesCount === 0) return <p>There are no status in the database</p>;

        const { totalCount, data } = this.getPagedData();

        return (
            <React.Fragment>
                <form onSubmit={this.handleSubmit} className="form-inline" style={{ margin: 10 }} >
                    <div className="form-group">
                        <div className="input-group">
                            <input type="text" onChange={this.handleChange} className="form-control" />
                            <button className="input-group-addon btn btn-primary" style={{ borderRadius: 0 }}>add</button>
                        </div>
                        <div className="text-danger" style={{marginLeft: 10 }}>{this.state.tips}</div>
                    </div>
                </form>
                <StatusTable
                    statuses={data}
                    sortColumn={sortColumn}
                    onDelete={this.handleDelete}
                    onSort={this.handleSort}
                ></StatusTable>
                <p> Showing {totalCount} statuses from the database</p>
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

export default Status;