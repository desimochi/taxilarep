"use client"

import { useEffect, useState } from "react";
import { PencilIcon, PlusCircleIcon, SaveIcon, Trash2Icon } from "lucide-react";
import ClassShed from "@/components/ClassShed";

const UserTable = () => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const [editingRow, setEditingRow] = useState(null); // Track which row is being edited
    const [loading, setLoading] = useState(false)
    const [courses, setCourses] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [isDel, setIsDel] = useState(false)
    const [users, setUsers] = useState([{
        subject: "Marketing Management",
        monday:"10:00-12:00",
        tuesday:"-",
        wednesday:"11:00-12:30",
        thursday:"02:00-04:00",
        friday:"-",
        saturday:"-",
    },
    {
      subject: "Python",
      monday:"-",
      tuesday:"10:0012:00",
      wednesday:"-",
      thursday:"02:00-04:00",
      friday:"-",
      saturday:"11:00-12:30",
  },
]); 
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
        const response = await fetch("http://101.53.148.75:8007/course-viewset", {
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
  }, [token]);


    const handleEditClick = (index) => {
        setEditingRow(index); // Set the clicked row as editable
    };

    const handleSaveClick = () => {
        setEditingRow(null); // Disable editing when save is clicked
    };

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedUsers = [...users];
        updatedUsers[index][name] = value;
        setUsers(updatedUsers);
    };
    const toggleModal = () => {
        setIsOpen(!isOpen);
      };
      
    return (
        <>
        {isOpen && (
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-5xl max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-xl shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-6 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                 Add Class Schedule
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
              <ClassShed/>
              {/* Modal body */}
              
            </div>
          </div>
        </div>
      )}
        <div className="px-5 py-4">
         <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold">Course Schedule</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                    <input type="text" name="name" placeholder="Search Schedule..." className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="w-1/5">
                    <button onClick={toggleModal} className="w-full bg-black py-2.5 flex justify-center gap-1"><PlusCircleIcon className="h-5 w-5"/>Add a New Class schedule</button>
                </div>
                
                </div>
                
            </div>
          <div className="border border-gray-300 rounded-sm mt-5 ">
            <h4 className="text-center pt-5 font-bold">T-29 (Term 5)</h4>
        <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 mt-4 ">
            <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
                <tr >
                    <th className="px-6 py-3">S.No.</th>
                    <th className="px-6 py-3">Subject</th>
                    <th className="px-6 py-3">Monday</th>
                    <th className="px-6 py-3">Tuesday</th>
                    <th className="px-6 py-3">Wednesday</th>
                    <th className="px-6 py-3">Thrusday</th>
                    <th className="px-6 py-3">Friday</th>
                    <th className="px-6 py-3">Saturday</th>
                    <th className="px-6 py-3">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr
                        key={index}
                        className="bg-white border-b dark:bg-gray-800 overflow-x-hidden dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">
                        {index+1}
                      </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="coursename"
                                    value={user.subject}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.subject
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="duration"
                                    value={user.monday}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.monday
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="status"
                                    value={user.tuesday}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.tuesday
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="status"
                                    value={user.wednesday}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.wednesday
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="status"
                                    value={user.thursday}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.thursday
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="status"
                                    value={user.friday}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.friday
                            )}
                        </td>
                        <td className="px-6 py-4">
                            {editingRow === index ? (
                                <input
                                    type="text"
                                    name="status"
                                    value={user.saturday}
                                    onChange={(e) => handleChange(e, index)}
                                    className="border p-1 rounded"
                                />
                            ) : (
                                user.saturday
                            )}
                        </td>
                        <td className="px-6 py-4 flex justify-start gap-4">
                            <span
                                onClick={() =>
                                    editingRow === index ? handleSaveClick() : handleEditClick(index)
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
        </>
    );
};

export default UserTable;

