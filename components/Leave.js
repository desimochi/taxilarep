"use client";
import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { Pencil, Filter } from "lucide-react";
import toast from "react-hot-toast";
import BackButton from "@/components/ui/Backbutton";

export default function LeaveStatusPage() {
  /* ---------------- DATA ---------------- */
  const [leaves, setLeaves] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* ---------------- FILTERS ---------------- */
  const [reasonType, setReasonType] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    email: "",
    batch: "",
    start_date: "",
    end_date: "",
  });

  // ✅ Debounced filters
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  /* ---------------- EDIT POPUP ---------------- */
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    status: "",
    status_description: "",
  });

  /* ---------------- DATE FORMAT ---------------- */
  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")} ${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  /* ---------------- DEBOUNCE EFFECT ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500); // ⏱ debounce delay

    return () => clearTimeout(timer);
  }, [filters]);

  /* ---------------- FETCH LEAVES ---------------- */
  const fetchLeaves = async (pageNo = 1) => {
    try {
      const params = new URLSearchParams({
        page: pageNo,
        reason_type: reasonType || "",
        ...debouncedFilters,
      });

      const res = await authFetch(
        `student-leave-viewset?${params.toString()}`
      );
      const json = await res.json();

      setLeaves(json.data || []);

      const totalRecords = json.extra?.count || 1;
      const pageSize = json.extra?.page_size || 10;

      setTotalPages(Math.ceil(totalRecords / pageSize));
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    fetchLeaves(page);
  }, [page]);

  useEffect(() => {
    setPage(1);
    fetchLeaves(1);
  }, [reasonType, debouncedFilters]);

  /* ---------------- EDIT ---------------- */
  const handleEdit = (item) => {
    setSelectedId(item.id);
    setForm({
      status: item.status || "",
      status_description: item.status_description || "",
    });
    setOpen(true);
  };

  /* ---------------- SUBMIT STATUS ---------------- */
  const submitStatus = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authFetch(
        `student-leave-viewset/${selectedId}/status`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        toast.success("Leave status updated!");
        setOpen(false);
        fetchLeaves(page);
      } else {
        toast.error("Update failed.");
      }
    } catch {
      toast.error("Update failed.");
    }

    setLoading(false);
  };

  return (
    <div className="pt-12">
      <BackButton />

      <div className="pt-4 px-12">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Leave Status Management</h1>
            <p className="text-gray-600 text-sm">
              See the leave request of all the students and approve them
            </p>
          </div>

          <button
            onClick={() => setOpenFilter(true)}
            className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded text-sm"
          >
            <Filter size={14} /> Filters
          </button>
        </div>

        {/* REASON FILTER */}
        <div className="flex items-center gap-4 mt-6">
          <label className="text-sm font-medium">Filter by Reason:</label>
          <select
            value={reasonType}
            onChange={(e) => setReasonType(e.target.value)}
            className="border rounded px-3 py-2 text-sm"
          >
            <option value="">All</option>
            <option value="Placement">Placement</option>
            <option value="Examination">Examination</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto shadow border rounded-lg mt-8">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-200 text-xs uppercase">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Batch</th>
                <th className="px-4 py-3">Start</th>
                <th className="px-4 py-3">End</th>
                <th className="px-4 py-3">Reason Type</th>
                <th className="px-4 py-3">Reason</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {leaves.length === 0 && (
                <tr>
                  <td colSpan="10" className="text-center py-4 text-gray-500">
                    No leaves found.
                  </td>
                </tr>
              )}

              {leaves.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">
                    {item.student?.first_name} {item.student?.last_name}
                  </td>
                  <td className="px-4 py-3">
                    {item.student?.user?.email}
                  </td>
                  <td className="px-4 py-3">
                    {item.student?.batch?.name}
                  </td>
                  <td className="px-4 py-3">
                    {formatDateTime(item.start_date)}
                  </td>
                  <td className="px-4 py-3">
                    {formatDateTime(item.end_date)}
                  </td>
                  <td className="px-4 py-3">{item.reason_type}</td>
                  <td className="px-4 py-3">{item.student_reason}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        item.status === "Approved"
                          ? "bg-green-600"
                          : item.status === "Rejected"
                          ? "bg-red-600"
                          : "bg-yellow-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 flex items-center gap-2"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            className={`px-4 py-2 rounded ${
              page <= 1 ? "bg-gray-300" : "bg-gray-700 text-white"
            }`}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} / {totalPages}
          </span>

          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className={`px-4 py-2 rounded ${
              page >= totalPages
                ? "bg-gray-300"
                : "bg-gray-700 text-white"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {/* LEFT FILTER SIDEBAR */}
      {openFilter && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpenFilter(false)}
          />

          <div className="fixed top-0 right-0 h-full w-[360px] bg-white z-50 shadow-xl flex flex-col">
            <div className="p-4 border-b font-semibold text-lg">
              Filter Leaves
            </div>

            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
              <input
                placeholder="Student Name"
                value={filters.name}
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <input
                placeholder="Email"
                value={filters.email}
                onChange={(e) =>
                  setFilters({ ...filters, email: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <input
                placeholder="Batch"
                value={filters.batch}
                onChange={(e) =>
                  setFilters({ ...filters, batch: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                value={filters.start_date}
                onChange={(e) =>
                  setFilters({ ...filters, start_date: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                value={filters.end_date}
                onChange={(e) =>
                  setFilters({ ...filters, end_date: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="p-4 border-t flex gap-3">
              <button
                onClick={() => {
                  setFilters({
                    name: "",
                    email: "",
                    batch: "",
                    start_date: "",
                    end_date: "",
                  });
                  setPage(1);
                }}
                className="w-1/2 border rounded py-2"
              >
                Clear
              </button>

              <button
                onClick={() => {
                  setPage(1);
                  setOpenFilter(false);
                }}
                className="w-1/2 bg-gray-800 text-white rounded py-2"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}

      {/* EDIT POPUP */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              Edit Leave Status
            </h2>

            <form onSubmit={submitStatus} className="space-y-4">
              <select
                className="w-full p-2 border rounded"
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value })
                }
                required
              >
                <option value="">Select</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>

              <textarea
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Status description"
                value={form.status_description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    status_description: e.target.value,
                  })
                }
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {loading ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
