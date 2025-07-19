// Path: /src/components/time-entries/TimeEntryTableRow.tsx
import { FC } from "react";
import { PublicTimeEntryWithTag } from "@/types/client";
import { TimeEntryActions } from "./time-entry-actions";
import { ResponsiveDateTime } from "../../common/responsive-date-time";

interface TimeEntryTableRowProps {
	entry: PublicTimeEntryWithTag;
}

export const TimeEntryTableRow: FC<TimeEntryTableRowProps> = ({ entry }) => {
	const start = new Date(entry.startTime).getTime() / 1000;
	const end = new Date(entry.endTime).getTime() / 1000;
	const elapsedSeconds = end - start;
	const hours = Math.floor(elapsedSeconds / 3600);
	const minutes = Math.floor((elapsedSeconds % 3600) / 60);
	const durationFormatted = `${hours > 0 ? hours + "h " : ""}${minutes}m`;

	return (
		<tr className="table-row hover:bg-purple-50/50">
			<td className="px-4 py-3">
				<div className="font-medium text-primary-dark">
					{entry.taskName}
				</div>
			</td>
			<td className="px-4 py-3">
				<span className="text-xs bg-neutral-500 text-white font-semibold rounded-md px-2 py-1">
					{entry.tag.name}
				</span>
			</td>
			<td className="px-4 py-3 text-sm text-gray-700">
				<ResponsiveDateTime datetime={entry.startTime} />
			</td>
			<td className="px-4 py-3 text-sm text-gray-700">
				<ResponsiveDateTime datetime={entry.endTime} />
			</td>
			<td className="px-4 py-3 font-mono text-sm text-gray-700">
				{durationFormatted}
			</td>
			<td className="px-4 py-3">
				<TimeEntryActions entry={entry} />
			</td>
		</tr>
	);
};
