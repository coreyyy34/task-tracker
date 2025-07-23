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

export const formatDate = (date: Date) => {
	if (isNaN(date.getTime())) return "Invalid date";

	const formatted = new Intl.DateTimeFormat("en-NZ", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(date);

	return formatted;
};

export const formatTime = (date: Date) => {
	if (isNaN(date.getTime())) return "Invalid date";

	const formatted = new Intl.DateTimeFormat("en-NZ", {
		hour: "numeric",
		minute: "2-digit",
	}).format(date);

	return formatted;
};

// export const formatDuration = (startDate: Date, endDate: Date) => {
// 	if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()))
// 		return "Invalid date";

// 	const start = startDate.getTime() / 1000;
// 	const end = endDate.getTime() / 1000;
// 	const elapsedSeconds = end - start;
// 	const hours = Math.floor(elapsedSeconds / 3600);
// 	const minutes = Math.floor((elapsedSeconds % 3600) / 60);
// 	const durationFormatted = `${hours > 0 ? hours + "h " : ""}${minutes}m`;
// 	return durationFormatted;
// };

export const formatDuration = (duration: number) => {
	// const start = duration.getTime() / 1000;
	// const end = endDate.getTime() / 1000;
	// const duration = (end) - start;
	const elapsedSeconds = duration / 1000;
	const hours = Math.floor(elapsedSeconds / 3600);
	const minutes = Math.floor((elapsedSeconds % 3600) / 60);
	const durationFormatted = `${hours > 0 ? hours + "h " : ""}${minutes}m`;
	return durationFormatted;
};
