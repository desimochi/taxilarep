"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link"
import { useState, useContext, useEffect } from "react";
export default function Page(){
const [sclass, setsclass] = useState([]);
const [atten, setatten] = useState([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [days, setSelectedDays] = useState(7)
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const [response, response1] = await Promise.all([
            await authFetch(`subject-student-wise/${state.user_id}`),
            await authFetch(`attendance-summary/${state.user_id}/${days}`)

        ])
        if (!response.ok && !response1.ok) throw new Error("Failed to fethc the data");

        const data = await response.json();
        const data2 = await response1.json()

        setsclass(data.data);
        setatten(data2.data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchclassData();
  }, [state.user_id, days]);
  async function handledays(e){
setSelectedDays(e.target.value)
  }
  const uniqueDates = [...new Set(atten.flatMap((item) => item.attendance.map((att) => att.date)))];
  const subjects = atten.map((item) => item.subject_mapping.subject.name);
    
    return (
            <div className="p-6">
                <div className=" flex gap-4">
                    <div className=" w-3/4">
                    <div className="flex gap-4">
                        <span className="bg-red-600 bg-opacity-10 border border-gray-300  w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">PGDM+Business Analytics</p> <p className="text-sm text-gray-600">Course</p></span>
                        <span className="bg-red-600 bg-opacity-10  border border-gray-300 w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">T-29</p> <p className="text-sm text-gray-600">Batch</p></span>
                        <span className="bg-red-600 bg-opacity-10  border border-gray-300 w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">Term 4</p> <p className="text-sm text-gray-600">Term</p></span>
                        <span className="bg-red-600 bg-opacity-10  border border-gray-300 w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">98%</p> <p className="text-sm text-gray-600">Attendance</p></span>
                        <span className="bg-red-600 bg-opacity-10  border border-gray-300 w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">15</p> <p className="text-sm text-gray-600">Upcoming Classes in 7 Days</p></span>
                        </div>
                        <div className="mt-4">
                        <div className="p-4 border border-gray-300 rounded-sm shadow-sm hover:shadow-xl transition-shadow">
                            <h3 className="bg-red-700 px-12 w-fit py-3 text-white rounded-sm font-bold">Subject Wise Class Details</h3>
                            <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Subject Name</th>
                <th scope="col" className="px-6 py-3">Total Classes</th>
                <th scope="col" className="px-6 py-3">Completed Classes</th>
                <th scope="col" className="px-6 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
            {sclass.length>0 ? (
                sclass.map((item)=>(
                    <tr key={item.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td className="px-6 py-4">{item.subject.name}</td>
                  <td className="px-6 py-4">{item.total_classes}</td>
                  <td className="px-6 py-4">{item.classes_completed}</td>
                  <td className="px-6 py-4"><Link href ={``}>See Details</Link></td>
                </tr>
                ))
                
            ) : (<p className="text-center mt-5">Subject Class Data Not Available at Moment Please Wait or  Kindly Refresh the Page</p>)}
            

            
            
    
            </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                    <div className="w-1/4">
                    <div className="border border-gray-300 p-2">
                        <h3 className="font-bold px-6 py-2 bg-black text-white rounded-sm text-center">Upcoming Class</h3>
                        <ul>
                            <li className="mt-3">Markering - 28/03/2025 at 10:30 AM</li>
                            <hr className="border border-b-2 mt-2 mb-3"/>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="mt-4 border border-gray-300 rounded-sm shadow-sm hover:shadow-xl transition-shadow p-3">
                <div className="flex justify-between">
                <h3 className="bg-red-700 px-12 w-fit py-3 text-white rounded-sm font-bold">Attendance</h3>
                <select value={days}  className="px-4 border border-gray-800 rounded-sm" onChange={handledays}>
                    <option value="7">7</option>
                    <option value="15">15</option>
                </select>
                </div>
               {loading? <FullWidthLoader/> :     <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
            {subjects.map((subject, index) => (
              <th key={index} scope="col" className="px-6 py-3">{subject}</th>
            ))}
              </tr>
            </thead>
            <tbody>
            {uniqueDates.map((date, index) => (
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
          ))}
    
            </tbody>
                            </table>}
                </div>
            </div>
    )
      }
      