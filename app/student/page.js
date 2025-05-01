"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import Atten15Day from "@/components/Atten15Day";
import Cookies from "js-cookie";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link"
import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { set } from "date-fns";
import { EyeIcon } from "lucide-react";
export default function Page(){
    const [sclass, setsclass] = useState([]);
    const [atten, setatten] = useState([])
    const [classData, setClassData] = useState([])
    const [studata, setStudata] = useState({})
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
      const [days, setSelectedDays] = useState(7)
      const { state } = useContext(GlobalContext);
    
      useEffect(() => {
        const fetchclassData = async () => {
          try {
            setLoading(true);
            const [response,  response2, response3] = await Promise.all([
                await authFetch(`subject-student-wise/${state.user_id}`),
                await authFetch(`dashboard-student-data/${state.user_id}`),
                await authFetch(`student-wise-class/${state.user_id}`)
    
            ])
            if (!response.ok && !response2.ok) throw new Error("Failed to fethc the data");
    
            const data = await response.json();
            const data3 = await response2.json()
            const data4 = await response3.json()
    
            setsclass(data.data);
            setStudata(data3.data)
            setClassData(data4.data)
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchclassData();
      }, [state.user_id, days]);
        
        return (
                <div className="p-6">
                    <div className=" flex gap-4">
                        <div className=" w-3/4">
                        <div className="flex gap-4">
                            <span className="bg-red-600 bg-opacity-10 text-red-800  border border-red-100  w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">{studata.course?.name}</p> <p className="text-sm text-black">Course</p></span>
                            <span className="bg-red-600 bg-opacity-10   text-red-800 border border-red-100 w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">{studata.batch?.name}</p> <p className="text-sm text-black">Batch</p></span>
                            <span className="bg-red-600 bg-opacity-10 text-red-800   border border-red-100 w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">{studata.enrollment_number}</p> <p className="text-sm text-black">Enrollment Number</p></span>
                            <span className="bg-red-600 bg-opacity-10 text-red-800   border border-red-100 w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">{studata.mentor_name}</p> <p className="text-sm text-black">Mentor</p></span>
                            <span className="bg-red-600 bg-opacity-10 text-red-800   border border-red-100 w-full text-center py-4 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><p className="font-bold">{studata.upcoming_class}</p> <p className="text-sm text-black">Upcoming Classes in 7 Days</p></span>
                            </div>
                            <div className="mt-4">
                            <div className="p-4 border border-gray-300 rounded-sm shadow-sm hover:shadow-xl transition-shadow">
                                <h3 className="bg-red-700 px-12 w-fit py-3 text-white rounded-sm font-bold">Subject Wise Class Details</h3>
                                {sclass.length>0 ? ( <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                                <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">Subject Name</th>
                    <th scope="col" className="px-6 py-3">Total Classes</th>
                    <th scope="col" className="px-6 py-3">Completed Classes</th>
                    <th scope="col" className="px-6 py-3">Details</th>
                  </tr>
                </thead>
                <tbody>
               
                   { sclass.map((item)=>(
                        <tr key={item.id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                        <td className="px-6 py-4">{item.subject.name}</td>
                      <td className="px-6 py-4">{item.total_classes}</td>
                      <td className="px-6 py-4">{item.classes_completed}</td>
                      <td className="px-6 py-4"><Link href ={`/student/subject/details/${item.id}`} className="  text-green-800 rounded-sm"><EyeIcon className="h-4 w-4"/></Link></td>
                    </tr>
                    )) }
                    
                
                
    
                
                
        
                </tbody>
                                </table>) : (loading ? <FullWidthLoader/> : <p className="text-center mt-4">No Class Data Available</p>)}
                            </div>
                        </div>
                        </div>
                        <div className="w-1/4">
                        <div className="border border-gray-300 p-2">
                            <h3 className="font-bold px-6 py-2 bg-red-50 text-red-800 rounded-sm mb-3 text-center">Upcoming Class</h3>
                           {loading? <FullWidthLoader/> : <ul className="max-h-96 overflow-y-auto">
  {classData.length > 0 ? (
    <>
      {classData.map((item, index) => (
        <div key={item.id || index}>
          <li className="mt-3 text-sm text-center">
            {item.mapping?.subject?.name} - {item.date} - {item.start_time}
          </li>
          <hr className="border border-b-2 mt-2 mb-3" />
        </div>
      ))}
    </>
  ) : (
    <p className="text-center text-sm py-4">No Upcoming Classes</p>
  )}
</ul>}
<Link href={"/student/class-schedule"} className="bg-red-800 w-full text-white py-2 px-12 rounded-sm flex justify-center">View All</Link>
                        </div>
                        </div>
                    </div>
                    <Atten15Day id={state.user_id}/>
                </div>
        )
          }
      

