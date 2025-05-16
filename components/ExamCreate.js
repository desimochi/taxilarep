import { authFetch } from "@/app/lib/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Toast from "./Toast";

export default function ExamCreate(){
    const [subjects, setSubjects] = useState([]);
    const [filteredSubjects, setFilteredSubjects] = useState([]);
    const[enable, setenable] = useState(true)
    const router = useRouter();
    const [message, setMessage] = useState("")
    const [showtoast, setShowToast] = useState(false)
    const [examInputs, setExamInputs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [selectedValues, setSelectedValues] = useState({
        course: "",
        batch: "",
        term: "",
        type:"",
        subject: ""
    });
 
    const [subjectMappingId, setSubjectMappingId] = useState(null);
    const token = localStorage.getItem("accessToken");
    useEffect(() => {
        const fetchSubjects = async () => {
            console.log(token);

            if (!token) {
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await authFetch(`subject-mapping-viewset`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                setSubjects(data.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
      
        fetchSubjects();
    }, [token]);
    function updateExamInput(index, updatedValues) {
      setExamInputs((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], ...updatedValues };
        return updated;
      });
    }
    function handleChange(e) {
        const { name, value } = e.target;
        const selectedItem = filteredSubjects.find(item => item.subject.id.toString() === value);
    const selectedId = selectedItem ? selectedItem.id : null;
        setSelectedValues(prev => ({
            ...prev,
            [name]: value
        }));
        setSubjectMappingId(selectedId)
    }
    useEffect(() => {
        const { batch, term, type } = selectedValues;
      
        if (batch && term && type ) {
          const fetchSubjects = async () => {
            setLoading(true);
            setError(null);
            try {
              const response = await authFetch(
                `subject-exam-schedule-bulk?batch_id=${batch}&term_id=${term}&type=${type}`
              );
      
              if (!response.ok) {
                throw new Error('Failed to fetch subjects');
              }
      
              const data = await response.json();
              setFilteredSubjects(data.data);   
            } catch (err) {
              setError(err.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchSubjects();
        } else {
          setFilteredSubjects([]);
        }
      }, [selectedValues]);


    async function handleSubmit(e){
      e.preventDefault();

      const validData = examInputs.filter(
        (input) =>
          input?.component_id &&
          input?.date &&
          input?.start_time &&
          input?.duration
      );
    
      // if (validData.length !== filteredSubjects.filter(item => item.component !== null).length) {
      //   alert("Please fill all fields for all valid subjects.");
      //   return;
      // }
    
      const payload = {
        exam_data: validData,
      };
          try {
            const response = await authFetch(`subject-exam-schedule-bulk`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
        
            const data = await response.json();
            if(!response.ok){
              throw new Error(data.message)
            }
            setMessage("Exam Added Successfully")
            setShowToast(true)
            setTimeout(() => {
              setMessage("")
              setShowToast(false)
              // window.location.reload()
            }, 2000);
          } catch (error) {
            setError(error.message)
          }
    }
    const isAnyNull = filteredSubjects.some(item => item.component === null);

    return(
        <div className=" w-full rounded-sm py-12 max-w-4xl mx-auto"> 
        {showtoast && <Toast message={message}/>}
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-10 py-4 bg-red-50 text-red-800 text-center font-bold">Create Exam Schedule

                </h4>
                {error && <p className="text-center mt-4 text-red-600">{error}</p>}
                    <div className="flex gap-2 p-8">
                   
                        <div className="w-1/3">
                        <label className="font-bold">Batch</label>
                    <select name="batch" onChange={handleChange}  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
                        <option value="">---- Select Batch ----</option>
                        {[...new Map(subjects.map(item => [item.batch.id, item.batch])).values()]
    .map((batch) => (
        <option key={batch.id} value={batch.id}>{batch.name}</option>
    ))}
                    </select>
                        </div>
                        <div className="w-1/3">
                        <label className="font-bold">Term</label>
                    <select name="term"  onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
                        <option value="">---- Select Term ----</option>
                        {[...new Map(subjects.map(item => [item.term.id, item.term])).values()]
    .map((term) => (
        <option key={term.id} value={term.id}>{term.name}</option>
    ))}
                    </select>
                        </div>
                         <div className="w-1/3">
                        <label className="font-bold">Type</label>
                    <select name="type"  onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
                        <option value="">---- Select Type ----</option>
                        <option value="main">Main</option>
                        <option value="resit-1">Resit-1</option>
                        <option value="resit-2">Resit-2</option>
                    </select>
                        </div>
                       
                    </div>
                    {filteredSubjects.map((item, index) => (
          <div key={index} className="mb-6">
            {item.component === null ? (
              <span className="text-gray-600 text-sm px-8 mt-4">{item.subject.name} - Kindly Add a Component with Final Name</span>
              
            ) : (
            <div className=" px-8">
              <span className="text-red-700 mb-2 font-bold">{item.subject.name}</span>
              <div className="flex gap-2 items-center mt-2 mb-4">
              <input
  type="date"
  value={examInputs[index]?.date || ""}
  onChange={(e) =>
    updateExamInput(index, {
      component_id: item.component.id,
      date: e.target.value,
    })
  }
  className="border border-gray-300 p-2 rounded-sm w-full"
  required
/>

<input
  type="time"
  value={examInputs[index]?.start_time || ""}
  onChange={(e) =>
    updateExamInput(index, {
      component_id: item.component.id,
      start_time: e.target.value,
    })
  }
  className="border border-gray-300 p-2 rounded-sm w-full"
  required
/>

<input
  type="number"
  step="0.1"
  placeholder="Duration (hrs)"
  value={examInputs[index]?.duration || ""}
  onChange={(e) =>
    updateExamInput(index, {
      component_id: item.component.id,
      duration: parseFloat(e.target.value),
    })
  }
  className="border border-gray-300 p-2 rounded-sm w-full"
  required
/>
              </div>
            </div>
            )}
          </div>
        ))}
        <hr className=" border border-b-2 mb-6" />
           {filteredSubjects.length>0 && <button
        onClick={handleSubmit}
        className={`mx-8 px-6 py-2 rounded font-semibold transition mb-6 text-white bg-red-600 hover:bg-red-700 text-white" }`}
      >
        Submit Exam Sechdule
      </button>}    
            </div>
        </div>
    )
}