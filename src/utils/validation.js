export const isPositiveFloat = (n) => !isNaN(n) && Number(n) > 0;

export const notMoreThanTwoDecimalPlaces = (n) => /^\d+(\.\d{1,2})?$/.test(n);

export const noLeadingZero = (n) => /^0(\.|,)/.test(n) || !/^0/.test(n);

export function validateTransaction(currentBalance, amount, isWithdrawal) {
	if (!noLeadingZero(amount)) {
		return { valid: false, error: "Can not start with a leading zero" };
	}
	if (!isPositiveFloat(amount)) {
		return { valid: false, error: "Negative numbers are not allowed" };
	}
	if (!notMoreThanTwoDecimalPlaces(amount)) {
		return { valid: false, error: "Too many decimal places" };
	}
	if (isWithdrawal && amount > currentBalance) {
		return { valid: false, error: "Sorry, your account balance is to low" };
	}
	return {
		valid: true,
	};
}
