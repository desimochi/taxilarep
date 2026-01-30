"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Toast from "./Toast";

export default function ExamCreate() {
  const router = useRouter();

  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const [batches, setBatches] = useState([]);
  const [terms, setTerms] = useState([]);

  const [examInputs, setExamInputs] = useState([]);
  const [selectedValues, setSelectedValues] = useState({
    batch: "",
    term: "",
    type: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("accessToken")
      : null;

  /* ----------------------------------
     FETCH SUBJECT MAPPING (ON LOAD)
  ----------------------------------- */
  useEffect(() => {
    const fetchSubjects = async () => {
      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
        setLoading(true);
        const response = await authFetch("subject-mapping-list");

        if (!response.ok) {
          throw new Error("Failed to fetch subject mappings");
        }

        const data = await response.json();
        const list = data.data || [];

        setSubjects(list);

        // UNIQUE BATCHES
        const uniqueBatches = Array.from(
          new Map(list.map((i) => [i.batch.id, i.batch])).values()
        );

        // UNIQUE TERMS
        const uniqueTerms = Array.from(
          new Map(list.map((i) => [i.term.id, i.term])).values()
        );

        setBatches(uniqueBatches);
        setTerms(uniqueTerms);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [token]);

  /* ----------------------------------
     HANDLE DROPDOWN CHANGE
  ----------------------------------- */
  function handleChange(e) {
    const { name, value } = e.target;
    setSelectedValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  /* ----------------------------------
     FETCH FILTERED SUBJECTS
  ----------------------------------- */
  useEffect(() => {
    const { batch, term, type } = selectedValues;

    if (!batch || !term || !type) {
      setFilteredSubjects([]);
      return;
    }

    const fetchFiltered = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await authFetch(
          `subject-exam-schedule-bulk?batch_id=${batch}&term_id=${term}&type=${type}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch filtered subjects");
        }

        const data = await response.json();
        setFilteredSubjects(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [selectedValues]);

  /* ----------------------------------
     UPDATE EXAM INPUT
  ----------------------------------- */
  function updateExamInput(index, updatedValues) {
    setExamInputs((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], ...updatedValues };
      return updated;
    });
  }

  /* ----------------------------------
     SUBMIT
  ----------------------------------- */
  async function handleSubmit(e) {
    e.preventDefault();

    const validData = examInputs.filter(
      (i) => i?.component_id && i?.date && i?.start_time && i?.duration
    );

    if (!validData.length) {
      setError("Please fill all required exam details.");
      return;
    }

    try {
      const response = await authFetch("subject-exam-schedule-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exam_data: validData }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setMessage("Exam Schedule Added Successfully");
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        setMessage("");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  }

  /* ----------------------------------
     RENDER
  ----------------------------------- */
  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      {showToast && <Toast message={message} />}

      <div className="border border-gray-300 shadow-sm rounded-sm">
        <h4 className="px-10 py-4 bg-red-50 text-red-800 text-center font-bold">
          Create Exam Schedule
        </h4>

        {error && <p className="text-center mt-4 text-red-600">{error}</p>}

        {/* DROPDOWNS */}
        <div className="flex gap-4 p-8">
          {/* Batch */}
          <div className="w-1/3">
            <label className="font-bold">Batch</label>
            <select
              name="batch"
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">---- Select Batch ----</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Term */}
          <div className="w-1/3">
            <label className="font-bold">Term</label>
            <select
              name="term"
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">---- Select Term ----</option>
              {terms.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type */}
          <div className="w-1/3">
            <label className="font-bold">Type</label>
            <select
              name="type"
              onChange={handleChange}
              className="border p-2 w-full"
            >
              <option value="">---- Select Type ----</option>
              <option value="main">Main</option>
              <option value="resit-1">Resit-1</option>
              <option value="resit-2">Resit-2</option>
            </select>
          </div>
        </div>

        {/* SUBJECT LIST */}
        {filteredSubjects.map((item, index) => (
          <div key={index} className="px-8 mb-4">
            {item.component === null ? (
              <p className="text-gray-600 text-sm">
                {item.subject.name} – Add a Final Component first
              </p>
            ) : (
              <>
                <span className="text-red-700 font-bold">
                  {item.subject.name}
                </span>
                <div className="flex gap-2 mt-2">
                  <input
                    type="date"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      updateExamInput(index, {
                        component_id: item.component.id,
                        date: e.target.value,
                      })
                    }
                  />
                  <input
                    type="time"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      updateExamInput(index, {
                        component_id: item.component.id,
                        start_time: e.target.value,
                      })
                    }
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Duration (hrs)"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      updateExamInput(index, {
                        component_id: item.component.id,
                        duration: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </>
            )}
          </div>
        ))}

        {filteredSubjects.length > 0 && (
          <button
            onClick={handleSubmit}
            className="mx-8 mb-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Submit Exam Schedule
          </button>
        )}
      </div>
    </div>
  );
}
