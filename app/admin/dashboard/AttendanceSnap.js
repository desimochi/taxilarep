import { authFetch } from "@/app/lib/fetchWithAuth"
import { CalendarArrowUpIcon } from "lucide-react"
import { useState, useEffect } from "react"

 
 export default function AttendanceSnap(){
 const [loading, setLoading]  = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    useEffect(()=>{
        async function fetchdata() {
          setLoading(true)
          try {
            const res= await authFetch(`class-schedule-viewset?page=1`)
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
         <div className="space-y-4">
                {data.length>0 ? data.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-red-200 text-red-800 rounded-full flex items-center justify-center text-lg">
                        <CalendarArrowUpIcon className="h-6 w-6" />
                      </div>
                      <div className="">
                        <p className="font-medium text-gray-900">{member.mapping?.subject?.name} </p>
                        <p className="text-sm text-gray-600">{member.mapping?.faculty?.first_name} {member.mapping?.faculty?.last_name} on {member?.date} at {member?.start_time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                     <p className="bg-green-100 text-green-800 text-sm px-2 py-1 rounded-sm shadow">{member.mapping?.batch?.name}  | {member.mapping?.term?.name} - {member.mapping?.type}</p>
                    </div>
                  </div>
                )) : <p>No Data Found</p>}
              </div>
    )
 }
