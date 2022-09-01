import React, { useState } from "react";
import { validateTransaction } from "../utils/validation";

const BankInputForm = ({ currentBalance, setCurrentBalance, mode }) => {
	const [amount, setAmount] = useState("");
	const [validationError, setValidationError] = useState();

	const inputErrorId = `${mode}-input-error`;
	return (
		<>
			<form
				onSubmit={(event) => {
					event.preventDefault();

					const isWithdrawal = mode === "withdraw";
					const validationError = validateTransaction(
						currentBalance,
						amount,
						isWithdrawal
					);
					setValidationError(validationError);
					if (validationError) return;

					setCurrentBalance(amount * (isWithdrawal ? -1 : 1));
					setAmount("");
				}}
				className="balance-form"
			>
				<input
					type="number"
					id={`${mode}-input`}
					className="balance-input"
					value={amount.toString().replaceAll(",", ".")}
					onChange={(event) => {
						setAmount(parseFloat(event.target.value));
					}}
					aria-label={`Please enter the amount you wish to ${mode}`}
					aria-invalid={!!validationError}
					aria-describedBy={inputErrorId}
				/>
				<button>OK</button>
			</form>
			<strong id={inputErrorId} className="input-error">
				{validationError}
			</strong>
		</>
	);
};

export default BankInputForm;
