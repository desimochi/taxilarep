"use client";

import BackButton from "@/components/ui/Backbutton";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("/api/game/mircoEco/leaderboard", {
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
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
      <BackButton />
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🏆 MicroEco Leaderboard
        </h1>

        <div className="overflow-x-auto bg-white rounded-xl shadow">

          <table className="w-full text-sm text-left">

            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-3">Rank</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Balance</th>
                <th className="px-4 py-3">Day</th>
                <th className="px-4 py-3">Units Sold</th>
                <th className="px-4 py-3">Capacity</th>
                <th className="px-4 py-3">Last Update</th>
              </tr>
            </thead>

            <tbody>
              {data.map((row) => {
                const highlight =
                  row.rank === 1
                    ? "bg-yellow-50"
                    : row.rank === 2
                    ? "bg-gray-100"
                    : row.rank === 3
                    ? "bg-orange-50"
                    : "";

                return (
                  <tr key={row.userId} className={`border-t ${highlight}`}>

                    <td className="px-4 py-3 font-semibold">
                      #{row.rank}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {row.playerName}
                    </td>

                    <td className="px-4 py-3 font-semibold text-green-600">
                      ₹{row.balance.toLocaleString()}
                    </td>

                    <td className="px-4 py-3">
                      Day {row.day}
                    </td>

                    <td className="px-4 py-3">
                      {row.unitsSold}
                    </td>

                    <td className="px-4 py-3">
                      {row.capacity}
                    </td>

                    <td className="px-4 py-3 text-gray-500">
                      {new Date(row.updatedAt).toLocaleDateString()}
                    </td>

                  </tr>
                );
              })}

              {!data.length && (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
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