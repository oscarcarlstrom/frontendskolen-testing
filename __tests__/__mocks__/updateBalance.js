export const updateBalance = (amount) => ({
	request: Promise.resolve({ amount }),
	abortRequest: jest.fn(),
});
