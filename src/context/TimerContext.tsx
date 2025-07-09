import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ITimerContext {
	timer: number;
	isTimerRunning: boolean;
	startTimer: () => void;
	pauseTimer: () => void;
	resetTimer: () => void;
	formatTime: (time: number) => string;
	changeTimer: (time: number) => void;
}

const initalContext = {
	timer: 0,
	isTimerRunning: false,
	startTimer: () => {},
	pauseTimer: () => {},
	resetTimer: () => {},
	formatTime: (time: number) => "",
	changeTimer: (time: number) => {},
};

export const TimerContext = createContext<ITimerContext>(initalContext);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
	const defaultTimerRef = useRef<number>(1500);
	const isRestRef = useRef<boolean>(true);
	const timerRef = useRef<number>(defaultTimerRef.current);

	const [timer, setTimer] = useState<number>(defaultTimerRef.current);
	const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
	const [worker, setWorker] = useState<Worker | null>(null);

	const startTimer = () => {
		const btnClickAudio = new Audio("/sounds/button-click.mp3");
		btnClickAudio.play();
		worker?.postMessage({ type: "START" });
		setIsTimerRunning(true);
	};

	const pauseTimer = () => {
		const btnClickAudio = new Audio("/sounds/button-click.mp3");
		btnClickAudio.play();
		worker?.postMessage({ type: "STOP" });
		setIsTimerRunning(false);
	};

	const resetTimer = () => {
		pauseTimer();
		isRestRef.current = true;
		timerRef.current = defaultTimerRef.current;
		setTimer(defaultTimerRef.current);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
			2,
			"0",
		)}`;
	};

	const changeTimer = (time: number) => {
		defaultTimerRef.current = time;
		resetTimer();
	};

	useEffect(() => {
		const blob = new Blob(
			[
				`
        let interval = null;

        self.onmessage = (e) => {
          if (e.data.type === "START") {
            interval = setInterval(() => {
              self.postMessage({ type: 'TICK' });
            }, 1000);
          } else if (e.data.type === 'STOP') {
            clearInterval(interval);
          }
        }
        `,
			],
			{ type: "text/javascript" },
		);
		const workerUrl = URL.createObjectURL(blob);
		const timerWorker = new Worker(workerUrl);

		timerWorker.onmessage = (e) => {
			if (e.data.type === "TICK") {
				if (timerRef.current <= 0) {
					const alarmAudio = new Audio("/sounds/alarm.mp3");
					alarmAudio.play();
					timerWorker.postMessage({ type: "STOP" });
					setIsTimerRunning(false);

					if (isRestRef.current) {
						// Transição para período de descanso
						isRestRef.current = false;
						const restTime = 5 * 60; // 5 minutos em segundos
						timerRef.current = restTime;
						setTimer(restTime);
						toast("Rest Time!");
						return;
					}

					// Transição para período de trabalho
					isRestRef.current = true;
					timerRef.current = defaultTimerRef.current;
					setTimer(defaultTimerRef.current);
					toast("Work Time!");
					return;
				}
				setTimer((prevTime) => {
					timerRef.current = prevTime - 1;
					return prevTime - 1;
				});

				document.title = `Timerify - ${formatTime(timerRef.current)}`;
			}
		};

		setWorker(timerWorker);

		return () => {
			timerWorker.terminate();
			URL.revokeObjectURL(workerUrl);
		};
	}, [defaultTimerRef]);

	return (
		<TimerContext.Provider
			value={{
				timer,
				isTimerRunning,
				startTimer,
				pauseTimer,
				resetTimer,
				formatTime,
				changeTimer,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
