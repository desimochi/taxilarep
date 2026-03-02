"use client";
import { useState, Fragment } from "react";
import * as XLSX from "xlsx";

export default function ResultTable({ data }) {
  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow text-gray-500 text-center">
        No result data available.
      </div>
    );
  }

  /* ================= EXTRACT SUBJECTS ================= */
  const allSubjects = Array.from(
    new Set(data.flatMap((student) => student.subjects?.map((s) => s.subject) || []))
  ).sort();

  const visibleSubjects = selectedSubject
    ? allSubjects.filter((s) => s === selectedSubject)
    : allSubjects;

  /* ================= FILTER LOGIC ================= */
  const filteredStudents = data.filter((student) => {
    const nameMatch = student.student_name?.toLowerCase().includes(search.toLowerCase());
    if (!nameMatch) return false;

    if (statusFilter !== "all" && selectedSubject) {
      const subData = student.subjects?.find((s) => s.subject === selectedSubject);
      if (!subData || subData.status !== statusFilter) return false;
    }
    return true;
  });

  /* ================= EXPORT EXCEL (MATCHING UI) ================= */
  const exportToExcel = () => {
    // Row 1: Main Headers
    const headerRow1 = ["Student Name", "GPA", "Overall Term Status"];
    // Row 2: Sub Headers
    const headerRow2 = ["", "", ""];

    visibleSubjects.forEach((subName) => {
      headerRow1.push(subName, ""); // Push subject name and an empty slot for the merge
      headerRow2.push("Total Marks", "Status");
    });

    const rows = filteredStudents.map((student) => {
      const row = [
        student.student_name,
        student.gpa ? Number(student.gpa).toFixed(2) : "0.00",
        student.is_pass_status ? "PASS" : "FAIL"
      ];

      visibleSubjects.forEach((subName) => {
        const stats = student.subjects?.find((s) => s.subject === subName);
        row.push(stats?.total_marks ?? "-", stats?.status ?? "-");
      });
      return row;
    });

    const sheet = XLSX.utils.aoa_to_sheet([headerRow1, headerRow2, ...rows]);

    // Apply merges for Subject Headers (Every subject spans 2 columns)
    const merges = visibleSubjects.map((_, i) => ({
      s: { r: 0, c: 3 + i * 2 }, // Start at column 3 (Index 3), increment by 2
      e: { r: 0, c: 3 + i * 2 + 1 }, // End at next column
    }));
    sheet["!merges"] = merges;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Results_Report");
    XLSX.writeFile(wb, `Student_Results_${selectedSubject || "All"}.xlsx`);
  };

  return (
    <div className="mt-6 bg-white rounded-xl shadow border flex flex-col w-full max-w-[1600px] h-[650px] overflow-hidden">
      
      {/* TOOLBAR */}
      <div className="px-6 py-4 border-b bg-gray-50 flex flex-wrap gap-4 items-center justify-between flex-shrink-0">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Search</label>
            <input
              className="px-3 py-2 border rounded-lg text-sm w-48 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Student name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Subject</label>
            <select
              className="px-3 py-2 border rounded-lg text-sm bg-white w-56 outline-none"
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setStatusFilter("all");
              }}
            >
              <option value="">View All Subjects</option>
              {allSubjects.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-[10px] font-bold text-gray-400 uppercase ml-1">Result Filter</label>
            <select
              className={`px-3 py-2 border rounded-lg text-sm bg-white w-32 ${!selectedSubject ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              disabled={!selectedSubject}
            >
              <option value="all">Both</option>
              <option value="Pass">Pass Only</option>
              <option value="Fail">Fail Only</option>
            </select>
          </div>

          <div className="flex flex-col self-end">
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
            >
              Export to Excel
            </button>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-semibold text-gray-700">{filteredStudents.length} Students</p>
          <p className="text-[10px] text-gray-400 italic">Term 1 Main Results</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-grow overflow-auto border-t">
        <table className="w-full border-collapse text-sm table-fixed">
          <thead className="bg-gray-100 sticky top-0 z-20">
            <tr>
              <th className="w-[200px] px-4 py-4 border sticky left-0 bg-gray-100 z-30 text-left">Student Info</th>
              {visibleSubjects.map((subName) => (
                <th key={subName} colSpan={2} className="border text-center bg-blue-50 py-2 px-2 min-w-[180px] text-[11px] font-bold uppercase text-blue-800">
                  {subName}
                </th>
              ))}
            </tr>
            <tr className="bg-gray-50">
              <th className="border sticky left-0 bg-gray-50 z-30 text-[10px] px-4">Name / GPA</th>
              {visibleSubjects.map((subName) => (
                <Fragment key={`sub-head-${subName}`}>
                  <th className="border text-[10px] py-1 bg-white w-20">Total Marks</th>
                  <th className="border text-[10px] py-1 bg-white w-20">Status</th>
                </Fragment>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredStudents.map((student) => (
              <tr key={student.student} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 border sticky left-0 bg-white z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                  <div className="font-bold text-gray-900 truncate">{student.student_name}</div>
                  <div className="text-[11px] text-gray-500">GPA: {student.gpa ? Number(student.gpa).toFixed(2) : "0.00"}</div>
                </td>

                {visibleSubjects.map((subName) => {
                  const stats = student.subjects?.find((s) => s.subject === subName);
                  const isFail = stats?.status === 'Fail';
                  
                  return (
                    <Fragment key={`${student.student}-${subName}`}>
                      <td className={`border text-center py-3 font-medium ${isFail ? 'text-red-600 bg-red-50/30' : 'text-gray-700'}`}>
                        {stats ? stats.total_marks : "-"}
                      </td>
                      <td className={`border text-center py-3 ${isFail ? 'bg-red-50/30' : ''}`}>
                        {stats ? (
                          <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${isFail ? 'text-red-600 border border-red-200 bg-white' : 'text-green-600 border border-green-200 bg-white'}`}>
                            {stats.status.toUpperCase()}
                          </span>
                        ) : "-"}
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