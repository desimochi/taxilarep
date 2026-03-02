"use client";

import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
    const router = useRouter()
  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/game/consumer/leaderboard");
        const data = await res.json();
        setLeaderboard(data.leaderboard || []);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);
function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return [
    hrs.toString().padStart(2, "0"),
    mins.toString().padStart(2, "0"),
    secs.toString().padStart(2, "0")
  ].join(":");
}
  if (loading) {
    return <div className="p-6 text-lg font-semibold">Loading leaderboard...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-white">
        <div className="px-8 py-8">
            <button onClick={()=>router.back()} className="text-gray-700 flex items-center gap-1"><ArrowBigLeft />Go Back</button>
        </div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center ">Hyper-Competitive Consumer Simulation Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg ">
          <thead className="bg-gray-100">
            <tr className="bg-white/30 backdrop-blur-sm text-gray-700 border-b-1 border-gray-100 ">
              <th className="p-3 ">Rank</th>
              <th className="p-3 ">Name</th>
              <th className="p-3 ">Company Name</th>
              <th className="p-3 ">Sales</th>
               <th className="p-3 ">Score</th>
              <th className="p-3 ">Quarter</th>
              <th className="p-3 ">Cumulative Sales</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length>0 ?  leaderboard.map((row, i) => (
              <tr
                key={row.userId}
                className={`bg-white/10 backdrop-blur-sm text-gray-800 text-sm text-center`}
              >
                <td className="p-3  font-bold">#{i + 1}</td>
                <td className="p-3 ">{row?.name2 || "Unknown"}</td>
                <td className="p-3 ">{row?.name || "Unknown"}</td>
                <td className="p-3 ">{row.sales || "-"}</td>
                <td className="p-3 ">{row.score || "-"}</td>
                <td className="p-3 ">{row.quarter}</td>
                <td className="p-3 ">{row.cumulativeSales}</td>
              </tr>
            )) : <tr className="bg-white/10 backdrop-blur-sm text-gray-100 text-sm text-center"><td className="p-3" colSpan={8}>No Data Available</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
