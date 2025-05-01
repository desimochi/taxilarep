"use client"
import { authFetch } from "@/app/lib/fetchWithAuth"
import { GlobalContext } from "@/components/GlobalContext"
import { useSearchParams } from "next/navigation"
import Toast from "@/components/Toast"
import { use, useState, useEffect, useContext } from "react"

export default function Page() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState(false)
  const [show, setShow] = useState(false)
    const [data, setData]= useState([])
    const{state} = useContext(GlobalContext)
    const searchParams = useSearchParams()
    const batch = searchParams.get('batch')
    const course = searchParams.get('course')
    const [formData, setFormData] = useState(null)
    const enrollment_number = searchParams.get('enrollment_number')

    useEffect(() => {
        const fetchData = async () => {
            const response = await authFetch(`student-fee?batch=${batch}&course=${course}&enrollment_number=${enrollment_number}`);
            const datas = await response.json()
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            setData(datas.data)
            setFormData(datas.data)
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
         
        };
        fetchData();
    },[batch, course, enrollment_number])
    const handleCheckboxChange = (field) => {
      // Handle nested fields like "resit_subjects[0].resit_fee_paid"
      if (field.startsWith("resit_subjects")) {
        const match = field.match(/resit_subjects\[(\d+)\]\.(\w+)/);
        if (match) {
          const index = parseInt(match[1], 10);
          const key = match[2];
    
          setFormData(prev => {
            const updatedSubjects = [...prev.resit_subjects];
            updatedSubjects[index] = {
              ...updatedSubjects[index],
              [key]: !updatedSubjects[index][key],
            };
    
            return {
              ...prev,
              resit_subjects: updatedSubjects,
            };
          });
        }
      } else {
        // Handle top-level boolean fields
        setFormData(prev => ({
          ...prev,
          [field]: !prev[field],
        }));
      }
    };
    
const handleSubmit = async () => {
  setLoading(true)
        try {
            const response = await authFetch(`student-fee?batch=${batch}&course=${course}&enrollment_number=${enrollment_number}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error('Failed to update data');
            }
            const updatedData = await response.json();
            setMessage(updatedData.message)
            setShow(true)
            setTimeout(()=>{
              setMessage("")
            setShow(false)
            window.location.reload()
            },2000)
        } catch (error) {
            setError(error.message)
        }
    };
      
    return(
        <div>
          {show && <Toast message={message} />}
          {error && <Toast message={error} />}
            <section className="relative">
                <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
                <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
                <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
                <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
                    <div className="px-24 pt-8">
                        <h1 className="text-xl font-bold mb-4 font-sans">Fee Details of {data.name}</h1>
                        <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            <div className="bg-green-50 px-4 py-1 text-sm text-green-800 rounded-sm">{data.course}</div>
                            <div className="bg-red-50 px-4 py-1 text-sm text-red-800 rounded-sm">{data.batch}</div>
                            <div className="bg-violet-50 px-4 py-1 text-sm text-violet-800 rounded-sm">{data.enrollment_number}</div>
                        </div>
                        <button onClick={handleSubmit}  className="px-6 py-2 border border-red-300 rounded-sm bg-red-50 text-red-800 hover:bg-red-800 hover:text-red-50 transition-colors">Update Fee Status</button>
                        </div>
                        <hr className=" border  border-spacing-y-0.5 mb-6 mt-6"/>
                        <table className="w-full text-sm text-left">
  <thead className="text-xs text-red-800 uppercase bg-red-50">
    <tr>
      <th className="px-6 py-3">Name</th>
      <th className="px-6 py-3">Submitted</th>
    </tr>
  </thead>
  <tbody className="text-gray-900 bg-white">
  {formData && (
      <>
        <tr>
          <td className="px-6 py-3">Form Fee</td>
          <td className="px-6 py-3">
            <input
              type="checkbox"
              checked={formData.form_fee}
              onChange={() => handleCheckboxChange('form_fee')}
            />
          </td>
        </tr>
        <tr>
          <td className="px-6 py-3">Program Fee </td>
          <td className="px-6 py-3">
            <input
              type="checkbox"
              checked={formData.program_fee_paid}
              onChange={() => handleCheckboxChange('program_fee_paid')}
            />
          </td>
        </tr>
        <tr>
          <td className="px-6 py-3">Enrollement Fee </td>
          <td className="px-6 py-3">
            <input
              type="checkbox"
              checked={formData.enrollment_fee_paid}
              onChange={() => handleCheckboxChange('enrollment_fee_paid')}
            />
          </td>
        </tr>
        <tr>
          <td className="px-6 py-3">Caution Money - Tuition Fee </td>
          <td className="px-6 py-3">
            <input
              type="checkbox"
              checked={formData.caution_fee_tuition }
              onChange={() => handleCheckboxChange('caution_fee_tuition')}
            />
          </td>
        </tr>
        <tr>
          <td className="px-6 py-3">Extra Penalty </td>
          <td className="px-6 py-3">
            <input
              type="checkbox"
              checked={formData.extra_penalty }
              onChange={() => handleCheckboxChange('extra_penalty')}
            />
          </td>
        </tr>
        {formData.resit_subjects?.length > 0 &&
        formData.resit_subjects.map((subject, index) => (
          <tr key={index}>
            <td className="px-6 py-3">{subject.subject} - Resit </td>
            <td className="px-6 py-3">
              <input
                type="checkbox"
                checked={!!formData.resit_subjects[index]?.resit_fee_paid}
                onChange={() => handleCheckboxChange(`resit_subjects[${index}].resit_fee_paid`)}
              />
            </td>
          </tr>
        ))}
    </>
  )}</tbody>
</table>

                    </div>
                </div>
            </section>
        </div>
    )
}