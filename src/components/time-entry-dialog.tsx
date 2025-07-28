"use client";

import type { FC } from "react";
import { Clock, Tag, FileText, Calendar } from "lucide-react";
import { BaseDialog } from "./dialog/dialog";
import { formatDate, formatDuration, formatTime } from "@/util/format";

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
	timeEntry: PublicTimeEntryWithTag | undefined;
}

export const TimeEntryDialog: FC<TimeEntryDialogProps> = ({
	isOpen,
	setIsOpen,
	timeEntry,
}) => {
	return (
		<BaseDialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title="Time Entry Details"
		>
			{timeEntry && (
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
								{formatDate(new Date(timeEntry.startTime))}
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
								{formatTime(new Date(timeEntry.startTime))} -{" "}
								{formatTime(new Date(timeEntry.endTime))}
							</p>
							<p className="text-xs text-gray-500">
								Duration:{" "}
								{formatDuration(
									new Date(timeEntry.endTime).getTime() -
										new Date(timeEntry.startTime).getTime()
								)}
							</p>
						</div>
					</div>

					{/* Tag */}
					<div className="flex items-center gap-3">
						<Tag className="h-5 w-5 text-gray-400" />
						<div>
							<p className="text-sm font-medium text-gray-700">
								Tag
							</p>
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
			)}
		</BaseDialog>
	);
};
