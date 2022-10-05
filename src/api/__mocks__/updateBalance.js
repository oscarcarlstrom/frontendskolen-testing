export const updateBalance = jest.fn((amount) => ({
	request: Promise.resolve({ amount }),
	abortRequest: jest.fn(),
}));
