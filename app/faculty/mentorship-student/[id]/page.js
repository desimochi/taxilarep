"use client"
import { ArrowLeft, ArrowRight, BookAIcon, BookCheckIcon, BookCopyIcon, BookDashedIcon, HomeIcon, LocateFixedIcon, LocateIcon, MailCheckIcon, PhoneCallIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import userimage from '@/public/userimage.jpg'
import { useState } from 'react';
const subjects = [
    'Math', 'Science', 'English', 'History', 'Physics', 'Chemistry', 'Biology', 'Computer', 'Economics', 'Art'
  ];
const generateAttendanceData = (days) =>
    subjects.map(() =>
      Array.from({ length: days }, () => Math.random() > 0.5 ? 'present' : 'absent')
    );
export default function StudentPage() {
    const { id } = useParams();
    const router = useRouter();
    const [days, setDays] = useState(7);
    const [attendance, setAttendance] = useState(generateAttendanceData(7));
    const handleDaysChange = (num) => {
        setDays(num);
        setAttendance(generateAttendanceData(num));
      };
    
  

    return (
        <div className="py-6 px-12">
             <button 
            onClick={() => router.back()} 
            className="px-2 py-1 flex align-middle items-center gap-1 text-gray-600 text-xs rounded"
        >
         <ArrowLeft className='h-4 w-4' />   Back to List
        </button>
            <div className='flex mt-4 gap-3 items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Image src={userimage} alt='user profile' height={80} width={80} />
                    <div className=' '>
                <h1 className="text-2xl font-bold">Rajat Singh</h1>
                <span className='text-xs'>Active</span>
                </div>
                </div>
                
                <div className='flex justify-end gap-2'>
                    <button className='border border-gray-300 px-4 rounded shadow-sm hover:shadow-xl transition-shadow text-sm'>Profile</button>
                    <button className='border border-gray-300 px-4 rounded shadow-sm hover:shadow-xl transition-shadow text-sm'>Attendance</button>
                    <button className='border border-gray-300 px-4 rounded shadow-sm hover:shadow-xl transition-shadow text-sm'>Marks</button>
                </div>
            </div>
            <div className='w-full border-b-2 mt-2 mb-3'></div>
            <div className='flex gap-2'>
                <div className='w-1/4'>
                
                <div className='border border-gray-200 p-6 rounded shadow-sm hover:shadow-xl transition-shadow'>
                <h4 className='font-semibold'>Academic Information</h4>
                <div className='w-20 border-b-2 border-red-700 mt-2 mb-5'></div>
                <div className='flex justify-between'>
                        <span className='flex items-center gap-1 '><BookAIcon className='h-4 w-4'/><p>Term</p></span>
                        <p>Term 4</p>
                    </div>
                    <div className='flex justify-between  mt-3'>
                        <span className='flex items-center gap-1'><BookDashedIcon className='h-4 w-4'/><p>Batch</p></span>
                        <p>T28</p>
                    </div>
                    <div className='flex justify-between mt-3 '>
                        <span className='flex items-center gap-1 '><BookCheckIcon className='h-4 w-4'/><p>Specialization</p></span>
                        <p className='text-end'>Marketing and Human Resource</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className='flex items-center gap-1 '><BookCopyIcon className='h-4 w-4'/><p>Course</p></span>
                        <p>PGDM + Business Analytics</p>
                    </div>
                <div className='w-full border-b-2 mt-5 mb-5'></div>
                <h4 className='font-semibold'>Personal Information</h4>
                <div className='w-20 border-b-2 border-red-700 mt-2 mb-5'></div>
                    <div className='flex justify-between'>
                        <span className='flex items-center gap-1 '><MailCheckIcon className='h-4 w-4'/><p>Email</p></span>
                        <p>rajat28@taxila.in</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className='flex items-center gap-1 '><PhoneCallIcon className='h-4 w-4'/><p>Mobile</p></span>
                        <p>+91 9745896312</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className='flex items-center gap-1 '><HomeIcon className='h-4 w-4'/><p>Address</p></span>
                        <p>Mansarovar, Jaipur Rajasthan</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className='flex items-center gap-1 '><MailCheckIcon className='h-4 w-4'/><p>Email</p></span>
                        <p>rajat28@taxila.in</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className='flex items-center gap-1 '><MailCheckIcon className='h-4 w-4'/><p>Email</p></span>
                        <p>rajat28@taxila.in</p>
                    </div>
                </div>
                </div>
                <div className='w-3/4'>
                    <div className='flex border border-gray-200 rounded p-6'>
                        <div className="p-4 w-full">
      {/* Toggle Buttons */}
      <div className="flex justify-between items-center gap-4 mb-4 w-full ">
        <div>
        <h4 className='font-semibold'>Attendance Record - Term 4</h4>
        <div className='flex gap-2'>
        <div className='w-20 border-b-2 border-red-700 mt-4 mb-5'></div>
        <span className='flex  items-center gap-1'><div className='h-3 w-3 rounded-full bg-red-700'></div><p className='text-xs'>Present</p></span>
        <span className='flex  items-center gap-1'><div className='h-3 w-3 rounded-full bg-red-200'></div><p className='text-xs'>Absent</p></span>
        </div>
        </div>
       
        <div className='flex justify-end gap-2'>
        <button
          onClick={() => handleDaysChange(7)}
          className={` text-xs px-4 py-2 border rounded ${days === 7 ? 'bg-red-500 text-white' : 'border-gray-300'}`}>
          7 Days
        </button>
        <button
          onClick={() => handleDaysChange(15)}
          className={`text-xs px-4 py-2 border rounded ${days === 15 ? 'bg-red-500 text-white' : 'border-gray-300'}`}>
          15 Days
        </button>
        </div>
      </div>

      {/* Attendance Chart */}
        <table className="w-full border-collapse text-sm">
          
          <tbody>
            {subjects.map((subject, subjectIndex) => (
              <tr key={subjectIndex}>
                <td className="p-2 border-b">{subject}</td>
                {attendance[subjectIndex].map((status, dayIndex) => (
                  <td key={dayIndex} className="p-2 border-b">
                    <div
                      className={`w-5 h-5 mx-auto rounded ${
                        status === 'present' ? 'bg-red-700' : 'bg-red-200'
                      }`}
                    ></div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
          <tr>
              <th className="text-left p-2 border-b">Subject</th>
              {Array.from({ length: days }, (_, i) => (
                <th key={i} className="p-2 border-b text-center">{i + 1}</th>
              ))}
            </tr>
          </tfoot>
        </table>
    </div>
                        </div>
                    </div>
                </div>
            {/* Fetch and display data based on ID */}
        </div>
    );
}