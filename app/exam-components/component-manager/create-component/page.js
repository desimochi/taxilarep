"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { hasPermission } from "@/app/lib/checkPermission";
import introJs from 'intro.js';
import 'intro.js/minified/introjs.min.css';

export default function CreateComponents() {
    const [subjects, setSubjects] = useState([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState("")
    const [showToast, setShowToast] =  useState(false)
    const subID = searchParams.get("subID");
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [formData, setFormData] = useState({
        subject_mapping: "",
        type: "EXTERNAL",
        name: "",
        max_marks: "",
        has_subcomponents: "true",
        is_submission: "false",
        description: "",
    });
  const hasadd = hasPermission(("b22e5de9bd04a4792a9c285e08ee07a9d66ac8129ab7fdc9d789e9174e647506"))
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        introJs()
          .setOptions({
            steps: [
              {
                element: '#step1',
                intro: "If you want a Performance Score component, then name it exactly 'Performance Score'."
              }
            ],
            showProgress: true,
            hidePrev: true,
            nextLabel: 'Next →',
            prevLabel: '← Back',
            doneLabel: 'Finish',
          })
          .start();
      }, []);
     
    


    useEffect(() => {
        const fetchSubjects = async () => {
            if (!token) {
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await authFetch(`subject-mapping-list`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setSubjects(data.data);

                // If subID is present, set it in formData
                if (subID) {
                    const matchedSubject = data.data.find(item => item.id.toString() === subID);
                    if (matchedSubject) {
                        setFormData(prev => ({
                            ...prev,
                            subject_mapping: matchedSubject.id.toString(),
                        }));
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
            if(!hasadd){
                router.replace("/unauthorized")
            }else{
 fetchSubjects();
            }
       
    }, [token, subID]);
if(!hasPermission){
    return null;
}
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
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }
            const results = await response.json();
            setMessage("Components Create Successfully")
            setShowToast(true)
            setTimeout(()=>{
                setShowToast(false)
                if (formData.has_subcomponents === "true") {
                    router.replace(`/exam-components/create-subcomponent?componentId=${results.data.id}`);
                } else{
                    router.replace(`/subjects/deails/${subID}`);
                }
            },2000)
            
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Submission failed. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center w-full rounded-sm py-12">
         
            {showToast && <Toast message={message}/>}
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">
                    Create Component
                </h4>
                <form className="py-5 px-5" onSubmit={handleSubmit}>
                    <label className="font-bold">Subject</label>
                    <select
                        name="subject_mapping"
                        value={formData.subject_mapping}
                        onChange={handleChange}
                        className="bg-gray-100 border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
                        disabled={!!subID} // Disable if subID is present
                    >
                        <option value="">Select Subject</option>
                        {Array.isArray(subjects) &&
                            subjects.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.subject.name} - {item.term.name}
                                </option>
                            ))}
                    </select>
                    <div className="flex gap-2 justify-between">
                        <div className="w-1/2">
                            <label className="font-bold">Exam Type</label>
                            <select
                                name="type"
                                onChange={handleChange}
                                value={formData.type}

                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="EXTERNAL">External</option>
                                <option value="INTERNAL">Internal</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="font-bold">Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                placeholder="Enter Component Name..."
                                id="step1"
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                    </div>
                    <label className="font-bold">Maximum Marks</label>
                    <input
                        type="number"
                        name="max_marks"
                        onChange={handleChange}
                        value={formData.max_marks}
                        placeholder="Enter Maximum Marks..."
                        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <label className="font-bold">Sub Component</label>
                    <select
                        name="has_subcomponents"
                        onChange={handleChange}
                        value={formData.has_subcomponents}
                        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <label className="font-bold">Online Submission Required</label>
                    <select
                        name="is_submission"
                        onChange={handleChange}
                        value={formData.is_submission}
                        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <label className="font-bold">Description</label>
                    <input
                        type="text"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                        placeholder="Enter Component Description..."
                        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                    <button
                        type="submit"
                        className="w-full bg-red-700 py-2 text-white rounded-sm"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
