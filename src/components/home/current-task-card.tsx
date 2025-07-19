"use client";

import { Clock } from "lucide-react";
import { Card, CardTitle } from "../card";
import { useForm } from "react-hook-form";
import { TimeEntryForm } from "@/types/client";
import { CurrentTaskForm } from "./current-task-form";
import { TimerInterface } from "./timer/timer-interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { clientTimeEntrySchema } from "@/lib/schemas";
import { useTimeEntries } from "@/contexts/tasks-context";
import toast from "react-hot-toast";
import { useState } from "react";

const CurrentTaskCard = () => {
	const { createTimeEntry } = useTimeEntries();
	const [saving, setSaving] = useState(false);

	const form = useForm<TimeEntryForm>({
		resolver: yupResolver(clientTimeEntrySchema),
		mode: "onSubmit",
		defaultValues: {
			taskName: "",
			tagName: "",
			notes: "",
		},
	});

	const handleValidate = async () => {
		const isFormValid = await form.trigger();
		return isFormValid;
	};

	const handleStopTimer = async (startDate: Date) => {
		const formData = form.getValues();
		const endDate = new Date();
		try {
			setSaving(true);
			await createTimeEntry({
				taskName: formData.taskName,
				tagName: formData.tagName,
				notes: formData.notes,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			});
			toast.success("Successfully saved time entry");
			form.reset();
		} catch {
			toast.error("Failed to save time entry");
		} finally {
			setSaving(false);
		}
	};

	return (
		<Card>
			<CardTitle title="Current Task" icon={Clock} />
			<CurrentTaskForm form={form} />
			<TimerInterface
				onStop={handleStopTimer}
				onValidate={handleValidate}
				saving={saving}
			/>
		</Card>
	);
};

export default CurrentTaskCard;
