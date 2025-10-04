import CardSound from "../common/CardSound";

const SoundCards: React.FC = () => {
	return (
		<div className="w-full grid grid-cols-2 gap-4">
			<CardSound soundName="night" icon="🌙" color="bg-night/50" />
			<CardSound soundName="campfire" icon="🔥" color="bg-campfire/50" />
			<CardSound soundName="beach" icon="🌊" color="bg-beach/50" />
			<CardSound soundName="rain" icon="🌧️" color="bg-rain/50" />
			<CardSound soundName="coffee" icon="☕" color="bg-coffee/50" />
			<CardSound soundName="cave" icon="⛰️" color="bg-cave/50" />
			<CardSound soundName="train" icon="🚊" color="bg-train/50" />
			<CardSound soundName="birds" icon="🐦" color="bg-birds/50" />
			<CardSound soundName="river" icon="🚣🏻‍♀️" color="bg-river/50" />
		</div>
	);
};

export default SoundCards;
