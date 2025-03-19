"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Toast from "@/components/Toast";
import FullWidthLoader from "@/components/Loaader";

export default function Page() {
    const searchParams = useSearchParams();
    const mentorshipId = searchParams.get("mentorshipId"); 
    const [showlist, setShowlist]= useState(false)
    const [loading, setLoading] = useState(false);
      const [showToast, setShowToast] = useState(false);
      const [message, setMessage] = useState("");
    const[nomentorstu, setNomentorStu] = useState(true)
    const [error, setError] = useState(null);
    const [faculty, setFaculty] = useState([]);
    const [selectedData, setSelectedData] = useState({ user: null, students: [] });
    const [mentordata, setMentorData] = useState(null);
    const [checkedStudents, setCheckedStudents] = useState({}); // Store checked status
    useEffect(() => {
        if (showToast) {
          const timer = setTimeout(() => {
            setShowToast(false);
          }, 2000); // Hide after 3 seconds
      
          return () => clearTimeout(timer); // Cleanup to avoid memory leaks
        }
      }, [showToast]);
    useEffect(() => {
        if (!mentorshipId) return; 

        const fetchComponentData = async () => {
            try {
                setLoading(true);
                const [response, facres] = await Promise.all([
                    authFetch(`membership-viewset/${mentorshipId}`),
                    authFetch("employee-list"),
                ]);

                if (!response.ok) throw new Error("Failed to fetch component data");
                if (!facres.ok) throw new Error("Failed to fetch faculty data");

                const data = await response.json();
                const data2 = await facres.json();

                setMentorData(data.data);
                setFaculty(data2.data);
                setSelectedData({
                    user: data.data.user.id, 
                    students: data.data.students.map(student => student.id)
                });
                // Initialize checkboxes as checked
                const initialCheckedState = {};
                data.data.students.forEach(student => {
                    initialCheckedState[student.id] = true; 
                });
                setCheckedStudents(initialCheckedState);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComponentData();
    }, [mentorshipId]);

   const fetchotherStu = async() => {
        try{
            const res = await authFetch('students/no-mentor')
            const data = await res.json()
            setNomentorStu(data.data)
        } catch (err){
            setError(err.message)

        }
    }
    const handleCheckboxChange = (studentId) => {
        setCheckedStudents(prev => ({
            ...prev,
            [studentId]: !prev[studentId] // Toggle the checked state
        }));
        setSelectedData((prev) => ({
            ...prev,
            students: prev.students.includes(studentId)
                ? prev.students.filter(id => id !== studentId) // Remove if unchecked
                : [...prev.students, studentId], // Add if checked
        }));
    };

   
    const handleSubmit = async () => {
        try {
            const response = await authFetch(`membership-viewset/${mentorshipId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedData),
            });

            if (!response.ok) throw new Error("Failed to update mentorship");
            setMessage("Mentor assigned successfully!");
            setShowToast(true);
            setShowlist(false);
        } catch (err) {
            alert(`Error: ${err.message}`);
        } finally{
            setTimeout(() => {
                 // Close modal after saving
            window.location.reload();
            }, 2000);
            
        }
    };

    if (loading) return <FullWidthLoader />;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (!mentordata) return <p>No mentorship data available.</p>;
    console.log(selectedData)
    return (
        <>
        {showToast && <Toast message={message} className="z-50"/>}
        {showlist && <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-25">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 ">
                        <div className="flex justify-between items-center border-b pb-2">
                            <h2 className="text-xl font-bold">Assign Mentor</h2>
                            <button 
                                className="text-gray-500 hover:text-gray-800"
                                onClick={() => setShowlist(false)}
                            >
                                ✖
                            </button>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                        <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 mt-4">
                        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
                            <tr>
                                <th scope="col" className="px-6 py-3">Action</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Enrollment No.</th>
                                <th scope="col" className="px-6 py-3">Batch</th>
                                <th scope="col" className="px-6 py-3">Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nomentorstu.length > 0 &&
                                nomentorstu.map((student) => (
                                    <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            <input 
                                                type="checkbox" 
                                                onChange={() => handleCheckboxChange(student.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">{student.first_name + " " + student.last_name}</td>
                                        <td className="px-6 py-4">{student.enrollment_number ? student.enrollment_number : "NA"}</td>
                                        <td className="px-6 py-4">{student.batch.name}</td>
                                        <td className="px-6 py-4">{student.course.name}</td>
                                    </tr>
                                ))}
                        </tbody>
                        </table>
                        </div>
                        <div className="flex justify-start mt-6">
                            <button className="bg-red-600 rounded p-2 px-12 text-white" onClick={handleSubmit}>Update</button>
                        </div>
                    </div>
            </div>
        </>}
        <div className="px-6 py-6">
            <div className="border border-gray-300 rounded-md p-6">
                <div className="flex gap-2">
                    <div className="w-3/4">
                        <label className="font-bold">Mentor Name</label>
                        <select className="p-2 border rounded w-full"
                                            value={selectedData.user}
                                onChange={(e) => setSelectedData({ ...selectedData, user: Number(e.target.value) })}
                        
                        >
                            {mentordata.user && (
                                <option value={mentordata.user.id}>
                                    {mentordata.user.first_name} {mentordata.user.last_name}
                                </option>
                            )}
                            {faculty
                                .filter((fac) => fac.id !== mentordata.user?.id)
                                .map((fac) => (
                                    <option key={fac.id} value={fac.id}>
                                        {fac.first_name} {fac.last_name}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <div className="w-1/4">
                        <button onClick={() => {
    setShowlist(true);
    fetchotherStu();  // Call your second function here
}} className="text-center w-full mt-6 bg-red-600 p-1.5 text-white rounded shadow-sm hover:shadow-xl transition-shadow">
                            Add More Student
                        </button>
                    </div>
                </div>
                {mentordata.students && (
                    <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 mt-4">
                        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
                            <tr>
                                <th scope="col" className="px-6 py-3">Action</th>
                                <th scope="col" className="px-6 py-3">Name</th>
                                <th scope="col" className="px-6 py-3">Enrollment No.</th>
                                <th scope="col" className="px-6 py-3">Batch</th>
                                <th scope="col" className="px-6 py-3">Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mentordata.students.length > 0 &&
                                mentordata.students.map((student) => (
                                    <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4">
                                            <input 
                                                type="checkbox"  
                                                checked={checkedStudents[student.id] || false} 
                                                onChange={() => handleCheckboxChange(student.id)}
                                            />
                                        </td>
                                        <td className="px-6 py-4">{student.first_name + " " + student.last_name}</td>
                                        <td className="px-6 py-4">{student.enrollment_number ? student.enrollment_number : "NA"}</td>
                                        <td className="px-6 py-4">{student.batch.name}</td>
                                        <td className="px-6 py-4">{student.course.name}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                )}
                 <div className="flex justify-start mt-6">
                            <button className="bg-red-600 rounded p-2 px-12 text-white" onClick={handleSubmit}>Update</button>
                        </div>
            </div>
        </div>
        </>
    );
}
