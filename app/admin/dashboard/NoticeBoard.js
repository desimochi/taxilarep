import { authFetch } from "@/app/lib/fetchWithAuth";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export default function NoticeBoard( {type}){
    const [loading, setLoading]  = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    useEffect(()=>{
        async function fetchdata() {
          setLoading(true)
          try {
            const res= await authFetch(`${type==='notice'? 'noticeboard-viewset' : "events-viewset"}`)
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{type ==='notice' ? "Notice Board" : "Events"}</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-gray-600" />
                 {type==='notice'? data[0]?.title : data[0]?.name} 
                </div>
                <p className="text-sm text-gray-600 mb-3">Time: {data[0]?.date}</p>
                <button className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 w-full justify-center transition-colors">
                  <Calendar size={16} />
                  Add A Notice
                </button>
              </div>
            </div>
    )
}