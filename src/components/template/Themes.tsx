import { useUserPreferences } from "@/hooks/useUserPreferences";

import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { useState } from "react";

const Themes = () => {
	const allThemes = [
		{
			title: "Dark",
			name: "dark",
			coverPath: "/assets/theme-dark.png",
			background: "",
			primary: "#283ae2",
			secondary: "#000000",
		},
		{
			title: "Light",
			name: "light",
			coverPath: "/assets/theme-light.png",
			background: "",
			primary: "#000000",
			secondary: "#ffffff",
		},
		{
			title: "Forest",
			name: "forest",
			coverPath: "/assets/theme-forest.png",
			background: "url('/assets/background-forest.gif')",
			primary: "#E4F1AC",
			secondary: "#111d13",
		},
		{
			title: "Lofi",
			name: "lofi",
			coverPath: "/assets/theme-study.png",
			background: "url('/assets/background-study.gif')",
			primary: "#D4BABC",
			secondary: "#8D5E64",
		},
		{
			title: "Coffee",
			name: "coffee",
			coverPath: "/assets/theme-coffee.png",
			background: "url('/assets/background-coffee.gif')",
			primary: "#D4BEE4",
			secondary: "#181934",
		},
		{
			title: "Lain",
			name: "lain",
			coverPath: "/assets/theme-lain.png",
			background: "url('/assets/background-lain.gif')",
			primary: "#9C7FBD",
			secondary: "#120F1F",
		},
	];
	const { toggleTheme } = useUserPreferences();

	const [currentTheme, setCurrentTheme] = useState("dark");

	return (
		<ScrollArea className="h-72">
			<div className="flex flex-col gap-4 py-1">
				{allThemes.map((theme) => (
					<Card
						key={theme.name}
						className={`p-2 mx-1 cursor-pointer transition-all border-foreground/20 bg-accent/50 hover:bg-accent  ${
							currentTheme === theme.name ? "ring-2 ring-ring" : ""
						}`}
						onClick={() => {
							toggleTheme(theme.name, theme.background);
							setCurrentTheme(theme.name);
						}}
					>
						<div className="flex items-center justify-between">
							<div>
								<h4 className="flex items-center font-semibold text-foreground">
									{theme.title}
									<div className="flex gap-2 ml-2">
										<span
											className="block size-4 rounded-full border border-foreground"
											style={{ backgroundColor: theme.primary }}
										/>
										<span
											className="block size-4 rounded-full border border-foreground"
											style={{ backgroundColor: theme.secondary }}
										/>
									</div>
								</h4>
								<p className="text-sm text-muted-foreground">Click to apply</p>
							</div>
							<div className="w-1/4 rounded-lg">
								<img
									src={theme.coverPath}
									alt={`Theme ${theme.title} pic`}
									className="w-full h-full object-cover rounded-lg"
								/>
							</div>
						</div>
					</Card>
				))}
			</div>
		</ScrollArea>
	);
};

export default Themes;
