"use client";

import CardSound from "@/components/common/CardSound";
import CardTheme from "@/components/common/CardTheme";
import GlobalSoundControl from "@/components/common/GlobalSoundControl";
import Themes from "@/components/layout/Themes";
import Timer from "@/components/Timer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GlobalAudioProvider } from "@/context/GlobalAudioContext";
import {
  CloudHail,
  Coffee,
  FlameKindling,
  Mountain,
  Palette,
  Settings,
  TentTree,
  TrainFront,
  TreePalm,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [background, setBackground] = useState<string>("");

  const toggleTheme = (theme: string, background?: string) => {
    const htmlElement = document.documentElement;
    htmlElement.classList.forEach((className) => {
      htmlElement.classList.remove(className);
    });
    htmlElement.classList.add(theme);
    setBackground(background ? background : "");
  };

  return (
    <GlobalAudioProvider>
      <div
        style={{ backgroundImage: `${background}` }}
        className={`bg-${background} w-full min-h-screen flex flex-col  bg-cover bg-center bg-no-repeat`}
      >
        <header className="w-full flex justify-center p-3">
          <div className="flex w-1/2 justify-between items-center ">
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
              <CardSound soundName="night" icon={TentTree} />
              <CardSound soundName="campfire" icon={FlameKindling} />
              <CardSound soundName="beach" icon={TreePalm} />
              <CardSound soundName="rain" icon={CloudHail} />
              <CardSound soundName="coffee" icon={Coffee} />
              <CardSound soundName="cave" icon={Mountain} />
              <CardSound soundName="train" icon={TrainFront} />
            </div>
          </div>
        </main>
        <footer className="w-full p-3 ">Copyright</footer>
      </div>
    </GlobalAudioProvider>
  );
}
