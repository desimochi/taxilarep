"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext } from "react";
import FullWidthLoader from "@/components/Loaader";
import { BanIcon, Calendar1Icon, PlusCircleIcon, SearchIcon, Settings2Icon, SquareUserRoundIcon } from "lucide-react";
import Toast from "@/components/Toast";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import { set } from "date-fns";
export default function Page(){
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
     
      const { state } = useContext(GlobalContext);
        const [sclass, setsclass] = useState([]);
        const [terms, setTerms] = useState([]);
    const [subjectas, setSubjectas] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState('');
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
const [s_date, setStartDate] = useState('');
const [e_date, setEndDate] = useState('');
   
useEffect(() => {
    fetchclassData(currentPage);
  }, [currentPage]);
    const fetchclassData = async (page) => {
      try {
        setLoading(true);
        const response = await authFetch(`class-schedule-viewset?page=${page}`);
        if (!response.ok ) throw new Error("Failed to Fetch the data");

        const data = await response.json();

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

        const url = `class-schedule-viewset?${params.toString()}`;

        const response = await authFetch(url);
        if (!response.ok) throw new Error("Failed to fetch filtered data");

        const data = await response.json();
        setsclass(data.data);
        setTotalPages(data.extra?.total);
        setCurrentPage(1); // Reset to first page after filtering
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}
const today = new Date().toISOString().split("T")[0];


    return(
    <div className="bg-white min-h-screen">

        <section className="relative">
           
        <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
        <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
        <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
        <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
        <div className="py-4 px-5">
            
            <div>
            <div className="w-full px-12 py-6">
            <h1 className="text-3xl font-bold mb-2 font-sans">Class Attendance </h1>
            <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Class Attendance</p>
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
                <th scope="col" className="px-6 py-3">Date.</th>
               
                <th scope="col" className="px-6 py-3">From</th>
                <th scope="col" className="px-6 py-3">To</th>
                <th scope="col" className="px-6 py-3">View
                </th>
           
                         </tr>
                
            </thead>
            <tbody>
            { sclass.length > 0 ? (
    sclass.map((cls, index) => (
        <tr key={cls.id} className="border-b text-sm hover:bg-gray-50">
            <td className="px-6 py-3">{index + 1}</td>
            <td className="px-6 py-3">{cls.mapping.batch?.name}</td>
            <td className="px-6 py-3">{cls.mapping.subject?.name}</td>
            <td className="px-6 py-3">{cls.date}</td>
            <td className="px-6 py-3">{cls.start_time}</td>
            <td className="px-6 py-3">{cls.end_time}</td>
            <td className="px-6 py-3">
  {cls.is_cancel ? (
    <span className="bg-red-100 text-sm text-red-800 py-0.5 px-3 rounded-sm">Cancelled</span>
  ) : cls.is_complete ? (
    <Link href={`/attendance/class-attendance/${cls.id}`} className="bg-gray-100 text-sm text-gray-800 py-0.5 px-3 rounded-sm"><EyeIcon className="h-4 w-4"/></Link>
  ) : cls.is_ready_for_attendance ? (
    <span className="bg-violet-100 text-sm text-violet-800 py-0.5 px-3 rounded-sm">Attendance Not Marked</span>
  ) : (<span className="bg-green-100 text-sm text-green-800 py-0.5 px-3 rounded-sm">Scheduled</span>)}
</td>
           
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
            </div>
            </div>
        </div>
         </section>
         </div>
    
    )
}

