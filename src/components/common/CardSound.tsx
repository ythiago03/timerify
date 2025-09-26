import { type ElementType, useEffect, useRef, useState } from "react";

import { useGlobalAudio } from "@/context/GlobalAudioContext";

import { Slider } from "../ui/slider";

interface CardSoundProps {
	icon: ElementType;
	soundName: string;
}

const CardSound: React.FC<CardSoundProps> = ({ icon: Icon, soundName }) => {
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

	const handleVolumeChange = (volume: number[]) => {
		const sound = soundRef.current;
		if (!sound) return;

		volumeRef.current = volume[0] / 100;
		sound.volume = volumeRef.current;
	};

	const conditionalStyle = isPlaying ? "bg-foreground/15 backdrop-blur-sm" : "";

	return (
		<div className="relative">
			<button
				type="button"
				onClick={toggleSound}
				className={`${conditionalStyle} hover:bg-foreground/15  hover:backdrop-blur-sm w-32 h-32 flex flex-col justify-center items-center cursor-pointer rounded-lg`}
			>
				<Icon className="w-16 h-16" />
			</button>
			{isPlaying && (
				<Slider
					onValueChange={handleVolumeChange}
					defaultValue={[50]}
					max={100}
					step={1}
					className="w-full mt-auto absolute bottom-0 cursor-pointer"
				/>
			)}
		</div>
	);
};

export default CardSound;
