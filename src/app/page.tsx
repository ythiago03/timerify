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

					<main className="grow flex flex-col items-center xl:items-start xl:flex-row">
						<section className="flex flex-col items-center w-full xl:w-1/3 mb-6 xl:mb-0">
							<h2 className="text-2xl font-bold mt-5">Tasks</h2>
							<Tasks />
						</section>
						<Timer />
						<AudioControl />
					</main>

					<footer className="w-full p-3 flex flex-col justify-center gap-3 ">
						<section className="flex flex-col items-center gap-3">
							<div className="flex gap-3">
								<Link
									href="https://github.com/ythiago03/timerify?tab=readme-ov-file#-cr%C3%A9ditos-dos-%C3%A1udios"
									target="_blank"
									className="flex"
								>
									<Award /> Credits
								</Link>
								<Link
									href="https://github.com/ythiago03/timerify"
									target="_blank"
									className="flex"
								>
									<Github /> Timerify
								</Link>
							</div>
							<span className="text-sm text-center">
								Built with React.js, Tailwindcss and Shadcn by{" "}
								<Link
									className="underline"
									target="_blank"
									href="https://github.com/ythiago03"
								>
									Thiago Henrique
								</Link>
								.
							</span>
						</section>
					</footer>
				</div>
			</TimerProvider>
		</GlobalAudioProvider>
	);
}
