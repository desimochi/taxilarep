"use client";

import { useContext, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { GlobalContext } from "@/components/GlobalContext";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Link from "next/link";

export default function InternshipSubjectList() {
  const { state } = useContext(GlobalContext);
  const studentId = state?.user_id;

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!studentId) return;

    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const res = await authFetch(
          `internship-subject-list/${studentId}`,
          {
            cache: "no-store",
          }
        );

        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error_message || "Failed to fetch data");
        }

        setSubjects(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (!subjects.length) {
    return (
      <div className="text-center text-gray-500 bg-gray-50 p-6 rounded-lg">
        No internship subjects assigned yet.
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto p-4 px-12">
      <h2 className="text-2xl font-semibold mb-6">
        Internship Details
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {subjects.map((item) => (
          <div
            key={item.id}
            className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-semibold">
                  {item.subject?.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {item.term?.name} • Batch {item.batch?.name}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-xs rounded-full ${
                  item.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {item.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Faculty:</strong>{" "}
                {item.faculty?.first_name} {item.faculty?.last_name}
              </p>
              <p>
                <strong>Course:</strong>{" "}
                {item.course?.map((c) => c.name).join(", ")}
              </p>
              <p>
                <strong>Specialization:</strong>{" "}
                {item.specialization?.map((s) => s.name).join(", ")}
              </p>
              <p>
                <strong>Classes:</strong>{" "}
                {item.classes_completed}/{item.total_classes}
              </p>
              <p>
                <strong>Weightage:</strong>{" "}
                External {item.weightage_external}% | Internal{" "}
                {item.weightage_internal}%
              </p>
            </div>

            {/* Optional Actions */}
            <div className="mt-4 flex gap-3">
             
              <Link href={`/student/internship/subject/${item.id}`} className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
