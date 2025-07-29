"use client";

import { Clock } from "lucide-react";
import { Card, CardTitle } from "../card";
import { Form, Input, InputGroup, InputLabel } from "../input";
import { TimerInterface } from "./timer/timer-interface";
import { useTaskFormTimer } from "@/hooks/use-task-form-timer";

export const CurrentTaskCard = () => {
	const {
		form,
		formRef,
		isSavingTimeEntry,
		isRunning,
		isStopDialogOpen,
		setIsStopDialogOpen,
		isResetDialogOpen,
		setIsResetDialogOpen,
		handleStart,
		handleStop,
		handleReset,
		handleStopSubmission,
		handleConfirmStop,
	} = useTaskFormTimer();

	return (
		<Card>
			<CardTitle title="Current Task" icon={Clock} />
			<Form ref={formRef} onSubmit={handleStopSubmission}>
				<InputGroup>
					<InputLabel text="Task Name" />
					<Input
						placeholder="What are you working on?"
						error={form.formState.errors.taskName?.message}
						{...form.register("taskName")}
					/>
				</InputGroup>
				<InputGroup>
					<InputLabel text="Tag" />
					<Input
						placeholder="Select or create a tag"
						error={form.formState.errors.tagName?.message}
						{...form.register("tagName")}
					/>
				</InputGroup>
				<InputGroup>
					<InputLabel text="Notes" />
					<Input
						type="textarea"
						rows={5}
						placeholder="Enter commit IDs, document links, etc"
						error={form.formState.errors.notes?.message}
						{...form.register("notes")}
					/>
				</InputGroup>

				<TimerInterface
					isSavingTimeEntry={isSavingTimeEntry}
					isRunning={isRunning}
					isStopDialogOpen={isStopDialogOpen}
					setIsStopDialogOpen={setIsStopDialogOpen}
					isResetDialogOpen={isResetDialogOpen}
					setIsResetDialogOpen={setIsResetDialogOpen}
					onStart={handleStart}
					onStop={handleStop}
					onReset={handleReset}
					onStopConfirm={handleConfirmStop}
				/>
			</Form>
		</Card>
	);
};
