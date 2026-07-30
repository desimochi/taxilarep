"use client";

import { ArrowBigLeft, ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: "gdp", direction: "desc" });
  const router = useRouter();

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const res = await fetch("/api/game/arthniti/leaderboard");
        const data = await res.json();
        setLeaderboard(data.leaderboard || []);
      } catch (err) {
        console.error("Failed to load leaderboard:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaderboard();
  }, []);

  function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  }

  function handleSort(key) {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // toggle direction on same column
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      // new column, default to descending first
      return { key, direction: "desc" };
    });
  }

  const sortedLeaderboard = useMemo(() => {
    const sorted = [...leaderboard].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // handle strings (name) vs numbers
      if (typeof aVal === "string") aVal = aVal.toLowerCase();
      if (typeof bVal === "string") bVal = bVal.toLowerCase();

      if (aVal == null) aVal = sortConfig.key === "name" ? "" : 0;
      if (bVal == null) bVal = sortConfig.key === "name" ? "" : 0;

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [leaderboard, sortConfig]);

  function SortIcon({ column }) {
    if (sortConfig.key !== column) {
      return <ArrowUpDown className="inline w-3.5 h-3.5 ml-1 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUp className="inline w-3.5 h-3.5 ml-1 text-gray-900" />
    ) : (
      <ArrowDown className="inline w-3.5 h-3.5 ml-1 text-gray-900" />
    );
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "gdp", label: "GDP" },
    { key: "approval", label: "Approval" },
    { key: "sensex", label: "Sensex" },
    { key: "year", label: "Year" },
    { key: "quarter", label: "Quarter" },
    { key: "updatedAt", label: "Last Updated" },
  ];

  if (loading) {
    return <div className="p-6 text-lg font-semibold">Loading leaderboard...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-white">
      <div className="px-8 py-8">
        <button onClick={() => router.back()} className="text-gray-700 flex items-center gap-1">
          <ArrowBigLeft />
          Go Back
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 text-center ">Airthniti Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full shadow-lg ">
          <thead className="bg-gray-100">
            <tr className="bg-white/30 backdrop-blur-sm text-gray-700 border-b-1 border-gray-100 ">
              <th className="p-3 ">Rank</th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="p-3 cursor-pointer select-none hover:bg-gray-200 transition-colors"
                >
                  {col.label}
                  <SortIcon column={col.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedLeaderboard.length > 0 ? (
              sortedLeaderboard.map((row, i) => (
                <tr
                  key={row.id || i}
                  className={`bg-white/10 backdrop-blur-sm text-gray-800 text-sm text-center`}
                >
                  <td className="p-3  font-bold">#{i + 1}</td>
                  <td className="p-3 ">{row?.name || "Unknown"}</td>
                  <td className="p-3 ">{row.gdp?.toFixed(2) ?? "-"}</td>
                  <td className="p-3 ">{row.approval?.toFixed(2) ?? "-"}</td>
                  <td className="p-3 ">{row.sensex?.toFixed(2) ?? "-"}</td>
                  <td className="p-3 ">{row.year}</td>
                  <td className="p-3 ">{row.quarter}</td>
                  <td className="p-3   text-gray-500">
                    {row.updatedAt ? new Date(row.updatedAt).toLocaleString() : "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white/10 backdrop-blur-sm text-gray-100 text-sm text-center">
                <td className="p-3" colSpan={8}>
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