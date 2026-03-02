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
    const [newStatus, setNewStatus] = useState("");
    const [desc, setDesc] = useState("");
    const [email, setEmail] = useState("")
    const [type, setType] = useState("");
    const [showPopups, setShowPopups] = useState(false);
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await authFetch(`ticket-category-viewset`); // Replace with your API URL
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

    const handleEditClick = (type, faculty) => {
        setSelectedFaculty(faculty);
        setType(type);
        setShowPopups(true);
    };
 const handleAddClick = (type) => {
        setType(type);
        setShowPopups(true);
    };

    const handleStatusChange = (e) => {
        setNewStatus(e.target.value);
    };
const handledescChange = (e) => {
        setDesc(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response  = await authFetch(`ticket-category-viewset/${selectedFaculty.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newStatus, description:desc }),
            });
            if(!response.ok){
                throw new Error("Someting Went Wrong")
            }
            setMessage("Ticket Category Updated Succcessfully")
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
    const handleNewSubmit = async () => {
        try {
            const response  = await authFetch(`ticket-category-viewset`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newStatus, description:desc, email:email }),
            });
            if(!response.ok){
                throw new Error("Someting Went Wrong")
            }
            setMessage("Ticket Category Added Succcessfully")
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
                <div className="flex justify-between items-center">
                    <div>
                            <h1 className="text-3xl font-bold mb-2 font-sans">Tickets Category </h1>
                <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about parents meetings  of Taxila Busines School</p>
                    </div>
                    <button onClick={()=>handleAddClick('Add')} className="bg-red-100 border border-red-800 text-red-800 flex gap-1 px-8 py-2 rounded"><PlusCircleIcon className="h-5 w-5"/>Add A Category</button>
                </div>
                
                <hr className=" border  border-spacing-y-0.5 mb-6"/>
              
               {loading? <FullWidthLoader/> : <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="text-red-800 font-normal text-sm border-b">
                                <th className="p-3 text-left">S.No.</th>
                                <th className="p-3 text-left">Name </th>
                                 <th className="p-3 text-left">Description</th>
                                 <th className="p-3 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {exams.length>0 ? exams.map((exam, index) => (
                                    <tr key={index} className="border-b text-sm">
                                        <td className="p-3">{index+1}</td>
                                        <td className="p-3">{`${exam.name}`}</td>
                                        <td className="p-3">{exam.description}</td>
                                        <td className="p-3 flex gap-4"><PenSquareIcon className="h-4 w-4 cursor-pointer" onClick={() => handleEditClick("Edit",exam)} /> </td>
                                        
                                    </tr>
                                )) : <tr><td colSpan={9} className="text-center text-sm p-3 text-gray-700">No Tickets Category Created Till Now</td></tr>}
                        </tbody>
                    </table>
                </div>}
            </div>
        </div>
    </div>
          {showPopups && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-sm text-gray-900 font-bold mb-4">{type} A Category</h2>
                        <input placeholder="Enter Name" className="border p-2 w-full rounded mb-4" value={newStatus} onChange={handleStatusChange} />
                        <input type="email" placeholder="Enter Email" className="border p-2 w-full rounded mb-4" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        <textarea rows={3} placeholder="Short Description" className="border p-2 w-full rounded mb-4" value={desc} onChange={handledescChange} />   
                        <div className="flex justify-end gap-2">
                            <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowPopups(false)}>Cancel</button>
                            <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={type==="Add"? handleNewSubmit : handleSubmit}>Save</button>
                        </div>
                    </div>
                </div>
            )}
    </>
}
