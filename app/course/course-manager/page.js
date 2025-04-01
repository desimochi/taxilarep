"use client";

import { useState, useEffect } from "react";
import { PencilIcon, PlusCircleIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";

export default function Page () {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [editingRow, setEditingRow] = useState(null);
  const [token, setToken] = useState(null);
  const[message, setMessage] = useState("")
  const[showToast, setShowToast] = useState(false)
  const [errors, setErrors] = useState({});

  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDel, setIsDel] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    duration_in_months: "",
    description: "",
  });
  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);
  useEffect(() => {
    const fetchCourses = async () => {
      console.log(token)

      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await authFetch(`course-viewset`, {
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
  
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleSaveClick = async (id) => {
    const courseToUpdate = courses.find(course => course.id === id); // Find the course by ID
  
    if (!courseToUpdate) {
      console.error("Course not found");
      return;
    }
  
    try {
      const response = await authFetch(`course-viewset/${id}`, {
        method: "PUT", // Use PATCH for partial update; PUT if sending full object
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: courseToUpdate.name,
          duration_in_months: courseToUpdate.duration_in_months,
          description: courseToUpdate.description,
          is_active: courseToUpdate.is_active
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
  

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCourse = {
      name: formData.get("name"),
      duration_in_months: formData.get("duration_in_months"),
      is_active: true,
      description: formData.get("description"),
    };
  
    try {
      const response = await authFetch(`course-viewset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });
  
      const data = await response.json();
      console.log("Success:", data);
  
      if (response.ok) {
        setCourses((prevCourses) => 
          Array.isArray(prevCourses)
            ? [...prevCourses, data.data]
            : []
        );
        
        setFormData({ name: "", duration_in_months: "", description: "" });
        setMessage("Course created successfully")
            setShowToast(true)
            setTimeout(()=>{
        
              setShowToast(false)
              setMessage("")
              toggleModal();
            },2000) 
      } else {
        if (data.message) {
          const errorMessages = {};
          data.message.forEach((error) => {
            const [field, msg] = error.split(": ");
            errorMessages[field] = msg;
          });
          setErrors(errorMessages);
        } else {
          setMessage("Something went wrong.");
          setShowToast(true);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  const handleDeleteClick = (id) => {
    setDeleteCourseId(id);
    setIsDel(true);
  };
  const handleConfirmDelete = async () => {
    setLoading(true)
    if (!deleteCourseId) return;
    
    try {
      const response = await authFetch(`course-viewset/${deleteCourseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        setCourses((prevCourses) => prevCourses.filter(course => course.id !== deleteCourseId));
        setIsDel(false);
        setDeleteCourseId(null);
        setLoading(false)
      } else {
        console.error("Failed to delete the course");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false)
    }
  };
  const filteredCourses = Array.isArray(courses) 
  ? courses.filter(course =>
      course.name.toLowerCase().includes(search.toLowerCase())
    )
  : [];


  return (
    <>
      {/* Add Course Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-xl shadow-sm">
              <div className="flex items-center justify-between p-6 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-700">Add New Course</h3>
                <button onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
                  ✖
                </button>
              </div>

              <form className="p-6" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    <label className="block mb-2 text-sm font-bold text-gray-700">Course Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 w-full"
                      placeholder="Type course name"
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">Duration (in months)</label>
                    <input
                      type="number"
                      name="duration_in_months"
                      value={formData.duration_in_months}
                      onChange={(e) => setFormData({ ...formData, duration_in_months: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 w-full"
                      placeholder="Enter Duration in Months..."
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-bold text-gray-700">Course Description</label>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 w-full"
                      placeholder="Enter Description..."
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="text-white bg-red-700 hover:bg-red-800 px-5 py-2.5 w-full rounded-lg">
                  Add Course
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="px-5 py-4">
        {showToast && <Toast message={message}/>}
        <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-4">
          <div className="flex justify-between items-center">
            <h5 className="text-2xl font-bold">Course Manager</h5>
            <div className="flex gap-2">
            <input type="text" placeholder="search..."  className="p-2 rounded-sm text-gray-700"  value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={toggleModal} className="bg-black py-2 px-4 flex gap-1 items-center rounded-lg">
              <PlusCircleIcon className="h-5 w-5" /> Add Course
            </button>
            </div>
          </div>
        </div>

        <table className="w-full text-sm text-left mt-4">
          <thead className="text-xs uppercase bg-black text-white">
            <tr>
              <th className="px-6 py-3">Course Name</th>
              <th className="px-6 py-3">Duration (Months)</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
  {filteredCourses.map((course) => (
    <tr key={course.id} className="bg-white border-b hover:bg-gray-50 text-black">
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
            type="number"
            value={course.duration_in_months}
            onChange={(e) => handleChange(e, course.id, "duration_in_months")}
            className="border rounded px-2 py-1"
          />
        ) : (
          course.duration_in_months
        )}
      </td>

      <td className="px-6 py-4">
        {editingRow === course.id ? (
          <select
            value={course.is_active ? "true" : "false"}
            onChange={(e) => handleChange(e, course.id, "is_active")}
            className="border rounded px-2 py-1"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        ) : (
          course.is_active ? "Active" : "Inactive"
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
  ))}
</tbody>

        </table>
      </div>
      {isDel && (
        <div
          className="fixed inset-0 z-40 grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
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
                {loading?"Deleting....":"Confirm"}
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
  );
};

