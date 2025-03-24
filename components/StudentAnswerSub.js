import { useState, useEffect } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { Edit2Icon, Edit3Icon, EyeOffIcon, ScanEyeIcon, View } from "lucide-react";
import { EyeDropperIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function StudentAnswerSub({ id, subcomponent }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = subcomponent? 'student-subcomponent-answer' : 'student-component-answer'
        const fetchClassData = async () => {
            try {
                setLoading(true);
                const response = await authFetch(`${url}/${id}`);
                
                if (!response.ok) throw new Error("Failed to fetch Subject data");

                const result = await response.json();
                setData(result.data || []);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

         fetchClassData(); // Ensure `id` exists before making API call
    }, [id, subcomponent]);

    return (
        <div className="border border-gray-300 p-6 rounded-sm h-fit">
            <div className="flex justify-between">
            <h3 className="border rounded-sm text-black font-bold text-center py-1.5 px-4">
                Students Answer Submission
            </h3>
            <Link href={`/subjects/details/component/add-marks/${id}?subcomp=${subcomponent?'true':'false'}`} className="bg-red-700 rounded-sm text-white font-bold text-center py-1.5 px-6">Add Marks</Link>
            </div>
            

            {loading ? (
                <p className="text-center py-4">Loading...</p>
            ) : error ? (
                <p className="text-center py-4 text-red-500">Failed to load data.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-300 rounded-sm mt-4">
                    <thead>
                        <tr className="bg-gray-300 text-gray-800">
                            <th className="border px-4 py-2">S.no.</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Enrollment No.</th>
                            <th className="border px-4 py-2">Submitted</th>
                            <th className="border px-4 py-2">See Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((student, index) => (
                                <tr key={student.id} className="text-center">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                        {student.first_name} {student.middle_name} {student.last_name}
                                    </td>
                                    <td className="border px-4 py-2">{student.enrollment_number}</td>
                                    <td className="border px-4 py-2">
                                        {student.submitted ? <span className="text-sm bg-green-600 py-0.5 px-1 rounded-sm text-white">Yes</span> : <span className="text-sm py-0.5 px-1 rounded-sm bg-red-600 text-white">No</span>}
                                    </td>
                                    <td className="border px-4 py-2 flex gap-1 items-center">{student.submitted ? <ScanEyeIcon className="h-5 w-5 text-red-600"/> : <EyeOffIcon className="h-5 w-5"/> } {student.submitted ? <Link className="text-red-600 underline text-sm" href={`/subjects/details/component/answer/${student.id}?compId=${id}&subcomp=${subcomponent?'true':'false'}`}>See Details</Link> : <p className="text-sm">Not Available</p> }</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center border px-4 py-2">
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}
