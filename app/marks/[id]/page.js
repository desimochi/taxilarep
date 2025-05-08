"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import BackButton from "@/components/ui/Backbutton";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const subjectId = searchParams.get("subName");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [selectedComponents, setSelectedComponents] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await authFetch(`subject-wise-component-marks/${id}`);
        const result = await response.json();
        if (!response.ok) {
          setError(result.message);
        } else {
          setData(result.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const allComponentNames = Array.from(
    new Set(
      data.flatMap((student) =>
        student.component_marks.map((mark) => mark.component_name)
      )
    )
  );

  const filteredComponentNames =
    selectedComponents.length > 0 ? selectedComponents : allComponentNames;

  const handleCheckboxChange = (name) => {
    setSelectedComponents((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-8 py-8">
      <BackButton />
      <div className="px-12 py-6">
        <h1 className="text-2xl font-bold">{subjectId} - Student Marks</h1>
        <p className="text-gray-600 text-sm mt-2">
          Here you can see the marks of all components of all students of a subject.
        </p>
        <hr className="border border-b-2 mt-4 mb-2" />

       <div className="flex gap-2 items-center">
        {allComponentNames.length > 0 && (
            
          <div className="mb-6 relative w-full max-w-md mt-6" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border px-4 py-2 rounded w-full text-left bg-white shadow-sm"
            >
              {selectedComponents.length > 0 ? (
  <div className="flex flex-wrap gap-2">
    {selectedComponents.map((item, index) => (
      <span key={index} className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded">
        {item}
      </span>
    ))}
  </div>
) : (
  "Filter by Component"
)}
            </button>

            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full border bg-white rounded shadow-md max-h-60 overflow-y-auto">
                {allComponentNames.map((name, index) => (
                  <label
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedComponents.includes(name)}
                      onChange={() => handleCheckboxChange(name)}
                      className="mr-2"
                    />
                    {name}
                  </label>
                ))}
              </div>
            )}
          </div>

        )}
        {selectedComponents.length>0 && <button className="bg-red-800 px-5 py-2 text-white rounded-sm" onClick={()=>setSelectedComponents([])}>Remove</button>}
        </div>
        
      </div>

      {data.length > 0 ? (
        <div className="w-[1080px] overflow-x-auto mx-auto">
          <table className="text-sm text-center border border-red-200">
            <thead>
              <tr className="text-red-700 bg-red-50 font-normal">
                <th className="px-6 py-3 whitespace-nowrap">S.No.</th>
                <th className="px-6 py-3 whitespace-nowrap">Student Name</th>
                {filteredComponentNames.map((name, index) => (
                  <th key={index} className="px-6 py-3 whitespace-nowrap">
                    {name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((student, idx) => {
                const fullName = [
                  student.first_name,
                  student.middle_name,
                  student.last_name,
                ]
                  .filter(Boolean)
                  .join(" ");

                const marksMap = Object.fromEntries(
                  student.component_marks.map((mark) => [
                    mark.component_name,
                    mark.obtained_marks,
                  ])
                );

                return (
                  <tr key={student.id} className="border-b">
                    <td className="px-6 py-3">{idx + 1}</td>
                    <td className="px-6 py-3">{fullName}</td>
                    {filteredComponentNames.map((name, i) => (
                      <td key={i} className="px-6 py-3">
                        {marksMap[name] ?? 0}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p className="text-gray-500 px-12">No student data available.</p>
      )}
    </div>
  );
}
