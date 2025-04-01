"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { BanIcon, Calendar1Icon, SquareUserRoundIcon } from "lucide-react";
import Toast from "./Toast";



export default function ClassShedDis() {
  const [loading, setLoading] = useState(false);
  const [sclass, setsclass] = useState([]);
  const [timeerror, setTimeError] = useState("")
  const[message, setMessage] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedClass, setSelectedClass] = useState(null);
  const[showToast, setShowToast] = useState(false)
        const [showPopup, setShowPopup] = useState(false);
        const [actionType, setActionType] = useState("");
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
    try {
      const response = await authFetch(`class-schedule-viewset?page=${page}`);
      const data = await response.json();

      if (data && data.data) {
        setsclass(data.data);
        setTotalPages(data.extra?.total);
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
    <div className="p-4">
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
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-black text-white">
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
                      <tr key={cls.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3">{index + 1}</td>
                          <td className="px-6 py-3">{cls.mapping.term?.name}</td>
                          <td className="px-6 py-3">{cls.mapping.batch?.name}</td>
                          <td className="px-6 py-3">{cls.mapping.subject?.name}</td>
                          <td className="px-6 py-3">{`${cls.mapping.faculty?.first_name} ${cls.mapping.faculty?.last_name}`} </td>
                          <td className="px-6 py-3">{cls.date}</td>
                          <td className="px-6 py-3">{cls.start_time}</td>
                          <td className="px-6 py-3">{cls.end_time}</td>
                          <td className="px-6 py-3">
                {cls.is_cancel ? (
                  <span className="bg-red-600 text-sm text-white py-0.5 px-3 rounded-sm">Cancelled</span>
                ) : cls.is_complete ? (
                  <span className="bg-green-600 text-sm text-white py-0.5 px-3 rounded-sm">Completed</span>
                ) : (
                  <span className="bg-green-600 text-sm text-white py-0.5 px-3 rounded-sm">Scheduled</span>
                )}
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
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-300 text-gray-900">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => (prev + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-r disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
