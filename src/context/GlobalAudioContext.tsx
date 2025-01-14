import {
	createContext,
	type Dispatch,
	type MutableRefObject,
	type SetStateAction,
	useContext,
	useState,
} from "react";

interface GlobalAudioContextType {
	globalVolume: number;
	audios: MutableRefObject<HTMLAudioElement | null>[];
	addAudio: (audioRef: MutableRefObject<HTMLAudioElement | null>) => void;
	setGlobalVolume: Dispatch<SetStateAction<number>>;
}

const GlobalAudioContext = createContext<GlobalAudioContextType | null>(null);

const GlobalAudioProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [globalVolume, setGlobalVolume] = useState<number>(0.5);
	const [audios, setAudios] = useState<
		MutableRefObject<HTMLAudioElement | null>[]
	>([]);

	const addAudio = (audioRef: MutableRefObject<HTMLAudioElement | null>) => {
		setAudios((prevState) => [...prevState, audioRef]);
	};

	return (
		<GlobalAudioContext.Provider
			value={{ globalVolume, audios, addAudio, setGlobalVolume }}
		>
			{children}
		</GlobalAudioContext.Provider>
	);
};

const useGlobalAudio = () => {
	const context = useContext(GlobalAudioContext);
	if (!context) {
		throw new Error("useGlobalAudio must be used within a GlobalAudioProvider");
	}
	return context;
};

export { GlobalAudioProvider, useGlobalAudio };
