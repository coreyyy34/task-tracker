import { useTimer } from "@/contexts/timer-context";
import { useElapsedSeconds } from "@/hooks/use-elapsed-seconds";
import { formatSeconds } from "@/util/format";

export const TimerDisplay = () => {
	const { startDate, isRunning } = useTimer();
	const elapsedSeconds = useElapsedSeconds(startDate, isRunning);

	return (
		<div className="text-4xl font-mono font-bold w-full text-center py-4 text-blue-500">
			{formatSeconds(elapsedSeconds)}
		</div>
	);
};
