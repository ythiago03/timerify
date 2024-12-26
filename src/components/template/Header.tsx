import { Palette, Settings } from "lucide-react";
import GlobalSoundControl from "../common/GlobalSoundControl";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import Themes from "./Themes";

interface HeaderProps {
	toggleTheme: (theme: string, background?: string) => void;
}

const Header = ({ toggleTheme }: HeaderProps) => {
	return (
		<header className="w-full flex justify-center p-3">
			<div className="flex w-1/2 justify-between items-center ">
				<h1 className="text-3xl font-bold">Timerify</h1>
				<ul className="flex gap-3">
					<li className="flex gap-5">
						<GlobalSoundControl />
					</li>
					<li>
						<Sheet>
							<SheetTrigger>
								<Palette />
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Choose your theme</SheetTitle>
									<Themes toggleTheme={toggleTheme} />
								</SheetHeader>
							</SheetContent>
						</Sheet>
					</li>
					<li>
						<Settings />
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
