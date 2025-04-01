"use client"
import { Trash2Icon, SaveIcon, PencilIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";

export default function Page(){
    const token = localStorage.getItem("accessToken");
    const [editingRow, setEditingRow] = useState(null); 
    const[terms, setTerms] = useState([])
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [deleteBatchId, setDeleteBatchId] = useState(null);
    const [isDel, setIsDel] = useState(false)
  useEffect(() => {
    const fetchTerms = async () => {
      console.log(token)

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await authFetch("terms-viewset", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        setTerms(data.data); // Handle different API structures
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, [token]);
  const handleEditClick = (id) => {
    setEditingRow(id); // Set the clicked row as editable
};

const handleChange = (e, id, field) => {
    const { value } = e.target;
  
    setTerms((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id
          ? { ...course, [field]: field === "is_active" ? value === "true" : value }
          : course
      )
    );
  };
  const handleSaveClick = async (id) => {
    const termToUpdate = terms.find(term => term.id === id); // Find the course by ID
  
    if (!termToUpdate) {
      console.error("Course not found");
      return;
    }
  
    try {
      const response = await authFetch(`terms-viewset/${id}`, {
        method: "PUT", 
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: termToUpdate.name,
          duration_in_months: termToUpdate.duration_in_months,
          is_active: termToUpdate.is_active
        }),
      });
  
      if (response.ok) {
        const updatedCourse = await response.json();
        console.log(updatedCourse);
  
        setTerms((prevCourses) =>
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
    setDeleteBatchId(id);
    setIsDel(true);
  };
  const handleConfirmDelete = async () => {
    if (!deleteBatchId) return;
  
    try {
      const response = await authFetch(`terms-viewset/${deleteBatchId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setTerms((prevCourses) => prevCourses.filter(course => course.id !== deleteBatchId));
        setIsDel(false);
        setDeleteBatchId(null);
      } else {
        console.error("Failed to delete the course");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const filteredTerms = Array.isArray(terms) 
  ? terms.filter(term =>
      term.name.toLowerCase().includes(search.toLowerCase())
    )
  : [];
    return(
        <>
        <div className="px-5 py-4">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold">Term Manager</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                <input type="text" placeholder="search..."  className="p-2 rounded-sm text-gray-700"  value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                
                </div>
                
            </div>
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 mt-4">
    
            <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
                <tr >
                    <th className="px-6 py-3">S.No.</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Duration</th>
                    <th className="px-6 py-3">Active</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {filteredTerms.map((batch, index) => (
                    <tr
                        key={batch.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    ><td className="px-6 py-4">{index+1}</td>
                        <td className="px-6 py-4">
                            {editingRow === batch.id ? (
                                <input
                                    type="text"
                                    name="coursename"
                                    value={batch.name}
                                    onChange={(e) => handleChange(e, batch.id, "name")}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                batch.name
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === batch.id ? (
                                <input
                                    type="number"
                                    name="duration_in_months"
                                    value={batch.duration_in_months}
                                    onChange={(e) => handleChange(e, batch.id, "duration_in_months")}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                batch.duration_in_months
                            )}
                        </td>
                
                        <td className="px-6 py-4">
        {editingRow === batch.id ? (
          <select
            value={batch.is_active ? "true" : "false"}
            onChange={(e) => handleChange(e, batch.id, "is_active")}
            className="border rounded px-2 py-1"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        ) : (
          batch.is_active ? "Active" : "Inactive"
        )}
      </td>
                        <td className="px-6 py-4 flex justify-start gap-4">
                        <button onClick={() => (editingRow === batch.id ? handleSaveClick(batch.id) : handleEditClick(batch.id))}>
          {editingRow === batch.id ? <SaveIcon className="h-5 w-5 text-green-600" /> : <PencilIcon className="h-5 w-5 text-blue-600" />}
        </button>
        {/* <button onClick={() => handleDeleteClick(batch.id)}>
          <Trash2Icon className="h-5 w-5 text-red-600" />
        </button> */}
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