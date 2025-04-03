"use client"
import { authFetch } from "@/app/lib/fetchWithAuth"
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import { EyeIcon } from "lucide-react";
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
        <section className="relative">
    <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
    <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
    <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
    <div className="w-full pt-12 px-16 relative z-10 backdrop-blur-3xl min-h-screen">
    <h1 className="text-3xl font-bold mb-2 font-sans">Mentorship Assigned Students </h1>
            <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Your Mentorship Responsbilities</p>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
            <div className="flex gap-2 justify-between">
                            <input 
                                type="text" 
                                placeholder="Search by name or email..." 
                                className="p-2 rounded-sm text-gray-700 w-fit border border-gray-300" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
        <div className="">
        

            {loading?<FullWidthLoader/> :<table className="overflow-x-auto w-full text-center mt-4">
                <thead className="min-w-full border border-red-200 rounded-lg">
                    <tr  className="text-red-700 bg-red-50 font-normal text-sm border-b">
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
                            <tr key={stu.id} className="border-b text-sm">
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
                                <td className="px-6 py-4 flex items-center justify-center">
                                   <Link href={`/students/details/${stu.id}`} className="font-medium text-green-800 bg-green-100 px-2 py-0.5 rounded-sm text-xs border border-green-200 hover:underline flex items-center w-fit">
                                     <EyeIcon className="h-4 w-4"  /> Details </Link>
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
        </div>
        </section>
    )
}
