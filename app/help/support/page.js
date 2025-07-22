"use client"
import { PenSquareIcon, TicketIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";
import FullWidthLoader from "@/components/Loaader";
import { GlobalContext } from "@/components/GlobalContext";
import Link from "next/link";

export default function Page() {
  const { state } = useContext(GlobalContext);
  const [exams, setExams] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("");
  const [solution, setSolution] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [showPopups, setShowPopups] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCategories, resTickets, resUsers] = await Promise.all([
          authFetch("ticket-category-viewset"),
          authFetch(`${state.user_type === "STUDENT" ? `student-wise-ticket/${state.user_id}?page=${page}` : `student-ticket-viewset?page=${page}`}&page_size=10`),
          authFetch("employee-list"),
        ]);
        const [categories, tickets, users] = await Promise.all([
          resCategories.json(),
          resTickets.json(),
          resUsers.json(),
        ]);

        setExams(categories.data);
        setTotalPages(categories.extra.total);
        setData(Array.isArray(tickets.data) ? tickets.data : [tickets.data]);
        setUsers(users.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, state.user_id, state.user_type]);

  const handleEditClick = async (type, faculty) => {
    setSelectedFaculty(faculty);
    setType(type);
    setShowPopups(true);
    try {
      const res = await authFetch(`student-ticket-viewset/${faculty.id}`);
      const data = await res.json();
      setDesc(data.data?.short_description || "");
      setStatus(data.data?.status?.toString() || "false");
      setSolution(data.data?.reply_solution || "");
      setCategory(data.data?.category || "");
    } catch (err) {
      console.error("Edit fetch error:", err);
    }
  };
const handleCategoryChange = (e) => {
  const categoryId = parseInt(e.target.value); // convert string to number
  const selected = exams.find((item) => item.id === categoryId);
  if (!selected) return;

  setCategory(categoryId); // send ID, not name

  // avoid duplicate emails
  setSelectedUsers((prev) => {
    if (!prev.includes(selected.email)) {
      return [...prev, selected.email];
    }
    return prev;
  });
};
  const handleAddClick = (type) => {
    setType(type);
    setShowPopups(true);
  };

  const handleSubmit = async () => {
    const url = type === "Add" ? `student-ticket-viewset` : `student-ticket-viewset/${selectedFaculty.id}`;
    const method = type === "Add" ? "POST" : "PUT";
    const body = type === "Add"
      ? { student: state.user_id, category, short_description: desc, email_list: selectedUsers }
      : { student: state.user_id, category, short_description: desc, status, reply_solution: solution };

    try {
      const res = await authFetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Failed request");
      setMessage(type === "Add" ? "Ticket Raised Successfully" : "Ticket Updated Successfully");
      setShowToast(true);
      // setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      setMessage("Something went wrong");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="px-6 py-4">
      {showToast && <Toast message={message} />}
      <div className="p-6 min-h-screen">
        <div className="bg-white p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-sans">Tickets Category</h1>
              <p className="text-sm text-gray-500 mb-8">Everything about parents meetings at Taxila Business School</p>
            </div>
            {state.user_type !== "EMPLOYEE" ? (
              <button onClick={() => handleAddClick("Add")} className="bg-red-100 border border-red-800 text-red-800 flex gap-1 items-center px-8 py-2 rounded">
                <TicketIcon className="h-5 w-5" />Raise A Ticket
              </button>
            ):
            <Link href={'/help/ticket-category'} className="bg-red-100 border border-red-800 text-red-800 flex gap-1 items-center px-8 py-2 rounded">
                <TicketIcon className="h-5 w-5" />Ticket Category
              </Link>
            }
          </div>

          <hr className="border mb-6" />

          {loading ? (
            <FullWidthLoader />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr className="text-red-800 font-normal text-sm border-b">
                      <th className="p-3 text-left">S.No.</th>
                      <th className="p-3 text-left">Name</th>
                      <th className="p-3 text-left">Description</th>
                      <th className="p-3 text-left">Solution</th>
                      <th className="p-3 text-left">Status</th>
                      {state.user_type !== "STUDENT" && <th className="p-3 text-left">Action</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? data.map((item, idx) => (
                      <tr key={item.id} className="border-b text-sm">
                        <td className="p-3">{idx + 1}</td>
                        <td className="p-3">{item.category?.name}</td>
                        <td className="p-3">{item.short_description}</td>
                        <td className="p-3">{item.reply_solution || "NA"}</td>
                        <td className="p-3">
                          {item.status ? <span className="bg-green-100 text-green-800 px-4">Resolved</span> : <span className="bg-red-100 text-red-800 px-4 rounded-sm">Pending</span>}
                        </td>
                        {state.user_type !== "STUDENT" && (
                          <td className="p-3 flex gap-4">
                            <PenSquareIcon className="h-4 w-4 cursor-pointer" onClick={() => handleEditClick("Edit", item)} />
                          </td>
                        )}
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={6} className="text-center text-sm p-3 text-gray-700">No Tickets Created Yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-between items-center mt-6">
                <button onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages} className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50">Next</button>
              </div>
            </>
          )}
        </div>
      </div>

      {showPopups && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-sm text-gray-900 font-bold mb-4">Raise A Ticket</h2>

            {type === "Edit" && (
              <>
                <select className="border p-2 w-full rounded mb-4" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="false">Pending</option>
                  <option value="true">Resolved</option>
                </select>
                <textarea rows={3} placeholder="Short Solution Description" className="border p-2 w-full rounded mb-4" value={solution} onChange={(e) => setSolution(e.target.value)} />
              </>
            )}

            {type !== "Edit" && (
              <>
                <select className="border p-2 w-full rounded mb-4" value={category} onChange={handleCategoryChange}>
                  <option value="">Select A Category</option>
                  {exams.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
                <textarea rows={3} placeholder="Short Description" className="border p-2 w-full rounded mb-4" value={desc} onChange={(e) => setDesc(e.target.value)} />
              </>
            )}

            <div className="flex justify-end gap-2">
              <button className="bg-gray-200 px-4 py-2 rounded" onClick={() => setShowPopups(false)}>Cancel</button>
              <button className="bg-red-700 text-white px-4 py-2 rounded" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
