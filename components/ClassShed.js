"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";

export default function ClassShed() {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    course: "",
    batch: "",
    term: "",
    subject: "",
  });
  const [schedule, setSchedule] = useState({
    date: "",
    start_time: "",
    end_time: "",
  });

  const handleValChange = (e) => {
    setSchedule({ ...schedule, [e.target.name]: e.target.value });
  };
  useEffect(() => { 
    const fetchSubjects = async () => {
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
        console.log("Fetched subjects:", data);
        setSubjects(data.data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchSubjects();
  }, []);

  // Function to handle select changes
  function handleChange(e) {
    const { name, value } = e.target;
    const selectedItem = filteredSubjects.find(item => item.subject.id.toString() === value);
    const selectedId = selectedItem ? selectedItem.id : null;
    setSelectedValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSelectedSubjectId(selectedId); // Save item.id in a separate state

  }

  useEffect(() => {
    const { course, batch, term } = selectedValues;
  
    if (course && batch && term) {
      const fetchSubjects = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await authFetch(
            `subject-mapping-list?course=${course}&batch=${batch}&term=${term}`
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
  
  
  useEffect(() => {
    const { course, batch, term, subject } = selectedValues;
  
    if (course && batch && term && subject) {
      const fetchSubjects = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await authFetch(
            `subject-mapping-list?course=${course}&batch=${batch}&term=${term}&subject=${subject}`
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
  

  async function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission
  
    if (!selectedSubjectId) {
      console.error("No subject selected");
      return;
    }
  
    const newData = {
      mapping: selectedSubjectId,
      date: schedule.date,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
    };
  
    try {
      const response = await authFetch(`class-schedule-viewset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Schedule added successfully:", data);
    
      } else {
        console.error("Schedule creation failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <form className="p-6 md:p-5" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        {/* Course Selection */}
        <div className="w-1/4">
          <label className="font-bold">Course</label>
          <select name="course" onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
    <option value="">---- Select Course ----</option>
    {[...new Map(subjects.flatMap(item => item.course.map(course => [course.id, course]))).values()]
    .map((course) => (
        <option key={course.id} value={course.id}>{course.name}</option>
    ))}
</select>
        </div>

        {/* Batch Selection */}
        <div className="w-1/4">
          <label className="font-bold">Batch</label>
          <select name="batch" onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
    <option value="">---- Select Batch ----</option>
    {[...new Map(subjects.map(item => [item.batch.id, item.batch])).values()]
    .map((batch) => (
        <option key={batch.id} value={batch.id}>{batch.name}</option>
    ))}
</select>
        </div>

        {/* Term Selection */}
        <div className="w-1/4">
          <label className="font-bold">Term</label>
          <select name="term" onChange={handleChange} className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5">
    <option value="">---- Select Term ----</option>
    {[...new Map(subjects.map(item => [item.term.id, item.term])).values()]
    .map((term) => (
        <option key={term.id} value={term.id}>{term.name}</option>
    ))}
</select>
        </div>

        {/* Subject Selection */}
        <div className="w-1/4">
          <label className="font-bold">Subject</label>
          <select
            name="subject"
            onChange={handleChange}
            className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="">---- Select Subject ----</option>
            {filteredSubjects.map((item) => (
              <option key={item.id} value={item.subject.id}>
                {item.subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Start and End Time Inputs */}
      <div className="flex gap-4">
      <div className="w-1/3">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Date
        </label>
        <input
          type="date"
          name="date"
          id="date"
          value={schedule.date}
          onChange={handleValChange}
          className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        />
      </div>
      <div className="w-1/3">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          Start time
        </label>
        <input
          type="time"
          name="start_time"
          id="start_time"
          value={schedule.start_time}
          onChange={handleValChange}
          className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        />
      </div>
      <div className="w-1/3">
        <label className="block mb-2 text-sm font-bold text-gray-700 dark:text-white">
          End time
        </label>
        <input
          type="time"
          name="end_time"
          id="end_time"
          value={schedule.end_time}
          onChange={handleValChange}
          className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
          required
        />
      </div>
    </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-white mt-6 inline-flex justify-center w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        <svg
          className="me-1 -ms-1 w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        Add Schedule
      </button>
    </form>
  );
}
