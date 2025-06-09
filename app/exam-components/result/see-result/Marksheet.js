import { useRef } from "react";
import examSign from '@/public/exam-sign.png'
import Image from "next/image";
export default function Marksheet({data, cgpa, gpa, father_name, name, enroll, term, term_period, examPeriod}){
    const date = new Date();

// Get day name
const dayName = date.toLocaleDateString('en-IN', { weekday: 'long' });

// Format dd/mm/yyyy
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
const year = date.getFullYear();

const formattedDate = `${dayName}, ${day}/${month}/${year}`;
     const printRef = useRef(null);
     const handlePrint = () => {
    window.print();
  };
console.log(data)
    return(
        <div className="p-8">
      <button
        onClick={handlePrint}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 print:hidden"
      >
        Print Mark Card
      </button>

      <div ref={printRef} className="border p-6 text-sm print:text-black">
        <h1 className="text-center text-xl font-bold">Taxila Business School</h1>
        <p className="text-center">Post Graduate Diploma In Management (PGDM)</p>
        <p className="text-center text-xs">[Approved by AICTE, Ministry of HRD, Govt. of India]</p>
        <h2 className="text-center mt-4 text-lg underline">MARK CARD</h2>

        <div className="mt-6 space-y-1">
          <p><strong>Examination:</strong> {term_period}</p>
          <p><strong>Term:</strong> Term{term}</p>
          <p><strong>Duration:</strong> {examPeriod}</p>
          <p><strong>Enrollment No:</strong> {enroll}</p>
          <p><strong>Student Name:</strong>  {name}</p>
          <p><strong>Father's Name:</strong> Mr. {father_name}</p>
        </div>

        <table className="w-full mt-6 border border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Sr. No.</th>
              <th className="border px-2 py-1">Course Name</th>
              <th className="border px-2 py-1">Course Code</th>
              <th className="border px-2 py-1">Course Credit</th>
              <th className="border px-2 py-1">Marks</th>
              <th className="border px-2 py-1">Grade</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border px-2 py-1 text-center">{index + 1}</td>
                <td className="border px-2 py-1">{item.subject_name}</td>
                <td className="border px-2 py-1 text-center">{item.subject_code}</td>
                <td className="border px-2 py-1 text-center">{item.credit}</td>
                <td className="border px-2 py-1 text-center">{item.scaled_total_marks}</td>
                <td className="border px-2 py-1 text-center">{item.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 font-semibold">
          <p>Grade Point Average (GPA): {gpa}</p>
          <p>Cumulative Grade Point Average (CGPA): {cgpa}</p>
        </div>

        <div className="mt-6">
          <Image src={examSign} alt="exam-sign" height={200} width={150} />
          <p><strong>Examination Controller</strong></p>
          <p>Date of Issue: {formattedDate}</p>
          <p><strong>Taxila Business School, Jaipur</strong></p>
        </div>
      </div>
    </div>
    )
}