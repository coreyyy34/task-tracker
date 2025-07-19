export const formatSeconds = (elapsedSeconds: number) => {
	const hours = Math.floor(elapsedSeconds / 3600)
		.toString()
		.padStart(2, "0");
	const minutes = Math.floor((elapsedSeconds % 3600) / 60)
		.toString()
		.padStart(2, "0");
	const seconds = (elapsedSeconds % 60).toString().padStart(2, "0");
	return `${hours}:${minutes}:${seconds}`;
};
