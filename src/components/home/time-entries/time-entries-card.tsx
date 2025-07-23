import { Filter, Logs, Plus } from "lucide-react";
import { Card, CardTitle } from "../../card";
import { TimeEntriesList } from "./time-entries-list";
import { Button } from "@/components/common/button";

const TimeEntriesCard = () => {
	return (
		<Card>
			<div className="flex items-center justify-between">
				<CardTitle title="Time Entries" icon={Logs} />
				<div className="space-x-2">
					<Button variant="outline">
						<Filter />
						Filters
					</Button>
					<Button>
						<Plus />
						Add entry
					</Button>
				</div>
			</div>

			<TimeEntriesList />
		</Card>
	);
};

export default TimeEntriesCard;
