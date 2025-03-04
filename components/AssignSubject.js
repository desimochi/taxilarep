import { authFetch } from "@/app/lib/fetchWithAuth";
import { SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";

const CourseSelection = () => {
  const [data, setData] = useState({
    courses: [],
    batches: [],
    terms: [],
    faculties: [],
    specializations: [],
    subjects: [],
    selected: {
      course: "",
      batch: "",
      faculty: "",
      specialization: "",
      term: "",
      subject: "", // Now storing only a single subject (not an array)
      total_classes: "",
      weightage_external: "",
      weightage_internal: "",
      type: "main",
    },
    loading: false,
    error: null,
  });

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchAll = async () => {
      if (!token) {
        setData((prev) => ({ ...prev, error: "No token found. Please log in.", loading: false }));
        return;
      }

      try {
        const response = await authFetch("all-entities", { method: "GET" });
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

        const responseData = await response.json();
        setData((prev) => ({
          ...prev,
          courses: responseData.data.courses,
          batches: responseData.data.batches,
          terms: responseData.data.terms,
          subjects: responseData.data.subjects,
          specializations: responseData.data.specializations,
        }));
      } catch (err) {
        setData((prev) => ({ ...prev, error: err.message }));
      }
    };

    const fetchFaculty = async () => {
      try {
        const response = await authFetch("employee-viewset", { method: "GET" });
        if (!response.ok) throw new Error(`Error: ${response.status} - ${response.statusText}`);

        const facultyData = await response.json();
        setData((prev) => ({ ...prev, faculties: facultyData.data }));
      } catch (err) {
        setData((prev) => ({ ...prev, error: err.message }));
      }
    };

    fetchAll();
    fetchFaculty();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      selected: { ...prev.selected, [name]: value },
    }));
  };

  const handleSubjectChange = (e) => {
    setData((prev) => ({
      ...prev,
      selected: { ...prev.selected, subject: e.target.value }, // Store only a single selected subject
    }));
  };

  const handleSubmit = async () => {
    const payload = {
      batch: parseInt(data.selected.batch, 10),
      term: parseInt(data.selected.term, 10),
      course: [parseInt(data.selected.course, 10)],
      specialization: [parseInt(data.selected.specialization, 10)],
      subject: parseInt(data.selected.subject, 10), // Sending only one subject as an integer
      faculty: parseInt(data.selected.faculty, 10),
      total_classes: parseInt(data.selected.total_classes, 10),
      classes_completed: 0,
      weightage_external: parseInt(data.selected.weightage_external, 10),
      weightage_internal: parseInt(data.selected.weightage_internal, 10),
      type: data.selected.type,
    };

    try {
      const response = await authFetch("subject-mapping-viewset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit data");
      alert("Submitted successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="px-5 py-4">
      <div className="w-full mx-auto p-6 bg-white border shadow-lg rounded-lg">
        {/* Course Name Dropdown */}
        <div className="flex gap-2">
          <div className="w-1/2">
          <label className="font-bold">Course Name</label>
        <select name="course" value={data.selected.course} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Select Course</option>
          {data.courses.map((course) => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>
          </div>
          <div className="w-1/2">
          <label className="font-bold">Batch</label>
        <select name="batch" value={data.selected.batch} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Select Batch</option>
          {data.batches.map((batch) => (
            <option key={batch.id} value={batch.id}>{batch.name}</option>
          ))}
        </select>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-1/3">
          <label className="font-bold">Specialization</label>
            <select name="specialization" value={data.selected.specialization} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Select Specialization</option>
              {data.specializations.map((spec) => (
                <option key={spec.id} value={spec.id}>{spec.name}</option>
              ))}
            </select>
          </div>
          <div className="w-1/3">
          <label className="font-bold">Term</label>
            <select name="term" value={data.selected.term} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Select Term</option>
              {data.terms.map((term) => (
                <option key={term.id} value={term.id}>{term.name}</option>
              ))}
            </select>
          </div>
          <div className="w-1/3">
          <label className="font-bold">Faculty</label>
            <select name="faculty" value={data.selected.faculty} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="">Select Faculty</option>
              {data.faculties.map((fac) => (
                <option key={fac.id} value={fac.id}>{fac.salutation.name} {fac.first_name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-2">
        <div className="w-1/3">
        <label className="font-bold">Total Classes</label>
          <input type="number" name="total_classes" placeholder="Total Classes" value={data.selected.total_classes} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
        <div className="w-1/3">
        <label className="font-bold">Weightage (External)</label> 
          <input type="number" name="weightage_external" placeholder="Weightage External" value={data.selected.weightage_external} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        </div>
          <div className="w-1/3">
          <label className="font-bold">Weightage (Internal)</label>
          <input type="number" name="weightage_internal" placeholder="Weightage Internal" value={data.selected.weightage_internal} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
          </div>
          
        </div>
        <div className="flex gap-2">
          <div className="w-1/2">
          <label className="font-bold">Type</label>
        <select name="type" value={data.selected.type} onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="main">Main</option>
          <option value="reset-1">Reset-1</option>
          <option value="reset-2">Reset-2</option>
        </select>
          </div>
          <div className="w-1/2">
          <label className="font-bold">Subject</label>
        <select name="subject" value={data.selected.subject} onChange={handleSubjectChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">Select Subject</option>
          {data.subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>{subject.name}</option>
          ))}
        </select>
          </div>
        </div>
        {/* Other Inputs */}
        

       
        <button onClick={handleSubmit} className="bg-red-600 text-white py-2 px-8 rounded-sm flex gap-2">
          <SaveIcon className="h-5 w-5" /> Submit
        </button>
      </div>
    </div>
  );
};

export default CourseSelection;
