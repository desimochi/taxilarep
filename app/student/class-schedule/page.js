"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext } from "react";
import FullWidthLoader from "@/components/Loaader";
import { SearchIcon } from "lucide-react";
export default function Page(){
    const [loading, setLoading] = useState(false);
      const [error, setError] = useState(false);
      const { state } = useContext(GlobalContext);
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
            await authFetch(`student-wise-class/${state.user_id}`),
            await authFetch(`subject-student-wise/${state.user_id}`),

        ])
        if (!response.ok && !response1.ok) throw new Error("Failed to fethc the data");

        const data = await response.json();
        const data2 = await response1.json()
        setsclass(data.data);
        setatten(data2.data)
        const uniqueTerms = Array.from(
            new Map(
                data2.data
                    .filter(item => item.term)
                    .map(item => [item.term.id, item.term])
            ).values()
        );
        setTerms(uniqueTerms);
        
        // Get subjects
        const mappedSubjects = data2.data
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

        const url = `student-wise-class/${state.user_id}?${params.toString()}`;

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


    return(
        <div className="py-4 px-5">
            <div>
            <div className="w-full">
            <div className=" py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-2/6">
                <h5 className="text-2xl font-bold">Class Schedule </h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>

                </div>
                <hr className="border border-b-2 mt-4 mb-2"/>
                </div>
                <div className="flex gap-2 px-12 text-sm">
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
        <button className=" bg-red-50 border border-red-300 text-red-800 hover:text-red-50 hover:bg-red-800 p-1.5 px-12 rounded-sm w-1/5 flex items-center justify-center gap-1" onClick={handleSubmit}><SearchIcon className="h-4 w-4"/> Search</button>
                </div>
            <div className="px-12">
            {loading? <FullWidthLoader/> :     <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">
             
                         <tr >
                                <th scope="col" className="px-6 py-3">S.No.</th>
                                <th scope="col" className="px-6 py-3">Subject Name</th>
                                <th scope="col" className="px-6 py-3">Subject Type</th>
                <th scope="col" className="px-6 py-3">Date.</th>
                <th scope="col" className="px-6 py-3">From</th>
                <th scope="col" className="px-6 py-3">To</th>
                <th scope="col" className="px-6 py-3">Faculty</th>
                <th scope="col" className="px-6 py-3">Status</th>
                         </tr>
                
            </thead>
            <tbody>
            { sclass.length > 0 ? (
    sclass.map((cls, index) => (
        <tr key={cls.id} className="hover:bg-gray-50">
            <td className="px-6 py-3">{index + 1}</td>
            <td className="px-6 py-3">{cls.mapping.subject?.name}</td>
            <td className="px-6 py-3">{cls.mapping?.type === "main" ? (
                    <span className="bg-green-50 text-green-800 px-2 py-1 shadow-sm rounded-sm border border-green-100">main</span>
                ) : (
                    <span className="bg-red-50 text-red-800 px-2 py-1 shadow-sm rounded-sm border border-red-100">{cls.mapping?.type}</span>
                )}</td>
            <td className="px-6 py-3">{cls.date}</td>
            <td className="px-6 py-3">{cls.start_time}</td>
            <td className="px-6 py-3">{cls.end_time}</td>
            <td className="px-6 py-3">{cls.mapping.faculty?.first_name} {cls.mapping.faculty?.last_name}</td>
            <td className="px-6 py-3">
  {cls.is_cancel ? (
    <span className="text-sm bg-red-50 text-red-800 p-1 rounded-sm">Cancelled</span>
  ) : cls.is_complete ? (
    <span className="text-sm bg-green-50 text-green-800 p-1 rounded-sm">Completed</span>
  ) : (
    <span className="text-sm bg-violet-50 text-violet-800 p-1 rounded-sm">Scheduled</span>
  )}
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
        </div>
            </div>
            </div>
    
    )
}