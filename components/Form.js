import { Loader, Save } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "./Toast";

export default function ResueForm({ heading, batch, term, course, showterm, enrollement, api, redirect, type, method = "POST" }) {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const batchValue = formData.get("batch");
    const termValue = formData.get("term");
    const enrollmentNumber = formData.get("enrollment_number");
    const examType = formData.get("type");

    // ✅ Validation
    if (!batchValue || selectedCourses.length === 0 || (showterm && !termValue)) {
      setError("Please fill all required fields.");
      return;
    }

    // ✅ CASE 1: Without showterm → just redirect
    if (!showterm) {
      const url = `${api}/fee-details?batch=${batchValue}&course=${selectedCourses.join(",")}&enrollment_number=${enrollmentNumber}`;
      router.push(url); // 🔁 ONLY redirect
      return;
    }

    // ✅ CASE 2: With showterm → call API first
    const payload = {
      batch: batchValue,
      term: termValue,
      course: selectedCourses,
      type: examType
    };

    const url = `${api}?batch=${batchValue}&term=${termValue}&type=${examType}&course=${selectedCourses.join(",")}`;
    const options = {
      method,
      headers: { "Content-Type": "application/json" }
    };

    if (method !== "GET" && method !== "DELETE") {
      options.body = JSON.stringify(payload);
    }

    try {
      setLoading(true);
      const response = await authFetch(url, options);
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage("Added Successfully");
      setShowToast(true);
      setTimeout(() => {
        setMessage("");
        setShowToast(false);
        router.push(redirect);
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
      {Toast && showToast && <Toast message={message} />}
      {error && <Toast message={error} type="error" />}
      <h3 className="text-center text-red-800 text-xl font-bold">{heading}</h3>
      <hr className="border border-b-2 mt-3 mb-4" />

      <label htmlFor="batch" className="font-bold mb-2">Batch</label><br />
      <select id="batch" name="batch" className="border border-gray-300 p-2 w-full mt-2" required>
        <option value="" disabled selected>Select A Batch</option>
        {batch.map(item => (
          <option key={item.id} value={item.id}>{item.name}</option>
        ))}
      </select>

      {showterm && (
        <>
          <label htmlFor="term" className="font-bold mt-4">Term</label><br />
          <select id="term" name="term" className="border border-gray-300 p-2 w-full mt-2" required>
            <option value="" disabled selected>Select A Term</option>
            {term.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </>
      )}

      {enrollement && (
        <>
          <label htmlFor="enrollment_number" className="font-bold mt-4">Enrollment No.</label><br />
          <input
            id="enrollment_number"
            type="text"
            name="enrollment_number"
            className="border border-gray-300 p-2 w-full mt-2"
            placeholder="Enter Enrollment No."
            required
          />
        </>
      )}

      <label className="font-bold mb-2">Course(s)</label>
      <div className="relative mt-2">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="border border-gray-300 w-full text-left p-2 rounded bg-white"
        >
          {selectedCourses.length === 0
            ? "Select Courses"
            : `${selectedCourses.length} course(s) selected`}
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 w-full border border-gray-300 bg-white max-h-48 overflow-y-auto mt-1 rounded shadow-md">
            {course.map(item => (
              <label key={item.id} className="flex items-center px-3 py-1 hover:bg-gray-100 cursor-pointer">
                <input
                  type="checkbox"
                  value={item.id}
                  checked={selectedCourses.includes(item.id)}
                  onChange={() => {
                    setSelectedCourses(prev =>
                      prev.includes(item.id)
                        ? prev.filter(id => id !== item.id)
                        : [...prev, item.id]
                    );
                  }}
                  className="mr-2"
                />
                {item.name}
              </label>
            ))}
          </div>
        )}
      </div>

      {type && (
        <>
          <label htmlFor="type" className="font-bold mb-2 mt-4 block">Exam Type</label>
          <select id="type" name="type" className="border border-gray-300 p-2 w-full mt-2">
            <option value="" disabled selected>Select Exam Type</option>
            <option value="main">Main</option>
            <option value="resit-1">Resit-1</option>
            <option value="resit-2">Resit-2</option>
          </select>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-4 mb-4 bg-red-800 flex items-center justify-center gap-1 text-white px-12 py-2 rounded-sm shadow-sm hover:shadow-xl transition-shadow"
      >
        {loading ? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
