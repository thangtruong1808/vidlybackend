import React from "react";

const Input = ({ name, lable, error, ...rest }) => {
	return (
		<div className="mb-3">
			<lable htmlFor={name}>{lable}</lable>
			<input
				{...rest}
				// value={value}
				// onChange={onChange}
				// type={type}
				name={name}
				id={name}
				className="form-control"
			/>
			{error && <div className="alert alert-danger">{error}</div>}
		</div>
	);
};

export default Input;
