"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateSubComponent() {
    const [components, setComponents] = useState([]);
    const [marks, setMarks] = useState(0);
    const [selectedComponentId, setSelectedComponentId] = useState(null);
    const [formSections, setFormSections] = useState([{ name: "", max_marks: "", description: "", is_submission:"" }]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const componentId = searchParams.get("componentId");
    const [error, setError] = useState(false);

    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchComponents = async () => {
            if (!token) {
                setError("No token found. Please log in.");
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
                setComponents(data.data);

                // Auto-select component based on componentId from URL
                if (componentId) {
                    const matchedComponent = data.data.find(item => item.id.toString() === componentId);
                    if (matchedComponent) {
                        setSelectedComponentId(matchedComponent.id);
                        setMarks(matchedComponent.max_marks);
                    }
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchComponents();
    }, [token, componentId]);

    const handleComponentSelect = (e) => {
        const selectedId = Number(e.target.value);
        setSelectedComponentId(selectedId);

        const selectedComponent = components.find(component => component.id === selectedId);
        if (selectedComponent) {
            setMarks(selectedComponent.max_marks);
        } else {
            setMarks(null);
        }
    };

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSections = [...formSections];
       console.log(e.target.value)
        if (name === "is_submission") {
            updatedSections[index][name] = value === "true";
          console.log(updatedSections)
        } else if (name === "max_marks") {
          const newMarks = parseInt(value) || 0;
          const totalMarks = updatedSections.reduce((sum, sec, i) => sum + (i === index ? newMarks : sec.max_marks), 0);
      
          if (totalMarks > marks || newMarks > marks) {
            setError(true);
            return;
          } else {
            setError(false);
          }
      
          updatedSections[index][name] = newMarks;
        } else {
          updatedSections[index][name] = value;
        }
      
        setFormSections(updatedSections);
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            subcomponent_data: formSections.map(({ name, max_marks, description, is_submission }) => ({
                component: parseInt(selectedComponentId),
                name,
                max_marks: parseInt(max_marks) || 0,
                description,
                is_submission
            }))
        };

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
        setFormSections([...formSections, { name: "", max_marks: "", description: "", is_submission:"" }]);
    };

    return (
        <div className="flex justify-center items-center w-full rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">
                    Create Sub Component
                </h4>
                <form className="py-5 px-5" onSubmit={handleSubmit}>
                    <div className="flex justify-between">
                        <label className="font-bold">Component</label>
                        <p className="font-bold">Available Marks - {marks}</p>
                    </div>
                    <select
                        name="component"
                        onChange={handleComponentSelect}
                        value={selectedComponentId || ""}
                        className="bg-gray-100 border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
                        disabled={!!componentId} // Disable if componentId is in URL
                    >
                        <option value="">---- Select Component ----</option>
                        {components
                            .filter(item => item.has_subcomponents)
                            .map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                    </select>

                    {formSections.map((formData, index) => (
                        <div key={index} className="mb-4 border p-4 rounded-lg shadow-sm">
                            <div className="flex justify-between">
                                <h3 className="font-bold text-lg">Sub Component {index + 1}</h3>
                                {formSections.length > 1 && (
                                    <button onClick={() => removeSection(index)} className="text-red-500 text-sm font-bold">
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
                                    <label className="font-bold">Marks</label>
                                    <input
                                        type="number"
                                        name="max_marks"
                                        onChange={(e) => handleChange(index, e)}
                                        value={formData.max_marks}
                                        placeholder="Enter Maximum Marks..."
                                        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    />
                                </div>
                            </div>
                            <label className="font-bold">Online Submission Required</label>
                            <select
  name="is_submission"
  onChange={(e) => handleChange(index, e)}
  value={formData.is_submission}
  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
><option value="">Select A Value</option>
  <option value="true">Yes</option>
  <option value="false">No</option>
</select>
                            <label className="font-bold">Description</label>
                            <input
                                type="text"
                                name="description"
                                onChange={(e) => handleChange(index, e)}
                                value={formData.description}
                                placeholder="Enter Component Description..."
                                className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm block w-full p-2.5"
                            />
                        </div>
                    ))}

                    <div className="flex gap-2">
                        <button type="button" onClick={addSection} className="w-1/2 bg-gray-200 text-gray-800 border rounded-sm">Add Section</button>
                        <button type="submit" className="w-1/2 bg-red-700 text-white rounded-sm">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
