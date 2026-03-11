"use client";

import BackButton from "@/components/ui/Backbutton";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = "16"; // your logged user id

  useEffect(() => {
    fetch("/api/game/priceWar/leaderboard")
      .then(res => res.json())
      .then(data => {
        setPlayers(data.leaderboard);
        setLoading(false);
      });
  }, []);

  const getMedal = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return rank;
  };

  if (loading) {
    return (
      <div className="flex justify-center mt-20 text-xl">
        Loading Leaderboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
        <BackButton />
      <h1 className="text-3xl font-bold text-center mb-8">
        🏆 Leaderboard
      </h1>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Rank</th>
              <th className="p-4 text-left">Player</th>
              <th className="p-4 text-left">Month</th>
              <th className="p-4 text-left">Profit</th>
              <th className="p-4 text-left">Score</th>
            </tr>
          </thead>

          <tbody>

            {players.slice(0,10).map((player) => {

              const isCurrentUser = player.userId === currentUserId;

              return (
                <tr
                  key={player.userId}
                  className={`border-b ${
                    isCurrentUser
                      ? "bg-yellow-100 font-semibold"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="p-4 text-lg">
                    {getMedal(player.rank)}
                  </td>

                  <td className="p-4">
                    {player.executiveName}
                  </td>

                  <td className="p-4">
                    {player.month}
                  </td>

                  <td className="p-4">
                    ₹{player.profit.toLocaleString()}
                  </td>

                  <td className="p-4 font-bold">
                    {player.score}
                  </td>
                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}