import React from "react";

const SimpleInput = ({ name, label, error, ...rest }) => {
  return (
    <React.Fragment>
    
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    
    </React.Fragment>
  );
};

export default SimpleInput;
