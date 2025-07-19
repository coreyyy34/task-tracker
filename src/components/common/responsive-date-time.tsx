import { FC } from "react";

interface ResponsiveDateTimeProps {
	datetime: string;
}

export const ResponsiveDateTime: FC<ResponsiveDateTimeProps> = ({
	datetime,
}) => {
	if (!datetime) return null;

	const dateObj = new Date(datetime);
	if (isNaN(dateObj.getTime())) return <span>Invalid date</span>;

	const formatted = new Intl.DateTimeFormat("en-NZ", {
		day: "2-digit",
		month: "short",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	}).format(dateObj);

	const [datePart, timePart] = formatted.split(", ");

	return (
		<>
			<span className="block 2xl:inline">{datePart},</span>{" "}
			<span className="block 2xl:inline">{timePart}</span>
		</>
	);
};
