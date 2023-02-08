import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import BankInputForm from "../../../src/components/BankInputForm";

// Test 1:
test("should be possible to make a withdrawal", () => {
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

// TODO
// Test 2: should be possible to make a deposit

// TODO
// Test 3: should be accept decimal numbers

// TODO
// Test 4: should be be possible to use "," as decimal separator
