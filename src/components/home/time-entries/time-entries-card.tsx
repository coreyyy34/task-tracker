import { Logs } from "lucide-react";
import { Card, CardTitle } from "../../card";
import { TimeEntryTable } from "./time-entry-table";

const TimeEntriesCard = () => {
	return (
		<Card>
			<CardTitle title="Time Entries" icon={Logs} />
			<TimeEntryTable />
		</Card>
	);
};

export default TimeEntriesCard;
