"use client";

import { GlobalContext } from "@/components/GlobalContext";
import { Award, HelpCircle } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import AudioPopup from "./AudioPlayer";

export default function HtmlPage() {
      const [isOpen, setIsOpen] = useState(false);
     const {state} =  useContext(GlobalContext)
     const encodedState = encodeURIComponent(JSON.stringify(state.id));
      const encodedStateName = encodeURIComponent(JSON.stringify(state.name));
     console.log(encodedState)
  return (
    <div className="w-full h-screen py-8 bg-[#0a0a14cc]">
     <div class="max-w-7xl mx-auto flex justify-between mb-3">
            <button onClick={()=>setIsOpen(true)} class="bg-yellow-100 text-yellow-700 px-4 py-1 rounded-sm flex items-center gap-1"><HelpCircle /> Game Instructions</button>
            <Link href="/game/netrvita/leaderboard" class="bg-green-100 text-green-700 px-4 py-1 rounded-sm flex items-center gap-1"> <Award /> See LeaderBoard</Link>
        </div>

        <h2 className="text-center mt-4"> Game Timings are Over </h2>
  
      <AudioPopup isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
