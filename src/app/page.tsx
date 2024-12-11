"use client";

import CardTheme from "@/components/common/CardTheme";
import Timer from "@/components/Timer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { useState } from "react";

export default function Home() {
  const [mainVolume, setMainVolume] = useState(50);
  const [background, setBackground] = useState<string>("");

  const toggleTheme = (theme: string, background?: string) => {
    console.log(theme);

    const htmlElement = document.documentElement;
    htmlElement.classList.forEach((className) => {
      htmlElement.classList.remove(className);
    });
    htmlElement.classList.add(theme);
    setBackground(background ? background : "");
  };

  return (
    <div
      style={{ backgroundImage: `${background}` }}
      className={`bg-${background} w-full min-h-screen flex flex-col  bg-cover bg-center bg-no-repeat`}
    >
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
              <Sheet>
                <SheetTrigger>
                  <Palette />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Choose your theme</SheetTitle>
                    <ScrollArea className="h-screen p-4 w-[350px]">
                      <div
                        className="flex
                    flex-col gap-4"
                      >
                        <CardTheme
                          title="Dark"
                          image="/assets/theme-dark.png"
                          toggleTheme={() => toggleTheme("dark")}
                        />
                        <CardTheme
                          title="Light"
                          image="/assets/theme-light.png"
                          toggleTheme={() => toggleTheme("light")}
                        />
                        <CardTheme
                          title="Forest"
                          image="/assets/theme-forest.png"
                          toggleTheme={() =>
                            toggleTheme(
                              "theme2",
                              "url('/assets/background-forest.gif')"
                            )
                          }
                        />
                        <CardTheme
                          title="Lofi"
                          image="/assets/theme-study.png"
                          toggleTheme={() =>
                            toggleTheme(
                              "dark",
                              "url('/assets/background-study.gif"
                            )
                          }
                        />
                      </div>
                    </ScrollArea>
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
