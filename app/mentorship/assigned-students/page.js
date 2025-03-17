"use client"
import { useState, useEffect } from "react";
import { Trash2 as Trash2Icon } from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Link from "next/link";

export default function MentorStudentTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [batchFilter, setBatchFilter] = useState("");
  const [courseFilter, setCourseFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
        const response = await authFetch(`membership-viewset?page=${page}&limit=10`);
        const result = await response.json();
        setData(result.data);
        setFilteredData(result.data);
        setTotalPages(result.extra.total);
      };
    fetchData();
  }, [page]);

  

  useEffect(() => {
    let filtered = data;
    if (batchFilter) {
      filtered = filtered.filter((item) =>
        item.students.some((s) => s.batch.name === batchFilter)
      );
    }
    if (courseFilter) {
      filtered = filtered.filter((item) =>
        item.students.some((s) => s.course.name === courseFilter)
      );
    }
    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.students.some((s) =>
          `${s.first_name} ${s.middle_name} ${s.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    setFilteredData(filtered);
  }, [batchFilter, courseFilter, searchTerm, data]);

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <div className="w-1/3">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        </div>
     <div className="w-1/3">
     <select
          onChange={(e) => setBatchFilter(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">All Batches</option>
          <option value="T28">T28</option>
        </select>
     </div>
        <div className="w-1/3">
        <select
          onChange={(e) => setCourseFilter(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">All Courses</option>
          <option value="PGDM + Business Analytics">PGDM + Business Analytics</option>
        </select>
        </div>
        
      </div>

      <table className="w-full text-sm text-left text-gray-800">
        <thead className="text-xs text-white uppercase bg-black">
          <tr>
            <th className="px-6 py-3">Mentor Name</th>
            <th className="px-6 py-3">Assigned Students</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((mentor) => (
            <tr key={mentor.user.id} className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 border-r-2 border-l-2">{mentor.user.first_name} {mentor.user.last_name}</td>
              <td className="px-6 py-4 border-r-2">
                <ul>
                  {mentor.students.map((student) => (
                    <li key={student.id} className="flex justify-between">
                      <p>{student.first_name} {student.middle_name? student.middle_name : " "} {student.last_name}</p>
                    </li>
                  ))}
                </ul>
                
              </td>
              <td className="px-6 py-4 border-r-2"><Link href={`/mentorship/edit-mentorship?mentorshipId=${mentor.id}`} className="text-blue-500">Edit Details</Link></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded bg-gray-200 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}