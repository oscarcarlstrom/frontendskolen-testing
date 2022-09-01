import { useState } from "react";
import "./App.css";
import BankAccountAction from "./components/BankAccountAction";

function App() {
	const [currentBalance, setCurrentBalance] = useState(0);

	return (
		<div className="App">
			<h1>A very simple bank</h1>
			<h2>Your balance is {currentBalance}</h2>
			<BankAccountAction
				currentBalance={currentBalance}
				setCurrentBalance={(amount) =>
					setCurrentBalance((balance) => amount + balance)
				}
			/>
		</div>
	);
}

export default App;
