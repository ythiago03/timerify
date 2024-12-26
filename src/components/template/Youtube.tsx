import { FileMusic, SkipBack, Pause, SkipForward, Play } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "../ui/popover";
import { useEffect, useRef, useState } from "react";
import { Slider } from "../ui/slider";
import { toast } from "sonner";

declare global {
	interface Window {
		onYouTubeIframeAPIReady: () => void;
		YT: any;
	}
}

const Youtube: React.FC = () => {
	const playerRef = useRef<any>(null);
	const [videoUrl, setVideoUrl] = useState<string>("");
	const [player, setPlayer] = useState<any>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);
	const [videoTitle, setVideoTitle] = useState<string>("");

	useEffect(() => {
		loadYouTubeAPI();
	}, []);

	const loadYouTubeAPI = () => {
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

	const onPlayerReady = (event: any) => {
		console.log(event.target);
		console.log(typeof event.target);

		setPlayer(event.target);
		event.target.addEventListener("onStateChange", (stateEvent: any) => {
			if (stateEvent.data === window.YT.PlayerState.PLAYING) {
				updateVideo(event.target);
			}
		});
	};

	const addVideo = async () => {
		try {
			const url = new URL(videoUrl);
			const playlistId = url.searchParams.get("list");
			const videoId = url.searchParams.get("v");

			if (!videoId && !playlistId) throw new Error("Invalid URL");

			if (playlistId) {
				await player.loadPlaylist({
					listType: "playlist",
					list: playlistId,
				});
			} else {
				await player.loadVideoById(videoId);
			}
			player.setVolume(50);
			setIsPlaying(true);
			updateVideo(player);
		} catch (error) {
			console.error("Error adding video:", error);
			toast.error("Error on adding video", {
				description: "Please insert a valid link to a youtube video",
			});
		}
	};

	const handlePlay = () => {
		if (isPlaying) {
			player.pauseVideo();
			setIsPlaying(false);
			return;
		}
		player.playVideo();
		setIsPlaying(true);
	};

	const nexVideo = async () => {
		await player.nextVideo();
		player.setVolume(50);
		updateVideo(player);
	};

	const previousVideo = async () => {
		await player.previousVideo();
		player.setVolume(50);
		updateVideo(player);
	};

	const updateVideo = (player: any) => {
		const updatedVideo = player.getVideoData();
		setVideoTitle(updatedVideo?.title);
	};

	const handleYoutubeVolume = (volume: number) => {
		player.setVolume(volume);
	};

	return (
		<div className="flex items-center p-3 gap-3 h-20 w-1/4 rounded-lg border border-foreground">
			<div className="hidden" id="youtube-player" />
			<Popover>
				<PopoverTrigger asChild>
					<button type="button">
						<FileMusic className="h-12 w-12" />
					</button>
				</PopoverTrigger>
				<PopoverContent side="top" className="w-80 mb-6">
					<h4 className="font-bold leading-none">Choose a song from youtube</h4>
					<p className="text-sm text-muted-foreground">
						Insert a link to some music or playlist from
						<span className="font-bold text-foreground"> youtube</span> to play
						in the background.
					</p>
					<div className="grid grid-cols-3 items-center mt-4 gap-4">
						<Label htmlFor="width">Link</Label>
						<Input
							onChange={(e) => setVideoUrl(e.target.value)}
							id="width"
							className="col-span-2 h-8"
						/>
					</div>
					<div className="flex gap-3">
						<PopoverClose asChild>
							<Button className="mt-3 w-1/2" variant="destructive">
								Cancel
							</Button>
						</PopoverClose>

						<PopoverClose asChild>
							<Button onClick={addVideo} className="mt-3 w-1/2">
								Play
							</Button>
						</PopoverClose>
					</div>
				</PopoverContent>
			</Popover>

			<div className="flex flex-col w-full">
				<span className="font-bold">Playing now</span>
				<div className="w-full relative overflow-hidden h-8 flex items-center">
					<div className="absolute whitespace-nowrap animate-marquee">
						<span>{videoTitle}</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-4">
				<div className="flex ml-auto">
					<button type="button" onClick={previousVideo}>
						<SkipBack />
					</button>
					<button type="button" onClick={handlePlay}>
						{isPlaying ? <Pause /> : <Play />}
					</button>
					<button type="button" onClick={nexVideo}>
						<SkipForward />
					</button>
				</div>
				<Slider
					onValueChange={(e) => handleYoutubeVolume(e[0])}
					defaultValue={[50]}
					max={100}
					step={1}
					className="w-full mt-auto cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default Youtube;
