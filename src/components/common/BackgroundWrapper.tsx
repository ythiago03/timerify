import { useUserPreferences } from "@/hooks/useUserPreferences";

const BackgroundWrapper = ({ children }: { children: React.ReactNode }) => {
	const { background } = useUserPreferences();
	return (
		<div
			style={{ backgroundImage: `${background}` }}
			className={`bg-${background} w-full min-h-screen flex flex-col  bg-cover bg-center bg-no-repeat`}
		>
			{children}
		</div>
	);
};

export default BackgroundWrapper;
