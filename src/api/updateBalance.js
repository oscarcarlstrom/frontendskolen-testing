export const updateBalance = (amount) => {
	const abortController = new AbortController();

	return {
		request: fetch("/api", {
			signal: abortController.signal,
		}).then(() => ({
			amount,
		})),
		abortRequest: () => abortController.abort(),
	};
};
