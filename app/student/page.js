"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "@/components/Loaader";
import { GlobalContext } from "@/components/GlobalContext";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

export default function DashboardPage() {
  const { state } = useContext(GlobalContext);
  const studentId = state.user_id;
  const termId = String(state.term);

  const [sclass, setSclass] = useState([]);
  const [classData, setClassData] = useState([]);
  const [studata, setStudata] = useState({});
  const [summary, setSummary] = useState([]);
  const [attendanceChartData, setAttendanceChartData] = useState([]);
  const [latestNotice, setLatestNotice] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dashboardLevel, setDashboardLevel] = useState("default");

  const blinkStyle = `
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0.25; }
      100% { opacity: 1; }
    }
    .blink-badge { animation: blink 1.2s infinite; }
  `;

  /* ====================================================
      NEW COLOR LOGIC
      - >90 = GREEN
      - >80 = YELLOW
      - <=80 = RED
  ==================================================== */
  const getAttendanceColorHex = (p) => {
    if (p > 90) return "#16a34a"; // green
    if (p > 80) return "#f59e0b"; // yellow
    return "#ef4444"; // red
  };

  const dashboardBgClass = () => {
    switch (dashboardLevel) {
      case "red":
        return "bg-red-50/60 ring-2 ring-red-200";
      case "yellow":
        return "bg-yellow-50/60 ring-2 ring-yellow-200";
      case "green":
        return "bg-green-50/60 ring-2 ring-green-200";
      default:
        return "";
    }
  };
const dashboardBgClass2 = () => {
    switch (dashboardLevel) {
      case "red":
        return "bg-red-700 ring-2 ring-red-200";
      case "yellow":
        return "bg-yellow-500 ring-2 ring-yellow-200";
      case "green":
        return "bg-green-500 ring-2 ring-green-200";
      default:
        return "";
    }
  };
  /* ====================================================
      FETCH DASHBOARD DATA
  ==================================================== */
  useEffect(() => {
    let isMounted = true;

    const fetchAll = async () => {
      setLoading(true);
      setError("");

      try {
        const [subjRes, studentRes, classesRes, attendanceRes, noticeRes] =
          await Promise.all([
            authFetch(`subject-student-wise/${studentId}`),
            authFetch(`dashboard-student-data/${studentId}`),
            authFetch(`student-wise-class/${studentId}`),
            authFetch(`attendance-summary/${studentId}/7`),
            authFetch(`noticeboard-viewset?page=1`),
          ]);

        const subjJson = subjRes.ok ? await subjRes.json() : { data: [] };
        const studJson = studentRes.ok ? await studentRes.json() : { data: {} };
        const classesJson = classesRes.ok ? await classesRes.json() : { data: [] };

        let attJson = { data: [] };
        if (attendanceRes.ok) {
          try {
            attJson = await attendanceRes.json();
          } catch {
            attJson = { data: [] };
          }
        }

        const noticeJson = noticeRes.ok ? await noticeRes.json() : { data: [] };

        if (!isMounted) return;

        setSclass(Array.isArray(subjJson.data) ? subjJson.data : []);
        setStudata(studJson.data || {});
        setClassData(Array.isArray(classesJson.data) ? classesJson.data : []);

        /* ====================================================
            FILTER CURRENT TERM SUMMARY
        ==================================================== */
        const allSummaries = Array.isArray(attJson.data) ? attJson.data : [];

        const termFiltered = allSummaries.filter(
          (item) =>
            item?.subject_mapping?.term?.id &&
            String(item.subject_mapping.term.id) === termId
        );

        setSummary(termFiltered);

        /* ====================================================
            CHART DATA
        ==================================================== */
        const chartData = termFiltered.map((it) => {
          const percent = Number(it.attended_percentage || 0);

          return {
            subject: it.subject_mapping.subject.name,
            attended_percentage: percent,
            classes_completed: Number(it.subject_mapping.classes_completed),
            color:
              Number(it.subject_mapping.classes_completed) === 0
                ? "#9ca3af" // grey
                : getAttendanceColorHex(percent),
          };
        });

        setAttendanceChartData(chartData);

        /* ====================================================
            DASHBOARD COLOR LOGIC (IGNORE NEW SUBJECTS)
        ==================================================== */

        // Only subjects where classes_started
        const validSubjects = termFiltered.filter(
          (item) => Number(item.subject_mapping.classes_completed) > 0
        );

        // Extract only valid percentages
        const validPercents = validSubjects.map((item) =>
          Number(item.attended_percentage || 0)
        );

        let level = "green"; // default when no valid subjects

        if (validPercents.length > 0) {
          if (validPercents.some((p) => p > 90)) {
            level = "green";
          } else if (validPercents.some((p) => p > 80)) {
            level = "yellow";
          } else {
            level = "red";
          }
        }

        setDashboardLevel(level);

        const latest =
          Array.isArray(noticeJson.data) && noticeJson.data.length > 0
            ? noticeJson.data[2]
            : null;

        setLatestNotice(latest);
      } catch (err) {
        console.log(err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    return () => {
      isMounted = false;
    };
  }, [studentId, termId]);

  /* ====================================================
      LOADING
  ==================================================== */
  if (loading) {
    return (
      <div className={`min-h-screen p-6 ${dashboardBgClass()}`}>
        <style>{blinkStyle}</style>
        <FullWidthLoader />
      </div>
    );
  }

  /* ====================================================
      MAIN UI
  ==================================================== */
  return (
    <div className={`min-h-screen p-6 ${dashboardBgClass()}`}>
      <style>{blinkStyle}</style>

      {/* TOP CARDS */}
      <div className="grid md:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-4 mb-6">
        <TopCard title="Course" value={studata.course?.name || "—"} />
        <TopCard title="Batch" value={studata.batch?.name || "—"} />
        <TopCard title="Enrollment Number" value={studata.enrollment_number || "—"} />
        <TopCard title="Mentor" value={studata.mentor_name || "—"} />
        <TopCard title="Upcoming Classes (7d)" value={studata.upcoming_class || "—"} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* LEFT SIDE */}
        <div className="lg:w-1/4 space-y-6">
          {/* Latest Notice */}
          <div className="border border-yellow-300 bg-yellow-50 rounded p-4 shadow-sm">
            <h3 className="font-bold text-yellow-900 text-center mb-3">Latest Notice</h3>
            {latestNotice ? (
              <div className="space-y-2">
                <p className="text-sm font-semibold text-yellow-800 flex items-center gap-2">
                  {latestNotice.title}
                  <span className="blink-badge text-white bg-red-600 text-xs px-2 py-0.5 rounded-sm">
                    Important
                  </span>
                </p>
                <p className="text-xs text-gray-700">Date: {latestNotice.date}</p>
                <Link
                  href={`/notice/noticeboard/see-notice/${latestNotice.id}`}
                  className="text-blue-700 text-xs underline"
                >
                  View Details
                </Link>
              </div>
            ) : (
              <p className="text-center text-sm">No recent notice.</p>
            )}
          </div>

          {/* Upcoming Classes */}
          <div className="border border-gray-300 p-4 rounded shadow-sm bg-white">
            <h3 className="font-bold px-6 py-2 bg-yellow-50 text-yellow-800 rounded-sm mb-3 text-center">
              Upcoming Classes
            </h3>

            {classData?.length > 0 ? (
              <ul className="max-h-96 overflow-y-auto space-y-3 text-sm text-center">
                {classData.map((item, i) => (
                  <li key={item.id || i}>
                    <div className="font-medium">{item.mapping?.subject?.name || "-"}</div>
                    <div className="text-xs text-gray-600">
                      {item.date} • {item.start_time}
                    </div>
                    <hr className="my-2" />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-sm py-4">No Upcoming Classes</p>
            )}

            <Link
              href="/student/class-schedule"
              className="bg-yellow-800 text-white py-2 mt-3 block text-center rounded"
            >
              View All
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:w-3/4 space-y-6">
          {/* Class Details */}
          <div className="p-4 border border-gray-300 bg-white rounded shadow-sm hover:shadow-lg transition">
            <h3 className="bg-yellow-600 px-12 w-fit py-3 text-white rounded-sm font-bold">
              Subject Wise Class Details (Term {state.term})
            </h3>

            {(() => {
              const filteredSclass = sclass.filter(
                (item) =>
                  String(item.term?.id) === termId ||
                  String(item.subject_mapping?.term?.id) === termId
              );

              return filteredSclass.length > 0 ? (
                <div className="overflow-x-auto mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-yellow-800 uppercase bg-yellow-50">
                      <tr>
                        <th className="px-6 py-3">Subject</th>
                        <th className="px-6 py-3">Total</th>
                        <th className="px-6 py-3">Completed</th>
                        <th className="px-6 py-3">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSclass.map((item) => (
                        <tr key={item.id} className="bg-white border-b">
                          <td className="px-6 py-4">{item.subject?.name || "—"}</td>
                          <td className="px-6 py-4">{item.total_classes ?? "—"}</td>
                          <td className="px-6 py-4">{item.classes_completed ?? "—"}</td>
                          <td className="px-6 py-4">
                            <Link
                              href={`/student/subject/details/${item.id}`}
                              className="text-green-800"
                            >
                              <EyeIcon className="h-4 w-4" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center mt-4">No Class Data Available for Term {state.term}</p>
              );
            })()}
          </div>

          {/* Attendance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {summary.length === 0 ? (
              <div className="col-span-full p-4 border bg-white rounded shadow text-center">
                No attendance summary for the selected term.
              </div>
            ) : (
              summary.map((item, idx) => {
                const percent = Number(item.attended_percentage || 0);
                const completed = Number(item.subject_mapping.classes_completed);

                return (
                  <div key={idx} className="p-4 rounded-lg border shadow-sm bg-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {item.subject_mapping.subject.name}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.subject_mapping.specialization
                            ?.map((s) => s.name)
                            .join(", ")}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          style={{
                            background:
                              completed === 0
                                ? "#9ca3af"
                                : getAttendanceColorHex(percent),
                          }}
                          className="inline-block px-3 py-1 rounded-full text-white font-medium"
                        >
                          {percent}%
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-sm text-gray-600">
                      <div>
                        Total Classes:
                        <span className="font-medium text-gray-800">
                          {" "}
                          {item.subject_mapping.total_classes}
                        </span>
                      </div>
                      <div>
                        Completed:
                        <span className="font-medium text-gray-800">
                          {" "}
                          {item.subject_mapping.classes_completed}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Attendance Chart */}
          <div className="border border-gray-300 bg-white p-4 rounded shadow-sm hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-4">
              Subject-wise Attendance (%)
            </h3>

            {attendanceChartData.length === 0 ? (
              <p className="text-center py-6 text-sm">No Attendance Data</p>
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={attendanceChartData}
                  margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="subject"
                    tick={{ fontSize: 12 }}
                    interval={0}
                    angle={-40}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="attended_percentage" radius={[6, 6, 0, 0]}>
                    {attendanceChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.classes_completed === 0
                            ? "#9ca3af"
                            : entry.color
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
    </div>
  );
}

/* Small Card Component */
function TopCard({ title, value }) {
  return (
    <div className="bg-yellow-600 bg-opacity-10 text-yellow-800 border border-yellow-100 w-full text-center py-4 rounded shadow-sm hover:shadow-xl transition-shadow">
      <p className="font-bold">{value}</p>
      <p className="text-sm text-black">{title}</p>
    </div>
  );
}
