"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Link from "next/link";

export default function InternshipSubjectsPage() {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchSubjects = async () => {
      try {
        const res = await authFetch(
          `internship-subject-batch-wise/${id}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        setSubjects(data?.data || []);
      } catch (error) {
        console.error("Failed to fetch internship subjects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="text-gray-500 text-sm">Loading internship subjects...</span>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto px-12 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Internship Subjects
        </h1>
        <p className="text-gray-600 mt-2">
          Batch-wise internship subject & mentor details
        </p>
      </div>

      {/* Empty State */}
      {subjects.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No internship subjects found for this batch
        </div>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md transition"
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.subject?.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {item.batch?.name} • {item.term?.name}
                </p>
              </div>

              {item.is_active && (
                <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                  Active
                </span>
              )}
            </div>

            {/* Faculty */}
            <div className="mb-4">
              <p className="text-sm text-gray-500">Faculty Mentor</p>
              <p className="font-medium text-gray-800">
                {item.faculty?.first_name} {item.faculty?.last_name}
              </p>
              <p className="text-xs text-gray-500">
                {item.faculty?.user?.email}
              </p>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p className="font-medium text-gray-700">Course</p>
                <p>{item.course?.map((c) => c.name).join(", ")}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Specialization</p>
                <p>{item.specialization?.map((s) => s.name).join(", ")}</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">External Weightage</p>
                <p>{item.weightage_external}%</p>
              </div>

              <div>
                <p className="font-medium text-gray-700">Internal Weightage</p>
                <p>{item.weightage_internal}%</p>
              </div>
            </div>

            {/* Footer */}
            <Link href={`/internship/admin/subject/${item.id}`} className="mt-6 inline-block w-full text-center rounded-xl bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 font-medium hover:from-red-700 hover:to-red-600 transition">
            See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
