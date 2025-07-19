"use client";

import {
	Description,
	Dialog,
	DialogPanel,
	DialogTitle,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { X } from "lucide-react";
import type { FC, PropsWithChildren, ReactNode } from "react";

interface BaseDialogProps extends PropsWithChildren {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	title: string;
	description?: string;
	buttons?: ReactNode;
}

export const BaseDialog: FC<BaseDialogProps> = ({
	isOpen,
	setIsOpen,
	title,
	description,
	buttons,
	children,
}) => {
	return (
		<Transition appear show={isOpen}>
			<Dialog
				as="div"
				className="relative z-50"
				onClose={() => setIsOpen(false)}
			>
				{/* Backdrop */}
				<TransitionChild
					as="div"
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					className="fixed inset-0 bg-black/50"
				/>

				{/* Dialog positioning */}
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<TransitionChild
							as={DialogPanel}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
							className="w-full max-w-md transform overflow-hidden rounded-lg bg-white shadow-xl transition-all my-8"
						>
							<div className="relative max-h-[calc(100vh-4rem)] overflow-y-auto">
								<div className="p-6">
									{/* Top right close button */}
									<button
										onClick={() => setIsOpen(false)}
										className="absolute right-4 top-4 z-10 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
									>
										<X className="h-5 w-5" />
										<span className="sr-only">Close</span>
									</button>

									<DialogTitle
										as="h3"
										className="mt-4 text-lg font-medium text-gray-900 pr-8"
									>
										{title}
									</DialogTitle>

									{description && (
										<Description as="div" className="mt-2">
											<p className="text-sm text-gray-500">
												{description}
											</p>
										</Description>
									)}

									{children && (
										<div className="mt-4">{children}</div>
									)}

									{buttons && (
										<div className="mt-6 flex justify-end gap-3 sticky bottom-0 bg-white pt-4 border-t border-gray-100">
											{buttons}
										</div>
									)}
								</div>
							</div>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};
