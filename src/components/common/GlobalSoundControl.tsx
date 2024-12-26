import { useGlobalAudio } from "@/context/GlobalAudioContext";
import { Volume1, Volume2, VolumeX } from "lucide-react";
import { Slider } from "../ui/slider";

const GlobalSoundControl: React.FC = () => {
	const { globalVolume, setGlobalVolume, audios } = useGlobalAudio();

	const handleMainVolume = (volume: number[]) => {
		setGlobalVolume(volume[0] / 100);

		for (const audioRef of audios) {
			const audio = audioRef.current;
			if (!audio) return;

			audio.volume = globalVolume;
		}
	};

	return (
		<>
			<Slider
				onValueChange={handleMainVolume}
				defaultValue={[50]}
				max={100}
				step={1}
				className="w-24"
			/>
			{globalVolume * 100 === 0 && <VolumeX />}
			{globalVolume * 100 > 0 && globalVolume * 100 <= 50 && <Volume1 />}
			{globalVolume * 100 > 0 && globalVolume * 100 > 50 && <Volume2 />}
		</>
	);
};

export default GlobalSoundControl;
