"use client"
import men from '@/public/men.jpg'
import women from '@/public/women.jpg'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { authFetch } from '@/app/lib/fetchWithAuth';

export default function Page() {
    const [student, setStudent] = useState({})
    const [loading, setLoading] = useState(false)
    const[error, setError] = useState(false)
    const {id} = useParams()
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
        <div className="min-h-screen p-10">
            {error ? <p>No Student Found</p> : <>
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

            <div className='flex mt-4 gap-4'>
                <div className='w-1/3'>
                <div className="bg-white p-4 rounded border border-gray-300 ">
                    <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
                    <hr className='border border-b1 border-red-700 mb-4' />
                    <p><strong>Full Name:</strong> {student.first_name} {student.middle_name} {student.last_name}</p>
                    <p><strong>Enrollment Number:</strong> {student.enrollment_number}</p>
                    <p><strong>Gender:</strong> {student.gender}</p>
                    <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
                    <p><strong>Category:</strong> {student.category}</p>
                    <p><strong>Religion:</strong> {student.religion}</p>
                    <p><strong>Blood Group:</strong> {student.blood_group || "N/A"}</p>
                </div>
                </div>
                <div className=' w-1/3'>
                <div className="bg-white p-4 rounded border border-gray-300 ">
                    <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                    <hr className='border border-b1 border-red-700 mb-4' />
                    <p><strong>Email:</strong> {student.user?.email}</p>
                    <p><strong>Phone:</strong> {student.contact_number}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <p><strong>District:</strong> {student.district}</p>
                    <p><strong>State:</strong> {student.state}</p>
                    <p><strong>Pincode:</strong> {student.pincode}</p>
                    <hr className='border border-b1 border-gray-100 mt-3 mb-4' />
                    <h2 className="text-xl font-semibold mb-2">Parents Information</h2>
                    <hr className='border border-b1 border-red-700 mb-4' />
                    <p><strong>Father Name:</strong> {student.father_name}</p>
                    <p><strong>Father Contact:</strong> {student.father_contact_number}</p>
                    <p><strong>Mother Name:</strong> {student.mother_name}</p>
                    <p><strong>Mother Contact:</strong> {student.mother_contact_number}</p>
                </div>
                </div>
                <div className=' w-1/3'>
                <div className="bg-white p-4 rounded border border-gray-300 ">
                    <h2 className="text-xl font-semibold mb-2">Academic Information</h2>
                    <hr className='border border-b1 border-red-700 mb-4' />
                    <p><strong>10th Score:</strong> {student.tenth_score}</p>
                    <p><strong>12th Score:</strong> {student.twelfth_score}</p>
                    <p><strong>Graduation Background:</strong> {student.graduation_background || "N/A"}</p>
                    <p><strong>Graduation Score:</strong> {student.graduation_score}</p>
                    <hr className='border border-b1 border-gray-100 mt-3 mb-4' />
                    <h2 className="text-xl font-semibold mb-2">Extra Information</h2>
                    <hr className='border border-b1 border-red-700 mb-4' />
                    <p><strong>Date of Joining:</strong> {student.date_of_joining}</p>
                    <p><strong>Archived:</strong> {student.is_archived ? "Yes" : "No"}</p>
                    <p><strong>Physically Disabled (PWD):</strong> {student.pwd ? "Yes" : "No"}</p>
                    <p><strong>Dropped:</strong> {student.dropped ? "Yes" : "No"}</p>
                    <p><strong>Passout Status:</strong> {student.passout_status ? "Yes" : "No"}</p>
                </div>
                </div>
            </div>
            </>
}
        </div>
    );
}
