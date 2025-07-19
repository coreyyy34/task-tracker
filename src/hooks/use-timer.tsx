import { formatSeconds } from "@/util/format";
import { useCallback, useEffect, useRef, useState } from "react";

interface TimerProps {
	startDate: Date | null;
	isActive: boolean;
	formattedTime: string;
	reset: () => void;
}

export const useTimer = (isActive: boolean): TimerProps => {
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const [startDate, setStartDate] = useState<Date | null>(null);

	const animationRef = useRef<number | null>(null);
	const startTimeRef = useRef<number | null>(null);
	const accumulatedTimeRef = useRef<number>(0);

	const updateElapsedTime = useCallback(() => {
		const now = Date.now();
		const currentIntervalElapsed = startTimeRef.current
			? (now - startTimeRef.current) / 1000
			: 0;
		const newTotalElapsed = Math.floor(
			accumulatedTimeRef.current + currentIntervalElapsed
		);

		// only update state if time has increased
		setElapsedSeconds((prevSeconds) => {
			if (newTotalElapsed > prevSeconds) {
				return newTotalElapsed;
			}
			return prevSeconds;
		});

		animationRef.current = requestAnimationFrame(updateElapsedTime);
	}, []);

	useEffect(() => {
		if (isActive) {
			startTimeRef.current = Date.now();
			if (startDate === null) {
				setStartDate(new Date());
			}
			animationRef.current = requestAnimationFrame(updateElapsedTime);
		} else {
			if (startTimeRef.current) {
				const now = Date.now();
				accumulatedTimeRef.current +=
					(now - startTimeRef.current) / 1000;
			}

			// stop animation updates
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
				animationRef.current = null;
			}
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
				animationRef.current = null;
			}
		};
	}, [isActive, startDate, updateElapsedTime]);

	useEffect(() => {
		// warns user if the timer is active when they close/reload the page
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (isActive) {
				e.preventDefault();
				e.returnValue = "";
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () =>
			window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isActive]);

	const reset = () => {
		setElapsedSeconds(0);
		setStartDate(null);
		startTimeRef.current = null;
		accumulatedTimeRef.current = 0;
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
			animationRef.current = null;
		}
	};

	return {
		startDate,
		isActive,
		formattedTime: formatSeconds(elapsedSeconds),
		reset,
	};
};
