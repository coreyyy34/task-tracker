import { Logs } from "lucide-react";
import { Card, CardTitle } from "../../card";
import { useState } from "react";
import { TimeEntryFormDialog } from "./time-entry-form-dialog";
import { PublicTimeEntryWithTag } from "@/types/client";
import TimeEntryFilters from "./time-entry-filters";
import { AnimatePresence, motion } from "motion/react";
import { TimeEntryCard } from "./time-entry-card";
import { useTimeEntries } from "@/contexts/tasks-context";
import { TimeEntryDialog } from "@/components/time-entry-dialog";

const TimeEntriesCard = () => {
	const { timeEntries } = useTimeEntries();

	const [isFiltersOpen, setFiltersOpen] = useState(false);
	const [viewingTimeEntry, setViewingTimeEntry] = useState<
		PublicTimeEntryWithTag | undefined
	>();
	const [isViewingEntry, setIsViewingEntry] = useState(false);

	const [isFormOpen, setFormOpen] = useState(false);
	const [editingEntry, setEditingEntry] = useState<
		PublicTimeEntryWithTag | undefined
	>();

	const handleFormOpen = (entry?: PublicTimeEntryWithTag) => {
		setFormOpen(true);
		if (entry) setEditingEntry(entry);
	};

	const handleFormClose = () => {
		setFormOpen(false);
		setEditingEntry(undefined);
	};

	const handleViewTimeEntry = (entry: PublicTimeEntryWithTag) => {
		setViewingTimeEntry(entry);
		setIsViewingEntry(true);
	};

	const handleCloseViewTimeEntry = () => {
		setIsViewingEntry(false);
		setTimeout(() => {
			setViewingTimeEntry(undefined);
		}, 300);
	};

	return (
		<Card className="px-0 py-4">
			<div className="px-4">
				<div className="flex items-center justify-between">
					<CardTitle title="Time Entries" icon={Logs} />
					{/* <div className="space-x-2">
						<Button
							variant="outline"
							onClick={() => setFiltersOpen((prev) => !prev)}
						>
							<Filter />
							Filters
						</Button>
						<Button onClick={() => handleFormOpen()}>
							<Plus />
							Add entry
						</Button>
					</div> */}
				</div>

				<AnimatePresence initial={false}>
					{isFiltersOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
							className="overflow-hidden"
						>
							<TimeEntryFilters />
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<hr className="text-gray-300" />

			<div className="space-y-4 px-4">
				{timeEntries.map((entry) => (
					<TimeEntryCard
						key={entry.id}
						entry={entry}
						onView={() => handleViewTimeEntry(entry)}
					/>
				))}
			</div>

			<TimeEntryFormDialog
				isOpen={isFormOpen}
				setIsOpen={handleFormClose}
				entry={editingEntry}
			/>
			<TimeEntryDialog
				isOpen={isViewingEntry}
				setIsOpen={(open) => !open && handleCloseViewTimeEntry()}
				timeEntry={viewingTimeEntry}
			></TimeEntryDialog>
		</Card>
	);
};

export default TimeEntriesCard;
