import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import BankInputForm from "../../../src/components/BankInputForm";

test("should be possible to withdraw", () => {
	const initialBalance = 500;
	let currentBalance = initialBalance;
	const setCurrentBalanceMock = jest.fn((amount) => {
		currentBalance += amount;
	});
	const onChangeHandlerMock = jest.fn();
	const { getByLabelText, getByText } = render(
		<BankInputForm
			currentBalance={currentBalance}
			setCurrentBalance={setCurrentBalanceMock}
			mode="withdraw"
			onChangeHandler={onChangeHandlerMock}
		/>
	);

	const withdrawal = 100;
	fireEvent.change(
		getByLabelText("Please enter the amount you wish to withdraw"),
		{ target: { value: withdrawal.toString() } }
	);
	fireEvent.click(getByText("OK"));

	expect(setCurrentBalanceMock).toHaveBeenCalledWith(-1 * withdrawal);
	expect(onChangeHandlerMock).toHaveBeenCalled();
	expect(currentBalance).toBe(initialBalance - withdrawal);
});

test("should be possible to deposit", () => {
	const initialBalance = 500;
	let currentBalance = initialBalance;
	const setCurrentBalanceMock = jest.fn((amount) => {
		currentBalance += amount;
	});
	const onChangeHandlerMock = jest.fn();
	const { getByLabelText, getByText } = render(
		<BankInputForm
			currentBalance={currentBalance}
			setCurrentBalance={setCurrentBalanceMock}
			mode="deposit"
			onChangeHandler={onChangeHandlerMock}
		/>
	);

	const deposit = 100;
	fireEvent.change(
		getByLabelText("Please enter the amount you wish to deposit"),
		{ target: { value: deposit.toString() } }
	);
	fireEvent.click(getByText("OK"));

	expect(setCurrentBalanceMock).toHaveBeenCalledWith(deposit);
	expect(onChangeHandlerMock).toHaveBeenCalled();
	expect(currentBalance).toBe(initialBalance + deposit);
});
