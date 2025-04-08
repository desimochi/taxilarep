"use client"
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";

export default function Page() {
    const { id } = useParams()
    const router = useRouter()
    const [students, setStudents] = useState([])
    const [loading, setLoading] = useState(false)
    const [subName, setSubName] = useState("")
    const [date, setDate] = useState("")
    const [message, setMessage] = useState('')
    const [showToast, setShowToast] = useState(false)
    const [error, setError] = useState(false)
    const [search, setSearch] = useState("")
    const [presentStudents, setPresentStudents] = useState([])

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setLoading(true)
                const response = await authFetch(`mark-attendance/${id}`)
                if (!response.ok) throw new Error("Failed to fetch student data")

                const data = await response.json()
                setStudents(data.data?.students)
                setSubName(data.data?.class_schedule?.mapping?.subject?.name)
                setDate(data.data?.class_schedule?.date)
                // ✅ Set presentStudents state based on is_persent value
                const initiallyPresent = data.data.students
                    .filter(student => student.is_persent)
                    .map(student => student.id)

                setPresentStudents(initiallyPresent)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClassData()
    }, [id])

    const handleAttendanceChange = (studentId, isPresent) => {
        if (isPresent) {
            setPresentStudents(prev =>
                prev.includes(studentId) ? prev : [...prev, studentId]
            )
        } else {
            setPresentStudents(prev =>
                prev.filter(id => id !== studentId)
            )
        }
    }

    const handleSubmit = async () => {
        try {
            const response = await authFetch(`mark-attendance/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    present_students: presentStudents
                }),
            })

            if (!response.ok) throw new Error("Failed to submit attendance")

            setMessage("Attendance Marked Successfully")
            setShowToast(true)
        } catch (err) {
            alert(err.message)
        }
    }
    const filteredStudents = students.filter((student) => {
        const firstName = student.first_name?.toLowerCase() || "";
        const middleName = student.middle_name?.toLowerCase() || "";
        const lastName = student.last_name?.toLowerCase() || "";
        const query = search.toLowerCase();
    
        return (
            firstName.includes(query) ||
            middleName.includes(query) ||
            lastName.includes(query)
        );
    });
    return (
        <section className="relative ">
            {showToast && <Toast message={message} />}
        <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
        <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
        <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
        <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
        <div className="px-12 py-6">
            <button 
                onClick={() => router.back()} 
                className="px-6 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
            <h1 className="text-2xl font-bold mb-2 font-sans px-6 mt-6">{subName} Class Attendance  - {date}</h1>
            <p className="text-sm text-gray-500 mb-8 px-6">Everyhting you need to know about Your Class Schedule</p>
            <hr className=" border  border-spacing-y-0.5 mb-6 px-6"/>
            <input type="text" placeholder="search..."  className="p-2 mx-6 mb-6 border border-gray-300 rounded-sm text-gray-700"  value={search} onChange={(e) => setSearch(e.target.value)}/>
            
            {/* Loading & Error Handling */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Table */}
            {!loading && !error && (
                <div className="overflow-x-auto px-6">
                    <table className="overflow-x-auto w-full text-center">
                        <thead className="min-w-full border border-red-200 rounded-lg">
                            <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
                                <th scope="col" className="px-6 py-3">S.No.</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Enrollment No.</th>
                                <th scope="col" className="px-6 py-3">Present</th>
                                <th scope="col" className="px-6 py-3">Absent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={student.id} className="border-b text-sm">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">
                                        {`${student.first_name} ${student.middle_name || ''} ${student.last_name}`}
                                    </td>
                                    <td className="px-6 py-4">
                                        {student.enrollment_number}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.id}`}
                                                    value="present"
                                                    checked={presentStudents.includes(student.id)}
                                                    onChange={() => handleAttendanceChange(student.id, true)}
                                                    className="accent-green-800"
                                                />
                                                Present
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-1">
                                                <input
                                                    type="radio"
                                                    name={`attendance-${student.id}`}
                                                    value="absent"
                                                    checked={!presentStudents.includes(student.id)}
                                                    onChange={() => handleAttendanceChange(student.id, false)}
                                                    className="accent-red-800"
                                                />
                                                Absent
                                            </label>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Submit Button */}
            <div className="flex mx-6">
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
                Submit Attendance
            </button>
            </div>
        </div>
        </div>
        </section>
    )
}
