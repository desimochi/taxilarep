"use client";
import { useRef } from "react";
import Image from "next/image";
import examSign from "@/public/exam-sign.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Marksheet({
  data,
  cgpa,
  gpa,
  father_name,
  name,
  sr,
  enroll,
  term,
  term_period,
  examPeriod,
}) {
  const printRef = useRef(null);

  const date = new Date();
  const dayName = date.toLocaleDateString("en-IN", { weekday: "long" });
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${dayName}, ${day}/${month}/${year}`;

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      // Pass the font URL to html2canvas to ensure it loads the CSS/font
      allowTaint: true, 
    });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${name}_Marksheet.pdf`);
  };

  // Define the font family name for the CSS
  const fontName = "Century Gothic";

  // IMPORTANT: This is a placeholder for a CDN. 
  // You must replace this with the actual URL where your licensed Century Gothic font is hosted.
  const centuryGothicCdn = "https://fonts.cdnfonts.com/css/century-gothic-paneuropean";

  return (
    <div className="p-8 max-h-screen overflow-scroll h-fit" style={{ fontFamily: `'${fontName}', sans-serif` }}>
      {/* 1. Inject the CDN link directly into the component's rendered output. 
        This is a less common but valid approach for isolated component styling/resources.
        In a Next.js App Router, using the <head> of the root layout is usually better, 
        but this ensures the CDN link is present when the component renders.
      */}
      <link 
        rel="stylesheet" 
        href={centuryGothicCdn} 
        media="print" // Use media="print" to ensure the link is considered when printing/converting
      />

      {/* 2. Remove the old @font-face block since the CDN link loads the font.
        We keep the global style for the benefit of the PDF tool (html2canvas). 
      */}
      <style jsx global>{`
        /* This style is a fallback/helper, the CDN link above is the primary source */
        body, .MarksheetContainer { 
          font-family: "${fontName}", sans-serif !important;
        }
      `}</style>

      <button
        onClick={handleDownloadPDF}
        className="mb-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Download Marksheet PDF
      </button>

      <div
        ref={printRef}
        className="border p-8 pt-16 text-base bg-white text-black leading-relaxed MarksheetContainer flex flex-col justify-center"
      >
        <h1 className="text-center text-3xl font-bold">Taxila Business School</h1>
        <p className="text-center">Post Graduate Diploma in Managment (PGDM)</p>
        <p className="text-center">[Approved by AICTE, Ministry of HRD, Govt. of India]</p>
        <div className="flex justify-end">
          <p>
            <strong>Sr. No.:</strong> {sr}
          </p>
        </div>
<div className="flex flex-col items-center justify-center space-y-2 ">
    <p className="text-2xl font-bold">Mark Card</p>
  <p>
            <strong>EXAMINATION:</strong> {examPeriod}
          </p>
          <p>
            <strong>TERM:</strong> {term}
          </p>
          <p>
           {term_period}
          </p>
</div>
        <div className="mt-8 space-y-2">
          
          <p>
            <strong>Enrollment No:</strong> {enroll}
          </p>
          <p>
            <strong>Student Name:</strong> {name}
          </p>
          <p>
            <strong>Father's Name:</strong> Mr. {father_name}
          </p>
        </div>

        <table className="w-full mt-8 border border-collapse text-base">
          <thead>
            <tr className="bg-gray-100 font-semibold">
              <th className="border px-2 py-2">Sr. No.</th>
              <th className="border px-2 py-2">Course Code</th>
              <th className="border px-2 py-2">Course Name</th>
              <th className="border px-2 py-2">Course Credit</th>
              <th className="border px-2 py-2">Marks</th>
              <th className="border px-2 py-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border px-2 py-2 text-center">{index + 1}</td>
                <td className="border px-2 py-2 text-center">
                  {item.subject_code}
                </td>
                <td className="border px-2 py-2">{item.subject_name}</td>
                <td className="border px-2 py-2 text-center">{item.credit}</td>
                <td className="border px-2 py-2 text-center">
                  {item.scaled_total_marks}
                </td>
                <td className="border px-2 py-2 text-center">{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 font-semibold text-lg">
          <p>Grade Point Average (GPA): {gpa}</p>
          <p>Cumulative Grade Point Average (CGPA): {cgpa}</p>
        </div>

        <div className="mt-8">
          <Image src={examSign} alt="exam-sign" height={100} width={140} />
          <p className="font-semibold">Examination Controller</p>
          <p>Date of Issue: {formattedDate}</p>
          <p className="font-semibold">Taxila Business School, Jaipur</p>
          <p className="text-sm">This is an electronically generated marksheet no signature is required</p>
        </div>

        <div className="mt-8">
            <h3 className="font-bold">Marks Distribution</h3>
            <table className="w-full border border-gray-300 mt-3">
                <thead className="border">
                    <tr>
                        <th>Marks Range</th>
                        <th>Grade</th>
                        <th>Credit Point</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    <tr className="border">
                        <td>91-100</td>
                        <td>A+</td>
                        <td>10</td>
                    </tr>
                    <tr className="border">
                        <td>81-90</td>
                        <td>A</td>
                        <td>9</td>
                    </tr>
                    <tr className="border">
                        <td>71-80</td>
                        <td>B+</td>
                        <td>8</td>
                    </tr>
                    <tr className="border">
                        <td>61-70</td>
                        <td>B</td>
                        <td>7</td>
                    </tr>
                  <tr className="border">
                        <td>50-60</td>
                        <td>C+</td>
                        <td>6</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div className="mt-4">
            <h3 className="font-bold">Passing Crriteria</h3>
            <p>It is essential to obtian minimum "C+" Grade (50% marks) for passing a paper</p>
        </div>
      </div>
      
    </div>
  );
}