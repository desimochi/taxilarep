"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import StudenDetails from "@/components/StudenDetails";
import Loader from "@/components/Loaader";

export default function Page(){
    const [isOpen, setIsOpen] = useState(false);
    function hanflemodelopen(){

    }
    const [students, setStudents] = useState([]);
    const [laoding, setloading] = useState(false)
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [year, setYear] = useState("");
    const [batchOptions, setBatchOptions] = useState([]);
    const [filters, setFilters] = useState({
      id: "",
      name: "",
      email: "",
      mobile: "",
      batch: "",
    });
  
    // Fetch student data from the API
    useEffect(() => {
      const fetchStudents = async () => {
        setloading(true)
        try {
          const response = await fetch("https://dummyjson.com/c/9275-5066-4fba-a3d7"); // Replace with actual API URL
          const data = await response.json();
          setStudents(data);
          setFilteredStudents(data);
          setloading(false)
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
  
      fetchStudents();
    }, []);
  
    // Handle input change for filters
    const handleFilterChange = (e) => {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    };
  
    // Handle year selection
    const handleYearChange = (e) => {
      const selectedYear = e.target.value;
      setYear(selectedYear);
  
      // Filter available batch options based on the selected year
      const batches = students
        .filter((s) => s.startYear <= selectedYear && s.endYear >= selectedYear)
        .map((s) => s.batch);
      setBatchOptions([...new Set(batches)]); // Remove duplicates
    };
  
    // Apply filters dynamically
    useEffect(() => {
      let filtered = students.filter((student) => {
        const idMatch = filters.id
          ? student.id.toString().includes(filters.id.trim())
          : true;
        const nameMatch = filters.name
          ? student.name.toLowerCase().includes(filters.name.toLowerCase().trim())
          : true;
        const emailMatch = filters.email
          ? student.email.toLowerCase().includes(filters.email.toLowerCase().trim())
          : true;
        const mobileMatch = filters.mobile
          ? student.mobile.includes(filters.mobile.trim())
          : true;
        const yearMatch = year
          ? student.startYear <= year && student.endYear >= year
          : true;
        const batchMatch = filters.batch ? student.batch === filters.batch : true;
  
        return idMatch && nameMatch && emailMatch && mobileMatch && yearMatch && batchMatch;
      });
  
      setFilteredStudents(filtered);
    }, [filters, year, students]);
    return(
        

<div className="relative overflow-x-auto shadow-md sm:rounded-xl p-8 m-4 bg-white ">
{isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-40 ">
          {/* Modal Content */}
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full ">
            <StudenDetails setIsOpen={setIsOpen} />
          </div>
        </div>
      )}
    <div className="flex gap-3">
        
        <div className="w-full ">
        <div className="flex gap-4 justify-between mb-4">
        <input
          type="number"
          name="year"
          placeholder="Enter Year"
          value={year}
          onChange={handleYearChange}
          className="block p-2 ps-2 text-sm text-gray-700 border border-gray-400 rounded-sm  bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
        />
        <select name="batch" value={filters.batch} onChange={handleFilterChange} className="block p-2 ps-4 text-sm text-gray-700 border border-gray-400 rounded-sm  bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500">
          <option value="">Select Batch</option>
          {batchOptions.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
            <input type="text" name="id" value={filters.id}
          onChange={handleFilterChange}
             className="block p-2 ps-4 text-sm text-gray-700 border border-gray-400 rounded-sm  bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Search with enrollment ID" />
            <input type="text" value={filters.name} name="name"
          onChange={handleFilterChange}
            className="block p-2 ps-4 text-sm text-gray-700 border border-gray-400 rounded-sm bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Search with name" />
            <input type="text" value={filters.email} name="email"
          onChange={handleFilterChange}
            className="block p-2 ps-4 text-sm text-gray-700 border border-gray-400 rounded-sm  bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Search with email" />
            <input type="text" value={filters.mobile} name="mobile"
          onChange={handleFilterChange}
            className="block p-2 ps-4 text-sm text-gray-700 border border-gray-400 rounded-sm  bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" placeholder="Search with mobile" />
            
        </div>
        <div className="flex items-center border border-gray-300 justify-between rounded-xl flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 p-4 bg-gray-100 dark:bg-gray-700">
        
        <div className="flex items-center rounded-md p-1 border border-gray-300 bg-red-50 gap-px ">
            <Link href="/add-student">
                    <button className="py-2.5 px-5 rounded-lg  bg-red-50 text-red-700 text-sm font-medium transition-all duration-300 hover:bg-red-700 hover:text-white">Add New Student</button>
                    </Link>
                  </div>
        <div className="">
        <select id="countries" className="bg-black border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option defaultValue="10" value="10">10</option>
    <option value="20">20</option>
    <option value="25">25</option>
    <option value="50">50</option>
    <option value="100">100</option>
  </select>
        </div>
    </div>
    {laoding ? (
        <Loader />
    ) :(
        <div className="rounded-xl border border-gray-300 mt-4 ">
        {filteredStudents.length > 0 ? (
            <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
            <thead className="text-xs text-white uppercase rounded-xl bg-black dark:bg-gray-700 dark:text-white-400">
                <tr>
                
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Mobile
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Batch
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody className="rounded-xl">
                {filteredStudents.map((student) =>(
                    <tr key={student.id} className="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4">
                        {student.id}
                    </td>
                            <th scope="row" className="flex items-center px-6 py-4 text-gray-700 whitespace-nowrap dark:text-white">
                        <div className="ps-3">
                            <div className="text-base font-semibold">{student.name}</div>
                        </div>  
                    </th>
                    <td className="px-6 py-4">
                        {student.email}
                    </td>
                    <td className="px-6 py-4">
                        {student.mobile}
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> {student.batch}
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <span className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"  onClick={() => setIsOpen(true)} >See Details</span>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
        ) : (<p className="mx-auto p-6 w-full text-center font-bold">No Student Found</p>)}
    
    </div>
    )}
    
        </div>
    </div>
    
</div>

    )
}