"use client";

import BackButton from "@/components/ui/Backbutton";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/game/startupCap/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data.leaderboard || []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading Leaderboard...
      </div>
    );
  }

  const top3 = players.slice(0, 3);
  const rest = players.slice(3);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
<BackButton />
      <h1 className="text-3xl font-bold text-center mb-10">
        🚀 Startup Simulator Leaderboard
      </h1>

      {/* TOP 3 PODIUM */}

      <div className="flex justify-center gap-6 mb-12 flex-wrap">

        {top3.map((player) => (
          <div
            key={player.userId}
            className="bg-white shadow-lg rounded-xl p-6 w-60 text-center"
          >
            <div className="text-3xl mb-2">
              {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : "🥉"}
            </div>

            <div className="text-lg font-bold">
              {player.playerName}
            </div>

            <div className="text-gray-500">
              {player.startupName}
            </div>

            <div className="text-green-600 font-bold mt-2">
              ${Number(player.exitValue || 0).toLocaleString()}M
            </div>

            <div className="text-sm mt-2">
              {player.simulationComplete ? "Completed" : "Running"}
            </div>

          </div>
        ))}

      </div>

      {/* TABLE */}

      <div className="max-w-5xl mx-auto bg-white shadow rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Player</th>
              <th className="p-4 text-left">Startup</th>
              <th className="p-4 text-left">Exit Value</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Time Left</th>
            </tr>
          </thead>

          <tbody>

            {rest.map((player) => (
              <tr key={player.userId} className="border-b hover:bg-gray-50">

                <td className="p-4">{player.rank}</td>

                <td className="p-4 font-semibold">
                  {player.playerName}
                </td>

                <td className="p-4">
                  {player.startupName}
                </td>

                <td className="p-4 text-green-600 font-bold">
                  ${Number(player.exitValue || 0).toLocaleString()}M
                </td>

                <td className="p-4">
                  {player.simulationComplete ? "Completed" : "Running"}
                </td>

                <td className="p-4">
                  {player.timeLeft}s
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}