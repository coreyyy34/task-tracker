import clsx from "clsx";
import { CircleAlert } from "lucide-react";
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import React, { ForwardedRef, forwardRef } from "react";

interface SharedProps {
	className?: string;
	error?: string;
}

type InputProps =
	| (SharedProps &
			InputHTMLAttributes<HTMLInputElement> & {
				type?: Exclude<string, "textarea">;
			})
	| (SharedProps &
			TextareaHTMLAttributes<HTMLTextAreaElement> & { type: "textarea" });

const Input: React.FC<InputProps> = forwardRef(
	(
		{ className, error, type, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const commonClasses = clsx(
			"mt-2 w-full rounded-lg border px-3 py-2 shadow-sm outline-none transition-colors duration-300 border-neutral-300 focus:border-primary placeholder:text-neutral-500",
			error && "border-red-500 focus:border-red-500",
			className
		);

		const element =
			type === "textarea" ? (
				<textarea
					{...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
					ref={ref as ForwardedRef<HTMLTextAreaElement>}
					className={commonClasses}
				/>
			) : (
				<input
					type={type}
					{...(props as InputHTMLAttributes<HTMLInputElement>)}
					ref={ref as ForwardedRef<HTMLInputElement>}
					className={commonClasses}
				/>
			);

		return (
			<div>
				{element}
				{error && (
					<div className="flex items-center text-red-500 gap-2 mt-2">
						<CircleAlert size={16} />
						<span>{error}</span>
					</div>
				)}
			</div>
		);
	}
);

Input.displayName = "Input";

export { Input };
