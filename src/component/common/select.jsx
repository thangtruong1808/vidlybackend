import React, { Component } from "react";

const Select = ({ name, label, options, error, ...rest }) => {
	return (
		<div className="mb-3">
			<lable htmlFor={name}>{label}</lable>
			<select name={name} id={name} {...rest} className="form-control">
				<option value="" />
				{options.map((option) => (
					<option key={option._id} value={option._id}>
						{option.name}
					</option>
				))}
			</select>

			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Select;
