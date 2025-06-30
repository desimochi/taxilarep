import { authFetch } from "@/app/lib/fetchWithAuth"
import { HandshakeIcon } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function ParentMeetingSnap({projects}){
  const [loading, setLoading]  = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    useEffect(()=>{
        async function fetchdata() {
          setLoading(true)
          try {
            const res= await authFetch(`parent-meeting-viewset`)
            const response =  await res.json()
            if(!res.ok){
              throw new Error("Failed to Fetch Informaiton")
            }
            setData(response.data)
            setBatch("T29")
          } catch (error) {
            setError("Failed to Fetch Informaiton")
          }finally{
            setLoading(false)
          }
        } 
    
    fetchdata()
    },[])
    return(
         <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Parents Meeting Schedule</h3>
                <Link href={"/admin/parents-meeting"} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors">
                  See More
                </Link>
              </div>
              <div className="space-y-3">
                {data.map((project, index) => {
                  if(index<5){
                       return(   <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className={`w-12 h-12 bg-red-300 rounded-lg flex items-center justify-center text-red-800 text-sm`}>
                      <HandshakeIcon className="h-8 w-8"/>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{project.student?.first_name} - {project.student?.batch?.name} | {project.person_name} ({project.relation})</p>
                      <p className="text-xs text-gray-600">Meet for - {project.short_description} on {project.meeting_date} at {project.meeting_time}</p>
                    </div>
                  </div>
                )}
                  
})}
              </div>
            </div>
    )
}