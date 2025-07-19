"use client";

import { Play, RotateCcw, Square } from "lucide-react";
import { useState } from "react";
import { useTimer } from "@/hooks/use-timer";
import { TimerDisplay } from "./timer-display";
import { Button } from "../../common/button";
import { ConfirmationDialog } from "@/components/dialog/confirmation-dialog";

interface TimerInterfaceProps {
	onStop: (startDate: Date) => void;
	onValidate: () => Promise<boolean>;
	saving: boolean;
}

export const TimerInterface = ({
	onStop,
	onValidate,
	saving,
}: TimerInterfaceProps) => {
	const [isTimerActive, setTimerActive] = useState(false);
	const {
		startDate,
		formattedTime,
		reset: resetElapsedSeconds,
	} = useTimer(isTimerActive);

	const [stopDialogOpen, setStopDialogOpen] = useState(false);
	const [resetDialogOpen, setResetDialogOpen] = useState(false);

	const handleClickStart = () => {
		setTimerActive(true);
	};

	const handleClickStop = async () => {
		const isFormValid = await onValidate();
		if (isFormValid) {
			setStopDialogOpen(true);
		}
	};

	const handleClickReset = () => {
		setResetDialogOpen(true);
	};

	const handleClickStopConfirm = () => {
		// this shouldn't happen, timer sets the start date when its started
		if (!startDate) return;

		onStop(startDate);
		setTimerActive(false);
		resetElapsedSeconds();
		setStopDialogOpen(false);
	};

	const handleClickResetConfirm = () => {
		setTimerActive(false);
		resetElapsedSeconds();
		setResetDialogOpen(false);
	};

	return (
		<>
			<TimerDisplay formattedTime={formattedTime} />
			<div className="flex justify-center gap-2 mt-2">
				{!isTimerActive ? (
					<Button onClick={handleClickStart}>
						<Play className="h-4 w-4 mr-2" />
						Start Timer
					</Button>
				) : (
					<>
						<Button onClick={handleClickStop} loading={saving}>
							<Square className="h-4 w-4 mr-2" />
							Stop Timer
						</Button>
						<Button variant="outline" onClick={handleClickReset}>
							<RotateCcw className="h-4 w-4 mr-2" />
							Reset
						</Button>
					</>
				)}
			</div>

			<ConfirmationDialog
				isOpen={stopDialogOpen}
				setIsOpen={setStopDialogOpen}
				title="Stop Current Timer"
				description="Are you sure you want to stop the current timer? This will save your current time entry."
				onConfirm={handleClickStopConfirm}
				confirmText="Stop Timer"
			/>
			<ConfirmationDialog
				isOpen={resetDialogOpen}
				setIsOpen={setResetDialogOpen}
				title="Reset Timer"
				description="Are you sure you want to reset the timer? This will discard the current time entry."
				onConfirm={handleClickResetConfirm}
				confirmText="Reset Timer"
				confirmVariant="destructive"
			/>
		</>
	);
};
