"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import BackButton from "@/components/ui/Backbutton";
import { DeleteIcon, EditIcon, UserRoundSearch } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/* ---------------- NAME NORMALIZER ---------------- */
function normalizeFeeName(value) {
  if (!value) return "";

  const cleaned = value.trim().toLowerCase();

  // Handle RESIT cases
  if (cleaned.startsWith("resit")) {
    const numberMatch = cleaned.match(/\d+/);
    const number = numberMatch ? numberMatch[0] : "";
    return `Resit${number ? " " + number : ""}`;
  }

  // Default: Title Case
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function FeeTypeManager() {
  const [fees, setFees] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [batches, setBatches] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    default_amount: "",
    is_interest_applied: false,
    interest_rate_percent: "",
    batch: "",
  });

  /* ---------------- FETCH DATA ---------------- */
  const fetchFees = async () => {
    try {
      const res = await authFetch("fee-type-viewset");
      const data = await res.json();
      setFees(data.data || []);
    } catch {
      toast.error("Failed to fetch fee types");
    }
  };

  const fetchBatch = async () => {
    try {
      const res = await authFetch("batch-viewset");
      const data = await res.json();
      setBatches(data.data || []);
    } catch {
      toast.error("Failed to fetch batches");
    }
  };

  useEffect(() => {
    fetchFees();
    fetchBatch();
  }, []);

  /* ---------------- HANDLE CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setForm({ ...form, name: normalizeFeeName(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  /* ---------------- OPEN MODALS ---------------- */
  const openCreate = () => {
    setEditId(null);
    setForm({
      name: "",
      description: "",
      default_amount: "",
      is_interest_applied: false,
      interest_rate_percent: "",
      batch: "",
    });
    setOpen(true);
  };

  const openEdit = (fee) => {
    setEditId(fee.id);
    setForm({
      name: normalizeFeeName(fee.name),
      description: fee.description,
      default_amount: fee.default_amount,
      is_interest_applied: fee.is_interest_applied,
      interest_rate_percent: fee.interest_rate_percent,
      batch: fee.batch,
    });
    setOpen(true);
  };

  /* ---------------- SUBMIT ---------------- */
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: normalizeFeeName(form.name),
          description: form.description,
          default_amount: Number(form.default_amount),
          is_interest_applied:
            form.is_interest_applied === true ||
            form.is_interest_applied === "true",
          interest_rate_percent:
            form.is_interest_applied === true ||
            form.is_interest_applied === "true"
              ? Number(form.interest_rate_percent)
              : 0,
          batch: form.batch,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success(
        `Fee type ${editId ? "updated" : "created"} successfully`
      );
      setOpen(false);
      fetchFees();
    } catch {
      toast.error("Error submitting fee type");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this fee type?")) return;

    try {
      const res = await authFetch(`fee-type-viewset/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();

      setFees((prev) => prev.filter((f) => f.id !== id));
      toast.success("Fee type deleted successfully");
    } catch {
      toast.error("Error deleting fee type");
    }
  };

  return (
    <div className="p-6">
      <BackButton />

      <div className="flex justify-between items-center mb-4 px-12">
        <h1 className="text-2xl font-bold">Fee Types</h1>
        <div className="flex gap-4">
          <button
            onClick={openCreate}
            className="px-8 py-2 bg-red-600 text-white rounded"
          >
            + Add Fee
          </button>
          <Link
            href="/accounts/custom-fee"
            className="px-8 py-2 flex gap-2 bg-zinc-950 text-white rounded"
          >
            <UserRoundSearch /> Custom Fees
          </Link>
        </div>
      </div>

      <hr className="mb-8" />

      {/* TABLE */}
      <div className="overflow-x-auto px-12">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Batch</th>
              <th className="border p-2">Interest</th>
              <th className="border p-2">Rate (%)</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((fee, i) => (
              <tr key={fee.id}>
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2 font-semibold">{fee.name}</td>
                <td className="border p-2">{fee.description}</td>
                <td className="border p-2">₹{fee.default_amount}</td>
                <td className="border p-2">{fee.batch?.name}</td>
                <td className="border p-2">
                  {fee.is_interest_applied ? "Yes" : "No"}
                </td>
                <td className="border p-2">
                  {fee.interest_rate_percent}
                </td>
                <td className="border p-2 flex gap-3">
                  <button
                    onClick={() => openEdit(fee)}
                    className="text-blue-600"
                  >
                    <EditIcon />
                  </button>
                  <button
                    onClick={() => handleDelete(fee.id)}
                    className="text-red-600"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
            {fees.length === 0 && (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
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
                placeholder="Fee Name (e.g. resit 1)"
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

              <select
                name="batch"
                value={form.batch}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Batch</option>
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              <select
                name="is_interest_applied"
                value={form.is_interest_applied}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value={false}>Interest Not Applied</option>
                <option value={true}>Interest Applied</option>
              </select>

              {String(form.is_interest_applied) === "true" && (
                <input
                  type="number"
                  name="interest_rate_percent"
                  placeholder="Interest Rate %"
                  value={form.interest_rate_percent}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              )}

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
