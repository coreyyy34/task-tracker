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

export const formatDuration = (duration: number) => {
	const elapsedSeconds = Math.floor(duration / 1000);
	const hours = Math.floor(elapsedSeconds / 3600);
	const minutes = Math.floor((elapsedSeconds % 3600) / 60);
	const seconds = elapsedSeconds % 60;

	const durationFormatted = `${hours > 0 ? hours + "h " : ""}${
		minutes > 0 || hours > 0 ? minutes + "m " : ""
	}${seconds}s`;
	return durationFormatted;
};
