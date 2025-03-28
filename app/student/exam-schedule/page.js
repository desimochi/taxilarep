"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext } from "react";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
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

    useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const [response, response1] = await Promise.all([
            await authFetch(`subject-student-wise/${state.user_id}`),

        ])
        if (!response.ok && !response1.ok) throw new Error("Failed to fethc the data");

        const data = await response.json();

        setsclass(data.data);
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
                termName:item.term.name,
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
  }, [state.user_id,]);
  const handleTermChange = (e) => {
    const termId = e.target.value;
    setSelectedTerm(termId);
    const filtered = subjectas.filter(sub => sub.termId.toString() === termId);
    setFilteredSubjects(filtered);
};


    return(
        <div className="py-4 px-5">
            
            <div>
            <div className="w-full">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-2/5">
                <h5 className="text-2xl font-bold">Exam Schedule</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className=" flex w-3/5 gap-2 justify-end">
                <div>
            <select value={selectedTerm} onChange={handleTermChange} className=" w-full border border-gray-300 rounded-sm px-8 py-2 text-black">
                <option value="">Select Term</option>
                {terms.map(term => (
                    <option key={term.id} value={term.id}>{term.name}</option>
                ))}
            </select>
            </div>
                </div>
                </div>
                
            </div>
            <div>
            {loading ? <FullWidthLoader /> : (
                        <>
                                <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                                    <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                        <th scope="col" className="px-6 py-3">S.No.</th>
                                            <th scope="col" className="px-6 py-3">Subject Name</th>
                                            <th scope="col" className="px-6 py-3">Term Name</th>
                                            <th scope="col" className="px-6 py-3">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {(selectedTerm === '' ? subjectas : filteredSubjects).map((subject, index) => (
        <tr key={subject.subjectMappingId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{index+1}</td>
            <td className="px-6 py-4">{subject.subjectName}</td>
            <td className="px-6 py-4">{subject.termName}</td>
            <td className="px-6 py-4 flex gap-2"><Link href={`/student/exam-schedule/details?subID=${subject.subjectMappingId}`} className="flex gap-2 text-red-500"><EyeIcon className="h-5 w-5"/>See Details</Link></td>
        </tr>
    ))}
                                    </tbody>
                                </table>
                        </>
                    )}
            </div>
        </div>
            </div>
            </div>
    
    )
}