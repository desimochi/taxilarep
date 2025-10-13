"use client";

import { useState, useEffect } from "react";
import { Search, Trophy, Award, Medal } from "lucide-react";
import { authFetch } from "../lib/fetchWithAuth";

export default function Page() {
  const [batches, setBatches] = useState([]);
  const [terms, setTerms] = useState([]);
  const [toppers, setToppers] = useState([]);
  const [batch, setBatch] = useState("");
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Fetch batch and term list
  useEffect(() => {
    async function fetchLists() {
      setLoading(true);
      setError("");
      try {
        const [batchRes, termRes] = await Promise.all([
          authFetch("batches-list"),
          authFetch("terms-list"),
        ]);

        if (!batchRes.ok || !termRes.ok) throw new Error("Failed to load lists");

        const batchData = await batchRes.json();
        const termData = await termRes.json();

        setBatches(batchData.data || []);
        setTerms(termData.data || []);
      } catch (err) {
        setError("Failed to load batch/term data");
      } finally {
        setLoading(false);
      }
    }

    fetchLists();
  }, []);

  // ✅ Fetch toppers for selected batch & term
  async function handleSearch() {
    if (!batch || !term) {
      setError("Please select both batch and term");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await authFetch(`batch-term-toper?batch=${batch}&term=${term}`);
      if (!res.ok) throw new Error("Failed to fetch toppers");

      const data = await res.json();
      setToppers(data.data || []);
    } catch (err) {
      setError("Failed to fetch topper list");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Rank icon logic
  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Award className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="font-bold text-lg">{rank}</span>;
    }
  };

  // ✅ Rank badge color
  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-100 border-yellow-400";
      case 2:
        return "bg-gray-100 border-gray-400";
      case 3:
        return "bg-amber-100 border-amber-600";
      default:
        return "bg-blue-50 border-blue-300";
    }
  };

  return (
    <div className="py-8 px-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">List of Toppers</h1>

      {/* 🔻 Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          {/* Batch Select */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Batch
            </label>
            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="border border-gray-300 shadow-sm rounded-md w-full p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Batch</option>
              {batches.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Term Select */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Term
            </label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="border border-gray-300 shadow-sm rounded-md w-full p-2.5 focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Term</option>
              {terms.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-red-700 hover:bg-red-800 disabled:bg-red-400 text-white px-8 py-2.5 rounded-md flex gap-2 items-center transition-colors shadow-sm"
          >
            <Search className="w-5 h-5" />
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>

      {/* 🔻 Toppers Table */}
      {toppers.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Enrollment Number
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    GPA
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Total Credits
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Credits × GP
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Result
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {toppers.map((student) => (
                  <tr
                    key={student.student_id}
                    className={`hover:bg-gray-50 transition-colors ${
                      student.rank <= 3
                        ? "bg-gradient-to-r from-yellow-50 to-white"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${getRankBadgeColor(
                          student.rank
                        )}`}
                      >
                        {getRankIcon(student.rank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {student.student_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.enrollment_number}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                        {Number(student.gpa).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.total_credit}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.total_credit_xgp}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {student.is_pass_status? <span className="bg-green-50 text-green-800 px-1 py-0.5">Pass</span> : <span className="bg-red-50 text-red-800 px-1 py-0.5">Fail</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🔻 No Results */}
      {!loading && toppers.length === 0 && !error && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">
            No toppers found for the selected batch and term.
          </p>
        </div>
      )}
    </div>
  );
}
