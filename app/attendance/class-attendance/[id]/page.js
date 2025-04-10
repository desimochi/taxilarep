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
    const [studentData, setStudentData] = useState([]);
    const [value, setValue] = useState('');
    const [compfe, setcomfe]= useState(1)
    const [isCEPresent, setIsCEPresent] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
    
                // 1️⃣ Fetch class data
                const response = await authFetch(`mark-attendance/${id}`);
                if (!response.ok) throw new Error("Failed to fetch student data");
    
                const data = await response.json();
    
                setStudents(data.data?.students);
                setSubName(data.data?.class_schedule?.mapping?.subject?.name);
                setDate(data.data?.class_schedule?.date);
                const compfeId = data.data?.class_schedule?.mapping?.id;
                setcomfe(compfeId);
    
                const initialData = data.data.students.map(student => ({
                    id: student.id,
                    is_persent: student.is_persent,
                    ce_marks: student.ce_marks
                }));
                setStudentData(initialData);
    
                // 2️⃣ Fetch component data using compfeId
                if (compfeId) {
                    const compResponse = await authFetch(`component-subject-wise/${compfeId}`);
                    if (!compResponse.ok) throw new Error("Failed to fetch CE data");
    
                    const compData = await compResponse.json();
                    const ceExists = compData.data.some(item => item.name === 'CE');
                    setIsCEPresent(ceExists);
                }
    
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
    
        fetchAllData();
    }, [id]);
    

    const handleAttendanceChange = (studentId, isPresent) => {
        setStudentData(prev =>
            prev.map(s =>
                s.id === studentId ? { ...s, is_persent: isPresent } : s
            )
        );
    };
    const handleCeMarksChange = (studentId, marks) => {
        setStudentData(prev =>
            prev.map(s =>
                s.id === studentId ? { ...s, ce_marks: marks } : s
            )
        );
    };
    const handleSubmit = async () => {
        try {
            const response = await authFetch(`mark-attendance/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    student_class_info: studentData
                }),
            })

            if (!response.ok) throw new Error("Failed to submit attendance")

            setMessage("Attendance Marked Successfully")
            setShowToast(true)
        } catch (err) {
            setMessage(err.message)
            setShowToast(false)
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
        <>
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
            <div className="flex justify-between items-center mb-6">
            <input type="text" placeholder="search..."  className="p-2 mx-6 border border-gray-300 rounded-sm text-gray-700"  value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
            Submit Attendance
        </button>
            </div>
           
            
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
                                {isCEPresent && <th scope="col" className="px-6 py-3">CE Marks</th>}
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
                                                    checked={
                                                        studentData.find((s) => s.id === student.id)?.is_persent === true
                                                      }
                                                      onChange={() => handleAttendanceChange(student.id, true)}
                                                    className="accent-green-800 "
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
                                                    checked={
                                                        studentData.find((s) => s.id === student.id)?.is_persent === false
                                                      }
                                                      onChange={() => handleAttendanceChange(student.id, false)}
                                                    className="accent-red-800"
                                                />
                                                Absent
                                            </label>
                                        </div>
                                    </td>
                                    {isCEPresent && <td className="px-6 py-4">
                                    <input
      type="number"
      step="0.5"
      min="0"
      max="5"
      value={
        studentData.find(s => s.id === student.id)?.ce_marks ?? ''
    }
    onChange={(e) => {
        const marks = e.target.value;
        if (marks === '' || (parseFloat(marks) <= 5 && (parseFloat(marks) * 10) % 5 === 0)) {
            handleCeMarksChange(student.id, marks === '' ? '' : parseFloat(marks));
        }
    }}
      className="border border-gray-500 px-3 py-2 rounded"
      disabled ={
        studentData.find((s) => s.id === student.id)?.is_persent === false
      }
    />
                                    </td>}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Submit Button */}
            
        </div>
        </div>
        
        </section>
        
        </>
    )
}
