import { useState } from "react";
import {
	Clock,
	Palette,
	Save,
	SettingsIcon,
	TrashIcon,
	User,
} from "lucide-react";

import type { TimerSettings } from "@/context/UserPreferences";

import { useUserPreferences } from "@/hooks/useUserPreferences";
import useTimer from "@/hooks/useTimer";

import { toast } from "sonner";
import { Button } from "../ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card } from "../ui/card";
import Themes from "./Themes";

const SettingsDialog = () => {
	const {
		timerSettingsRef,
		getSavedProfiles,
		saveCurrentProfile,
		loadProfile,
		deleteProfile,
	} = useUserPreferences();
	const { changeTimer } = useTimer();
	const [timerSettings, setTimerSettings] = useState<TimerSettings>(
		timerSettingsRef?.current ?? {
			focus: 25,
			short: 5,
			long: 15,
		},
	);
	const [savedProfiles, setSavedProfiles] = useState(getSavedProfiles());
	const [newProfileName, setNewProfileName] = useState("");
	const [timerError, setTimerError] = useState("");

	const handleTimerChange = (key: keyof TimerSettings, value: number) => {
		setTimerError("");
		if (Number.isNaN(value))
			return setTimerError("Invalid value, please use only numbers");
		const newTimerSettings = { ...timerSettings, [key]: value };
		setTimerSettings(newTimerSettings);
	};

	const updateTimerSettings = () => {
		for (const key in timerSettings) {
			const value = timerSettings[key as keyof TimerSettings];
			if (value === 0)
				return setTimerError("All values must be greater than 0");
			if (value > 60) return setTimerError("All values must be less than 60");
		}
		changeTimer(timerSettings);
		toast.success("Timer settings updated!");
	};

	const saveProfile = () => {
		if (getSavedProfiles().includes(newProfileName))
			return toast.error("Profile already exists");
		if (newProfileName.length < 3)
			return toast.error("Profile name must be at least 3 characters long");
		saveCurrentProfile(newProfileName);
		setSavedProfiles(getSavedProfiles());
		setNewProfileName("");
		toast.success("Profile saved!");
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="fixed top-4 right-4 z-50 bg-transparent border-foreground/70"
				>
					<SettingsIcon className="size-5 text-foreground" />
				</Button>
			</DialogTrigger>
			<DialogContent className="border-foreground/20 w-11/12">
				<DialogHeader>
					<DialogTitle>Settings & Profiles</DialogTitle>
					<DialogDescription>
						Customize your Pomodoro experience and save profiles
					</DialogDescription>
				</DialogHeader>

				<Tabs defaultValue="timer" className="w-full">
					<TabsList className="w-full bg-accent/50">
						<TabsTrigger className="w-full" value="timer">
							<Clock className="mr-2 size-4" /> Timer
						</TabsTrigger>
						<TabsTrigger className="w-full" value="themes">
							<Palette className="mr-2 size-4" /> Themes
						</TabsTrigger>
						<TabsTrigger className="w-full" value="profiles">
							<User className="mr-2 size-4" /> Profiles
						</TabsTrigger>
					</TabsList>
					<TabsContent value="timer" className="space-y-4 mt-4">
						<div className="grid w-full items-center gap-3">
							<Label htmlFor="focus">Work Duration (minutes)</Label>
							<Input
								type="text"
								maxLength={2}
								id="focus"
								value={timerSettings.focus}
								placeholder="25"
								onChange={(e) => handleTimerChange("focus", +e.target.value)}
								className="border-foreground/20"
							/>
						</div>
						<div className="grid w-full items-center gap-3">
							<Label htmlFor="short">Short Break (minutes)</Label>
							<Input
								type="text"
								maxLength={2}
								id="short"
								value={timerSettings.short}
								placeholder="5"
								onChange={(e) => handleTimerChange("short", +e.target.value)}
								className="border-foreground/20"
							/>
						</div>
						<div className="grid w-full items-center gap-3">
							<Label htmlFor="long">Long Break (minutes)</Label>
							<Input
								type="text"
								maxLength={2}
								id="long"
								value={timerSettings.long}
								placeholder="15"
								onChange={(e) => handleTimerChange("long", +e.target.value)}
								className="border-foreground/20"
							/>
						</div>
						{timerError !== "" && (
							<p className="mt-3 text-sm text-destructive">{timerError}</p>
						)}
						<Button
							className="w-full bg-ring text-accent-foreground font-semibold hover:bg-ring/80"
							onClick={updateTimerSettings}
						>
							Apply Timer Settings
						</Button>
					</TabsContent>
					<TabsContent value="themes">
						<Themes />
					</TabsContent>
					<TabsContent value="profiles">
						<div className="grid w-full items-center gap-3 my-4">
							<Label htmlFor="profile" className=" font-semibold">
								Save Current Configuration
							</Label>
							<div className="flex gap-3">
								<Input
									type="text"
									id="profile"
									placeholder="Profile name..."
									value={newProfileName}
									onChange={(e) => setNewProfileName(e.target.value)}
									className="border-foreground/20"
								/>
								<Button
									className="bg-ring text-accent-foreground font-semibold hover:bg-ring/80"
									onClick={saveProfile}
									disabled={!newProfileName}
								>
									<Save /> Save
								</Button>
							</div>
							<p className="text-muted-foreground text-sm">
								Saves timer settings, theme and sound preferences
							</p>
						</div>
						<div>
							<h3 className="text-sm font-semibold mb-3">Saved Profiles</h3>
							<div className="grid grid-cols-1 gap-3 ">
								{savedProfiles.length === 0 && (
									<Card className="p-6 text-center text-muted-foreground bg-accent/50 border-foreground/20">
										<p>No saved profiles yet</p>
										<p className="text-sm mt-1">
											Create your first profile above
										</p>
									</Card>
								)}
								{savedProfiles.map((profile: string) => (
									<Card
										key={profile}
										className="p-4 bg-accent/50 border-foreground/20"
									>
										<div className="flex items-center justify-between">
											<div className="flex-1">
												<h4 className="font-semibold text-foreground">
													{profile}
												</h4>
											</div>
											<div className="flex gap-2">
												<Button
													variant="outline"
													size="sm"
													className="text-foreground hover:text-foreground border-foreground/20"
													onClick={() => loadProfile(profile)}
												>
													Load
												</Button>
												<Button
													variant="ghost"
													size="sm"
													onClick={() => {
														deleteProfile(profile);
														setSavedProfiles(getSavedProfiles());
														toast.success("Profile deleted!");
													}}
													className="text-destructive hover:text-destructive"
												>
													<TrashIcon className="size-4" />
												</Button>
											</div>
										</div>
									</Card>
								))}
							</div>
						</div>
					</TabsContent>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default SettingsDialog;
