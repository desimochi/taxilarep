"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { EyeIcon, Loader, PlusSquareIcon } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [noticeRes, usersRes] = await Promise.all([
          authFetch(`noticeboard-viewset?page=${page}`),
          authFetch("employee-list"),
        ]);

        const noticeData = await noticeRes.json();
        const usersData = await usersRes.json();

        console.log("Notice API Response:", noticeData); // Debugging log

        setNotice(Array.isArray(noticeData.data) ? noticeData.data : []);
        setUsers(Array.isArray(usersData.data) ? usersData.data : []);
        setTotalPages(noticeData.extra?.total || 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [page]);

  const userMap = users.reduce((acc, user) => {
    acc[user.id] = `${user.first_name} ${user.last_name}`;
    return acc;
  }, {});

  const filteredNotices = Array.isArray(notice) ? notice.filter((item) => {
    const postedBy = userMap[item.user] || "Unknown";
    const searchText = searchQuery.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText) ||
      postedBy.toLowerCase().includes(searchText) ||
      item.date.includes(searchText) ||
      item.valid_date.includes(searchText)
    );
  }) : [];

  return (
    <section className="relative">
    <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
    <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
    <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
    <div className="w-full pt-12 px-16 relative z-10 backdrop-blur-3xl min-h-screen">
    <h1 className="text-2xl font-bold flex">
              <PaperClipIcon className="h-7 w-7" /> Notice Board
            </h1>
            <p className="text-sm text-gray-500 mb-8">Find out the latest notice from Taxila Business School</p>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
            <div className="flex gap-2 justify-between">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a notice.."
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-fit p-2.5"
            />
            {state.role_name !== 'Student' && (
              <Link href="/notice/noticeboard/add-notice">
                <button className="flex gap-1 justify-center w-fit border bg-red-700 py-2.5 px-8 text-white rounded-sm hover:bg-red-100 hover:text-red-800 transition duration-300 ease-in-out">
                  <PlusSquareIcon className="h-5 w-5" /> Post a Notice
                </button>
              </Link>
          )}
            </div>
    <div className="py-4">

      {loading ? <FullWidthLoader /> : (
        <>
          <table className="overflow-x-auto w-full text-center mt-4">
            <thead className="min-w-full border border-red-200 rounded-lg">
              <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
                <th className="px-6 py-3">S.No.</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Posted By</th>
                <th className="px-6 py-3">Valid Till</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotices.length > 0 ? (
                filteredNotices.map((item, index) => (
                  <tr key={item.id} className="border-b text-sm">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{userMap[item.user] || "Unknown"}</td>
                    <td className="px-6 py-4">{item.valid_date}</td>
                    <td className="px-6 py-4 flex items-center justify-center">
                      <Link href={`/notice/noticeboard/see-notice/${item.id}`} className="font-medium text-green-800 bg-green-100 px-2 py-0.5 rounded-sm text-xs border border-green-200 hover:underline flex items-center w-fit">
                        <EyeIcon className="h-4 w-4"/>
                        See Details
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No notices available.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button 
              disabled={page === 1} 
              onClick={() => setPage(page - 1)} 
              className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button 
              disabled={page === totalPages} 
              onClick={() => setPage(page + 1)} 
              className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
    </div>
    </section>
  );
}
