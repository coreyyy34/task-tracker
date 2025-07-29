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

	const parts = [];
	if (hours > 0) parts.push(`${hours}h`);
	if (minutes > 0) parts.push(`${minutes}m`);
	if (seconds > 0) parts.push(`${seconds}s`);
	return parts.length > 0 ? parts.join(" ") : "0s";
};
