type LogLevel = "info" | "warn" | "error";

class Logger {
	static log(
		level: LogLevel,
		context: string,
		message: string,
		meta?: Record<string, unknown>
	) {
		const timestamp = new Date().toISOString();
		console[level]({
			timestamp,
			level,
			context,
			message,
			...meta,
		});
	}

	static info(
		context: string,
		message: string,
		meta?: Record<string, unknown>
	) {
		this.log("info", context, message, meta);
	}

	static warn(
		context: string,
		message: string,
		meta?: Record<string, unknown>
	) {
		this.log("warn", context, message, meta);
	}

	static error(
		context: string,
		message: string,
		meta?: Record<string, unknown>
	) {
		this.log("error", context, message, meta);
	}
}

export default Logger;
