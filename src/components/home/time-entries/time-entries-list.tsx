import { useTimeEntries } from "@/contexts/tasks-context";
import { TimeEntryCard } from "./time-entry-card";

export const TimeEntriesList = () => {
	const { timeEntries } = useTimeEntries();

	return (
		<div className="space-y-4">
			{timeEntries.map((entry) => (
				<TimeEntryCard key={entry.id} entry={entry} />
			))}
		</div>
	);
};
