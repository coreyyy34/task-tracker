import { useEffect, useRef, useState } from "react";

export const useElapsedSeconds = (
	startDate: Date | null,
	isActive: boolean
): number => {
	const [elapsed, setElapsed] = useState(0);

	const startTimeRef = useRef<number | null>(null); // track when timer last started
	const accumulatedRef = useRef<number>(0); // accumulated time across pauses
	const frameRef = useRef<number | null>(null); // to cancel animation frames

	const tick = () => {
		if (!isActive || !startTimeRef.current) return;

		const now = Date.now();
		const current = (now - startTimeRef.current) / 1000;
		const total = accumulatedRef.current + current;

		// only update if the whole second changed
		setElapsed((prev) => {
			const floored = Math.floor(total);
			return floored > prev ? floored : prev;
		});

		frameRef.current = requestAnimationFrame(tick);
	};

	// handles starting and stopping the animation loop when isActive or startDate changes
	useEffect(() => {
		if (isActive && startDate) {
			// resume timing from now
			startTimeRef.current = Date.now();
			frameRef.current = requestAnimationFrame(tick);
		} else {
			// paused - accumulate time so far
			if (startTimeRef.current) {
				const now = Date.now();
				accumulatedRef.current += (now - startTimeRef.current) / 1000;
				startTimeRef.current = null;
			}
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
		}

		return () => {
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
		};
	}, [isActive, startDate]);

	// handles resetting elapsed time when startDate is set to null
	useEffect(() => {
		if (startDate === null) {
			setElapsed(0);
			accumulatedRef.current = 0;
			startTimeRef.current = null;
			if (frameRef.current) {
				cancelAnimationFrame(frameRef.current);
				frameRef.current = null;
			}
		}
	}, [startDate]);

	return elapsed;
};
