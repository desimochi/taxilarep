"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { BookCheck, PenSquareIcon, SearchIcon } from "lucide-react";

export default function ClassSchedule() {
  const [sclass, setsclass] = useState([]);
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("")
  const [selectedDate, setSelectedDate] = useState("");
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const [response, reponse1] = await Promise.all([
          authFetch(`faculty-wise-class-filter/${state.user_id}`),
          authFetch(`terms-list`)
        ]);

        if (!response.ok) throw new Error("Failed to fetch component data");

        const data = await response.json();
        const data2 = await reponse1.json()
        const filteredClasses = data.data.filter(
            (cls) => !cls.is_cancel && cls.mapping
          );
  
          setsclass(filteredClasses);
          setTerms(data2.data)
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
    const date = cls.date || "";
    const query = search.toLowerCase();

    const matchesSearch =
      subject.includes(query) || batch.includes(query) || term.includes(query);

    const matchesDate = selectedDate ? date === selectedDate : true;

    return matchesSearch && matchesDate;
  });

  async function handleTermChange(e) {
    const id = e.target.value
    setLoading(true)
    try {
        const response = await authFetch(`faculty-wise-class-filter/${state.user_id}?term=${id}`)
        
        if(!response.ok){
          throw new Error("Failed to Fetch Data")
        }
        const data = await response.json()
        const filteredClasses = data.data.filter(
          (cls) => !cls.is_cancel && cls.mapping
        );

        setsclass(filteredClasses);
        setsclass(data.data)
    } catch (error) {
        setError(error.message)
    } finally{
      setLoading(false)
    }
  }
  return (
    <section className="relative">
        <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
        <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
        <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
        <div className="w-full pt-12 px-16 relative z-10 backdrop-blur-3xl">
        <h1 className="text-3xl font-bold mb-2 font-sans">Class Attendance </h1>
            <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Your Class Attendance</p>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
            <div className="mb-4 flex items-center justify-between ">
              <div className="flex gap-2">
              <div className="relative">
  <input
    type="text"
    placeholder="Search subject..."
    className="p-2 pl-10 rounded-sm border border-gray-300 text-gray-700 w-full"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
    <SearchIcon className="h-4 w-4"/>
  </span>
</div>
<div className="relative">
    <select className="p-2.5 pl-10 rounded-sm border border-gray-300 text-gray-700 w-full" onChange={handleTermChange}>
      <option >Select A Term</option>
      {terms.map((item)=>(
         <option key={item.id} value={item.id}>{item.name}</option>
      ))}
    </select>
  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
    <BookCheck className="h-4 w-4"/>
  </span>
</div>
              </div>
            
            <input
              type="date"
              className="p-2 rounded-sm text-gray-700 border border-gray-300 px-4"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            </div>

        {loading ? (
        <FullWidthLoader />
      ) : (
      <div>
        <div className="">
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p className="text-red-500">{error}</p>
  ) : filteredClasses.length > 0 ? (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="overflow-x-auto w-full text-center">
        <thead className="min-w-full border border-red-200 rounded-lg">
          <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
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
              className="border-b text-sm hover:bg-red-50"
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
  {(() => {
    const [hours, minutes, seconds] = cls.start_time.split(':');
    let hour12 = (hours % 12 || 12).toString().padStart(2, '0');
    let period = hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes}:${seconds} ${period}`;
  })()}
</td>
<td className="px-6 py-4">
  {(() => {
    const [hours, minutes, seconds] = cls.end_time.split(':');
    let hour12 = (hours % 12 || 12).toString().padStart(2, '0');
    let period = hours >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes}:${seconds} ${period}`;
  })()}
</td>
              <td className="px-6 py-4 text-center ">
                {cls.is_ready_for_attendance? <Link className="text-green-800 bg-green-100 p-2 text-center rounded-sm text-xs" href={`/attendance/class-attendance/${cls.id}`}>Edit Attendance</Link> : <span className="bg-red-100 text-red-800 p-2 text-xs rounded-sm w-fit text-center">NA</span>}
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
    </section>
  );
}
