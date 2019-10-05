return (
    <React.Fragment>
      <div className="container-fluid" style={{ border: "solid blue" }}>
        <div className="row">
          <div className="col-xl2" style={{ border: "solid red" }}>
            <input></input>
            <button
              className="btn btn-primary btn-sm m-2"
              onClick={this.handleSearch}
            >
              Search
            </button>
            <hr />
            Date Range From <br />
            <input></input>
            <button>...</button>
            <br /> To <br />
            <input></input>
            <button>...</button>
            <hr />
            <button
              onClick={this.handleAddAnd}
              className="btn btn-secondary btn-sm m-2"
            >
              Add And
            </button>
            <button
              onClick={this.handleAddOr}
              className="btn btn-secondary btn-sm"
            >
              Add Or
            </button>
            <br />
            <SearchBuilder></SearchBuilder>
            <hr />
          </div>
          <div>
            Search Results go here
            <SearchResults></SearchResults>
          </div>
        </div>
      </div>

      <span className="badge badge-primary"> {this.state.count} </span>
    </React.Fragment>
  );