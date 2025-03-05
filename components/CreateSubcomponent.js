"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateSubComponent() {
    const [components, setComponents] = useState([]);
    const [marks, setMarks] = useState(0)
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [formSections, setFormSections] = useState([
        { name: "", max_marks:"", description: "" }
    ]);
    const router = useRouter();
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  

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
                const response = await authFetch(`component-viewset`, {
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
                setComponents(data.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [token]);
    const handleComponentSelect = (e) => {
        const selectedId = Number(e.target.value); // Convert to number
        setSelectedComponentId(selectedId);
    
        // Find the selected component
        const selectedComponent = components.find(component => component.id === selectedId);
    
        // Set marks based on the selected component
        if (selectedComponent) {
            setMarks(selectedComponent.max_marks);
        } else {
            setMarks(null); // Reset if no component is found
        }
    };
    
    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSections = [...formSections];
    
        if (name === "max_marks") {
            const newMarks = parseInt(value) || 0; // Ensure it's a number
            const totalMarks = updatedSections.reduce((sum, sec, i) => sum + (i === index ? newMarks : sec.max_marks), 0);
    
            // Validation: Ensure sum of all sub-component marks does not exceed available marks
            if (totalMarks > marks) {
                setError(true)
                return;
            }else{
                setError(false)
            }
            // Validation: Each sub-component should not exceed available marks
            if (newMarks > marks) {
                setError(true)
                return;
            }else{
                setError(false)
            }
    
            updatedSections[index][name] = newMarks;
        } else {
           
            updatedSections[index][name] = value;
        }
    
        setFormSections(updatedSections);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            subcomponent_data: formSections.map(({ name, max_marks, description }) => ({
                component: parseInt(selectedComponentId),  // Convert to integer
                name,
                max_marks: parseInt(max_marks) || 0,  // Convert max_marks, default to 0 if NaN
                description
            }))
        };
        
        console.log(typeof(payload.subcomponent_data[0].max_marks))
        try {
            const response = await authFetch(`sub-component/${selectedComponentId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error("Failed to submit data");
            }
            const results = await response.json();
            setResult(results.data)
            alert("Form submitted successfully!");
           
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Submission failed. Please try again.");
        }
    };
    const removeSection = (index) => {
        const updatedSections = formSections.filter((_, i) => i !== index);
        setFormSections(updatedSections);
    };
    const addSection = () => {
        setFormSections([
            ...formSections,
            { name: "", max_marks: "", description: "" }
        ]);
    };
    return (
        <div className="flex justify-center items-center w-full rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Create Sub Component</h4>
                <form className="py-5 px-5" onSubmit={handleSubmit}>
                <div className="flex justify-between">
                <label className="font-bold">Subject</label>
                <p className="font-bold">Available Marks - {marks}</p>
                </div>
                
                            <select
                                name="component"
                                onChange={handleComponentSelect}
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="">---- Select Component ----</option>
                                {Array.isArray(components) &&
  components
    .filter((item) => item.has_subcomponents) // Only keep components with has_subcomponents === true
    .map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ))}
                            </select>
                <div>
                {formSections.map((formData, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg shadow-sm relative">
                    <div className="flex justify-between">
                        <h3 className="font-bold text-lg">Sub Component {index + 1}</h3>
                        {formSections.length > 1 && (
                            <button 
                                onClick={() => removeSection(index)}
                                className="text-red-500 text-sm font-bold"
                            >
                                ✖ Remove
                            </button>
                        )}
                    </div>
                    <div className="flex gap-2">
    
                        <div className="w-1/2">
                            <label className="font-bold">Name</label>
                            <input
                                type="text"
                                name="name"
                                onChange={(e) => handleChange(index, e)}
                                value={formData.name}
                                placeholder="Enter Component Name..."
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                        <div className="w-1/2">
                            <div className="flex justify-between">
                            <label className="font-bold">Marks</label>
                            <p className="text-sm text-red-500">{error && `Mark Should Be Less Than ${marks}`}</p>
                            </div>
                            
                            <input
                                type="number"
                                name="max_marks"
                                onChange={(e) => handleChange(index, e)}
                                value={(formData.max_marks)}
                                placeholder="Enter Maximum Marks..."
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                    </div>
                            <label className="font-bold">Description</label>
                            <input
                                type="text"
                                name="description"
                                onChange={(e) => handleChange(index, e)}
                                value={formData.description}
                                placeholder="Enter Component Description..."
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                    </div>
            ))}

           
        </div>
                    <div className="flex gap-2">
                        <div className="w-1/2">
                        <button type="button"
                onClick={addSection}
                className="w-full bg-white text-gray-800 border border-gray-600 hover:bg-gray-200 px-4 py-2 rounded-sm"
            >
                Add Section
            </button>
                        </div>
                        <div className="w-1/2">
                        <button type="submit" className="w-full bg-red-700 py-2 text-white rounded-sm">Submit</button>
                        </div>
                    </div>
                   
                </form>
            </div>
        </div>
    );
}
