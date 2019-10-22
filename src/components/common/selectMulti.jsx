import React from "react";

import MultiSelect from "@khanacademy/react-multi-select";

const SelectMulti = ({ name, label, options, selected, error, ...rest }) => {
  let multiRef = React.createRef();
  const tempOptions = options.map(option => {
    return { label: option.name, value: option._id };
  });
  const tempSelected = selected.map(selected => {
    return selected._id;
  });
  
  const onSelected = (selectedValue)=>{
    rest.onChange(selectedValue.selected, multiRef);

  }
  return (
    <div id={name} className="form-group" ref={multiRef}>
      <label htmlFor={name}>{label}</label>
      <MultiSelect
        className="dropdown text-left"
        options={tempOptions}
        selected={tempSelected}
        onSelectedChanged={selected => onSelected({selected})}
        {...rest}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectMulti;
