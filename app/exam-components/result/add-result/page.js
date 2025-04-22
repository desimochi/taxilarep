"use client"
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation';
import { ArrowLeft, PenSquareIcon, SaveIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "@/components/Loaader";

import Link from "next/link";
import { GlobalContext } from "@/components/GlobalContext";
import Toast from "@/components/Toast";

export default function Page() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const[term, setTerm] = useState([])
    const[batch, setBatch] = useState([])
    const [message, setMessage] = useState("")
    const [showtoast, setShowToast] = useState(false)

    // First API call to get student data
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setLoading(true)
                const [ response, response1] = await Promise.all([
                    authFetch(`terms-list`),
                    authFetch(`batches-list`)  // Replace with your actual second API
                  ])
                if (!response.ok &&  !response1.ok) throw new Error("Failed to fetch data")
                const data =  await response.json()
                const data2 = await response1.json()
              setTerm(data.data)
              setBatch(data2.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClassData()
    }, [])
   
   async function handlesubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const batch = formData.get("batch")
        const term = formData.get("term")
        const is_active = formData.get("is_active")
        const type =  formData.get("type")
        const payload = {
            batch,
            term,
            is_active,
            type
        }
        try {
            setLoading(true)
            const response = await authFetch(`exam-result-viewset`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });
            const data =  await response.json()
            if ( !response.ok) throw new Error(data.message)
            setMessage("Added Successfully")
            setShowToast(true)
            setTimeout(()=>{
                setMessage("")
                setShowToast(false)
                router.push('/exam-components/result')
            }, 2000)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="bg-white min-h-screen">
        <section className="relative">
           {showtoast && <Toast message={message}/>}
           <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
           <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
           <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
           <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
            <div className="px-6 pt-8">
            <button 
                onClick={() => router.back()} 
                className="px-12 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
            <form className="mx-auto border border-gray-300 py-6 px-6 max-w-xl shadow-lg rounded-md" onSubmit={handlesubmit}>
                <h3 className="text-center text-red-800 text-xl font-bold">Add Result Announcement</h3>
                <hr className="border border-b-2 mt-3 mb-4"/>
                {error && <p className="text-red-600 text-sm">{error}</p>}
                <label className="font-bold mb-2">Batch</label> <br/>
                <select name="batch" className=" border border-x-gray-300 p-2 w-full mt-2">
                <option >Select A Batch</option>
                    {batch.map((item) =>(
                       <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <label className="font-bold mt-4">Term</label> <br/>
                <select  name = "term"className=" border border-x-gray-300 p-2 w-full mt-2">
                <option >Select A Term</option>
                    {term.map((item) =>(
                       <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                <label className="font-bold mb-2">Active Status</label> <br/>
                <select name="is_active" className=" border border-x-gray-300 p-2 w-full mt-2">
                <option >Select A Status</option>
                <option value='true'>Active</option>
                <option value='false'>Inactive</option>
                </select>
                <label className="font-bold mb-2">Exam Type</label> <br/>
                <select name="type" className=" border border-x-gray-300 p-2 w-full mt-2">
                <option >Select A Status</option>
                <option value='main'>Main</option>
                <option value='resit-2'>Resit-1</option>
                <option value='resit-1'>Resit-2</option>
                </select>
                <button type="submit" className="mt-4 mb-4 bg-red-800 flex items-center justify-center gap-1 text-white px-12 py-2 rounded-sm shadow-sm hover:shadow-xl transition-shadow"><SaveIcon className="h-4 w-4"/> Submit </button>
            </form>
          </div>
        </div>
        </section>
        </div>
    )
}
