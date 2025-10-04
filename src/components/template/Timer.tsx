import { Pause, Play, RotateCcw } from "lucide-react";

import useTimer from "@/hooks/useTimer";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const Timer = () => {
	const {
		timer,
		isTimerRunning,
		sessions,
		pomodoroType,
		startTimer,
		pauseTimer,
		resetTimer,
		formatTime,
		changeCicle,
	} = useTimer();

	return (
		<section className="w-full h-fit flex flex-col items-center gap-10 bg-secondary/70 rounded-xl p-4 border-2 border-secondary">
			<Tabs
				defaultValue="focus"
				onValueChange={(value: string) =>
					changeCicle(value as "focus" | "short" | "long")
				}
			>
				<TabsList>
					<TabsTrigger value="focus">Focus Time</TabsTrigger>
					<TabsTrigger value="short">Short Break</TabsTrigger>
					<TabsTrigger value="long">Long Break</TabsTrigger>
				</TabsList>
			</Tabs>
			<div className="rounded-full size-64 flex items-center justify-center my-10 border-4 border-foreground/20">
				<div className="text-center">
					<h2 className="text-5xl md:text-6xl font-bold text-ring">
						{formatTime(timer)}
					</h2>
					<p className="text-lg text-muted-foreground">
						{pomodoroType === "focus" && "Focus Time"}
						{pomodoroType === "short" && "Short Break"}
						{pomodoroType === "long" && "Long Break"}
					</p>
				</div>
			</div>

			<div className="flex gap-4 ">
				{isTimerRunning ? (
					<button
						type="button"
						className="size-16 flex items-center justify-center bg-ring rounded-full"
						onClick={pauseTimer}
					>
						<Pause className="size-6" />
					</button>
				) : (
					<button
						type="button"
						className="size-16 flex items-center justify-center bg-ring rounded-full"
						onClick={startTimer}
					>
						<Play className="size-6" />
					</button>
				)}
				<button
					type="button"
					className="size-16 flex items-center justify-center rounded-full border border-foreground"
					onClick={resetTimer}
				>
					<RotateCcw className="size-6" />
				</button>
			</div>

			<div className="flex flex-col items-center">
				<p className="text-muted-foreground">Sessions Completed</p>
				<span className="text-2xl font-bold text-ring">{sessions}</span>
			</div>
		</section>
	);
};

export default Timer;
