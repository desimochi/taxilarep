"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

export default function ClassOverview() {
  const [sclass, setsclass] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const response = await authFetch(`resit-viewset`);

        if (!response.ok) throw new Error("Failed to fetch component data");

        const data = await response.json();

        setsclass(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchclassData();
  }, [state.user_id]);

  return (
    <section className="relative">
    <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
    <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
    <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
    <div className="w-full pt-12 px-16 relative z-10 backdrop-blur-3xl min-h-screen">
    <h1 className="text-3xl font-bold mb-2 font-sans">Resit Details </h1>
            <p className="text-sm text-gray-500 mb-8">Check out the Resit Progress of All Students</p>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
    <div className="">
      {loading ? (
        <FullWidthLoader />
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="overflow-x-auto w-full text-center">
            <thead className="min-w-full border border-red-200 rounded-lg">
              <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
                <th scope="col" className="px-6 py-3">Student Name</th>
                <th scope="col" className="px-6 py-3">Subject</th>
                <th scope="col" className="px-6 py-3">Batch</th>
                <th scope="col" className="px-6 py-3">Term</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3">Specialization</th>
                <th scope="col" className="px-6 py-3">Viva/Presentation</th>
                <th scope="col" className="px-6 py-3">WriteUp</th>
              </tr>
            </thead>
            <tbody>
              {sclass.length> 0 ? sclass.map((product, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="px-6 py-4">{product.student}</td>
                  <td className="px-6 py-4">{product.subjects}</td>
                  <td className="px-6 py-4">{product.batch}</td>
                  <td className="px-6 py-4">{product.term}</td>
                  <td className="px-6 py-4">{product.course}</td>
                  <td className="px-6 py-4">{product.course}</td>
                  <td className="px-6 py-4">{product.criteria_first? <span className="bg-green-100 text-green-800 py-1 px-2 rounded-sm text-sm">Completed</span> : <span className="bg-red-100 text-sm text-red-800 py-1 px-2 rounded-sm">Not Completed</span>}</td>
                  <td className="px-6 py-4">{product.criteria_second? <span className="bg-green-100 text-green-800 py-1 px-2 rounded-sm text-sm">Completed</span> : <span className="bg-red-100 text-sm text-red-800 py-1 px-2 rounded-sm">Not Completed</span>}</td>
                  </tr>
              )) : <tr><td colSpan={7} className="p-2">No Resit Subject Assigned</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </section>
  );
}
