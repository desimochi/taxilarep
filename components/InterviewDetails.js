"use client";

import { PrinterIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { DockIcon } from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function InterviewDetails() {
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
            <thead>
                <tr>
                    <th>Sr. No.</th>
                    <th>Opening</th>
                    <th>Organization.</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Round</th>
                </tr>
                
            </thead>
                <hr className="border-1 border-gray-700 mt-2" />
                <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"></td>
                  </tr>
                </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
