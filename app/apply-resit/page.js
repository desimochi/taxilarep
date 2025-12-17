"use client";

import { useContext, useEffect, useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import Toast from "@/components/Toast";
import { handlePayment } from "@/lib/payments";
import toast from "react-hot-toast";

export default function Page() {
  const { state } = useContext(GlobalContext);
  const studentId = state.user_id;
 const enrollment =  state.enrollment_number
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [course, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  const [term, setTerm] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [feeTypeId, setFeeTypeId] = useState(null);
  const [baseAmount, setBaseAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // ---------------- INITIAL DATA ----------------
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [c, b, t] = await Promise.all([
          authFetch("courses-list"),
          authFetch("batches-list"),
          authFetch("terms-list"),
        ]);

        const courseData = await c.json();
        const batchData = await b.json();
        const termData = await t.json();

        setCourse(courseData.data);
        setBatch(batchData.data);
        setTerm(termData.data);
      } catch (err) {
        setError("Failed to load initial data");
      }
    }
    fetchInitialData();
  }, []);

  // ---------------- FETCH SUBJECTS ----------------
  useEffect(() => {
    if (selectedCourse && selectedBatch && selectedTerm && selectedType) {
      fetchSubjects();
    }
  }, [selectedCourse, selectedBatch, selectedTerm, selectedType]);

  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const res = await authFetch(
        `resit-subject-mapping-filter?course_id=${selectedCourse}&batch_id=${selectedBatch}&term_id=${selectedTerm}&type=${selectedType}`
      );
      const data = await res.json();
      setSubjects(data.data || []);
    } catch {
      setError("Failed to fetch subjects");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FETCH FEE TYPE AMOUNT ----------------
  useEffect(() => {
    if (!feeTypeId) return;

    const fetchFeeAmount = async () => {
      try {
        const res = await authFetch(`fee-type-viewset/${feeTypeId}`);
        const data = await res.json();
        setBaseAmount(data.data.default_amount || 0);
      } catch {
        setBaseAmount(0);
      }
    };

    fetchFeeAmount();
  }, [feeTypeId]);

  // ---------------- CALCULATE TOTAL ----------------
  useEffect(() => {
    setTotalAmount(baseAmount * selectedSubjects.length);
  }, [baseAmount, selectedSubjects]);

  // ---------------- SUBMIT ----------------
 async function handleSubmit() {
  try {
    const custom_fee = null
    const res = await handlePayment(enrollment, totalAmount, feeTypeId, custom_fee );

    if (res.payment === "successful") {
      await handleResitSubmit();
      return;
    }

    toast.error("Payment Failed. Please try again.");
  } catch (err) {
    toast.error(err.reason || "Payment Failed");
  }
}

  async function handleResitSubmit() {
    if (!selectedSubjects.length) {
      setMessage("Please select at least one subject");
      setShowToast(true);
      return;
    }

    const payload = {
      type: selectedType,
      student: studentId,
      subjects: selectedSubjects,
      term: selectedTerm,
      fee_type: feeTypeId,
      amount: totalAmount,
    };

    try {
      setLoading(true);
      const res = await authFetch("resit-request-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("Resit Applied Successfully");
      setShowToast(true);

      setTimeout(() => {
        window.location.replace("/student");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="px-16 py-16">
      {showToast && <Toast message={message} />}

      <h4 className="text-2xl font-bold text-center">Apply for Resit</h4>
      <p className="text-sm text-center mt-2">
        Select Course, Batch, Term, Type and Subjects
      </p>

      <div className="max-w-2xl mx-auto border border-red-300 mt-8 rounded-sm">
        <h2 className="bg-red-50 text-red-800 text-center py-2 font-bold">
          Resit Application
        </h2>

        {/* COURSE + BATCH */}
        <div className="flex px-4 gap-2 mt-4">
          <select
            className="border p-2 w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {course.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <select
            className="border p-2 w-full"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">Select Batch</option>
            {batch.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* TERM + TYPE */}
        <div className="flex px-4 gap-2 mt-3">
          <select
            className="border p-2 w-full"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <option value="">Select Term</option>
            {term.map((t) => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          <select
            className="border p-2 w-full"
            value={selectedType}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedType(value);

              // reset on change
              setSelectedSubjects([]);
              setTotalAmount(0);

              if (value === "resit-1") setFeeTypeId(1);
              if (value === "resit-2") setFeeTypeId(2);
            }}
          >
            <option value="">Select Type</option>
            <option value="resit-1">Resit-1</option>
            <option value="resit-2">Resit-2</option>
          </select>
        </div>

        {/* SUBJECTS */}
        <div className="p-4">
          <p className="font-bold mb-2">Select Subjects</p>
          {subjects.map((subj) => (
            <label key={subj.id} className="flex gap-2 items-center">
              <input
                type="checkbox"
                value={subj.id}
                onChange={(e) => {
                  const id = Number(e.target.value);
                  setSelectedSubjects((prev) =>
                    e.target.checked
                      ? [...prev, id]
                      : prev.filter((x) => x !== id)
                  );
                }}
              />
              {subj.subject?.name}
            </label>
          ))}
        </div>

        {/* AMOUNT */}
        <div className="px-4 py-2 bg-gray-50 border-t">
          <p>Fee per subject: ₹{baseAmount}</p>
          <p className="font-bold text-red-800">
            Total Amount: ₹{totalAmount}
          </p>
          <p className="text-xs text-gray-600">
            Selected Subjects: {selectedSubjects.length}
          </p>
        </div>

        {/* SUBMIT */}
        <div className="p-4">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-red-800 text-white w-full py-2 rounded"
          >
            {loading ? "Submitting..." : "Apply for Resit"}
          </button>
        </div>
      </div>
    </div>
  );
}
