import { Button } from "@/components/common/button";
import { Input, InputGroup, InputLabel } from "@/components/input";

const TimeEntryFilters = () => (
	<div className="p-4 mt-4 bg-gray-50 rounded-lg space-y-4">
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
);

export default TimeEntryFilters;
