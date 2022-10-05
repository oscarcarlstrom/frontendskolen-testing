import React, { useState } from "react";
import BankAccountActionMode from "./BankAccountActionMode";
import BankInputForm from "./BankInputForm";

const BankAccountAction = ({
	currentBalance,
	setCurrentBalance,
	onBankInputFormChange,
}) => {
	const [mode, setMode] = useState("withdraw");
	return (
		<>
			<div className="bank-account-action">
				<BankAccountActionMode
					label="Withdraw"
					value="withdraw"
					checked={mode === "withdraw"}
					setMode={setMode}
				/>
				<BankAccountActionMode
					label="Deposit"
					value="deposit"
					checked={mode === "deposit"}
					setMode={setMode}
				/>
			</div>
			<BankInputForm
				currentBalance={currentBalance}
				setCurrentBalance={setCurrentBalance}
				mode={mode}
				onChangeHandler={onBankInputFormChange}
			/>
		</>
	);
};

export default BankAccountAction;
