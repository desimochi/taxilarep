import { useEffect, useState } from "react";
import FullWidthLoader from "./Loaader";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function Atten15Day({id}){
          const [days, setSelectedDays] = useState(7)
          const [atten, setatten] = useState([])
          const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
          useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const [ response1] = await Promise.all([
            await authFetch(`attendance-summary/${id}/${days}`),
        ])
        if ( !response1.ok) throw new Error("Failed to fethc the data");
        const data2 = await response1.json()
        setatten(data2.data)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchclassData();
  }, [id, days]);
  async function handledays(e){
    setSelectedDays(e.target.value)
      }
    const uniqueDates = [...new Set(atten.flatMap((item) => item.attendance.map((att) => att.date)))];
    const subjects = atten.map((item) => item.subject_mapping.subject.name);
    return(
        <div className="mt-4 border border-gray-300 rounded-sm shadow-sm hover:shadow-xl transition-shadow p-3">
                <div className="flex justify-between">
                <h3 className="bg-red-700 px-12 w-fit py-3 text-white rounded-sm font-bold">Attendance</h3>
                <select value={days}  className="px-4 border border-gray-800 rounded-sm" onChange={handledays}>
                    <option value="7">7</option>
                    <option value="15">15</option>
                </select>
                </div>
               {loading? <FullWidthLoader/> :     <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4 max-h-96 overflow-y-auto">
                            <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
            {subjects.map((subject, index) => (
              <th key={index} scope="col" className="px-6 py-3">{subject}</th>
            ))}
              </tr>
            </thead>
            <tbody>
            {uniqueDates.length>0? uniqueDates.map((date, index) => (
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
                    {status === "Class Not Scheduled"? "CNS" : `${status}`}
                  </td>
                );
              })}
            </tr>
          )) : <tr><td className="text-center py-3">Attendance Data Not Available</td></tr>}
    
            </tbody>
                            </table>}
                </div>
    )
}