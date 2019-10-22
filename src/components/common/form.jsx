import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import SimpleInput from "./simpleInput";
import SelectMulti from "./selectMulti";

import event from "events";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  handleMultiChange = (selected, reference) => {
    const errors = { ...this.state.errors };
    debugger;

    var elementName = reference.current.id.replace("Ids", "");
    const properName =
      "selected" + elementName.charAt(0).toUpperCase() + elementName.slice(1);
    
    // const selectedRoles = this.state.roles.filter(role =>
    //   selected.includes(role._id)
    // );

    const selectedValue = this.state[elementName + "s"].filter(tempVal =>
      selected.includes(tempVal._id)
    );

    var newstate = {};
    newstate[properName + "s"] = selectedValue;
    newstate["errors"] = errors;
    //this.setState(newstate);
    const data = { ...this.state.data };
    data[properName + "s"] = selectedValue;

    this.setState({ data, errors });

    var aa = this.state;

    //this.setState({ selectedRoles, errors });
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderMultiSelect(name, label, options, selected) {
    const { data, errors } = this.state;

    return (
      <SelectMulti
        name={name}
        value={data[name]}
        label={label}
        options={options}
        selected={selected}
        onChange={this.handleMultiChange}
        error={errors[name]}
        ref={this.multiRef}
      />
    );
  }

  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
  renderSimpleInput(name, label, type = "text") {
    const { data, errors } = this.state;

    return (
      <SimpleInput
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
