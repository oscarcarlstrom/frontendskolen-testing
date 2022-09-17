import {
	isPositiveFloat,
	notMoreThanTwoDecimalPlaces,
	noLeadingZero,
	validateTransaction,
} from "../../src/utils/validation";

test("should validate positive floats", () => {
	expect(isPositiveFloat(1)).toBe(true);
	expect(isPositiveFloat(1.1)).toBe(true);
	expect(isPositiveFloat(0.1)).toBe(true);
	expect(isPositiveFloat(100.0)).toBe(true);

	expect(isPositiveFloat(-1)).toBe(false);
	expect(isPositiveFloat(-1.1)).toBe(false);
	expect(isPositiveFloat(-100.0)).toBe(false);
	expect(isPositiveFloat(0)).toBe(false);
	expect(isPositiveFloat("1.1")).toBe(true);
});

test("should validate that a number has maximum two decimal places", () => {
	expect(notMoreThanTwoDecimalPlaces(1)).toBe(true);
	expect(notMoreThanTwoDecimalPlaces(1.1)).toBe(true);
	expect(notMoreThanTwoDecimalPlaces(1.12)).toBe(true);
	expect(notMoreThanTwoDecimalPlaces(0)).toBe(true);

	expect(notMoreThanTwoDecimalPlaces(1.001)).toBe(false);
	expect(notMoreThanTwoDecimalPlaces(0.999)).toBe(false);
	expect(notMoreThanTwoDecimalPlaces(-1.111)).toBe(false);
	expect(notMoreThanTwoDecimalPlaces(100.101)).toBe(false);
});

test("should validate that a number has no leading zeroes", () => {
	expect(noLeadingZero(1)).toBe(true);
	expect(noLeadingZero(10)).toBe(true);
	expect(noLeadingZero(100.099)).toBe(true);
	expect(noLeadingZero(0.099)).toBe(true);

	expect(noLeadingZero("01")).toBe(false);
	expect(noLeadingZero("001")).toBe(false);
	expect(noLeadingZero("00.999")).toBe(false);
});

test("should validate transactions", () => {
	expect(validateTransaction(0, 50).valid).toBe(true);
	expect(validateTransaction(100, 50).valid).toBe(true);
	expect(validateTransaction(100, 50, true).valid).toBe(true);

	expect(validateTransaction(0, 50, true).valid).toBe(false);
	expect(validateTransaction(100, 150, true).valid).toBe(false);
	expect(validateTransaction(100, -500).valid).toBe(false);
});
