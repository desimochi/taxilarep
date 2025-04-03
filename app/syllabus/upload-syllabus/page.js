"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import RichTextEditor from "@/components/CKEditor";
export default function Page() {
    const searchParams = useSearchParams();
    const subID = searchParams.get("subID"); // Get subID from URL
    const { state } = useContext(GlobalContext);
    const router = useRouter();

    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [selectedValues, setSelectedValues] = useState({
        course: "",
        batch: "",
        term: "",
        subject: "",
    });

    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const response = await authFetch(`assign-faculty-filter?faculty=${state.user_id}`);
                if (!response.ok) throw new Error("Failed to fetch subjects");
                const data = await response.json();
                setSubjects(data.data);

                // If subID is present, find and set the default selections
                if (subID) {
                    const matchedSubject = data.data.find(item => item.id.toString() === subID);
                    if (matchedSubject) {
                        setSelectedValues({
                            course: matchedSubject.course[0]?.id || "",
                            batch: matchedSubject.batch.id || "",
                            term: matchedSubject.term.id || "",
                            subject: matchedSubject.subject.id || "",
                        });
                        setSelectedSubject(matchedSubject);
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [subID, state.user_id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setSelectedValues(prev => ({
            ...prev,
            [name]: value
        }));

        // Dynamically find matching subject when all dropdowns are selected
        const matchedSubject = subjects.find(
            item => 
                item.course[0]?.id.toString() === (name === "course" ? value : selectedValues.course) &&
                item.batch.id.toString() === (name === "batch" ? value : selectedValues.batch) &&
                item.term.id.toString() === (name === "term" ? value : selectedValues.term) &&
                item.subject.id.toString() === (name === "subject" ? value : selectedValues.subject)
        );

        setSelectedSubject(matchedSubject || null);
    }

    return (
        <div className="w-full rounded-sm py-12 px-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className=" py-6 px-8 text-2xl font-bold text-red-800 bg-red-50">
                    Upload Syllabus
                </h4>
                <form className="py-5 px-5">
                    <div className="flex gap-2">
                        {/* Course Dropdown */}
                        <div className="w-1/4">
                            <label className="font-bold">Course</label>
                            <select 
                                name="course" 
                                onChange={handleChange} 
                                disabled={!!subID} 
                                value={selectedValues.course}
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="">---- Select Course ----</option>
                                {Array.from(new Set(subjects.flatMap(item => item.course.map(course => course.id))))
                                    .map(courseId => {
                                        const course = subjects.flatMap(item => item.course).find(c => c.id === courseId);
                                        return <option key={course.id} value={course.id}>{course.name}</option>;
                                    })}
                            </select>
                        </div>

                        {/* Batch Dropdown */}
                        <div className="w-1/4">
                            <label className="font-bold">Batch</label>
                            <select 
                                name="batch" 
                                onChange={handleChange} 
                                disabled={!!subID} 
                                value={selectedValues.batch}
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="">---- Select Batch ----</option>
                                {[...new Set(subjects.map(item => item.batch.id))]
                                    .map(batchId => {
                                        const batch = subjects.find(item => item.batch.id === batchId)?.batch;
                                        return <option key={batch.id} value={batch.id}>{batch.name}</option>;
                                    })}
                            </select>
                        </div>

                        {/* Term Dropdown */}
                        <div className="w-1/4">
                            <label className="font-bold">Term</label>
                            <select 
                                name="term" 
                                onChange={handleChange} 
                                disabled={!!subID} 
                                value={selectedValues.term}
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="">---- Select Term ----</option>
                                {[...new Set(subjects.map(item => item.term.id))]
                                    .map(termId => {
                                        const term = subjects.find(item => item.term.id === termId)?.term;
                                        return <option key={term.id} value={term.id}>{term.name}</option>;
                                    })}
                            </select>
                        </div>

                        {/* Subject Dropdown */}
                        <div className="w-1/4">
                            <label className="font-bold">Subject</label>
                            <select 
                                name="subject" 
                                onChange={handleChange} 
                                disabled={!!subID} 
                                value={selectedValues.subject}
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="">---- Select Subject ----</option>
                                {[...new Set(subjects.map(item => item.subject.id))]
                                    .map(subjectId => {
                                        const subject = subjects.find(item => item.subject.id === subjectId)?.subject;
                                        return <option key={subject.id} value={subject.id}>{subject.name}</option>;
                                    })}
                            </select>
                        </div>
                    </div>

                    {/* Display Subject Details if found */}
                    {selectedSubject && (
                    <RichTextEditor  id={selectedSubject.id} />
                    )}

                    {/* Submit Button */}
                    
                </form>
            </div>
        </div>
    );
}
