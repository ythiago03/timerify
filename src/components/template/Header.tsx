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
import { useState, type Dispatch, type SetStateAction } from "react";
import { Input } from "../ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";

interface HeaderProps {
	toggleTheme: (theme: string, background?: string) => void;
	changeTimer: Dispatch<SetStateAction<number>>;
}

const Header = ({ toggleTheme, changeTimer }: HeaderProps) => {
	const [updatedTimer, setUpdatedTimer] = useState<string>("2500");
	const [updatedTimerError, setUpdatedTimerError] = useState<string | null>(
		null,
	);

	const validateTime = (): boolean => {
		setUpdatedTimerError(null);

		if (!updatedTimer) {
			setUpdatedTimerError("Time cannot be empty.");
			return false;
		}

		if (Number.isNaN(+updatedTimer)) {
			setUpdatedTimerError("Time must be a number.");
			return false;
		}

		const minutes = updatedTimer.slice(0, 2);
		const seconds = updatedTimer.slice(2, 4);

		if (+minutes > 59 || +seconds > 59) {
			setUpdatedTimerError("Time must be between 00:00 and 59:59.");
			return false;
		}

		return true;
	};

	const changeDefaultTimer = () => {
		const isValidTime = validateTime();

		if (!isValidTime) return;

		const minutes = +updatedTimer.slice(0, 2);
		const seconds = +updatedTimer.slice(2, 4);

		const convertedNewTime = minutes * 60 + seconds;
		changeTimer(convertedNewTime);
	};
	return (
		<header className="w-full flex justify-center p-3">
			<div className="flex w-full px-1 lg:px-0 lg:w-1/2 justify-between items-center ">
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
						<Sheet>
							<SheetTrigger>
								<Settings />
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle className="mb-4">Settings</SheetTitle>
									<div className="w-full flex flex-col items-center">
										<label
											htmlFor="changeTimerInput"
											className="text-sm font-semibold self-start mb-4"
										>
											Change default timer
										</label>
										<InputOTP
											value={updatedTimer}
											id="changeTimerInput"
											maxLength={4}
											onChange={(event) => setUpdatedTimer(event)}
										>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
											</InputOTPGroup>
											:
											<InputOTPGroup>
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
											</InputOTPGroup>
										</InputOTP>
										<span
											className={`${updatedTimerError ? "block" : "hidden"} text-xs self-start text-red-500/70  mt-3`}
										>
											{updatedTimerError && updatedTimerError}
										</span>
										<Button
											onClick={changeDefaultTimer}
											className="self-start mt-4"
										>
											Submit
										</Button>
									</div>
								</SheetHeader>
							</SheetContent>
						</Sheet>
					</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
