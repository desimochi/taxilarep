"use client";

import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/game/guesstimations/leaderboard");
        const data = await res.json();
        setLeaderboard(data || []); // your API returns an array directly
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-lg font-semibold text-white">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-black">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Guesstimations Leaderboard
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg">
          <thead>
            <tr className="bg-white/30 backdrop-blur-sm text-yellow-300 border-b border-yellow-100">
              <th className="p-3">Rank</th>
              <th className="p-3">Name</th>
              <th className="p-3">Score</th>
              <th className="p-3">Last Played</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.length > 0 ? (
              leaderboard.map((row, i) => (
                <tr
                  key={row.userId}
                  className="bg-white/10 backdrop-blur-sm text-gray-100 text-sm text-center"
                >
                  <td className="p-3 font-bold">#{i + 1}</td>
                  <td className="p-3">{row?.name || "Unknown"}</td>
                  <td className="p-3">{row?.score ?? "-"}</td>
                  <td className="p-3 text-gray-400">
                    {row.updatedAt
                      ? new Date(row.updatedAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white/10 backdrop-blur-sm text-gray-100 text-sm text-center">
                <td className="p-3" colSpan={4}>
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
