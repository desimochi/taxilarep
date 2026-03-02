"use client";

import { GlobalContext } from "@/components/GlobalContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Award, History } from "lucide-react";

export default function HtmlPage() {
  const { state } = useContext(GlobalContext);
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    const fetchUrl = async () => {
      const res = await fetch(
        `/api/get-interview-url?userId=${state.id}&name=${state.name}`
      );
      const data = await res.json();
      setIframeUrl(data.url);
    };

    fetchUrl();
  }, [state]);

  return (
    <div className="w-full h-screen py-8 bg-white px-8">
      <div className="max-w-7xl mx-auto flex justify-between mb-3">

        <Link href="/game/interview-preparation/past-attempts"
          className="group bg-gray-300 text-gray-900 mt-4 flex items-center gap-2 px-8 py-3 rounded-md"
        >
          <History className="opacity-0 group-hover:opacity-100 w-4 h-4" />
          View Past Attempts
        </Link>

        <Link href="/game/interview-preparation/leaderboard"
          className="group bg-green-100 text-green-700 mt-4 flex items-center gap-2 px-8 py-3 rounded-md"
        >
          <Award className="opacity-0 group-hover:opacity-100 w-4 h-4" />
          See LeaderBoard
        </Link>
      </div>

      {iframeUrl ? (
        <iframe src={iframeUrl} className="w-full h-full border-none" />
      ) : (
        <div className="text-center mt-20 text-gray-500">Loading...</div>
      )}
    </div>
  );
}
