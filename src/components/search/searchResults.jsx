import React, { Component } from "react";

function SearchResults(props) {
  console.log(props.results.data);
  return (
    <React.Fragment>
      <div className="col-9" style={{ border: "solid orange" }}>
        <table>
          <thead>
            <tr>
              <th className="bgsuccess">Document Title</th>
              <th className="bgsuccess">Source</th>
              <th className="bgsuccess">Author</th>
              <th className="bgsuccess">Tags</th>
              <th className="bgsuccess">Likes</th>
              <th className="bgsuccess">Status</th>
            </tr>
          </thead>
          <tbody>
            {props.results.map((result, index) => {
              return (
                <tr key={result._id}>
                  <td>{result.name}</td>
                  <td>Document Source Goes Here</td>
                  <td>{result.authors.join(", ")}</td>
                  <td>{result.tags.join(", ")}</td>
                  <td>{result.noOfLikes}</td>
                  <td>{result.status && result.status.name ? result.status.name : "no status"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default SearchResults;
