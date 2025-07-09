import { TimerContext } from "@/context/TimerContext";
import { useContext } from "react";

const useTimer = () => {
	const context = useContext(TimerContext);
	if (!context) {
		throw new Error("useTimer must be used within a TimerProvider");
	}
	return context;
};

export default useTimer;
