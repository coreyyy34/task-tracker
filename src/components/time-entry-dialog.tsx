"use client";

import type { FC } from "react";
import { Clock, Tag, FileText, Calendar } from "lucide-react";
import { BaseDialog } from "./dialog/dialog";

export type PublicTimeEntryWithTag = {
	id: number;
	taskName: string;
	startTime: string;
	endTime: string;
	notes: string;
	tag: {
		id: number;
		name: string;
	};
};

interface TimeEntryDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	timeEntry: PublicTimeEntryWithTag | null;
}

export const TimeEntryDialog: FC<TimeEntryDialogProps> = ({
	isOpen,
	setIsOpen,
	timeEntry,
}) => {
	if (!timeEntry) return null;

	// Format time strings to be more readable
	const formatTime = (timeString: string) => {
		try {
			const date = new Date(timeString);
			return date.toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			});
		} catch {
			return timeString;
		}
	};

	// Format date string
	const formatDate = (timeString: string) => {
		try {
			const date = new Date(timeString);
			return date.toLocaleDateString([], {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		} catch {
			return timeString;
		}
	};

	// Calculate duration
	const calculateDuration = () => {
		try {
			const start = new Date(timeEntry.startTime);
			const end = new Date(timeEntry.endTime);
			const diffMs = end.getTime() - start.getTime();
			const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
			const diffMinutes = Math.floor(
				(diffMs % (1000 * 60 * 60)) / (1000 * 60)
			);

			if (diffHours > 0) {
				return `${diffHours}h ${diffMinutes}m`;
			}
			return `${diffMinutes}m`;
		} catch {
			return "Unknown";
		}
	};

	return (
		<BaseDialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title="Time Entry Details"
		>
			<div className="space-y-6 text-left">
				{/* Task Name */}
				<div>
					<h4 className="text-lg font-semibold text-gray-900 mb-2">
						{timeEntry.taskName}
					</h4>
				</div>

				{/* Date */}
				<div className="flex items-center gap-3">
					<Calendar className="h-5 w-5 text-gray-400" />
					<div>
						<p className="text-sm font-medium text-gray-700">
							Date
						</p>
						<p className="text-sm text-gray-600">
							{formatDate(timeEntry.startTime)}
						</p>
					</div>
				</div>

				{/* Time Range & Duration */}
				<div className="flex items-center gap-3">
					<Clock className="h-5 w-5 text-gray-400" />
					<div>
						<p className="text-sm font-medium text-gray-700">
							Time
						</p>
						<p className="text-sm text-gray-600">
							{formatTime(timeEntry.startTime)} -{" "}
							{formatTime(timeEntry.endTime)}
						</p>
						<p className="text-xs text-gray-500">
							Duration: {calculateDuration()}
						</p>
					</div>
				</div>

				{/* Tag */}
				<div className="flex items-center gap-3">
					<Tag className="h-5 w-5 text-gray-400" />
					<div>
						<p className="text-sm font-medium text-gray-700">Tag</p>
						<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
							{timeEntry.tag.name}
						</span>
					</div>
				</div>

				{/* Notes */}
				{timeEntry.notes && (
					<div className="flex items-start gap-3">
						<FileText className="h-5 w-5 text-gray-400 mt-0.5" />
						<div className="flex-1">
							<p className="text-sm font-medium text-gray-700 mb-1">
								Notes
							</p>
							<div className="bg-gray-50 rounded-lg p-3">
								<p className="text-sm text-gray-600 whitespace-pre-wrap">
									{timeEntry.notes}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
		</BaseDialog>
	);
};
