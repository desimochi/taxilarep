"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function EditTaxilaCurrencyModal({ project, onClose, onSuccess }) {
  const [form, setForm] = useState({
    project_name: project.project_name || "",
    project_date: project.project_date || "",
    project_days: project.project_days || "",
    project_description: project.project_description || "",
    project_status: project.project_status || "",
    project_work_description: project.project_work_description || "",
  });

  const handleUpdate = async () => {
    const payload = {
      student: project.student.id,
      project_name: form.project_name,
      project_date: form.project_date,
      project_days: Number(form.project_days),
      project_description: form.project_description,
      project_status: form.project_status,
      project_work_description: form.project_work_description,
    };

    const res = await authFetch(
      `taxila-currency-viewset/${project.id}/`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      toast.success("Project updated successfully");
      onSuccess();
      onClose();
    } else {
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[500px] rounded p-6">

        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Edit Project</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Project Name"
            value={form.project_name}
            onChange={(e) =>
              setForm({ ...form, project_name: e.target.value })
            }
          />

          <input
            type="date"
            className="border p-2 w-full rounded"
            value={form.project_date}
            onChange={(e) =>
              setForm({ ...form, project_date: e.target.value })
            }
          />

          <input
            type="number"
            className="border p-2 w-full rounded"
            placeholder="Project Days"
            value={form.project_days}
            onChange={(e) =>
              setForm({ ...form, project_days: e.target.value })
            }
          />

          <select
            className="border p-2 w-full rounded"
            value={form.project_status}
            onChange={(e) =>
              setForm({ ...form, project_status: e.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>

          <textarea
            className="border p-2 w-full rounded"
            placeholder="Project Description"
            value={form.project_description}
            onChange={(e) =>
              setForm({ ...form, project_description: e.target.value })
            }
          />

          <textarea
            className="border p-2 w-full rounded"
            placeholder="Project Work Description"
            value={form.project_work_description}
            onChange={(e) =>
              setForm({
                ...form,
                project_work_description: e.target.value,
              })
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
