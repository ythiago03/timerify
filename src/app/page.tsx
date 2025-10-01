"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { GlobalAudioProvider } from "@/context/GlobalAudioContext";

import SoundCards from "@/components/template/SoundCards";
import Tasks from "@/components/template/Tasks";
import Timer from "@/components/Timer";
import Youtube from "@/components/template/Youtube";
import Header from "@/components/template/Header";

import {
	Award,
	BookAudio,
	ClipboardList,
	Github,
	GithubIcon,
	PlayIcon,
	Plus,
	SkipBackIcon,
	SkipForwardIcon,
	Volume2Icon,
} from "lucide-react";
import { TimerProvider } from "@/context/TimerContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@radix-ui/react-slider";
import AudioControl from "@/components/template/AudioControl";

export default function Home() {
	const [background, setBackground] = useState<string>("");

	const toggleTheme = (theme: string, background?: string): void => {
		const htmlElement = document.documentElement;
		// biome-ignore lint/complexity/noForEach: <explanation>
		htmlElement.classList.forEach((className) => {
			htmlElement.classList.remove(className);
		});
		htmlElement.classList.add(theme);
		setBackground(background ? background : "");
	};

	return (
		<GlobalAudioProvider>
			<TimerProvider>
				<div
					style={{ backgroundImage: `${background}` }}
					className={`bg-${background} w-full min-h-screen flex flex-col  bg-cover bg-center bg-no-repeat`}
				>
					<Header toggleTheme={toggleTheme} />

					<main className="w-11/12 mx-auto grid grid-cols-3 gap-8 px-20">
						<Tasks />
						<Timer />
						<AudioControl />
					</main>

					<footer className="mt-12 mb-6 pt-8 border-t border-border">
						<div className="mx-auto max-w-7xl text-center">
							<p className="text-sm text-muted-foreground mb-3">
								Built with React.js, Tailwind CSS and Shadcn by{" "}
								<Link
									className="underline"
									target="_blank"
									href="https://github.com/ythiago03"
								>
									Thiago Henrique
								</Link>
							</p>
							<Link
								href="https://github.com/ythiago03/timerify"
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80"
							>
								<GithubIcon className="size-4" />
								View on GitHub
							</Link>
						</div>
					</footer>
				</div>
			</TimerProvider>
		</GlobalAudioProvider>
	);
}
