"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnswerDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  useEffect(() => {
        const fetchClassData = async () => {
            try {
                setLoading(true)
                const response = await authFetch(`student-${subcomp?'subcomponent':'component'}-answer-details/${id}/${compId}`)
                if (!response.ok) throw new Error("Failed to fetch Subject data")

                const data = await response.json()
                if (data.data) setData(data.data) // ✅ No TypeError here
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClassData()
    }, [id, compId, subcomp])

  return (
    <div>
      <h1>Answer Details - {id} {compId} {data?.answers_file}</h1>
    </div>
  );
}
