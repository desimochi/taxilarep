"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { EyeIcon } from "lucide-react";

export default function SubjAssign({title, url}) {
  const [sclass, setsclass] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const response = await authFetch(`assign-faculty-filter?faculty=${state.user_id}`);

        if (!response.ok) throw new Error("Failed to fetch Subject data");

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
    <h1 className="text-3xl font-bold mb-2 font-sans">{title} </h1>
            <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Your Subject</p>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
    <div className="">
      {loading ? (
        <FullWidthLoader />
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="overflow-x-auto w-full text-center">
            <thead className="min-w-full border border-red-200 rounded-lg">
              <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
                <th scope="col" className="px-6 py-3">Subject Name</th>
                <th scope="col" className="px-6 py-3">Subject Type</th>
                <th scope="col" className="px-6 py-3">Batch</th>
                <th scope="col" className="px-6 py-3">Term</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3">Specialization</th>
                <th scope="col" className="px-6 py-3">See Details</th>
              </tr>
            </thead>
            <tbody>
              {sclass.length> 0 ? sclass.map((product, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="px-6 py-4">{product.subject.name}</td>
                  <td className="px-6 py-3">{product.type  ==="main"? <span className="text-sm text-green-800 bg-green-50 rounded-sm px-2 py-.5 border">main</span>:<span className="text-sm text-red-800 bg-red-50 rounded-sm px-2 py-.5 border">{product.type}</span>}</td>
                  <td className="px-6 py-4">{product.batch.name}</td>
                  <td className="px-6 py-4">{product.term.name}</td>
                  <td className="px-6 py-4">
                    {product.course.length > 0
                      ? product.course.map((c) => c.name).join(", ")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    {product.specialization.length > 0
                      ? product.specialization.map((s) => s.name).join(", ")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 flex items-center justify-center">
                    <Link
                      href={`${url}${product.id}`}
                      className="font-medium text-green-800 bg-green-100 px-2 py-0.5 rounded-sm text-xs border border-green-200 hover:underline flex items-center w-fit"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      See Details
                    </Link>
                  </td>
                </tr>
              )) : <tr><td colSpan={7} className="p-2">No Subject Assigned</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </section>
  );
}
