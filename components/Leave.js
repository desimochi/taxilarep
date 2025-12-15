"use client";
import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import BackButton from "@/components/ui/Backbutton";

export default function LeaveStatusPage() {
  const [leaves, setLeaves] = useState([]);
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
const [reasonType, setReasonType] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    status: "",
    status_description: "",
  });

  const formatDateTime = (dateStr) => {
    if (!dateStr) return "";

    const d = new Date(dateStr);
    const h = String(d.getHours()).padStart(2, "0");
    const m = String(d.getMinutes()).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const mon = String(d.getMonth() + 1).padStart(2, "0");
    const yr = d.getFullYear();

    return `${h}:${m} ${day}-${mon}-${yr}`;
  };

  // Fetch leaves with pagination
  const fetchLeaves = async (pageNo = 1, reason = reasonType) => {
  try {
    let url = `student-leave-viewset?page=${pageNo}`;

    if (reason) {
      url += `&reason_type=${reason}`;
    }

    const res = await authFetch(url);
    const json = await res.json();

    setLeaves(json.data || []);

    const totalRecords = json.extra?.count || 1;
    const pageSize = json.extra?.page_size || 10;

    setTotalPages(Math.ceil(totalRecords / pageSize));
  } catch (error) {
    console.error("Fetch error", error);
  }
};

  useEffect(() => {
    fetchLeaves(page);
  }, [page]);
useEffect(() => {
  setPage(1);
  fetchLeaves(1, reasonType);
}, [reasonType]);
  // Open popup
  const handleEdit = (item) => {
    setSelectedId(item.id);
    setForm({
      status: item.status || "",
      status_description: item.status_description || "",
    });
    setOpen(true);
  };

  // Submit status update
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
      }
    } catch (error) {
      toast.error("Update failed.");
    }

    setLoading(false);
  };

  return (
    <div className="pt-12">
        <BackButton />
    <div className=" pt-4 px-12">
      <h1 className="text-2xl font-bold">Leave Status Management</h1>
      <p className="text-gray-600 text-sm">See the leave request of all the students and approved them</p>
<div className="flex items-center gap-4 mt-6">
  <label className="text-sm font-medium text-gray-700">
    Filter by Reason:
  </label>

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
          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">S.no.</th>
              <th className="px-4 py-3">Student Name</th>
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
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No leaves found.
                </td>
              </tr>
            )}

            {leaves.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index+1}</td>

                {/* Student Name */}
                <td className="px-4 py-3">
                  {item.student?.first_name} {item.student?.last_name}
                </td>

                {/* Email */}
                <td className="px-4 py-3">{item.student?.user?.email}</td>

                {/* Batch */}
                <td className="px-4 py-3">{item.student?.batch?.name}</td>

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
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
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
            page >= totalPages ? "bg-gray-300" : "bg-gray-700 text-white"
          }`}
        >
          Next
        </button>
      </div>

      {/* EDIT POPUP */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-4">
              Edit Leave Status
            </h2>

            <form onSubmit={submitStatus} className="space-y-4">
              {/* Status */}
              <div>
                <label className="block text-sm font-medium">Status</label>
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
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium">
                  Status Description
                </label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  value={form.status_description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status_description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {loading ? "Saving..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
