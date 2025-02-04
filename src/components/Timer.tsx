import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Timer: React.FC<{ defaultTimer: number }> = ({ defaultTimer }) => {
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [time, setTime] = useState<number>(defaultTimer);
	const [isRest, setIsRest] = useState<boolean>(true);
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
		const workerUlr = URL.createObjectURL(blob);
		const timerWorker = new Worker(workerUlr);

		timerWorker.onmessage = (e) => {
			if (e.data.type === "TICK") {
				const alarmAudio = new Audio("/sounds/alarm.mp3");
				setTime((prevTime) => {
					if (prevTime <= 1) {
						timerWorker.postMessage({ type: "STOP" });
						alarmAudio.play();
						toast("Time's up!");
						if (isRest) {
							setIsRest(false);
							setIsRunning(false);
							return 300; //5 minutes
						}
						setIsRest(true);
						return defaultTimer;
					}
					return prevTime - 1;
				});
			}
		};

		setWorker(timerWorker);

		return () => {
			timerWorker.terminate();
			URL.revokeObjectURL(workerUlr);
		};
	}, []);

	useEffect(() => {
		resetTimer();
	}, [defaultTimer]);

	const resetTimer = () => {
		pauseTimer();
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
					<Pause className="h-12 w-12 md:h-16 md:w-16  lg:h-[4.5rem] lg:w-[4.5rem]" />
				</button>
			) : (
				<button type="button" onClick={startTimer}>
					<Play className="h-12 w-12 md:h-16 md:w-16  lg:h-[4.5rem] lg:w-[4.5rem]" />
				</button>
			)}
		</div>
	);
};

export default Timer;
