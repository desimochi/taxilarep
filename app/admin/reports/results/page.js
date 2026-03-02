"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import ResultTable from "./ResultTable";

export default function AttendanceFilter() {
  const [entities, setEntities] = useState(null);
  const [loading, setLoading] = useState(false);

  // Selected filters
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState("");
  const [term, setTerm] = useState("");
  const [specialization, setSpecialization] = useState("");

  const [result, setResult] = useState(null);

  /* ================= FETCH ENTITIES ================= */
  useEffect(() => {
    authFetch("all-entities")
      .then(res => res.json())
      .then(json => setEntities(json.data))
      .catch(err => console.error(err));
  }, []);

  /* ================= APPLY FILTER ================= */
  const applyFilter = async () => {
    if (!course || !batch || !term ) {
      alert("Please select all filters");
      return;
    }

    setLoading(true);

    const url = `student-result-status?course=${course}&batch=${batch}&term=${term}&type=${specialization}`;

    const res = await authFetch(url);
    const json = await res.json();

    setResult(json.data);
    setLoading(false);
  };

  if (!entities) return <p className="p-4">Loading filters…</p>;

  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-6">

      {/* ===== FILTERS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Course */}
        <select
          className="border rounded px-3 py-2"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {entities.courses.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* Batch */}
        <select
          className="border rounded px-3 py-2"
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        >
          <option value="">Select Batch</option>
          {entities.batches.map(b => (
            <option key={b.id} value={b.id}>{b.name}</option>
          ))}
        </select>

        {/* Term */}
        <select
          className="border rounded px-3 py-2"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        >
          <option value="">Select Term</option>
          {entities.terms.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        {/* Specialization */}
        <select
          className="border rounded px-3 py-2"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="main">Main</option>
          <option value="resit-1">Resit-1</option>
          <option value="resit-2">Resit-2</option>
        </select>
      </div>

      {/* ===== ACTION ===== */}
      <button
        onClick={applyFilter}
        disabled={loading}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Check Result"}
      </button>

      {/* ===== RESULT PREVIEW ===== */}
      {result && (
        <ResultTable data = {result} />
      )}
    </div>
  );
}
