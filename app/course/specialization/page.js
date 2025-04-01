"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { SaveIcon, Trash2Icon, PencilIcon } from "lucide-react"
import { useEffect, useState } from "react";

export default function Page(){
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [editingRow, setEditingRow] = useState(null);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchCourses = async () => {
      console.log(token)

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await authFetch(`specialization-viewset`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        setCourses(data.data); // Handle different API structures
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token, API_BASE_URL]);
  const handleEditClick = (id) => {
    setEditingRow(id); // Store ID instead of index
  };

  const handleChange = (e, id, field) => {
    const { value } = e.target;
  
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id
          ? { ...course, [field]: field === "is_active" ? value === "true" : value }
          : course
      )
    );
  };
  const handleSaveClick = async (id) => {
    const courseToUpdate = courses.find(course => course.id === id); // Find the course by ID
  
    if (!courseToUpdate) {
      console.error("Course not found");
      return;
    }
  
    try {
      const response = await authFetch(`specialization-viewset/${id}`, {
        method: "PUT", // Use PATCH for partial update; PUT if sending full object
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: courseToUpdate.name,
          description: courseToUpdate.description,
        }),
      });
  
      if (response.ok) {
        const updatedCourse = await response.json();
        console.log(updatedCourse);
  
        setCourses((prevCourses) =>
          prevCourses.map(course =>
            course.id === id ? updatedCourse.data : course
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
  const handleDeleteClick = (id) => {
    setDeleteCourseId(id);
    setIsDel(true);
  };
  const handleConfirmDelete = async () => {
    if (!deleteCourseId) return;
  
    try {
      const response = await authFetch(`specialization-viewset/${deleteCourseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setCourses((prevCourses) => prevCourses.filter(course => course.id !== deleteCourseId));
        setIsDel(false);
        setDeleteCourseId(null);
      } else {
        console.error("Failed to delete the course");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
      const filteredCourses = Array.isArray(courses) 
  ? courses.filter(term =>
      term.name.toLowerCase().includes(search.toLowerCase())
    )
  : [];
    return (
        <>
        <div className="py-4 px-5">
           <div className="flex gap-2">
                <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold">Specialization List</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-2/5">
                    <input type="text" name="search" placeholder="Seacrh...." value={search} onChange={(e) => setSearch(e.target.value)} className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                </div>
                
            </div>
            </div>
             <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
                <th scope="col" className="px-6 py-3">S. No.</th>
                <th scope="col" className="px-6 py-3">Specialization Name</th>
                <th scope="col" className="px-6 py-3">Description</th>
                <th scope="col" className="px-6 py-3">Action</th>
            </tr>
        </thead>
        <tbody className="w-full">
        {filteredCourses? filteredCourses.map((course, index) => (
    <tr key={course.id} className="bg-white border-b hover:bg-gray-50 text-black">
        <td className="px-6 py-4">{index+1}</td>
      <td className="px-6 py-4">
        {editingRow === course.id ? (
          <input
            type="text"
            value={course.name}
            onChange={(e) => handleChange(e, course.id, "name")}
            className="border rounded px-2 py-1"
          />
        ) : (
          course.name
        )}
      </td>
    
      <td className="px-6 py-4">
        {editingRow === course.id ? (
          <input
            type="text"
            value={course.description}
            onChange={(e) => handleChange(e, course.id, "description")}
            className="border rounded px-2 py-1"
          />
        ) : (
          course.description
        )}
      </td>
      <td className="px-6 py-4 flex gap-4">
        <button onClick={() => (editingRow === course.id ? handleSaveClick(course.id) : handleEditClick(course.id))}>
          {editingRow === course.id ? <SaveIcon className="h-5 w-5 text-green-600" /> : <PencilIcon className="h-5 w-5 text-blue-600" />}
        </button>
        {/* <button onClick={() => handleDeleteClick(course.id)}>
          <Trash2Icon className="h-5 w-5 text-red-600" />
        </button> */}
      </td>
    </tr>
  )) : <p>No Courses Found</p>}
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
                onClick={handleConfirmDelete}
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
    </>
    )
}