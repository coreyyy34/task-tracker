import { createContext, FC, PropsWithChildren, useState } from "react";

interface TimerContextType {
	startDate: Date | null;
	isRunning: boolean;
	start: () => void;
	stop: () => void;
	reset: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export const TimerProvider: FC<PropsWithChildren> = ({ children }) => {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [isRunning, setIsRunning] = useState(false);

	const start = () => {
		setStartDate(new Date());
		setIsRunning(true);
	};

	const stop = () => {
		setIsRunning(false);
	};

	const reset = () => {
		setStartDate(null);
		setIsRunning(false);
	};

	return (
		<TimerContext.Provider
			value={{ startDate, isRunning, start, stop, reset }}
		>
			{children}
		</TimerContext.Provider>
	);
};
