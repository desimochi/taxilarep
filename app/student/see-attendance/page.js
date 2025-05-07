"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext } from "react";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import StudentFilter from "@/components/student/Filter";
export default function Page(){
    const [loading, setLoading] = useState(false);
    const{state} = useContext(GlobalContext)
    const searchparams = useSearchParams()
    const id = searchparams.get('stuId')
      const [error, setError] = useState(false);
        const [sclass, setsclass] = useState([]);
        const [atten, setatten] = useState([])
  

    useEffect(() => {
        
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const [response1] = await Promise.all([
            await authFetch(`attendance-summary-filter/${id}`)

        ])
        if (!response1.ok) throw new Error("Failed to fethc the data");

  
        const data2 = await response1.json()

    
        setatten(data2.data)
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchclassData();
  }, [id]);




    const uniqueDates = [...new Set(atten.flatMap((item) => item.attendance.map((att) => att.date)))];
  const subjects = atten.map((item) => item.subject_mapping.subject.name);
  const percentage = atten.map((item) => item.attended_percentage);
    return(
        <div className="py-4 px-5">
         
            <div>
            <div className="w-full">
            <div className="py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-2/6">
                <h5 className="text-2xl font-bold">Student Attendance</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
              
                </div>
                <hr className="border border-b-2 mt-4 mb-2"/>
                </div>
                <StudentFilter id={id} searchapi={`attendance-summary-filter`} updateData={setatten}/>
            <div className="px-12">
            {loading? <FullWidthLoader/> :     <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
            {subjects.map((subject, index) => (
              <th key={index} scope="col" className="px-6 py-3">{subject} - {percentage[index]}%</th>
            ))}
              </tr>
            </thead>
            <tbody>
            {uniqueDates.length>0 ? 
            uniqueDates.map((date, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td className="px-6 py-4">{date}</td>
              {atten.map((item, subIndex) => {
                const attendanceRecord = item.attendance.find((att) => att.date === date);
                const status = attendanceRecord ? attendanceRecord.status : "No Data";
                
                return (
                  <td
                    key={subIndex}
                    className={`border border-gray-300 px-4 py-2 ${
                      status === "Present"
                        ? "bg-green-200"
                        : status === "Class Not Scheduled"
                        ? "bg-gray-100"
                        : "bg-red-200"
                    }`}
                  >
                    {status}
                  </td>
                );
              })}
            </tr>
          )):(<tr className="text-center py-4"><td colSpan={1}>No Data Found</td></tr>)}
    
            </tbody>
                            </table>}
            </div>
        </div>
            </div>
            </div>
    
    )
}