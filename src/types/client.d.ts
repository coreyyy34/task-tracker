export type PublicTimeEntryWithTag = {
	id: number;
	taskName: string;
	startTime: string;
	endTime: string;
	notes: string;
	tag: {
		id: number;
		name: string;
	};
};

export type TimeEntryForm = {
	taskName: string;
	tagName: string;
	notes: string | null;
};
