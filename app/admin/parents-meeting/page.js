"use client"
import { EyeIcon, LockIcon, PenSquareIcon, PlusCircleIcon, PlusIcon, Settings2Icon, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Link from "next/link";
import Toast from "@/components/Toast";
import FullWidthLoader from "@/components/Loaader";

export default function Page() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const[message, setMessage] = useState("")
    const[showtoast, setShowToast] = useState(false)
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [newStatus, setNewStatus] = useState();
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await authFetch(`parent-meeting-viewset`); // Replace with your API URL
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

    const handleEditClick = (faculty) => {
        setSelectedFaculty(faculty);
        setShowPopup(true);
    };
 

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response  = await authFetch(`parent-meeting-viewset/${selectedFaculty.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ comment: newStatus }),
            });
            if(!response.ok){
                throw new Error("Someting Went Wrong")
            }
            setMessage("Faculty Staus Updated Succcessfully")
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false)
                window.location.reload()
            },2000)
        } catch (error) {
            setMessage("Something Went Wrong")
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false)
            },2000)
        }
    };
   
    return<>
    <div className="px-6 py-4">
    {showtoast && <Toast message={message}/>}
    <div className="p-6 min-h-screen">
            <div className="bg-white p-6 rounded-lg">
                <h1 className="text-3xl font-bold mb-2 font-sans">All Meetings Details </h1>
                <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about parents meetings  of Taxila Busines School</p>
                <hr className=" border  border-spacing-y-0.5 mb-6"/>
              
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
                                <th className="p-3 text-left">Action</th>
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
                                        <td className="p-3">{exam.student.first_name}</td>
                                       
                                        <td className="p-3 flex gap-4"><PenSquareIcon className="h-4 w-4 cursor-pointer" onClick={() => handleEditClick(exam)} /> </td>
                                        
                                    </tr>
                                )) : <tr><td colSpan={9} className="text-center text-sm p-3 text-gray-700">No Meetings Created Till Now</td></tr>}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    </div>
    {showPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Add Comments</h2>
                        <textarea rows={3} className="border p-2 w-full rounded mb-4" value={newStatus} onChange={handleStatusChange} />
                            
                        <div className="flex justify-end gap-2">
                            <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowPopup(false)}>Cancel</button>
                            <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            )}
       
    </>
}
