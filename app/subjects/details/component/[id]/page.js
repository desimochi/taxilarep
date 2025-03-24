"use client"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, EyeClosedIcon, EyeIcon } from "lucide-react"
import DOMPurify from 'dompurify';
import { authFetch } from "@/app/lib/fetchWithAuth"
import Link from "next/link"
import { GlobalContext } from "@/components/GlobalContext"
import { useContext, useEffect, useState } from "react"
import ComponentDate from "@/components/ComponentDate"
import { EyeDropperIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import StudentAnswerSub from "@/components/StudentAnswerSub";

export default function Page(){
    const {id} = useParams()
    const {state} = useContext(GlobalContext)
    const router = useRouter()
      const [students, setStudents] = useState(null)
      const[subcom, setSubcom] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const[editDetails, setEditDetails] = useState(false)
    const [additionalData, setAdditionalData] = useState([])
    const [selectedId, setSelectedId] = useState(null)

      useEffect(() => {
        const fetchClassData = async () => {
            try {
                setLoading(true)
                const response = await authFetch(`component-viewset/${id}`)
                if (!response.ok) throw new Error("Failed to fetch Subject data")

                const data = await response.json()
                if (data.data) setStudents(data.data) // ✅ No TypeError here
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClassData()
    }, [id])
    useEffect(() => {
        if(students?.has_subcomponents){
            const fetchClassData = async () => {
                try {
                    setLoading(true)
                    const response = await authFetch(`sub-component/${id}`)
                    if (!response.ok) throw new Error("Failed to fetch Subject data")
    
                    const data = await response.json()
                    setAdditionalData(data.data) // ✅ No TypeError here
                } catch (err) {
                    setError(err.message)
                } finally {
                    setLoading(false)
                }
            }
    
            fetchClassData()
        }
      
    }, [students?.has_subcomponents, id])
    const handleOpenModal = (id) => {
        setSelectedId(id) // ✅ Set dynamic id
        setEditDetails(true)
    }
    const handleSetData = (data) => {
        if (students?.has_subcomponents) {
            setAdditionalData(data)
        } else {
            setStudents(data)
        }
    }
    return(
        <div className="px-6 py-6">
            {editDetails && <>
            <div
                      id="crud-modal"
                      className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
                    >
                      <div className="relative p-4 w-full max-w-3xl max-h-full">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-xl shadow-sm dark:bg-gray-700">
                          {/* Modal header */}
                          <div className="flex items-center justify-between p-6 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                             Add Component Dates and Data
                            </h3>
                            <button
                              onClick={()=>setEditDetails(false)}
                              className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              <svg
                                className="w-3 h-3"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Close modal</span>
                            </button>
                          </div>
                          <ComponentDate 
                                id={selectedId} 
                                setsetStudents={handleSetData} 
                                setEditDetails={setEditDetails} 
                                subcomponent={students?.has_subcomponents}
                            />
                          
                        </div>
                      </div>
                    </div>
            </>}
             <button 
                onClick={() => router.back()} 
                className="px-6 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-8 mx-6 mb-8">
                    <div className="flex justify-between items-center">
                        <h5 className="text-2xl font-bold">
                            {students?.name || 'N/A'} Component Details
                        </h5>
                        <div className="flex gap-2">
                            <p className="bg-red-600 px-4 py-1 rounded-sm">
                                Type - {students?.type || 'N/A'}
                            </p>
                            <p className="bg-green-600 px-4 py-1 rounded-sm">
                                Max Marks - {students?.max_marks || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
                {students?.has_subcomponents?<div className="grid grid-cols-1 gap-4">
  <div className="border border-gray-300 p-6 rounded-sm">
    <h3 className="bg-black rounded-sm text-white text-center py-1.5">
      Components Details
    </h3>
    <div className="flex justify-between mt-4">
      <p className="font-bold">Subcomponent</p>
      <p>{students?.has_subcomponents ? "Yes" : "No"}</p>
    </div>

    {!students?.has_subcomponents && (
      <>
        <div className="flex justify-between mt-4">
          <p className="font-bold">Start Date</p>
          <p>{students?.start_date
    ? new Date(students.start_date).toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      })
    : "NA"}</p>
        </div>
        <div className="flex justify-between mt-4">
          <p className="font-bold">End Date</p>
          <p>{students?.start_date
    ? new Date(students.start_date).toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      })
    : "NA"}</p>
        </div>
        <button
          onClick={() => handleOpenModal(students?.id)}
          className="text-sm bg-red-600 w-full py-1.5 rounded-sm text-white shadow-sm hover:shadow-xl transition-shadow mt-6"
        >
          Add Component Dates & Data
        </button>
      </>
    )}

    <div className="border border-b-2 mt-4"></div>

    {students?.has_subcomponents && (
      <div className="mt-4">
        <h3 className="font-bold bg-red-700 w-fit px-3 py-0.5 text-red-100 rounded-sm">
          Subcomponent Details
        </h3>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {additionalData.length > 0 ? (
            additionalData.map((subcomp) => (
              <div key={subcomp.id} className="border p-4 rounded-sm">
                <div className="flex justify-between items-center">
                <h5 className="mt-3 font-bold">{subcomp.name}</h5>
                <span className=" flex gap-1 items-center text-sm text-red-600 underline"><EyeIcon className="h-4 w-4"/><Link href={`/subjects/details/component/sub-component/${subcomp.id}`}>See Details</Link></span>
                </div>
                    
                <hr className="border border-b-2 border-red-600 w-12 mt-1" />
                <div className="flex justify-between mt-4">
                  <p className="font-bold">Start Date</p>
                  <p>{subcomp?.start_date ? new Date(subcomp.start_date).toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      }) : "NA"}</p>
                </div>
                <div className="flex justify-between mt-4">
                  <p className="font-bold">End Date</p>
                  <p>{subcomp?.end_date ? new Date(subcomp.start_date).toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
      }) : "NA"}</p>
                </div>
                <button
                  onClick={() => handleOpenModal(subcomp.id)}
                  className="text-sm bg-red-600 w-full py-1.5 rounded-sm text-white shadow-sm hover:shadow-xl transition-shadow mt-6"
                >
                  Add Component Dates & Data
                </button>
              </div>
            ))
          ) : (
            <Link href={`/exam-components/create-subcomponent?componentId=${id}`} className="bg-black px-8 py-2 rounded-sm text-white w-fit">Add Sub-Component</Link>
          )}
          
        </div>
      </div>
    )}
  </div>
</div>: <div className="grid grid-cols-[1fr_2fr] gap-4">
  <div className="border border-gray-300 p-6 rounded-sm">
    <h3 className="bg-black rounded-sm text-white text-center py-1.5">
      Components Details
    </h3>

    {!students?.has_subcomponents && (
      <>
        <div className="flex justify-between mt-4">
          <p className="font-bold">Start Date</p>
          <p>
            {students?.start_date
              ? new Date(students.start_date).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZoneName: "short",
                })
              : "NA"}
          </p>
        </div>
        <div className="flex justify-between mt-4">
          <p className="font-bold">End Date</p>
          <p>
            {students?.start_date
              ? new Date(students.start_date).toLocaleString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  timeZoneName: "short",
                })
              : "NA"}
          </p>
        </div>
        <div>
          <h4 className="text-red-700 font-bold text-xl mt-4">Description</h4>
          <hr className="w-20 border border-b-2 mt-1 mb-4" />
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(students?.description),
            }}
          />
        </div>
        <button
          onClick={() => handleOpenModal(students?.id)}
          className="text-sm bg-red-600 w-full py-1.5 rounded-sm text-white shadow-sm hover:shadow-xl transition-shadow mt-6"
        >
          Add Component Dates & Data
        </button>
      </>
    )}

    <div className="border border-b-2 mt-4"></div>
  </div>
  {students?.id ? <StudentAnswerSub id={students.id} subcomponent={false} /> : <p>Loading...</p>}
</div>}

        </div>
        
    )
}