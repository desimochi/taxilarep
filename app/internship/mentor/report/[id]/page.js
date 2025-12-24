"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import FullWidthLoader from "@/components/Loaader";
import { Eye, Save } from "lucide-react";
import BackButton from "@/components/ui/Backbutton";

/* ---------- HELPERS ---------- */
const getTotalWeeks = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  const diff = Math.abs(e - s);
  return Math.ceil(diff / (1000 * 60 * 60 * 24 * 7));
};

export default function InternshipEvaluationPage() {
  const { id } = useParams();
  const studentId = id;
const searchParams = useSearchParams();
const compId = searchParams.get("compId");
  const [internships, setInternships] = useState([]);
  const [reports, setReports] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);
const [activePopup, setActivePopup] = useState(null);
  /* ---------- FETCH DATA ---------- */
  const fetchInternships = async () => {
    const res = await authFetch(`internship-company-student-wise/${studentId}`);
    const data = await res.json();
    setInternships(data.data || []);
  };

 const fetchReports = async () => {
  const res = await authFetch(`report-student-wise/${studentId}/${compId}`);
  const data = await res.json();

  setReports(data.data || []);

  // ✅ PREFILL GIVEN MARKS
  const givenMarks =
    data.data?.[0]?.weekly_report?.given_marks || {};

  const initialMarks = {};

  Object.entries(givenMarks).forEach(([week, mark]) => {
    initialMarks[`week_${week}`] = mark;
  });

  // Optional: if backend sends final marks
  if (data.data?.[0]?.obtained_marks) {
    initialMarks.final = data.data[0].obtained_marks;
  }

  setMarks(initialMarks);
};


  useEffect(() => {
    setLoading(true);
    Promise.all([fetchInternships(), fetchReports()]).finally(() =>
      setLoading(false)
    );
  }, []);

  if (loading) return <FullWidthLoader />;

  const internship = internships[0];
  if (!internship) {
    return <p className="mt-20 text-center">No Internship Found</p>;
  }

  const student = internship.student;
  const subject = internship.subject_mapping?.subject;

  const totalWeeks = getTotalWeeks(
    internship.start_date,
    internship.end_date
  );

  const weeklyReport = reports[0]?.weekly_report || {};
  const finalReport = reports[0]?.main_report;

  /* ---------- SAVE MARKS (FORM-DATA) ---------- */
  const saveMarks = async (week) => {
    const key = week === 0 ? "final" : `week_${week}`;
    const score = marks[key];

    if (!score) {
      toast.error("Enter marks before saving");
      return;
    }

    const fd = new FormData();
    fd.append("week", week);     // 👈 1,2,3... OR 0 for final
    fd.append("marks", score);   // 👈 marks value

    const res = await authFetch(`weekly-marks-add/${reports[0].id}`, {
      method: "POST",
      body: fd,
    });

    if (res.ok) {
      toast.success("Marks saved successfully");
    } else {
      toast.error("Failed to save marks");
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 space-y-6">
      <BackButton />
      {/* ================= STUDENT / INTERNSHIP DETAILS ================= */}
      <div className="border rounded-lg bg-white p-6 mx-12 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <Detail label="Student Name" value={`${student.first_name} ${student.last_name}`} />
        <Detail label="Enrollment No" value={student.enrollment_number} />
        <Detail label="Email" value={student.user?.email} />
        <Detail label="Batch" value={student.batch?.name} />
        <Detail label="Course" value={student.course?.name} />
        <Detail label="Subject" value={subject?.name} />
        <Detail label="Company" value={internship.company_name} />
        <Detail
          label="Internship Duration"
          value={`${internship.start_date} → ${internship.end_date}`}
        />
        <Detail label="Mentor Name" value={internship.mentor_name} />
        <Detail label="Location" value={internship.location} />

        {/* OFFER LETTER */}
        <Detail
          label="Offer Letter"
          value={
            internship.offer_letter ? (
              <a
                href={`https://taxila.in${internship.offer_letter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Offer Letter
              </a>
            ) : (
              "Not Uploaded"
            )
          }
        />
      </div>

      {/* ================= EVALUATION TABLE ================= */}
      <div className="border rounded-lg overflow-x-auto bg-white mx-12">
  <table className="w-full text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="px-4 py-3 text-left">Report</th>
        <th className="px-4 py-3 text-center">AI Analysis / Content</th>
        <th className="px-4 py-3 text-center">Marks</th>
        <th className="px-4 py-3 text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      {/* WEEKLY REPORTS */}
      {Array.from({ length: totalWeeks }).map((_, idx) => {
        const week = idx + 1;
        
        // Accessing the nested data from your API structure: 
        // weeklyReport = { "1": { "marks": "5", "weekly_report": "..." } }
        const reportEntry = weeklyReport[week.toString()]; 
        const hasData = !!reportEntry;

        return (
          <tr key={week} className="border-t">
            <td className="px-4 py-3 font-medium">Week {week}</td>

            <td className="px-4 py-3 text-center">
          {hasData ? (
            <button
              onClick={() => setActivePopup({
                week,
                text: reportEntry.weekly_report,
                aiMarks: reportEntry.marks
              })}
              className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-100 transition-colors"
            >
              View Analysis
            </button>
          ) : (
            <span className="text-gray-400 text-xs italic">No Report</span>
          )}
        </td>

            <td className="px-4 py-3 text-center">
              {marks[`week_${week}`] ?? reportEntry?.marks ?? ""}
              {/* <input
                type="number"
                className="w-24 border rounded px-2 py-1 text-center bg-slate-50"
                // Priority: Local state (marks) > Database value (reportEntry.marks)
                value={marks[`week_${week}`] ?? reportEntry?.marks ?? ""}
                onChange={(e) =>
                  setMarks({
                    ...marks,
                    [`week_${week}`]: e.target.value,
                  })
                }
              /> */}
            </td>

            <td className="px-4 py-3 text-center">
            -
            </td>
          </tr>
        );
      })}

      {/* FINAL REPORT ROW (Remaining mostly the same) */}
      <tr className="border-t bg-gray-50">
        <td className="px-4 py-3 font-semibold">Final Report</td>
        <td className="px-4 py-3 text-center">
          {finalReport ? (
             <a href={`https://taxila.in/media/${finalReport}`} target="_blank" className="text-green-700 underline">View File</a>
          ) : (
            <span className="text-red-600 text-xs">Not Uploaded</span>
          )}
        </td>
        <td className="px-4 py-3 text-center">
          <input
            type="number"
            className="w-24 border rounded px-2 py-1 text-center"
            value={marks.final || ""}
            onChange={(e) => setMarks({ ...marks, final: e.target.value })}
          />
        </td>
        <td className="px-4 py-3 text-center">
          <button disabled={!finalReport} onClick={() => saveMarks(0)} className="bg-black text-white px-3 py-1 rounded text-xs disabled:opacity-40">
            <Save size={14} />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
{activePopup && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
    <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-200">
      <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
        <h3 className="font-bold text-gray-800">Week {activePopup.week} AI Analysis</h3>
        <button 
          onClick={() => setActivePopup(null)}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
          <span className="text-sm font-medium text-blue-800">AI Recommendation:</span>
          <span className="font-bold text-blue-900">{activePopup.aiMarks} / 50</span>
        </div>
        
        <div className="max-h-60 overflow-y-auto">
          <p className="text-sm text-gray-600 leading-relaxed italic">
            "{activePopup.text}"
          </p>
        </div>
      </div>

      <div className="p-4 bg-gray-50 border-t text-right">
        <button 
          onClick={() => setActivePopup(null)}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-black transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

/* ---------- SMALL DETAIL COMPONENT ---------- */
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium break-all">{value || "—"}</p>
    </div>
  );
}
