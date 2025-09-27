import { createContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface ITimerContext {
	timer: number;
	isTimerRunning: boolean;
	sessions: number;
	pomodoroType: "focus" | "short" | "long";
	startTimer: () => void;
	pauseTimer: () => void;
	resetTimer: () => void;
	formatTime: (time: number) => string;
	changeTimer: (time: number) => void;
	changeCicle: (type: "focus" | "short" | "long") => void;
}

const initalContext = {
	timer: 0,
	isTimerRunning: false,
	sessions: 0,
	pomodoroType: "focus",
	startTimer: () => {},
	pauseTimer: () => {},
	resetTimer: () => {},
	formatTime: (time: number) => "",
	changeTimer: (time: number) => {},
	changeCicle: (type: "focus" | "short" | "long") => {},
};

export const TimerContext = createContext<ITimerContext>(initalContext);

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
	const timersConfigRef = useRef({
		focus: 25 * 60,
		short: 5 * 60,
		long: 15 * 60,
	});
	const pomodoroTypeRef = useRef<"focus" | "short" | "long">("focus");
	const cicleRef = useRef<number>(1);
	const timerRef = useRef<number>(timersConfigRef.current.focus);
	const [sessions, setSessions] = useState<number>(0);

	const [timer, setTimer] = useState<number>(timersConfigRef.current.focus);
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
		let timer = timersConfigRef.current.focus;
		if (pomodoroTypeRef.current === "short")
			timer = timersConfigRef.current.short;
		if (pomodoroTypeRef.current === "long")
			timer = timersConfigRef.current.long;

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

	const changeTimer = (time: number) => {
		timersConfigRef.current.focus = time;
		resetTimer();
	};

	const nextCicle = () => {
		cicleRef.current++;

		if (cicleRef.current % 8 === 0) {
			pomodoroTypeRef.current = "long";
			setPomodoroType("long");
			setTimer(timersConfigRef.current.long);
			toast("Rest Time!");
		} else if (cicleRef.current % 2 === 0) {
			pomodoroTypeRef.current = "short";
			setPomodoroType("short");
			setTimer(timersConfigRef.current.short);
			toast("Rest Time!");
		} else {
			pomodoroTypeRef.current = "focus";
			setPomodoroType("focus");
			setTimer(timersConfigRef.current.focus);
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
			setTimer(timersConfigRef.current.focus);
		} else if (type === "short") {
			pomodoroTypeRef.current = "short";
			setPomodoroType("short");
			setTimer(timersConfigRef.current.short);
			cicleRef.current = 2;
		} else if (type === "long") {
			cicleRef.current = 8;
			pomodoroTypeRef.current = "long";
			setPomodoroType("long");
			setTimer(timersConfigRef.current.long);
		}
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
				changeTimer,
				changeCicle,
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};
