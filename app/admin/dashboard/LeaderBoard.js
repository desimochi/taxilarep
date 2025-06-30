import { authFetch } from "@/app/lib/fetchWithAuth"
import { CalendarArrowUpIcon, TrophyIcon } from "lucide-react"
import { useState, useEffect } from "react"
import BatchTopperCard from "./BatchTopperCard"

 
 export default function Leaderboard(){
 const [loading, setLoading]  = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    useEffect(()=>{
        async function fetchdata() {
          setLoading(true)
          try {
            const res= await authFetch(`topper`)
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
          <div className="p-6 bg-white border border-gray-200 rounded-xl">
      <h1 className="text-xl font-bold mb-6 text-gray-800 flex gap-1 items-center"><TrophyIcon className="h-5 w-5"/> Subject-Wise Toppers</h1>
      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <div className="flex gap-2">
            {data.map((batch) =>  <BatchTopperCard key={batch.batch_id} batch={batch} />)}
        </div>
      )}
    </div>
    )
 }
