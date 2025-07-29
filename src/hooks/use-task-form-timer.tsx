"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import { useTimer } from "@/contexts/timer-context";
import { useTimeEntries } from "@/contexts/tasks-context";
import { clientTimeEntrySchema } from "@/lib/schemas";
import { TimeEntryForm } from "@/types/client";

export const useTaskFormTimer = () => {
	const { createTimeEntry } = useTimeEntries();
	const { startDate, isRunning, start, reset } = useTimer();

	const formRef = useRef<HTMLFormElement>(null);
	const [isSavingTimeEntry, setIsSavingTimeEntry] = useState(false);
	const [isStopDialogOpen, setIsStopDialogOpen] = useState(false);
	const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
	const formDataRef = useRef<TimeEntryForm | null>(null);

	const form = useForm<TimeEntryForm>({
		resolver: yupResolver(clientTimeEntrySchema),
		mode: "onSubmit",
	});

	const onValidSubmit = (data: TimeEntryForm) => {
		formDataRef.current = data;
		setIsStopDialogOpen(true);
	};

	const handleStop = () => {
		formRef?.current?.requestSubmit();
	};

	const handleConfirmReset = () => {
		form.reset();
		reset();
	};

	const handleConfirmStop = async () => {
		if (!startDate || !formDataRef.current) {
			toast.error("Cannot save time entry: missing task data.");
			setIsStopDialogOpen(false);
			return;
		}

		const formData = formDataRef.current;
		const endDate = new Date();
		setIsSavingTimeEntry(true);

		try {
			await createTimeEntry({
				...formData,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
			});
			toast.success("Time entry saved successfully!");
			form.reset();
			reset();
		} catch {
			toast.error("Failed to save time entry. Please try again.");
		} finally {
			setIsSavingTimeEntry(false);
			setIsStopDialogOpen(false);
			formDataRef.current = null;
		}
	};

	return {
		form,
		formRef,
		isSavingTimeEntry,
		isRunning,
		isStopDialogOpen,
		setIsStopDialogOpen,
		isResetDialogOpen,
		setIsResetDialogOpen,
		handleStart: start,
		handleStop,
		handleReset: handleConfirmReset,
		handleStopSubmission: form.handleSubmit(onValidSubmit),
		handleConfirmStop,
	};
};
