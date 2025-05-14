"use client"

import { useEffect, useState } from "react";
import { PenBoxIcon, PencilIcon, PlusCircleIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";
import BackButton from "@/components/ui/Backbutton";
import { hasPermission } from "@/app/lib/checkPermission";
import { useRouter } from "next/navigation";

const UserTable = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [editingRow, setEditingRow] = useState(null); // Track which row is being edited
    const[message, setMessage] = useState("")
    const router = useRouter()
    const[showToast, setShowToast] = useState(false)
    const [errors, setErrors] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const[endDateError, setEndDateError] = useState("")
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deleteBatchId, setDeleteBatchId] = useState(null);
    const [error, setError] = useState(null);
    const [isDel, setIsDel] = useState(false)
    const [batches, setBatches] = useState([]);
    const [formData, setFormData] = useState({
      name: "",
      start_date: "",
      end_date: "",
    });
  const hasadd = hasPermission(("8a256acc08a13bb029f1ab2934cce52f01b86919c99e2331b2e612dafa2465ce"))
  const hasedit = hasPermission(("c6dd7c1d5c2f7b96de18cb441a2897010052524cfb60ac887284c5821d03cf42"))
  const hasDel = hasPermission(("6dc92d0a2a679a7ea7ef223b18bb7c7ef7b3f00434d55c7f84ec8bb162f90a40"))
  const hasView = hasPermission(("cebee63930b50737814baa077d6e10afd32365d06711a4dc7fe527e5cb34b60d"))
 
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await authFetch(`batch-viewset`, {
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
        setBatches(data.data); // Handle different API structures
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    
    if(!hasView){
      router.replace("/unauthorized")
    } else{
      fetchBatches();
    }
  }, [ API_BASE_URL, hasView, router]);

   if (!hasView) {
    return null; // or a full-screen loader if you prefer
  }
    const handleEditClick = (id) => {
        setEditingRow(id); // Set the clicked row as editable
    };
    const handleChange = (e, id, field) => {
      const { value } = e.target;
    
      setBatches((prevCourses) =>
        prevCourses.map((course) =>
          course.id === id
            ? { ...course, [field]: field === "is_active" ? value === "true" : value }
            : course
        )
      );
    };
    const handleSaveClick = async (id) => {
      const batchToUpdate = batches.find(course => course.id === id); // Find the course by ID
    
      if (!batchToUpdate) {
        console.error("Course not found");
        return;
      }
    
      try {
        const response = await authFetch(`batch-viewset/${id}`, {
          method: "PUT", // Use PATCH for partial update; PUT if sending full object
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: batchToUpdate.name,
            start_date: batchToUpdate.start_date,
            end_date: batchToUpdate.end_date,
            is_active: batchToUpdate.is_active
          }),
        });
    
        if (response.ok) {
          const updatedCourse = await response.json();
          console.log(updatedCourse);
    
          setBatches((prevCourses) =>
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
      setLoading(true)
    
      try {
        const response = await authFetch(`batch-viewset/${deleteBatchId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.ok) {
          setBatches((prevCourses) => prevCourses.filter(course => course.id !== deleteBatchId));
          setIsDel(false);
          setDeleteBatchId(null);
          setLoading(false)
        } else {
          console.error("Failed to delete the course");
        }
      } catch (error) {
        console.error("Error:", error);
        setLoading(false)
      }
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
      };
      async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCourse = {
          name: formData.get("name"),
          start_date: formData.get("start_date"),
          end_date: formData.get("end_date"),
          is_active: true,
        };
        const startDate = formData.get("start_date");
    const endDate = formData.get("end_date");
        if (new Date(endDate) < new Date(startDate)) {
          setEndDateError("End date must be after start date.");
          return; // Stop submission
      }
        try {
          const response = await authFetch(`batch-viewset`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourse),
          });
      
          const data = await response.json();
          console.log("Success:", data);
      
          if (response.ok) {
            setBatches((prevBatches) => 
              Array.isArray(prevBatches)
                ? [...prevBatches, data.data]
                : []
            ); 
            setFormData({ name: "", duration_in_months: "", description: "" }); // Reset form fields
            setMessage("Batch created successfully")
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
     
      const filteredbatches = Array.isArray(batches) 
      ? batches.filter(batch =>
          batch.name.toLowerCase().includes(search.toLowerCase())
        )
      : [];
    return (
        <>
        {isOpen && (
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          {showToast && <Toast message={message}/>}
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-xl shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-6 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                 Add New Batch
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <form className="p-6 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Batch Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type Batch Code"
                      required
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label
                      htmlFor="start_date"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Batch Session Start Date
                    </label>
                    <input
                      type="date"
                      name="start_date"
                      id="start_date"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    {endDateError && (
                      <p className="text-red-500 text-sm">{endDateError}</p>
                    )}
                    <label
                      htmlFor="end_date"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Batch Session End Date
                    </label>
                    <input
                      type="date"
                      name="end_date"
                      id="end_date"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                
                      required
                    />
                  </div>
                 
                  
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex justify-center w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Add Batch
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
        <div className="px-5 py-8">
        <BackButton/>
         <div className=" py-4 px-12">
        
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold">Batch Manager</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                <input type="text" placeholder="search..."  className="p-2 rounded-sm text-gray-700 border-2"  value={search} onChange={(e) => setSearch(e.target.value)}/>
                </div>
                {hasadd &&<div className="w-1/5">
                    <button onClick={toggleModal} className="w-full bg-red-100 text-red-800 rounded-sm py-2.5 flex justify-center gap-1"><PlusCircleIcon className="h-5 w-5"/>Add a New Batch</button>
                </div>}
                
                </div>
                <hr className="border border-b-2 mt-4"/>
            </div>
<div className="px-12">
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 ">
            <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-white-400 w-full">
                <tr >
                    <th className="px-6 py-3">Batch Name</th>
                    <th className="px-6 py-3">Start Date</th>
                    <th className="px-6 py-3">End Date</th>
                    <th className="px-6 py-3">Active</th>
                    {(hasDel || hasedit) && <th className="px-6 py-3">Action</th>}

                </tr>
            </thead>
            <tbody>
                {filteredbatches.length>0 ? filteredbatches.map((batch, index) => (
                    <tr
                        key={batch.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
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
                                    type="date"
                                    name="start_date"
                                    value={batch.start_date}
                                    onChange={(e) => handleChange(e, batch.id, "start_date")}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                batch.start_date
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === batch.id ? (
                                <input
                                    type="date"
                                    name="status"
                                    value={batch.end_date}
                                    onChange={(e) => handleChange(e, batch.id, "end_date")}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                batch.end_date
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
          batch.is_active ? <span className="bg-green-100 px-2 py-1 rounded-sm text-sm text-green-800">Active</span> : <span className="bg-red-100 px-2 py-1 rounded-sm text-sm text-red-800">Inactive</span>
        )}
      </td>
                        <td className="px-6 py-4 flex justify-start gap-4">
                        {hasedit &&<button onClick={() => (editingRow === batch.id ? handleSaveClick(batch.id) : handleEditClick(batch.id))}>
          {editingRow === batch.id ? <SaveIcon className="h-5 w-5 text-green-600" /> : <PenBoxIcon className="h-5 w-5 text-red-800" />}
        </button> }
        {hasDel && <button onClick={() => handleDeleteClick(batch.id)}>
          <Trash2Icon className="h-5 w-5 text-red-600" />
        </button> }
                        </td>
                    </tr>
                )) : <tr><td colSpan={5}>No Batches Data Found</td></tr>}
            </tbody>
        </table>
        </div>
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
                disabled={loading}
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

export default UserTable;

