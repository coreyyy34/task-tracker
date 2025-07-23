import { Filter, Logs, Plus } from "lucide-react";
import { Card, CardTitle } from "../../card";
import { TimeEntriesList } from "./time-entries-list";
import { Button } from "@/components/common/button";
import { useState } from "react";
import { TimeEntryFormDialog } from "./time-entry-form-dialog";

const TimeEntriesCard = () => {
	const [isTimeEntryDialogOpen, setTimeEntryDialogOpen] = useState(false);

	return (
		<Card>
			<div className="flex items-center justify-between">
				<CardTitle title="Time Entries" icon={Logs} />
				<div className="space-x-2">
					<Button variant="outline">
						<Filter />
						Filters
					</Button>
					<Button onClick={() => setTimeEntryDialogOpen(true)}>
						<Plus />
						Add entry
					</Button>
				</div>
			</div>

			<TimeEntriesList />
			<TimeEntryFormDialog
				isOpen={isTimeEntryDialogOpen}
				setIsOpen={setTimeEntryDialogOpen}
			/>
		</Card>
	);
};

export default TimeEntriesCard;
