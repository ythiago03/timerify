"use client";

import Timer from "@/components/Timer";
import { Slider } from "@/components/ui/slider";
import {
  CloudHail,
  Palette,
  Settings,
  TentTree,
  TreePalm,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export default function Home() {
  const [mainVolume, setMainVolume] = useState(50);
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full min-h-screen flex flex-col ">
      <header className="w-full flex justify-center p-3">
        <div className="flex w-1/2 justify-between items-center ">
          <h1 className="text-3xl font-bold">Timerify</h1>
          <ul className="flex gap-3">
            <li className="flex gap-5">
              <Slider
                onValueChange={(e) => setMainVolume(e[0])}
                defaultValue={[50]}
                max={100}
                step={1}
                className="w-24"
              />
              {mainVolume === 0 && <VolumeX />}
              {mainVolume > 0 && mainVolume <= 50 && <Volume1 />}
              {mainVolume > 0 && mainVolume > 50 && <Volume2 />}
            </li>
            <li>
              <Palette />
            </li>
            <li>
              <Settings />
            </li>
          </ul>
        </div>
      </header>
      <main className="grow flex ">
        <div className="w-1/3 ">taks</div>
        <Timer />
        <div className="flex flex-col items-center w-1/3 ">
          <h2 className="text-2xl font-bold mt-5">Sounds</h2>
          <div className="flex p-5 flex-wrap gap-5">
            <div className="relative hover:bg-gray-50  w-32 h-32 flex flex-col justify-center items-center cursor-pointer rounded-lg">
              <TentTree className="w-16 h-16" />
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="w-full mt-auto absolute bottom-0"
              />
            </div>
            <div className="relative hover:bg-gray-50  w-32 h-32 flex flex-col justify-center items-center cursor-pointer rounded-lg">
              <TreePalm className="w-16 h-16" />
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="w-full mt-auto absolute bottom-0"
              />
            </div>
            <div className="relative hover:bg-gray-50  w-32 h-32 flex flex-col justify-center items-center cursor-pointer rounded-lg">
              <CloudHail className="w-16 h-16" />
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                className="w-full mt-auto absolute bottom-0"
              />
            </div>
          </div>
        </div>
      </main>
      <footer className="w-full p-3 ">Copyright</footer>
    </div>
  );
}
