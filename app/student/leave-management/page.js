"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import BackButton from "@/components/ui/Backbutton";
import { PlusCircleIcon, Pencil, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(GlobalContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    student_reason: "",
    reason_type: "",
  });

  const formatForInput = (dt) => (dt ? dt.slice(0, 16) : "");
  const displayDate = (dt) =>
    dt ? new Date(dt).toLocaleString() : "Invalid Date";

  // Fetch leaves
  const fetchLeaves = async () => {
    try {
      const res = await authFetch(`leave-student-wise/${state.user_id}`);
      const data = await res.json();
      setLeaves(data.data || []);
    } catch (error) {
      console.error("Error loading leaves", error);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [state.user_id]);

  // Submit Leave
  const submitLeave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing
        ? `student-leave-viewset/${editId}`
        : `student-leave-viewset`;

      const method = isEditing ? "PUT" : "POST";

      const payload = {
        student: state.user_id,
        start_date: form.start_date,
        end_date: form.end_date,
        student_reason: form.student_reason,
        reason_type: form.reason_type,
      };

      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(isEditing ? "Leave updated!" : "Leave applied!");
        setOpen(false);
        setIsEditing(false);
        setEditId(null);
        setForm({ start_date: "", end_date: "", student_reason: "", reason_type: "" });
        fetchLeaves();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Failed to submit leave.");
    }

    setLoading(false);
  };

  // Edit
  const handleEdit = (item) => {
    if (item.status === "Approved")
      return toast.error("Approved leaves cannot be edited.");

    setForm({
      start_date: formatForInput(item.start_date),
      end_date: formatForInput(item.end_date),
      student_reason: item.student_reason,
      reason_type: item.reason_type,
    });

    setEditId(item.id);
    setIsEditing(true);
    setOpen(true);
  };

  // Delete
  const handleDelete = async (id, status) => {
    if (status === "Approved")
      return toast.error("Approved leaves cannot be deleted.");

    if (!confirm("Are you sure you want to delete this leave?")) return;

    try {
      const res = await authFetch(`student-leave-viewset/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Leave deleted.");
        fetchLeaves();
      } else {
        toast.error("Delete failed.");
      }
    } catch (error) {
      toast.error("Error deleting leave.");
    }
  };

  const minNow = new Date().toISOString().slice(0, 16);

  return (
    <div className="py-12">
      <BackButton />

      <div className="flex justify-between items-center mb-6 px-12 mt-4">
        <div>
          <h1 className="text-2xl font-bold">
            {state.name} Leaves Management
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            View, edit & delete your leaves
          </p>
        </div>

        <button
          onClick={() => {
            setIsEditing(false);
            setForm({ start_date: "", end_date: "", student_reason: "" });
            setOpen(true);
          }}
          className="bg-red-700 text-white flex items-center justify-center gap-2 px-8 py-2 rounded-sm hover:bg-red-800"
        >
          Apply Leave <PlusCircleIcon />
        </button>
      </div>

      {/* TABLE VIEW */}
      <div className="px-12 overflow-x-auto">
        {leaves.length === 0 ? (
          <p className="text-gray-500">No leaves applied yet.</p>
        ) : (
          <table className="w-full border-collapse border shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Start Date</th>
                <th className="border p-2 text-left">End Date</th>
                <th className="border p-2 text-left">Reason</th>
                <th className="border p-2 text-center">Status</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((item) => (
                <tr key={item.id} className="bg-white">
                  <td className="border p-2">{displayDate(item.start_date)}</td>
                  <td className="border p-2">{displayDate(item.end_date)}</td>
                  <td className="border p-2">{item.student_reason}</td>

                  <td className="border p-2 text-center">
                    <span
                      className={`px-3 py-1 rounded text-sm ${
                        item.status === "Approved"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="border p-2 text-center">
                    <div className="flex justify-center gap-4">
                      {/* EDIT BUTTON */}
                      <button
                        onClick={() => handleEdit(item)}
                        disabled={item.status === "Approved"}
                        className={`flex items-center gap-1 px-2 py-1 rounded ${
                          item.status === "Approved"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-blue-600 hover:text-blue-800"
                        }`}
                      >
                        <Pencil size={16} />
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDelete(item.id, item.status)}
                        disabled={item.status === "Approved"}
                        className={`flex items-center gap-1 px-2 py-1 rounded ${
                          item.status === "Approved"
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:text-red-800"
                        }`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* POPUP MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-xl font-semibold mb-2">
              {isEditing ? "Edit Leave" : "Apply For Leave"}
            </h2>
            <hr className="w-20 border-b-2 border-red-600 mb-4" />

            <form onSubmit={submitLeave} className="space-y-4">
              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded"
                  value={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, start_date: e.target.value })
                  }
                  required
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  className="w-full p-2 border rounded"
                  value={form.end_date}
                  min={form.start_date}
                  onChange={(e) =>
                    setForm({ ...form, end_date: e.target.value })
                  }
                  required
                />
              </div>
 <div>
                <label className="block text-sm font-medium">
                  Apply Reason
                </label>
               <select
                  className="w-full p-2 border rounded"
                  value={form.reason_type} 
                  onChange={(e) =>
                    setForm({ ...form, reason_type: e.target.value })
                  }
                  required
                >
                  <option value="" disabled>Select Reason</option>
                  <option value="Placement">Placement</option>
                  <option value="Examination">Examination</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {/* Reason */}
              <div>
                <label className="block text-sm font-medium">Reason</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows={3}
                  value={form.student_reason}
                  onChange={(e) =>
                    setForm({ ...form, student_reason: e.target.value })
                  }
                  required
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setIsEditing(false);
                  }}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  {loading ? "Saving..." : isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
