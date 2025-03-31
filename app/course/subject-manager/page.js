"use client"

import { useState, useEffect } from "react";
import { PencilIcon, PlusCircleIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Addsubject from "@/components/AddSubject";
import AssignedSubject from "@/components/AssignedSubject";
import CourseSelection from "@/components/AssignSubject";

const UserTable = () => {
    const [editingRow, setEditingRow] = useState(null); 
    const [activeTab, setActiveTab] = useState("subject");
    const[loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [isDel, setIsDel] = useState(false)
    const [users, setUsers] = useState([]); 
useEffect(() => {
    const fetchCourses = async () => {
     
      try {
        const response = await authFetch(`subject-viewset`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data.data); // Handle different API structures
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

    const handleEditClick = (index) => {
        setEditingRow(index); // Set the clicked row as editable
    };

    const handleSaveClick = async (id) => {
        const courseToUpdate = users.find(course => course.id === id);
      
        if (!courseToUpdate) {
          console.error("Course not found");
          return;
        }
      
        try {
          const response = await authFetch(`subject-viewset/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: courseToUpdate.name,
              code: courseToUpdate.code,
              credit: courseToUpdate.credit,
              is_active: courseToUpdate.is_active,
              type: courseToUpdate.type,
            }),
          });
      
          if (response.ok) {
            const updatedCourse = await response.json();
      
            setUsers(prevCourses =>
              prevCourses.map(course =>
                course.id === id ? { ...course, ...updatedCourse.data } : course
              )
            );
    
            setEditingRow(null); // Exit edit mode
          } else {
            console.error("Failed to update course");
          }
        } catch (error) {
          console.error("Error updating course:", error);
        }
    };
    

      const handleChange = (e, index) => {
        const { name, value } = e.target;
        
        setUsers(prevUsers => 
            prevUsers.map((user, i) => 
                i === index ? { ...user, [name]: value } : user
            )
        );
    };
    
    const toggleModal = () => {
        setIsOpen(!isOpen);
      };
      function handleSubmit (e){ 
        e.preventDefault()
        console.log("submitted")
    }
    return (
        <>
        <div className="border-b border-gray-200 dark:border-gray-700 px-5">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {[
            { id: "subject", label: "All Subjects" },
            { id: "addsubject", label: `+ Add Subject` },
            { id: "assignedsub", label: `Assigned Subject` },
            { id: "assignsub", label: `+ Assign Subject` },
          ].map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                  activeTab === tab.id
                    ? "text-black border-black dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
       {activeTab==="subject" && <>
        <div className="px-5 py-4">
         <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold">Subject Manager</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                  <input type="text" placeholder="Search..." className="border border-gray-300 rounded-md p-2 w-full" />
        </div>
    
            
                </div>
                
            </div>
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 mt-4">
            <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
                <tr >
                    <th className="px-6 py-3">S. No.</th>
                    <th className="px-6 py-3">Subject Name</th>
                    <th className="px-6 py-3">Code</th>
                    <th className="px-6 py-3">Credit</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                        <td className="px-6 py-4">{index+1}</td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.name
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="code"
                                    value={user.code}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.code
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="number"
                                    name="credit"
                                    value={user.credit}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.credit
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                 <select
                                 value={user.type}
                                 onChange={(e) => handleChange(e, user.id, "type")}
                                 className="border rounded px-2 py-1"
                               >
                                 <option value="Theory">Theory</option>
                                 <option value="Practical">Practical</option>
                               </select>
                            ) : (
                                user.type
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                 <select
                                 value={user.is_active ? "true" : "false"}
                                 onChange={(e) => handleChange(e, user.id, "is_active")}
                                 className="border rounded px-2 py-1"
                               >
                                 <option value="true">Active</option>
                                 <option value="false">Inactive</option>
                               </select>
                            ) : (
                                user.is_active ? "Active" : "Inactive"
                            )}
                        </td>
                        <td className="px-6 py-4 flex justify-start gap-4">
                            <span
                                onClick={() =>
                                    editingRow === index ? handleSaveClick(user.id) : handleEditClick(index)
                                }
                                className="cursor-pointer"
                            >
                                {editingRow === index ? (
                                    <SaveIcon className="h-5 w-5 text-green-600" />
                                ) : (
                                    <PencilIcon className="h-5 w-5 text-blue-600" />
                                )}
                            </span>
                            <span className="cursor-pointer">
                                <Trash2Icon className="h-5 w-5 text-red-600" onClick={()=>setIsDel(true)}/>
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        {isDel && (
        <div
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
          <div className="relative m-4 p-4 rounded-lg bg-white shadow-sm transition-all duration-300 opacity-100 translate-y-0 scale-100">
       
            <div className="relative font-semibold  border-b border-slate-200 py-4 px-8 leading-normal text-slate-800">
              Do you want to delete this item?
            </div>
            <div className="flex shrink-0 flex-wrap gap-3 items-center pt-4 justify-between">
            <button
                onClick={() => setIsDel(false)}
                className="rounded-md bg-red-600 w-full py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsDel(false)}
                className="rounded-md border bg-slate-200 hover:text-white border-transparent w-full py-2 px-4 text-center text-sm transition-all text-slate-800 hover:bg-slate-900 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Cancel
              </button>
              
            </div>
          </div>
        </div>
      )}
       </>}
       {activeTab==="addsubject" && <Addsubject/>}
       {activeTab==="assignedsub" && <AssignedSubject/>}
       {activeTab==="assignsub" && <CourseSelection/>}
        </>
    );
};

export default UserTable;

