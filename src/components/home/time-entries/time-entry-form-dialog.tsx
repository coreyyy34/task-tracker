import { Button } from "@/components/common/button";
import { BaseDialog } from "@/components/dialog/dialog";
import { Form, Input, InputGroup, InputLabel } from "@/components/input";
import { PublicTimeEntryWithTag } from "@/types/client";
import { FC, SetStateAction } from "react";

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
					<Button variant="outline">Cancel</Button>
					<Button>{entry ? "Save" : "Add"}</Button>
				</>
			}
		>
			<Form>
				<InputGroup>
					<InputLabel text="Task Name" />
					<Input />
				</InputGroup>

				<div className="flex gap-2">
					<InputGroup>
						<InputLabel text="Start Date" />
						<Input />
					</InputGroup>
					<InputGroup>
						<InputLabel text="Start Time" />
						<Input />
					</InputGroup>
				</div>

				<div className="flex gap-2">
					<InputGroup>
						<InputLabel text="End Date" />
						<Input />
					</InputGroup>
					<InputGroup>
						<InputLabel text="End Time" />
						<Input />
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
