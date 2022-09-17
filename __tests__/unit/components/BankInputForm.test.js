import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import BankInputForm from "../../../src/components/BankInputForm";

test("should be possible to withdraw", () => {
	let currentBalance = 500;
	const setCurrentBalanceMock = jest.fn((amount) => {
		currentBalance += amount;
	});
	const { getByLabelText, getByText } = render(
		<BankInputForm
			currentBalance={currentBalance}
			setCurrentBalance={setCurrentBalanceMock}
			mode="withdraw"
		/>
	);
	fireEvent.change(
		getByLabelText("Please enter the amount you wish to withdraw"),
		{ target: { value: "100" } }
	);
	fireEvent.click(getByText("OK"));
	expect(setCurrentBalanceMock).toHaveBeenCalled();
	expect(currentBalance).toBe(400);
});

test("should be possible to deposit", () => {
	let currentBalance = 500;
	const setCurrentBalanceMock = jest.fn((amount) => {
		currentBalance += amount;
	});
	const { getByLabelText, getByText } = render(
		<BankInputForm
			currentBalance={currentBalance}
			setCurrentBalance={setCurrentBalanceMock}
			mode="deposit"
		/>
	);
	fireEvent.change(
		getByLabelText("Please enter the amount you wish to deposit"),
		{ target: { value: "100" } }
	);
	fireEvent.click(getByText("OK"));
	expect(setCurrentBalanceMock).toHaveBeenCalled();
	expect(currentBalance).toBe(600);
});
