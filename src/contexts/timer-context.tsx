import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useState,
} from "react";

interface TimerContextType {
	startDate: Date | null;
	isRunning: boolean;
	start: () => void;
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

	const reset = () => {
		setStartDate(null);
		setIsRunning(false);
	};

	return (
		<TimerContext.Provider value={{ startDate, isRunning, start, reset }}>
			{children}
		</TimerContext.Provider>
	);
};

export const useTimer = () => {
	const context = useContext(TimerContext);
	if (!context) throw new Error("useTimer must be used within TimerProvider");
	return context;
};
