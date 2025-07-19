export type TimeEntryCreateInput = {
	taskName: string;
	tagName: string;
	notes: string | null;
	startDate: string;
	endDate: string;
};
