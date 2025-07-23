import type { PublicTimeEntryWithTag } from "@/types/client";
import { formatDate, formatDuration, formatTime } from "@/util/format";
import { Calendar, Clock } from "lucide-react";
import type { FC } from "react";

interface TimeEntryCardProps {
	entry: PublicTimeEntryWithTag;
}

export const TimeEntryCard: FC<TimeEntryCardProps> = ({ entry }) => {
	const startDate = new Date(entry.startTime);
	const endDate = new Date(entry.endTime);
	const duration = endDate.getTime() - startDate.getTime();

	return (
		<div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300 cursor-pointer">
			<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
				<div className="flex-1 min-w-0">
					<div className="flex items-start gap-3 mb-2">
						<div className="flex-1 min-w-0">
							<div className="flex">
								<h3 className="flex-1 font-medium text-gray-900 truncate">
									{entry.taskName}
								</h3>
								<span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full border flex-shrink-0">
									{entry.tag.name}
								</span>
							</div>

							<p className="text-sm text-gray-600 mt-1 overflow-hidden text-ellipsis break-words line-clamp-2">
								{entry.notes}
							</p>
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
						<div className="flex items-center gap-1">
							<Calendar className="w-4 h-4" />
							<span>{formatDate(startDate)}</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="w-4 h-4" />
							<span>
								{formatTime(startDate)} - {formatTime(endDate)}
							</span>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
					<div className="text-lg font-semibold text-gray-900">
						{formatDuration(duration)}
					</div>
				</div>
			</div>
		</div>
	);
};
