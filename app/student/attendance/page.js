"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext } from "react";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
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
                subjectName: item.subject.name
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
  const subjects = atten.map((item) => item.subject_mapping.subject.name);
    return(
        <div className="py-4 px-5">
         
            <div>
            <div className="w-full">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-2/5">
                <h5 className="text-2xl font-bold">Student Attendance</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className=" flex w-3/5 gap-2 items-start">
                <div>
            <select value={selectedTerm} onChange={handleTermChange} className=" w-fit border border-gray-300 rounded-sm p-2 text-black">
                <option value="">Select Term</option>
                {terms.map(term => (
                    <option key={term.id} value={term.id}>{term.name}</option>
                ))}
            </select>
            </div>
            <div>
            <select onChange={(e) => setSelectedSubject(e.target.value)} disabled={!selectedTerm} className=" border w-fit border-gray-300 rounded-sm p-2 text-black">
                <option value="">Select Subject</option>
                {filteredSubjects.map(sub => (
                    <option key={sub.subjectMappingId} value={sub.subjectMappingId}>
                        {sub.subjectName}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <input type="date" className="w-full border border-gray-300 rounded-sm p-1 text-black" onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
            <input type="date" className="w-full border border-gray-300 rounded-sm p-1 text-black" onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <button className=" bg-green-600 text-white p-1.5 px-12 rounded-sm" onClick={handleSubmit}>Submit</button>
                </div>
                </div>
                
            </div>
            <div>
            {loading? <FullWidthLoader/> :     <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Date</th>
            {subjects.map((subject, index) => (
              <th key={index} scope="col" className="px-6 py-3">{subject}</th>
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
                    className={`border border-gray-300 px-4 py-2 ${
                      status === "Present"
                        ? "bg-green-200"
                        : status === "Class Not Scheduled"
                        ? "bg-gray-100"
                        : "bg-red-200"
                    }`}
                  >
                    {status}
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