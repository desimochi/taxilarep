"use client";

import { useEffect, useState } from "react";
import FullWidthLoader from "./Loaader";
import Toast from "./Toast";
import { authFetch } from "@/app/lib/fetchWithAuth";
import toast from "react-hot-toast";

export default function AutoResitApply() {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const [batches, setBatches] = useState([]);
  const [terms, setTerms] = useState([]);

  const [form, setForm] = useState({
    batch_id: "",
    term_id: "",
    last_exam_type: "",
    exam_type: "",
    gap_days: 15,
  });

  /* ================= FETCH DROPDOWNS ================= */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [batchRes, termRes] = await Promise.all([
          authFetch("batches-list"),
          authFetch("terms-list"),
        ]);

        const batchData = await batchRes.json();
        const termData = await termRes.json();

        setBatches(batchData?.data || []);
        setTerms(termData?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!form.batch_id || !form.term_id || !form.last_exam_type || !form.exam_type) {
      setMessage("Please fill all required fields");
      setShowToast(true);
      return;
    }

    setLoading(true);
    try {
      const res = await authFetch("auto-resit-exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
const data = await res.json()
      if (!res.ok){
                toast.error(data.message)
      } 

      setMessage("Auto resit scheduled successfully");
      setShowToast(true);

      setForm({
        batch_id: "",
        term_id: "",
        last_exam_type: "",
        exam_type: "",
        gap_days: 15,
      });
    } catch (err) {
        toast.error("Try Again or Contant Kamlesh Kumawat - IT Team")
    } finally {
      setLoading(false);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-3xl mx-auto">
      {loading && <FullWidthLoader />}
      {showToast && <Toast message={message} />}

      <h2 className="text-xl font-bold mb-2">Auto Schedule Resit</h2>
      <p className="text-gray-500 text-sm mb-4">
        Automatically schedule resit exams based on configuration
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Batch */}
        <select
          name="batch_id"
          value={form.batch_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Batch</option>
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* Term */}
        <select
          name="term_id"
          value={form.term_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Term</option>
          {terms.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        {/* Last Exam Type */}
        <select
          name="last_exam_type"
          value={form.last_exam_type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Last Exam Type</option>
          <option value="main">Main</option>
          <option value="resit-1">Resit 1</option>
          <option value="resit-2">Resit 2</option>
        </select>

        {/* Exam Type */}
        <select
          name="exam_type"
          value={form.exam_type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Exam Type</option>
          <option value="resit-1">Resit 1</option>
          <option value="resit-2">Resit 2</option>
        </select>

        {/* Gap Days */}
        <input
          type="number"
          name="gap_days"
          value={form.gap_days}
          min="1"
          onChange={handleChange}
          className="border p-2 rounded"
          placeholder="Gap Days"
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-violet-700 text-white rounded hover:bg-violet-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
