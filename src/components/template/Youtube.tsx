import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
	Pause,
	Play,
	Plus,
	SkipForwardIcon,
	Volume2Icon,
	SkipBackIcon,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";

declare global {
	interface Window {
		onYouTubeIframeAPIReady: () => void;
		YT: typeof YT;
	}
}

type ExtedendedYTPlayer = YT.Player & {
	getVideoData?: () => { title: string; video_id: string; author: string };
};

const Youtube: React.FC<{ className?: string }> = ({ className = "" }) => {
	const playerRef = useRef<YT.Player | null>(null);
	const [videoUrl, setVideoUrl] = useState<string>("");
	const [player, setPlayer] = useState<YT.Player | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [videoTitle, setVideoTitle] = useState<string>("");
	const [queue, setQueue] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	useEffect((): void => {
		loadYouTubeAPI();
	}, []);

	const loadYouTubeAPI = (): void => {
		const script = document.createElement("script");

		script.src = "https://www.youtube.com/iframe_api";
		document.body.appendChild(script);

		window.onYouTubeIframeAPIReady = async () => {
			playerRef.current = new window.YT.Player("youtube-player", {
				height: "0",
				width: "0",
				events: {
					onReady: onPlayerReady,
				},
			});
		};
	};

	const onPlayerReady = (event: YT.PlayerEvent): void => {
		setPlayer(event.target);
		event.target.addEventListener(
			"onStateChange",
			(stateEvent: YT.OnStateChangeEvent) => {
				if (stateEvent.data === window.YT.PlayerState.PLAYING) {
					updateVideo(event.target);
				}
				if (stateEvent.data === window.YT.PlayerState.ENDED) {
					nexVideo();
				}
			},
		);
		event.target.setVolume(50);
	};

	const addVideo = (): void => {
		try {
			if (!player) return;
			const url = new URL(videoUrl);
			const videoId = url.searchParams.get("v");

			console.log(url);

			if (!videoId || url.origin === "") throw new Error("Invalid URL");

			if (queue.length === 0) {
				player.loadVideoById(videoId);
				setCurrentIndex(0);
				updateVideo(player);
				setIsPlaying(true);
			}
			setQueue((prevQueue) => [...prevQueue, videoId]);
			setVideoUrl("");
		} catch (error) {
			console.error("Error adding video:", error);
			toast.error("Error on adding video", {
				description: "Please insert a valid link to a youtube video",
			});
		}
	};

	const playCurrentVideo = (index: number) => {
		if (!player || !queue[index]) return;
		player.loadVideoById(queue[index]);
		setCurrentIndex(index);
		setIsPlaying(true);
	};

	const handlePlay = (): void => {
		if (isPlaying) {
			player?.pauseVideo();
			setIsPlaying(false);
			return;
		}
		player?.playVideo();
		setIsPlaying(true);
	};

	const nexVideo = (): void => {
		if (currentIndex + 1 < queue.length) {
			playCurrentVideo(currentIndex + 1);
		} else {
			toast.info("There are no upcoming videos");
		}
	};

	const previousVideo = (): void => {
		if (currentIndex - 1 >= 0) {
			playCurrentVideo(currentIndex - 1);
		} else {
			toast.info("There are no previous videos");
		}
	};

	const updateVideo = (player: ExtedendedYTPlayer): void => {
		const updatedVideo = player.getVideoData?.();
		setVideoTitle(updatedVideo?.title ?? "");
	};

	const handleYoutubeVolume = (volume: number) => {
		player?.setVolume(volume);
	};

	return (
		<>
			<div className="hidden" id="youtube-player" />
			<div className="flex items-center gap-2 my-3">
				<Input
					type="text"
					className="bg-transparent border-2  border-secondary"
					placeholder="Paste Youtube URL here"
					value={videoUrl}
					onChange={(e) => setVideoUrl(e.target.value)}
				/>
				<Button variant="outline" disabled={!videoUrl} onClick={addVideo}>
					<Plus /> Add
				</Button>
			</div>

			{queue.length > 0 && (
				<>
					<div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-lg p-4">
						<div className="flex items-center gap-3 mb-3">
							<span className="size-2 bg-red-500 rounded-full animate-pulse" />
							<span className="text-sm text-red-400">NOW PLAYING</span>
						</div>
						<div className="flex items-center justify-between">
							<div className="flex-1 min-w-0">
								<h4 className="font-semibold text-foreground truncate">
									{videoTitle}
								</h4>
								<p className="text-sm text-muted-foreground">
									Track {currentIndex + 1} of {queue.length}
								</p>
							</div>
						</div>
					</div>

					<div className="flex items-center justify-center gap-2 mt-3">
						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-foreground"
							onClick={previousVideo}
						>
							<SkipBackIcon />
						</Button>

						<Button
							variant="default"
							size="lg"
							className="bg-red-600 hover:bg-red-700 text-white px-6"
							onClick={handlePlay}
						>
							{isPlaying ? <Pause /> : <Play />}
							<span className="ml-2">{isPlaying ? "Pause" : "Play"}</span>
						</Button>

						<Button
							variant="ghost"
							size="icon"
							className="text-muted-foreground hover:text-foreground"
							onClick={nexVideo}
						>
							<SkipForwardIcon />
						</Button>
					</div>

					<div className="flex items-center gap-3 mt-3">
						<Volume2Icon className="size-4 text-muted-foreground" />
						<Slider
							defaultValue={[50]}
							onValueChange={(e) => handleYoutubeVolume(e[0])}
							max={100}
							step={1}
							className="flex-1 cursor-pointer"
						/>
					</div>
				</>
			)}
		</>
	);
};

export default Youtube;
