"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import { EyeIcon, UploadCloud } from "lucide-react";

export default function ClassOverview() {
  const [sclass, setsclass] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const response = await authFetch(`assign-faculty-filter?faculty=${state.user_id}`);

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
        <h1 className="text-3xl font-bold mb-2 font-sans">Syllabus Details </h1>
            <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Your Syllabus</p>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
    <div className="">
      {loading ? (
        <FullWidthLoader />
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="overflow-x-auto w-full text-center">
            <thead className="min-w-full border border-red-200 rounded-lg">
              <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
              <th scope="col" className="px-6 py-3">S.No.</th>
                <th scope="col" className="px-6 py-3">Subject Name</th>
                <th scope="col" className="px-6 py-3">Batch</th>
                <th scope="col" className="px-6 py-3">Term</th>
                <th scope="col" className="px-6 py-3">Course</th>
                <th scope="col" className="px-6 py-3">Specialization</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sclass.map((product, index) => (
                <tr key={index} className="border-b text-sm">
                  <td className="px-6 py-4">{index+1}</td>
                  <td className="px-6 py-4">{product.subject.name}</td>
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
                  <td className="px-6 py-4 flex gap-3 justify-center">
                  <Link
                      href={`/syllabus/upload-syllabus?subID=${product.id}`}
                      className="font-medium bg-green-100 p-2 rounded-sm text-green-800 dark:text-blue-500 hover:underline"
                    >
                      <UploadCloud className="h-5 w-5"/>
                    </Link>
                    <Link
                      href={`/syllabus/see-syllabus/${product.id}`}
                      className="font-medium text-red-800 bg-red-100 rounded-sm p-2 dark:text-blue-500 hover:underline"
                    >
                      <EyeIcon className="h-5 w-5"/>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </section>
  );
}
