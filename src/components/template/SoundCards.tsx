import CardSound from "../common/CardSound";
import {
  Bird,
  CloudHail,
  Coffee,
  FlameKindling,
  Mountain,
  TentTree,
  TrainFront,
  TreePalm,
  Waves,
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
      <CardSound soundName="birds" icon={Bird} />
      <CardSound soundName="river" icon={Waves} />
    </div>
  );
};

export default SoundCards;
