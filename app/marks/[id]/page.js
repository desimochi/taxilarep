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
  const [see, setSee] = useState('internal')
  const [selectedInternalComponents, setSelectedInternalComponents] = useState([]);
  const [selectedExternalComponents, setSelectedExternalComponents] = useState([]);
  const [isInternalDropdownOpen, setIsInternalDropdownOpen] = useState(false);
  const [isExternalDropdownOpen, setIsExternalDropdownOpen] = useState(false);
  const internalDropdownRef = useRef(null);
  const externalDropdownRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await authFetch(`subject-wise-component-marks/${id}`);
        const result = await response.json();
        if (!response.ok) {
          setError(result.message || "Error fetching data");
          setData([]);
        } else {
          setError("");
          setData(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Network error");
        setData([]);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchData();
  }, [id]);

  // Extract internal and external components maps {name: max_marks}
  const internalComponentsMap = {};
  const externalComponentsMap = {};

  data.forEach((student) => {
    student.component_marks.forEach((mark) => {
      if (mark.component_type === "INTERNAL") {
        internalComponentsMap[mark.component_name] = mark.max_marks;
      } else if (mark.component_type === "EXTERNAL") {
        externalComponentsMap[mark.component_name] = mark.max_marks;
      }
    });
  });

  const allInternalComponentNames = Object.keys(internalComponentsMap);
  const allExternalComponentNames = Object.keys(externalComponentsMap);

  const filteredInternalComponents =
    selectedInternalComponents.length > 0 ? selectedInternalComponents : allInternalComponentNames;
  const filteredExternalComponents =
    selectedExternalComponents.length > 0 ? selectedExternalComponents : allExternalComponentNames;

  const handleInternalCheckboxChange = (name) => {
    setSelectedInternalComponents((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleExternalCheckboxChange = (name) => {
    setSelectedExternalComponents((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        internalDropdownRef.current &&
        !internalDropdownRef.current.contains(event.target)
      ) {
        setIsInternalDropdownOpen(false);
      }
      if (
        externalDropdownRef.current &&
        !externalDropdownRef.current.contains(event.target)
      ) {
        setIsExternalDropdownOpen(false);
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
        <hr className="border border-b-2 mt-4 mb-6" />
<div className="flex gap-2">
 {allInternalComponentNames.length > 0 && (
          <div
            className="mb-6 relative w-full max-w-md mt-6"
            ref={internalDropdownRef}
          >
            <button
              onClick={() => setIsInternalDropdownOpen(!isInternalDropdownOpen)}
              className="border px-4 py-2 rounded w-full text-left bg-white shadow-sm"
            >
              {selectedInternalComponents.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedInternalComponents.map((item) => (
                    <span
                      key={item}
                      className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded"
                    >
                      {`${item} - ${internalComponentsMap[item]}`}
                    </span>
                  ))}
                </div>
              ) : (
                "Filter Internal Components"
              )}
            </button>

            {isInternalDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full border bg-white rounded shadow-md max-h-60 overflow-y-auto">
                {allInternalComponentNames.map((name) => (
                  <label
                    key={name}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedInternalComponents.includes(name)}
                      onChange={() => handleInternalCheckboxChange(name)}
                      className="mr-2"
                    />
                    {`${name} - ${internalComponentsMap[name]}`}
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedInternalComponents.length > 0 && (
          <button
            className="bg-red-800 px-5 py-2 text-white rounded-sm mb-6"
            onClick={() => setSelectedInternalComponents([])}
          >
            Remove Internal Filter
          </button>
        )}

        {/* External Filter */}
        {allExternalComponentNames.length > 0 && (
          <div
            className="mb-6 relative w-full max-w-md mt-6"
            ref={externalDropdownRef}
          >
            <button
              onClick={() => setIsExternalDropdownOpen(!isExternalDropdownOpen)}
              className="border px-4 py-2 rounded w-full text-left bg-white shadow-sm"
            >
              {selectedExternalComponents.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedExternalComponents.map((item) => (
                    <span
                      key={item}
                      className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {`${item} - ${externalComponentsMap[item]}`}
                    </span>
                  ))}
                </div>
              ) : (
                "Filter External Components"
              )}
            </button>

            {isExternalDropdownOpen && (
              <div className="absolute z-10 mt-2 w-full border bg-white rounded shadow-md max-h-60 overflow-y-auto">
                {allExternalComponentNames.map((name) => (
                  <label
                    key={name}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedExternalComponents.includes(name)}
                      onChange={() => handleExternalCheckboxChange(name)}
                      className="mr-2"
                    />
                    {`${name} - ${externalComponentsMap[name]}`}
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        {selectedExternalComponents.length > 0 && (
          <button
            className="bg-red-800 px-5 py-2 text-white rounded-sm mb-6"
            onClick={() => setSelectedExternalComponents([])}
          >
            Remove External Filter
          </button>
        )}
</div>
        {/* Internal Filter */}
       
      </div>

      {loading && <p className="px-12 text-gray-500">Loading...</p>}
      {error && <p className="px-12 text-red-600">{error}</p>}
<div className="flex px-12 mb-3 ">
  <button className={`${see==='internal'? 'bg-gray-300':''} p-2`} onClick={()=>setSee('internal')}>See Internal</button>
   <button className={`${see==='external'? 'bg-gray-300':''} p-2`}  onClick={()=>setSee('external')}>See External</button>
</div>
      {/* Internal Table */}
      {data.length > 0 && allInternalComponentNames.length > 0 && (
         see==='internal' &&
        <div className="overflow-x-auto px-12 mb-10">
          <h2 className="text-xl font-semibold mb-2 text-green-700">Internal Marks</h2>
          <table className="text-sm text-center border border-green-300 w-full">
            <thead>
              <tr className="text-green-700 bg-green-50 font-normal">
                <th className="px-6 py-3 whitespace-nowrap">S.No.</th>
                <th className="px-6 py-3 whitespace-nowrap">Student Name</th>
                {filteredInternalComponents.map((name) => (
                  <th key={name} className="px-6 py-3 whitespace-nowrap">
                    {`${name} - ${internalComponentsMap[name]}`}
                  </th>
                ))}
                <th className="px-6 py-3 whitespace-nowrap">Total</th>
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

                // Map component_name to obtained marks for internal only
                const marksMap = Object.fromEntries(
                  student.component_marks
                    .filter((mark) => mark.component_type === "INTERNAL")
                    .map((mark) => [mark.component_name, mark.obtained_marks])
                );

                // Calculate total for selected internal components
                const totalMarks = filteredInternalComponents.reduce(
                  (sum, compName) => sum + (marksMap[compName] || 0),
                  0
                );
                const totalMaxMarks = filteredInternalComponents.reduce(
                  (sum, compName) => sum + (internalComponentsMap[compName] || 0),
                  0
                );

                return (
                  <tr key={student.id} className="border-b">
                    <td className="px-6 py-3">{idx + 1}</td>
                    <td className="px-6 py-3">{fullName}</td>
                    {filteredInternalComponents.map((name) => (
                      <td key={name} className="px-6 py-3">
                        {marksMap[name] ?? 0}
                      </td>
                    ))}
                    <td className={`px-6 py-3 font-semibold ${totalMaxMarks/2>totalMarks? "text-red-600":""}`}>
                      {totalMarks} / {totalMaxMarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* External Table */}
      {data.length > 0 && allExternalComponentNames.length > 0 && (
        see==='external' &&
        <div className="overflow-x-auto px-12 mb-10">
          <h2 className="text-xl font-semibold mb-2 text-blue-700">External Marks</h2>
          <table className="text-sm text-center border border-blue-300 w-full">
            <thead>
              <tr className="text-blue-700 bg-blue-50 font-normal">
                <th className="px-6 py-3 whitespace-nowrap">S.No.</th>
                <th className="px-6 py-3 whitespace-nowrap">Student Name</th>
                {filteredExternalComponents.map((name) => (
                  <th key={name} className="px-6 py-3 whitespace-nowrap">
                    {`${name} - ${externalComponentsMap[name]}`}
                  </th>
                ))}
                <th className="px-6 py-3 whitespace-nowrap">Total</th>
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

                // Map component_name to obtained marks for external only
                const marksMap = Object.fromEntries(
                  student.component_marks
                    .filter((mark) => mark.component_type === "EXTERNAL")
                    .map((mark) => [mark.component_name, mark.obtained_marks])
                );

                // Calculate total for selected external components
                const totalMarks = filteredExternalComponents.reduce(
                  (sum, compName) => sum + (marksMap[compName] || 0),
                  0
                );
                const totalMaxMarks = filteredExternalComponents.reduce(
                  (sum, compName) => sum + (externalComponentsMap[compName] || 0),
                  0
                );

                return (
                  <tr key={student.id} className="border-b">
                    <td className="px-6 py-3">{idx + 1}</td>
                    <td className="px-6 py-3">{fullName}</td>
                    {filteredExternalComponents.map((name) => (
                      <td key={name} className="px-6 py-3">
                        {marksMap[name] ?? 0}
                      </td>
                    ))}
                    <td className="px-6 py-3 font-semibold">
                      {totalMarks} / {totalMaxMarks}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {!loading && data.length === 0 && (
        <p className="text-gray-500 px-12">No student data available.</p>
      )}
    </div>
  );
}
