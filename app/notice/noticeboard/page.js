"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { Loader, PlusSquareIcon } from "lucide-react";
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

        setNotice(noticeData.data);
        setUsers(usersData.data);
        setTotalPages(noticeData.extra.total);
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

  const filteredNotices = notice.filter((item) => {
    const postedBy = userMap[item.user] || "Unknown";
    const searchText = searchQuery.toLowerCase();

    return (
      item.title.toLowerCase().includes(searchText) ||
      item.description.toLowerCase().includes(searchText) ||
      postedBy.toLowerCase().includes(searchText) ||
      item.date.includes(searchText) ||
      item.valid_date.includes(searchText)
    );
  });

  return (
    <div className="py-4 px-5">
      <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-600 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow py-8 px-12">
        <div className="flex justify-between items-center gap-2">
          <div className="w-3/5">
            <h5 className="text-2xl font-bold flex">
              <PaperClipIcon className="h-7 w-7" /> Notice Board
            </h5>
            <span className="text-sm text-gray-400">Taxila Business School</span>
          </div>
          <div className="w-1/5">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search a notice.."
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          {state.role_name !== 'Student' && (
            <div className="w-1/5">
              <Link href="/notice/noticeboard/add-notice">
                <button className="flex gap-1 justify-center w-full bg-black py-2.5 rounded-sm">
                  <PlusSquareIcon className="h-5 w-5" /> Post a Notice
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {loading ? <FullWidthLoader /> : (
        <>
          <table className="w-full rounded-xl text-sm text-left text-gray-800 dark:text-gray-400 mt-4 mb-2">
            <thead className="text-xs text-white uppercase bg-black">
              <tr>
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
                  <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">{item.date}</td>
                    <td className="px-6 py-4">{userMap[item.user] || "Unknown"}</td>
                    <td className="px-6 py-4">{item.valid_date}</td>
                    <td className="px-6 py-4">
                      <Link href={`/notice/noticeboard/see-notice/${item.id}`} className="text-red-600 underline">
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
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50">Previous</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50">Next</button>
          </div>
        </>
      )}
    </div>
  );
}
