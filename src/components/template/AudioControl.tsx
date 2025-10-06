import React from "react";
import { Music } from "lucide-react";

import SoundCards from "./SoundCards";
import Youtube from "./Youtube";

const AudioControl = () => {
	return (
		<section className="w-full h-fit flex flex-col gap-10 bg-secondary/70 rounded-xl p-4 border border-foreground/20">
			<h2 className="text-2xl font-bold mt-5">Audio & Sounds</h2>

			<div className="w-full bg-secondary/50 rounded-xl p-4 border border-foreground/20">
				<h3 className="flex gap-3 items-center text-lg font-semibold">
					<Music className="text-red-500" /> Youtube Audio
				</h3>
				<Youtube />
			</div>
			<div className="space-y-4">
				<h3 className="text-lg font-semibold">Ambient Sounds</h3>
				<SoundCards />
			</div>
		</section>
	);
};

export default AudioControl;
