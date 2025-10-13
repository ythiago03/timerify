"use client";

import Link from "next/link";

import { GlobalAudioProvider } from "@/context/GlobalAudioContext";

import Tasks from "@/components/template/Tasks";
import Timer from "@/components/template/Timer";
import Header from "@/components/template/Header";

import { GithubIcon } from "lucide-react";
import { TimerProvider } from "@/context/TimerContext";
import AudioControl from "@/components/template/AudioControl";
import { UserPreferencesProvider } from "@/context/UserPreferences";
import BackgroundWrapper from "@/components/common/BackgroundWrapper";
import { useEffect } from "react";

export default function Home() {
	useEffect(() => {
		return localStorage.removeItem("currentTheme");
	}, []);

	return (
		<GlobalAudioProvider>
			<UserPreferencesProvider>
				<TimerProvider>
					<BackgroundWrapper>
						<Header />

						<main className="w-full md:w-1/2  xl:w-full 2xl:w-11/12 mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8 px-6 md:px-0 lg:px-2 xl:px-6 2xl:px-14">
							<Tasks />
							<Timer />
							<AudioControl />
						</main>

						<footer className="mt-12 mb-6 pt-8 px-4 border-t border-foreground/20">
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
					</BackgroundWrapper>
				</TimerProvider>
			</UserPreferencesProvider>
		</GlobalAudioProvider>
	);
}
