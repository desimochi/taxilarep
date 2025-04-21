"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import StudenDetails from "@/components/StudenDetails";
import Loader from "@/components/Loaader";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import DownloadAdmitCard from "@/components/DownloadAdmitCard";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const [students, setStudents] = useState([]);
  const [halllaoding, sethallLoading] = useState([])
  const [loading, setLoading] = useState(false);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [admitcard, setAdmicard] = useState({})
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const term = searchParams.get("term");

  const [filters, setFilters] = useState({
    batch: "",
    search: "",
  });

  // Fetch student data from the API
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await authFetch("student-list"); // Replace with actual API URL
        const data = await response.json();
        setStudents(data.data);
        setFilteredStudents(data.data);

        // Extract unique batches for dropdown
        const batches = [
          ...new Set(data.data.map((s) => s.batch?.name).filter(Boolean)),
        ];
        setBatchOptions(batches);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Apply filters dynamically
  useEffect(() => {
    let filtered = students.filter((student) => {
      const batchMatch = filters.batch
        ? student.batch?.name === filters.batch
        : true;

        const searchMatch = filters.search
        ? `${student.first_name} ${student.middle_name !== "nan" ? student.middle_name : ""} ${student.last_name}`
            .toLowerCase()
            .includes(filters.search.toLowerCase().trim()) ||
          student.user?.email
            .toLowerCase()
            .includes(filters.search.toLowerCase().trim()) ||
          student.enrollment_number
            ?.toString()
            .toLowerCase()
            .includes(filters.search.toLowerCase().trim()) // ✅ Convert to string and match
        : true;
      

      return batchMatch && searchMatch;
    });

    setFilteredStudents(filtered);
  }, [filters, students]);

  async function handledownload(id) {
        sethallLoading(true);
        try {
          const response = await authFetch(`hall-ticket/${id}/${term}`); // Replace with actual API URL
          const data = await response.json();
          setAdmicard(data.data);
        } catch (error) {
          console.error("Error fetching students:", error);
        } finally {
          sethallLoading(false);
        }
      };

  return (
    <div className="relative overflow-x-auto sm:rounded-xl p-8 m-4 ">
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-40 overflow-x-auto">
          <div className="p-6 ">
           <DownloadAdmitCard data={admitcard} isOpen={setIsOpen} onClose={() => setIsOpen(false)}/>
          </div>
        </div>
      )}

      {/* Filters */}
      

      {/* Add New Student Button */}
      <div className="">
        <h4 className="text-2xl font-sans font-bold ">Download Admit Card</h4>
        <p className="text-gray-600">Here you can download the admit card of every student</p>
       

      </div>
      <hr className="border border-b-2 mt-4 mb-6"/>
      <div className="flex gap-3 mb-4 justify-between">
        <div className="flex gap-2">
        

        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by Name, Email, or ID"
          className="block p-2 ps-4 text-sm text-gray-700 border border-gray-400 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500"
        />
<select
          name="batch"
          value={filters.batch}
          onChange={handleFilterChange}
          className="block p-2 ps-4 text-sm text-gray-700 border border-gray-400 rounded-sm bg-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Batch</option>
          {batchOptions.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
        </div>
       
         <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="block p-2 text-sm text-gray-700 border border-gray-400 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {/* Table */}
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-xl border border-gray-300 mt-4">
          {filteredStudents.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-red-800 uppercase bg-red-50">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Enrollment.No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.slice(0, pageSize).map((student, index) => (
                  <tr key={student.id} className="bg-white border-b hover:bg-gray-50">
                     <td className="px-6 py-4">{index+1}</td>
                    <td className="px-6 py-4">{student.enrollment_number}</td>
                    <td className="px-6 py-4 font-semibold">
                      {student.first_name}{" "}
                      {student.middle_name !== "nan" ? student.middle_name : ""}{" "}
                      {student.last_name}
                    </td>
                    <td className="px-6 py-4">{student.user?.email}</td>
                    <td className="px-6 py-4">
                    <button 
  onClick={() => {
    handledownload(student.id);
    setIsOpen(true);
  }}
  className="font-medium text-red-800 bg-red-50 px-3 py-1 rounded-sm cursor-pointer flex items-center gap-1"
>
  <Download className="h-4 w-4"/> Download
</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mx-auto p-6 w-full text-center font-bold">No Student Found</p>
          )}
        </div>
      )}
    </div>
  );
}
