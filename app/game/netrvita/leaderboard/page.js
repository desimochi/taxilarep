"use client";

import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/game/netrvita/leaderboard");
        const data = await res.json();
        setLeaderboard(data || []);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div className="p-6 text-lg font-semibold text-yellow-300">Loading leaderboard...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-black">
      <div className="px-8 py-8">
        <button
          onClick={() => router.back()}
          className="text-gray-50 flex items-center gap-1 hover:text-yellow-300 transition"
        >
          <ArrowBigLeft /> Go Back
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
        Netritva Leaderboard
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg border border-yellow-200/30 rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-white/20 backdrop-blur-sm text-yellow-300 border-b border-yellow-100/30">
              <th className="p-3">Rank</th>
              <th className="p-3">Name</th>
              <th className="p-3">Budget</th>
              <th className="p-3">Market Share</th>
              <th className="p-3">Score</th>
              <th className="p-3">Normalized</th>
              <th className="p-3">Percentile</th>
              <th className="p-3">Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((row, i) => (
                <tr
                  key={row.userId}
                  className={`${
                    i === 0
                      ? "bg-yellow-400/20 text-yellow-200 font-semibold"
                      : "bg-white/10 text-gray-100"
                  } backdrop-blur-sm text-sm text-center transition hover:bg-white/20`}
                >
                  <td className="p-3 font-bold">#{i + 1}</td>
                  <td className="p-3">{row?.name || "Unknown"}</td>
                  <td className="p-3">{row.budget?.toLocaleString() || "-"}</td>
                  <td className="p-3">{row.marketShare ?? "-"}</td>
                  <td className="p-3">{row.score?.toFixed(2)}</td>
                  <td className="p-3">{row.normalizedScore?.toFixed(2)}</td>
                  <td className="p-3">{row.percentile?.toFixed(2)}%</td>
                  <td className="p-3 text-gray-400">
                    {row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white/10 text-gray-100 text-sm text-center">
                <td className="p-3" colSpan={8}>
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
