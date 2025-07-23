import { Filter, Logs, Plus } from "lucide-react";
import { Card, CardTitle } from "../../card";
import { TimeEntriesList } from "./time-entries-list";
import { Button } from "@/components/common/button";
import { useState } from "react";
import { TimeEntryFormDialog } from "./time-entry-form-dialog";
import { PublicTimeEntryWithTag } from "@/types/client";
import { Input, InputGroup, InputLabel } from "@/components/input";

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
		<Card>
			<div className="flex items-center justify-between">
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
				className={`grid transition-all duration-500 ${
					isFiltersOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
				}`}
			>
				<div className="overflow-hidden">
					<div className="p-4 bg-gray-50 rounded-lg space-y-4">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<InputGroup>
								<InputLabel text="Filter by Tag" />
								<Input />
							</InputGroup>
							<InputGroup>
								<InputLabel text="Filter by Date" />
								<Input type="date" />
							</InputGroup>
						</div>
						<div className="flex gap-2">
							<Button variant="outline" size="sm">
								Clear Filters
							</Button>
						</div>
					</div>
				</div>
			</div>

			<TimeEntriesList />
			<TimeEntryFormDialog
				isOpen={isFormOpen}
				setIsOpen={handleFormClose}
				entry={editingEntry}
			/>
		</Card>
	);
};

export default TimeEntriesCard;
