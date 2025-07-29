"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import DOMPurify from "dompurify";
import { ArrowLeft, BookIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from "react";
export default function Page(){
    const { id } = useParams();
      const { state } = useContext(GlobalContext);
     const router = useRouter()
    const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false) 
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setLoading(true)
                const response = await authFetch(`subject-mapping-notes/${id}`)
                if (!response.ok) throw new Error("Failed to fetch Subject data")

                const data = await response.json()
                if (data.data) setData(data.data) // ✅ No TypeError here
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClassData()
    }, [id])
    
    return(
        <div className="px-6 py-6">
            <button 
                onClick={() => router.back()} 
                className="px-12 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
          {error? <div><p className="text-center">No Notes Found</p> 
          
          </div>:  <div className={` py-8 px-12 `}>
                    <div className="flex justify-between items-center gap-2">
                      <div className="w-3/5">
                        <h5 className="text-2xl font-bold flex gap-1">
                          <BookIcon className="w-7 h-7" /> {data?.mapping?.subject?.name || "Subject Name"}
                        </h5>
                        <div className="flex gap-2 mt-2">
                            <span className="bg-green-50 py-0.5 px-2 text-xs rounded-sm text-green-800">{data?.mapping?.batch?.name || "Subject Name"}</span>
                            <span className="bg-red-50 py-0.5 px-2 text-xs rounded-sm text-red-800">{data?.mapping?.term?.name || "Subject Name"}</span>
                            <span className="bg-gray-100 py-0.5 px-2 text-xs rounded-sm text-gray-800"> {data?.mapping?.course?.map((course) => course.name).join(", ") || "No Course"}</span>
                        </div>
                      </div>
                      {state.user_type === "EMPLOYEE" && <div className=" flex gap-3">
                       <Link href={`/notes/edit-notes?subID=${id}`}><span className="border border-red-300 text-red-800 bg-red-50 py-2 px-8 rounded-sm shadow-sm hover:shadow-xl transition-shadow cursor-pointer">Edit Syllabus</span></Link>
                       
                      </div>}
                    </div>
                    <hr className="border border-b-2 mt-4 mb-6"/>
                  </div> }
                  
            <div>
            {data?.description && (
  <div 
    className="text-gray-800 text-sm leading-relaxed" 
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }} 
  />
)}
            </div>
        </div>
    )

}