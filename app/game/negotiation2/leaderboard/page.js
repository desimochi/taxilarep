"use client";

import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/game/nego2/leaderboard", {
          cache: "no-store",
        });
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading Leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          🏆 Negotiation 2 Leaderboard
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Threat</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Trust</th>
                <th className="px-4 py-3">Scenario</th>
                <th className="px-4 py-3">Flight</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row, index) => {
                const highlight =
                  row.rank === 1
                    ? "bg-yellow-50"
                    : row.rank === 2
                    ? "bg-gray-100"
                    : row.rank === 3
                    ? "bg-orange-50"
                    : "";

                return (
                  <tr
                    key={row.userId}
                    className={`border-t ${highlight}`}
                  >
                    <td className="px-4 py-3 font-semibold">
                      #{row.rank}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {row.playerName}
                    </td>

                    <td
                      className={`px-4 py-3 font-semibold ${
                        row.threat > 80
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {row.threat}
                    </td>

                    <td className="px-4 py-3">
                      {(row.time / 60).toFixed(1)} min
                    </td>

                    <td
                      className={`px-4 py-3 font-semibold ${
                        row.trust < 30
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {row.trust}
                    </td>

                    <td className="px-4 py-3">
                      {row.scenario}
                    </td>

                    <td className="px-4 py-3">
                      {row.flight}
                    </td>
                  </tr>
                );
              })}

              {!data.length && (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-8 text-gray-500"
                  >
                    No leaderboard data available
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
