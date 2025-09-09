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
        const res = await fetch("/api/game/indian/leaderboard");
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
    <div className="p-8 min-h-screen bg-black">
        <div className="px-8 py-8">
            <button onClick={()=>router.back()} className="text-gray-50 flex items-center gap-1"><ArrowBigLeft />Go Back</button>
        </div>
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Indian Business Strategy Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg ">
          <thead>
            <tr className="bg-white/30 backdrop-blur-sm text-yellow-300 border-b-1 border-yellow-100 ">
              <th className="p-3 ">Rank</th>
              <th className="p-3 ">Name</th>
              <th className="p-3 ">Company Name</th>
              <th className="p-3 ">Net Profit (Cr.)</th>
              <th className="p-3 ">Market Share</th>
              <th className="p-3 ">Brand Image</th>
              <th className="p-3 ">Score</th>
              <th className="p-3 ">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length>0 ?  leaderboard.map((row, i) => (
              <tr
                key={row.userId}
                className={`bg-white/10 backdrop-blur-sm text-gray-100 text-sm text-center`}
              >
                <td className="p-3  font-bold">#{i + 1}</td>
                <td className="p-3 ">{row?.name || "Unknown"}</td>
                <td className="p-3 ">{row.companyName || "-"}</td>
                <td className="p-3 ">{row.netProfit}</td>
                <td className="p-3 ">{row.marketShare}</td>
                <td className="p-3 ">{row.brandImage}</td>
                <td className="p-3 ">{row.score}</td>
                <td className="p-3   text-gray-500">
                  {row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "-"}
                </td>
              </tr>
            )) : <tr className="bg-white/10 backdrop-blur-sm text-gray-100 text-sm text-center"><td className="p-3" colSpan={8}>No Data Available</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
