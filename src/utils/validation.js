export const isPositiveFloat = (n) => !isNaN(n) && Number(n) > 0;

export const notMoreThanTwoDecimalPlaces = (n) => /^\d+(\.\d{1,2})?$/.test(n);

export const noLeadingZero = (n) => !/^0/.test(n);

export function validateTransaction(currentBalance, amount, isWithdrawal) {
	if (!noLeadingZero(amount)) {
		return "Can not start with a leading zero";
	}
	if (!isPositiveFloat(amount)) {
		return "Negative numbers are not allwoed";
	}
	if (!notMoreThanTwoDecimalPlaces(amount)) {
		return "Too many decimal places";
	}
	if (isWithdrawal && amount > currentBalance) {
		return "Sorry, your account balance is to low";
	}
}
