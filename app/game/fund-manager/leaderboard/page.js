'use client'

import { useEffect, useState } from "react";

export default function LeaderboardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("rank"); // default sorting

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/game/fund/leaderboard");
        const json = await res.json();
        setData(json.leaderboard || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }
    load();
  }, []);

  // SORTING FUNCTION
  const sorted = [...data].sort((a, b) => {
    if (sortBy === "funds") return b.totalFunds - a.totalFunds;
    if (sortBy === "score") return b.totalScore - a.totalScore;
    if (sortBy === "fees") return b.fees - a.fees;
    if (sortBy === "lastPlayed")
      return new Date(b.lastPlayed) - new Date(a.lastPlayed);
    return a.rank - b.rank; // default rank
  });

  // SEARCH FILTER
  const filtered = sorted.filter((u) =>
    (u.name + u.userId)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or user ID..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="px-4 py-2 border rounded-lg"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="rank">Sort by Rank</option>
          <option value="funds">Sort by Funds</option>
          <option value="score">Sort by Score</option>
          <option value="fees">Sort by Fees</option>
          <option value="lastPlayed">Sort by Last Played</option>
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-10 text-gray-500 text-lg">
          Loading leaderboard...
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="overflow-x-auto rounded-lg border shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left">Rank</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-right">Total Funds</th>
                <th className="px-4 py-3 text-right">Score</th>
                <th className="px-4 py-3 text-right">Fees</th>
                <th className="px-4 py-3 text-right">Last Played</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}

              {filtered.map((u) => (
                <tr
                  key={u.userId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-bold">{u.rank}</td>
                  <td className="px-4 py-3">{u.name}</td>
                  <td className="px-4 py-3 text-right">
                    ₹{u.totalFunds.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">{u.totalScore}</td>
                  <td className="px-4 py-3 text-right">{u.fees}</td>
                  <td className="px-4 py-3 text-right">
                    {u.lastPlayed
                      ? new Date(u.lastPlayed).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
