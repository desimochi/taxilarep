"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext } from "react";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
export default function Page(){
    const [loading, setLoading] = useState(false);
    const{state} = useContext(GlobalContext)
    const id  = state.user_id
      const [error, setError] = useState(false);
        const [sclass, setsclass] = useState([]);
        const [atten, setatten] = useState([])
        const [terms, setTerms] = useState([]);
    const [subjectas, setSubjectas] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState('');
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
const [s_date, setStartDate] = useState('');
const [e_date, setEndDate] = useState('');

    useEffect(() => {
        
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const [response, response1] = await Promise.all([
            await authFetch(`subject-student-wise/${id}`),
            await authFetch(`attendance-summary-filter/${id}`)

        ])
        if (!response.ok && !response1.ok) throw new Error("Failed to fethc the data");

        const data = await response.json();
        const data2 = await response1.json()

        setsclass(data.data);
        setatten(data2.data)
        const uniqueTerms = Array.from(
            new Map(
                data.data
                    .filter(item => item.term)
                    .map(item => [item.term.id, item.term])
            ).values()
        );
        setTerms(uniqueTerms);
        
        // Get subjects
        const mappedSubjects = data.data
            .filter(item => item.term && item.subject)
            .map(item => ({
                termId: item.term.id,
                subjectMappingId: item.id, // id is the subject_mapping id
                subjectName: item.subject.name,
                subjectType : item.type
            }));
        setSubjectas(mappedSubjects);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchclassData();
  }, [id]);
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

        const url = `attendance-summary-filter/${id}?${params.toString()}`;

        const response = await authFetch(url);
        if (!response.ok) throw new Error("Failed to fetch filtered data");

        const data = await response.json();
        setatten(data.data);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}



    const uniqueDates = [...new Set(atten.flatMap((item) => item.attendance.map((att) => att.date)))];
    const subjects = atten.map((item) => ({
      name: item.subject_mapping.subject.name,
      type: item.subject_mapping.type,
    }));
  const percntage = atten.map((item) => item.attended_percentage);
    return(
        <div className="py-4 px-5">
         
            <div>
            <div className="w-full">
            <div className=" mt-4 p-2  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-2/6">
                <h5 className="text-2xl font-bold">Student Attendance</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
              
                </div>
                <hr className="border border-b-2 mt-4"/>
                </div>
                <div className="flex px-12 gap-2 text-sm">
                <div className="w-1/5 ">
            <select value={selectedTerm} onChange={handleTermChange} className=" w-full border border-gray-300 rounded-sm p-2 text-black">
                <option value="">Select Term</option>
                {terms.map(term => (
                    <option key={term.id} value={term.id}>{term.name}</option>
                ))}
            </select>
            </div>
            <div className="w-1/5 ">
            <select onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedTerm} className="w-full  border border-gray-300 rounded-sm p-2 text-black">
                <option value="">Select Subject</option>
                {filteredSubjects.map(sub => (
                    <option key={sub.subjectMappingId} value={sub.subjectMappingId}>
                        {sub.subjectName} - {sub.subjectType}
                    </option>
                ))}
            </select>
        </div>
        <div className="w-1/5 ">
            <input type="date" className="w-full  border border-gray-300 rounded-sm p-1 text-black" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="w-1/5 ">
            <input type="date" className="w-full  border border-gray-300 rounded-sm p-1 text-black" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button className=" bg-red-50 text-red-800 border border-red-300 hover:text-red-50 hover:bg-red-800 flex items-center justify-center gap-1 p-1.5 px-12 rounded-sm w-1/5" onClick={handleSubmit}><SearchIcon className="h-4 w-4"/> Search</button>
                </div>
            <div className="px-12">
            {loading? <FullWidthLoader/> :     <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
            {subjects.map((subject, index) => (
              <th key={index} scope="col" className="px-6 py-3">{subject.name}-({subject.type}) - {percntage[index]}%</th>
            ))}
              </tr>
            </thead>
            <tbody>
            {uniqueDates.map((date, index) => (
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td className="px-6 py-4">{date}</td>
              {atten.map((item, subIndex) => {
                const attendanceRecord = item.attendance.find((att) => att.date === date);
                const status = attendanceRecord ? attendanceRecord.status : "No Data";
                
                return (
                  <td
                    key={subIndex}
                   
                  >
                    <span  className={`border text-sm px-2 py-1 border-l-2 rounded-sm ${
                      status === "Present"
                        ? "bg-green-50 text-green-800"
                        : status === "Class Not Scheduled"
                        ? "bg-gray-50 text-gray-800"
                        : "bg-red-50 text-red-800"
                    }`}>{status}</span>
                  </td>
                );
              })}
            </tr>
          ))}
    
            </tbody>
                            </table>}
            </div>
        </div>
            </div>
            </div>
    
    )
}