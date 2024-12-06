"use client";

import Timer from "@/components/Timer";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Timer />
    </div>
  );
}
