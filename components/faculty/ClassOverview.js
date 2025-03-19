"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import FullWidthLoader from "../Loaader";
import Link from "next/link";

export default function ClassOverview() {
  const [sclass, setsclass] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useContext(GlobalContext);

  useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const response = await authFetch(`assign-faculty-filter?${state.user_id}`);

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
  }, [state.user_id]); // Added dependency

  return (
    <div>
      {loading ? (
        <FullWidthLoader />
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400">
            <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Subject Name</th>
                <th scope="col" className="px-6 py-3">Total Classes</th>
                <th scope="col" className="px-6 py-3">Taken</th>
                <th scope="col" className="px-6 py-3">Remaining</th>
                <th scope="col" className="px-6 py-3">See Details</th>
              </tr>
            </thead>
            <tbody>
              {sclass.map((product, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4">{product.subject.name}</td>
                  <td className="px-6 py-4">{product.total_classes}</td>
                  <td className="px-6 py-4">{product.classes_completed}</td>
                  <td className="px-6 py-4">
                    {product.total_classes - product.classes_completed}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`/subjects/details/${product.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      See Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
