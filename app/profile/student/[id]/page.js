"use client"
import men from '@/public/men.jpg'
import women from '@/public/women.jpg'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { authFetch } from '@/app/lib/fetchWithAuth';
import { Edit, Save, X, User, Phone, MapPin, GraduationCap, Info } from 'lucide-react';
import Toast from '@/components/Toast';

export default function StudentDetailPage() {
    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFields, setEditedFields] = useState({});
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await authFetch(`student-viewset/${id}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch student data');
                }
                const result = await res.json();
                setStudent(result.data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            // Reset edited fields if cancelling
            setEditedFields({});
            // Restore original values
            setStudent(prevStudent => ({ ...prevStudent }));
        }
    };

    const handleSaveClick = async () => {
        try {
            setLoading(true);
            setError(null);

            if (Object.keys(editedFields).length === 0) {
                setMessage("No changes to save.");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
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
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update student");
            }

            const updated = await res.json();
            setStudent(prev => ({ ...prev, ...editedFields }));
            setEditedFields({});
            setIsEditing(false);
            setMessage("Student information updated successfully");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (err) {
            setError(err.message);
            setMessage("Failed to update student information");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        
        setStudent(prev => ({ ...prev, [name]: fieldValue }));
        setEditedFields(prev => ({ ...prev, [name]: fieldValue }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN');
    };

    const EditableField = ({ label, name, value, type = 'text', options = null, required = false }) => {
        if (isEditing) {
            if (type === 'select') {
                return (
                    <p className='flex items-center justify-between mt-2 gap-2 text-sm'>
                        <strong>{label}:</strong>
                        <select
                            name={name}
                            value={value || ""}
                            onChange={handleChange}
                            required={required}
                            className="border border-gray-300 p-2 rounded-sm w-full max-w-[200px] focus:border-red-500 focus:outline-none"
                        >
                            <option value="">Select {label}</option>
                            {options.map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </p>
                );
            } else if (type === 'checkbox') {
                return (
                    <p className='flex items-center justify-between mt-2 gap-2 text-sm'>
                        <strong>{label}:</strong>
                        <input
                            type="checkbox"
                            name={name}
                            checked={value || false}
                            onChange={handleChange}
                            className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        />
                    </p>
                );
            } else if (type === 'textarea') {
                return (
                    <p className='flex items-start justify-between mt-2 gap-2 text-sm'>
                        <strong className="pt-2">{label}:</strong>
                        <textarea
                            name={name}
                            value={value || ""}
                            onChange={handleChange}
                            required={required}
                            rows={3}
                            className="border border-gray-300 p-2 rounded-sm w-full max-w-[200px] focus:border-red-500 focus:outline-none resize-vertical"
                        />
                    </p>
                );
            } else {
                return (
                    <p className='flex items-center justify-between mt-2 gap-2 text-sm'>
                        <strong>{label}:</strong>
                        <input
                            type={type}
                            name={name}
                            value={value || ""}
                            onChange={handleChange}
                            required={required}
                            className="border border-gray-300 p-2 rounded-sm w-full max-w-[200px] focus:border-red-500 focus:outline-none"
                        />
                    </p>
                );
            }
        } else {
            return (
                <p className='flex items-center justify-between mt-2 gap-2 text-sm'>
                    <strong>{label}:</strong>
                    <span className="text-right max-w-[200px] break-words">
                        {type === 'checkbox' ? (value ? 'Yes' : 'No') : (value || 'N/A')}
                    </span>
                </p>
            );
        }
    };

    if (loading && !student.id) {
        return (
            <div className="min-h-screen p-10 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading student information...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-10 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-4 md:p-10 bg-gray-50">
            {showToast && <Toast message={message} />}
            
            {/* Header Section */}
            <div className='bg-white shadow-lg rounded-lg border border-gray-200 mb-6'>
                <div className='flex flex-col md:flex-row justify-between items-start md:items-center p-6'>
                    <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                        <div className="flex-shrink-0">
                            <Image
                                src={student.gender === "Male" ? men : women}
                                alt="Student"
                                width={150}
                                height={150}
                                className='rounded-lg border-2 border-gray-300 shadow-md'
                            />
                        </div>
                        <div className="flex-grow">
                            <h1 className='font-bold text-2xl md:text-3xl text-gray-900 mb-3'>
                                {student.first_name} {student.middle_name} {student.last_name}
                            </h1>
                            <hr className='border-gray-300 mb-4' />
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className={`text-sm px-4 py-1 rounded-full font-medium ${
                                    !student.dropped && !student.passout_status 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {!student.dropped && !student.passout_status ? 'Active' : 'Inactive'}
                                </span>
                                <span className='text-sm bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-medium'>
                                    {student.course?.name}
                                </span>
                                <span className='text-sm bg-purple-100 text-purple-800 px-4 py-1 rounded-full font-medium'>
                                    {student.batch?.name}
                                </span>
                            </div>

                            <div className="text-sm text-gray-600 space-y-1">
                                <p><strong>Email:</strong> {student.user?.email}</p>
                                <p><strong>Enrollment:</strong> {student.enrollment_number}</p>
                                <p><strong>Joined:</strong> {formatDate(student.date_of_joining)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 flex-shrink-0">
                        {isEditing ? (
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleSaveClick} 
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
                                >
                                    <Save className='h-4 w-4'/>
                                    {loading ? "Saving..." : "Save"}
                                </button>
                                <button 
                                    onClick={handleEditClick}
                                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                                >
                                    <X className='h-4 w-4'/>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={handleEditClick}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                                <Edit className='h-4 w-4'/>
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Information Cards */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                
                {/* Basic Information */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="bg-red-50 p-4 rounded-t-lg border-b border-red-200">
                        <h2 className="text-xl font-semibold text-red-800 flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Basic Information
                        </h2>
                    </div>
                    <div className="p-4 space-y-3">
                        <EditableField 
                            label="Enrollment Number" 
                            name="enrollment_number" 
                            value={student.enrollment_number}
                            required
                        />
                         <EditableField 
                            label="AICTE Permanent Id" 
                            name="aicte_permanent_id" 
                            value={student.aicte_permanent_id}
                            required
                        />
                        <EditableField 
                            label="Gender" 
                            name="gender" 
                            value={student.gender}
                            type="select"
                            options={['Male', 'Female', 'Other']}
                        />
                        <EditableField 
                            label="Date of Birth" 
                            name="date_of_birth" 
                            value={student.date_of_birth}
                            type="date"
                        />
                        <EditableField 
                            label="Category" 
                            name="category" 
                            value={student.category}
                            type="select"
                            options={['General', 'OBC', 'SC', 'ST', 'Other']}
                        />
                        <EditableField 
                            label="Religion" 
                            name="religion" 
                            value={student.religion}
                        />
                        <EditableField 
                            label="Blood Group" 
                            name="blood_group" 
                            value={student.blood_group}
                            type="select"
                            options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']}
                        />
                        <EditableField 
                            label="Contact Number" 
                            name="contact_number" 
                            value={student.contact_number}
                            type="tel"
                        />
                        <EditableField 
                            label="Aadhar Number" 
                            name="aadhar_number" 
                            value={student.aadhar_number}
                        />
                    </div>
                </div>

                {/* Contact & Address Information */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="bg-red-50 p-4 rounded-t-lg border-b border-red-200">
                        <h2 className="text-xl font-semibold text-red-800 flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Contact & Address
                        </h2>
                    </div>
                    <div className="p-4 space-y-3">
                        <p className='flex items-center justify-between mt-2 gap-2 text-sm'>
                            <strong>Email:</strong> 
                            <span className="text-right max-w-[200px] break-words">{student.user?.email}</span>
                        </p>
                        <EditableField 
                            label="Address" 
                            name="address" 
                            value={student.address}
                            type="textarea"
                        />
                        <EditableField 
                            label="City" 
                            name="city" 
                            value={student.city}
                        />
                        <EditableField 
                            label="District" 
                            name="district" 
                            value={student.district}
                        />
                        <EditableField 
                            label="State" 
                            name="state" 
                            value={student.state}
                        />
                        <EditableField 
                            label="Pincode" 
                            name="pincode" 
                            value={student.pincode}
                        />
                        
                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Parents Information</h3>
                            <div className="space-y-3">
                                <EditableField 
                                    label="Father Name" 
                                    name="father_name" 
                                    value={student.father_name}
                                />
                                <EditableField 
                                    label="Father Contact" 
                                    name="father_contact_number" 
                                    value={student.father_contact_number}
                                    type="tel"
                                />
                                <EditableField 
                                    label="Father Email" 
                                    name="father_email" 
                                    value={student.father_email}
                                    type="email"
                                />
                                <EditableField 
                                    label="Mother Name" 
                                    name="mother_name" 
                                    value={student.mother_name}
                                />
                                <EditableField 
                                    label="Mother Contact" 
                                    name="mother_contact_number" 
                                    value={student.mother_contact_number}
                                    type="tel"
                                />
                                <EditableField 
                                    label="Mother Email" 
                                    name="mother_email" 
                                    value={student.mother_email}
                                    type="email"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Information */}
                <div className="bg-white rounded-lg shadow-md border border-gray-200">
                    <div className="bg-red-50 p-4 rounded-t-lg border-b border-red-200">
                        <h2 className="text-xl font-semibold text-red-800 flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            Academic Information
                        </h2>
                    </div>
                    <div className="p-4 space-y-3">
                        <EditableField 
                            label="10th Score" 
                            name="tenth_score" 
                            value={student.tenth_score}
                            type="number"
                            step="0.01"
                        />
                        <EditableField 
                            label="10th Score Type" 
                            name="tenth_score_type" 
                            value={student.tenth_score_type}
                            type="select"
                            options={['Percentage', 'CGPA', 'Grade']}
                        />
                        <EditableField 
                            label="12th Score" 
                            name="twelfth_score" 
                            value={student.twelfth_score}
                            type="number"
                            step="0.01"
                        />
                        <EditableField 
                            label="12th Score Type" 
                            name="twelfth_score_type" 
                            value={student.twelfth_score_type}
                            type="select"
                            options={['Percentage', 'CGPA', 'Grade']}
                        />
                        <EditableField 
                            label="Graduation Background" 
                            name="graduation_background" 
                            value={student.graduation_background}
                        />
                        <EditableField 
                            label="Graduation Score" 
                            name="graduation_score" 
                            value={student.graduation_score}
                            type="number"
                            step="0.01"
                        />
                        <EditableField 
                            label="Graduation Score Type" 
                            name="graduation_score_type" 
                            value={student.graduation_score_type}
                            type="select"
                            options={['Percentage', 'CGPA', 'Grade']}
                        />
                        <EditableField 
                            label="Entrance Appear" 
                            name="entrance_appear" 
                            value={student.entrance_appear}
                        />
                        <EditableField 
                            label="Entrance Appear Year" 
                            name="entrance_appear_year" 
                            value={student.entrance_appear_year}
                            type="number"
                        />

                        <div className="pt-4 border-t border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                <Info className="h-4 w-4" />
                                Additional Information
                            </h3>
                            <div className="space-y-3">
                                <p className='flex items-center justify-between mt-2 gap-2 text-sm'>
                                    <strong>Date of Joining:</strong> 
                                    <span>{formatDate(student.date_of_joining)}</span>
                                </p>
                                <EditableField 
                                    label="AICTE Permanent ID" 
                                    name="aicte_permanent_id" 
                                    value={student.aicte_permanent_id}
                                />
                                <EditableField 
                                    label="Experience Status" 
                                    name="experience_status" 
                                    value={student.experience_status}
                                    type="select"
                                    options={['Fresher', 'Experienced']}
                                />
                                <EditableField 
                                    label="Physically Disabled (PWD)" 
                                    name="pwd" 
                                    value={student.pwd}
                                    type="checkbox"
                                />
                                <EditableField 
                                    label="Archived" 
                                    name="is_archived" 
                                    value={student.is_archived}
                                    type="checkbox"
                                />
                                <EditableField 
                                    label="Dropped" 
                                    name="dropped" 
                                    value={student.dropped}
                                    type="checkbox"
                                />
                                <EditableField 
                                    label="Passout Status" 
                                    name="passout_status" 
                                    value={student.passout_status}
                                    type="checkbox"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}