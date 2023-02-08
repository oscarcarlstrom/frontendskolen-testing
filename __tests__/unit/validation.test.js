import {
	isPositiveFloat,
	notMoreThanTwoDecimalPlaces,
	noLeadingZero,
	validateTransaction,
} from "../../src/utils/validation";

// Test 1:
test("should validate positive floats", () => {
	expect(isPositiveFloat(1)).toBe(true);
	expect(isPositiveFloat(1.1)).toBe(true);
	expect(isPositiveFloat(0.1)).toBe(true);
	expect(isPositiveFloat(100.0)).toBe(true);

	expect(isPositiveFloat(-1)).toBe(false);
	expect(isPositiveFloat(-1.1)).toBe(false);
	expect(isPositiveFloat(-100.0)).toBe(false);
	expect(isPositiveFloat(0)).toBe(false);
	expect(isPositiveFloat("1.1")).toBe(false);
});

// TODO
// Test 2: notMoreThanTwoDecimalPlaces should validate that a number has maximum two decimal places

// TODO
// Test 3: noLeadingZero should validate that a number has no leading zeroes

// TODO
// Test 4: validateTransaction should validate withdrawals and deposits
