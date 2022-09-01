import React from "react";

const BankAccountActionMode = ({ label, value, setMode, checked }) => (
	<label
		className={`bank-account-action-mode${checked ? " checked-radio" : ""}`}
	>
		<input
			type="radio"
			name="bank-account-action"
			value={value}
			checked={checked}
			onChange={(event) => setMode(event.target.value)}
		/>
		{label}
	</label>
);

export default BankAccountActionMode;
