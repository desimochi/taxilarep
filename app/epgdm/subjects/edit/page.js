"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";
import e from "cors";

export default function VideoAssignmentForm() {
  const searchParams = useSearchParams();
  const subId = searchParams.get("subId") || "1";
const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [additionalData, setAdditionalData] = useState([])
  const [formData, setFormData] = useState({
    mapping_subject: subId,
    lecturer_name: "",
    lecture_number: "",
    video_link: "",
    assignment_component: "",
    assignment_description: "",
    is_active: "true",
  });
  const [message, setMessage] = useState({ type: "", text: "" });
 useEffect(() => {
        if (subId) {
            const fetchAdditionalData = async () => {
                try {
                    // ✅ Keep loading state separate for second API call if needed
                    const response = await authFetch(`component-subject-wise/${subId}`)
                    if (!response.ok) throw new Error("Failed to fetch additional data")

                    const data = await response.json()
                    setAdditionalData(data.data || [])
                } catch (err) {
                    setError(err.message)
                }
            }

            fetchAdditionalData()
        }
    }, [subId]) 
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      mapping_subject: subId,
    }));
  }, [subId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "mapping_subject") {
          form.append(key, value);
        }
      });
const payload = {
     mapping_subject: formData.mapping_subject,
            lecturer_name: formData.lecturer_name,
            lecturer_number: parseInt(formData.lecture_number),
            video_link: formData.video_link,
            assignment_component: formData.assignment_component,
            assignment_description: formData.assignment_description,
            is_active: formData.is_active === "true",
}
      const res = await authFetch(
        `epgdm-video-assignment-viewset`,
        {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ...payload,
  }),
});

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to submit assignment");
      }

      setMessage({
        type: "success",
        text: "Video assignment submitted successfully!",
      });
      setFormData({
        mapping_subject: subId,
        lecturer_name: "",
        lecture_number: "",
        video_link: "",
        assignment_component: "",
        assignment_description: "",
        is_active: "true",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setMessage({
        type: "error",
        text: error.message || "Error submitting form. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { name: "lecturer_name", label: "Lecturer Name", type: "text" },
    { name: "lecture_number", label: "Lecture Number", type: "number" },
    { name: "video_link", label: "Video Link", type: "url" },
  ];

  return (
    <div className="min-h-screen  py-8 px-4 ">
      <div className="max-w-4xl mx-auto border rounded-lg">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className=" px-8 py-3">
            <h2 className="text-2xl font-bold text-zinc-950 text-center">
              Upload Lecture Video & Assignment
            </h2>
          </div>

          <div className="p-8 space-y-4">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-700">Mapping Subject ID</p>
                  <p className="text-xs text-gray-500 mt-1">Auto-selected from URL parameter</p>
                </div>
                <div className="bg-gray-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                  {formData.mapping_subject}
                </div>
              </div>
            </div>

            {formFields.map((field) => (
              <div key={field.name}>
                <div>
                <label className="block mb-2 font-semibold text-gray-700 text-sm">
                  {field.label}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={`Enter ${field.label.toLowerCase()}`}
                />
                </div>
              </div>
            ))}
 <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm">
                Assignment Component
              </label>
              <select
                name="assignment_component"
                value={formData.is_active}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                {additionalData.length > 0 ? (
                  additionalData.map((component) => (
                    <option key={component.id} value={component.id}>
                      {component.name}
                    </option>
                  ))
                ) : (
                  <option value="">No components available</option>
                )}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm">
                Assignment Description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <textarea
                name="assignment_description"
                value={formData.assignment_description}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Enter assignment description"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 text-sm">
                Status
              </label>
              <select
                name="is_active"
                value={formData.is_active}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-zinc-950 text-white py-3 px-6 rounded-lg font-semibold hover:bg-zinc-900 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Submitting...
                </>
              ) : (
                "Submit Assignment"
              )}
            </button>
          </div>

          {message.text && (
            <div className="px-8 pb-8">
              <div
                className={`flex items-center p-4 rounded-lg ${
                  message.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                ) : (
                  <XCircle className="mr-3 flex-shrink-0" size={20} />
                )}
                <p className="font-medium text-sm">{message.text}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}