import useTimer from "@/hooks/useTimer";
import { Pause, Play, RotateCcw } from "lucide-react";

const Timer = () => {
	const {
		timer,
		isTimerRunning,
		startTimer,
		pauseTimer,
		resetTimer,
		formatTime,
	} = useTimer();

	return (
		<div className="flex items-center gap-4 m-auto">
			<button type="button" onClick={resetTimer}>
				<RotateCcw className="h-12 w-12 md:h-16 md:w-16 lg:h-[4.5rem] lg:w-[4.5rem]" />
			</button>
			<span className="text-5xl md:text-7xl lg:text-8xl font-bold">
				{formatTime(timer)}
			</span>
			{isTimerRunning ? (
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
