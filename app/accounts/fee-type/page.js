"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import BackButton from "@/components/ui/Backbutton";
import { DeleteIcon, EditIcon, SettingsIcon, UserRoundSearch } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function FeeTypeManager() {
  const [fees, setFees] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    default_amount: "",
  });

  // ---------------- FETCH LIST ----------------
  const fetchFees = async () => {
    try {
      const res = await authFetch("fee-type-viewset");
      const data = await res.json();
      setFees(data.data);
    } catch (err) {
      console.error("Failed to fetch fee types", err);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  // ---------------- FORM HANDLERS ----------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreate = () => {
    setEditId(null);
    setForm({ name: "", description: "", default_amount: "" });
    setOpen(true);
  };

  const openEdit = (fee) => {
    setEditId(fee.id);
    setForm({
      name: fee.name,
      description: fee.description,
      default_amount: fee.default_amount,
    });
    setOpen(true);
  };

  // ---------------- SUBMIT (POST / PUT) ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editId
      ? `fee-type-viewset/${editId}`
      : "fee-type-viewset";

    const method = editId ? "PUT" : "POST";

    try {
      const res = await authFetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          description: form.description,
          default_amount: Number(form.default_amount),
        }),
      });

      if (!res.ok) throw new Error("Submit failed");

      setOpen(false);
      toast.success(`Fee type ${editId ? "updated" : "created"} successfully`);
      fetchFees();
    } catch (err) {
      console.error(err);
      toast.error("Error submitting fee type");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this fee type?")) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/fee-type-viewset/${id}/`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      setFees((prev) => prev.filter((f) => f.id !== id));
      toast.success("Fee type deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting fee type");
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <BackButton />
      <div className="flex justify-between items-center mb-4 px-12">
        <h1 className="text-2xl font-bold font-sans">Fee Types</h1>
        <div className="flex gap-4">
        <button
          onClick={openCreate}
          className="px-8 py-2 bg-red-600 text-white rounded"
        >
          + Add Fee
        </button>
          <Link
          href={'/accounts/custom-fee'}
          className="px-8 py-2 flex gap-2 bg-zinc-950 text-white rounded"
        >
          <UserRoundSearch/> Custom Fees
        </Link>
        </div>
      </div>
<hr className="border border-b-1 mb-8" />
      {/* TABLE */}
      <div className="overflow-x-auto px-12">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
                <th className="border p-2">S.no.</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, index) => (
              <tr key={fee.id}>
                <td className="border p-2">{index+1}</td>
                <td className="border p-2">{fee.name}</td>
                <td className="border p-2">{fee.description}</td>
                <td className="border p-2">₹{fee.default_amount}</td>
                <td className="border p-2 flex gap-3">
                  <button
                    onClick={() => openEdit(fee)}
                    className="text-blue-600 hover:underline"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(fee.id)}
                    className="text-red-600 hover:underline"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
            {fees.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No fee types found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Edit Fee Type" : "Create Fee Type"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Fee Name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />

              <input
                type="number"
                name="default_amount"
                placeholder="Amount"
                value={form.default_amount}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
              >
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Fee"
                  : "Create Fee"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
