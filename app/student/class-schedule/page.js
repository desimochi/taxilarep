"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext } from "react";
import FullWidthLoader from "@/components/Loaader";
import { SearchIcon } from "lucide-react";
import StudentFilter from "@/components/student/Filter";
export default function Page(){
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
      const { state } = useContext(GlobalContext);
        const [sclass, setsclass] = useState([]);
    

    useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const [response] = await Promise.all([
            await authFetch(`student-wise-class/${state.user_id}`),

        ])
        if (!response.ok ) throw new Error("Failed to fethc the data");

        const data = await response.json();
        setsclass(data.data);
      
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchclassData();
  }, [state.user_id,]);



    return(
        <div className="py-4 px-5">
            <div>
            <div className="w-full">
            <div className=" py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-2/6">
                <h5 className="text-2xl font-bold">Class Schedule </h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>

                </div>
                <hr className="border border-b-2 mt-4 mb-2"/>
                </div>
                <StudentFilter id={state.user_id} searchapi={`student-wise-class`} updateData={setsclass}/>
            <div className="px-12">
            {loading? <FullWidthLoader/> :     <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">
             
                         <tr >
                                <th scope="col" className="px-6 py-3">S.No.</th>
                                <th scope="col" className="px-6 py-3">Subject Name</th>
                                <th scope="col" className="px-6 py-3">Subject Type</th>
                <th scope="col" className="px-6 py-3">Date.</th>
                <th scope="col" className="px-6 py-3">From</th>
                <th scope="col" className="px-6 py-3">To</th>
                <th scope="col" className="px-6 py-3">Faculty</th>
                <th scope="col" className="px-6 py-3">Status</th>
                         </tr>
                
            </thead>
            <tbody>
            { sclass.length > 0 ? (
    sclass.map((cls, index) => (
        <tr key={cls.id} className="hover:bg-gray-50">
            <td className="px-6 py-3">{index + 1}</td>
            <td className="px-6 py-3">{cls.mapping.subject?.name}</td>
            <td className="px-6 py-3">{cls.mapping?.type === "main" ? (
                    <span className="bg-green-50 text-green-800 px-2 py-1 shadow-sm rounded-sm border border-green-100">main</span>
                ) : (
                    <span className="bg-red-50 text-red-800 px-2 py-1 shadow-sm rounded-sm border border-red-100">{cls.mapping?.type}</span>
                )}</td>
            <td className="px-6 py-3">{cls.date}</td>
            <td className="px-6 py-3">{cls.start_time}</td>
            <td className="px-6 py-3">{cls.end_time}</td>
            <td className="px-6 py-3">{cls.mapping.faculty?.first_name} {cls.mapping.faculty?.last_name}</td>
            <td className="px-6 py-3">
  {cls.is_cancel ? (
    <span className="text-sm bg-red-50 text-red-800 p-1 rounded-sm">Cancelled</span>
  ) : cls.is_complete ? (
    <span className="text-sm bg-green-50 text-green-800 p-1 rounded-sm">Completed</span>
  ) : (
    <span className="text-sm bg-violet-50 text-violet-800 p-1 rounded-sm">Scheduled</span>
  )}
</td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan={8} className="text-center py-4">No Class Schedule Found</td>
    </tr>
)}
            
    
            </tbody>
                            </table>}
            </div>
        </div>
            </div>
            </div>
    
    )
}