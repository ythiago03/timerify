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

// <div className="flex w-full px-1 lg:px-0 lg:w-1/2 justify-between items-center ">
// 			{darkLogo ? (
// 				<img src="/assets/logo-dark.svg" alt="Logo" width={130} height={80} />
// 			) : (
// 				<img
// 					src="/assets/logo-light.svg"
// 					alt="Logo"
// 					width={130}
// 					height={80}
// 				/>
// 			)}

// 			<ul className="flex gap-3">
// 				<li className="flex gap-5">
// 					<GlobalSoundControl />
// 				</li>
// 				<li>
// 					<Sheet>
// 						<SheetTrigger>
// 							<Palette />
// 						</SheetTrigger>
// 						<SheetContent className="border-none">
// 							<SheetHeader>
// 								<SheetTitle>Choose your theme</SheetTitle>
// 								<Themes toggleTheme={toggleTheme} />
// 							</SheetHeader>
// 						</SheetContent>
// 					</Sheet>
// 				</li>
// 				<li>
// 					<Sheet>
// 						<SheetTrigger>
// 							<Settings />
// 						</SheetTrigger>
// 						<SheetContent className="border-none">
// 							<SheetHeader>
// 								<SheetTitle className="mb-4">Settings</SheetTitle>
// 								<div className="w-full flex flex-col items-center">
// 									<label
// 										htmlFor="changeTimerInput"
// 										className="text-sm font-semibold self-start mb-4"
// 									>
// 										Change default timer
// 									</label>
// 									<InputOTP
// 										value={updatedTimer}
// 										id="changeTimerInput"
// 										maxLength={4}
// 										onChange={(event) => setUpdatedTimer(event)}
// 									>
// 										<InputOTPGroup>
// 											<InputOTPSlot index={0} />
// 											<InputOTPSlot index={1} />
// 										</InputOTPGroup>
// 										:
// 										<InputOTPGroup>
// 											<InputOTPSlot index={2} />
// 											<InputOTPSlot index={3} />
// 										</InputOTPGroup>
// 									</InputOTP>
// 									<span
// 										className={`${updatedTimerError ? "block" : "hidden"} text-xs self-start text-red-500/70  mt-3`}
// 									>
// 										{updatedTimerError && updatedTimerError}
// 									</span>
// 									<Button
// 										onClick={changeDefaultTimer}
// 										className="self-start mt-4"
// 									>
// 										Submit
// 									</Button>
// 								</div>
// 							</SheetHeader>
// 						</SheetContent>
// 					</Sheet>
// 				</li>
// 			</ul>
// 		</div>
