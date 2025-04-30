import { Loader, Save } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "./Toast";
export default function ResueForm({batch, term, course, showterm, enrollement, api, redirect}){
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const router = useRouter();
    console.log(showterm)
    async function handlesubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        let payload = {}
        let url =""
        if(showterm){
            payload = {
                batch: formData.get("batch"),
                term: formData.get("term"),
                course: selectedCourses,
                type:  formData.get("type")
            }
            url = `${api}?batch=${formData.get("batch")}&term=${formData.get("term")}&type=${formData.get("type")}&course=${selectedCourses}`
         } else{
            payload = {
                batch: formData.get("batch"),
                enrollment_number: formData.get("enrollment_number"),
                course: selectedCourses,
                type:  formData.get("type")
            }
            url = `${api}?batch=${formData.get("batch")}&course=${selectedCourses}&enrollment_number=${formData.get("enrollment_number")}`
        }
        const batch = formData.get("batch")
        const term = formData.get("term")
        const course = selectedCourses;
        const type =  formData.get("type")
       
        try {
            setLoading(true)
            const response = await authFetch(`student-result-save?batch=${batch}&term=${term}&type=${type}&course=${course}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
              });
            const data =  await response.json()
            if ( !response.ok) throw new Error(data.message)
            setMessage("Added Successfully")
            setShowToast(true)
            setTimeout(()=>{
                setMessage("")
                setShowToast(false)
                router.push(redirect)
            }, 2000)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
    return(
         <form className="mx-auto border border-gray-300 py-6 px-6 max-w-xl shadow-lg rounded-md" onSubmit={handlesubmit}>
            {Toast && showToast && <Toast message={message}/>}
            {error && <Toast message={error} type="error"/>}
                        <h3 className="text-center text-red-800 text-xl font-bold">Add Result Announcement</h3>
                        <hr className="border border-b-2 mt-3 mb-4"/>
                        {error && <p className="text-red-600 text-sm">{error}</p>}
                        <label className="font-bold mb-2">Batch</label> <br/>
                        <select name="batch" className=" border border-x-gray-300 p-2 w-full mt-2">
                        <option >Select A Batch</option>
                            {batch.map((item) =>(
                               <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                       {showterm && <>
                        <label className="font-bold mt-4">Term</label> <br/>
                        <select  name = "term"className=" border border-x-gray-300 p-2 w-full mt-2">
                        <option >Select A Term</option>
                            {term.map((item) =>(
                               <option key={item.id} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                       </>} 
                       {enrollement && <>
                        <label className="font-bold mt-4">Enrollement No.</label> <br/>
                        <input type="text" name="enrollment_number" className=" border border-x-gray-300 p-2 w-full mt-2" placeholder="Enter Enrollement No."/>
                       </>} 
                        <label className="font-bold mb-2">Course(s)</label>
        <div className="relative mt-2">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="border border-gray-300 w-full text-left p-2 rounded bg-white"
          >
            {selectedCourses.length === 0 ? "Select Courses" : `${selectedCourses.length} course(s) selected`}
          </button>
        
          {dropdownOpen && (
            <div className="absolute z-10 w-full border border-gray-300 bg-white max-h-48 overflow-y-auto mt-1 rounded shadow-md">
              {course.map((item) => (
                <label key={item.id} className="flex items-center px-3 py-1 hover:bg-gray-100 cursor-pointer">
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={selectedCourses.includes(item.id)}
                    onChange={() => {
                      setSelectedCourses((prev) =>
                        prev.includes(item.id)
                          ? prev.filter((id) => id !== item.id)
                          : [...prev, item.id]
                      );
                    
                    }}
                    className="mr-2"
                  />
                  {item.name}
                </label>
              ))}
            </div>
          )}
        </div>
        
        
                        <label className="font-bold mb-2">Exam Type</label> <br/>
                        <select name="type" className=" border border-x-gray-300 p-2 w-full mt-2">
                        <option >Select A Status</option>
                        <option value='main'>Main</option>
                        <option value='resit-2'>Resit-1</option>
                        <option value='resit-1'>Resit-2</option>
                        </select>
                        <button type="submit" disabled={loading} className="mt-4 mb-4 bg-red-800 flex items-center justify-center gap-1 text-white px-12 py-2 rounded-sm shadow-sm hover:shadow-xl transition-shadow">{loading? <Loader className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4"/>} {loading? "Submitting...." : "Submit"} </button>
                    </form>
    )
}