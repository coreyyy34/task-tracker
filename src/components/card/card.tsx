import { FC, PropsWithChildren } from "react";

export const Card: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="rounded-lg border-2 p-4 bg-neutral-100/25 border-gray-200 shadow-sm space-y-4">
			{children}
		</div>
	);
};
