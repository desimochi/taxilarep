"use client";
import { useState, Fragment } from "react";
import * as XLSX from "xlsx";

export default function AttendanceReportTable({ data }) {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [percentageFilter, setPercentageFilter] = useState("all");

  /* ================= EMPTY STATE ================= */
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow text-gray-500">
        Select filters and click <b>Apply Filter</b> to view attendance
      </div>
    );
  }

  /* ================= SUBJECT LIST (NO MEMO) ================= */
  const subjectMap = {};
  data.forEach(student => {
    student.subjects?.forEach(sub => {
      subjectMap[sub.subject_id] = sub.subject_name;
    });
  });

  const allSubjects = Object.entries(subjectMap).map(([id, name]) => ({
    subject_id: Number(id),
    subject_name: name,
  }));

  const visibleSubjects = selectedSubject
    ? allSubjects.filter(s => s.subject_id === Number(selectedSubject))
    : allSubjects;

  /* ================= HELPERS ================= */
  const getPercentageClass = (p) => {
    if (p < 75) return "bg-red-100 text-red-700";
    if (p <= 90) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  /* ================= FILTER STUDENTS ================= */
  const filteredStudents = data.filter(student => {
    const nameMatch = student.student_name
      ?.toLowerCase()
      .includes(search.toLowerCase());

    if (!nameMatch) return false;

    if (!selectedSubject || percentageFilter === "all") return true;

    const sub = student.subjects?.find(
      s => s.subject_id === Number(selectedSubject)
    );
    if (!sub) return false;

    const p = sub.attendance_percentage ?? 0;

    if (percentageFilter === "below75") return p < 75;
    if (percentageFilter === "75to90") return p >= 75 && p <= 90;
    if (percentageFilter === "above90") return p > 90;

    return true;
  });

  /* ================= EXPORT EXCEL ================= */
  const exportToExcel = () => {
    const headerRow1 = ["Student Name"];
    const headerRow2 = [""];

    visibleSubjects.forEach(sub => {
      headerRow1.push(sub.subject_name, "", "");
      headerRow2.push("Completed", "Attended", "%");
    });

    const rows = filteredStudents.map(student => {
      const row = [student.student_name];
      visibleSubjects.forEach(sub => {
        const stats = student.subjects?.find(
          s => s.subject_id === sub.subject_id
        );
        row.push(
          stats?.completed_classes ?? 0,
          stats?.attended_classes ?? 0,
          `${stats?.attendance_percentage ?? 0}%`
        );
      });
      return row;
    });

    const sheet = XLSX.utils.aoa_to_sheet([
      headerRow1,
      headerRow2,
      ...rows,
    ]);

    sheet["!merges"] = visibleSubjects.map((_, i) => ({
      s: { r: 0, c: 1 + i * 3 },
      e: { r: 0, c: 1 + i * 3 + 2 },
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Attendance");
    XLSX.writeFile(wb, "Attendance_Report.xlsx");
  };

  /* ================= UI ================= */
  return (
    <div className="mt-6 bg-white rounded-xl shadow border">
      {/* HEADER */}
      <div className="px-6 py-4 border-b bg-gray-50 flex flex-wrap gap-3 justify-between">
        <div>
          <h2 className="text-lg font-semibold">Attendance Report</h2>
          <p className="text-sm text-gray-500">
            {selectedSubject ? "Single Subject View" : "All Subjects View"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            className="px-3 py-2 border rounded-lg text-sm w-48"
            placeholder="Search student"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-3 py-2 border rounded-lg text-sm bg-white w-56"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setPercentageFilter("all");
            }}
          >
            <option value="">All Subjects</option>
            {allSubjects.map(s => (
              <option key={s.subject_id} value={s.subject_id}>
                {s.subject_name}
              </option>
            ))}
          </select>

          <select
            className="px-3 py-2 border rounded-lg text-sm bg-white w-44 disabled:opacity-50"
            value={percentageFilter}
            disabled={!selectedSubject}
            onChange={(e) => setPercentageFilter(e.target.value)}
          >
            <option value="all">All %</option>
            <option value="below75">Below 75%</option>
            <option value="75to90">75–90%</option>
            <option value="above90">Above 90%</option>
          </select>

          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th rowSpan={2} className="px-3 py-2 border sticky left-0 bg-gray-100">
                Student
              </th>
              {visibleSubjects.map(sub => (
                <th
                  key={sub.subject_id}
                  colSpan={3}
                  className="border text-xs bg-blue-50"
                >
                  {sub.subject_name}
                </th>
              ))}
            </tr>
            <tr>
              {visibleSubjects.map(sub => (
                <Fragment key={sub.subject_id}>
                  <th className="border text-[10px]">Comp.</th>
                  <th className="border text-[10px]">Attd.</th>
                  <th className="border text-[10px]">%</th>
                </Fragment>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.student_id}>
                <td className="px-3 py-2 border sticky left-0 bg-white font-medium">
                  {student.student_name}
                </td>
                {visibleSubjects.map(sub => {
                  const stats = student.subjects?.find(
                    s => s.subject_id === sub.subject_id
                  );
                  const p = stats?.attendance_percentage ?? 0;
                  return (
                    <Fragment key={`${student.student_id}-${sub.subject_id}`}>
                      <td className="border text-center">
                        {stats?.completed_classes ?? 0}
                      </td>
                      <td className="border text-center">
                        {stats?.attended_classes ?? 0}
                      </td>
                      <td className="border text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${getPercentageClass(p)}`}>
                          {p}%
                        </span>
                      </td>
                    </Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
