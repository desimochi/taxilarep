"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function EditVideoAssignment() {
  const { id } = useParams(); // ✅ id from route params
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [formData, setFormData] = useState({
    mapping_subject: "",
    lecturer_name: "",
    lecture_number: "",
    video_link: "",
    assignment_component: "",
    assignment_description: "",
    is_active: "true",
  });

  // ✅ Fetch existing video assignment data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authFetch(`epgdm-video-assignment-viewset/${id}`);
        if (!res.ok) throw new Error("Failed to fetch assignment data");
        const data = await res.json();

        const d = data.data;
        setFormData({
          mapping_subject: d.mapping_subject || "",
          lecturer_name: d.lecturer_name || "",
          lecture_number: d.lecturer_number || "",
          video_link: d.video_link || "",
          assignment_component: d.assignment_component || "",
          assignment_description: d.assignment_description || "",
          is_active: d.is_active ? "true" : "false",
        });
      } catch (error) {
        setMessage({ type: "error", text: error.message });
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle submit (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const payload = {
        mapping_subject: parseInt(formData.mapping_subject),
        lecturer_name: formData.lecturer_name,
        lecturer_number: parseInt(formData.lecture_number),
        video_link: formData.video_link,
        assignment_component: formData.assignment_component || null,
        assignment_description: formData.assignment_description,
        is_active: formData.is_active === "true",
      };

      const res = await authFetch(`epgdm-video-assignment-viewset/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to update assignment");
      }

      setMessage({
        type: "success",
        text: "Video assignment updated successfully!",
      });
      router.push(`/epgdm/subjects/${formData.mapping_subject}}`);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Error updating assignment.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
    );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto border rounded-xl bg-white p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Edit Video Assignment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Lecturer Name
            </label>
            <input
              type="text"
              name="lecturer_name"
              value={formData.lecturer_name}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Lecture Number
            </label>
            <input
              type="number"
              name="lecture_number"
              value={formData.lecture_number}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Video Link
            </label>
            <input
              type="url"
              name="video_link"
              value={formData.video_link}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Assignment Description
            </label>
            <textarea
              name="assignment_description"
              value={formData.assignment_description}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg resize-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-gray-700">
              Status
            </label>
            <select
              name="is_active"
              value={formData.is_active}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-lg bg-white"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-950 text-white py-3 rounded-lg font-semibold hover:bg-zinc-900 flex justify-center items-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Updating...
              </>
            ) : (
              "Update Assignment"
            )}
          </button>
        </form>

        {message.text && (
          <div
            className={`mt-4 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}
          >
            <div className="flex items-center">
              {message.type === "success" ? (
                <CheckCircle className="mr-2" />
              ) : (
                <XCircle className="mr-2" />
              )}
              {message.text}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
