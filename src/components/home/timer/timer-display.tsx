import { FC } from "react";

interface TimerDisplayProps {
	formattedTime: string;
}

export const TimerDisplay: FC<TimerDisplayProps> = ({ formattedTime }) => {
	return (
		<div className="text-4xl font-mono font-bold w-full text-center py-4 text-blue-500">
			{formattedTime}
		</div>
	);
};
