"use client";

import { useEffect, useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import Toast from "@/components/Toast";
import FullWidthLoader from "@/components/Loaader";

export default function Page() {
  const [specializations, setSpecializations] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [student, setStudent] = useState([]);
const[course, setCourse] = useState([]);
const[batch, setBatch] = useState([]);
const[terms, setTerms] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedStudents, setSelectedStudents] = useState(new Set());

  useEffect(() => {
  
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const data = await authFetch("all-entities")
        if (!data.ok) {
          throw new Error("Failed to fetch data");
        }
        const response = await data.json();

        setSpecializations(response.data.specializations);
        setCourse(response.data.courses);
        setBatch(response.data.batches);
        setTerms(response.data.terms);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // **Filter students based on selected course and batch**
  const filteredStudents = student.filter((row) => {
    return (
      (selectedCourse ? row.course.id === parseInt(selectedCourse) : true) &&
      (selectedBatch ? row.batch.id === parseInt(selectedBatch) : true)
    );
  });
  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  };
  useEffect(() => {
    if (selectedCourse && selectedBatch) {
      callApi(selectedCourse, selectedBatch);
    }
  }, [selectedCourse, selectedBatch]);
  const callApi = async (course, batch) => {
    setLoading(true);
    try {
      const response = await authFetch(`student-list?course=${course}&batch=${batch}`);
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudent(data.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = async () => {
    if (!selectedTerm || !selectedSpecialization ) {
      setMessage("Please select Term, Specialization");
      setShowToast(true);
      return;
    }

    const payload = {
      course: parseInt(selectedCourse),
      batch: parseInt(selectedBatch),
      term: parseInt(selectedTerm),
      specialization: parseInt(selectedSpecialization),
      student: Array.from(selectedStudents),
    };
    try {
      setLoading(true);
      const response = await authFetch("student-mapping-viewset", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Students assigned successfully!");
        setShowToast(true);
        setSelectedStudents(new Set()); // Reset selection after success
      } else {
        throw new Error("Failed to assign students");
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-300 mt-4 mx-80 md:mt-12 md:mx-40 rounded-md shadow-md hover:shadow-xl transition-shadow">
      {showToast && <Toast message={message} />}
      <h3 className="text-center py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">
        Assign Students
      </h3>

      {/* Course & Batch Dropdown */}
      <div className="flex gap-2 pt-6 px-6">
        {/* Course Selection */}
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">
            Course
          </label>
          <select
            className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
            }}
          >
            <option value="">Select Course</option>
            {course.map((cour) => (
              <option key={cour.id} value={cour.id}>
                {cour.name}
              </option>
            ))}
          </select>
        </div>

        {/* Batch Selection */}
        <div className="w-1/2">
          <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">
            Batch
          </label>
          <select
            className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
            value={selectedBatch}
            onChange={(e) => {
              setSelectedBatch(e.target.value);
            }}
          >
            <option value="">Select Batch</option>
            {batch.map((batch) => (
              <option key={batch.id} value={batch.id}>
                {batch.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-2 px-6">
           <div className="w-1/2">
            <label htmlFor="term" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Term </label>
               <select  value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
      <option value="">Select Term</option>
      {terms.map((batch) => (
        <option key={batch.id} value={batch.id}>
          {batch.name}
        </option>
      ))}
    </select>
            </div>
            <div className="w-1/2">
            <label htmlFor="specializations" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Specializations </label>
               <select value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
      <option value="">Select Specializations</option>
      {specializations.map((batch) => (
        <option key={batch.id} value={batch.id}>
          {batch.name}
        </option>
      ))}
    </select>
            </div>
           </div>
      {/* Student Table */}
      {loading ? (
        <FullWidthLoader />
      ) : (
        <div className="p-6">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-300 text-gray-800">
                <th className="border px-4 py-2">Select</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Roll no.</th>
                <th className="border px-4 py-2">Course</th>
                <th className="border px-4 py-2">Batch</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((row, index) => (
                  <tr key={index} className="text-left border">
                    <td className="border px-4 py-2">
                    <input type="checkbox" onChange={() => handleCheckboxChange(row.id)} />
                    </td>
                    <td className="border px-4 py-2">
                      {row.first_name + " " + row.middle_name + " " + row.last_name}
                    </td>
                    <td className="border px-4 py-2">
                      {row.enrollment_number ? row.enrollment_number : "NA"}
                    </td>
                    <td className="border px-4 py-2">{row.course.name}</td>
                    <td className="border px-4 py-2">{row.batch.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    No students available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Submit Button */}
      <div className="px-6 pb-6">
        <button
          type="submit"
          className="text-white inline-flex justify-center w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
          >
          <svg
            className="me-1 -ms-1 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          Assign Student
        </button>
      </div>
    </div>
  );
}
