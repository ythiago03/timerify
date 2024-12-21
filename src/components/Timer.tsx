import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Timer: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [time, setTime] = useState<number>(1500); // 25 minutes
  const [intervalId, setIntervalId] = useState<ReturnType<
    typeof setInterval
  > | null>(null);
  const [isRest, setIsRest] = useState<boolean>(true);

  const startTimer = () => {
    const btnClickAudio = new Audio("/sounds/button-click.mp3");
    btnClickAudio.play();
    if (!intervalId) {
      if (time === 0) {
        setTime(1500);
      }
      const id = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    const btnClickAudio = new Audio("/sounds/button-click.mp3");
    btnClickAudio.play();
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsRunning(false);
    }
  };
  useEffect(() => {
    const alarmAudio = new Audio("/sounds/alarm.mp3");

    if (time === 0) {
      alarmAudio.play();
      toast("Time's up!");
      pauseTimer();
      if (isRest) {
        setTime(300); //5 minutes
        setIsRest(false);
      } else {
        setTime(1500); //25 minutes
        setIsRest(true);
      }
    }
  }, [time]);

  const resetTimer = () => {
    pauseTimer();
    setTime(1500);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className="flex items-center gap-4 m-auto">
      <button onClick={resetTimer}>
        <RotateCcw className="h-12 w-12 md:h-16 md:w-16  xl:h-20 xl:w-20" />
      </button>
      <span className="text-5xl md:text-7xl xl:text-9xl font-bold">
        {formatTime(time)}
      </span>
      {isRunning ? (
        <button onClick={pauseTimer}>
          <Pause className="h-12 w-12 md:h-16 md:w-16  xl:h-20 xl:w-20" />
        </button>
      ) : (
        <button onClick={startTimer}>
          <Play className="h-12 w-12 md:h-16 md:w-16  xl:h-20 xl:w-20" />
        </button>
      )}
    </div>
  );
};

export default Timer;
