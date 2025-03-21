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
        <div className="px-6 py-6">
            {/* Back Button */}
            <button 
                onClick={() => router.back()} 
                className="px-6 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>

            {/* Loading & Error Handling */}
            {loading && <FullWidthLoader />}
            {error && <p className="text-red-500">{error}</p>}

            {/* Render only if students data is available */}
            {!loading && !error && students && (
                <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-8 mx-6 mb-8">
                    <div className="flex justify-between items-center">
                        <h5 className="text-2xl font-bold">
                            {students?.subject?.name || 'N/A'} Subject Details
                        </h5>
                        <div className="flex gap-2">
                            <p className="bg-red-600 px-4 py-1 rounded-sm">
                                Batch - {students?.batch?.name || 'N/A'}
                            </p>
                            <p className="bg-green-600 px-4 py-1 rounded-sm">
                                Term - {students?.term?.name || 'N/A'}
                            </p>
                            <p className="bg-black px-4 py-1 rounded-sm">
                                Specialization - {students?.specialization?.map(spec => spec.name).join(', ') || 'N/A'}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Table */}
            {!loading && !error && (
                <div className="flex gap-2 px-6">
                    <div className="w-1/4">
                        <div className="border border-gray-300 p-6 rounded-sm">
                            <h3 className="bg-black rounded-sm text-white text-center py-1.5">Components Details</h3>
                            {additionalData.map((comp) => (
                                <div className="flex justify-between mt-4" key={comp.id}>
                                    <p className="font-bold">{comp.name} - {comp.max_marks} Marks </p>
                                    <Link href={`/subjects/details/component/${comp.id}`} className="text-sm underline text-blue-500">
                                        See Details
                                    </Link>
                                </div>
                            ))}
                            {students?.id && (
                                <Link href={`/exam-components/component-manager/create-component?subID=${students.id}`}>
                                    <div className="text-center border border-gray-600 py-1 mt-6 rounded-sm">
                                        Create Component
                                    </div>
                                </Link>
                            )}
                        </div>
                        <div className="border border-gray-300 p-6 rounded-sm mt-3">
                            <h3 className="bg-black rounded-sm text-white text-center py-1.5">Upcoming Classes</h3>
                        </div>
                    </div>
                    <div className="w-3/4">
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
    )
}
