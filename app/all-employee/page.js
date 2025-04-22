"use client"
import { EyeIcon, LockIcon, PenSquareIcon, PlusCircleIcon, PlusIcon, Settings2Icon, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import Link from "next/link";
import Toast from "@/components/Toast";

export default function Page() {
    const [exams, setExams] = useState([]);
    const [loading, setLoading] = useState(true);
    const[message, setMessage] = useState("")
    const[showtoast, setShowToast] = useState(false)
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [newStatus, setNewStatus] = useState();
    const [newLock, setNewLock] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [showPopups, setShowPopups] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const filteredExams = exams.filter((exam) => {
        const name = `${exam.first_name} ${exam.last_name}`.toLowerCase();
        const email = exam.user?.email?.toLowerCase() || "";
        const query = searchQuery.toLowerCase();
        return name.includes(query) || email.includes(query);
      });
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await authFetch(`all-employee_list`); // Replace with your API URL
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
        setNewStatus(faculty.user?.is_active ? "Active" : "Inactive");
        setShowPopup(true);
    };
    const handleLockClick = (faculty) => {
        setSelectedFaculty(faculty);
        setNewStatus(faculty.user?.is_lock ? "Active" : "Inactive");
        setShowPopups(true);
    };

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };
    const handleLockChange = (e) => {
        setNewLock(e.target.value);
    };
    const handleSubmit = async () => {
        try {
            const response  = await authFetch(`employee-viewset/${selectedFaculty.id}/active`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_active: newStatus === "true" }),
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
    const handleSubmitLock = async () => {
        try {
            const response  = await authFetch(`employee-viewset/${selectedFaculty.id}/lock`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ is_lock: newLock === "true" }),
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
                <h1 className="text-3xl font-bold mb-2 font-sans">All Employee </h1>
                <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about all employee of Taxila Busines School</p>
                <hr className=" border  border-spacing-y-0.5 mb-6"/>
                <div className="mb-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                    <input
  type="text"
  placeholder="Search Faculty..."
  className="border p-2 rounded-md w-[240px]"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
                    <Link href={`/add-employee`} className="border border-gray-200 hover:bg-gray-100 text-gray-700 px-8 py-2 rounded flex items-center gap-2"> <PlusCircleIcon className="h-4 w-4"/>Employee</Link>
                    </div>
                    <button className="border border-gray-200 font-bold hover:bg-gray-100 text-gray-900 px-8 py-2 rounded flex items-center gap-2">
                       <Settings2Icon className="h-4 w-4"/> View
                    </button>
                   
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="text-gray-400 font-normal text-sm border-b">
                                <th className="p-3 text-left">S.No.</th>
                                <th className="p-3 text-left">Name </th>
                                <th className="p-3 text-left">Email</th>
                                <th className="p-3 text-left">Status</th>
                                <th className="p-3 text-left">Lock/Unlock</th>
                                <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredExams.map((exam, index) => (
                                    <tr key={index} className="border-b text-sm">
                                        <td className="p-3">{index+1}</td>
                                        <td className="p-3">{`${exam.first_name} ${exam.last_name}`}</td>
                                        <td className="p-3">{exam.user?.email}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded ${exam.user?.is_active ? "bg-green-100 text-green-800" : "bg-red-200 text-red-800"}`}>{exam.user?.is_active ? "Active" : "Inactive"}</span>
                                        </td>
                                        <td className="p-3"><span className={`px-2 py-1 rounded ${exam.user?.is_lock ? "bg-green-100 text-green-800" : "bg-red-200 text-red-800"}`}>{exam.user?.is_lock ? "Locked" : "Unlock"}</span></td>
                                        <td className="p-3 flex gap-4"><PenSquareIcon className="h-4 w-4 cursor-pointer" onClick={() => handleEditClick(exam)} /> <Link href ={`/all-faculty/details/${exam.id}`} className="text-red-500 text-xs cursor-pointer"><EyeIcon className="h-4 w-4 cursor-pointer"/></Link> <LockIcon className="h-4 w-4" onClick={() => handleLockClick(exam)}/></td>
                                        
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    {showPopup && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Change Faculty Status</h2>
                        <select className="border p-2 w-full rounded mb-4" value={newStatus} onChange={handleStatusChange}>
                            <option value="">Select A Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                        <div className="flex justify-end gap-2">
                            <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowPopup(false)}>Cancel</button>
                            <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            )}
            {showPopups && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-4">Lock/Unlock Faculty</h2>
                        <select className="border p-2 w-full rounded mb-4" value={newLock} onChange={handleLockChange}>
                            <option value="">Select A Status</option>
                            <option value="true">Lock</option>
                            <option value="false">Unlock</option>
                        </select>
                        <div className="flex justify-end gap-2">
                            <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowPopups(false)}>Cancel</button>
                            <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={handleSubmitLock}>Save</button>
                        </div>
                    </div>
                </div>
            )}
    </>
}
