"use client";

import { useTimeEntries } from "@/contexts/tasks-context";
import { TimeEntryTableRow } from "./time-entry-table-row";

export const TimeEntryTable = () => {
	const { timeEntries } = useTimeEntries();

	return (
		<div className="w-full overflow-x-auto rounded-md border border-blue-500/10">
			<table className="w-full border-collapse">
				<thead className="table-header-group">
					{!timeEntries || timeEntries.length === 0 ? (
						<tr>
							<td
								colSpan={6}
								className="px-4 py-8 text-center text-gray-500"
							>
								No time entries yet.
							</td>
						</tr>
					) : (
						<tr className="bg-blue-500/10 text-left">
							<th className="px-4 py-3 text-sm font-medium text-blue-500 w-3/12">
								Task
							</th>
							<th className="px-4 py-3 text-sm font-medium text-blue-500 w-2/12">
								Tag
							</th>
							<th className="px-4 py-3 text-sm font-medium text-blue-500 w-2/12">
								Start
							</th>
							<th className="px-4 py-3 text-sm font-medium text-blue-500 w-2/12">
								End
							</th>
							<th className="px-4 py-3 text-sm font-medium text-blue-500 w-2/12">
								Duration
							</th>
							<th className="px-4 py-3 text-sm font-medium text-blue-500 w-1/12"></th>
						</tr>
					)}
				</thead>
				<tbody className="divide-y divide-blue-500/10">
					{timeEntries.length !== 0 &&
						timeEntries.map((entry) => (
							<TimeEntryTableRow key={entry.id} entry={entry} />
						))}
				</tbody>
			</table>
		</div>
	);
};
