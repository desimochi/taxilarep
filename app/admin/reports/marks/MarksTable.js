"use client";
import { useState, Fragment } from "react";
import * as XLSX from "xlsx";

export default function MarksTable({ data }) {
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

  /* ================= SUBJECT LIST ================= */
  const subjectMap = {};
  data.forEach((student) => {
    student.subjects?.forEach((sub) => {
      subjectMap[sub.subject_id] = sub.subject_name;
    });
  });

  const allSubjects = Object.entries(subjectMap).map(([id, name]) => ({
    subject_id: Number(id),
    subject_name: name,
  }));

  const visibleSubjects = selectedSubject
    ? allSubjects.filter((s) => s.subject_id === Number(selectedSubject))
    : allSubjects;

  /* ================= FILTER STUDENTS ================= */
  const filteredStudents = data.filter((student) => {
    const nameMatch = student.student_name?.toLowerCase().includes(search.toLowerCase());
    if (!nameMatch) return false;
    if (!selectedSubject || percentageFilter === "all") return true;

    const sub = student.subjects?.find((s) => s.subject_id === Number(selectedSubject));
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

    visibleSubjects.forEach((sub) => {
      headerRow1.push(sub.subject_name, "", "");
      headerRow2.push("Internal", "External", "Total");
    });

    const rows = filteredStudents.map((student) => {
      const row = [student.student_name];
      visibleSubjects.forEach((sub) => {
        const stats = student.subjects?.find((s) => s.subject_id === sub.subject_id);
        row.push(stats?.INTERNAL_marks ?? 0, stats?.EXTERNAL_marks ?? 0, stats?.total_marks ?? 0);
      });
      return row;
    });

    const sheet = XLSX.utils.aoa_to_sheet([headerRow1, headerRow2, ...rows]);
    sheet["!merges"] = visibleSubjects.map((_, i) => ({
      s: { r: 0, c: 1 + i * 3 },
      e: { r: 0, c: 1 + i * 3 + 2 },
    }));

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Attendance");
    XLSX.writeFile(wb, `Marks_Report.xlsx`);
  };

  return (
    /* THE FIX: 
       1. h-[600px] or max-h-[600px] sets a strict limit.
       2. overflow-hidden prevents the child from expanding the parent.
       3. flex-col allows the table to fill the remaining space.
    */
    <div className="mt-6 bg-white rounded-xl shadow border flex flex-col w-[1500px] h-[650px] overflow-hidden">
      
      {/* HEADER SECTION - flex-shrink-0 ensures this stays fixed at the top */}
      <div className="px-6 py-4 border-b bg-gray-50 flex flex-wrap gap-3 justify-between items-center flex-shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Marks Report</h2>
          <p className="text-xs text-gray-500">
            Showing {filteredStudents.length} Students
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <input
            className="px-3 py-2 border rounded-lg text-sm w-48 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search student..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="px-3 py-2 border rounded-lg text-sm bg-white w-44"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setPercentageFilter("all");
            }}
          >
            <option value="">All Subjects</option>
            {allSubjects.map((s) => (
              <option key={s.subject_id} value={s.subject_id}>
                {s.subject_name}
              </option>
            ))}
          </select>

          <button
            onClick={exportToExcel}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* TABLE CONTAINER - overflow-auto here creates the internal scrollbar */}
      <div className="flex-grow overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <table className="w-full border-collapse text-sm">
          {/* Use sticky top-0 to keep headers visible inside the scroll div */}
          <thead className="bg-gray-100 sticky top-0 z-20 shadow-sm">
            <tr>
              <th
                rowSpan={2}
                className="px-4 py-3 border sticky left-0 bg-gray-100 z-30 min-w-[150px]"
              >
                Student Name
              </th>
              {visibleSubjects.map((sub) => (
                <th
                  key={sub.subject_id}
                  colSpan={3}
                  className="border text-xs bg-blue-50 py-2 px-2 min-w-[240px]"
                >
                  {sub.subject_name}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              {visibleSubjects.map((sub) => (
                <Fragment key={sub.subject_id}>
                  <th className="border text-[10px] py-1">Internal</th>
                  <th className="border text-[10px] py-1">External</th>
                  <th className="border text-[10px] py-1">Total</th>
                </Fragment>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredStudents.map((student) => (
              <tr key={student.student_id} className="hover:bg-blue-50 transition-colors">
                <td className="px-4 py-2 border sticky left-0 bg-white font-medium z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  {student.student_name}
                </td>
                {visibleSubjects.map((sub) => {
                  const stats = student.subjects?.find((s) => s.subject_id === sub.subject_id);
                  return (
                    <Fragment key={`${student.student_id}-${sub.subject_id}`}>
                      <td className="border text-center py-2">
                        {stats?.INTERNAL_marks ?? 0}
                      </td>
                      <td className="border text-center py-2">
                        {stats?.EXTERNAL_marks ?? 0}
                      </td>
                      <td className="border text-center py-2 font-bold text-blue-600">
                        {stats?.total_marks ?? 0}
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