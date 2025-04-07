"use client"
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "@/components/Loaader";

import Link from "next/link";

export default function Page() {
    const { id } = useParams()
    const router = useRouter()
    const [students, setStudents] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [additionalData, setAdditionalData] = useState([])

    // First API call to get student data
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setLoading(true)
                const response = await authFetch(`subject-mapping-viewset/${id}`)
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

    // Second API call based on students.id
    useEffect(() => {
        if (students?.id) {
            const fetchAdditionalData = async () => {
                try {
                    // ✅ Keep loading state separate for second API call if needed
                    const response = await authFetch(`component-subject-wise/${students.id}`)
                    if (!response.ok) throw new Error("Failed to fetch additional data")

                    const data = await response.json()
                    setAdditionalData(data.data || [])
                } catch (err) {
                    setError(err.message)
                }
            }

            fetchAdditionalData()
        }
    }, [students?.id])

    return (
        <div className="bg-white min-h-screen">
        <section className="relative">
           
           <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
           <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
           <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
           <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
            <div className="px-6 py-6">
            <button 
                onClick={() => router.back()} 
                className="px-12 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
            {!loading && !error && students && <div className="w-full px-12 py-6">
            
            <h1 className="text-3xl font-bold mb-2 font-sans">  {students?.subject?.name || 'N/A'} Subject Details </h1>
            <p className="text-sm text-gray-500 mb-4">Everyhting you need to know about Your Subject</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 text-sm mb-6">
                <p className="bg-red-50 text-red-800 px-4 py-1 rounded-sm">
                                Batch - {students?.batch?.name || 'N/A'}
                            </p>
                            <p className="bg-green-50 text-green-800 px-4 py-1 rounded-sm">
                                Term - {students?.term?.name || 'N/A'}
                            </p>
                            <p className="bg-gray-100 text-black px-4 py-1 rounded-sm">
                                Specialization - {students?.specialization?.map(spec => spec.name).join(', ') || 'N/A'}
                            </p>
                </div>
                <div className="flex gap-2 text-sm mb-6">
                        <Link className="bg-red-700 text-white py-1.5 px-8 rounded-sm shadow-lg" href={`/attendance/class-attendance`}>Attendance</Link>
                        <Link className="bg-green-700 text-white py-1.5 px-8 rounded-sm shadow-lg" href={`/syllabus/see-syllabus/${students?.id}`}>Syllabus</Link>
                </div>
                           
                        </div>
            <hr className=" border  border-spacing-y-0.5 mb-"/>
            </div>}
            </div>
        <div className="px-12">
           

            {/* Loading & Error Handling */}
            {loading && <FullWidthLoader />}
            {error && <p className="text-red-500">{error}</p>}

            {/* Table */}
            {!loading && !error && (
                <div className="flex gap-2 px-6">
                    <div className="w-2/6">
                        <div className="border border-gray-300 p-6 rounded-sm">
                            <h3 className="bg-red-50 text-red-800 font-bold rounded-sm text-center py-1.5">Components Details</h3>
                            {additionalData.map((comp) => (
                                <div className="flex justify-between mt-4" key={comp.id}>
                                    <p className="font-bold text-sm">{comp.name} - {comp.max_marks} Marks </p>
                                    <Link href={`/subjects/details/component/${comp.id}`} className="text-xs bg-blue-100 text-blue-800 py-0.5 px-2 rounded-sm">
                                        See Details
                                    </Link>
                                </div>
                            ))}
                            {students?.id && (
                                <Link href={`/exam-components/component-manager/create-component?subID=${students.id}`}>
                                    <div className="text-center border border-red-800 text-red-800 py-1 mt-6 rounded-sm hover:bg-red-800 hover:text-white transition ease-linear duration-200 cursor-pointer">
                                        Create Component
                                    </div>
                                </Link>
                            )}
                        </div>
                        <div className="border border-gray-300 p-6 rounded-sm mt-3">
                            <h3 className="bg-red-50 rounded-sm text-red-800 font-bold text-center py-1.5">Upcoming Classes</h3>
                        </div>
                    </div>
                    <div className="w-4/6">
                        <div className="border border-gray-300 p-6 rounded-sm">
                            <div className="flex">
                                <div className="w-1/3 border-r-2 text-center">
                                    <p className="font-sans font-bold text-xl">
                                        {students?.faculty?.first_name + " " + students?.faculty?.last_name || 'N/A'}
                                    </p>
                                    <p className="text-xs text-gray-600">Assign Faculty</p>
                                </div>
                                <div className="w-1/3 border-r-2 text-center">
                                    <p className="font-sans font-bold text-xl">{students?.total_classes || 'N/A'}</p>
                                    <p className="text-xs text-gray-600">Total Classes</p>
                                </div>
                                <div className="w-1/3 border-r-2 text-center">
                                    <p className="font-sans font-bold text-xl">{students?.classes_completed || 0}</p>
                                    <p className="text-xs text-gray-600">Completed Classes</p>
                                </div>
                                <div className="w-1/3 border-r-2 text-center">
                                    <p className="font-sans font-bold text-xl">{students?.weightage_external || 'N/A'}</p>
                                    <p className="text-xs text-gray-600">External Weightage</p>
                                </div>
                                <div className="w-1/3 text-center">
                                    <p className="font-sans font-bold text-xl">{students?.weightage_internal || 'N/A'}</p>
                                    <p className="text-xs text-gray-600">Internal Weightage</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </div>
        </section>
        </div>
    )
}
