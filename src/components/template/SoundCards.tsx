import CardSound from "../common/CardSound";
import {
  CloudHail,
  Coffee,
  FlameKindling,
  Mountain,
  TentTree,
  TrainFront,
  TreePalm,
} from "lucide-react";

const SoundCards: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <CardSound soundName="night" icon={TentTree} />
      <CardSound soundName="campfire" icon={FlameKindling} />
      <CardSound soundName="beach" icon={TreePalm} />
      <CardSound soundName="rain" icon={CloudHail} />
      <CardSound soundName="coffee" icon={Coffee} />
      <CardSound soundName="cave" icon={Mountain} />
      <CardSound soundName="train" icon={TrainFront} />
    </div>
  );
};

export default SoundCards;
