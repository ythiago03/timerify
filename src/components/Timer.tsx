import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Timer: React.FC<{ defaultTimer: number }> = ({ defaultTimer }) => {
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [time, setTime] = useState<number>(defaultTimer);
	const timeRef = useRef<number>(defaultTimer);
	const isRest = useRef<boolean>(true);
	const [worker, setWorker] = useState<Worker | null>(null);

	const startTimer = () => {
		const btnClickAudio = new Audio("/sounds/button-click.mp3");
		btnClickAudio.play();
		worker?.postMessage({ type: "START" });
		setIsRunning(true);
	};

	const pauseTimer = () => {
		const btnClickAudio = new Audio("/sounds/button-click.mp3");
		btnClickAudio.play();
		worker?.postMessage({ type: "STOP" });
		setIsRunning(false);
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
				if (timeRef.current <= 0) {
					const alarmAudio = new Audio("/sounds/alarm.mp3");
					alarmAudio.play();
					timerWorker.postMessage({ type: "STOP" });
					setIsRunning(false);

					if (isRest.current) {
						// Transição para período de descanso
						isRest.current = false;
						const restTime = 5 * 60; // 5 minutos em segundos
						timeRef.current = restTime;
						setTime(restTime);
						toast("Rest Time!");
						return;
					}

					// Transição para período de trabalho
					isRest.current = true;
					timeRef.current = defaultTimer;
					setTime(defaultTimer);
					toast("Work Time!");
					return;
				}
				setTime((prevTime) => {
					timeRef.current = prevTime - 1;
					return prevTime - 1;
				});
			}
		};

		setWorker(timerWorker);

		return () => {
			timerWorker.terminate();
			URL.revokeObjectURL(workerUrl);
		};
	}, [defaultTimer]);

	useEffect(() => {
		resetTimer();
	}, [defaultTimer]);

	const resetTimer = () => {
		pauseTimer();
		isRest.current = true;
		timeRef.current = defaultTimer;
		setTime(defaultTimer);
	};

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
			2,
			"0",
		)}`;
	};

	return (
		<div className="flex items-center gap-4 m-auto">
			<button type="button" onClick={resetTimer}>
				<RotateCcw className="h-12 w-12 md:h-16 md:w-16 lg:h-[4.5rem] lg:w-[4.5rem]" />
			</button>
			<span className="text-5xl md:text-7xl lg:text-8xl font-bold">
				{formatTime(time)}
			</span>
			{isRunning ? (
				<button type="button" onClick={pauseTimer}>
					<Pause className="h-12 w-12 md:h-16 md:w-16 lg:h-[4.5rem] lg:w-[4.5rem]" />
				</button>
			) : (
				<button type="button" onClick={startTimer}>
					<Play className="h-12 w-12 md:h-16 md:w-16 lg:h-[4.5rem] lg:w-[4.5rem]" />
				</button>
			)}
		</div>
	);
};

export default Timer;
