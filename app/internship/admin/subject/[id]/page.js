"use client";

import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import { useEffect, useState, useRef } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "@/components/Loaader";
import Link from "next/link";
import DOMPurify from "dompurify";
import BackButton from "@/components/ui/Backbutton";
import VideoAssignmentPage from "@/components/VideoEPGDM";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const componentRef = useRef();

  const [students, setStudents] = useState(null);
  const [data, setData] = useState(null);
  const [additionalData, setAdditionalData] = useState([]);
  const [isCEPresent, setIsCEPresent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ================= FETCH SUBJECT ================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res1 = await authFetch(`subject-mapping-viewset/${id}`);
        const res2 = await authFetch(`subject-mapping-syllabus/${id}`);

        if (!res1.ok) throw new Error("Failed to fetch subject");

        const d1 = await res1.json();
        const d2 = await res2.json();

        setStudents(d1.data);
        setData(d2.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ================= FETCH COMPONENTS ================= */
  useEffect(() => {
    if (!students?.id) return;

    const fetchComponents = async () => {
      try {
        const res = await authFetch(`component-subject-wise/${students.id}`);
        const d = await res.json();

        setAdditionalData(d.data || []);
        setIsCEPresent(d.data?.some(i => i.name === "Performance Score"));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchComponents();
  }, [students?.id]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Syllabus",
  });

  if (loading) return <FullWidthLoader />;

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-10 py-6">
      <BackButton />

      {error && <p className="text-red-600">{error}</p>}

      {students && (
        <>
          {/* ================= HERO ================= */}
          <div className="rounded-2xl bg-gradient-to-r from-red-700 to-red-900 text-white p-6 sm:p-8 shadow-lg">
            <h1 className="text-3xl font-bold">
              {students.subject?.name}
            </h1>
            <p className="opacity-90 mt-1 text-sm">
              Internship Subject Dashboard
            </p>

            <div className="flex flex-wrap gap-3 mt-5 text-xs">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                Batch: {students.batch?.name}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                Term: {students.term?.name}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {students.specialization?.map(s => s.name).join(", ")}
              </span>

              <Link
                href={`/notes/see-notes/${id}`}
                className="bg-white text-red-800 px-4 py-1 rounded-full font-semibold hover:bg-gray-100"
              >
                📚 Study Material
              </Link>
            </div>
          </div>

          {/* ================= MAIN GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">

            {/* ===== LEFT: COMPONENTS ===== */}
            <div className="lg:col-span-1 sticky top-6 h-fit">
              <div className="bg-white rounded-xl shadow-sm border p-5">
                <h3 className="font-bold text-red-700 mb-4 text-center">
                  Evaluation Components
                </h3>

                {additionalData.map(comp => (
                  <div
                    key={comp.id}
                    className="flex justify-between items-center py-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-medium text-sm">{comp.name}</p>
                      <p className="text-xs text-gray-500">
                        Max: {comp.max_marks}
                      </p>
                    </div>

                    {comp.name === "Report" ? (
                      <Link
                        href={`/internship/admin/component/${comp.id}?batch=${students.batch?.id}`}
                        className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded"
                      >
                        View
                      </Link>
                    ) : (
                      <Link
                        href={`/student/subject/component/${comp.id}`}
                        className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded"
                      >
                        View
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ===== RIGHT: CONTENT ===== */}
            <div className="lg:col-span-3 space-y-6">

              {/* ===== STATS ===== */}
              <div className="bg-white rounded-xl shadow-sm border p-6 grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
                <Stat label="Faculty" value={`${students.faculty?.first_name} ${students.faculty?.last_name}`} />
                <Stat label="Total Classes" value={students.total_classes} />
                <Stat label="Completed" value={students.classes_completed} />
                <Stat label="External %" value={students.weightage_external} />
                <Stat label="Internal %" value={students.weightage_internal} />
              </div>

           

            
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ===== SMALL STAT COMPONENT ===== */
function Stat({ label, value }) {
  return (
    <div>
      <p className="text-xl font-bold">{value ?? "—"}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
