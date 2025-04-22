"use client"
import { useContext, useEffect, useState } from "react"
import { authFetch } from "../lib/fetchWithAuth"
import { GlobalContext } from "@/components/GlobalContext"
import Toast from "@/components/Toast"

export default function Page(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [course, setCourse] = useState([])
    const [batch, setBatch] = useState([])
    const [term, setTerm] = useState([])
    const {state} = useContext(GlobalContext)
    // Selected values
    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedBatch, setSelectedBatch] = useState("")
    const [selectedTerm, setSelectedTerm] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [message, setMessage] = useState("")
    const[showToast, setShowToast] = useState(false)

    const [subjects, setSubjects] = useState([])
    const id = state.user_id
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
                setCourse(data.data)
                setBatch(data1.data)
                setTerm(data2.data)
            } catch (error) {
                setError(error.message)
            }
        }
        fetchInitialData()
    }, [])

    // Fetch subjects only when all selections are made
    useEffect(() => {
        if (selectedCourse && selectedBatch && selectedTerm && selectedType) {
            fetchSubjects()
        }
    }, [selectedCourse, selectedBatch, selectedTerm, selectedType])

    const fetchSubjects = async () => {
        try {
            setLoading(true)
            const res = await authFetch(`resit-subject-mapping-filter?course_id=${selectedCourse}&batch_id=${selectedBatch}&term_id=${selectedTerm}&type=${selectedType}`)
            const data = await res.json()
            setSubjects(data.data || [])
        } catch (err) {
            console.error("Error fetching subjects:", err)
        } finally {
            setLoading(false)
        }
    }
    async function handleSubmit() {
        const payload = {
            type:selectedType,
            student:id,
            subjects:selectedSubjects,
            term:selectedTerm
        }
        setLoading(true)
       try {
        const response = await authFetch("resit-request-bulk", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        setMessage("Resit Applied Successfully")
        setShowToast(true)
        setTimeout(()=>{
            setMessage("")
            setShowToast(false)
            window.location.replace("/student")
        }, 2000)
       } catch (error) {
        setError(error.message)
       }
    }

    return (
        <div className="px-16 py-16">
            {showToast && <Toast message={message}/>}
            <h4 className="text-2xl font-bold text-center mt-6">Guidelines</h4>
            <div className="flex justify-center my-1">
                <hr className="border-t-2 border-red-800 w-20" />
            </div>
            <p className="text-sm text-center"><span>*</span>First Select Course, Batch, Term and Type to Proceed to Subjects</p>
            <p className="text-sm text-center">Now Select the Subject You want to Apply for Resit</p>
            <p className="text-sm text-center">Now Click on <span className="italic">Apply for Resit</span></p>

            <div className="max-w-2xl mx-auto border border-red-300 rounded-sm mt-8">
                <h2 className="bg-red-50 text-red-800 text-center py-2 font-bold">Apply for Resit</h2>
                <hr className="border border-b-2 border-red-300 mb-4" />
                
                <div className="flex px-4 gap-2">
                    <select className="border border-gray-300 p-2 w-full rounded-sm" value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                        <option value="">Select Course</option>
                        {course.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <select className="border border-gray-300 p-2 w-full rounded-sm" value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}>
                        <option value="">Select Batch</option>
                        {batch.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex px-4 gap-2 mt-3">
                    <select className="border border-gray-300 p-2 w-full rounded-sm" value={selectedTerm} onChange={e => setSelectedTerm(e.target.value)}>
                        <option value="">Select Term</option>
                        {term.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <select className="border border-gray-300 p-2 w-full rounded-sm" value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                        <option value="">Select Type</option>
                        <option value="resit-1">Resit-1</option>
                        <option value="resit-2">Resit-2</option>
                    </select>
                </div>

                <div className="p-4">
  <p className="mb-2 font-bold">Select Subjects:</p>
  <div className="grid gap-2">
    {subjects.map((subj, i) => (
      <label key={subj.id} className="flex items-center gap-2">
        <input
          type="checkbox"
          value={subj.id}
          className="form-checkbox h-4 w-4 text-red-600"
          onChange={(e) => {
  const { checked, value } = e.target;
  setSelectedSubjects(prev =>
    checked ? [...prev, value] : prev.filter(id => id !== value)
  );
}}
        />
        <span>{subj.subject?.name}</span>
      </label>
    ))}
  </div>
</div>


                <div className="p-4">
                    <button disabled={loading} className="bg-red-800 w-full py-1.5 text-center text-white rounded-sm" onClick={handleSubmit}>Apply for Resit</button>
                </div>
            </div>
        </div>
    )
}
