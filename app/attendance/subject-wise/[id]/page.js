"use client"

import { authFetch } from "@/app/lib/fetchWithAuth"
import FullWidthLoader from "@/components/Loaader"
import { set } from "date-fns"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

export default function Page() {
    const {id} = useParams()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [sub, setSub] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await authFetch(`subject-attendance/${id}`)
                if (!response.ok) {
                    throw new Error(`Error: ${response.code} - ${response.message}`)
                }
                const res = await response.json()
                setData(res.data)
                setSub(res.extra.subject_name)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()

    },[id])
 return(
    <>
    <div className="  py-8 px-12">
                    <div className="flex justify-between items-center gap-2">
                        <div className="w-3/5">
                    <h5 className="text-2xl font-bold">Student Attendance - {sub}</h5>
                    <span className="text-sm text-gray-400">Taxila Business School</span>
                    </div>
                    <div className="w-1/5">
                    <input
      type="text"
      placeholder="Search Student..."
      className="border border-gray-300 rounded-md p-2 w-full"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
                    </div>
                   
                    </div>
                    <hr className="border border-b-2 mt-4 mb-6"/>
                 
                </div>
        <div className="px-12">
            {loading ? <FullWidthLoader /> : (
                <table className="w-full border-collapse text-center">
                    <thead className="text-xs text-red-800 uppercase bg-red-50 dark:bg-gray-700 dark:text-white-400 w-full">
                        <tr >
                        <th scope="col" className="px-6 py-3">S.No.</th>
                            <th scope="col" className="px-6 py-3">Student Name</th>
                            <th scope="col" className="px-6 py-3">Enrollement No.</th>
                            <th scope="col" className="px-6 py-3">Total Classes</th>
                            <th scope="col" className="px-6 py-3">Completed Classes</th>
                            <th scope="col" className="px-6 py-3">Present</th>
                            <th scope="col" className="px-6 py-3">Absent</th>
                            <th scope="col" className="px-6 py-3">Attendance %</th>
                        </tr>
                    </thead>
                    <tbody>
  {data
    .filter((item) => {
      const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
      const enrollment = item.enrollment_number?.toLowerCase() || "";
      const term = searchTerm.toLowerCase();
      return fullName.includes(term) || enrollment.includes(term);
    })
    .map((item, index, filtered) => (
      <tr key={item.id} className="border border-b border-gray-200 hover:bg-gray-100 text-sm">
        <td className="px-3 py-2">{index + 1}</td>
        <td className="px-3 py-2">{`${item.first_name} ${item.last_name}`}</td>
        <td className="px-3 py-2">{item.enrollment_number}</td>
        <td className="px-3 py-2">{item.total_classes}</td>
        <td className="px-3 py-2">{item.complete_classes}</td>
        <td className="px-3 py-2">{item.attended_classes}</td>
        <td className="px-3 py-2">{item.absent_classes}</td>
        <td className="px-3 py-2">{item.attendance_percentage}%</td>
      </tr>
    ))}

  {data.filter((item) => {
    const fullName = `${item.first_name} ${item.last_name}`.toLowerCase();
    const enrollment = item.enrollment_number?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || enrollment.includes(term);
  }).length === 0 && (
    <tr>
      <td colSpan="8" className="text-center text-gray-500 py-4">
        No students found matching your search.
      </td>
    </tr>
  )}
</tbody>

                </table>
            )}
        </div>
    </>
 )
}