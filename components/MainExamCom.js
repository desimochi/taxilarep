"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "./Loaader";
import { Calendar, CrossIcon, EditIcon } from "lucide-react";
import Toast from "./Toast";

export default function MainExamCom() {
  const [loading, setLoading] = useState(false);
  const [classSchedule, setClassSchedule] = useState([]);
  const [timeerror, setTimeError] = useState("")
  const [subjectMapping, setSubjectMapping] = useState([]);
   const[showToast, setShowToast] = useState(false)
  const [component, setComponent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const[message, setMessage] = useState("")
  const [actionType, setActionType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const today = new Date().toISOString().split("T")[0];
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
      date: "",
    start_time: "",
    duration : ""
  })
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [classRes, subRes, componentRes] = await Promise.all([
          authFetch("exam-viewset"),
          authFetch("batches-list"),
          authFetch("terms-list"),
        ]);

        const classData = await classRes.json();
        const subData = await subRes.json();
        const componentData = await componentRes.json(); // ✅ Fixed API response assignment

        setClassSchedule(Array.isArray(classData.data) ? classData.data : []);
        setSubjectMapping(subData.data);
        setComponent(Array.isArray(componentData.data) ? componentData.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);
  const handleCancelClick = (classId, type) => {
    setSelectedClass(classId);
    setActionType(type);
    setShowPopup(true);
};
const confirmCancel = async () => {
  if (!selectedClass) return;

  setLoading(true);
  try {
      const response = await authFetch(`exam-viewset/${selectedClass}/cancel`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) {
          throw new Error("Failed to cancel the exam.");
      }
      setMessage("Exam Cancelled Successfully")
      setShowToast(true)
      setTimeout(()=>{
        setMessage("")
        setShowToast(false)
          // window.location.reload()
      },2000)
  } catch (error) {
    setMessage(error.message)
    setShowToast(true)
    setTimeout(()=>{
      setMessage("")
      setShowToast(false)
        window.location.reload()
    },2000)
  } finally {
      setLoading(false);
      setShowPopup(false);
      setSelectedClass(null);
      setActionType("")
  }
};
const handleValueChange = (e) => {
  setStatus(e.target.value);
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
        const response = await authFetch(`exam-viewset/${selectedClass}`, {
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
        setMessage(error.message)
        setShowToast(true)
        setTimeout(()=>{
            setShowToast(false)
            setLoading(false);
        setSelectedClass(null);
        setActionType("")
            window.location.reload()
        },2000)
    } finally {
        
    }
};
const confirmStatus = async () => {
  if (!selectedClass) return;
  setLoading(true);
  try {
      const response = await authFetch(`exam-viewset/${selectedClass}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({is_active:status})
      });

      if (!response.ok) {
          throw new Error("Failed to update the class status.");
      }
      setMessage("Exam Status Updates Successfully")
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
      setMessage(error.message)
      setShowToast(true)
      setTimeout(()=>{
          setShowToast(false)
          setLoading(false);
      setSelectedClass(null);
      setActionType("")
          window.location.reload()
      },2000)
  } finally {
      
  }
};
const filteredSchedule = classSchedule.filter((item) =>
  item.subject?.toLowerCase().includes(searchTerm) ||
  item.date?.toLowerCase().includes(searchTerm) ||
  item.batch_name?.toLowerCase().includes(searchTerm)
);

  return (
    <>
     <div className="bg-white min-h-screen">
     {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                    {showToast && <Toast message={message}/>}
                    {actionType==="cancel"&& <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Are you sure you want to cancel this exam?</h2>
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
                        <h2 className="text-lg font-semibold">Are you sure you want to Reschedule this exam?</h2>
                        
                        <hr className="border border-b-2 mt-2 mb-3"/>
                            <label className="font-bold">Date</label>
                            <input type="date" min={today} value={formData.date} name="date" onChange={handleChange} className="w-full border border-gray-300 p-2 rounded"/>
                            <label className="font-bold mt-3">From </label>
                            <input type="time" name="start_time" value={formData.start_time} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded"/>
                            <div className="flex justify-between items-center"><label className="font-bold mt-3">To</label>{timeerror && <p className="text-xs text-red-600">{timeerror}</p>}</div>
                            <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded"/>
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
                    {actionType==="status"&& <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold">Change the Status of Examinaton</h2>
                        <hr className=" border border-b-2 mt-4 mb-6" />
                        <select onChange={handleValueChange} className="border border-gray-300 p-2 w-full rounded-sm">
                          <option defaultValue>Select A Status</option>
                          <option value='true'>Active</option>
                          <option value='false'>Inactive</option>
                        </select>
                        <div className="mt-4 flex justify-start gap-4">
                            
                            <button className="px-4 py-2 bg-green-600 text-white rounded-md" onClick={confirmStatus}>
                                Update Status
                            </button>
                        </div>
                    </div>}
                </div>
            )}
        <section className="relative">
           
           <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
           <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
           <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
           <div className="px-6">
          <div className="w-1/3">
            <h2 className="text-2xl font-bold">Main Exam Schedule</h2>
            <p className="text-gray-500 text-sm">Check the examination schedule</p>
          </div>
          <hr className="border border-b-2 mt-4 mb-4"/>
          <div className="flex gap-3">
          <input
  type="text"
  name="search"
  placeholder="search for subject...."
  className="border border-gray-300 p-2.5"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
/>
            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5">
            <option value="">All Batches</option>
  {subjectMapping.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))}
            </select>
            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5">
              <option value="" disabled selected>Select a Term</option>
  {component.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))}
            </select>
          </div>
        </div>
           </div>
      {loading ? (
        <FullWidthLoader />
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-8">
          <thead>
            <tr className="bg-red-50 text-red-800">
              <th className="border px-4 py-2">S.no.</th>
              <th className="border px-4 py-2">Term</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Exam Date</th>
              <th className="border px-4 py-2">Start Time</th>
              <th className="border px-4 py-2">Duration</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((row, index) => (
                <tr key={index} className="text-center border">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{row.term_name}</td>
                  <td className="border px-4 py-2">{row.subject_name}</td>
                  <td className="border px-4 py-2">{row.date}</td>
                  <td className="border px-4 py-2">{row.start_time}</td>
                  <td className="border px-4 py-2">{row.duration}</td>
                  <td className="border px-4 py-2">
  {row.is_active ? (
    <p className="text-sm bg-green-50 text-green-800 py.5 px-2 rounded-sm">Active</p>
  ) : row.is_cancel ? (
    <p className="text-sm bg-red-50 text-red-800 py.5 px-2 rounded-sm">Cancel</p>
  ) : (
    <p className="text-sm bg-violet-50 text-violet-800 py.5 px-2 rounded-sm">Rescheduled</p>
  )}
</td>
<td className="border px-4 py-2 flex items-center justify-center gap-2">
  <EditIcon className="h-5 w-5 text-green-800" onClick={() => handleCancelClick(row.id, "status")}/>
 {row.is_cancel &&  <CrossIcon className="h-5 w-5 rotate-45 text-red-800" onClick={() => handleCancelClick(row.id, "cancel")}/>}
  <Calendar className="h-5 w-5 text-violet-800" onClick={() => handleCancelClick(row.id, "reshed")}/>
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No schedule available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      </section>
      </div>
    </>
  );
}
