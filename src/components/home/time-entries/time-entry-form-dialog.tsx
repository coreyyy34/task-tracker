import { Button } from "@/components/common/button";
import { BaseDialog } from "@/components/dialog/dialog";
import { Form, Input, InputGroup, InputLabel } from "@/components/input";
import { PublicTimeEntryWithTag } from "@/types/client";
import { FC } from "react";

interface TimeEntryFormDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	entry?: PublicTimeEntryWithTag;
}

export const TimeEntryFormDialog: FC<TimeEntryFormDialogProps> = ({
	isOpen,
	setIsOpen,
	entry,
}) => {
	return (
		<BaseDialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title={`${entry ? "Edit" : "Add"} Entry`}
			size="lg"
			buttons={
				<>
					<Button variant="outline" onClick={() => setIsOpen(false)}>
						Cancel
					</Button>
					<Button>{entry ? "Save" : "Add"}</Button>
				</>
			}
		>
			<Form>
				<InputGroup>
					<InputLabel text="Task Name" required />
					<Input
						placeholder={
							entry
								? "What were you working on?"
								: "What did you work on?"
						}
					/>
				</InputGroup>

				<div className="flex gap-2">
					<InputGroup>
						<InputLabel text="Start Date" required />
						<Input type="date" />
					</InputGroup>
					<InputGroup>
						<InputLabel text="Start Time" required />
						<Input type="time" />
					</InputGroup>
				</div>

				<div className="flex gap-2">
					<InputGroup>
						<InputLabel text="End Date" required />
						<Input type="date" />
					</InputGroup>
					<InputGroup>
						<InputLabel text="End Time" required />
						<Input type="time" />
					</InputGroup>
				</div>

				<InputGroup>
					<InputLabel text="Notes" />
					<Input
						type="textarea"
						rows={5}
						placeholder="Enter commit IDs, document links, etc"
					/>
				</InputGroup>
			</Form>
		</BaseDialog>
	);
};
