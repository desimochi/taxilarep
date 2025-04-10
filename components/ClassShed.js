"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { BanIcon, Calendar1Icon, CalendarArrowUp, CrossIcon, SearchIcon, SquareUserRoundIcon } from "lucide-react";
import Toast from "./Toast";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import BulkClassShed from "./BulkClassShed";



export default function ClassShedDis() {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weekdays, setWeekdays] = useState({});
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
const [formData, setFormData] = useState({
    date: "",
  start_time: "",
  end_time : ""
})
const weekdayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    fetchAllData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const temp = {};

      weekdayNames.forEach(day => {
        temp[day] = { selected: false, start_time: '', end_time: '' };
      });

      setWeekdays(temp);
    }
  }, [startDate, endDate,setWeekdays, weekdayNames]);
  const fetchAllData = async (page) => {
    setLoading(true);
    try {
      const response = await authFetch(`subject-mapping-viewset?page=${page}`);
      const data = await response.json();

      if (data && data.data) {
        setsclass(data.data);
        setTotalPages(data.extra?.total);
        const uniqueTerms = Array.from(
          new Map(
              data.data
                  .filter(item => item.term)
                  .map(item => [item.term.id, item.term])
          ).values()
      );
      setTerms(uniqueTerms);
  
      const uniqueSubjects = Array.from(
          new Map(
              data.data
                  .filter(item => item.term && item.subject)
                  .map(item => [
                      `${item.subject.id}-${item.term.id}`, // <-- unique key
                      {
                          termId: item.term.id,
                          subjectMappingId: item.id,
                          subjectName: item.subject.name,
                      },
                  ])
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
        // if (selectedTerm) params.append('term', selectedTerm);
        if (selectedSubject) params.append('subject__name', selectedSubject);

        const url = `subject-mapping-viewset?${params.toString()}`;

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
  const handleCancelClick = (classId) => {
    setSelectedClass(classId);
    setShowPopup(true);
};
const today = new Date().toISOString().split("T")[0];
const generateSchedule = () => {
  const allDates = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  while (start <= end) {
    const day = start.toLocaleDateString('en-US', { weekday: 'long' });

    if (day !== 'Sunday' && weekdays[day]?.selected) {
      allDates.push({
        mapping,
        date: start.toISOString().split('T')[0],
        start_time: weekdays[day].start_time,
        end_time: weekdays[day].end_time,
      });
    }
    start.setDate(start.getDate() + 1);
  }

  return { schedules: allDates };
};


  return (
    <div className="px-12 py-16">
       {showPopup && (
        <>
              <div
  className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity ease-in-out duration-1000 ${showPopup ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
  onClick={() => setShowPopup(false)}
/>

<div
  className={`fixed top-0 right-0 w-[450px] h-full p-6 bg-white shadow-lg z-50 transform transition-transform ease-in-out duration-1000 ${showPopup ? 'translate-x-0' : 'translate-x-full'}`}>
                        
                        <div className="mt-4 flex justify-between items-center gap-4">
                        <h2 className="text-xl font-semibold text-red-800">Schedule Class</h2>
                           <CrossIcon className="h-5 w-5 rotate-45" onClick={() => setShowPopup(false)}/>
                        </div>
                        <hr className=" border border-b-2 mt-3 mb-6"/>
                        <BulkClassShed id={selectedClass} />
                    </div>
                    </>
            )}
         <h1 className="text-3xl font-bold mb-2 font-sans">Class Schedule </h1>
                    <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Class Schedule</p>
                    
                    <hr className=" border  border-spacing-y-0.5 mb-6"/>
                    <div className="mb-4 flex items-center justify-start gap-2 ">
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
                            <option key={sub.subjectMappingId} value={sub.subjectName}>
                                {sub.subjectName}
                            </option>
                        ))}
                    </select>
                </div>
                <button className="flex gap-1 justify-center w-fit border bg-red-700 py-2 px-8 text-white rounded-sm hover:bg-red-100 hover:text-red-800 transition duration-300 ease-in-out items-center" onClick={handleSubmit}><SearchIcon className="h-4 w-4"/> Search</button>
                       
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
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              { sclass.length > 0 ? (
                  sclass.map((cls, index) => (
                    <tr key={cls.id} className="border-b text-sm hover:bg-gray-50">
                    <td className="px-6 py-3">{index + 1}</td>
                    <td className="px-6 py-3">{cls.term?.name}</td>
                    <td className="px-6 py-3">{cls.batch?.name}</td>
                    <td className="px-6 py-3">{cls.subject?.name}</td>
                    <td className="px-6 py-3">{cls.faculty?.first_name} {cls.faculty?.last_name}</td>
                    <td className="px-6 py-3 flex justify-center"><p className="flex gap-1 bg-green-100 text-green-800 w-fit py-1 px-2 text-xs cursor-pointer" onClick={() => handleCancelClick(cls.id, "cancel")}> <CalendarArrowUp className="h-4 w-4"/> Add Schedule</p></td>
                          
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
