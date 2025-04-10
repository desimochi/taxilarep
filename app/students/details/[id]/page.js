"use client"
import { ArrowLeft, ArrowRight, BookAIcon, BookCheckIcon, BookCopyIcon, BookDashedIcon, CakeIcon, HomeIcon, LocateFixedIcon, LocateIcon, MailCheckIcon, PhoneCallIcon, User2 } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import userimage from '@/public/userimage.jpg'
import { useState, useEffect } from 'react';
import Atten15Day from '@/components/Atten15Day';
import men from '@/public/men.jpg';
import women from '@/public/women.jpg';
import { authFetch } from '@/app/lib/fetchWithAuth';
import Link from 'next/link';

export default function StudentPage() {
    const { id } = useParams();
    const router = useRouter();
     const [student, setStudent] = useState({})
        const [loading, setLoading] = useState(false)
        const[error, setError] = useState(false)
        useEffect(() => {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const res = await authFetch(`student-viewset/${id}`);
                    if (!res.ok) {
                        setError(true)
                    }
                    const result = await res.json();
                    setStudent(result.data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };
        
            fetchData();
        }, [id]);
   
    
  

    return (
        <div className="py-6 px-12">
             <button 
            onClick={() => router.back()} 
            className="px-2 py-1 flex align-middle items-center gap-1 text-gray-600 text-xs rounded"
        >
         <ArrowLeft className='h-4 w-4' />   Back to List
        </button>
            <div className='flex mt-4 gap-3 items-center justify-between'>
                <div className="flex p-3 gap-3 border border-gray-300">
                
            <Image 
  src={student.gender === "Male" ? men : women} 
  alt="Student" 
  width={150} 
  height={150} 
  className='rounded-sm border border-gray-700'
/> <div>
                <h4 className='font-bold text-3xl text-slate-900'>{student.first_name} {student.middle_name} {student.last_name}</h4>
                <hr className='border-b-1 mt-2'/>
                <p className='text-sm bg-green-600 w-fit text-white mt-3 mb-2 py-0.5 px-4 rounded-sm'>{!student.dropped && !student.passout_status ? 'Active' : 'Inactive'}</p>
                <p className='text-sm bg-red-600 w-fit text-white py-0.5 mb-2 px-4 rounded-sm'>{student.course?.name}</p>
                <p className='text-sm bg-black w-fit text-white py-0.5 px-4 rounded-sm'>{student.batch?.name}</p>
            </div>
            </div>
                
                <div className='flex justify-end gap-2'>
                    <Link href={`/profile/student/${id}`} className='border border-gray-300 px-4 rounded shadow-sm hover:shadow-xl transition-shadow text-sm'>Profile</Link>
                    <Link href={`/student/see-attendance?stuId=${id}`} className='border border-gray-300 px-4 rounded shadow-sm hover:shadow-xl transition-shadow text-sm'>Attendance</Link>
                    <Link href={``} className='border border-gray-300 px-4 rounded shadow-sm hover:shadow-xl transition-shadow text-sm'>Marks</Link>
                </div>
            </div>
            <div className='w-full border-b-2 mt-2 mb-3'></div>
            <div className='flex gap-2'>
                <div className='w-1/4'>
                
                <div className='border border-gray-200 p-6 rounded shadow-sm hover:shadow-xl transition-shadow'>
                <h4 className='font-semibold'>Basic Information</h4>
                <div className='w-20 border-b-2 border-red-700 mt-2 mb-5'></div>
                <div className='flex justify-between'>
                        <span className='flex items-center gap-1 '><BookAIcon className='h-4 w-4'/><p>Enrollment Number</p></span>
                        <p>{student.enrollment_number}</p>
                    </div>
                    <div className='flex justify-between  mt-3'>
                        <span className='flex items-center gap-1'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-venus-and-mars-icon lucide-venus-and-mars"><path d="M10 20h4"/><path d="M12 16v6"/><path d="M17 2h4v4"/><path d="m21 2-5.46 5.46"/><circle cx="12" cy="11" r="5"/></svg><p>Gender</p></span>
                        <p>{student.gender}</p>
                    </div>
                    <div className='flex justify-between mt-3 '>
                        <span className='flex items-center gap-1 '><CakeIcon className='h-4 w-4'/><p>DOB</p></span>
                        <p className='text-end'>{student.date_of_birth}</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className='flex items-center gap-1 '><BookCopyIcon className='h-4 w-4'/><p>Category</p></span>
                        <p>{student.category}</p>
                    </div>
                <div className='w-full border-b-2 mt-5 mb-5'></div>
                <h4 className='font-semibold'>Contact Information</h4>
                <div className='w-20 border-b-2 border-red-700 mt-2 mb-5'></div>
                    <div className='flex justify-between'>
                        <span className='flex items-center gap-1 '><MailCheckIcon className='h-4 w-4'/><p>Email</p></span>
                        <p>{student.user?.email}</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className='flex items-center gap-1 '><PhoneCallIcon className='h-4 w-4'/><p>Mobile</p></span>
                        <p>{student.contact_number}</p>
                    </div>
                    <div className='flex justify-between mt-3 items-center'>
                        <span className='flex items-center gap-1 '><HomeIcon className='h-4 w-4'/><p>Address</p></span>
                        <p className='text-sm text-right'>{student.address}</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className='flex items-center gap-1 '><User2 className='h-4 w-4'/><p>Father Name</p></span>
                        <p>{student.father_name}</p>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <span className='flex items-center gap-1 '><PhoneCallIcon className='h-4 w-4'/><p>Father Contact</p></span>
                        <p>{student.father_contact_number}</p>
                    </div>
                </div>
                </div>
                <div className='w-3/4'>
                        <div className="w-full">
     

      {/* Attendance Chart */}
       <Atten15Day id={id}/>
    </div>
                    </div>
                </div>
            {/* Fetch and display data based on ID */}
        </div>
    );
}