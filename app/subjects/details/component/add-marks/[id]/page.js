"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { ArrowLeft } from "lucide-react";
import Toast from "@/components/Toast";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnswerDetails() {
  const { id } = useParams();
    const router = useRouter()
  const searchParams = useSearchParams();
  const subcomp = searchParams.get("subcomp");
  const [message, setmessage] = useState('')
  const [showtoast, setShowToast] = useState(false)
  const [markErrors, setMarkErrors] = useState({});
  const [data, setData] = useState([]);
  const [maxMark, setMaxMark] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        setLoading(true);
        const response = await authFetch(
          `${subcomp === "true" ? "sub-component" : "component"}-marks/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch Subject data");

        const responseData = await response.json();
        if (responseData.data) {
          setData(responseData.data);
          setMaxMark(responseData.extra);

          // ✅ Initialize formData AFTER data is set
          const initialFormData = responseData.data.reduce((acc, student) => {
            acc[student.id] = student.marks ?? ""; // Ensure empty string if marks are null
            return acc;
          }, {});
          setFormData(initialFormData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id, subcomp]);

  function handleChange(e, studentId) {
    const value = Number(e.target.value);
  
    if (value > maxMark?.max_marks) {
      setMarkErrors((prev) => ({
        ...prev,
        [studentId]: true, // Show error for this student
      }));
    } else {
      setMarkErrors((prev) => ({
        ...prev,
        [studentId]: false, // Remove error if value is valid
      }));
  
      // ✅ Only save marks within allowed limit
      setFormData((prev) => ({
        ...prev,
        [studentId]: value,
      }));
    }
  }
  

  async function handleSubmit() {
    const marks_student = Object.keys(formData).map((id) => ({
      id: Number(id),
      marks: formData[id],
    }));

    try {
      const response = await authFetch(`${subcomp === "true" ? "sub-component" : "component"}-marks/${id}`, {
        method: "POST",
        body: JSON.stringify({ marks_student }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to update marks");

      setmessage("Marks Added Successfully")
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
        {showtoast && <Toast message={message}/>}
        <button 
                onClick={() => router.back()} 
                className="px-6 py-6 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
      <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-8 mx-6">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-xl">Add Component Marks</h4>
          <span className="bg-green-600 px-6 py-2 rounded-sm font-semibold">
            Maximum Marks - {maxMark?.max_marks}
          </span>
        </div>
      </div>
      <div className="px-6 py-6">
        <table className="table-auto w-full border-collapse border border-gray-300 rounded-sm mt-4">
          <thead>
            <tr className="bg-black text-white">
              <th className="border px-4 py-2">S.no.</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Enrollment No.</th>
              <th className="border px-4 py-2">Submitted</th>
              <th className="border px-4 py-2">
                Add Marks{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((student, index) => (
                <tr key={student.id} className="text-center">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {student.first_name} {student.middle_name}{" "}
                    {student.last_name}
                  </td>
                  <td className="border px-4 py-2">{student.enrollment_number}</td>
                  <td className="border px-4 py-2">
                    {student.submitted ? (
                      <span className="text-sm bg-green-600 py-0.5 px-1 rounded-sm text-white">
                        Yes
                      </span>
                    ) : (
                      <span className="text-sm py-0.5 px-1 rounded-sm bg-red-600 text-white">
                        No
                      </span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                    //   disabled={!student.submitted}
                      value={formData[student.id] ?? ""}
                     className={`px-2 py-0.5 border border-gray-600 ${
    markErrors[student.id] ? "bg-red-300" : ""
  }`}
                      name="marks"
                      onChange={(e) => handleChange(e, student.id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center border px-4 py-2">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button
          className="bg-red-600 text-white py-2 px-8 rounded-sm mt-4 shadow-sm hover:shadow-xl transition-shadow"
          onClick={handleSubmit}
        >
          Add Marks
        </button>
      </div>
    </div>
  );
}
