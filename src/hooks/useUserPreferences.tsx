import { UserPreferencesContext } from "@/context/UserPreferences";
import { useContext } from "react";

export const useUserPreferences = () => {
	const context = useContext(UserPreferencesContext);
	if (!context) {
		throw new Error(
			"useUserPreferences must be used within a UserPreferencesProvider",
		);
	}
	return context;
};
