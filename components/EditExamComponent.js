"use client";
import Link from "next/link";
import { SaveIcon, Trash2Icon } from "lucide-react";
import { PencilIcon } from "lucide-react";
import Toast from "./Toast";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";

const EditComponent = () => {
    const searchParams = useSearchParams();
    const [showToast, setShowToast] = useState(false);
    const componentID = searchParams.get("componentID"); // Get componentID from URL
    const[message, setmessage] = useState("")
    const [editingRow, setEditingRow] = useState(false);
    const [equalmarks, setEqualMarks] = useState(false)
    const[submap, setSubMap] = useState("")
    const [marks, setMarks] = useState()
    const [subcomponent, setSubcomponent] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        max_markss: "",
        description: "",
        has_subcomponents: false,
        is_submission: false,
        is_active: true,
    });

    // Fetch Data
    useEffect(() => {
        if (!componentID) return; // Prevent execution if ID is missing

        const fetchComponentData = async () => {
            try {
                setLoading(true);
                const response = await authFetch(`component-viewset/${componentID}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Failed to fetch component data");

                const data = await response.json();
                console.log("Fetched Data:", data); // Debugging purpose

                // Update form fields with fetched data
                setFormData({
                    name: data.data.name || "",
                    type: data.data.type || "",
                    max_markss: data.data.max_marks || "",
                    description: data.data.description || "",
                    has_subcomponents: data.data.has_subcomponents || false,
                    is_submission: data.data.is_submission || false,
                    is_active: data.data.is_active || true,
                });
                setSubMap(data.data.subject_mapping)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComponentData();
    }, [componentID]); // Run only when componentID changes

    useEffect(()=>{
        if(formData.has_subcomponents){
            const fetchSubComponentData = async () => {
                try {
                    setLoading(true);
                    const response = await authFetch(`sub-component/${componentID}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
    
                    if (!response.ok) throw new Error("Failed to fetch component data");
    
                    const data = await response.json();
                    console.log(data)
                    setSubcomponent(data.data)


                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchSubComponentData()
        }
    },[formData.has_subcomponents, componentID])
    const handleEditClick = (e) => {
        setEditingRow(true);// Store ID instead of index
        setMarks(e.target.value) 
        
      };
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setFormData((prevData) => {
            let updatedData = {
                ...prevData,
                [name]: type === "checkbox" ? checked : value,
            };
    
            // If turning off subcomponents, reset related data
            if (name === "has_subcomponents" && !checked) {
                setSubcomponent([]);
                setError(false);
            }
    
            return updatedData;
        });
    };
    
    const handleValChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSections = [...subcomponent];
    
        updatedSections[index] = { 
            ...updatedSections[index], 
            [name]: parseInt(value) || 0  // Ensure it's a number
        };
    
        setSubcomponent(updatedSections);
    
        // Calculate total marks
        const totalMarks = updatedSections.reduce((sum, sec) => sum + (sec.max_marks || 0), 0);
    
        // Validate total marks
        if (totalMarks !== parseInt(formData.max_markss)) {
            setError(true);  // Show error when total doesn't match
        } else {
            setError(false);
        }
    };
    
    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const mainMaxMarks = parseFloat(formData.max_markss);
            const hasSubcomponents = formData.has_subcomponents;
    
            // Prepare main component data
            const mainComponentData = {
                subject_mapping: submap, // Adjust as needed
                type: formData.type,
                name: formData.name,
                max_marks: mainMaxMarks,
                has_subcomponents: hasSubcomponents,
                is_submission: formData.is_submission,
                is_active: formData.is_active,
                description: formData.description,
            };
    
            // **Update main component first**
            const mainResponse = await authFetch(`component-viewset/${componentID}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(mainComponentData),
            });
    
            if (!mainResponse.ok) throw new Error("Failed to update component");
    
            // **If subcomponents are enabled, validate and update them**
            if (hasSubcomponents) {
                const totalSubMarks = subcomponent.reduce((total, sub) => total + parseFloat(sub.max_marks || 0), 0);
    
                // **Validate that subcomponent marks match main marks**
                if (totalSubMarks !== mainMaxMarks) {
                    setError(true);
                    return;
                }
    
                if (subcomponent.length > 0) {
                    const subComponentData = {
                        subcomponent_data: subcomponent.map((sub) => ({
                            component: parseInt(componentID),
                            name: sub.name,
                            max_marks: parseInt(sub.max_marks),
                            description: sub.description,
                            start_date:sub.start_date,
                            end_date:sub.end_date,
                            is_submission:sub.is_submission,
                            is_active:sub.is_active,
                        })),
                    };
    
                    const subResponse = await authFetch(`sub-component/${componentID}`, {
                        method: "POST", // "POST" to create, "PUT" to update
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(subComponentData),
                    });
    
                    if (!subResponse.ok) throw new Error("Failed to update subcomponents");
                    setmessage("Component and Sub Component Updated");
                    setShowToast(true);
                    setTimeout(() => setShowToast(false), 2000);
                    setError(false);
            
                }
            }
    
            setmessage("Component and Sub Component Updated");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2000);
            setError(false);
    
        } catch (err) {
            alert(err.message);
        }
    };
    
    
    

    // Show Loading & Errors
    if (loading) return <p>Loading component data...</p>;
    return (
        <div className="p-4">
            <>
            {showToast && <Toast message={message} />}
            <div className="p-6 border border-gray-300 rounded-sm ">
            <h4 className="px-10 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white mb-4">Edit {formData.name} 

                </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div className="flex gap-2">
                <div className="w-1/2">
                    <label className="font-bold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>

                {/* Type */}
                <div className="w-1/2">
                    <label className="font-bold">Type:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
                        required
                    >
                        <option value="">Select Type</option>
                        <option value="INTERNAL">INTERNAL</option>
                        <option value="EXTERNAL">EXTERNAL</option>
                    </select>
                </div>
                </div>
                {/* Max Marks */}
                <div className="flex gap-2">
                <div className="w-1/2">
                    <div className="flex justify-between">
                    <label className="font-bold">Max Marks: {marks&& `New Max Marks -${marks}`}</label>
                    {editingRow && <p className="text-sm text-red-500">Need to change in Subcomponent Marks </p>}
                    </div>
                    
                    <input
                        type="number"
                        name="max_markss"
                        value={formData.max_markss}
                        onChange={(e) => {
                            handleChange(e);
                            handleEditClick(e);
                        }}
                        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>

                {/* Description */}
                <div className="w-1/2">
                    <label className="font-bold">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                    />
                </div>
                </div>
                {/* Has Subcomponents */}
                <div className="flex gap-2 justify-between items-center mb-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="has_subcomponents"
                        checked={formData.has_subcomponents}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="font-medium">Has Subcomponents</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="is_submission"
                        checked={formData.is_submission}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="font-medium">Online Submission Required</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label className="font-medium">Active/Inactive</label>
                </div>
                </div>
                

                {/* Submit Button */}
                <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
                    Update Component
                </button>
            </form>
            </div>
            {subcomponent.length>0 && <>
                <div className="rounded-xl border border-gray-300 mt-4 ">
    <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase rounded-xl bg-black dark:bg-gray-700 dark:text-white-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    S.No.
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Marks - {error && `marks should be eqaul to - ${marks}`}
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
            </tr>
        </thead>
        <tbody className="rounded-xl">
        {subcomponent.length>0 && subcomponent.map((course, index) => (
    <tr key={course.id} className="bg-white border-b hover:bg-gray-50 text-black">
        <td className="px-6 py-4">{index+1}
        </td>
      <td className="px-6 py-4">
        {course.name}
      </td>
    
      <td className="px-6 py-4">
        {editingRow ? (
          <input
            type="number"
            name="max_marks"
            value={course.max_marks}
            onChange={(e) => handleValChange(index, e)}
            className={`border ${editingRow? "border-gray-800" : ""} ${error? "bg-red-300" :""} rounded px-2 py-1 `}
          />
        ) : (
          course.max_marks
        )}
      </td>
      <td className="px-6 py-4">
        {course.description}
      </td>
    </tr>
  ))}
        </tbody>
    </table>
    </div>
              </>}

            </>

        </div>
    );
};

export default EditComponent;
