import React, { Component } from "react";

class SearchResults extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div style={{ border: "solid orange" }}>
          Search Results
          <table>
            <thead>
              <tr>
                <th className="bgsuccess">Document Title</th>
                <th className="bgsuccess">Source</th>
                <th className="bgsuccess">Author</th>
                <th className="bgsuccess">Likes</th>
                <th className="bgsuccess">Active</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Document Title 1</td>
                <td>Source 1</td>
                <td>Author 1</td>
                <td>Likes 1</td>
                <td>True</td>
              </tr>
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default SearchResults;
