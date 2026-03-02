"use client"
import { useContext, useEffect, useState } from "react"
import { authFetch } from "../lib/fetchWithAuth"
import { GlobalContext } from "@/components/GlobalContext"
import Toast from "@/components/Toast"

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [course, setCourse] = useState([])
  const [batch, setBatch] = useState([])
  const [term, setTerm] = useState([])
  const [subjects, setSubjects] = useState([])
 
  const { state } = useContext(GlobalContext)
  const id = state?.user_id

  // Selected values
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedBatch, setSelectedBatch] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState([])

  const [message, setMessage] = useState("")
  const [showToast, setShowToast] = useState(false)

  // =========================
  // FETCH INITIAL DATA
  // =========================
  useEffect(() => {
    async function fetchInitialData() {
      try {
        const [response, response1, response2] = await Promise.all([
          authFetch("courses-list"),
          authFetch("batches-list"),
          authFetch("terms-list")
        ])

        const data = await response.json()
        const data1 = await response1.json()
        const data2 = await response2.json()

        setCourse(data.data || [])
        setBatch(data1.data || [])
        setTerm(data2.data || [])
      } catch (error) {
        setError(error.message)
      }
    }

    fetchInitialData()
  }, [])

  // =========================
  // FETCH SUBJECTS
  // =========================
  useEffect(() => {
    if (selectedCourse && selectedBatch && selectedTerm && selectedType) {
      fetchSubjects()
    }
  }, [selectedCourse, selectedBatch, selectedTerm, selectedType])

  const fetchSubjects = async () => {
    try {
      setLoading(true)

      const res = await authFetch(
        `resit-subject-mapping-filter?course_id=${selectedCourse}&batch_id=${selectedBatch}&term_id=${selectedTerm}&type=${selectedType}`
      )

      const data = await res.json()
      setSubjects(data.data || [])
      setSelectedSubjects([]) // reset when filters change
    } catch (err) {
      console.error("Error fetching subjects:", err)
    } finally {
      setLoading(false)
    }
  }

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async () => {
    if (selectedSubjects.length === 0) {
      setError("Please select at least one subject")
      return
    }

    const payload = {
      type: selectedType,
      student: id,
      subjects: selectedSubjects,
      term: selectedTerm
    }

    try {
      setLoading(true)

      const response = await authFetch("resit-request-bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      setMessage("Resit Applied Successfully")
      setShowToast(true)

      setTimeout(() => {
        window.location.replace("/student")
      }, 2000)

    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-16 py-16">

      {showToast && <Toast message={message} />}
      {error && <p className="text-red-600 text-center">{error}</p>}

      <h4 className="text-2xl font-bold text-center mt-6">Guidelines</h4>
      <div className="flex justify-center my-1">
        <hr className="border-t-2 border-red-800 w-20" />
      </div>

      <p className="text-sm text-center">
        First Select Course, Batch, Term and Type to Proceed to Subjects
      </p>
      <p className="text-sm text-center">
        Now Select the Subject You want to Apply for Resit
      </p>
      <p className="text-sm text-center">
        Now Click on Apply for Resit
      </p>

      <div className="max-w-2xl mx-auto border border-red-300 rounded-sm mt-8">
        <h2 className="bg-red-50 text-red-800 text-center py-2 font-bold">
          Apply for Resit
        </h2>

        {/* Course + Batch */}
        <div className="flex px-4 gap-2 mt-4">
          <select
            className="border p-2 w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">Select Course</option>
            {course.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-full"
            value={selectedBatch}
            onChange={(e) => setSelectedBatch(e.target.value)}
          >
            <option value="">Select Batch</option>
            {batch.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Term + Type */}
        <div className="flex px-4 gap-2 mt-3">
          <select
            className="border p-2 w-full"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            <option value="">Select Term</option>
            {term.map(item => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            className="border p-2 w-full"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="resit-1">Resit-1</option>
            <option value="resit-2">Resit-2</option>
          </select>
        </div>

        {/* Subjects */}
        <div className="p-4">
          <p className="mb-2 font-bold">Select Subjects:</p>

          {loading && <p>Loading...</p>}

          <div className="grid gap-2">
            {subjects.map(subj => (
              <label key={subj.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={subj.id}
                  checked={selectedSubjects.includes(String(subj.id))}
                  onChange={(e) => {
                    const { checked, value } = e.target
                    setSelectedSubjects(prev =>
                      checked
                        ? [...prev, value]
                        : prev.filter(id => id !== value)
                    )
                  }}
                />
                <span>{subj.subject?.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="p-4">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-red-800 w-full py-2 text-white rounded-sm disabled:opacity-50"
          >
            {loading ? "Processing..." : "Apply for Resit"}
          </button>
        </div>

      </div>
    </div>
  )
}
