import Image from "next/image";
import logo from "@/public/logo.png"
import { PrinterIcon } from "@heroicons/react/24/outline";
import { Cross, CrossIcon } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { useRef, useState, useEffect } from "react";
export default function DownloadAdmitCard ({data, isOpen, onClose}){
    const [currentTime, setCurrentTime] = useState('');
        const componentRef = useRef();
        const handlePrint = useReactToPrint({
            contentRef: componentRef,
            documentTitle: 'Class Description',
            removeAfterPrint: true,
        });
        useEffect(() => {
            const updateTime = () => {
              const now = new Date();
              const formatted = now.toLocaleString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });
              setCurrentTime(formatted);
            };
        
            updateTime(); // initial call
            const interval = setInterval(updateTime, 60000); // update every minute
        
            return () => clearInterval(interval); // cleanup
          }, []);

    return(
        <div className="bg-white p-8">
            <div className="flex justify-between items-center">
            <button className="flex items-center py-2 px-6 rounded-sm mb-4 border border-gray-300" onClick={handlePrint}> <PrinterIcon className="h-4 w-4" />Print</button>
            <p className="bg-red-800 text-white p-2 rounded-sm"><Cross className="h-5 w-5 rotate-45" onClick={onClose} /></p>
            </div>
            
        <div className="p-8 font-sans bg-white max-w-4xl mx-auto border border-gray-300 shadow-md overflow-y-auto max-h-[90vh]" >
    <div ref={componentRef} className="p-4">
  <div class="text-sm text-left mb-2">{currentTime}</div>

  <div class="flex items-center justify-between mt-4 border-b pb-2">
    <div class="flex items-center gap-28">
      <Image src={logo} width={140} height={60} alt="Taxila Logo" />
      <div className="text-center">
        <p class="font-bold text-2xl">TAXILA BUSINESS SCHOOL</p>
        <p class="text-xs">PGDM Approved by AICTE, Ministry of HRD, Government of India</p>
        <p class="text-xs font-semibold">PGDM Batch-{data.student_batch} {data.student_term} Examination (December 2024)</p>
      </div>
    </div>
  </div>

  <h2 class="text-center text-lg font-bold mt-4 mb-2">Hall Ticket</h2>

  <div class="grid grid-cols-2 gap-4 mb-6 text-sm">
    <div>
      <p><span class="font-semibold">Name:</span> {data.student_name}</p>
      <p><span class="font-semibold">Fathers Name:</span> {data.student_father_name}</p>
      <p><span class="font-semibold">Course:</span> {data.student_course}</p>
    </div>
    <div>
      <p><span class="font-semibold">Enrollment No:</span> {data.student_enrollment_number}</p>
      <p><span class="font-semibold">Term:</span> {data.student_term}</p>
      <div class="mt-2">
        {/* <img src="https://via.placeholder.com/80x100?text=Photo" alt="Photo" class="border border-gray-400 w-20 h-24 object-cover"> */}
      </div>
    </div>
  </div>

  <table class="w-full border text-sm mb-6">
    <thead>
      <tr class="bg-gray-200">
        <th class="border px-2 py-1">Sr. No</th>
        <th class="border px-2 py-1">Subject</th>
        <th class="border px-2 py-1">Exam Date & Time</th>
      </tr>
    </thead>
    <tbody>
  {data.subject_data?.map((subject, index) => {
    const date = subject.exam_date ? new Date(`${subject.exam_date}T${subject.start_time}`) : null;

    let formattedTime = "To Be Announced";
    if (date && subject.duration) {
      const endDate = new Date(date.getTime() + subject.duration * 60 * 60 * 1000);
      const options = { day: '2-digit', month: 'short', year: 'numeric' };
      const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: true };

      const start = date.toLocaleTimeString('en-US', timeOptions);
      const end = endDate.toLocaleTimeString('en-US', timeOptions);
      formattedTime = `${date.toLocaleDateString('en-GB', options)} (${start} - ${end})`;
    }

    return (
      <tr className="border" key={index}>
        <td className="border px-2 py-1 text-center">{index + 1}</td>
        <td className="border px-2 py-1">{subject.subject_name}</td>
        <td className="border px-2 py-1">{formattedTime}</td>
      </tr>
    );
  })}
</tbody>

  </table>

  <div class="flex justify-between mb-6">
    <p class="text-sm font-semibold border-t border-black w-1/3 text-center">Signature of Students</p>
    <p class="text-sm font-semibold border-t border-black w-1/3 text-center">Signature Examination Controller</p>
  </div>

  <p class="text-sm font-semibold mb-2">Note : <span class="underline">Please Carry the Admit Card while appearing for the exam.</span></p>

  <div class="border-t pt-4 text-sm">
    <h3 class="font-bold mb-2">Examination Hall Rules</h3>
    <ul class="list-disc pl-5 space-y-1">
      <li>The Examination Hall will open 10 minutes before the time shown in the examination schedule.</li>
      <li>All students must present their ADMIT cards before entering the Examination Hall.</li>
      <li>Students will not be allowed to enter the Exam Hall 10 minutes after the start of the examination.</li>
      <li>Mobiles phones & any type of bags are not allowed in the campus during examination.</li>
      <li>Exchanging of Articles is not allowed (like Calculators, Erasers, pencils etc.). Scientific calculators are not allowed.</li>
      <li>Discussing anything with another student either in the examination hall or outside the examination hall will also be treated as adopting unfair means.</li>
      <li>The student appearing for the examination must sign the attendance sheet.</li>
      <li>The student must write their roll number on the question paper and on the answer sheet. Students must not write anything on the question paper.</li>
    </ul>
  </div>

  <div class="text-xs text-right mt-4">https://erp.taxila.in/exam-components/admitcard/download-admitcard</div>
</div>
</div>
</div>
    )
}