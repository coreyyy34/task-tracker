"use client";

import { Play, RotateCcw, Square } from "lucide-react";
import { TimerDisplay } from "./timer-display";
import { Button } from "../../common/button";
import { ConfirmationDialog } from "@/components/dialog/confirmation-dialog";

interface TimerInterfaceProps {
	isSavingTimeEntry: boolean;
	isRunning: boolean;
	isStopDialogOpen: boolean;
	setIsStopDialogOpen: (open: boolean) => void;
	isResetDialogOpen: boolean;
	setIsResetDialogOpen: (open: boolean) => void;
	onStart: () => void;
	onStop: () => void;
	onReset: () => void;
	onStopConfirm: () => void;
}

export const TimerInterface = ({
	isSavingTimeEntry,
	isRunning,
	isStopDialogOpen,
	setIsStopDialogOpen,
	isResetDialogOpen,
	setIsResetDialogOpen,
	onStart,
	onStop,
	onReset,
	onStopConfirm,
}: TimerInterfaceProps) => {
	const handleStart = () => {
		onStart();
	};

	const handleStop = () => {
		onStop();
	};

	const handleReset = () => {
		setIsResetDialogOpen(true);
	};

	const handleConfirmReset = () => {
		onReset();
		setIsResetDialogOpen(false);
	};

	return (
		<>
			<TimerDisplay />

			<div className="flex justify-center gap-2 mt-2">
				{!isRunning ? (
					<Button type="button" onClick={handleStart}>
						<Play className="h-4 w-4 mr-2" />
						Start Timer
					</Button>
				) : (
					<>
						<Button
							type="button"
							onClick={handleStop}
							loading={isSavingTimeEntry}
						>
							<Square className="h-4 w-4 mr-2" />
							Stop Timer
						</Button>
						<Button
							variant="outline"
							type="button"
							onClick={handleReset}
							disabled={isSavingTimeEntry}
						>
							<RotateCcw className="h-4 w-4 mr-2" />
							Reset
						</Button>
					</>
				)}
			</div>

			<ConfirmationDialog
				isOpen={isStopDialogOpen}
				setIsOpen={setIsStopDialogOpen}
				title="Stop Current Timer"
				description="Are you sure you want to stop the current timer? This will save your current time entry."
				onConfirm={onStopConfirm}
				confirmText="Stop Timer"
			/>

			<ConfirmationDialog
				isOpen={isResetDialogOpen}
				setIsOpen={setIsResetDialogOpen}
				title="Reset Timer"
				description="Are you sure you want to reset the timer? This will discard the current time entry."
				onConfirm={handleConfirmReset}
				confirmText="Reset Timer"
				confirmVariant="destructive"
			/>
		</>
	);
};
