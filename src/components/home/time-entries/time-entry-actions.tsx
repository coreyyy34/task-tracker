"use client";

import { FC, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/common/button";
import { useTimeEntries } from "@/contexts/tasks-context";
import { TimeEntryDialog } from "@/components/time-entry-dialog";
import { ConfirmationDialog } from "@/components/dialog/confirmation-dialog";
import { PublicTimeEntryWithTag } from "@/types/client";

interface TimeEntryActionsProps {
	entry: PublicTimeEntryWithTag;
}

export const TimeEntryActions: FC<TimeEntryActionsProps> = ({ entry }) => {
	const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
		useState<boolean>(false);
	const { deleteTimeEntry } = useTimeEntries();

	const handleDeleteTimeEntryConfirm = () => {
		setIsDeleteDialogOpen(false);
		deleteTimeEntry(entry);
	};

	return (
		<div className="flex justify-end space-x-1">
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setIsEditDialogOpen(true)}
				className="text-blue-500 hover:text-blue-700 transition-all hover:scale-105"
			>
				<Pencil className="h-4 w-4" />
			</Button>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setIsDeleteDialogOpen(true)}
				className="text-red-500 hover:text-red-700 transition-all hover:scale-105"
			>
				<Trash2 className="h-4 w-4" />
			</Button>

			<ConfirmationDialog
				isOpen={isDeleteDialogOpen}
				setIsOpen={setIsDeleteDialogOpen}
				title="Delete Time Entry"
				description="Are you sure you want to delete this record?"
				onConfirm={handleDeleteTimeEntryConfirm}
				confirmText="Delete"
				confirmVariant="destructive"
			/>

			{isEditDialogOpen && (
				<TimeEntryDialog
					isOpen={isEditDialogOpen}
					setIsOpen={setIsEditDialogOpen}
					timeEntry={entry}
				></TimeEntryDialog>
			)}
		</div>
	);
};
