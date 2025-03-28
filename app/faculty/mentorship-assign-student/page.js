"use client"
import { authFetch } from "@/app/lib/fetchWithAuth"
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { useContext, useEffect, useState } from "react"

export default function Page(){
    const [mentee, setMentee] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false)
    const { state } = useContext(GlobalContext);

    useEffect(() => {
        const fetchedMentorshipData = async () => {
            try {
                setLoading(true)
                const response = await authFetch(`membership-viewset/students-by-faculty/${state.user_id}`);
                const result = await response.json();
                if(response.ok){
                  setMentee(result.data);
                  setLoading(false)
                } 
            } catch (error) {
                alert("Not Able to Fetch");
            }
        }
        fetchedMentorshipData();
    }, [state.user_id]);

    // Filter mentees based on full name or email
    const filteredMentees = Array.isArray(mentee) ? mentee.filter(stu => {
        const fullName = `${stu?.first_name || ""} ${stu?.middle_name || ""} ${stu?.last_name || ""}`.toLowerCase();
        return (
            fullName.includes(searchTerm.toLowerCase()) || 
            (stu?.user?.email || "").toLowerCase().includes(searchTerm.toLowerCase())
        );
    }) : [];

    return (
        <div className="px-6 py-8">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white py-8">
                <div className="flex justify-between items-center px-6">
                    <div className="w-2/5">
                        <h5 className="text-xl font-bold">Mentorship - Assigned Student</h5>
                        <p className="text-sm">Assigned student list</p>
                    </div>
                    <div className="w-1/5"></div>
                    <div className="w-1/5"></div>
                    <div className="w-1/5">
                        <div className="flex gap-2">
                            <input 
                                type="text" 
                                placeholder="Search by name or email..." 
                                className="p-2 rounded-sm text-gray-700 w-full border border-gray-300" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {loading?<FullWidthLoader/> :<table className="w-full text-sm text-left mt-4">
                <thead className="text-xs uppercase bg-black text-white">
                    <tr>
                        <th className="px-6 py-3">S.No.</th>
                        <th className="px-6 py-3">Student Name</th>
                        <th className="px-6 py-3">Enrollment No.</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Batch</th>
                        <th className="px-6 py-3">Course</th>
                        <th className="px-6 py-3">See Details</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredMentees.length > 0 ? (
                        filteredMentees.map((stu, index) => (
                            <tr key={stu.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 border-r-2 border-l-2">{index + 1}</td>
                                <td className="px-6 py-4 border-r-2">
                                    {`${stu?.first_name || ""} ${stu?.middle_name || ""} ${stu?.last_name || ""}`.trim() || "N/A"}
                                </td>
                                <td className="px-6 py-4 border-r-2">
                                    {stu?.enrollment_number || "N/A"}
                                </td>
                                <td className="px-6 py-4 border-r-2">
                                    {stu?.user?.email || "N/A"}
                                </td>
                                <td className="px-6 py-4 border-r-2">
                                    {stu?.batch?.name || "N/A"}
                                </td>
                                <td className="px-6 py-4 border-r-2">
                                    {stu?.course?.name || "N/A"}
                                </td>
                                <td className="px-6 py-4">
                                   <Link href={`/students/details/${stu.id}`} ><button className="bg-blue-500 text-white px-3 py-1 rounded">
                                        Details
                                    </button> </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="px-6 py-4 text-center">No students Assigned Yet</td>
                        </tr>
                    )}
                </tbody>
            </table>
}
        </div>
    )
}
