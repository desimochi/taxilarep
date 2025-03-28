"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";
import FullWidthLoader from "@/components/Loaader";
import { ArrowLeft, CrossIcon, EyeIcon } from "lucide-react";
import DOMPurify from "dompurify";

function ExamDetailsPage() {
  const searchParams = useSearchParams();
  const stuId = searchParams.get("subID"); // get stuId from URL
  const router = useRouter();
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(false);
  const [error, setError] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  useEffect(() => {
    const fetchclassData = async () => {
      try {
        setLoading(true);
        const response = await authFetch(`exam-subject-wise/${stuId}`);
        if (!response.ok) throw new Error("Failed to fetch the data");

        const data = await response.json();
        setExamData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchclassData();
  }, [stuId]);

  const getStatus = (exam) => {
    if (exam.is_cancel) return "Cancelled";
    if (exam.is_reschedule) return "Rescheduled";
    if (exam.is_active) return "Active";
    return "Inactive";
  };

  function handleModal(exam) {
    setSelectedExam(exam);
    setDetails(true);
  }

  return (
    <>
      {details && selectedExam && (
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-5xl max-h-full">
            <div className="relative bg-white rounded-xl shadow-sm dark:bg-gray-700">
              <div className="flex items-center justify-between p-6 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Exam Details
                </h3>
                <button
                  onClick={() => setDetails(false)}
                  className="bg-red-600 p-2 rounded-sm text-white"
                >
                  <CrossIcon className="h-6 w-6 rotate-45" />
                </button>
              </div>
              <div className="p-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      selectedExam.component?.description || ""
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-4 px-5">
        <button
          onClick={() => router.back()}
          className="text-gray-500 text-sm flex gap-1 items-center"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {loading ? (
          <FullWidthLoader />
        ) : (
          <table className="w-full text-sm text-left text-gray-800 dark:text-gray-400 mt-4">
            <thead className="text-xs text-gray-100 uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2">S.No.</th>
                <th className="px-4 py-2">Component Name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Start Time</th>
                <th className="px-4 py-2">End Time</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {examData.map((exam, index) => (
                <tr
                  key={exam.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{exam.component?.name}</td>
                  <td className="px-4 py-2">{exam.date}</td>
                  <td className="px-4 py-2">{exam.start_time}</td>
                  <td className="px-4 py-2">{exam.end_time}</td>
                  <td className="px-4 py-2">{getStatus(exam)}</td>
                  <td
                    className="px-4 py-2 flex gap-2 text-blue-600"
                    onClick={() => handleModal(exam)}
                  >
                    <EyeIcon className="h-5 w-5" /> See Details
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<FullWidthLoader />}>
      <ExamDetailsPage />
    </Suspense>
  );
}
