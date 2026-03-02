"use client"
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import { useReactToPrint } from 'react-to-print';
import { useEffect, useState, useRef } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import DOMPurify from "dompurify";
import BackButton from "@/components/ui/Backbutton";
import VideoAssignmentPage from "@/components/VideoEPGDM";

export default function Page() {
    const { id } = useParams()
    const router = useRouter()
    const componentRef = useRef();
    const [students, setStudents] = useState(null)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [additionalData, setAdditionalData] = useState([])
     const [isCEPresent, setIsCEPresent] = useState(false);

    // First API call to get student data
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setLoading(true)
                const response = await authFetch(`subject-mapping-viewset/${id}`)
                const response2 = await authFetch(`subject-mapping-syllabus/${id}`)
                if (!response.ok) throw new Error("Failed to fetch Subject data")

                const data = await response.json()
                const data2 = await response2.json()
                if (data.data) setStudents(data.data) // ✅ No TypeError here
                setData(data2.data)
            
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
                    const ceExists = data.data.some(item => item.name === 'Performance Score');
                    setIsCEPresent(ceExists);
                } catch (err) {
                    setError(err.message)
                }
            }

            fetchAdditionalData()
        }
    }, [students?.id])

    const handlePrint = useReactToPrint({
        contentRef: componentRef,
        documentTitle: 'Class Description',
        removeAfterPrint: true,
    });
    const data1 = { description: data?.description };
    return (
        <div className="sm:px-6 py-6">
            {/* Back Button */}
            <BackButton/>

            {/* Loading & Error Handling */}
            {loading && <FullWidthLoader />}
            {error && <p className="text-red-500">{error}</p>}

            {/* Render only if students data is available */}
            {!loading && !error && students && (
                <div className=" sm:p-8 mx-6 mb-3">
                    <div className="flex justify-between items-center mt-2">
                        <h5 className="text-2xl font-bold">
                            {students?.subject?.name || 'N/A'} Subject Details
                        </h5>
                        
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mt-2">
                            <p className="bg-red-50 text-red-800 px-4 py-1 rounded-sm">
                                Batch - {students?.batch?.name || 'N/A'}
                            </p>
                            <p className="bg-green-50 text-green-800 px-4 py-1 rounded-sm">
                                Term - {students?.term?.name || 'N/A'}
                            </p>
                            <p className="bg-gray-100 text-gray-800 px-4 py-1 rounded-sm">
                                Specialization - {students?.specialization?.map(spec => spec.name).join(', ') || 'N/A'}
                            </p>
                            <Link className="bg-gray-800 text-gray-100 px-4 py-1 rounded-sm" href={`/notes/see-notes/${id}`} >See Notes/Study Material</Link>
                        </div>
                        <hr className="border border-b-2 mt-6"/>
                </div>
            )}

            {/* Table */}
            {!loading && !error && (
                <div className="flex flex-col sm:flex-row gap-2 px-2 sm:px-12">
                    <div className="sm:w-1/4 order-2 sm:order-1">
                        <div className="border border-gray-300 p-6 rounded-sm">
                            <h3 className="bg-red-50 rounded-sm text-red-800 text-center py-1.5 font-bold">Components Details</h3>
                            {additionalData.map((comp) => (
  <div className="flex justify-between mt-4" key={comp.id}>
    <p className="font-bold text-sm">{comp.name} - {comp.max_marks} Marks</p>
    
    {comp.name === 'Performance Score' && isCEPresent ? (
      <span className="text-xs bg-gray-200 text-gray-500 py-0.5 px-2 rounded-sm cursor-not-allowed opacity-70">
        See Details
      </span>
    ) : (
      <Link
        href={`/student/subject/component/${comp.id}`}
        className="text-xs bg-green-50 text-green-800 py-0.5 px-2 rounded-sm"
      >
        See Details
      </Link>
    )}
  </div>
))}
                        </div>
                    </div>
                    <div className="sm:w-3/4 order-1 sm:order-2">
                        <div className="border border-gray-300 p-6 rounded-sm">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 ">
                                <div className="  border-r-2 text-center">
                                    <p className="font-sans font-bold text-xl">
                                        {students?.faculty?.first_name + " " + students?.faculty?.last_name || 'N/A'}
                                    </p>
                                    <p className="text-xs text-gray-600">Assign Faculty</p>
                                </div>
                                <div className="  border-r-2 text-center">
                                    <p className="font-sans font-bold text-xl">{students?.total_classes || 'N/A'}</p>
                                    <p className="text-xs text-gray-600">Total Classes</p>
                                </div>
                                <div className="  border-r-2 text-center">
                                    <p className="font-sans font-bold text-xl">{students?.classes_completed || 0}</p>
                                    <p className="text-xs text-gray-600">Completed Classes</p>
                                </div>
                                <div className="  border-r-2 text-center">
                                    <p className="font-sans font-bold text-xl">{students?.weightage_external || 'N/A'}</p>
                                    <p className="text-xs text-gray-600">External Weightage</p>
                                </div>
                                <div className="  text-center">
                                    <p className="font-sans font-bold text-xl">{students?.weightage_internal || 'N/A'}</p>
                                    <p className="text-xs text-gray-600">Internal Weightage</p>
                                </div>
                            </div>
                            
                        </div>
                        <div className="p-4 border border-gray-300 rounded-sm mt-4">
                            <p>{students?.course?.name} </p>
                            {students?.course[0]?.name ==='EPGDM' && <VideoAssignmentPage id={students?.id} />}
                            {students?.course.name!=='EPGDM' && <> <div className="flex flex-col sm:flex-row justify-between bg-red-50 p-2 py-5 rounded-sm ">
                            <h3 className=" font-bold text-xl px-4 text-red-800">Syllabus of {students?.subject?.name || 'N/A'}</h3>
                            <button className="text-white mx-4 bg-red-800 py-1 px-8 rounded-sm" onClick={handlePrint}>Download PDF</button>
                        </div>
                        {data?.description && (
  <div ref={componentRef}
    className="text-gray-800 text-sm leading-relaxed p-4" 
    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }} 
  />
)}</> }
</div>
                    </div>
                </div>
            )}
            
        </div>
    )
}
