import CardTheme from "../common/CardTheme";
import { ScrollArea } from "../ui/scroll-area";

interface ThemesProps {
	toggleTheme: (theme: string, background?: string) => void;
}

const Themes: React.FC<ThemesProps> = ({ toggleTheme }) => {
	const allThemes = [
		{
			title: "Dark",
			name: "dark",
			coverPath: "/assets/theme-dark.png",
			background: "",
		},
		{
			title: "Light",
			name: "light",
			coverPath: "/assets/theme-light.png",
			background: "",
		},
		{
			title: "Forest",
			name: "forest",
			coverPath: "/assets/theme-forest.png",
			background: "url('/assets/background-forest.gif')",
		},
		{
			title: "Lofi",
			name: "lofi",
			coverPath: "/assets/theme-study.png",
			background: "url('/assets/background-study.gif')",
		},
		{
			title: "Coffee",
			name: "coffee",
			coverPath: "/assets/theme-coffee.png",
			background: "url('/assets/background-coffee.gif')",
		},
		{
			title: "Lain",
			name: "lain",
			coverPath: "/assets/theme-lain.png",
			background: "url('/assets/background-lain.gif')",
		},
	];

	return (
		<ScrollArea className="h-screen p-4 w-[350px]">
			<div className="flex flex-col gap-4">
				{allThemes.map((theme) => (
					<CardTheme
						key={theme.name}
						title={theme.title}
						image={theme.coverPath}
						toggleTheme={() => toggleTheme(theme.name, theme.background)}
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default Themes;
