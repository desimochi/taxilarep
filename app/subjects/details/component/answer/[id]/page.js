"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnswerDetails() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const compId = searchParams.get("compId");
  const subcomp = searchParams.get("subcomp");

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Extract href from HTML <a> tag inside string
  const extractHref = (htmlString) => {
    if (!htmlString) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const link = doc.querySelector("a");
    return link ? link.getAttribute("href") : null;
  };

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        setLoading(true);

        const response = await authFetch(
          `student-${subcomp ? "subcomponent" : "component"}-answer-details/${id}/${compId}`
        );

        if (!response.ok) throw new Error("Failed to fetch Subject data");

        const res = await response.json();
        setData(res.data || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id, compId, subcomp]);

  // Extract raw URL from HTML
  const fileUrl = data?.answers_file ? extractHref(data.answers_file) : null;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Answer Details</h1>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="mb-4">
            <strong>Answer File URL: </strong>
            {fileUrl ? (
              <a
                href={fileUrl}
                target="_blank"
                className="text-blue-600 underline break-all"
              >
                {fileUrl}
              </a>
            ) : (
              "No answer submitted"
            )}
          </div>

          {/* 🔥 Show file inside iframe using Google Docs Viewer */}
          {fileUrl && (
            <div className="border rounded overflow-hidden mt-4">
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(
                  fileUrl
                )}&embedded=true`}
                className="w-full h-[600px]"
                title="Answer Viewer"
              ></iframe>
            </div>
          )}
        </>
      )}
    </div>
  );
}
