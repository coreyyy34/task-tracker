"use client";

import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { forwardRef, useState, type ForwardedRef } from "react";
import { Input } from "./input";

export interface Tag {
	id: string;
	name: string;
}

interface TagInputProps {
	tags: Tag[];
	value: Tag | null;
	onChange: (tag: Tag) => void;
	onCreateTag?: (name: string) => void;
	placeholder?: string;
	className?: string;
	error?: string;
}

export const TagInput = forwardRef(
	(
		{
			tags,
			value,
			onChange,
			onCreateTag,
			placeholder = "Select a tag...",
			className,
			error,
		}: TagInputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const [query, setQuery] = useState("");

		const filteredTags =
			query === ""
				? tags
				: tags.filter((tag) =>
						tag.name
							.toLowerCase()
							.replace(/\s+/g, "")
							.includes(query.toLowerCase().replace(/\s+/g, ""))
				  );

		return (
			<div className="relative w-full">
				<Combobox value={value} onChange={onChange}>
					{({ open }) => (
						<div>
							<div className="relative w-full">
								<ComboboxInput
									as={Input}
									ref={ref}
									className={className}
									error={error}
									placeholder={placeholder}
									displayValue={(tag: Tag | null) =>
										tag?.name || ""
									}
									onChange={(e) => setQuery(e.target.value)}
									onClick={() => {
										if (!open) {
											// Reset query when opening to show all options
											setQuery("");
										}
									}}
								/>
								<ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
									<ChevronDownIcon
										className="h-5 w-5 text-neutral-400"
										aria-hidden="true"
									/>
								</ComboboxButton>
							</div>
							<Transition
								as="div"
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
								afterLeave={() => setQuery("")}
							>
								<ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
									{filteredTags.length === 0 &&
									query !== "" &&
									onCreateTag ? (
										<div className="relative cursor-default select-none py-2 px-4 text-neutral-700">
											<button
												type="button"
												className="w-full text-left text-primary hover:text-primary-dark"
												onClick={() => {
													onCreateTag(query);
													setQuery("");
												}}
											>
												Create &quot;{query}&quot;
											</button>
										</div>
									) : (
										filteredTags.map((tag) => (
											<ComboboxOption
												key={tag.id}
												className={({ active }) =>
													`relative cursor-default select-none py-2 pl-10 pr-4 ${
														active
															? "bg-primary text-white"
															: "text-neutral-900"
													}`
												}
												value={tag}
											>
												{({ selected, active }) => (
													<>
														<span
															className={`block truncate ${
																selected
																	? "font-medium"
																	: "font-normal"
															}`}
														>
															{tag.name}
														</span>
														{selected ? (
															<span
																className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																	active
																		? "text-white"
																		: "text-primary"
																}`}
															>
																<CheckIcon
																	className="h-5 w-5"
																	aria-hidden="true"
																/>
															</span>
														) : null}
													</>
												)}
											</ComboboxOption>
										))
									)}
								</ComboboxOptions>
							</Transition>
						</div>
					)}
				</Combobox>
			</div>
		);
	}
);

TagInput.displayName = "TagInput";
