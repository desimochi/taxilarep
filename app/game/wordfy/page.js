"use client";

import { GlobalContext } from "@/components/GlobalContext";
import { Award, BookAIcon, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";

export default function HtmlPage() {
     const {state} =  useContext(GlobalContext)
     const encodedState = encodeURIComponent(JSON.stringify(state.id));
      const encodedStateName = encodeURIComponent(JSON.stringify(state.name));
     console.log(encodedState)
  return (
    <div className="w-full h-screen bg-gray-50 py-12 mb-12">
        <h1 className="text-center text-gray-900 font-bold text-4xl mb-4">Project Titan</h1>
     <div className="max-w-7xl mx-auto flex justify-between mb-5">
            <Link href="/game/wordfy/how-to-play" className="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-sm flex items-center gap-1"><HelpCircle /> Game Instructions</Link>
            <Link href="/game/wordfy/leaderboard" className="bg-green-100 text-green-700 px-4 py-1 rounded-sm flex items-center gap-1"> <Award /> See LeaderBoard</Link>
        </div>
      <iframe
        src={`/Wordify-new.html?userId=${encodedState}&name=${encodedStateName}`}
        className="w-full h-full border-none"
      />
    </div>
  );
}