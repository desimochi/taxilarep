"use client";
import { Loader, Save } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";

export default function ResueForm() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const method = "POST";

  // ✅ Extract search params
  const batch = searchParams.get("batch") || "";
  const term = searchParams.get("term") || "";
  const course = searchParams.get("course")?.split(",") || [];
  const type = searchParams.get("type") || "";
  const enrollment_number = searchParams.get("enrollment_number") || "";
  const term_period = searchParams.get("term_period") || "";
  const exam_period = searchParams.get("exam_period") || "";

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!batch || !course.length) {
      setError("Missing required parameters in URL.");
      return;
    }

    const payload = { batch, term, course, type };
    const url = `student-result-save-according-related-marks?batch=${batch}&term=${term}&type=${type}&course=${course.join(",")}`;

    const options = {
      method,
      headers: { "Content-Type": "application/json" },
      ...(method !== "GET" && method !== "DELETE" ? { body: JSON.stringify(payload) } : {}),
    };

    try {
      setLoading(true);
      const response = await authFetch(url, options);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to save result.");

      setMessage(data.message || "Submitted successfully");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push("/exam-components/result");
      }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="mx-auto border border-gray-300 py-6 px-6 max-w-xl shadow-lg rounded-md"
      onSubmit={handleSubmit}
    >
      {showToast && <Toast message={message} />}
      {error && <Toast message={error} type="error" />}

      <h3 className="text-center text-red-800 text-xl font-bold">
        Confirm Result Declaration
      </h3>
      <hr className="border border-b-2 mt-3 mb-4" />

      <div className="space-y-3">
        <div>
          <label className="font-bold">Batch</label>
          <input type="text" value={batch} readOnly className="border border-gray-300 p-2 w-full bg-gray-100" />
        </div>

        {term && (
          <div>
            <label className="font-bold">Term</label>
            <input type="text" value={term} readOnly className="border border-gray-300 p-2 w-full bg-gray-100" />
          </div>
        )}

        {enrollment_number && (
          <div>
            <label className="font-bold">Enrollment No.</label>
            <input type="text" value={enrollment_number} readOnly className="border border-gray-300 p-2 w-full bg-gray-100" />
          </div>
        )}

        <div>
          <label className="font-bold">Course(s)</label>
          <input type="text" value={course.join(", ")} readOnly className="border border-gray-300 p-2 w-full bg-gray-100" />
        </div>

        {term_period && (
          <div>
            <label className="font-bold">Term Period</label>
            <input type="text" value={term_period} readOnly className="border border-gray-300 p-2 w-full bg-gray-100" />
          </div>
        )}

        {exam_period && (
          <div>
            <label className="font-bold">Result For</label>
            <input type="text" value={exam_period} readOnly className="border border-gray-300 p-2 w-full bg-gray-100" />
          </div>
        )}

        {type && (
          <div>
            <label className="font-bold">Exam Type</label>
            <input type="text" value={type} readOnly className="border border-gray-300 p-2 w-full bg-gray-100" />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 mb-2 bg-red-800 flex items-center justify-center gap-1 text-white px-12 py-2 rounded-sm shadow-sm hover:shadow-xl transition-shadow"
      >
        {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {loading ? "Submitting..." : "Confirm"}
      </button>
    </form>
  );
}
