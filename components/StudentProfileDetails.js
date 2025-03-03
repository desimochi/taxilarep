"use client";

import { PrinterIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { DockIcon } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const users = [
  { name: "First Name", title: "Front-end Developer" },
  { name: "Last Name", title: "Designer" },
  { name: "Middle Name", title: "Director of Product" },
  { name: "Contact Number", title: "Copywriter" },
  { name: "Student Email", title: "Senior Designer" },
  { name: "Gender", title: "Principal Designer" },
  { name: "Date of Joining", title: "" },
  { name: "Place of Birth", title: "2000-01-05" },
  { name: "Blood Group", title: "" },
  { name: "Aadhar Number", title: "" },
  { name: "PAN Number", title: "" },
  { name: "Father Full Name", title: "Ashok Kumar Jha" },
  { name: "Mother Name", title: "Anju Jha" },
  { name: "Parent Mobile Number", title: "9973581686" },
  { name: "Parent Email Id", title: "" },
  { name: "Local Address", title: "" },
  { name: "Permanent Address", title: "Vill-Sudai, Po-Ratauli, India, Bihar, Madhubani, 847..." },
  { name: "Year Of Admission", title: "2023-24" },
  { name: "Previous School / Institute Name", title: "Bangalore University" },
  { name: "Religion", title: "Hindu" },
  { name: "Student Admission Type", title: "" },
  { name: "Category", title: "General" },
  { name: "Payment Category", title: "General" },
  { name: "Nationality", title: "Indian" },
  { name: "Admission Number Series", title: "" },
  { name: "Admission Number / Application Id", title: "" },
  { name: "PRN / University Number", title: "PGDM2023001" },
  { name: "ERP Id", title: "STTBSR231" },
  { name: "Registered On", title: "06 Feb 2024 | 11:41 AM" },
];

export default function StudentProfileDetails() {
  const contentRef  = useRef(null); // ✅ Define ref before using it

  const handlePrint = useReactToPrint({contentRef
  });
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users); // Convert JSON data to sheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Student Data");

    // Generate XLSX file and trigger download
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(file, "Student_Profile.xlsx");
  };

  return (
    <>
      <div className="flex justify-end">
        <div className="w-1/2 flex">
          <span className="bg-red-50 border border-gray-300 py-4 px-8 rounded-sm">
            Profile Details
          </span>
        </div>

        <div className="w-1/2 flex gap-4 justify-end">
          <button
            className="bg-white border border-gray-700 py-4 px-10 rounded-sm flex gap-2"
            onClick={handlePrint} // ✅ Moved `onClick` inside button to trigger print
          >
            <PrinterIcon className="size-6" />
            Print
          </button>
          <button className="bg-white border border-gray-700 py-4 px-8 rounded-sm flex gap-2" onClick={handleExportExcel}>
            <DockIcon className="size-6" />
            Export
          </button>
        </div>
      </div>
      <hr className="border-1 border-gray-700 mt-4 mb-4" />

      {/* Printable Section */}
      <div className="rounded-sm border border-gray-300 mt-4">
        <div ref={contentRef} className="overflow-hidden rounded-lg border border-gray-200 p-4 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <tbody className="divide-y divide-gray-200 bg-white">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
