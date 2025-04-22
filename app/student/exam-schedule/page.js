"use client";

import { useContext, useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "@/components/Loaader";
import { Calendar, CrossIcon, EditIcon } from "lucide-react";
import { GlobalContext } from "@/components/GlobalContext";

export default function MainExamCom() {
  const [loading, setLoading] = useState(false);
  const [classSchedule, setClassSchedule] = useState([]);
  const [component, setComponent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
 const {state} = useContext(GlobalContext)
 const id = state.user_id
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [classRes, componentRes] = await Promise.all([
          authFetch(`student-wise-exam-list/${id}`),
          authFetch("terms-list"),
        ]);

        const classData = await classRes.json();
        const componentData = await componentRes.json(); // ✅ Fixed API response assignment

        setClassSchedule(Array.isArray(classData.data) ? classData.data : []);
        setComponent(Array.isArray(componentData.data) ? componentData.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

const filteredSchedule = classSchedule.filter((item) =>
  item.subject_name?.toLowerCase().includes(searchTerm)
);

  return (
    <div className="px-8 py-6">
     <div className="bg-white min-h-screen">
   
        <section className="relative">
           
           <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
           <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
           <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
           <div className="px-6">
          <div className="w-1/3">
            <h2 className="text-2xl font-bold">Exam Schedule</h2>
            <p className="text-gray-500 text-sm">Check the examination schedule</p>
          </div>
          <hr className="border border-b-2 mt-4 mb-4"/>
          <div className="flex gap-3">
          <input
  type="text"
  name="search"
  placeholder="search for subject...."
  className="border border-gray-300 p-2.5"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
            <select className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-[180px] p-2.5">
              <option value="" disabled selected>Select a Term</option>
  {component.map((item) => (
    <option key={item.id} value={item.id}>
      {item.name}
    </option>
  ))}
            </select>
          </div>
        </div>
           </div>
      {loading ? (
        <FullWidthLoader />
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-8">
          <thead>
            <tr className="bg-red-50 text-red-800">
              <th className="border px-4 py-2">S.no.</th>
              <th className="border px-4 py-2">Term</th>
              <th className="border px-4 py-2">Subject</th>
              <th className="border px-4 py-2">Exam Date</th>
              <th className="border px-4 py-2">Start Time</th>
              <th className="border px-4 py-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((row, index) => (
                <tr key={index} className="text-center border">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{row.term_name}</td>
                  <td className="border px-4 py-2">{row.subject_name}</td>
                  <td className="border px-4 py-2">{row.date}</td>
                  <td className="border px-4 py-2">{row.start_time}</td>
                  <td className="border px-4 py-2">{row.duration}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No schedule available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      </section>
      </div>
    </div>
  );
}
