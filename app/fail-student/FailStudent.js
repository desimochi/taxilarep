"use client";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export default function ResultsTable({ results, type }) {
     const [searchTerm, setSearchTerm] = useState("");
       const filteredResults = results.filter((student) =>
    student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
const exportData = (type = "xlsx") => {
    const exportRows = [];

    filteredResults.forEach((student) => {
      if (student.subjects && student.subjects.length > 0) {
        student.subjects.forEach((subj) => {
          exportRows.push({
            "Student Name": student.student_name,
            "Student ID": student.student || "-",
            Term: student.term,
            Subject: subj.subject,
            "External Marks": subj.external_marks,
            "Internal Marks": subj.internal_marks,
            "Total Marks": subj.total_marks,
            Status: subj.status,
          });
        });
      } else {
        exportRows.push({
          "Student Name": student.student_name,
          "Student ID": student.student || "-",
          Term: student.term,
          Subject: "N/A",
          "External Marks": "-",
          "Internal Marks": "-",
          "Total Marks": "-",
          Status: student.message || "Result not announced yet",
        });
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(exportRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

    if (type === "csv") {
      const csvData = XLSX.utils.sheet_to_csv(worksheet);
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "results.csv");
    } else {
      XLSX.writeFile(workbook, "results.xlsx");
    }
  };

  return (
    <div className=" py-6">
<div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by student name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-lg w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="space-x-2">
          <button
            onClick={() => exportData("csv")}
            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700"
          >
            Export CSV
          </button>
          <button
            onClick={() => exportData("xlsx")}
            className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Export Excel
          </button>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[600px] overflow-y-scroll border rounded-lg shadow">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 border">Student Name</th>
              <th className="px-4 py-2 border">Student ID</th>
              <th className="px-4 py-2 border">Term</th>
              <th className="px-4 py-2 border">Subject</th>
              <th className="px-4 py-2 border">External Marks</th>
              <th className="px-4 py-2 border">Internal Marks</th>
              <th className="px-4 py-2 border">Total Marks</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Total</th>
            </tr>
          </thead>
         <tbody>
  {filteredResults.map((student, idx) => {
    if (student.subjects && student.subjects.length > 0) {
      // ✅ calculate per-subject fee
      const perSubjectFee =
        type === "main"
          ? 750
          : type === "resit-1"
          ? 1250
          : type === "resit-2"
          ? student.resit_2_amount
          : 0;

      // ✅ total amount = subjects count × perSubjectFee
      const totalAmount =
        perSubjectFee && student.subjects.length > 0
          ? perSubjectFee * student.subjects.length
          : "-";

      return student.subjects.map((subj, i) => (
        <tr
          key={`${idx}-${i}`}
          className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}
        >
          {i === 0 && (
            <>
              <td
                className="px-4 py-2 border font-medium"
                rowSpan={student.subjects.length}
              >
                {student.student_name}
              </td>
              <td
                className="px-4 py-2 border text-gray-600"
                rowSpan={student.subjects.length}
              >
                {student.student || "-"}
              </td>
              <td
                className="px-4 py-2 border text-gray-600"
                rowSpan={student.subjects.length}
              >
                {student.term}
              </td>
            </>
          )}
          <td className="px-4 py-2 border">{subj.subject}</td>
          <td className="px-4 py-2 border text-center">
            {subj.external_marks}
          </td>
          <td className="px-4 py-2 border text-center">
            {subj.internal_marks}
          </td>
          <td className="px-4 py-2 border text-center">
            {subj.total_marks}
          </td>
          <td
            className={`px-4 py-2 border text-center font-semibold ${
              subj.status === "Pass" ? "text-green-600" : "text-red-600"
            }`}
          >
            {subj.status}
          </td>
          <td className="px-4 py-2 border text-center font-semibold">
            {perSubjectFee || "-"}
          </td>
          {i === 0 && (
            <td
              className="px-4 py-2 border text-center font-bold text-blue-600"
              rowSpan={student.subjects.length}
            >
              {totalAmount}
            </td>
          )}
        </tr>
      ));
    }

    return (
      <tr key={idx} className="bg-yellow-50">
        <td className="px-4 py-2 border font-medium">
          {student.student_name}
        </td>
        <td className="px-4 py-2 border text-gray-600">
          {student.student || "-"}
        </td>
        <td className="px-4 py-2 border text-gray-600">
          {student.term}
        </td>
        <td
          className="px-4 py-2 border text-center text-red-500 font-medium"
          colSpan={7} // ✅ increased because now we added one more column
        >
          {student.message || "Result not announced yet"}
        </td>
      </tr>
    );
  })}
</tbody>


        </table>
      </div>
    </div>
  );
}
