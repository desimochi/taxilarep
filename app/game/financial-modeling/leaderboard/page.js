"use client";

import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/game/financial-modeling/leaderboard")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.leaderboard);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-600 mt-2">
            Financial Modeling Simulation — Top Performing Players
          </p>
        </div>

        {/* ================= LOADING ================= */}
        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading leaderboard...
          </div>
        )}

        {/* ================= EMPTY ================= */}
        {!loading && data.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No leaderboard data available.
          </div>
        )}

        {/* ================= TABLE ================= */}
        {!loading && data.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="min-w-full border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold">Rank</th>
                  <th className="p-4 text-left text-sm font-semibold">Player</th>
                  <th className="p-4 text-left text-sm font-semibold">Status</th>
                  <th className="p-4 text-right text-sm font-semibold">Score</th>
                  <th className="p-4 text-right text-sm font-semibold">Breaches</th>
                  <th className="p-4 text-right text-sm font-semibold">Year</th>
                  <th className="p-4 text-right text-sm font-semibold">Cash</th>
                  <th className="p-4 text-right text-sm font-semibold">Total Debt</th>
                </tr>
              </thead>

              <tbody>
                {data.map((player, index) => (
                  <tr
                    key={player.userId}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-4 font-semibold">
                      #{index + 1}
                    </td>

                    <td className="p-4">
                      <div className="font-medium">
                        {player.playerName || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-500">
                        User ID: {player.userId}
                      </div>
                    </td>

                    <td className="p-4">
                      {player.bankrupt ? (
                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                          Bankrupt
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                          {player.status}
                        </span>
                      )}
                    </td>

                    <td className="p-4 text-right font-semibold">
                      {Math.round(player.score)}
                    </td>

                    <td className="p-4 text-right">
                      {player.breaches}
                    </td>

                    <td className="p-4 text-right">
                      Year {player.year}
                    </td>

                    <td className="p-4 text-right">
                      ₹{player.cash}
                    </td>

                    <td className="p-4 text-right">
                      ₹{player.totalDebt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </main>
  );
}
