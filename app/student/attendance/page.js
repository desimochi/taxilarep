"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useParams } from "next/navigation"
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { set } from "date-fns";
import { useStundentData } from "@/hooks/useStudentData";
import StudentFilter from "@/components/student/Filter";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  
  
  
  const { state } = useContext(GlobalContext);
  const id = state.user_id;

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        setLoading(true);
        const [response] = await Promise.all([
          authFetch(`attendance-summary-filter/${id}`),
        ]);

        if (!response.ok ) throw new Error("Failed to fetch the data");

        const data = await response.json();
        setAttendanceData(data.data);
        // Extract unique terms
       
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id]);

  const normalizedAtten = Array.isArray(attendanceData)
    ? attendanceData
    : attendanceData
      ? [attendanceData]
      : [];

      const uniqueDates = [
        ...new Set(
          normalizedAtten.flatMap((item) =>
            Array.isArray(item.attendance) ? item.attendance.map((att) => att.date) : []
          )
        )
      ];
      

      const subjects = normalizedAtten.map((item) => ({
        name: item.subject_mapping?.subject?.name || "N/A",
        type: item.subject_mapping?.type || "N/A",
      }));

  const percntage = normalizedAtten.map((item) => item.attended_percentage);

  return (
    <div className="py-4 px-5">
      <div className="w-full">
        <div className="mt-4 p-2 py-8 px-12">
          <div className="flex justify-between items-center gap-2">
            <div className="w-2/6">
              <h5 className="text-2xl font-bold">Student Attendance</h5>
              <span className="text-sm text-gray-400">Taxila Business School</span>
            </div>
          </div>
          <hr className="border border-b-2 mt-4" />
        </div>

        <StudentFilter id={id} searchapi="attendance-summary-filter" updateData ={setAttendanceData} />

        <div className="px-12">
          {loading ? (
            <FullWidthLoader />
          ) : normalizedAtten.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">No attendance data found.</p>
          ) : (
            <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
              <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Date</th>
                  {subjects.map((subject, index) => (
                    <th key={index} scope="col" className="px-6 py-3">
                      {subject.name} ({subject.type}) - {percntage[index]}%
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uniqueDates.length>0 ? uniqueDates.map((date, index) => (
                  <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-4">{date}</td>
                    {normalizedAtten.map((item, subIndex) => {
                      const attendanceRecord = item.attendance.find((att) => att.date === date);
                      const status = attendanceRecord ? attendanceRecord.status : "No Data";
                      return (
                        <td key={subIndex}>
                          <span className={`border text-sm px-2 py-1 border-l-2 rounded-sm ${
                            status === "Present"
                              ? "bg-green-50 text-green-800"
                              : status === "Class Not Scheduled"
                              ? "bg-gray-50 text-gray-800"
                              : "bg-red-50 text-red-800"
                          }`}>
                            {status}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                )) :<tr><td colSpan={2} className="text-center py-3">No Data Available for Selected Filter Kindly Select Valid Values</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
