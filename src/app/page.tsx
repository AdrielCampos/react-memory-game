"use client";
import { Cardgame } from "@/components/cardgame";
import { Landpage } from "@/components/landpage";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState<"easy" | "medium" | "hard">();

  return (
    <main className="flex gap-8 md:gap-0 min-h-screen flex-col items-center justify-between p-12 md:p-24">
      <AnimatePresence>
        {!mode ? (
          <Landpage setMode={setMode} />
        ) : (
          <Cardgame mode={mode} setMode={setMode} />
        )}
      </AnimatePresence>
    </main>
  );
}
