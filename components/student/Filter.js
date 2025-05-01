import { SearchIcon } from "lucide-react"
import { useStundentData } from "@/hooks/useStudentData";
import { useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
export default function StudentFilter({id, searchapi, updateData}) {
        const {terms, subjectt } = useStundentData()
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(false);
       const [selectedTerm, setSelectedTerm] = useState('');
      const [selectedSubject, setSelectedSubject] = useState('');
        const [s_date, setStartDate] = useState('');
          const [e_date, setEndDate] = useState('');
    
const handleSubmit = async () => {
        try {
          setLoading(true);
    
          const params = new URLSearchParams();
          if (selectedTerm) params.append('term', selectedTerm);
          if (selectedSubject) params.append('mapping', selectedSubject);
          if (s_date) params.append('s_date', s_date);
          if (e_date) params.append('e_date', e_date);
    
          const url = `${searchapi}/${id}?${params.toString()}`;
          const response = await authFetch(url);
          if (!response.ok) throw new Error("Failed to fetch filtered data");
    
          const data = await response.json();
          updateData(data.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
    
    return(
        <div className="flex px-12 gap-2 text-sm">
        <div className="w-1/5">
          <select value={selectedTerm} onChange={(e) => setSelectedTerm(e.target.value)} className="w-full border border-gray-300 rounded-sm p-2 text-black">
            <option value="">Select Term</option>
            {terms.map(term => (
              <option key={term.id} value={term.id}>{term.name}</option>
            ))}
          </select>
        </div>

        <div className="w-1/5">
          <select
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full border border-gray-300 rounded-sm p-2 text-black"
          >
            <option value="">Select Subject</option>
            {subjectt.map(sub => (
              <option key={sub.id} value={sub.id}>
                {sub.subject.name} - {sub.type}
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

        <button
          className="bg-red-50 text-red-800 border border-red-300 hover:text-red-50 hover:bg-red-800 flex items-center justify-center gap-1 p-1.5 px-12 rounded-sm w-1/5"
          onClick={handleSubmit}
        >
          <SearchIcon className="h-4 w-4" /> Search
        </button>
      </div>
    )
}