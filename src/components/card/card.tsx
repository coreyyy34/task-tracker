import { cn } from "@/util/utils";
import { FC, PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
	className?: string;
}

export const Card: FC<CardProps> = ({ className, children }) => {
	return (
		<div
			className={cn(
				"rounded-lg border-2 p-4 bg-white border-gray-300 shadow-sm space-y-4",
				className
			)}
		>
			{children}
		</div>
	);
};
