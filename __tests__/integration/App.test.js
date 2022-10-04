import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import App from "../../src/App";

jest.mock("../../src/api/updateBalance");

test("should have a top level heading", () => {
	const { getByRole } = render(<App />);
	expect(
		getByRole("heading", { level: 1, name: "A very simple bank" })
	).toBeInTheDocument();
});

test("should show current balance", () => {
	const { getByText } = render(<App />);
	expect(getByText("Your balance is 0")).toBeInTheDocument();
});

test("should show correct balance when making a withdrawal", () => {
	const { getByLabelText, getByText } = render(<App initialBalance={500} />);
	fireEvent.change(
		getByLabelText("Please enter the amount you wish to withdraw"),
		{ target: { value: "100" } }
	);
	fireEvent.click(getByText("OK"));
	expect(getByText("Your balance is 400")).toBeInTheDocument();
});

test("should show correct balance when making a deposit", () => {
	const { getByLabelText, getByText } = render(<App />);
	fireEvent.click(getByText("Deposit"));
	fireEvent.change(
		getByLabelText("Please enter the amount you wish to deposit"),
		{ target: { value: "100" } }
	);
	fireEvent.click(getByText("OK"));
	expect(getByText("Your balance is 100")).toBeInTheDocument();
});

test("should an error message when making an invalid withdrawal", () => {
	const { getByLabelText, getByText } = render(<App />);
	fireEvent.change(
		getByLabelText("Please enter the amount you wish to withdraw"),
		{ target: { value: "100" } }
	);
	fireEvent.click(getByText("OK"));
	expect(
		getByText("Sorry, your account balance is to low")
	).toBeInTheDocument();
});

test("should an error message when making an invalid deposit", () => {
	const { getByLabelText, getByText } = render(<App />);
	fireEvent.change(
		getByLabelText("Please enter the amount you wish to withdraw"),
		{ target: { value: "-100" } }
	);
	fireEvent.click(getByText("OK"));
	expect(getByText("Negative numbers are not allowed")).toBeInTheDocument();
});
