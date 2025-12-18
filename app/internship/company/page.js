"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CompanyPage() {
  const [companies, setCompanies] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    code: "",
    description: "",
  });

  // ---------- FETCH ALL COMPANIES ----------
  const fetchCompanies = async () => {
    const res = await authFetch(`company-viewset`);
    const data = await res.json();
    setCompanies(data.data || []);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // ---------- OPEN ADD ----------
  const openAdd = () => {
    setEditingId(null);
    setForm({ name: "", code: "", description: "" });
    setOpen(true);
  };

  // ---------- OPEN EDIT ----------
  const openEdit = (company) => {
    setEditingId(company.id);
    setForm({
      name: company.name,
      code: company.code,
      description: company.description,
    });
    setOpen(true);
  };

  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editingId
      ? `company-viewset/${editingId}`
      : `company-viewset`;

    const method = editingId ? "PUT" : "POST";

    await authFetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setLoading(false);
    setOpen(false);
    toast.success(`Company ${editingId ? "updated" : "added"} successfully`);
    fetchCompanies();
  };

  // ---------- DELETE ----------
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    await authFetch(`company-viewset/${id}`, {
      method: "DELETE",
    });
toast.success("Company deleted successfully");
    fetchCompanies();
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Companies Management for Internship</h1>
        <button
          onClick={openAdd}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          + Add Company
        </button>
      </div>

      {/* LIST */}
      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Code</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.code}</td>
              <td className="border p-2">{c.description}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => openEdit(c)}
                  className="text-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[400px] p-6 rounded">
            <h2 className="text-lg font-semibold mb-4">
              {editingId ? "Edit Company" : "Add Company"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                name="name"
                placeholder="Company Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <input
                name="code"
                placeholder="Company Code"
                value={form.code}
                onChange={(e) =>
                  setForm({ ...form, code: e.target.value })
                }
                className="w-full border p-2 rounded"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border p-2 rounded"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >
                  {loading ? "Saving..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
