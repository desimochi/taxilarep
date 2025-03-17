"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import { UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import Toast from "@/components/Toast";

export default function Page () {
  const [faculty, setFaculty] = useState([]);
  const [student, setStudent] = useState([]);
  const [batch, setBatch] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedfaculty, setSelectedfaculty] = useState("");
  const [course, setCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [classRes, subRes] = await Promise.all([
          authFetch("employee-list"),
          authFetch("students/no-mentor"),
        ]);

        if (!classRes.ok || !subRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const termData = await classRes.json();
        const courseData = await subRes.json();

        setFaculty(termData.data);
        setStudent(courseData.data);

        const uniqueBatches = Array.from(
          new Map(courseData.data.map((student) => [student.batch.id, student.batch])).values()
        );
        setBatch(uniqueBatches);

        const uniqueCourses = Array.from(
          new Map(courseData.data.map((student) => [student.course.id, student.course])).values()
        );
        setCourse(uniqueCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000); // Hide after 3 seconds
  
      return () => clearTimeout(timer); // Cleanup to avoid memory leaks
    }
  }, [showToast]);
  const filteredStudents = student.filter((row) => {
    const matchesSearch =
      searchQuery === "" ||
      row.first_name.toLowerCase().includes(searchQuery.toLowerCase()) || (row.enrollmentNo && row.enrollmentNo.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return (
      matchesSearch &&
      (selectedCourse ? row.course.id === parseInt(selectedCourse) : true) &&
      (selectedBatch ? row.batch.id === parseInt(selectedBatch) : true)
    );
  });

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(studentId)) {
        newSet.delete(studentId);
      } else {
        newSet.add(studentId);
      }
      return newSet;
    });
  };
const handleSubmit = async () => {
    if (selectedStudents.size === 0) {
      setMessage("Please select at least one student.");
      setShowToast(true);
      setIsShaking(true);
      return;
    }
    if (!selectedfaculty) {
        setMessage("Please select Faculty");
        setShowToast(true);
        setIsShaking(true);
        return;
      }

    const payload = {
      user: parseInt(selectedfaculty),
      students: Array.from(selectedStudents),
    };

    try {
      setLoading(true);
      const response = await authFetch("membership-viewset", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Mentor assigned successfully!");
        setShowToast(true);
        setSelectedStudents(new Set()); // Reset selection after success
      } else {
        throw new Error("Failed to assign students");
      }
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="px-5 py-4">
        {showToast && <Toast message={message} />}
      <div className={`border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12 ${isShaking ? "shake" : ""}`}>
        <div className="flex justify-between items-center gap-2">
          <div className="w-3/5">
            <h5 className="text-2xl font-bold flex gap-1">
              <UsersRound className="w-7 h-7" /> Mentorship - Assign Student
            </h5>
            <span className="text-sm text-gray-400">Taxila Business School</span>
          </div>
          <div className="w-1/5">
            <input
              type="text"
              name="name" placeholder="Search by Name or Enrollment No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg mt-6">
        <div className="flex gap-2 pt-6 px-6">
          {/* Course Selection */}
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">
              Course
            </label>
            <select
              className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {course.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {/* Batch Selection */}
          <div className="w-1/2">
            <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">
              Batch
            </label>
            <select
              className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
            >
              <option value="">Select Batch</option>
              {batch.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
            <div className="px-6">
        <label className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">
              Faculty
            </label>
            <select
              className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5"
             value={selectedfaculty}
            onChange={(e) => setSelectedfaculty(e.target.value)} 
            >
              <option value="">Select Faculty</option>
              {faculty.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.first_name+ " " + batch.last_name}
                </option>
              ))}
            </select>
            </div>
            
      

        <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 mt-4">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
              <th scope="col" className="px-6 py-3">Action</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Enrollement No.</th>
              <th scope="col" className="px-6 py-3">Batch</th>
              <th scope="col" className="px-6 py-3">Course</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length>0 && filteredStudents.map((student) => (
              <tr key={student.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">
                <input type="checkbox" onChange={() => handleCheckboxChange(student.id)} />
                </td>
                <td className="px-6 py-4">{student.first_name+" " + student.last_name}</td>
                <td className="px-6 py-4"> {student.enrollment_number ? student.enrollment_number : "NA"}</td>
                <td className="px-6 py-4">{student.batch.name}</td>
                <td className="px-6 py-4">{student.course.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-start px-6 mt-6 mb-8 ">
        <button
          type="submit"
          className="text-white inline-flex justify-center w-60 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleSubmit}
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
          Assign Student
        </button>
        </div>
      </div>   
    </div>
  );
}
