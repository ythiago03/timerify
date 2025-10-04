import { useUserPreferences } from "@/hooks/useUserPreferences";

import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

const Themes = () => {
	const allThemes = [
		{
			title: "Dark",
			name: "dark",
			coverPath: "/assets/theme-dark.png",
			background: "",
			primary: "#283ae2",
			secondary: "#00000",
		},
		{
			title: "Light",
			name: "light",
			coverPath: "/assets/theme-light.png",
			background: "",
			primary: "#283ae2",
			secondary: "#00000",
		},
		{
			title: "Forest",
			name: "forest",
			coverPath: "/assets/theme-forest.png",
			background: "url('/assets/background-forest.gif')",
			primary: "#283ae2",
			secondary: "#00000",
		},
		{
			title: "Lofi",
			name: "lofi",
			coverPath: "/assets/theme-study.png",
			background: "url('/assets/background-study.gif')",
			primary: "#283ae2",
			secondary: "#00000",
		},
		{
			title: "Coffee",
			name: "coffee",
			coverPath: "/assets/theme-coffee.png",
			background: "url('/assets/background-coffee.gif')",
			primary: "#283ae2",
			secondary: "#00000",
		},
		{
			title: "Lain",
			name: "lain",
			coverPath: "/assets/theme-lain.png",
			background: "url('/assets/background-lain.gif')",
			primary: "#283ae2",
			secondary: "#00000",
		},
	];
	const { toggleTheme } = useUserPreferences();

	return (
		<ScrollArea className="h-72">
			<div className="flex flex-col gap-4 py-1">
				{allThemes.map((theme) => (
					<Card
						key={theme.name}
						// className={`p-4 cursor-pointer transition-all ${
						//   localSettings.theme === theme.name ? "ring-2 ring-primary" : "hover:bg-accent/50"
						// }`}
						className="p-2 mx-1 cursor-pointer transition-all bg-accent hover:bg-accent/50"
						onClick={() => toggleTheme(theme.name, theme.background)}
					>
						<div className="flex items-center justify-between">
							<div>
								<h4 className="flex items-center font-semibold">
									{theme.title}
									<div className="flex gap-2 ml-2">
										<span
											className={`block size-4 rounded-full border-2 border-foreground bg-[${theme.primary}]`}
										/>
										<span
											className={`block size-4 rounded-full border-2 border-foreground bg-[${theme.secondary}]`}
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
