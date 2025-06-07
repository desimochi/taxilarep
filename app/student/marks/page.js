"use client";
import { fetcher } from "@/app/lib/fetcher";
import useSWR, { mutate } from "swr";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { postfetcher } from "@/app/lib/postFetcher";

export default function Marks() {
  const [terms, setTerms] = useState([]);
  const [result, setResult] = useState([]);
  const { state } = useContext(GlobalContext);
  const id = state.user_id;
    const [selectedTerm, setSelectedTerm] = useState("");
  const { data, error:error2, isLoading } = useSWR("terms-list", fetcher);

  useEffect(() => {
    if (data?.data) {
      setTerms(data.data);
    }
  }, [data]);
  const { data: marksData, error, isLoading:loading2 } = useSWR(
    selectedTerm ? `marks-summary-filter/${id}?term=${selectedTerm}` : null,
    fetcher
  );
   useEffect(() => {
    if (marksData?.data) {
      setResult(marksData.data);
    }
  }, [marksData]);
  function handleChange(e){
    setSelectedTerm(e)
  }
   const componentSet = new Set();
  result.forEach((subject) =>
    subject.component_marks.forEach((comp) => componentSet.add(comp.component_name))
  );
  const componentNames = Array.from(componentSet);
  return (
    <div className="px-8 py-8">
      <h1 className="px-4 text-3xl font-bold">See Your Marks</h1>

      {isLoading && <p>Loading terms...</p>}
      {error2 && <p className="text-red-500">Failed to load terms</p>}

      <select className="border p-2 mt-4 w-[360px] rounded" onChange={(e) => handleChange(e.target.value)}>
        <option value="">Select A Term</option>
        {terms.map((term) => (
          <option key={term.id} value={term.id}>
            {term.name}
          </option>
        ))}
      </select>
      <hr className="border border-b-1 mt-4 mb-6"/>
      <p>"-" indicates the component is not that subject</p>
      {result.length>0 ?  <div className="overflow-x-auto p-4">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Subject</th>
            {componentNames.map((name) => (
              <th key={name} className="border px-4 py-2">
                {name}
              </th>
            ))}
            <th className="border px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {result.map((subject, idx) => {
            const compMap = new Map();
            let totalObtained = 0;
            let totalMax = 0;

            subject.component_marks.forEach((comp) => {
              compMap.set(comp.component_name, comp.obtained_marks);
              totalObtained += comp.obtained_marks;
              totalMax += comp.max_marks;
            });

            const isFail = totalObtained < totalMax / 2;

            return (
              <tr key={idx} className="border">
                <td className="border px-4 py-2 font-medium">{subject.subject_name}</td>
                {componentNames.map((name) => (
                  <td key={name} className="border px-4 py-2 text-center">
                    {compMap.has(name) ? compMap.get(name) : "-"}
                  </td>
                ))}
                <td
                  className={`border px-4 py-2 font-semibold text-center ${
                    isFail ? "text-red-600" : "text-green-700"
                  }`}
                >
                  {totalObtained}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div> : <p>No Result Found</p>}
    </div>
  );
}
