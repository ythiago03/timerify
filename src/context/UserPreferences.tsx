import { createContext, useRef, useState } from "react";

export interface TimerSettings {
	focus: number;
	short: number;
	long: number;
}

interface IUserPreferencesContext {
	background: string;
	timerSettingsRef: React.RefObject<TimerSettings>;
	savedProfiles?: string[];
	updateTimerSettings: (timerSettings: TimerSettings) => void;
	toggleTheme: (theme: string, background?: string) => void;
	saveCurrentProfile: (profileName: string) => void;
	loadProfile: (profileName: string) => void;
	getSavedProfiles: () => string[];
	deleteProfile: (profileName: string) => void;
}

const initalContext = {
	background: "dark",
	timerSettingsRef: {
		current: {
			focus: 25,
			short: 5,
			long: 15,
		},
	},
	updateTimerSettings: (timerSettings: TimerSettings) => {},
	toggleTheme: (theme: string, background?: string) => {},
	saveCurrentProfile: (profileName: string) => {},
	loadProfile: (profileName: string) => {},
	getSavedProfiles: () => [],
	deleteProfile: (profileName: string) => {},
};

export const UserPreferencesContext =
	createContext<IUserPreferencesContext>(initalContext);

export const UserPreferencesProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const timerSettingsRef = useRef<TimerSettings>({
		focus: 25,
		short: 5,
		long: 15,
	});
	const [background, setBackground] = useState<string>("");
	const currentProfileRef = useRef({
		timerSettings: {
			focus: 25,
			short: 5,
			long: 15,
		},
		theme: "dark",
		background: "",
	});

	const updateTimerSettings = (timerSettings: TimerSettings) => {
		timerSettingsRef.current = timerSettings;
		currentProfileRef.current.timerSettings = timerSettings;
	};

	const toggleTheme = (theme: string, background?: string): void => {
		const htmlElement = document.documentElement;
		// biome-ignore lint/complexity/noForEach: <explanation>
		htmlElement.classList.forEach((className) => {
			htmlElement.classList.remove(className);
		});
		htmlElement.classList.add(theme);
		setBackground(background ? background : "");
		currentProfileRef.current.theme = theme;
		currentProfileRef.current.background = background ? background : "";
	};

	const saveCurrentProfile = (profileName: string): void => {
		const convertedProfile = JSON.stringify(currentProfileRef.current);
		localStorage.setItem(profileName, convertedProfile);
	};

	const loadProfile = (profileName: string): void => {
		const profile = localStorage.getItem(profileName);
		if (profile) {
			const parsedProfile = JSON.parse(profile);
			toggleTheme(parsedProfile.theme, parsedProfile.background);
			updateTimerSettings(parsedProfile.timerSettings);
		}
	};

	const getSavedProfiles = (): string[] => {
		const profiles = Object.keys(localStorage);
		const filteredProfiles = profiles.filter(
			(profile) => profile !== "theme" && profile !== "ally-supports-cache",
		);
		return filteredProfiles;
	};

	const deleteProfile = (profileName: string): void => {
		localStorage.removeItem(profileName);
	};

	return (
		<UserPreferencesContext.Provider
			value={{
				background,
				timerSettingsRef,
				updateTimerSettings,
				toggleTheme,
				saveCurrentProfile,
				loadProfile,
				getSavedProfiles,
				deleteProfile,
			}}
		>
			{children}
		</UserPreferencesContext.Provider>
	);
};
