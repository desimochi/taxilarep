"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import { SaveIcon, PencilIcon } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loader from "./Loaader";
import FullWidthLoader from "./Loaader";

export default function AssignedSubject(){
    const[isDel, setIsDel] = useState(false)
    const [loading, setLoading] = useState(false)
    const[error, setError] = useState(false)
    const [editingRow, setEditingRow] = useState(null);
    const[assignedSub, setAssignedSub] = useState([])
    const [search, setSearch] = useState("");
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
    const fetchCourses = async () => {
      
      if (!token) {
        setError("No token found. Please log in.");
        setLoading(false);
        return;
      }
      setLoading(true)
      try {
        const response = await authFetch(`subject-mapping-viewset`, {
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
        setAssignedSub(data.data); // Handle different API structures
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token]);


  const filteredSubjects = Array.isArray(assignedSub) 
  ? assignedSub.filter(item =>
      item.subject?.name?.toLowerCase().includes(search.toLowerCase())
    )
  : [];

    return(
        <>
        <div className="py-4 px-5">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold">Assigned Subject</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                    <input type="text" name="name" placeholder="Search..." className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
               
                </div>
                
            </div>
          {loading? <FullWidthLoader/> :   <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
                <th scope="col" className="px-6 py-3">S.No.</th>
                <th scope="col" className="px-6 py-3">Course Name</th>
                <th scope="col" className="px-6 py-3">Batch Name</th>
                <th scope="col" className="px-6 py-3">Term</th>
                <th scope="col" className="px-6 py-3">Assigned Subject</th>
                <th scope="col" className="px-6 py-3">Assigned Faculty</th>
                <th scope="col" className="px-6 py-3">Action</th>
            </tr>
        </thead>
        <tbody className="w-full">
        {filteredSubjects? filteredSubjects.map((course, index) => (
    <tr key={course.id} className="bg-white border-b hover:bg-gray-50 text-black">
        <td className="px-6 py-4">{index+1}</td>
        <td className="px-6 py-4">
  {course.course.map((cor) => (
    <span key={cor.id}>{cor.name}</span>
  ))}
</td>

    
      <td className="px-6 py-4">
       {course.batch.name}
      </td>
      <td className="px-6 py-4">
       {course.term.name}
      </td>
      <td className="px-6 py-4">
       {course.subject.name}
      </td>
      <td className="px-6 py-4">
       {course.faculty.first_name +" " + course.faculty.last_name}
      </td>
      <td className="px-6 py-4 flex gap-4">
       <Link href={`subject-manager/edit-assignedSub?subjectId=${course.id}`}>
        <PencilIcon className="h-5 w-5" />
       </Link>
      </td>
    </tr>
  )) : <p>No Courses Found</p>}
        </tbody>
    </table>}
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
    )
}