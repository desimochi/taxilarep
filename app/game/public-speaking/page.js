"use client";

import { GlobalContext } from "@/components/GlobalContext";
import { Award, HelpCircle, History } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";

export default function HtmlPage() {
      const [isOpen, setIsOpen] = useState(false);
     const {state} =  useContext(GlobalContext)
     const encodedState = encodeURIComponent(JSON.stringify(state.id));
      const encodedStateName = encodeURIComponent(JSON.stringify(state.name));
      const apiKey = "AIzaSyBMd8cwKx0rvLuhqSic4iwGiDCX7-X4Kh8";
     console.log(encodedState)
  return (
    <div className="w-full h-screen py-8 bg-white px-8">
     <div class="max-w-7xl mx-auto flex justify-between mb-3">
            
            <Link href="/game/public-speaking/leaderboard" class="bg-green-100 text-green-700 px-4 py-1 rounded-sm flex items-center gap-1"> <Award /> See LeaderBoard</Link>
        </div>
      <iframe
        src={`/speaking.html?userId=${encodedState}&name=${encodedStateName}&apiKey=${apiKey}`}
        className="w-full h-full border-none"
      />
    </div>
  ); 
}