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
import { hasPermission } from "@/app/lib/checkPermission";
import BackButton from "@/components/ui/Backbutton";

export default function Page(){
    const {id} = useParams()
    const {state} = useContext(GlobalContext)
    const router = useRouter()
      const [students, setStudents] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [submission, setSubmission] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const[editDetails, setEditDetails] = useState(false)
    const [additionalData, setAdditionalData] = useState([])
    const [selectedId, setSelectedId] = useState(null)
    const hasview = true
    const hasedit = hasPermission(("2f72526b4e3a64b84edd665637d72cdf5b00b0711640ab62061b5756fd8f16fe"))

    const handleDeleteComponent = async () => {
      if (!window.confirm('Delete this component? It will be hidden from the list but not removed from the database.')) {
        return;
      }
      try {
        setDeleteLoading(true);
        const response = await authFetch(`component-viewset/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to delete component');
        }
        const subjectId = typeof students?.subject_mapping === 'object' ? students?.subject_mapping?.id : students?.subject_mapping;
        if (subjectId) {
          router.push(`/subjects/details/${subjectId}`);
        } else {
          router.back();
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setDeleteLoading(false);
      }
    };

    const handleDeleteSubcomponent = async (subId) => {
      if (!window.confirm('Delete this subcomponent?')) return;
      try {
        setDeleteLoading(true);
        const response = await authFetch(`sub-component-item/${subId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to delete subcomponent');
        }
        // remove deleted subcomponent from UI
        setAdditionalData((prev) => prev.filter((s) => s.id !== subId));
      } catch (err) {
        setError(err.message);
      } finally {
        setDeleteLoading(false);
      }
    };

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
        if (!hasview){
            router.replace("/unauthorized")
        } else{
          fetchClassData()
        }
        
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

    if(!hasview){
      return null;
    }
    const handleOpenModal = (id, sub) => {
      console.log(sub)
        setSelectedId(id) // ✅ Set dynamic id
        setSubmission(sub)
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
        <div className="sm:px-6 py-6">
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
                                is_submission = {submission}
                            />
                          
                        </div>
                      </div>
                    </div>
            </>}
            <BackButton/>
            <div className=" mt-4 sm:px-4 mx-6 mb-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <div>
                        <h5 className="sm:text-3xl font-bold mb-2 font-sans">
                            {students?.name || 'N/A'} Component Details
                        </h5>
                        <p className="text-sm text-gray-500 mb-4">Everyhting you need to know about Your Component</p>
                        <div className="flex gap-2">
                            <p className="bg-red-100 text-red-800 rounded-sm text-sm px-2 py-0.5">
                                Type - {students?.type || 'N/A'}
                            </p>
                            <p className="bg-green-100 text-green-800 px-2 py-0.5 rounded-sm text-sm">
                                Max Marks - {students?.max_marks || 'N/A'}
                            </p>
                        </div>
                        </div>
                       {hasedit && <div className="flex flex-col sm:flex-row gap-3">
                        <Link href={`/exam-components/edit-component?componentID=${students?.id}`} className="bg-red-700 text-center mt-4 sm:mt-0 text-white py-1.5 px-8 rounded-sm shadow-lg">Edit Component</Link>
                        <button
                          type="button"
                          disabled={deleteLoading}
                          onClick={handleDeleteComponent}
                          className="bg-gray-700 text-center mt-4 sm:mt-0 text-white py-1.5 px-8 rounded-sm shadow-lg hover:bg-gray-900 disabled:opacity-50"
                        >
                          {deleteLoading ? 'Deleting...' : 'Delete Component'}
                        </button>
                       </div>}
                    </div>
                    <hr className=" border  border-spacing-y-0.5 mt-6"/>
                </div>
                
                {students?.has_subcomponents?<div className="grid grid-cols-1 gap-4">
  <div className="border border-gray-300 p-6 rounded-sm sm:mx-10 mt-4">
    <h3 className="bg-red-50 rounded-sm text-red-800 font-bold text-center py-1.5">
      Components Details
    </h3>
    <div className="flex justify-between mt-4">
      <p className="font-bold">Subcomponent</p>
      <p>{students?.has_subcomponents ? "Yes" : "No"}</p>
    </div>

    {!students?.has_subcomponents &&  (
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
          <p>{students?.end_date
    ? new Date(students.end_date).toLocaleString("en-IN", {
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
        has edit && (<button
          onClick={() => handleOpenModal(students?.id, students?.is_submission)}
          className="text-sm bg-red-600 w-full py-1.5 rounded-sm text-white shadow-sm hover:shadow-xl transition-shadow mt-6"
        >
          Add Component Dates & Data
        </button>)
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
                <div className="flex gap-2 items-center">
                  <span className=" flex gap-1 items-center text-sm text-red-600 underline"><EyeIcon className="h-4 w-4"/><Link href={`/subjects/details/component/sub-component/${subcomp.id}`}>See Details</Link></span>
                  <button
                    onClick={() => handleDeleteSubcomponent(subcomp.id)}
                    disabled={deleteLoading}
                    className="text-sm bg-gray-700 text-white px-2 py-1 rounded-sm"
                  >
                    Delete
                  </button>
                </div>
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
                  <p>{subcomp?.end_date ? new Date(subcomp.end_date).toLocaleString("en-IN", {
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
                  onClick={() => handleOpenModal(subcomp.id, subcomp?.is_submission)}
                  className="text-sm bg-red-600 w-full py-1.5 rounded-sm text-white shadow-sm hover:shadow-xl transition-shadow mt-6"
                >
                  Add Sub Component Dates & Data
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
</div>: <div className="grid sm:grid-cols-[1fr_2fr] gap-4">
  <div className="border border-gray-300 p-6 rounded-sm">
    <h3 className="bg-red-50 text-red-800 rounded-sm text-center py-1.5">
      Components Details
    </h3>

    {!students?.has_subcomponents && (
  <>
    {students?.is_submission === true && (
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
            {students?.end_date
              ? new Date(students.end_date).toLocaleString("en-IN", {
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
      </>
    )}
    <div className="flex justify-between mt-4">
          <p className="font-bold">Online Submission</p>
          <p>
            {students?.is_submission === true
              ? "Yes"
              : "No"}
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
      onClick={() => handleOpenModal(students?.id, students?.is_submission)}
      className="text-sm bg-red-600 w-full py-1.5 rounded-sm text-white shadow-sm hover:shadow-xl transition-shadow mt-6"
    >
      Add Component Data
    </button>
  </>
)}


    <div className="border border-b-2 mt-4"></div>
  </div>
  {students?.id ? <StudentAnswerSub id={students.id} subcomponent={false} is_submission={students?.is_submission} showmarks= {students?.is_marks_add_status} /> : <p>Loading...</p>}
</div>}

        </div>
        
    )
}