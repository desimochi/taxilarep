"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function BatchList() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const res = await authFetch("batch-viewset", {
          cache: "no-store",
        });
        const data = await res.json();

        // ❌ Remove EPGDM batches
        const filtered = (data?.data || []).filter(
          (batch) => !batch.name.toLowerCase().includes("epgdm")
        );

        setBatches(filtered);
      } catch (error) {
        console.error("Failed to fetch batches", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-pulse text-gray-500 text-sm">
          Loading batches...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto px-12 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Internship Batches
        </h1>
        <p className="text-gray-600 mt-2">
          Select a batch to view assigned internship mentors
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="group relative rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Badge */}
            <div className="absolute top-4 right-4">
              <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                Active
              </span>
            </div>

            {/* Batch Name */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {batch.name}
            </h2>

            {/* Dates */}
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Start Date</span>
                <span className="font-medium">
                  {batch.start_date}
                </span>
              </div>

              <div className="flex justify-between">
                <span>End Date</span>
                <span className="font-medium">
                  {batch.end_date}
                </span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                router.push(`/internship/mentor/${batch.id}`)
              }
              className="mt-6 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-600 text-white py-2.5 font-medium hover:from-red-700 hover:to-red-700 transition"
            >
              View Internship Details →
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {batches.length === 0 && (
        <div className="text-center text-gray-500 mt-20">
          No eligible batches found
        </div>
      )}
    </div>
  );
}
