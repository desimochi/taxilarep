"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

export default function Page() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { state } = useContext(GlobalContext);
    const [subjectas, setSubjectas] = useState([]);
    const [terms, setTerms] = useState([]);
    const [selectedTerm, setSelectedTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [filteredSubjects, setFilteredSubjects] = useState([]);

    useEffect(() => {
        const fetchclassData = async () => {
            try {
                setLoading(true);
                const response = await authFetch(`subject-student-wise/${state.user_id}`);
                if (!response.ok) throw new Error("Failed to fetch the data");

                const data = await response.json();

                const uniqueTerms = Array.from(
                    new Map(
                        data.data
                            .filter(item => item.term)
                            .map(item => [item.term.id, item.term])
                    ).values()
                );
                setTerms(uniqueTerms);

                const mappedSubjects = data.data
                    .filter(item => item.term && item.subject)
                    .map(item => ({
                        termId: item.term.id,
                        termName: item.term.name,
                        subjectMappingId: item.id,
                        subjectName: item.subject.name,
                        subjectType: item.type
                    }));
                setSubjectas(mappedSubjects);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchclassData();
    }, [state.user_id]);

    const handleTermChange = (e) => {
        setSelectedTerm(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const applyFilters = () => {
        return subjectas.filter(sub =>
            (selectedTerm === '' || sub.termId.toString() === selectedTerm) &&
            (selectedType === '' || sub.subjectType === selectedType)
        );
    };

    return (
        <div className="py-4 px-5">
            <div className="w-full">
                <div className="py-8 px-12">
                    <div className="flex justify-between items-center gap-2">
                        <div className="w-2/5">
                            <h5 className="text-2xl font-bold">Subjects</h5>
                            <span className="text-sm text-gray-400">Taxila Business School</span>
                        </div>
                        <div className="flex w-3/5 gap-2 justify-end">
                            <div>
                                <select value={selectedTerm} onChange={handleTermChange} className="w-full border border-gray-300 rounded-sm px-8 py-2 text-black">
                                    <option value="">Select Term</option>
                                    {terms.map(term => (
                                        <option key={term.id} value={term.id}>{term.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <select value={selectedType} onChange={handleTypeChange} className="w-full border border-gray-300 rounded-sm px-8 py-2 text-black">
                                    <option value="">Select Type</option>
                                    <option value="main">main</option>
                                    <option value="resit-1">resit-1</option>
                                    <option value="resit-2">resit-2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <hr className="border border-b-2 mt-4" />
                </div>
                <div className="px-12">
                    {loading ? <FullWidthLoader /> : (
                        <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
                            <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-6 py-3">S.No.</th>
                                    <th className="px-6 py-3">Subject Name</th>
                                    <th className="px-6 py-3">Subject Type</th>
                                    <th className="px-6 py-3">Term Name</th>
                                    <th className="px-6 py-3">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                            {applyFilters().length === 0 ? (
    <tr>
        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
            No subjects found.
        </td>
    </tr>
) : (
    applyFilters().map((subject, index) => (
        <tr key={subject.subjectMappingId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4">{index + 1}</td>
            <td className="px-6 py-4">{subject.subjectName}</td>
            <td className="px-6 py-4">
                {subject.subjectType === "main" ? (
                    <span className="bg-green-50 text-green-800 px-2 py-1 shadow-sm rounded-sm border border-green-100">main</span>
                ) : (
                    <span className="bg-red-50 text-red-800 px-2 py-1 shadow-sm rounded-sm border border-red-100">{subject.subjectType}</span>
                )}
            </td>
            <td className="px-6 py-4">{subject.termName}</td>
            <td className="px-6 py-4 flex gap-2">
                <Link href={`/student/subject/details/${subject.subjectMappingId}`} className="flex gap-2 text-gray-800 p-2 bg-gray-50 rounded-sm">
                    <EyeIcon className="h-4 w-4" />
                </Link>
            </td>
        </tr>
    ))
)}

                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
