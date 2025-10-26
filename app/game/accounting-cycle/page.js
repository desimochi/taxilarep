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
    <div className="w-full h-screen bg-slate-100 py-8">
     <div class="max-w-7xl mx-auto flex justify-between mb-3">
            <Link href="/game/accounting-cycle/how-to-play" class="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-sm flex items-center gap-1"><HelpCircle /> Game Instructions</Link>
            <Link href="/game/accounting-cycle/leaderboard" class="bg-green-100 text-green-700 px-4 py-1 rounded-sm flex items-center gap-1"> <Award /> See LeaderBoard</Link>
        </div>
     <h2 className="text-center mt-4">Game Timings are Over </h2>
    </div>
  );
}
