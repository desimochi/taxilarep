"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateComponents() {
    const [subjects, setSubjects] = useState([]);
    const router = useRouter();
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        subject_mapping: "",
        type: "EXTERNAL",
        name: "",
        max_marks: "",
        has_subcomponents: "true",
        is_submission: false,
        description: ""
    });

    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        const fetchSubjects = async () => {
            console.log(token);

            if (!token) {
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await authFetch(`subject-mapping-viewset`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                setSubjects(data.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authFetch("component-viewset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }
            const results = await response.json();
            setResult(results.data)
            alert("Form submitted successfully!");
            if (formData.has_subcomponents === "true") {
                router.push("/exam-components/create-subcomponent"); 
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Submission failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center w-full rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Create Component</h4>
                <form className="py-5 px-5" onSubmit={handleSubmit}>
                    <label className="font-bold">Subject</label>
                    <select name="subject_mapping" value={formData.subject_mapping} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Select Subject</option>
                        {Array.isArray(subjects) && subjects.map((item) => (
    <option key={item.id} value={item.id}>{item.subject.name} - {item.term.name}</option>
))}
                    </select>
                    <div className="flex gap-2 justify-between">
                        <div className="w-1/2">
                            <label className="font-bold">Exam Type</label>
                            <select name="type" onChange={handleChange} value={formData.type} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option value="EXTERNAL">External</option>
                                <option value="INTERNAL">Internal</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="font-bold">Name</label>
                            <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Enter Component Name..." className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                    </div>
                    <label className="font-bold">Maximum Marks</label>
                    <input type="number" name="max_marks" onChange={handleChange} value={formData.max_marks} placeholder="Enter Maximum Marks..." className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    <label className="font-bold">Sub Component</label>
                    <select name="has_subcomponents" onChange={handleChange} value={formData.has_subcomponents} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <label className="font-bold">Online Submission Required</label>
                    <select name="is_submission" onChange={handleChange} value={formData.is_submission} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <label className="font-bold">Description</label>
                    <input type="text" name="description" onChange={handleChange} value={formData.description} placeholder="Enter Component Description..." className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    <button type="submit" className="w-full bg-red-700 py-2 text-white rounded-sm">Submit</button>
                </form>
            </div>
        </div>
    );
}
