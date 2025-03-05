import { authFetch } from "@/app/lib/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExamCreate(){
    const [subjects, setSubjects] = useState([]);
    const[components, setComponents] = useState([])
    const [filteredComponents, setFilteredComponents] = useState([]);
    const[enable, setenable] = useState(true)
    const router = useRouter();
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [selectedValues, setSelectedValues] = useState({
        course: "",
        batch: "",
        term: "",
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
                console.log(data);
                setSubjects(data.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        const fetchComponets = async () => {
            console.log(token);

            if (!token) {
                setError("No token found. Please log in.");
                setLoading(false);
                return;
            }

            try {
                const response = await authFetch(`component-viewset`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }

                const data = await response.json();
                console.log(data);
                setComponents(data.data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
        fetchComponets()
    }, [token]);
    function handleChange(e) {
        const { name, value } = e.target;
        setSelectedValues(prev => ({
            ...prev,
            [name]: value
        }));
    }
    useEffect(() => {
        const { course, batch, term, subject } = selectedValues;
        if (course && batch && term && subject) {
            const matchingSubject = subjects.find(
                (item) =>
                    item.course.some(c => c.id === parseInt(course)) &&
                    item.batch.id === parseInt(batch) &&
                    item.term.id === parseInt(term) &&
                    item.subject.id === parseInt(subject)
            );
            setSubjectMappingId(matchingSubject ? matchingSubject.id : null);
            setenable(false)
        }
    }, [selectedValues, subjects]);
    useEffect(() => {
        if (subjectMappingId) {
            const filtered = components.filter(
                (component) => component.id === subjectMappingId
            );
            setFilteredComponents(filtered);
        } else {
            setFilteredComponents([]);
        }
    }, [subjectMappingId, components]);

    async function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.target);
        const newData = {
            component: formData.get("component"),
            start_time: formData.get("start_time"),
            end_time: formData.get("end_time"),
            date: formData.get("date"),
          };
          try {
            const response = await authFetch(`exam-viewset`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newData),
            });
        
            const data = await response.json();
            console.log("Success:", data);
        
            if (response.ok) {
                alert("Exam Added successfully")
            } else {
              console.error("Course creation failed:", data);
            }
          } catch (error) {
            console.error("Error:", error);
          }
    }
    return(
        <div className=" w-full rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-10 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Create Exam 

                </h4>
                <form className="py-5 px-5" onSubmit={handleSubmit}>
                    <div className="flex gap-2">
                        <div className="w-1/4">
                        <label className="font-bold">Course</label>
                        <select name="course" onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
    <option value="">---- Select Course ----</option>
    {Array.from(new Map(
        subjects.flatMap(item => item.course.map(course => [course.id, course]))
    ).values())
    .map((course) => (
        <option key={course.id} value={course.id}>{course.name}</option>
    ))}
</select>
                        </div>
                        <div className="w-1/4">
                        <label className="font-bold">Batch</label>
                    <select name="batch" onChange={handleChange}  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
                        <option value="">---- Select Batch ----</option>
                        {Array.from(new Map(subjects.map(item => [item.batch.id, item.batch])).values())
  .map((batch) => (
    <option key={batch.id} value={batch.id}>{batch.name}</option>
))}
                    </select>
                        </div>
                        <div className="w-1/4">
                        <label className="font-bold">Term</label>
                    <select name="term"  onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
                        <option value="">---- Select Term ----</option>
                        {Array.from(new Map(subjects.map(item => [item.term.id, item.term])).values())
  .map((term) => (
    <option key={term.id} value={term.id}>{term.name}</option>
))}
                    </select>
                        </div>
                        <div className="w-1/4">
                        <label className="font-bold">Subject</label>
                    <select name="subject" onChange={handleChange}  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
                        <option value="">---- Select Subject ----</option>
                        {Array.isArray(subjects) && subjects.map((item) => (
    <option key={item.id} value={item.id}>{item.subject.name}</option>
))}
                    </select>
                        </div>
                    </div>
                    {filteredComponents.length>0 && <label className="font-bold">Component</label>}
                    {filteredComponents.length > 0 && (
                <select name="component"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
                    <option value="">---- Select Component ----</option>
                    {filteredComponents.map((component) => (
                        <option key={component.id} value={component.id}>{component.name}</option>
                    ))}
                </select>
            )}
                   {filteredComponents.length>0 && <>
                    <div className="flex gap-2 justify-between">
                        <div className="w-1/2">
                        <label className="font-bold">Start Time</label>
                        <input type="time" name="start_time"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                        <div className="w-1/2">
                            <label className="font-bold">End Time</label>
                            <input type="time" name="end_time"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                        </div>
                    </div>
                    <label className="font-bold">Exam Date</label>
                            <input type="date" name="date" placeholder="Enter Component Name..." className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                   <button type="submit" className="w-full bg-red-700 py-2 text-white rounded-sm">Submit</button>
                   </>} 
                </form>
            </div>
        </div>
    )
}