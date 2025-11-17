import { authFetch } from "@/app/lib/fetchWithAuth";
import { useState, useEffect } from "react";

export default function StudentAnswerView({ id, compId, subcomponent }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const extractHref = (htmlString) => {
    if (!htmlString) return null;
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const link = doc.querySelector("a");
    return link ? link.getAttribute("href") : null;
  };

  useEffect(() => {
    const url = subcomponent
      ? "student-subcomponent-answer-details"
      : "student-component-answer-details";

    const fetchClassData = async () => {
      try {
        setLoading(true);
        const response = await authFetch(`${url}/${compId}/${id}`);
        if (!response.ok) throw new Error("Failed to fetch Subject data");

        const result = await response.json();
        setData(result.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id, compId, subcomponent]);

  // Extract href safely
  const href = extractHref(data.answers_file);

  return (
    <div className="border border-gray-300 rounded-sm p-2">
      <h3 className="bg-black text-white text-center py-2 rounded-sm">
        Your Submitted Answer
      </h3>

      <div>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {href}
          </a>
        ) : (
          <div className="mt-4 text-center">No answer submitted</div>
        )}
      </div>
    </div>
  );
}
