import React, { useState, useEffect } from "react";
import { updateBalance } from "./api/updateBalance";
import "./App.css";
import BankAccountAction from "./components/BankAccountAction";

function App({ initialBalance = 0 }) {
	const [currentBalance, setCurrentBalance] = useState(initialBalance);
	const [previousBalance, setPreviousBalance] = useState(initialBalance);

	const [requestSuccess, setRequestSuccess] = useState();
	const [requestError, setRequestError] = useState();

	const resetStatusMessages = () => {
		setRequestSuccess(undefined);
		setRequestError(undefined);
	};

	useEffect(() => {
		if (currentBalance === previousBalance) return;

		resetStatusMessages();

		const { request, abortRequest } = updateBalance(currentBalance);
		request
			.then(({ amount }) => {
				setRequestSuccess(`New blance was set to ${amount}!`);
			})
			.catch(({ message }) => {
				setRequestError(message);
				setCurrentBalance(previousBalance);
			});

		return abortRequest;
	}, [currentBalance]);

	const status = requestError ? (
		<p className="error">
			<strong>{requestError}</strong>
		</p>
	) : (
		requestSuccess && (
			<p className="success">
				<strong>{requestSuccess}</strong>
			</p>
		)
	);

	return (
		<div className="App">
			<h1>A very simple bank</h1>
			<h2>Your balance is {currentBalance}</h2>
			<BankAccountAction
				currentBalance={currentBalance}
				setCurrentBalance={(amount) => {
					setPreviousBalance(currentBalance); // React 18 dev mode workaround
					setCurrentBalance((balance) => amount + balance);
				}}
				onBankInputFormChange={resetStatusMessages}
			/>
			{status}
		</div>
	);
}

export default App;
