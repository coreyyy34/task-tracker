"use client";

import { FC, PropsWithChildren } from "react";
import { BaseDialog } from "./dialog";
import { Button } from "../common/button";

interface ConfirmationDialogProps extends PropsWithChildren {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	onConfirm: () => void;
	title: string;
	description: string;
	confirmText?: string;
	cancelText?: string;
	confirmVariant?: "default" | "destructive";
}

export const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
	isOpen,
	setIsOpen,
	title,
	description,
	onConfirm,
	confirmText = "Confirm",
	cancelText = "Cancel",
	confirmVariant = "default",
	children,
}) => {
	const handleConfirm = () => {
		onConfirm();
		setIsOpen(false);
	};

	return (
		<BaseDialog
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			title={title}
			description={description}
			buttons={
				<div className="mt-6 flex justify-end gap-3">
					<Button
						variant="outline"
						onClick={() => setIsOpen(false)}
						className="border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
					>
						{cancelText}
					</Button>
					<Button variant={confirmVariant} onClick={handleConfirm}>
						{confirmText}
					</Button>
				</div>
			}
		>
			{children}
		</BaseDialog>
	);
};
