// hooks/useClassFormData.js
"use client"
import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";

export function useClassFormData() {
  const [term, setTerm] = useState([]);
  const [batch, setBatch] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        setLoading(true);
        const [response, response1, response2] = await Promise.all([
          authFetch(`terms-list`),
          authFetch(`batches-list`),
          authFetch("courses-list"),
        ]);
        if (!response.ok || !response1.ok || !response2.ok)
          throw new Error("Failed to fetch data");
        setTerm((await response.json()).data);
        setBatch((await response1.json()).data);
        setCourse((await response2.json()).data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, []);

  return { term, batch, course, loading, error };
}
