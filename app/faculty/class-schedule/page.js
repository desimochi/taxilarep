"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext } from "react";
import FullWidthLoader from "@/components/Loaader";
import { BanIcon, Calendar1Icon, SquareUserRoundIcon } from "lucide-react";
import Toast from "@/components/Toast";
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
            await authFetch(`faculty-wise-class/${state.user_id}`)

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
        <div className="py-4 px-5">
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
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
            <div>
            <div className="w-full">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-2/5">
                <h5 className="text-2xl font-bold">Class Schedule</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className=" flex w-full gap-2 items-start">
                <div className="w-1/5">
            <select value={selectedTerm} onChange={handleTermChange} className=" w-full border border-gray-300 rounded-sm p-2 text-black">
                <option value="">Select Term</option>
                {terms.map(term => (
                    <option key={term.id} value={term.id}>{term.name}</option>
                ))}
            </select>
            </div>
            <div className="w-1/5">
            <select onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedTerm} className=" border w-full border-gray-300 rounded-sm p-2 text-black">
                <option value="">Select Subject</option>
                {filteredSubjects.map(sub => (
                    <option key={sub.subjectMappingId} value={sub.subjectMappingId}>
                        {sub.subjectName}
                    </option>
                ))}
            </select>
        </div>
        <div className="w-1/5">
            <input type="date" className="w-full border border-gray-300 rounded-sm p-1 text-black" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="w-1/5">
            <input type="date" className="w-full border border-gray-300 rounded-sm p-1 text-black" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button className=" bg-green-600 text-white p-1.5 px-12 rounded-sm" onClick={handleSubmit}>Submit</button>
                </div>
                </div>
                
            </div>
            <div>
            {loading? <FullWidthLoader/> :     <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
             
                         <tr >
                                <th scope="col" className="px-6 py-3">S.No.</th>
                                <th scope="col" className="px-6 py-3">Batch</th>
                                <th scope="col" className="px-6 py-3">Subject Name</th>
                <th scope="col" className="px-6 py-3">Date.</th>
               
                <th scope="col" className="px-6 py-3">From</th>
                <th scope="col" className="px-6 py-3">To</th>
                <th scope="col" className="px-6 py-3">Action</th>
           
                         </tr>
                
            </thead>
            <tbody>
            { sclass.length > 0 ? (
    sclass.map((cls, index) => (
        <tr key={cls.id} className="hover:bg-gray-50">
            <td className="px-6 py-3">{index + 1}</td>
            <td className="px-6 py-3">{cls.mapping.batch?.name}</td>
            <td className="px-6 py-3">{cls.mapping.subject?.name}</td>
            <td className="px-6 py-3">{cls.date}</td>
            <td className="px-6 py-3">{cls.start_time}</td>
            <td className="px-6 py-3">{cls.end_time}</td>
            <td className="px-6 py-3 flex gap-3 items-center">{!cls.is_cancel && <button className="bg-green-600 text-white rounded-sm py-1 px-2" onClick={() => handleCancelClick(cls.id, "cancel")}><BanIcon className="h-5 w-5 cursor-pointer"/></button>} <button className="bg-red-600 text-white rounded-sm py-1 px-2">{!cls.is_complete? <Calendar1Icon className="h-5 w-5 cursor-pointer" onClick={() => handleCancelClick(cls.id, "reshed")}/> : <SquareUserRoundIcon  className="h-5 w-5"/>}</button></td>
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
    
    )
}

