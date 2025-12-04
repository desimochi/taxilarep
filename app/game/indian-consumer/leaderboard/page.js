"use client";

import BackButton from "@/components/ui/Backbutton";
import { useEffect, useMemo, useState } from "react";

export default function SalesLeaderboardPage() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [productFilter, setProductFilter] = useState("");
  const [minScore, setMinScore] = useState(0);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch("/api/game/indiac/leaderboard");
        const json = await res.json();

        if (!json.success) {
          throw new Error(json.error || "Failed to load leaderboard");
        }

        setData(json.leaderboard || []);
        setFiltered(json.leaderboard || []);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading leaderboard.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Unique product list
  const uniqueProducts = useMemo(() => {
    const set = new Set(data.map((d) => d.product).filter(Boolean));
    return Array.from(set);
  }, [data]);

  // Apply filters
  function applyFilters() {
    let result = [...data];

    if (productFilter) {
      result = result.filter((item) => item.product === productFilter);
    }

    if (minScore) {
      result = result.filter(
        (item) => (item.cumulativeScore || 0) >= Number(minScore)
      );
    }

    setFiltered(result);
    setPage(1);
  }

  // Reset filters
  function resetFilters() {
    setProductFilter("");
    setMinScore(0);
    setFiltered(data);
    setPage(1);
  }

  // Pagination calculations
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const start = (page - 1) * pageSize;
  const paginatedData = filtered.slice(start, start + pageSize);

  // Summary stats
  const summary = useMemo(() => {
    if (!filtered.length) return { players: 0, topScore: 0, totalProfit: 0 };

    const players = filtered.length;
    const topScore = Math.max(...filtered.map((x) => x.cumulativeScore || 0));
    const totalProfit = filtered.reduce(
      (sum, x) => sum + (x.totalNetProfit || 0),
      0
    );

    return { players, topScore, totalProfit };
  }, [filtered]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-10 text-slate-50">
         <BackButton />
      {/* Title */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
       
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
 Indian Consumer Behavior Simulator
          </h1>
          <p className="text-slate-300 mt-1 text-sm md:text-base">
            Track performance by <span className="font-semibold">cumulative score</span>,
            <span className="font-semibold"> net profit</span>, and{" "}
            <span className="font-semibold">products sold</span>.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 shadow-lg backdrop-blur">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Total Players
          </p>
          <p className="mt-2 text-2xl font-bold">{summary.players}</p>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 shadow-lg backdrop-blur">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Top Score
          </p>
          <p className="mt-2 text-2xl font-bold">{summary.topScore}</p>
        </div>
        <div className="rounded-2xl bg-white/5 border border-white/10 p-4 shadow-lg backdrop-blur">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            Total Net Profit
          </p>
          <p className="mt-2 text-2xl font-bold">
            ₹{summary.totalProfit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-6 rounded-2xl bg-white/5 border border-white/10 p-4 md:p-5 shadow-xl backdrop-blur">
        <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-3/4">
            {/* Product Filter */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                Product
              </label>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="rounded-xl bg-slate-900/60 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option value="">All Products</option>
                {uniqueProducts.map((p) => (
                  <option key={p} value={p}>
                    {p.replace(/_/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Score */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wide">
                Minimum Score ({minScore})
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
                className="w-full accent-emerald-400"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={applyFilters}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-sm font-semibold shadow-lg shadow-emerald-500/30 transition"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold border border-slate-600 transition"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center text-slate-300 py-16">
            Loading leaderboard...
          </div>
        ) : error ? (
          <div className="text-center text-red-400 py-16">{error}</div>
        ) : !filtered.length ? (
          <div className="text-center text-slate-300 py-16">
            No players found with current filters.
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-900/60 border-b border-white/10">
                    <tr className="text-slate-300">
                      <th className="px-4 py-3 text-left">Rank</th>
                      <th className="px-4 py-3 text-left">Player</th>
                      <th className="px-4 py-3 text-left">Product</th>
                      <th className="px-4 py-3 text-right">Score</th>
                      <th className="px-4 py-3 text-right">Net Profit</th>
                      <th className="px-4 py-3 text-right">Gross Sales</th>
                      <th className="px-4 py-3 text-right">Products Sold</th>
                      <th className="px-4 py-3 text-right">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => {
                      const rank = start + index + 1;

                      const rankStyles =
                        rank === 1
                          ? "bg-amber-400 text-slate-900"
                          : rank === 2
                          ? "bg-slate-300 text-slate-900"
                          : rank === 3
                          ? "bg-amber-700 text-slate-50"
                          : "bg-slate-700 text-slate-100";

                      return (
                        <tr
                          key={item.userId + item.gameId}
                          className="border-b border-white/5 hover:bg-slate-900/50 transition"
                        >
                          {/* Rank */}
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center justify-center min-w-[2.5rem] px-2 py-1 rounded-full text-xs font-bold ${rankStyles}`}
                            >
                              #{rank}
                            </span>
                          </td>

                          {/* Player */}
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-semibold text-slate-50">
                                {item.playerName}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                ID: {item.userId}
                              </span>
                            </div>
                          </td>

                          {/* Product */}
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full bg-slate-800 border border-slate-600 text-[11px] uppercase tracking-wide">
                              {item.product?.replace(/_/g, " ")}
                            </span>
                          </td>

                          {/* Score */}
                          <td className="px-4 py-3 text-right font-semibold text-emerald-300">
                            {item.cumulativeScore ?? 0}
                          </td>

                          {/* Net Profit */}
                          <td className="px-4 py-3 text-right">
                            ₹{(item.totalNetProfit || 0).toLocaleString()}
                          </td>

                          {/* Gross Sales */}
                          <td className="px-4 py-3 text-right">
                            ₹{(item.totalGrossSales || 0).toLocaleString()}
                          </td>

                          {/* Products Sold */}
                          <td className="px-4 py-3 text-right">
                            {item.productsSold || 0}
                          </td>

                          {/* Updated */}
                          <td className="px-4 py-3 text-right text-[11px] text-slate-400">
                            {item.updatedAt
                              ? new Date(item.updatedAt).toLocaleString()
                              : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-6">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 text-sm disabled:opacity-40"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-2 rounded-xl text-sm border ${
                    page === i + 1
                      ? "bg-emerald-500 border-emerald-400 text-slate-900 font-semibold"
                      : "bg-slate-800 border-slate-600"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 text-sm disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
