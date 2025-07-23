import { FC, PropsWithChildren } from "react";

export const Card: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="rounded-lg border-2 p-4 bg-white border-gray-300 shadow-sm space-y-4">
			{children}
		</div>
	);
};
