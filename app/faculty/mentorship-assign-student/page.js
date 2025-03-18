"use client"
import { authFetch } from "@/app/lib/fetchWithAuth"
import { GlobalContext } from "@/components/GlobalContext";
import { useContext, useEffect, useState } from "react"

export default function Page(){
    const [mentee, setMentee] = useState([])
    const { state } = useContext(GlobalContext);
    useEffect(()=>{
       const fetchedMentorshipData = async()=>{
                try {
                    const response = await authFetch(`membership-viewset/students-by-faculty/${state.user_id}`)
                    const result = await response.json()
                    setMentee(result.data)
                } catch (error) {
                    alert("Not Able to Fetch")
                }
       }
       fetchedMentorshipData()
    },[])
    return(
        <div className="px-6 py-8">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white py-8">
          <div className="flex justify-between items-center px-6">
            <div className="w-2/5">
            <h5 className="text-xl font-bold">Mentorship - Assigned Student</h5>
            <p className="text-sm">nksdnfkl</p>
            </div>
            <div className="w-1/5">
            </div>
            <div className="w-1/5">
            </div>
            <div className="w-1/5">
            <div className="flex gap-2">
            <input type="text" placeholder="search..."  className="p-2 rounded-sm text-gray-700"  />
            </div>
            </div>
            
          </div>
        </div>
        <table className="w-full text-sm text-left mt-4">
          <thead className="text-xs uppercase bg-black text-white">
            <tr>
              <th className="px-6 py-3">S.No.</th>
              <th className="px-6 py-3">Student Name</th>
              <th className="px-6 py-3">Enrollment No.</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Batch</th>
              <th className="px-6 py-3">Course</th>
              <th className="px-6 py-3">See Details</th>
            </tr>
          </thead>
          <tbody>
            {mentee.length>0 && mentee.map((stu)=>{
                <tr key={stu.id} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 border-r-2 border-l-2">{stu.name}</td>
                
              </tr>
            })}
          </tbody>
          <tbody>
        </tbody>
        </table>
        </div>
    )
}