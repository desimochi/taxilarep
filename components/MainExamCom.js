"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "./Loaader";

export default function MainExamCom() {
  const [loading, setLoading] = useState(false);
  const [classSchedule, setClassSchedule] = useState([]);
  const [subjectMapping, setSubjectMapping] = useState([]);
  const [component, setComponent] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [classRes, subRes, componentRes] = await Promise.all([
          authFetch("exam-viewset"),
          authFetch("subject-mapping-viewset"),
          authFetch("component-viewset"),
        ]);

        const classData = await classRes.json();
        const subData = await subRes.json();
        const componentData = await componentRes.json(); // ✅ Fixed API response assignment

        console.log("Class Schedule Response:", classData);
        console.log("Subject Mapping Response:", subData);
        console.log("Component Response:", componentData);

        // Ensure valid array data before setting state
        setClassSchedule(Array.isArray(classData.data) ? classData.data : []);
        setSubjectMapping(Array.isArray(subData.data) ? subData.data : []);
        setComponent(Array.isArray(componentData.data) ? componentData.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Merge data safely
  const mergedData = Array.isArray(classSchedule)
    ? classSchedule
        .map((cls) => {
          const componentMap = component.find((sub) => sub.id === cls.component);
          if (!componentMap) return null;

          return {
            id: componentMap.id,
            name: componentMap.name,
            mapping: componentMap.subject_mapping,
            date: cls.date,
            start_time: cls.start_time,
            end_time: cls.end_time,
          };
        })
        .filter(Boolean)
    : [];

  const combinedData = mergedData
    .map((cls) => {
      const subjectMap = subjectMapping.find((sub) => sub.id === cls.mapping);
      if (!subjectMap) return null;

      return {
        id: subjectMap.id,
        name: cls.name,
        term: subjectMap.term?.name || "N/A",
        batch: subjectMap.batch?.name || "N/A",
        subject: subjectMap.subject?.name || "N/A",
        date: cls.date,
        start_time: cls.start_time,
        end_time: cls.end_time,
      };
    })
    .filter(Boolean);

  return (
    <>
      <div className="mx-5 border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow py-8 px-8">
        <div className="flex justify-between items-center gap-2">
          <div className="w-1/3">
            <h2 className="text-2xl font-bold">Main Exam Schedule</h2>
            <p className="text-gray-200 text-sm">Check the examination schedule</p>
          </div>
          <div className="w-1/3">
            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5">
              <option value="" disabled selected>Select a Course</option>
              <option value="2024-25">PGDM+Business Analytics</option>
              <option value="PGPM">PGPM</option>
              <option value="EPGDM">EPGDM</option>
            </select>
          </div>
          <div className="w-1/3">
            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5">
              <option value="" disabled selected>Select a Batch</option>
              <option value="2024-25">T-29</option>
              <option value="t-28">T-28</option>
              <option value="t-27">T-27</option>
              <option value="t-26">T-26</option>
            </select>
          </div>
          <div className="w-1/3">
            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5">
              <option value="" disabled selected>Select a Term</option>
              <option value="Term5">Term5</option>
              <option value="Term4">Term4</option>
              <option value="Term3">Term3</option>
              <option value="Term2">Term2</option>
              <option value="Term1">Term1</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <FullWidthLoader />
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-8">
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
            {combinedData.length > 0 ? (
              combinedData.map((row, index) => (
                <tr key={index} className="text-center border">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{row.term}</td>
                  <td className="border px-4 py-2">{row.batch}</td>
                  <td className="border px-4 py-2">{row.subject}</td>
                  <td className="border px-4 py-2">{row.name}</td>
                  <td className="border px-4 py-2">{row.date}</td>
                  <td className="border px-4 py-2">{row.start_time}</td>
                  <td className="border px-4 py-2">{row.end_time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No schedule available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </>
  );
}
