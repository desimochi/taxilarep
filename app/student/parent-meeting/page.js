"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import BackButton from "@/components/ui/Backbutton";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Page(){
    const [loading, setLoading] = useState(false)
    const [exams, setExams] = useState([])
    const {state} = useContext(GlobalContext)

      useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await authFetch(`student-wise-parents-meeting/${state.user_id}`); // Replace with your API URL
                const data = await response.json();
                setExams(data.data);
            } catch (error) {
                console.error("Error fetching exams:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExams();
    }, []);
    return (
        <div className="px-8 py-12">
            <BackButton />
            <div className="px-12 mt-5">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Parents Meetings</h1>
                        <p className="text-gray-700 text-sm">Check all the information about parents meeting with Taxila Business School</p>
                    
                    </div>
                    <Link className="bg-red-800 px-8 py-2 rounded text-white" href={"/student/add-parent-meeting"}>Add A Meeting</Link>
                </div>
                <hr className="border border-b-2 border-gray-200 mt-5 mb-8" />

                {loading? <FullWidthLoader/> : <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="text-red-800 font-normal text-sm border-b">
                                <th className="p-3 text-left">S.No.</th>
                                <th className="p-3 text-left">Name </th>
                                 <th className="p-3 text-left">Realtion</th>
                                <th className="p-3 text-left">Mobile No.</th>
                                <th className="p-3 text-left">Meeting Date</th>
                                <th className="p-3 text-left">Meeting Time</th>
                                <th className="p-3 text-left">comments</th>
                                <th className="p-3 text-left">Desc.</th>
                                <th className="p-3 text-left">Student</th>
                            </tr>
                        </thead>
                        <tbody>
                        {exams.length>0 ? exams.map((exam, index) => (
                                    <tr key={index} className="border-b text-sm">
                                        <td className="p-3">{index+1}</td>
                                        <td className="p-3">{`${exam.person_name}`}</td>
                                        <td className="p-3">{exam.relation}</td>
                                        <td className="p-3">{exam.contact_number}</td>
                                        <td className="p-3">{exam.meeting_date}</td>
                                        <td className="p-3">{exam.meeting_time}</td>
                                        <td className="p-3">{exam?.comment? exam.comment : "NA"}</td>
                                        <td className="p-3">{exam.short_description}</td>
                                        <td className="p-3">{exam.student?.first_name}</td>
                                       
                                       
                                        
                                    </tr>
                                )) : <tr><td colSpan={9} className="text-center text-sm p-3 text-gray-700">No Meetings Created Till Now</td></tr>}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    )
}