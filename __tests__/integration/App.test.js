import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "../../src/App";
// This import is required to change the mock implementation in some tests
import { updateBalance } from "../../src/api/updateBalance";

jest.mock("../../src/api/updateBalance"); // Requires ../../src/api/updateBalance/__mocks__/updateBalance

// Alternative way to mock
// jest.mock("../../src/api/updateBalance", () => ({
// 	updateBalance: jest.fn((amount) => ({
// 		request: Promise.resolve({ amount }),
// 		abortRequest: jest.fn(),
// 	})),
// }));

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

test("should show correct balance when making a withdrawal", async () => {
	const { getByLabelText, getByText } = render(<App initialBalance={500} />);

	fireEvent.change(
		getByLabelText("Please enter the amount you wish to withdraw"),
		{ target: { value: "100" } }
	);
	fireEvent.click(getByText("OK"));

	await waitFor(() => {
		// Wait for mock API Promise to resolve
		expect(getByText("New blance was set to 400!")).toBeInTheDocument();
	});

	expect(getByText("Your balance is 400")).toBeInTheDocument();
});

test("should show correct balance when making a deposit", async () => {
	const { getByLabelText, getByText } = render(<App />);

	fireEvent.click(getByText("Deposit"));
	fireEvent.change(
		getByLabelText("Please enter the amount you wish to deposit"),
		{ target: { value: "100" } }
	);
	fireEvent.click(getByText("OK"));

	await waitFor(() => {
		// Wait for mock API Promise to resolve
		expect(getByText("New blance was set to 100!")).toBeInTheDocument();
	});

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

test("should show an error when something goes wrong with the http request", async () => {
	const errorMessage = "Something went terribly wrong!";
	updateBalance.mockImplementationOnce(() => ({
		request: Promise.reject(new Error(errorMessage)),
		abortRequest: jest.fn(),
	}));

	const { getByLabelText, getByText } = render(<App initialBalance={500} />);

	fireEvent.change(
		getByLabelText("Please enter the amount you wish to withdraw"),
		{ target: { value: "100" } }
	);
	fireEvent.click(getByText("OK"));

	await waitFor(() => {
		// Wait for mock API Promise to resolve
		expect(getByText(errorMessage)).toBeInTheDocument();
	});

	expect(getByText("Your balance is 500")).toBeInTheDocument();
});
