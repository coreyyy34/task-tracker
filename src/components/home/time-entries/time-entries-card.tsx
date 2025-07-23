import { Filter, Logs, Plus } from "lucide-react";
import { Card, CardTitle } from "../../card";
import { TimeEntriesList } from "./time-entries-list";
import { Button } from "@/components/common/button";
import { useState } from "react";
import { TimeEntryFormDialog } from "./time-entry-form-dialog";
import { PublicTimeEntryWithTag } from "@/types/client";
import { Input, InputGroup, InputLabel } from "@/components/input";
import TimeEntryFilters from "./time-entry-filters";

const TimeEntriesCard = () => {
	const [isFiltersOpen, setFiltersOpen] = useState(false);
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

	return (
		<Card className="px-0 py-4">
			<div>
				<div className="px-4 flex items-center justify-between">
					<CardTitle title="Time Entries" icon={Logs} />
					<div className="space-x-2">
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
					</div>
				</div>

				<div
					className={`px-4 grid transition-all duration-500 ${
						isFiltersOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
					}`}
				>
					<div className="overflow-hidden">
						<TimeEntryFilters />
					</div>
				</div>
			</div>

			<hr className="text-gray-300" />

			<div className="px-4">
				<TimeEntriesList />
			</div>

			<TimeEntryFormDialog
				isOpen={isFormOpen}
				setIsOpen={handleFormClose}
				entry={editingEntry}
			/>
		</Card>
	);
};

export default TimeEntriesCard;
