import { Button } from "@/components/common/button";
import type { PublicTimeEntryWithTag } from "@/types/client";
import { formatDate, formatDuration, formatTime } from "@/util/format";
import { Calendar, Clock } from "lucide-react";
import type { FC } from "react";

interface TimeEntryCardProps {
	entry: PublicTimeEntryWithTag;
	onView: () => void;
}

export const TimeEntryCard: FC<TimeEntryCardProps> = ({ entry, onView }) => {
	const startDate = new Date(entry.startTime);
	const endDate = new Date(entry.endTime);
	const duration = endDate.getTime() - startDate.getTime();

	return (
		<div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300">
			<div className="flex flex-col gap-2">
				{/* Title, dates, duration */}
				<div className="flex items-center gap-4">
					<div className="flex-1 flex flex-col gap-1 overflow-hidden">
						<h3 className="font-medium text-gray-900 truncate">
							{entry.taskName}
						</h3>
						<div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
							<div className="flex items-center gap-1">
								<Calendar className="w-4 h-4" />
								<span>{formatDate(startDate)}</span>
							</div>
							<div className="flex items-center gap-1">
								<Clock className="w-4 h-4" />
								<span>
									{formatTime(startDate)} -{" "}
									{formatTime(endDate)}
								</span>
							</div>
						</div>
					</div>
					<span className="text-lg font-semibold text-gray-900">
						{formatDuration(duration)}
					</span>
					<Button variant="outline" size="sm" onClick={onView}>
						View
					</Button>
				</div>

				{/* Notes */}
				{entry.notes.length > 0 && (
					<p className="text-sm text-gray-600 overflow-hidden text-ellipsis break-words line-clamp-2">
						{entry.notes}
					</p>
				)}

				{/* Tags */}
				<div className="flex flex-wrap items-center gap-2 text-sm">
					<span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-medium">
						<span>{entry.tag.name}</span>
						<span className="text-xs">1h</span>
					</span>
				</div>
			</div>
		</div>
	);
};
