"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import { Filter, Download, X } from "lucide-react";
import * as XLSX from "xlsx";

export default function ClassOverview() {
  const { state } = useContext(GlobalContext);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  /* pagination */
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);

  /* filters */
  const [filters, setFilters] = useState({
    name: "",
    subject_name: "",
    type: "",
    batch: "",
    term: "",
  });

  const [openFilter, setOpenFilter] = useState(false);

  /* ---------------- FETCH DATA ---------------- */
  const fetchData = async () => {
    setLoading(true);

    const params = new URLSearchParams({
      page,
      page_size: pageSize,
      ...filters,
    });

    try {
      const res = await authFetch(`resit-viewset?${params.toString()}`);
      const json = await res.json();
      setData(json.data || []);
      setTotal(json.count || 0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, filters, state.user_id]);

  const totalPages = Math.ceil(total / pageSize);

  /* ---------------- EXPORT EXCEL ---------------- */
  const exportExcel = () => {
    const sheetData = data.map((d) => ({
      Student: d.student,
      Subject: d.subjects,
      Type: d.type,
      Batch: d.batch,
      Term: d.term,
      Course: d.course,
      Viva: d.criteria_first ? "Completed" : "Not Completed",
      WriteUp: d.criteria_second ? "Completed" : "Not Completed",
    }));

    const ws = XLSX.utils.json_to_sheet(sheetData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Resit Data");
    XLSX.writeFile(wb, "resit_data.xlsx");
  };

  return (
    <section className="pt-12 px-4 sm:px-16 min-h-screen relative">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Resit Details</h1>
          <p className="text-sm text-gray-500">
            Check resit progress of students
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOpenFilter(true)}
            className="flex items-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-md"
          >
            <Filter size={16} /> Filter
          </button>

          <button
            onClick={exportExcel}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md"
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      {/* TABLE */}
      {loading ? (
        <FullWidthLoader />
      ) : (
        <div className="overflow-x-auto shadow rounded-lg">
          <table className="w-full text-center text-sm">
            <thead className="bg-red-50 text-red-700">
              <tr>
                <th className="p-3">Student</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Type</th>
                <th className="p-3">Batch</th>
                <th className="p-3">Term</th>
                <th className="p-3">Course</th>
                <th className="p-3">Viva</th>
                <th className="p-3">WriteUp</th>
              </tr>
            </thead>
            <tbody>
              {data.length ? (
                data.map((d, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-3">{d.student}</td>
                    <td className="p-3">{d.subjects}</td>
                    <td className="p-3">{d.type}</td>
                    <td className="p-3">{d.batch}</td>
                    <td className="p-3">{d.term}</td>
                    <td className="p-3">{d.course}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${d.criteria_first ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {d.criteria_first ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs ${d.criteria_second ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {d.criteria_second ? "Completed" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-4">No Data Found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

      {/* 🔹 WHATSAPP-STYLE FILTER POPUP */}
      {openFilter && (
  <>
    {/* BACKDROP */}
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={() => setOpenFilter(false)}
    />

    {/* SIDEBAR */}
    <div className="
      fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-xl animate-[slideInLeft_0.3s_ease-out]
    ">
      {/* HEADER */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Apply Filters</h2>
        <X
          onClick={() => setOpenFilter(false)}
          className="cursor-pointer"
        />
      </div>

      {/* FILTER BODY */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
        {["name", "subject_name", "type", "batch", "term"].map((f) => (
          <input
            key={f}
            placeholder={f.replace("_", " ").toUpperCase()}
            value={filters[f]}
            onChange={(e) =>
              setFilters({ ...filters, [f]: e.target.value })
            }
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        ))}
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t flex gap-3">
        <button
          onClick={() => {
            setFilters({
              name: "",
              subject_name: "",
              type: "",
              batch: "",
              term: "",
            });
            setPage(1);
          }}
          className="w-1/2 border rounded-md py-2"
        >
          Clear
        </button>

        <button
          onClick={() => {
            setPage(1);
            setOpenFilter(false);
          }}
          className="w-1/2 bg-violet-600 text-white rounded-md py-2"
        >
          Apply
        </button>
      </div>
    </div>
  </>
)}

    </section>
  );
}
