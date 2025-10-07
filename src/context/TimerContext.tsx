import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { useUserPreferences } from "@/hooks/useUserPreferences";
import type { TimerSettings } from "./UserPreferences";

interface ITimerContext {
	timer: number;
	isTimerRunning: boolean;
	sessions: number;
	pomodoroType: "focus" | "short" | "long";
	startTimer: () => void;
	pauseTimer: () => void;
	resetTimer: () => void;
	formatTime: (time: number) => string;
	changeCicle: (type: "focus" | "short" | "long") => void;
	changeTimer: (timerSettings: TimerSettings) => void;
}

const initalContext = {
	timer: 0,
	isTimerRunning: false,
	sessions: 0,
	pomodoroType: "focus" as "focus" | "short" | "long",
	startTimer: () => {},
	pauseTimer: () => {},
	resetTimer: () => {},
	formatTime: (time: number) => "",
	changeCicle: (type: "focus" | "short" | "long") => {},
	changeTimer: (timerSettings: TimerSettings) => {},
};

export const TimerContext = createContext<ITimerContext>(initalContext);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
	const { timerSettingsRef, updateTimerSettings } = useUserPreferences();
	const pomodoroTypeRef = useRef<"focus" | "short" | "long">("focus");
	const cicleRef = useRef<number>(1);
	const timerRef = useRef<number>((timerSettingsRef.current?.focus ?? 25) * 60);
	const [sessions, setSessions] = useState<number>(0);

	const [timer, setTimer] = useState<number>(timerRef.current);
	const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
	const [worker, setWorker] = useState<Worker | null>(null);
	const [pomodoroType, setPomodoroType] = useState<"focus" | "short" | "long">(
		"focus",
	);

	const startTimer = () => {
		worker?.postMessage({ type: "START" });
		setIsTimerRunning(true);
	};

	const pauseTimer = () => {
		worker?.postMessage({ type: "STOP" });
		setIsTimerRunning(false);
	};

	const resetTimer = () => {
		pauseTimer();
		let timer = (timerSettingsRef.current?.focus ?? 25) * 60;
		if (pomodoroTypeRef.current === "short")
			timer = (timerSettingsRef.current?.short ?? 5) * 60;
		if (pomodoroTypeRef.current === "long")
			timer = (timerSettingsRef.current?.long ?? 15) * 60;

		timerRef.current = timer;
		setTimer(timer);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
			2,
			"0",
		)}`;
	};

	const nextCicle = () => {
		cicleRef.current++;

		if (cicleRef.current % 8 === 0) {
			pomodoroTypeRef.current = "long";
			setPomodoroType("long");
			setTimer((timerSettingsRef.current?.long ?? 15) * 60);
			toast("Rest Time!");
		} else if (cicleRef.current % 2 === 0) {
			pomodoroTypeRef.current = "short";
			setPomodoroType("short");
			setTimer((timerSettingsRef.current?.short ?? 5) * 60);
			toast("Rest Time!");
		} else {
			pomodoroTypeRef.current = "focus";
			setPomodoroType("focus");
			setTimer((timerSettingsRef.current?.focus ?? 25) * 60);
			toast("Focus Time!");
			setSessions((prev) => prev + 1);
		}
	};

	const changeCicle = (type: "focus" | "short" | "long") => {
		pauseTimer();

		if (type === "focus") {
			cicleRef.current = 1;
			pomodoroTypeRef.current = "focus";
			setPomodoroType("focus");
			setTimer((timerSettingsRef.current?.focus ?? 25) * 60);
		} else if (type === "short") {
			pomodoroTypeRef.current = "short";
			setPomodoroType("short");
			setTimer((timerSettingsRef.current?.short ?? 5) * 60);
			cicleRef.current = 2;
		} else if (type === "long") {
			cicleRef.current = 8;
			pomodoroTypeRef.current = "long";
			setPomodoroType("long");
			setTimer((timerSettingsRef.current?.long ?? 15) * 60);
		}
	};

	const changeTimer = (timerSettings: TimerSettings) => {
		updateTimerSettings(timerSettings);
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

					nextCicle();
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
	}, []);

	useEffect(() => {
		changeTimer(
			timerSettingsRef.current ?? {
				focus: 25,
				short: 5,
				long: 15,
			},
		);
	}, [timerSettingsRef.current]);

	return (
		<TimerContext.Provider
			value={{
				timer,
				isTimerRunning,
				sessions,
				pomodoroType,
				startTimer,
				pauseTimer,
				resetTimer,
				formatTime,
				changeCicle,
				changeTimer,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
