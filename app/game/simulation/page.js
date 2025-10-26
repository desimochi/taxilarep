"use client";

import { GlobalContext } from "@/components/GlobalContext";
import Link from "next/link";
import { useContext } from "react";

export default function HtmlPage() {
     const {state} =  useContext(GlobalContext)
     const encodedState = encodeURIComponent(JSON.stringify(state.id));
      const encodedStateName = encodeURIComponent(JSON.stringify(state.name));
     console.log(encodedState)
  return (
    <div className="w-full h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold text-center pt-5">Taxila Simulation Game </h1>
      <p className="text-center pb-5 text-red-500 underline">
      <Link href={'/game/simulation/how-to-play'} >How to Play the game</Link>
      </p>
     <h2 className="text-center mt-4">Game Timings are Over </h2>
    </div>
  );
}
