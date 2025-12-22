"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BulkProjectModal({ onClose, facultyId }) {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const [form, setForm] = useState({
    project_name: "",
    project_date: "",
    project_days: "",
    project_description: "",
    taxila_currency: "",
    faculty_id: "",
  });

  // Fetch students
  useEffect(() => {
    authFetch("student-list")
      .then(res => res.json())
      .then(data => {
        setStudents(data.data);
        setFiltered(data.data);
      });
  }, []);

  // Filters
  useEffect(() => {
    let result = students.filter(s =>
      `${s.first_name} ${s.last_name}`.toLowerCase().includes(searchName.toLowerCase()) &&
      s.user.email.toLowerCase().includes(searchEmail.toLowerCase())
    );
    setFiltered(result);
  }, [searchName, searchEmail, students]);

  const toggleStudent = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

const handleSubmit = async () => {
  if (selectedIds.length === 0) {
    toast.error("Select at least one student");
    return;
  }

  const payload = {
    faculty_id: facultyId,
    student_ids: selectedIds,
    project_name: form.project_name,
    project_date: form.project_date,
    project_days: Number(form.project_days),
    project_description: form.project_description,
    taxila_currency: Number(form.taxila_currency),
  };

  const res = await authFetch("taxila-currency-bulk-project-create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    toast.success("Project Created Successfully");
    onClose();
  } else {
    toast.error("Something went wrong");
  }
};


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[95%] max-w-5xl rounded p-6 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-semibold">Create Bulk Project</h2>
          <button onClick={onClose} className="text-red-500">✕</button>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4 mb-6">

  <input
    type="text"
    placeholder="Project Name"
    className="border p-2 rounded"
    value={form.project_name}
    onChange={(e) =>
      setForm({ ...form, project_name: e.target.value })
    }
  />

  <input
    type="date"
    placeholder="Project Date"
    className="border p-2 rounded"
    value={form.project_date}
    onChange={(e) =>
      setForm({ ...form, project_date: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Project Days"
    className="border p-2 rounded"
    value={form.project_days}
    onChange={(e) =>
      setForm({ ...form, project_days: e.target.value })
    }
  />

  <input
    type="number"
    placeholder="Taxila Currency"
    className="border p-2 rounded"
    value={form.taxila_currency}
    onChange={(e) =>
      setForm({ ...form, taxila_currency: e.target.value })
    }
  />

  <textarea
    placeholder="Project Description"
    className="border p-2 rounded col-span-2"
    rows={3}
    value={form.project_description}
    onChange={(e) =>
      setForm({ ...form, project_description: e.target.value })
    }
  />

</div>

        {/* Filters */}
        <div className="flex gap-3 mb-3">
          <input
            placeholder="Filter by name"
            className="border p-2 rounded w-1/2"
            onChange={e => setSearchName(e.target.value)}
          />
          <input
            placeholder="Filter by email"
            className="border p-2 rounded w-1/2"
            onChange={e => setSearchEmail(e.target.value)}
          />
        </div>

        {/* Student Table */}
        <div className="border rounded overflow-auto max-h-64">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2"></th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Batch</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(s.id)}
                      onChange={() => toggleStudent(s.id)}
                    />
                  </td>
                  <td className="p-2">
                    {s.first_name} {s.last_name}
                  </td>
                  <td className="p-2">{s.user.email}</td>
                  <td className="p-2">{s.batch?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Submit ({selectedIds.length})
          </button>
        </div>
      </div>
    </div>
  );
}
