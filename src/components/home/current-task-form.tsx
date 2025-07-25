import { Form, Input, InputGroup, InputLabel } from "@/components/input";
import { TimeEntryForm } from "@/types/client";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../common/button";
import { Square } from "lucide-react";

interface CurrentTaskFormProps {
	form: UseFormReturn<TimeEntryForm>;
	onSubmit: (data: TimeEntryForm) => void;
}

export const CurrentTaskForm: FC<CurrentTaskFormProps> = ({
	form,
	onSubmit,
}) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = form;

	return (
		<Form id="current-time-entry-form" onSubmit={handleSubmit(onSubmit)}>
			<InputGroup>
				<InputLabel text="Task Name" />
				<Input
					placeholder="What are you working on?"
					error={errors.taskName?.message}
					{...register("taskName")}
				/>
			</InputGroup>
			<InputGroup>
				<InputLabel text="Tag" />
				<Input
					placeholder="Select or create a tag"
					error={errors.tagName?.message}
					{...register("tagName")}
				/>
			</InputGroup>
			<InputGroup>
				<InputLabel text="Notes" />
				<Input
					type="textarea"
					rows={5}
					placeholder="Enter commit IDs, document links, etc"
					error={errors.notes?.message}
					{...register("notes")}
				/>
			</InputGroup>

			<Button>
				<Square className="h-4 w-4 mr-2" />
				Stop Timer
			</Button>
		</Form>
	);
};
