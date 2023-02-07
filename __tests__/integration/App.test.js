import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import App from "../../src/App";

// TODO: Mock the module "../../src/api/updateBalance" using jest.mock()
// *There are several ways to mock with Jest!

// Test 1
test("should have a top level heading", () => {
	const { getByRole } = render(<App />);

	expect(
		getByRole("heading", { level: 1, name: "A very simple bank" })
	).toBeInTheDocument();
});

// TODO
// Test 2: should show the current balance

// TODO
// Test 3: should show correct balance when making a withdrawal

// TODO
// Test 4: should show correct balance when making a deposit

// TODO
// Test 5: should an error message when making an invalid withdrawal

// TODO
// Test 6: should an error message when making an invalid deposit

// TODO
// Test 7: should show an error when something goes wrong with the http request
