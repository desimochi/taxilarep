"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { PencilIcon } from "lucide-react";

export default function ClassSchedule() {
  const [sclass, setsclass] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("")
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const response = await authFetch(`faculty-wise-class/${state.user_id}`);

        if (!response.ok) throw new Error("Failed to fetch component data");

        const data = await response.json();
        const filteredClasses = data.data.filter(
            (cls) => !cls.is_complete && !cls.is_cancel && cls.mapping
          );
  
          setsclass(filteredClasses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchclassData();
  }, [state.user_id]);
  const filteredClasses = sclass.filter((cls) => {
    const subject = cls.mapping?.subject?.name?.toLowerCase() || "";
    const batch = cls.mapping?.batch?.name?.toLowerCase() || "";
    const term = cls.mapping?.term?.name?.toLowerCase() || "";
    const query = search.toLowerCase();

    return (
      subject.includes(query) ||
      batch.includes(query) ||
      term.includes(query)
    );
  });
  return (
    <div className="shadow-md rounded-lg w-full mt-4">
          <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-8 mx-6 mb-8">
          <div className="flex justify-between items-center">
            <h5 className="text-2xl font-bold">Class Attendance</h5>
           
            <div className="flex gap-2">
            <input type="text" placeholder="search..."  className="p-2 rounded-sm text-gray-700"  value={search} onChange={(e) => setSearch(e.target.value)}/>
            </div>
          </div>
        </div>
        {loading ? (
        <FullWidthLoader />
      ) : (
      <div>
        <div className="px-6">
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p className="text-red-500">{error}</p>
  ) : filteredClasses.length > 0 ? (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
        <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-6 py-3">S.No.</th>
            <th scope="col" className="px-6 py-3">Subject</th>
            <th scope="col" className="px-6 py-3">Batch</th>
            <th scope="col" className="px-6 py-3">Term</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Start Time</th>
            <th scope="col" className="px-6 py-3">End Time</th>
            <th scope="col" className="px-6 py-3">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {filteredClasses.map((cls, index) => (
            <tr
              key={cls.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
                <td className="px-6 py-4">
                    {index+1}
                </td>
              <td className="px-6 py-4">
                {cls.mapping?.subject?.name || "N/A"}
              </td>
              <td className="px-6 py-4">
                {cls.mapping?.batch?.name || "N/A"}
              </td>
              <td className="px-6 py-4">
                {cls.mapping?.term?.name || "N/A"}
              </td>
              <td className="px-6 py-4">
                {cls.date
                  ? new Date(cls.date).toLocaleDateString("en-GB")
                  : "N/A"}
              </td>
              <td className="px-6 py-4">
                {cls.start_time
                  ? new Date(`1970-01-01T${cls.start_time}Z`).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )
                  : "N/A"}
              </td>
              <td className="px-6 py-4">
                {cls.end_time
                  ? new Date(`1970-01-01T${cls.end_time}Z`).toLocaleTimeString(
                      [],
                      { hour: "2-digit", minute: "2-digit" }
                    )
                  : "N/A"}
              </td>
              <td className="px-6 py-4">
                {cls.is_ready_for_attendance? <Link className="text-red-600 underline" href={`/attendance/class-attendance/${cls.id}`}>Edit Attendance</Link> : "Edit Attendance"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <p className="text-gray-500 text-center py-5">No Class Available for Attendance</p>
  )}
</div>
      </div>
      )}
    </div>
  );
}
