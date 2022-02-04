import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
	state = {
		data: {},
		errors: {},
	};

	validate = () => {
		const options = { abortEarly: false };
		const { error } = Joi.validate(this.state.data, this.schema, options);
		if (!error) return null;

		const errors = {};
		for (let item of error.details) errors[item.path[0]] = item.message;
		return errors;
		console.log(error);
	};
	validateProperty = ({ name, value }) => {
		//console.log("name: ", name);
		//console.log("value: ", value);
		const obj = { [name]: value };
		const schema = { [name]: this.schema[name] };
		const { error } = Joi.validate(obj, schema);
		//console.log("error: ", error);

		return error ? error.details[0].message : null;
	};

	handleSubmit = (e) => {
		e.preventDefault();

		const errors = this.validate();
		this.setState({ errors: errors || {} });
		if (errors) return;
		this.doSubmit();
	};

	handleChange = ({ currentTarget: input }) => {
		//console.log("handleChange Called");
		//console.log("handleChange input", input);
		const errors = { ...this.state.errors };

		const errorMessage = this.validateProperty(input);
		//console.log("errorMessage: ", errorMessage);
		if (errorMessage) {
			errors[input.name] = errorMessage;
			//console.log("AAA-errors: ", errors[input.name]);
		} else delete errors[input.name];

		//console.log("errors: ", errors);
		const data = { ...this.state.data };
		data[input.name] = input.value;
		//console.log("you are here: ");
		this.setState({ data, errors });
	};
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
	renderButton(label) {
		return (
			<button disabled={this.validate()} className="btn btn-primary">
				{label}
			</button>
		);
	}
	renderInput(name, label, type = "text") {
		const { data, errors } = this.state;
		return (
			<Input
				type={type}
				name={name}
				value={data[name]}
				lable={label}
				onChange={this.handleChange}
				error={errors[name]}
			/>
		);
	}
}

export default Form;
