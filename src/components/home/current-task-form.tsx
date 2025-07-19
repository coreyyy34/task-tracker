import { Form, Input, InputGroup, InputLabel } from "@/components/input";
import { TimeEntryForm } from "@/types/client";
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";

interface CurrentTaskFormProps {
	form: UseFormReturn<TimeEntryForm>;
}

export const CurrentTaskForm: FC<CurrentTaskFormProps> = ({ form }) => {
	const {
		register,
		formState: { errors },
	} = form;

	return (
		<Form>
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
		</Form>
	);
};
