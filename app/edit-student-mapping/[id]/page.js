"use client"

import BackButton from "@/components/ui/Backbutton"
import { authFetch } from "@/app/lib/fetchWithAuth"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Toast from "@/components/Toast"

export default function Page() {
  const { id } = useParams()
  const [data, setData] = useState([])
  const [extra, setExtra] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [showToast, setShowToast] = useState(false)
  const [selectAll, setSelectAll] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await authFetch(`student-mapping-edit/${id}`)
        const response = await res.json()
        if (!res.ok) {
          throw new Error("Failed to Fetch Data")
        }
        // Initialize checked state
        const initializedData = response.data.map((item) => ({
          ...item,
          checked: item.checked,
        }))
        setData(initializedData)
        setExtra(response.extra)
      } catch (error) {
        setError(error.message || "Error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleSelectAll = () => {
    const newSelectAll = !selectAll
    const updatedData = data.map((item) => ({
      ...item,
      checked: newSelectAll,
    }))
    setData(updatedData)
    setSelectAll(newSelectAll)
  }

  const handleCheckboxChange = (index) => {
    const updatedData = [...data]
    updatedData[index].checked = !updatedData[index].checked
    setData(updatedData)

    // If any is unchecked, uncheck Select All
    if (!updatedData[index].checked) {
      setSelectAll(false)
    } else {
      const allChecked = updatedData.every((item) => item.checked)
      setSelectAll(allChecked)
    }
  }

  const getSelectedStudentIds = () => {
    return {
      student_ids: data.filter((item) => item.checked).map((item) => item.id),
    }
  }
 async function handleSubmit() {
    const payload = getSelectedStudentIds() 
    setLoading(true)
    try {
        const res = await authFetch(`student-mapping-edit/${id}`,{
            method:"POST",
            body : JSON.stringify(payload)
        })
        const response = await res.json()
        if(!res.ok){
            throw new Error(response.message)
        }
        setMessage("Mapping Updated Successfully")
        setShowToast(true)
        setTimeout(()=>{
            setShowToast(false)
            window.location.reload()
        },2000)
    } catch (error) {
        setError(error)
    } finally {
setLoading(false)
    }
    
 }
  return (
    <div className="px-8 py-12">
        {showToast && <Toast message={message} />}
      <BackButton />
      <div className="px-12 py-4">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="font-bold text-2xl">Edit Student Mapping of - {extra.student_mapping?.specialization} of {extra.student_mapping?.term} </h1>
                <p className="text-gray-600 pt-2">Here you can edit the students mapping</p>
            </div>
            <button onClick={handleSubmit} className="border-red-700 text-red-50 bg-red-800 px-10 py-2 rounded-sm shadow-lg hover:bg-red-700 transition-colors">Update</button>
        </div>
        
        <hr className="border border-b-2 mt-4 mb-8" />
      </div>
      <div className="px-12">
        <table className="overflow-x-auto w-full text-center">
          <thead className="min-w-full bg-red-50 text-red-800 border border-red-300 rounded-lg">
            <tr>
              <th className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Batch</th>
              <th className="px-4 py-2">
                Course
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id} className="text-sm border border-b-1">
                  <td className="px-2 py-3">
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="px-2 py-3">{item.first_name}</td>
                  <td className="px-2 py-3">{item.batch?.name}</td>
                  <td className="px-2 py-3">{item.course?.name}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-2 text-gray-600">
                  No students Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
