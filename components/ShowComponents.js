import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { SaveIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

export default function ShowComponents(){
    const[components, setComponents] = useState([])
    const [editingRow, setEditingRow] = useState(null);
    const [search, setSearch] = useState("");
    const[error, setError] = useState(false)
    const[loading, setLoading] = useState(false)
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
    }, [token]);
    const handleEditClick = (id) => {
        setEditingRow(id); // Store ID instead of index
      };
    
    const handleChange = (e, id, field) => {
        const { value } = e.target;
      
        setComponents((prevCourses) =>
          prevCourses.map((course) =>
            course.id === id
              ? { ...course, [field]: field === "is_active" ? value === "true" : value }
              : course
          )
        );
      };
      const handleSaveClick = async (id) => {
        const componentToUpdate = components.find(course => course.id === id); // Find the course by ID
      
        if (!componentToUpdate) {
          console.error("Course not found");
          return;
        }
      
        try {
          const response = await authFetch(`specialization-viewset/${id}`, {
            method: "PUT", // Use PATCH for partial update; PUT if sending full object
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: courseToUpdate.name,
              description: courseToUpdate.description,
            }),
          });
      
          if (response.ok) {
            const updatedCourse = await response.json();
            console.log(updatedCourse);
      
            setCourses((prevCourses) =>
              prevCourses.map(course =>
                course.id === id ? updatedCourse.data : course
              )
            );
      
            setEditingRow(null); // Exit edit mode
          } else {
            console.error("Failed to update course");
          }
        } catch (error) {
          console.error("Error updating course:", error);
        }
      };
    const filteredComponents = Array.isArray(components) 
  ? components.filter(term =>
      term.name.toLowerCase().includes(search.toLowerCase())
    )
  : [];
    return(
        <div className="rounded-xl border border-gray-300 mt-4 ">
    <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase rounded-xl bg-black dark:bg-gray-700 dark:text-white-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    S.No.
                </th>
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Marks
                </th>
                <th scope="col" className="px-6 py-3">
                    Sub Component
                </th>
                <th scope="col" className="px-6 py-3">
                    Type
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className="rounded-xl">
        {filteredComponents? filteredComponents.map((course, index) => (
    <tr key={course.id} className="bg-white border-b hover:bg-gray-50 text-black">
        <td className="px-6 py-4">{index+1}</td>
      <td className="px-6 py-4"> {course.name}</td>
    
      <td className="px-6 py-4">
      
          {course.max_marks}
      </td>
      <td className="px-6 py-4">
      
          {course.has_subcomponents ? "See Sub Component" : "No"}
      </td>
      <td className="px-6 py-4">
       
          {course.type ? "Active" : "Inactive"}
      </td>
      <td className="px-6 py-4">
     
          {course.description}
      </td>
      <td className="px-6 py-4 flex gap-4">
        <Link href={`/exam-components/edit-component?componentID=${course.id}`} >
           <PencilIcon className="h-5 w-5 text-blue-600" />
        </Link>
      </td>
    </tr>
  )) : <p>No Courses Found</p>}
        </tbody>
    </table>
    </div>
    )
}