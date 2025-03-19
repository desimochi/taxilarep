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
                if(data.data)
                setStudents(data.data)

                // ✅ Set presentStudents state based on is_persent value
                const initiallyPresent = data.data
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
        <div className="px-6 py-6">
            {/* Toast */}
            {showToast && <Toast message={message} />}

            {/* Back Button */}
            <button 
                onClick={() => router.back()} 
                className="px-6 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-8 mx-6 mb-8">
          <div className="flex justify-between items-center">
            <h5 className="text-2xl font-bold">Class Attendance</h5>
           
            <div className="flex gap-2">
            <input type="text" placeholder="search..."  className="p-2 rounded-sm text-gray-700"  value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
        </div>
            {/* Loading & Error Handling */}
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Table */}
            {!loading && !error && (
                <div className="overflow-x-auto px-6">
                    <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
                        <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">S.No.</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Enrollment No.</th>
                                <th scope="col" className="px-6 py-3">Present</th>
                                <th scope="col" className="px-6 py-3">Absent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStudents.map((student, index) => (
                                <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
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
    )
}
