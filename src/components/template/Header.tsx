import SettingsDialog from "./SettingsDialog";

const Header = () => {
	return (
		<header className="my-8 text-center">
			<h1 className="text-4xl font-bold text-foreground mb-2">Timerify</h1>
			<p className="text-muted-foreground text-lg">
				Stay productive with the Pomodoro Technique
			</p>

			<SettingsDialog />
		</header>
	);
};

export default Header;
