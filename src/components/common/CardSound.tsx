import { useEffect, useRef, useState } from "react";

import { useGlobalAudio } from "@/context/GlobalAudioContext";

import { Slider } from "../ui/slider";
import { Pause, Play } from "lucide-react";

interface CardSoundProps {
	icon: string;
	soundName: string;
	color: string;
}

const CardSound: React.FC<CardSoundProps> = ({ icon, soundName, color }) => {
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const { addAudio } = useGlobalAudio();

	const soundRef = useRef<HTMLAudioElement | null>(null);
	const volumeRef = useRef<number>(0.5);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const path = `/sounds/sound-${soundName}.mp3`;
			soundRef.current = new Audio(path);
			soundRef.current.volume = volumeRef.current;
			soundRef.current.loop = true;
			addAudio(soundRef);
		}

		return () => {
			if (soundRef.current) {
				soundRef.current.pause();
				soundRef.current = null;
			}
		};
	}, []);

	const toggleSound = () => {
		const sound = soundRef.current;
		if (!sound) return;

		if (isPlaying) {
			sound.pause();
			setIsPlaying(false);
		} else {
			sound.play();
			setIsPlaying(true);
		}
	};

	const transformCaptalizedCase = (text: string): string => {
		if (text === "") return "";
		const words = text.split(" ");
		const captalizedText = words.map((word): string => {
			return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
		});
		return captalizedText.join(" ");
	};

	const handleVolumeChange = (volume: number[]) => {
		const sound = soundRef.current;
		if (!sound) return;

		volumeRef.current = volume[0] / 100;
		sound.volume = volumeRef.current;
	};

	return (
		<div className="w-full flex flex-col gap-2">
			<button
				type="button"
				onClick={toggleSound}
				className={`${isPlaying ? color : "bg-transparent"} w-full flex justify-between border-2 border-foreground/20 rounded-xl p-4`}
			>
				<div className="flex gap-2">
					<span className="text-3xl">{icon}</span>
					<p className="my-auto">{transformCaptalizedCase(soundName)}</p>
				</div>
				{isPlaying ? (
					<Pause className="size-4 my-auto" />
				) : (
					<Play className="size-4 my-auto" />
				)}
			</button>
			{isPlaying && (
				<Slider
					onValueChange={handleVolumeChange}
					defaultValue={[(soundRef.current?.volume ?? 0) * 100]}
					max={100}
					step={1}
					className="w-full px-2 cursor-pointer"
				/>
			)}
		</div>
	);
};

export default CardSound;
