"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import { PencilIcon, EyeIcon, UploadCloud, UploadCloudIcon, ListIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import FullWidthLoader from "@/components/Loaader";
import Toast from "@/components/Toast";

export default function AssignedSubject({}){
    const[isDel, setIsDel] = useState(false)
    const [loading, setLoading] = useState(false)
    const [checkedState, setCheckedState] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
    const[error, setError] = useState(false)
    const [edit, setEdit] = useState(false);
    const[assignedSub, setAssignedSub] = useState([])
    const[term, setTerm] = useState([])
    const[message, setMessage] = useState("")
    const[showToast, setShowToast] = useState(false)
    const[batch, setBatch] = useState([])
    const[course, setCourse] = useState([])
    const [selectedTerm, setselectedTerm] = useState("");
    const [selectedBatch, setselectedBatch] = useState("");
    const [selectedCourse, setselectedCourse] = useState("");
     const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
    const fetchCourses = async () => {

      setLoading(true)
      try {
        const [response] = await Promise.all([
          await authFetch(`subject-mapping-viewset?course=${2}&page=${currentPage}`)
      ])

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json()
        setAssignedSub(data.data);
        setTotalPages(data.extra?.total || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
    }, [currentPage]);

    return(
        <>
        <div className="py-4 px-5">
        {showToast && <Toast message={message}/>}
            <div className="  py-8 sm:px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold">EPGDM Subjects</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                <input
  type="text"
  placeholder="Search..."
  className="border border-gray-300 rounded-md p-2 w-full"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
                </div>
               
                </div>
                <hr className="border border-b-2 mt-4 mb-6"/>
            
            </div>
            {}
         

{error && <p className="mx-12 text-sm text-red-800">{error}</p> }
          {loading? <FullWidthLoader/> : <div className="sm:px-12"><div className="overflow-x-auto shadow-md sm:rounded-lg">  <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 mb-2">
        <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
                {edit&& <th scope="col" className="px-6 py-3">-</th>}
                <th scope="col" className="px-6 py-3">S.No.</th>
                <th scope="col" className="px-6 py-3">Course Name</th>
                <th scope="col" className="px-6 py-3">Batch Name</th>
                <th scope="col" className="px-6 py-3">Term</th>
                <th scope="col" className="px-6 py-3">Assigned Subject</th>
                <th scope="col" className="px-6 py-3">Type</th>
                <th scope="col" className="px-6 py-3">Assigned Faculty</th>
                <th scope="col" className="px-6 py-3">Action</th>
            </tr>
        </thead>
        <tbody className="w-full">
        {assignedSub && assignedSub.length>0? assignedSub.map((course, index) => (
    <tr key={course.id} className="bg-white border-b hover:bg-gray-50 text-black">
        {edit && <td className="px-6 py-4"><input
              type="checkbox"
              checked={checkedState[course.id] || false}
              onChange={() => handleCheckboxChange(course.id)}
            /></td> }     
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
      
      <td className="px-6 py-3">{course.type  ==="main"? <span className="text-sm text-green-800 bg-green-50 rounded-sm px-2 py-.5 border">main</span>:<span className="text-sm text-red-800 bg-red-50 rounded-sm px-2 py-.5 border">{course.type}</span>}</td>
      <td className="px-6 py-4">
       {course.faculty.first_name +" " + course.faculty.last_name}
      </td>
      
      <td className="sm:px-6 py-4 flex items-center  gap-2 ">
         <Link href={`/epgdm/subjects/edit?subId=${course.id}`} ><UploadCloudIcon className="h-5 w-5 text-gray-600" /> </Link>
        <Link href={`/epgdm/subjects/${course.id}?subName=${course.subject.name}`} ><ListIcon className="h-5 w-5 text-gray-600"/></Link>
      </td>
    </tr>
  )) : <tr className="text-center mt-4"><td colSpan={7}>No Subject Found For Selected Filter</td></tr>}
        </tbody>
    </table></div></div>}
    <div className="flex justify-between mt-4 mx-12">
        <button
          onClick={() => setCurrentPage((prev) => (prev - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-gray-100 rounded-l disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-900">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => (prev + 1))}
          disabled={currentPage === totalPages}
          className="px-8 py-2 bg-red-800 text-red-50 rounded-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
        </div>
        {isDel && (
            <div
              className="fixed inset-0 z-[80] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
            >
              
              <div className="relative m-4 p-4 rounded-lg bg-white shadow-sm transition-all duration-300 opacity-100 translate-y-0 scale-100">
           
                <div className="relative font-semibold  border-b border-slate-200 py-4 px-8 leading-normal text-slate-800">
                  Are You Want to Update the Status
                </div>
                <div className="flex shrink-0 flex-wrap gap-3 items-center pt-4 justify-between">
                <button
                    onClick={handleSubmitAll}
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