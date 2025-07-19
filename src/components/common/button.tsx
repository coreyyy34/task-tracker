import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/util/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-blue-600 text-white shadow hover:bg-blue-700 focus-visible:ring-blue-500",
				destructive:
					"bg-red-600 text-white shadow hover:bg-red-700 focus-visible:ring-red-500",
				outline:
					"border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-blue-500",
				secondary:
					"bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:ring-gray-500",
				ghost: "hover:bg-white/10 hover:text-current focus-visible:ring-white/20",
				navGhost:
					"text-white hover:bg-white/10 hover:text-white focus-visible:ring-white/20",
				link: "text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500",
				success:
					"bg-green-600 text-white shadow hover:bg-green-700 focus-visible:ring-green-500",
				warning:
					"bg-yellow-600 text-white shadow hover:bg-yellow-700 focus-visible:ring-yellow-500",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-lg px-8",
				xl: "h-12 rounded-lg px-10 text-base",
				icon: "h-9 w-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			loading = false,
			disabled,
			children,
			...props
		},
		ref
	) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				disabled={disabled || loading}
				{...props}
			>
				{loading && (
					<svg
						className="animate-spin -ml-1 mr-2 h-4 w-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						/>
					</svg>
				)}
				{children}
			</button>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
