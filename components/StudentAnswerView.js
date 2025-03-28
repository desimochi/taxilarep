import { authFetch } from "@/app/lib/fetchWithAuth";
import { useState, useEffect } from "react";

export default function StudentAnswerView({id, compId, subcomponent}){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const url = subcomponent? 'student-subcomponent-answer-details' : 'student-component-answer-details'
        const fetchClassData = async () => {
            try {
                setLoading(true);
                const response = await authFetch(`${url}/${compId}/${id}`);
                
                if (!response.ok) throw new Error("Failed to fetch Subject data");

                const result = await response.json();
                setData(result.data || []);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

         fetchClassData(); // Ensure `id` exists before making API call
    }, [id, compId, subcomponent]);
    return (
        <>
        <div className=" border border-gray-300 rounded-sm p-2">
            <h3 className="bg-black text-white text-center py-2  rounded-sm">Your Submitted Answer</h3>
            <div >{data.answers_file ? data.answers_file : <div className="mt-4 text-center">No answer submitted</div>}</div>
        </div>
        </>
    )
}