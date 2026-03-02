import { useEffect, useState } from 'react';
import { authFetch } from '@/app/lib/fetchWithAuth'; // adjust path as needed

export function usePaginatedCourses(currentPage) {
  const [assignedSub, setAssignedSub] = useState([]);
  const [course, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  const [term, setTerm] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const [response, response1, response2, response3] = await Promise.all([
          authFetch(`subject-mapping-viewset?page=${currentPage}`),
          authFetch(`courses-list`),
          authFetch(`batches-list`),
          authFetch(`terms-list`),
        ]);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();

        setAssignedSub(data.data);
        setTotalPages(data.extra?.total || 1);
        setCourse(data1.data);
        setBatch(data2.data);
        setTerm(data3.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [currentPage]);

  return {
    assignedSub,
    course,
    batch,
    term,
    loading,
    error,
    totalPages,
  };
}
