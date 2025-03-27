import men from '@/public/men.jpg'
import women from '@/public/women.jpg'
import Image from 'next/image';

export default function StudentProfile() {
    const student = {
        id: 52,
        first_name: "Sahil",
        middle_name: "Kumar",
        last_name: "Verma",
        contact_number: "7979775802",
        blood_group: null,
        date_of_birth: "2025-03-01",
        aadhar_number: null,
        tenth_score_type: null,
        tenth_score: 0.0,
        twelfth_score_type: null,
        twelfth_score: 0.0,
        graduation_background: null,
        graduation_score_type: null,
        graduation_score: 0.0,
        date_of_joining: "2025-03-01",
        gender: "Male",
        category: "GENERAL",
        entrance_score_card: null,
        experience_status: null,
        address: "SENDRA COLLIERY, P.O - BANSJORA, DHANBAD",
        city: null,
        state: "JHARKHAND",
        pincode: "828101",
        father_name: "Navin Kumar Verma",
        father_contact_number: "7979775802",
        father_email: null,
        father_aadhar_number: null,
        mother_name: "Anjali verma",
        mother_contact_number: "7979775802",
        mother_email: null,
        mother_aadhar_number: null,
        is_archived: false,
        created_at: "2025-03-18T10:16:55.165958Z",
        updated_at: "2025-03-18T10:16:55.165973Z",
        enrollment_number: "PGDM2024042",
        aicte_permanent_id: null,
        religion: "HINDU",
        district: "DHANBAD",
        pwd: false,
        dropped: false,
        passout_status: false,
        entrance_appear: null,
        entrance_appear_year: null,
        user: {
            email: "sahil29@taxila.in",
            user_type: "STUDENT"
        },
        batch: {
            id: 3,
            name: "T29",
            start_date: "2024-07-01",
            end_date: "2026-07-01"
        },
        course: {
            id: 1,
            name: "PGDM + Business Analytics",
            description: "Triple Specialization",
            duration_in_months: "24"
        },
        student_role: {
            id: 1,
            name: "Student",
            description: "this is special role Student."
        }
    };

    return (
        <div className="min-h-screen p-10">
            <div className="flex p-3 gap-3 border border-gray-300">
            <Image 
  src={student.gender === "Male" ? men : women} 
  alt="Student" 
  width={150} 
  height={150} 
  className='rounded-sm border border-gray-700'
/> <div>
                <h4 className='font-bold text-3xl text-slate-700'>{student.first_name} {student.middle_name} {student.last_name}</h4>
                <hr className='border-b-1 mt-2'/>
                <p className='text-sm bg-green-600 w-fit text-white mt-3 mb-2 py-0.5 px-4 rounded-sm'>{!student.dropped && !student.passout_status ? 'Active' : 'Inactive'}</p>
                <p className='text-sm bg-red-600 w-fit text-white py-0.5 mb-2 px-4 rounded-sm'>{student.course.name}</p>
                <p className='text-sm bg-black w-fit text-white py-0.5 px-4 rounded-sm'>{student.batch.name}</p>
            </div>
            </div>

            <div className='flex'>
                <div className='w-1/4'>
                <div className="bg-white p-4 rounded ">
                    <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
                    <p><strong>Full Name:</strong> {student.first_name} {student.middle_name} {student.last_name}</p>
                    <p><strong>Enrollment Number:</strong> {student.enrollment_number}</p>
                    <p><strong>Gender:</strong> {student.gender}</p>
                    <p><strong>Date of Birth:</strong> {student.date_of_birth}</p>
                    <p><strong>Category:</strong> {student.category}</p>
                    <p><strong>Religion:</strong> {student.religion}</p>
                    <p><strong>Blood Group:</strong> {student.blood_group || "N/A"}</p>
                </div>
                </div>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Basic Info */}
                

                {/* Contact Info */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
                    <p><strong>Email:</strong> {student.user.email}</p>
                    <p><strong>Phone:</strong> {student.contact_number}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <p><strong>District:</strong> {student.district}</p>
                    <p><strong>State:</strong> {student.state}</p>
                    <p><strong>Pincode:</strong> {student.pincode}</p>
                </div>

                {/* Batch Info */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Batch Information</h2>
                    <p><strong>Batch Name:</strong> {student.batch.name}</p>
                    <p><strong>Start Date:</strong> {student.batch.start_date}</p>
                    <p><strong>End Date:</strong> {student.batch.end_date}</p>
                </div>

                {/* Course Info */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Course Information</h2>
                    <p><strong>Course Name:</strong> {student.course.name}</p>
                    <p><strong>Description:</strong> {student.course.description}</p>
                    <p><strong>Duration (Months):</strong> {student.course.duration_in_months}</p>
                </div>

                {/* Academic Info */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Academic Information</h2>
                    <p><strong>10th Score:</strong> {student.tenth_score}</p>
                    <p><strong>12th Score:</strong> {student.twelfth_score}</p>
                    <p><strong>Graduation Background:</strong> {student.graduation_background || "N/A"}</p>
                    <p><strong>Graduation Score:</strong> {student.graduation_score}</p>
                </div>

                {/* Parents Info */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Parents Information</h2>
                    <p><strong>Father Name:</strong> {student.father_name}</p>
                    <p><strong>Father Contact:</strong> {student.father_contact_number}</p>
                    <p><strong>Mother Name:</strong> {student.mother_name}</p>
                    <p><strong>Mother Contact:</strong> {student.mother_contact_number}</p>
                </div>

                {/* Role Info */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Role Information</h2>
                    <p><strong>Role Name:</strong> {student.student_role.name}</p>
                    <p><strong>Description:</strong> {student.student_role.description}</p>
                </div>

                {/* Extra Info */}
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold mb-2">Extra Information</h2>
                    <p><strong>Date of Joining:</strong> {student.date_of_joining}</p>
                    <p><strong>Archived:</strong> {student.is_archived ? "Yes" : "No"}</p>
                    <p><strong>Physically Disabled (PWD):</strong> {student.pwd ? "Yes" : "No"}</p>
                    <p><strong>Dropped:</strong> {student.dropped ? "Yes" : "No"}</p>
                    <p><strong>Passout Status:</strong> {student.passout_status ? "Yes" : "No"}</p>
                </div>

            </div>
        </div>
    );
}
