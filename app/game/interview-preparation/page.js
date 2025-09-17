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
              <Link href="/game/interview-preparation/past-attempts" className="group bg-gray-300 text-gray-900 mt-4 flex items-center gap-2 justify-center px-8 py-3 mb-3 cursor-pointer rounded-md text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"> <History className="h-0 w-0 opacity-0 transform translate-x-[-5px] transition-all duration-300 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 group-hover:translate-x-0" />View Past Attempts</Link>
            <Link href="/game/interview-preparation/leaderboard" class="group bg-green-100 text-green-700 mt-4 flex items-center gap-2 justify-center px-8 py-3 mb-3 cursor-pointer rounded-md text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"> <Award className="h-0 w-0 opacity-0 transform translate-x-[-5px] transition-all duration-300 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 group-hover:translate-x-0" /> See LeaderBoard</Link>
        </div>
      <iframe
        src={`/Videoint.html?userId=${encodedState}&name=${encodedStateName}&apiKey=${apiKey}`}
        className="w-full h-full border-none"
      />
    </div>
  );
}