// hooks/useClassFormData.js
"use client"
import { useEffect, useState, useContext } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";

export function useStundentData() {
      const { state } = useContext(GlobalContext);
      const id = state.user_id;
  const [terms, setTerm] = useState([]);
  const [subjectt, setsubject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        setLoading(true);
        const [response, response1] = await Promise.all([
          authFetch(`terms-list`),
          authFetch(`subject-student-wise/${id}`),
        ]);
        if (!response.ok || !response1.ok )
          throw new Error("Failed to fetch data");
        setTerm((await response.json()).data);
        setsubject((await response1.json()).data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id]);

  return { terms, subjectt, loading, error };
}
