"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import examSign from "@/public/exam-sign.png";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import QRCode from "qrcode";

export default function Marksheet({
  data,
  cgpa,
  gpa,
  father_name,
  name,
  sr,
  type,
  enroll,
  term,
  term_period,
  examPeriod,
}) {
  console.log(type)
  const printRef = useRef(null);
const [qrUrl, setQrUrl] = useState("");
;
 useEffect(() => {
    const verifyUrl = `https://taxila.in/marksheet?enrollement=${encodeURIComponent(
      enroll
    )}&type=${encodeURIComponent(type)}&term=${encodeURIComponent(term)}`;

    QRCode.toDataURL(verifyUrl, { width: 180, margin: 2 })
      .then((url) => setQrUrl(url))
      .catch((err) => console.error(err));
  }, [enroll, type, term]);
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
const totalCredit = data.reduce((sum, item) => sum + Number(item.credit || 0), 0);

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
        className=" p-8 pt-48 text-xl  bg-white text-black leading-relaxed MarksheetContainer flex flex-col justify-center px-24"
      >
        <div className="flex justify-end mt-4">
          <p>
            <strong>Sr. No.:</strong> {sr}
          </p>
        </div>
<div className="flex flex-col items-center justify-center space-y-2 mt-20 ">
  <p>
            <strong>EXAMINATION:</strong> {examPeriod}
          </p>
          <p>
            <strong>TERM:</strong> {term} - {type}
          </p>
          <p>
           {term_period}
          </p>
</div>
        <div className="mt-4 space-y-2">
          
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

        <table className="w-full mt-6 border border-collapse text-xl">
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
                  {item.scaled_total_marks || item.total_marks}
                </td>
                <td className="border px-2 py-2 text-center">{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
<div className="flex justify-between items-center">
  <div>
        <div className="mt-4 font-semibold text-xl">
          <p>Total Credit: {totalCredit}</p>
          <p>Grade Point Average (GPA): {gpa}</p>
          <p>Cumulative Grade Point Average (CGPA): {cgpa}</p>
        </div>

         <div>
          <p className="font-semibold mt-16">Examination Controller</p>
          <p>Date of Issue: {formattedDate}</p>
          </div>
      </div>
      {qrUrl && (
          <div className="mt-12 flex flex-col items-center">
            <img src={qrUrl} alt="QR Code" width={80} height={80} />
          </div>
        )}        
        </div>
      </div>
    </div>
  );
}