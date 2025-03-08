"use client"

import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
export default function ClassShedDis() {
    const [loading, setLoading] = useState(false)
    const [classSchedule, setClassSchedule] = useState([]);
    const [subjectMapping, setSubjectMapping] = useState([]);
    const [courses, setCourses] = useState([])
    const [isOpen, setIsOpen] = useState(false);

 const token = localStorage.getItem("accessToken");
 useEffect(() => {
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [classRes, subRes] = await Promise.all([
        authFetch("class-schedule-viewset"),
        authFetch("subject-mapping-viewset"),
        fetch("http://101.53.148.75:8007/course-viewset", {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }),
      ]);

      const classData = await classRes.json();
      const subData = await subRes.json();

      // Only update state if the data is different
      setClassSchedule((prev) => (JSON.stringify(prev) !== JSON.stringify(classData.data) ? classData.data : prev));
      setSubjectMapping((prev) => (JSON.stringify(prev) !== JSON.stringify(subData.data) ? subData.data : prev));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();
}, [token]);

  console.log(classSchedule)
  // Merge data
  const mergedData = classSchedule
    .map((cls) => {
      const subjectMap = subjectMapping.find((sub) => sub.id === cls.mapping);
      if (!subjectMap) return null;

      return {
        id:subjectMap.id,
        term: subjectMap.term.name,
        batch: subjectMap.batch.name,
        subject: subjectMap.subject.name,
        faculty: `${subjectMap.faculty.first_name} ${subjectMap.faculty.last_name}`,
        date: cls.date,
        start_time: cls.start_time,
        end_time: cls.end_time,
      };
    })
    .filter(Boolean);

    const toggleModal = () => {
        setIsOpen(!isOpen);
      };
      
    return (
        <>
            {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-black text-white">
            <th className="border px-4 py-2">S.no.</th>
              <th className="border px-4 py-2">Term</th>
              <th className="border px-4 py-2">Batch</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Faculty</th>
              <th className="border px-4 py-2">Class Date</th>
              <th className="border px-4 py-2">Start Time</th>
              <th className="border px-4 py-2">End Time</th>
            </tr>
          </thead>
          <tbody>
            {mergedData.length > 0 ? (
              mergedData.map((row, index) => (
                <tr key={index} className="text-center border">
                <td className="border px-4 py-2">{index+1}</td>
                  <td className="border px-4 py-2">{row.term}</td>
                  <td className="border px-4 py-2">{row.batch}</td>
                  <td className="border px-4 py-2">{row.subject}</td>
                  <td className="border px-4 py-2">{row.faculty}</td>
                  <td className="border px-4 py-2">{row.date}</td>
                  <td className="border px-4 py-2">{row.start_time}</td>
                  <td className="border px-4 py-2">{row.end_time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No schedule available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
        </>
    );
};


