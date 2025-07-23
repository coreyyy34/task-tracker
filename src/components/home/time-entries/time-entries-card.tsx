import { Logs } from "lucide-react";
import { Card, CardTitle } from "../../card";
import { TimeEntriesList } from "./time-entries-list";

const TimeEntriesCard = () => {
	return (
		<Card>
			<CardTitle title="Time Entries" icon={Logs} />
			<TimeEntriesList />
		</Card>
	);
};

export default TimeEntriesCard;
