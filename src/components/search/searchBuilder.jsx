import React, { useState } from "react";

import searchOperation, { findOperationsForType, findMongoOperationsForType } from "./searchOperation";

import "./searchBuilder.css";
import { debug } from "util";

const searchableFields = [
  { title: "Article title", operations: findOperationsForType("string"), operationsMongo: findMongoOperationsForType("string") },
  { title: "Tag", operations: findOperationsForType("string"), operationsMongo: findMongoOperationsForType("string") },
  { title: "Author", operations: findOperationsForType("string"), operationsMongo: findMongoOperationsForType("string") },
  // { title: "Number search", operations: findOperationsForType("number") },
  //{ title: "Boolean search", operations: findOperationsForType("boolean"), operationsMongo: findMongoOperationsForType("boolean") }
];

function SearchBuilder(props) {
  const [selectedField, setSelectedField] = useState({ title: "" });
  const [selectedOperation, setSelectedOperation] = useState("");
  const [selectedOperationMongo, setSelectedOperationMongo] = useState("");
  const [operand, setOperand] = useState(null);

  const clear = () => {
    setSelectedField({ title: "" });
    setSelectedOperation("");
    setSelectedOperationMongo("")
    setOperand(null);
  };
  const onSelectField = event => {
    const nextSelectedField = searchableFields.find(
      candidate => candidate.title === event.target.value
    );
    // Confirm validity.
    if (nextSelectedField) {
      setSelectedField(nextSelectedField);
      setSelectedOperation("");
      setSelectedOperationMongo("");
    }
  };
  const onSelectOperation = event => {
    debugger;
    const nextSelectedOperation = event.target.value;
    // Confirm validity.
    if (selectedField.operations.includes(nextSelectedOperation)) {
      const index = selectedField.operations.indexOf(nextSelectedOperation);
      setSelectedOperation(nextSelectedOperation);
      setSelectedOperationMongo(selectedField.operationsMongo[index]);
      if (nextSelectedOperation === "between") {
        setOperand({ from: "", to: "" });
      }
    }
  };
  const onAdd = (combineUsing = null) => {
    props.onAdd(combineUsing, {
      field: selectedField.title,
      operation: selectedOperation,
      operationMongo: selectedOperationMongo,
      operand
    });
    clear();
  };

  return (
    <div className="searchBuilder">
      <h5>Search Builder</h5>
      <div className="question">
        <select
          className="form-control"
          value={selectedField.title}
          onChange={onSelectField}
        >
          <option value={""} disabled>
            Please choose a field…
          </option>
          {searchableFields.map((field, index) => {
            return (
              <option key={index} value={field.title}>
                {field.title}
              </option>
            );
          })}
        </select>
      </div>

      {/* Ask for operation. */}
      {selectedField.title.length > 0 && (
        <div className="question">
          <select
            className="form-control"
            value={selectedOperation}
            onChange={onSelectOperation}
          >
            <option value={""} disabled>
              Please choose an operation…
            </option>
            {selectedField.operations.map(operation => {
              return (
                <option key={operation} value={operation}>
                  {searchOperation[operation].title}
                </option>
              );
            })}
          </select>
        </div>
      )}

      {/* Ask for operand(s). */}
      {selectedOperation.length > 0 && (
        <div className="question">
          {selectedOperation !== "between" && (
            <input
              className="form-control"
              type="text"
              value={operand === null ? "" : operand}
              onChange={event => setOperand(event.target.value)}
            />
          )}
          {selectedOperation === "between" && (
            <>
              <input
                className="form-control"
                type="text"
                value={operand === null ? "" : operand.from}
                onChange={event =>
                  setOperand({ from: event.target.value, to: operand.to })
                }
              />
              and
              <input
                className="form-control"
                type="text"
                value={operand === null ? "" : operand.to}
                onChange={event =>
                  setOperand({ from: operand.from, to: event.target.value })
                }
              />
            </>
          )}
        </div>
      )}

      {/* Ask for how to add this query (with AND or OR); first query doesn't that info. */}
      {selectedOperation !== "" && (
        <div className="question callToAction">
          {!props.showAsFirst && (
            <>
              Add as
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onAdd("and")}
              >
                AND
              </button>
              or
              <button
                className="btn btn-sm btn-primary"
                onClick={() => onAdd("or")}
              >
                OR
              </button>
            </>
          )}
          {props.showAsFirst && (
            <button className="btn btn-sm btn-primary" onClick={() => onAdd()}>
              Add
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBuilder;
