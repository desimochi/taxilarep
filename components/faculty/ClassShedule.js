"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import FullWidthLoader from "../Loaader";

export default function ClassSchedule() {
  const [sclass, setsclass] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
 console.log(sclass)
  return (
    <div className="shadow-md rounded-lg w-full">
        {loading ? (
        <FullWidthLoader />
      ) : (
      <div>
        <h3 className="text-sm rounded text-red-800 uppercase bg-red-50  dark:bg-gray-700 dark:text-gray-400 text-center p-2.5 font-semibold">
          Upcoming Classes
        </h3>
        <div className="px-6">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : sclass.length > 0 ? (
            <ul className="pb-3 text-sm">
              {sclass.map((cls) => (
                <li key={cls.id} className="mt-4 mb-2">
                {`${cls.mapping?.subject?.name || "N/A"} - Batch ${cls.mapping?.batch?.name || "N/A"} - ${cls.mapping?.term?.name || "N/A"} at ${
                  new Date(cls.date).toLocaleDateString("en-GB")
                } - ${
                  new Date(`1970-01-01T${cls.start_time}Z`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                } to ${
                  new Date(`1970-01-01T${cls.end_time}Z`).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }`}
                <hr className="border-spacing-2 border-gray-400 pb-2" />
              </li>
              
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 p-3 text-center">No upcoming classes.</p>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
