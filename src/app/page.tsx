"use client";

import SoundCards from "@/components/template/SoundCards";
import Tasks from "@/components/template/Tasks";
import Timer from "@/components/Timer";
import GithubIcon from "/assets/github.svg";

import { GlobalAudioProvider } from "@/context/GlobalAudioContext";
import { Award, BookAudio, ClipboardList, Github } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Youtube from "@/components/template/Youtube";
import Header from "@/components/template/Header";

export default function Home() {
	const [showTasks, setShowTasks] = useState<"visible" | "invisible">(
		"invisible",
	);
	const [showSound, setShowSounds] = useState<"visible" | "invisible">(
		"invisible",
	);
	const [background, setBackground] = useState<string>("");
	const [width, setWidth] = useState<number | undefined>(
		typeof window !== "undefined" ? window.innerWidth : undefined,
	);
	const [defaultTimer, setDefaultTimer] = useState<number>(1500);

	const toggleTheme = (theme: string, background?: string): void => {
		const htmlElement = document.documentElement;
		// biome-ignore lint/complexity/noForEach: <explanation>
		htmlElement.classList.forEach((className) => {
			htmlElement.classList.remove(className);
		});
		htmlElement.classList.add(theme);
		setBackground(background ? background : "");
	};

	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleResize = () => setWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<GlobalAudioProvider>
			<div
				style={{ backgroundImage: `${background}` }}
				className={`bg-${background} w-full min-h-screen flex flex-col  bg-cover bg-center bg-no-repeat`}
			>
				<Header changeTimer={setDefaultTimer} toggleTheme={toggleTheme} />

				<main className="grow flex flex-col items-center xl:items-start xl:flex-row">
					<section
						className={`${showTasks} flex flex-col items-center w-full xl:w-1/3 mb-6 xl:mb-0`}
					>
						<h2 className="text-2xl font-bold mt-5">Tasks</h2>
						<Tasks />
					</section>
					<Timer defaultTimer={defaultTimer} />
					<section
						className={`${showSound} flex flex-col items-center w-full xl:w-1/3`}
					>
						<h2 className="text-2xl font-bold mt-5">Sounds</h2>
						<SoundCards />
					</section>
				</main>

				<footer className="w-full p-3 flex flex-col justify-center gap-3 ">
					<section className="gap-3 mb-6 flex flex-col lg:flex-row items-center lg:items-start justify-normal lg:justify-center">
						{width && width < 1024 && (
							<div className="flex justify-between w-1/2">
								<button
									type="button"
									onClick={() =>
										setShowTasks((prev) =>
											prev === "visible" ? "invisible" : "visible",
										)
									}
									className="flex items-center"
								>
									<ClipboardList className="h-16 w-16" />
								</button>
								<button
									type="button"
									onClick={() =>
										setShowSounds((prev) =>
											prev === "visible" ? "invisible" : "visible",
										)
									}
									className="flex items-center"
								>
									<BookAudio className="h-16 w-16" />
								</button>
							</div>
						)}

						{width && width >= 1024 && (
							<button
								type="button"
								onClick={() =>
									setShowTasks((prev) =>
										prev === "visible" ? "invisible" : "visible",
									)
								}
								className="flex items-center"
							>
								<ClipboardList className="h-16 w-16" />
							</button>
						)}

						<Youtube className="order-3 lg:order-none" />

						{width && width >= 1024 && (
							<button
								type="button"
								onClick={() =>
									setShowSounds((prev) =>
										prev === "visible" ? "invisible" : "visible",
									)
								}
								className="flex items-center"
							>
								<BookAudio className="h-16 w-16" />
							</button>
						)}
					</section>
					<section className="flex flex-col items-center gap-3">
						<div className="flex gap-3">
							<Link
								href="https://github.com/ythiago03/timerify/tree/create-docs?tab=readme-ov-file#-cr%C3%A9ditos-dos-%C3%A1udios"
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
		</GlobalAudioProvider>
	);
}
