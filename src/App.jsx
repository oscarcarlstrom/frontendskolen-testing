import React, { useState, useEffect } from "react";
import { updateBalance } from "./api/updateBalance";
import "./App.css";
import BankAccountAction from "./components/BankAccountAction";

function App({ initialBalance = 0 }) {
	const [currentBalance, setCurrentBalance] = useState(initialBalance);
	const [userChangedBalance, setUserChangedBalance] = useState(initialBalance);

	const [requestSuccess, setRequestSuccess] = useState();
	const [requestError, setRequestError] = useState();

	useEffect(() => {
		if (!userChangedBalance) return; // React 18 dev mode workaround

		setRequestSuccess(undefined);
		setRequestError(undefined);

		const { request, abortRequest } = updateBalance(currentBalance);
		request
			.then(({ amount }) => {
				setRequestSuccess(`New blance was set to ${amount}!`);
			})
			.catch(({ message }) => {
				setRequestError(message);
			});

		return abortRequest;
	}, [currentBalance, userChangedBalance]);

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
					setUserChangedBalance(true); // React 18 dev mode workaround
					setCurrentBalance((balance) => amount + balance);
				}}
			/>
			{status}
		</div>
	);
}

export default App;
