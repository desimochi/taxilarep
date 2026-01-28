"use client";

import BackButton from "@/components/ui/Backbutton";
import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("spi");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const limit = 10;

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/game/strastim2/leaderboard?page=${page}&limit=${limit}&sortBy=${sortBy}`,
        { cache: "no-store" }
      );

      if (!res.ok) throw new Error("Failed to fetch leaderboard");

      const json = await res.json();
      setData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [page, sortBy]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="">
        <BackButton />
        <h1 className="text-3xl font-bold mb-6 px-12"> Leaderboard</h1>

        {/* Sort */}
        <div className="flex gap-3 mb-6 px-12">
          {["spi", "profit", "revenue"].map((key) => (
            <button
              key={key}
              onClick={() => {
                setSortBy(key);
                setPage(1);
              }}
              className={`px-4 py-2 rounded border text-sm ${
                sortBy === key
                  ? "bg-violet-600 border-violet-500"
                  : "border-gray-700 hover:bg-gray-800"
              }`}
            >
              Sort by {key.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-400">
            Loading leaderboard...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 text-red-400">
            {error}
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className=" rounded-lg border border-gray-800 px-12">
            <table className="w-full text-sm px-12">
              <thead className="bg-gray-900">
                <tr>
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Firm</th>
                  <th className="p-3 text-right">SPI</th>
                  <th className="p-3 text-right">Revenue</th>
                  <th className="p-3 text-right">Profit</th>
                  <th className="p-3 text-left">Market</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={row.userId}
                    className="border-t border-gray-800 hover:bg-gray-900"
                  >
                    <td className="p-3 font-semibold">
                      #{(page - 1) * limit + index + 1}
                    </td>
                    <td className="p-3">{row.username}</td>
                    <td className="p-3">{row.firmName}</td>
                    <td className="p-3 text-right">{row.spi}</td>
                    <td className="p-3 text-right">
                      ₹{row.totalRevenue.toLocaleString()}
                    </td>
                    <td className="p-3 text-right text-green-400">
                      ₹{row.totalProfit.toLocaleString()}
                    </td>
                    <td className="p-3">{row.marketEvent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <div className="flex justify-between items-center mt-6 px-12">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-800"
            >
              ← Previous
            </button>

            <span className="text-sm text-gray-400">Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border rounded hover:bg-gray-800"
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
