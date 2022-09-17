import React, { useState } from "react";
import { validateTransaction } from "../utils/validation";

const BankInputForm = ({
	currentBalance,
	setCurrentBalance,
	mode = "withdraw",
}) => {
	const [amount, setAmount] = useState("");
	const [validationError, setValidationError] = useState();

	const inputErrorId = `${mode}-input-error`;
	return (
		<>
			<form
				onSubmit={(event) => {
					event.preventDefault();

					const isWithdrawal = mode === "withdraw";
					const { valid, error } = validateTransaction(
						currentBalance,
						amount,
						isWithdrawal
					);
					setValidationError(error);
					if (!valid) return;

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
					onKeyDown={(event) => {
						if (event.key !== ".") return;
						event.preventDefault(); // Prevent chrome from wiping the entire value when pressing "."
					}}
					aria-label={`Please enter the amount you wish to ${mode}`}
					aria-invalid={!!validationError}
					aria-describedby={inputErrorId}
					step={0.01}
				/>
				<button formNoValidate>OK</button>
			</form>
			<strong id={inputErrorId} className="input-error">
				{validationError}
			</strong>
		</>
	);
};

export default BankInputForm;
