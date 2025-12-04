"use client";

import { GlobalContext } from "@/components/GlobalContext";
import { Award, HelpCircle, HelpCircleIcon, History } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";

export default function HtmlPage() {
     const {state} =  useContext(GlobalContext)
     const encodedState = encodeURIComponent(JSON.stringify(state.id));
      const encodedStateName = encodeURIComponent(JSON.stringify(state.name));
     console.log(encodedState)
  return (
    <div className="w-full h-screen py-8 bg-white px-8">
     <div class="max-w-7xl mx-auto flex justify-between mb-3">
            <Link href="/game/indian-consumer/how-to-play" class="bg-green-100 text-green-700 px-4 py-1 rounded-sm flex items-center gap-1"> <HelpCircleIcon />Guide</Link>
            <Link href="/game/indian-consumer/leaderboard" class="bg-green-100 text-green-700 px-4 py-1 rounded-sm flex items-center gap-1"> <Award /> See LeaderBoard</Link>
        </div>
      <iframe
        src={`/indiac.html?userId=${encodedState}&name=${encodedStateName}`}
        className="w-full h-full border-none"
      />
    </div>
  ); 
}