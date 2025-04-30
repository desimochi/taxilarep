"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext } from "react";
import FullWidthLoader from "@/components/Loaader";
import { BanIcon, Calendar1Icon, PlusCircleIcon, SearchIcon, Settings2Icon, SquareUserRoundIcon } from "lucide-react";
import Toast from "@/components/Toast";
import Link from "next/link";
export default function Page(){
    const [loading, setLoading] = useState(false);
    const [timeerror, setTimeError] = useState("")
      const [error, setError] = useState(false);
      const[message, setMessage] = useState("")
      const[showToast, setShowToast] = useState(false)
      const [showPopup, setShowPopup] = useState(false);
      const { state } = useContext(GlobalContext);
        const [sclass, setsclass] = useState([]);
        const [actionType, setActionType] = useState("");
        const [terms, setTerms] = useState([]);
    const [subjectas, setSubjectas] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState('');
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
const [s_date, setStartDate] = useState('');
const [e_date, setEndDate] = useState('');
const [selectedClass, setSelectedClass] = useState(null);
const [formData, setFormData] = useState({
    date: "",
  start_time: "",
  end_time : ""
})
    useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const [response, response1] = await Promise.all([
            await authFetch(`faculty-wise-class-filter/${state.user_id}`)

        ])
        if (!response.ok && !response1.ok) throw new Error("Failed to Fetch the data");

        const data = await response.json();

        setsclass(data.data);
        const uniqueTerms = Array.from(
            new Map(
                data.data
                    .filter(item => item.mapping && item.mapping.term)
                    .map(item => [item.mapping.term.id, item.mapping.term])
            ).values()
        );
        setTerms(uniqueTerms);
        
        // Get subjects
        const uniqueSubjects = Array.from(
            new Map(
                data.data
                    .filter(item => item.mapping && item.mapping.term && item.mapping.subject)
                    .map(item => [item.mapping.subject.name, { 
                        termId: item.mapping.term.id, 
                        subjectMappingId: item.mapping.id, 
                        subjectName: item.mapping.subject.name 
                    }])
            ).values()
        );
        setSubjectas(uniqueSubjects);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchclassData();
  }, [state.user_id,]);
  const handleTermChange = (e) => {
    const termId = e.target.value;
    setSelectedTerm(termId);
    const filtered = subjectas.filter(sub => sub.termId.toString() === termId);
    setFilteredSubjects(filtered);
};
const handleSubmit = async () => {
    try {
        setLoading(true);

        // Build dynamic query
        const params = new URLSearchParams();
        if (selectedTerm) params.append('term', selectedTerm);
        if (selectedSubject) params.append('mapping', selectedSubject);
        if (s_date) params.append('s_date', s_date);
        if (e_date) params.append('e_date', e_date);

        const url = `faculty-wise-class-filter/${state.user_id}?${params.toString()}`;

        const response = await authFetch(url);
        if (!response.ok) throw new Error("Failed to fetch filtered data");

        const data = await response.json();
        setsclass(data.data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}
const handleCancelClick = (classId, type) => {
    setSelectedClass(classId);
    setActionType(type);
    setShowPopup(true);
};
const today = new Date().toISOString().split("T")[0];
const confirmCancel = async () => {
    if (!selectedClass) return;

    setLoading(true);
    try {
        const response = await authFetch(`class-schedule-viewset/${selectedClass}/cancel`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to cancel the class.");
        }
        setMessage("Class Cancelled Successfully")
        setShowToast(true)
        setTimeout(()=>{
            setshowToast(false)
            window.location.reload()
        },2000)
    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
    } finally {
        setLoading(false);
        setShowPopup(false);
        setSelectedClass(null);
        setActionType("")
    }
};
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
};
const confirmReschdule = async () => {
    if (!selectedClass) return;
    if (formData.start_time && formData.end_time && formData.start_time >= formData.end_time) {
        setTimeError("End Time Must Be Greater then Start Time")
        return;
    }
    setLoading(true);
    try {
        const response = await authFetch(`class-schedule-viewset/${selectedClass}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Failed to cancel the class.");
        }
        setMessage("Class Rescheduled Successfully")
        setShowToast(true)
        setTimeout(()=>{
            setShowToast(false)
            setLoading(false);
        setShowPopup(false);
        setSelectedClass(null);
        setActionType("")
            window.location.reload()
        },2000)
    } catch (error) {
        console.error("Error:", error);
        alert(error.message);
    } finally {
        
    }
};
    return(
    <div className="bg-white min-h-screen">
     {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    {showToast && <Toast message={message}/>}
                    {actionType==="cancel"&& <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Are you sure you want to cancel this class?</h2>
                        <div className="mt-4 flex justify-end gap-4">
                            <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => setShowPopup(false)}>
                                No
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={confirmCancel}>
                                Yes, Cancel
                            </button>
                        </div>
                    </div>}
                    {actionType==="reshed"&& <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Are you sure you want to Reschedule this class?</h2>
                        
                        <hr className="border border-b-2 mt-2 mb-3"/>
                            <label className="font-bold">Date</label>
                            <input type="date" min={today} value={formData.date} name="date" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded"/>
                            <label className="font-bold mt-3">From </label>
                            <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded"/>
                            <div className="flex justify-between items-center"><label className="font-bold mt-3">To</label>{timeerror && <p className="text-xs text-red-600">{timeerror}</p>}</div>
                            <input type="time" name="end_time" value={formData.end_time} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded"/>
                        <hr className="border border-b-2 mt-2 mb-3"/>
                        <div className=" flex justify-end gap-4 ">
                            <button className="px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => setShowPopup(false)}>
                                No
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded-md" onClick={confirmReschdule}>
                                Yes, Reschedule
                            </button>
                        </div>
                    </div>}
                </div>
            )}
        <section className="relative">
           
        <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
        <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
        <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
        <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
        <div className="py-4 px-5">
            
            <div>
            <div className="w-full px-12 py-6">
            <h1 className="text-3xl font-bold mb-2 font-sans">Class Schedule </h1>
            <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Your Class Schedule</p>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
            <div className="mb-4 flex items-center justify-between ">
                <div className="w-1/5">
            <select value={selectedTerm} onChange={handleTermChange} className=" w-full border border-gray-300 rounded-sm p-2 text-gray-500 ">
                <option value="">Select Term</option>
                {terms.map(term => (
                    <option key={term.id} value={term.id}>{term.name}</option>
                ))}
            </select>
            </div>
            <div className="w-1/5">
            <select onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedTerm} className=" border w-full border-gray-300 rounded-sm p-2 text-gray-500">
                <option value="">Select Subject</option>
                {filteredSubjects.map(sub => (
                    <option key={sub.subjectMappingId} value={sub.subjectMappingId}>
                        {sub.subjectName}
                    </option>
                ))}
            </select>
        </div>
        <div className="w-1/5">
            <input type="date" className="w-full border border-gray-300 rounded-sm p-1 text-gray-500" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="w-1/5">
            <input type="date" className="w-full border border-gray-300 rounded-sm p-1 text-gray-500" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button className="flex gap-1 justify-center w-fit border bg-red-700 py-2 px-8 text-white rounded-sm hover:bg-red-100 hover:text-red-800 transition duration-300 ease-in-out items-center" onClick={handleSubmit}><SearchIcon className="h-4 w-4"/> Search</button>
               
                   </div>
        
            <div>
            {loading? <FullWidthLoader/> :     <table className="overflow-x-auto w-full text-center" >
                            <thead className="min-w-full border border-red-200 rounded-lg">
             
                         <tr className="text-red-700 bg-red-50 font-normal text-sm border-b" >
                                <th scope="col" className="px-6 py-3">S.No.</th>
                                <th scope="col" className="px-6 py-3">Batch</th>
                                <th scope="col" className="px-6 py-3">Subject Name</th>
                                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Date.</th>
               
                <th scope="col" className="px-6 py-3">From</th>
                <th scope="col" className="px-6 py-3">To</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Action</th>
           
                         </tr>
                
            </thead>
            <tbody>
            { sclass.length > 0 ? (
    sclass.map((cls, index) => (
        <tr key={cls.id} className="border-b text-sm hover:bg-gray-50">
            <td className="px-6 py-3">{index + 1}</td>
            <td className="px-6 py-3">{cls.mapping.batch?.name}</td>
            <td className="px-6 py-3">{cls.mapping.subject?.name}</td>
            <td className="px-6 py-3">{cls.mapping?.type  ==="main"? <span className="text-sm text-green-800 bg-green-50 rounded-sm px-2 py-.5 border">main</span>:<span className="text-sm text-red-800 bg-red-50 rounded-sm px-2 py-.5 border">{product.type}</span>}</td>
            <td className="px-6 py-3">{cls.date}</td>
            <td className="px-6 py-3">{cls.start_time}</td>
            <td className="px-6 py-3">{cls.end_time}</td>
            <td className="px-6 py-3">
  {cls.is_cancel ? (
    <span className="bg-red-100 text-sm text-red-800 py-0.5 px-3 rounded-sm">Cancelled</span>
  ) : cls.is_complete ? (
    <span className="bg-gray-100 text-sm text-gray-800 py-0.5 px-3 rounded-sm">Completed</span>
  ) : cls.is_ready_for_attendance ? (
    <Link href={`/attendance/class-attendance/${cls.id}`} className="bg-violet-100 text-sm text-violet-800 py-0.5 px-3 rounded-sm">Mark Attendance</Link>
  ) : (<span className="bg-green-100 text-sm text-green-800 py-0.5 px-3 rounded-sm">Scheduled</span>)}
</td>
            <td className="px-6 py-3 flex gap-3 items-center justify-center">{!cls.is_cancel && <button className="bg-green-100 text-green-800 rounded-sm py-1 px-2" onClick={() => handleCancelClick(cls.id, "cancel")}><BanIcon className="h-5 w-5 cursor-pointer"/></button>} <button className="bg-red-100 text-red-800 rounded-sm py-1 px-2">{!cls.is_complete && !cls.is_cancel && !cls.is_ready_for_attendance? <Calendar1Icon className="h-5 w-5 cursor-pointer" onClick={() => handleCancelClick(cls.id, "reshed")}/> : <SquareUserRoundIcon  className="h-5 w-5"/>}</button></td>
        </tr>
    ))
) : (
    <tr>
        <td colSpan={4} className="text-center py-4">No Class Schedule</td>
    </tr>
)}
            
    
            </tbody>
                            </table>}
            </div>
        </div>
            </div>
            </div>
        </div>
         </section>
         </div>
    
    )
}

