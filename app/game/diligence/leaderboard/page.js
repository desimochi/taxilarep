"use client";

import BackButton from "@/components/ui/Backbutton";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/game/diligance/leaderboard");
      const json = await res.json();
      if (json.success) {
        setData(json.leaderboard);
      }
    } catch (err) {
      console.error("Error loading leaderboard:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-10 text-lg font-semibold">
        Loading Leaderboard...
      </div>
    );

  return (
    <div className=" mt-10 p-6 bg-white  mx-8">
        <BackButton />
      <h2 className="text-2xl font-bold mb-4 text-center">🏆 Leaderboard</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3">Rank</th>
              <th className="p-3">Player</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Current Stage Score</th>
              <th className="p-3">Total Score</th>
              <th className="p-3">Last Updated</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.userId}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-semibold">{index + 1}</td>

                <td className="p-3">
                  {item.name}
                </td>

                <td className="p-3">{item.userId}</td>

                <td className="p-3">{item.currentStageScore}</td>

                <td className="p-3 font-bold text-blue-600">{item.totalScore}</td>

                <td className="p-3">
                  {item.lastUpdated
                    ? new Date(item.lastUpdated).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
