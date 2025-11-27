"use client";

import { GlobalContext } from "@/components/GlobalContext";
import { Award, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export default function HtmlPage() {
     const {state} =  useContext(GlobalContext)
     const encodedState = encodeURIComponent(JSON.stringify(state.id));
      const encodedStateName = encodeURIComponent(JSON.stringify(state.name));
     console.log(encodedState)
  return (
    <div className="w-full h-screen bg-gray-900 py-8">
        <h1 className="text-center text-white font-bold text-4xl mb-4">Airhniti</h1>
     <div className="max-w-7xl mx-auto flex justify-between mb-3">
            <Link href="/game/diligence/how-to-play" className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-sm flex items-center gap-1"><HelpCircle /> Game Instructions</Link>
            <Link href="/game/diligence/leaderboard" className="bg-green-100 text-green-700 px-4 py-1 rounded-sm flex items-center gap-1"> <Award /> See LeaderBoard</Link>
        </div>
      <iframe
        src={`/diligence.html?userId=${encodedState}&name=${encodedStateName}`}
        className="w-full h-full border-none"
      />
    </div>
  );
}