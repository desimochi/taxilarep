"use client"
import men from '@/public/men.jpg'
import women from '@/public/women.jpg'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { authFetch } from '@/app/lib/fetchWithAuth';
import { Edit, SaveAllIcon, SaveIcon } from 'lucide-react';
import Toast from '@/components/Toast';

export default function Page() {
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // State for edit mode
    const [editedFields, setEditedFields] = useState({});
    const [showToast, setshowToast] = useState(false)
    const [message, setMessage] = useState("")
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await authFetch(`student-viewset/${id}`);
                if (!res.ok) {
                    setError(true);
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

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };
    const handlesaveClick = async () => {
        try {
          setLoading(true);
      
          if (Object.keys(editedFields).length === 0) {
            alert("No changes to save.");
            return;
          }
      
          const res = await authFetch(`student-viewset/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedFields),
          });
      
          if (!res.ok) {
            throw new Error("Failed to update student");
          }
      
          const updated = await res.json();
          setStudent((prev) => ({ ...prev, ...editedFields }));
          setEditedFields({});
          setIsEditing(false);
          setMessage("Updated Information Successfully")
          setshowToast(true)
          setTimeout(() => {
            setMessage("")
            setshowToast(false)
            window.location.reload
          }, 2000);
        } catch (err) {
          setError(err.message)
        } finally {
          setLoading(false);
        }
      };
      

      const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent((prev) => ({ ...prev, [name]: value }));
        setEditedFields((prev) => ({ ...prev, [name]: value }));
      };
   
      
    return (
        <div className="min-h-screen p-10">
            {showToast && <Toast message={message}/>}
            {error ? <p className='flex items-center justify-between mt-2 gap-2 text-sm'>{error}</p> : <>
            <div className='flex justify-between items-center border border-gray-300 p-4'>
                <div className="flex p-3 gap-3 ">
                    <Image
                        src={student.gender === "Male" ? men : women}
                        alt="Student"
                        width={150}
                        height={150}
                        className='rounded-sm border border-gray-700'
                    />
                    <div>
                        <h4 className='font-bold text-3xl text-slate-900'>{student.first_name} {student.middle_name} {student.last_name}</h4>
                        <hr className='border-b-1 mt-2' />
                        <p className='text-sm bg-green-600 w-fit text-white mt-3 mb-2 py-0.5 px-4 rounded-sm'>
                            {!student.dropped && !student.passout_status ? 'Active' : 'Inactive'}
                        </p>
                        <p className='text-sm bg-red-600 w-fit text-white py-0.5 mb-2 px-4 rounded-sm'>{student.course?.name}</p>
                        <p className='text-sm bg-black w-fit text-white py-0.5 px-4 rounded-sm'>{student.batch?.name}</p>
                    </div>
                </div>
                {isEditing ? <button onClick={handlesaveClick} disabled={loading} className="mt-5 bg-red-800 text-white px-6 py-2 rounded-sm flex items-center justify-center gap-2"><SaveIcon className='h-4 w-4'/>{loading? "Saving...." : "Save"}</button> : <button onClick={handleEditClick} className="mt-5 bg-red-800 text-white px-6 py-2 rounded-sm flex items-center justify-center gap-2"> <Edit className='h-4 w-4'/>Edit</button>}

                </div>
                <div className='flex mt-4 gap-4'>
                    <div className='w-1/3'>
                        <div className="bg-white p-4 rounded border border-gray-300 ">
                            <h2 className="text-xl font-semibold mb-2 text-red-800 bg-red-50 py-2 text-center">Basic Information</h2>
                            <hr className='border border-b1 border-red-700 mb-4' />
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Full Name:</strong> {student.first_name} {student.middle_name} {student.last_name}</p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Enrollment Number:</strong> {student.enrollment_number}</p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Gender:</strong> {student.gender}</p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Date of Birth:</strong> {student.date_of_birth}</p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Category:</strong>
                                {isEditing ?
                                   <select
                                   name="category"
                                   value={student.category || ""}
                                   onChange={handleChange}
                                   className="border border-gray-300 p-2 rounded-sm w-full"
                                 >
                                   <option value="">Select</option>
                                   <option value="General">General</option>
                                   <option value="OBC">OBC</option>
                                   <option value="SC">SC</option>
                                   <option value="ST">ST</option>
                                   <option value="Other">Other</option>
                                 </select> : student.category}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Religion:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="religion"
                                        value={student.religion || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.religion}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Blood Group:</strong>
                                {isEditing ?
                                    <select
                                    name="blood_group"
                                    value={student.blood_group || ""}
                                    onChange={handleChange}
                                    className="border border-gray-300 p-2 rounded-sm w-full"
                                  >
                                    <option value="">Select</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                  </select>: student.blood_group || "N/A"}
                            </p>
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <div className="bg-white p-4 rounded border border-gray-300 ">
                            <h2 className="text-xl font-semibold mb-2 text-red-800 bg-red-50 py-2 text-center">Contact Information</h2>
                            <hr className='border border-b1 border-red-700 mb-4' />
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Email:</strong> {student.user?.email}</p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Phone:</strong> {student.contact_number}</p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Address:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="address"
                                        value={student.address || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.address}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>District:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="district"
                                        value={student.district || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.district}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>State:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="state"
                                        value={student.state || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.state}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Pincode:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={student.pincode || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.pincode}
                            </p>
                            <hr className='border border-b1 border-gray-100 mt-3 mb-4' />
                            <h2 className="text-xl font-semibold mb-2 text-red-800 bg-red-50 py-2 text-center">Parents Information</h2>
                            <hr className='border border-b1 border-red-700 mb-4' />
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Father Name:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="father_name"
                                        value={student.father_name || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.father_name}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Father Contact:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="father_contact_number"
                                        value={student.father_contact_number || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.father_contact_number}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Mother Name:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="mother_name"
                                        value={student.mother_name || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.mother_name}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Mother Contact:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="mother_contact_number"
                                        value={student.mother_contact_number || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.mother_contact_number}
                            </p>
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <div className="bg-white p-4 rounded border border-gray-300 ">
                            <h2 className="text-xl font-semibold mb-2 text-red-800 bg-red-50 py-2 text-center">Academic Information</h2>
                            <hr className='border border-b1 border-red-700 mb-4' />
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>10th Score:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="tenth_score"
                                        value={student.tenth_score || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.tenth_score}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>12th Score:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="twelfth_score"
                                        value={student.twelfth_score || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.twelfth_score}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Graduation Background:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="graduation_background"
                                        value={student.graduation_background || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.graduation_background || "N/A"}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Graduation Score:</strong>
                                {isEditing ?
                                    <input
                                        type="text"
                                        name="graduation_score"
                                        value={student.graduation_score || ""}
                                        onChange={handleChange}
                                        className='border border-gray-300 p-2 rounded-sm w-full'
                                    /> : student.graduation_score}
                            </p>
                            <hr className='border border-b1 border-gray-100 mt-3 mb-4' />
                            <h2 className="text-xl font-semibold mb-2 text-red-800 bg-red-50 py-2 text-center">Extra Information</h2>
                            <hr className='border border-b1 border-red-700 mb-4' />
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Date of Joining:</strong>
                                {student.date_of_joining}
                            </p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Archived:</strong> {student.is_archived ? "Yes" : "No"}</p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Physically Disabled (PWD):</strong> {student.pwd ? "Yes" : "No"}</p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Dropped:</strong> {student.dropped ? "Yes" : "No"}</p>
                            <p className='flex items-center justify-between mt-2 gap-2 text-sm'><strong>Passout Status:</strong> {student.passout_status ? "Yes" : "No"}</p>
                        </div>
                    </div>
                </div>
                
            </>}
        </div>
    );
}
