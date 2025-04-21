"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { BanIcon, Calendar1Icon, SearchIcon, SquareUserRoundIcon } from "lucide-react";
import Toast from "./Toast";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";



export default function ClassShedDis() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sclass, setsclass] = useState([]);
  const [timeerror, setTimeError] = useState("")
  const[message, setMessage] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [terms, setTerms] = useState([]);
   const [subjectas, setSubjectas] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState('');
      const [filteredSubjects, setFilteredSubjects] = useState([]);
      const [selectedSubject, setSelectedSubject] = useState('');
  const[showToast, setShowToast] = useState(false)
        const [showPopup, setShowPopup] = useState(false);
        const [actionType, setActionType] = useState("");
        const [s_date, setStartDate] = useState('');
        const [e_date, setEndDate] = useState('');
const [formData, setFormData] = useState({
    date: "",
  start_time: "",
  end_time : ""
})

  useEffect(() => {
    fetchAllData(currentPage);
  }, [currentPage]);

  const fetchAllData = async (page) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedTerm) params.append('mapping__term', selectedTerm);
    if (selectedSubject) params.append('mapping', selectedSubject);
    if (s_date) params.append('s_date', s_date);
    if (e_date) params.append('e_date', e_date);
    if (currentPage) params.append('page', currentPage);
    try {
      const response = await authFetch(`class-schedule-viewset?${params.toString()}`);
      const data = await response.json();

      if (data && data.data) {
        setsclass(data.data);
        setTotalPages(data.extra?.total);
        const uniqueTerms = Array.from(
          new Map(
              data.data
                  .filter(item => item.mapping && item.mapping.term)
                  .map(item => [item.mapping.term.id, item.mapping.term])
          ).values()
      );
      setTerms(uniqueTerms);

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
      } else {
        setClassSchedule([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setClassSchedule([]);
    } finally {
      setLoading(false);
    }
  };

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
        if (selectedTerm) params.append('mapping__term', selectedTerm);
        if (selectedSubject) params.append('mapping', selectedSubject);
        if (s_date) params.append('s_date', s_date);
        if (e_date) params.append('e_date', e_date);
        if (currentPage) params.append('page', currentPage);

        const url = `class-schedule-viewset?${params.toString()}`;

        const response = await authFetch(url);
        if (!response.ok) throw new Error("Failed to fetch filtered data");

        const data = await response.json();
        setsclass(data.data);
        setTotalPages(data.extra?.total);
        setCurrentPage(1)
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
  return (
    <div className="px-12 py-16">
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
          <div className="flex justify-between items-center">
            <div>
         <h1 className="text-3xl font-bold mb-2 font-sans">Class Schedule </h1>
                    <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Class Schedule</p>
                    </div>
                    <Link href={`/add-class`} className="bg-red-800 text-green-50 px-8 py-2 rounded-sm shadow-sm hover:shadow-xl transition-shadow">Add Class</Link>
                    </div>          
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
                <button className="flex gap-1 justify-center w-fit border bg-gray-500 py-2 px-8 text-white rounded-sm hover:bg-gray-100 hover:text-red-800 transition duration-300 ease-in-out items-center" onClick={handleSubmit}><SearchIcon className="h-4 w-4"/> Search</button>
                       
                           </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="overflow-x-auto w-full text-center">
            <thead className="min-w-full border border-red-200 rounded-lg">
              <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
                <th className="border px-4 py-2">S.no.</th>
                <th className="border px-4 py-2">Term</th>
                <th className="border px-4 py-2">Batch</th>
                <th className="border px-4 py-2">Subject</th>
                <th className="border px-4 py-2">Faculty</th>
                <th className="border px-4 py-2">Class Date</th>
                <th className="border px-4 py-2">Start Time</th>
                <th className="border px-4 py-2">End Time</th>
                <th className="border px-4 py-2">Staus</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              { sclass.length > 0 ? (
                  sclass.map((cls, index) => (
                    <tr key={cls.id} className="border-b text-sm hover:bg-gray-50">
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{cls.mapping.term?.name}</td>
                    <td className="px-6 py-3">{cls.mapping.batch?.name}</td>
                    <td className="px-6 py-3">{cls.mapping.subject?.name}</td>
                    <td className="px-6 py-3">{cls.mapping.faculty?.first_name} {cls.mapping.faculty?.last_name}</td>
                    <td className="px-6 py-3">{cls.date}</td>
                    <td className="px-6 py-3">{cls.start_time}</td>
                    <td className="px-6 py-3">{cls.end_time}</td>
                    <td className="px-6 py-3">
          {cls.is_cancel ? (
            <span className="bg-red-100 text-sm text-red-800 py-0.5 px-3 rounded-sm">Cancelled</span>
          ) : cls.is_complete ? (
            <Link href={`attendance/class-attendance/${cls.id}`} className="bg-gray-100 text-sm text-gray-800 py-0.5 px-3 rounded-sm"><EyeIcon className="h-4 w-4"/></Link>
          ) : cls.is_ready_for_attendance ? (
            <span className="bg-violet-100 text-sm text-violet-800 py-0.5 px-3 rounded-sm">Attendance Not Marked</span>
          ) : (<span className="bg-green-100 text-sm text-green-800 py-0.5 px-3 rounded-sm">Scheduled</span>)}
        </td>
                          <td className="px-6 py-3 flex gap-3 items-center">{!cls.is_cancel && <button className="bg-green-600 text-white rounded-sm py-1 px-2" onClick={() => handleCancelClick(cls.id, "cancel")}><BanIcon className="h-5 w-5 cursor-pointer"/></button>} <button className="bg-red-600 text-white rounded-sm py-1 px-2">{!cls.is_complete? <Calendar1Icon className="h-5 w-5 cursor-pointer" onClick={() => handleCancelClick(cls.id, "reshed")}/> : <SquareUserRoundIcon  className="h-5 w-5"/>}</button></td>
                      </tr>
                  ))
              ) : (
                  <tr>
                      <td colSpan={4} className="text-center py-4">No Class Schedule</td>
                  </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => (prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-gray-100 rounded-l disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-900">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => (prev + 1))}
          disabled={currentPage === totalPages}
          className="px-8 py-2 bg-red-800 text-red-50 rounded-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
