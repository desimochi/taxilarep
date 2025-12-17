"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function CustomFeeManager() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const [form, setForm] = useState({
    description: "",
    amount: "",
    is_active: true,
  });

  // ---------------- FETCH LIST ----------------
  const fetchFees = async () => {
    try {
      const res = await authFetch("custom-fee-viewset");
      const json = await res.json();
      setFees(json.data || []);
    } catch (err) {
      toast.error("Failed to load custom fees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  // ---------------- OPEN EDIT ----------------
  const openEditModal = (fee) => {
    setSelectedFee(fee);
    setForm({
      description: fee.description,
      amount: fee.amount,
      is_active: fee.is_active,
    });
    setOpenEdit(true);
  };

  // ---------------- UPDATE ----------------
 const handleUpdate = async () => {
  try {
    const res = await authFetch(
      `custom-fee-viewset/${selectedFee.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: selectedFee.student.id,   // ✅ student id
          fee_type: selectedFee.fee_type.id, // ✅ fee type id
          description: form.description,
          amount: Number(form.amount),
            is_active: form.is_active,
        }),
      }
    );

    if (!res.ok) throw new Error();

    toast.success("Fee updated successfully");
    setOpenEdit(false);
    fetchFees();
  } catch {
    toast.error("Failed to update fee");
  }
};


  // ---------------- DELETE ----------------
  const handleDelete = async (fee) => {
  if (!confirm("Are you sure you want to delete this fee?")) return;

  try {
    const res = await authFetch(
      `custom-fee-viewset/${fee.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student: fee.student.id,
          fee_type: fee.fee_type.id,
          description: fee.description,
          amount: fee.amount,
          is_delete: true, // ✅ SOFT DELETE
        }),
      }
    );

    if (!res.ok) throw new Error();

    toast.success("Fee deleted successfully");

    // Remove from UI
    setFees((prev) => prev.filter((f) => f.id !== fee.id));

  } catch {
    toast.error("Failed to delete fee");
  }
};


  if (loading) {
    return <p className="p-6 text-gray-500">Loading fees...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <Toaster position="top-right" />

      <h2 className="text-xl font-bold mb-4">Custom Fees</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Student</th>
              <th className="border p-2">Enrollment</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Batch</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Fee Type</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Paid</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {fees.filter((fee) => !fee.is_delete).map((fee) => (
              <tr key={fee.id} className="hover:bg-gray-50">
                <td className="border p-2 font-medium">
                  {fee.student.first_name} {fee.student.last_name}
                </td>
                <td className="border p-2">
                  {fee.student.enrollment_number}
                </td>
                <td className="border p-2">
                  {fee.student.user?.email}
                </td>
                <td className="border p-2">
                  {fee.student.batch?.name}
                </td>
                <td className="border p-2">
                  {fee.student.course?.name}
                </td>
                <td className="border p-2 font-semibold">
                  {fee.fee_type?.name}
                </td>
                <td className="border p-2 font-semibold">
                  ₹{fee.amount}
                </td>
                <td className="border p-2">
                  {fee.is_paid ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      Unpaid
                    </span>
                  )}
                </td>
                <td className="border p-2">
                  {fee.is_active ? (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      Active
                    </span>
                  ) : (
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => openEditModal(fee)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(fee)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- EDIT MODAL ---------------- */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="font-bold mb-4">Edit Custom Fee</h3>

            <textarea
              className="w-full border p-2 rounded mb-3"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <input
              type="number"
              className="w-full border p-2 rounded mb-3"
              placeholder="Amount"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: e.target.value })
              }
            />

            <select
              className="w-full border p-2 rounded mb-4"
              value={form.is_active}
              onChange={(e) =>
                setForm({
                  ...form,
                  is_active: e.target.value === "true",
                })
              }
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-red-700 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
