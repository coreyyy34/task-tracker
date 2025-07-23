import { Filter, Logs, Plus } from "lucide-react";
import { Card, CardTitle } from "../../card";
import { TimeEntriesList } from "./time-entries-list";
import { Button } from "@/components/common/button";
import { useState } from "react";
import { TimeEntryFormDialog } from "./time-entry-form-dialog";
import { PublicTimeEntryWithTag } from "@/types/client";

const TimeEntriesCard = () => {
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
					<Button variant="outline">
						<Filter />
						Filters
					</Button>
					<Button onClick={() => handleFormOpen()}>
						<Plus />
						Add entry
					</Button>
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
