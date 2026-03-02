"use client";

import BackButton from "@/components/ui/Backbutton";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/game/negotiation-protocol/leaderboard");
        const json = await res.json();

        if (!json.success) {
          throw new Error("Failed to load leaderboard");
        }

        setData(json.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-10 px-4">
        <BackButton />
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">
            🏆 Leaderboard
          </h1>
          <p className="text-sm text-gray-500">
            Ranked by score (highest first)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Rank</th>
                <th className="px-4 py-3 text-sm font-semibold">Player</th>
                <th className="px-4 py-3 text-sm font-semibold">Score</th>
                <th className="px-4 py-3 text-sm font-semibold">Time Left</th>
                <th className="px-4 py-3 text-sm font-semibold">Last Update</th>
              </tr>
            </thead>

            <tbody>
              {data.map((player, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-semibold">
                    #{index + 1}
                  </td>
                  <td className="px-4 py-3">
                    {player.playerName || "Unknown"}
                  </td>
                  <td className="px-4 py-3 font-bold text-indigo-600">
                    {player.score}
                  </td>
                  <td className="px-4 py-3">
                    {player.timeLeft}s
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(player.updatedAt).toLocaleString()}
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500"
                  >
                    No leaderboard data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
