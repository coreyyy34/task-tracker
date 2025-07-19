import { createContext, useContext, useState, useEffect } from "react";
import { PublicTimeEntryWithTag } from "@/types/client";
import { apiFetch } from "@/lib/api";
import { ROUTES } from "@/config/routes";
import { TimeEntryCreateInput } from "@/types/shared";
import { User } from "next-auth";

interface TimeEntriesContextValue {
	timeEntries: PublicTimeEntryWithTag[];
	createTimeEntry: (input: TimeEntryCreateInput) => Promise<void>;
	deleteTimeEntry: (timeEntry: PublicTimeEntryWithTag) => Promise<void>;
}

const TimeEntriesContext = createContext<TimeEntriesContextValue | undefined>(
	undefined
);

export const TimeEntriesProvider = ({
	user,
	children,
}: {
	user: User;
	children: React.ReactNode;
}) => {
	const [timeEntries, setTimeEntries] = useState<PublicTimeEntryWithTag[]>(
		[]
	);

	useEffect(() => {
		if (user) {
			fetchTimeEntries();
		}
	}, [user]);

	const fetchTimeEntries = async () => {
		const data = await apiFetch<PublicTimeEntryWithTag[]>("/api/tasks");
		setTimeEntries(data);
	};

	const createTimeEntry = async (input: TimeEntryCreateInput) => {
		const timeEntry = await apiFetch<PublicTimeEntryWithTag>(
			ROUTES.api.tasks,
			{
				method: "POST",
				body: JSON.stringify(input),
			}
		);
		setTimeEntries((prev) => [timeEntry, ...prev]);
	};

	const deleteTimeEntry = async (timeEntry: PublicTimeEntryWithTag) => {
		await apiFetch<PublicTimeEntryWithTag>(
			`${ROUTES.api.tasks}/${timeEntry.id}`,
			{
				method: "DELETE",
			}
		);
		setTimeEntries((prev) =>
			prev.filter((entry) => entry.id !== timeEntry.id)
		);
	};

	return (
		<TimeEntriesContext.Provider
			value={{ timeEntries, createTimeEntry, deleteTimeEntry }}
		>
			{children}
		</TimeEntriesContext.Provider>
	);
};

export const useTimeEntries = () => {
	const context = useContext(TimeEntriesContext);
	if (!context) throw new Error("useTasks must be used within TasksProvider");
	return context;
};
