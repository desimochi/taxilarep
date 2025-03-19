"use client"

import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
export default function ClassShedDis() {
    const [loading, setLoading] = useState(false)
    const [classSchedule, setClassSchedule] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

 useEffect(() => {
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const classRes= await authFetch("class-schedule-viewset")

      const classData = await classRes.json();

      // Only update state if the data is different
      setClassSchedule((prev) => (JSON.stringify(prev) !== JSON.stringify(classData.data) ? classData.data : prev));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();
}, []);


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
            {classSchedule.length > 0 ? (
              classSchedule.map((row, index) => (
                <tr key={index} className="text-center border">
                <td className="border px-4 py-2">{index+1}</td>
                  <td className="border px-4 py-2">{row.mapping.term.name}</td>
                  <td className="border px-4 py-2">{row.mapping.batch.name}</td>
                  <td className="border px-4 py-2">{row.mapping.subject.name}</td>
                  <td className="border px-4 py-2">{row.mapping.faculty.first_name+ " " +row.mapping.faculty.last_name}</td>
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


