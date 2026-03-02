"use client"
import { useEffect, useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import Toast from "@/components/Toast";
export default function Page(){
  const [image, setImage] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [formdata, setFormdata] = useState({
    email: "",
    user_type: "STUDENT",
    first_name: "",
    last_name: "",
    middle_name: "",
    date_of_birth: "",
    student_role: 3,
    contact_number: "",
    gender: "Male",
    blood_group: "",
    aadhar_number: "",
    father_name: "",
    father_contact_number: "",
    father_email: "",
    father_aadhar_number: "",
    mother_name: "",
    mother_contact_number: "",
    mother_email: "",
    mother_aadhar_number: "",
    tenth_score_type:"",
    tenth_score:"",
    twelfth_score_type:"",
    twelfth_score:"",
    graduation_background:"",
    graduation_score_type:"",
    graduation_score:"",
    date_of_joining:"",
    batch: "",
    course: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    religion: "Hindu",
    caste: "General",
    experience_status: false,
    experience_details: [],
    score_card: "",
    pwd: false,
    dropped: false,
    passout_status: false,
  });

  const [batch, setBatch] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [classRes, subRes] = await Promise.all([
          authFetch("batch-viewset"),
          authFetch("course-viewset"),
        ]);

        const classData = await classRes.json();
        const subData = await subRes.json();

        // Only update state if the data is different
        setBatch((prev) => (JSON.stringify(prev) !== JSON.stringify(classData.data) ? classData.data : prev));
        setCourse((prev) => (JSON.stringify(prev) !== JSON.stringify(subData.data) ? subData.data : prev));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
    const maxSize = 1 * 1024 * 1024; // 1MB

    if (!allowedFormats.includes(file.type)) {
      setError("Only JPG, JPEG, and PNG formats are allowed.");
      setImage(null);
      return;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 1MB.");
      setImage(null);
      return;
    }

    setError("");
    setImage(URL.createObjectURL(file));
  };

  function handleBatchChange(e) {
    const selectedId = e.target.value;
    setSelectedBatch(selectedId);
  }

  function handleCourseChange(e) {
    const selectedId = e.target.value;
    setSelectedCourse(selectedId);
  }

async function handleSubmit() {
    // Required fields
    const requiredFields = [
        "email",
        "first_name",
        "last_name",
        "date_of_birth",
        "contact_number",
        "gender"
    ];

    // Check if any required field is empty
    for (let field of requiredFields) {
        if (!formdata[field]) {
            setMessage(`Please fill out the ${field.replace("_", " ")} field.`);
            setShowToast(true);
            return; // Stop form submission if any required field is empty
        }
    }

    // Prepare the payload for submission
    const payload = {
        user: {
            email: formdata.email,
            user_type: formdata.user_type,
        },
        first_name: formdata.first_name,
        middle_name: formdata.middle_name,
        last_name: formdata.last_name,
        date_of_birth: formdata.date_of_birth,
        batch: selectedBatch,
        course: selectedCourse,
        student_role: formdata.student_role,
        contact_number: formdata.contact_number,
        gender: formdata.gender,
        blood_group: formdata.blood_group,
        aadhar_number: formdata.aadhar_number,
        father_name: formdata.father_name,
        father_contact_number: formdata.father_contact_number,
        father_email: formdata.father_email,
        father_aadhar_number: formdata.father_aadhar_number,
        mother_name: formdata.mother_name,
        mother_contact_number: formdata.mother_contact_number,
        mother_email: formdata.mother_email,
        mother_aadhar_number: formdata.mother_aadhar_number,
        address: formdata.address,
        city: formdata.city,
        state: formdata.state,
        pincode: formdata.pincode,
        religion: formdata.religion,
        caste: formdata.caste,
        experience_status: formdata.experience_status,
        experience_details: formdata.experience_details,
        score_card: formdata.score_card,
         tenth_score_type:formdata.tenth_score_type,
    tenth_score:formdata.tenth_score,
    twelfth_score_type:formdata.twelfth_score_type,
    twelfth_score:formdata.tenth_score,
    graduation_background:formdata.graduation_background,
    graduation_score_type:formdata.graduation_score_type,
    graduation_score:formdata.graduation_score,
    date_of_joining:formdata.date_of_joining,
        pwd: formdata.pwd,
        dropped: formdata.dropped,
        passout_status: formdata.passout_status,
    };

    try {
        const response = await authFetch(`student-viewset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.code === 400) {
            setShowToast(false); // Reset state first
            setTimeout(() => {
                setMessage(data.message);
                setShowToast(true);
            }, 100); // Small delay ensures re-triggering
        } else {
            setShowToast(false); // Reset state first
            setTimeout(() => {
                setMessage("Student Added successfully");
                setShowToast(true);
            }, 100); // Small delay ensures re-triggering
        }
    } catch (error) {
        console.error("Error:", error);
    }
}


   return(
    <div className="p-8 flex flex-col min-h-screen">
      {showToast && <Toast message={message} />}
      <div className="grid grid-cols-3 gap-3 pb-24">
        <div className="w-full">
  <label htmlFor="firstname" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">First Name <span className="text-red-600">*</span></label>
  <input type="text" placeholder="Enter First Name" value={formdata.first_name} name="first_name" onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="middlename" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Middle Name</label>
  <input type="text" placeholder="Enter Middle Name" value={formdata.middle_name} name="middle_name" onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="lastname" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Last Name</label>
  <input type="text" placeholder="Enter Last Name" value={formdata.last_name} name="last_name" onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Email Address</label>
  <input type="email" placeholder="Enter Email Address" value={formdata.email} name="email" onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="gender" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Gender</label>
  <select id="gender" name="gender" onChange={handleChange} value={formdata.gender} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500">
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
</div>

<div className="w-full">
  <label htmlFor="dob" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Date of Birth</label>
  <input type="date" name="date_of_birth" value={formdata.date_of_birth} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="contact_number" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mobile No. <span className="text-red-600">*</span></label>
  <input type="tel" placeholder="Enter Mobile No." name="contact_number" value={formdata.contact_number} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="bloodgroup" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Blood Group</label>
  <select id="bloodgroup" name="bloodgroup" onChange={handleChange} value={formdata.blood_group} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500">
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
  </select>
</div>
<div className="w-full">
  <label htmlFor="caste" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Category</label>
  <select id="caste" name="caste" onChange={handleChange} value={formdata.caste} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500">
    <option value="General">General</option>
    <option value="OBC">OBC</option>
    <option value="EWS">EWS</option>
    <option value="SC">SC</option>
    <option value="ST">ST</option>
    <option value="Tibal">Tribal</option>
  </select>
</div>
<div className="w-full">
  <label htmlFor="aadharcard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Aadhar Card</label>
  <input type="text" placeholder="Enter Aadhar Card Number" name="aadhar_number" value={formdata.aadhar_number} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="batch" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Batch<span className="text-red-600">*</span></label>
  <select value={selectedBatch} onChange={handleBatchChange} className="p-2 border rounded">
    <option value="">Select Batch</option>
    {batch.map((batch) => (
      <option key={batch.id} value={batch.id}>
        {batch.name}
      </option>
    ))}
  </select>
</div>

<div className="w-full">
  <label htmlFor="course" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Course<span className="text-red-600">*</span></label>
  <select value={selectedCourse} onChange={handleCourseChange} className="p-2 border rounded">
    <option value="">Select Course</option>
    {course.map((course) => (
      <option key={course.id} value={course.id}>
        {course.name}
      </option>
    ))}
  </select>
</div>

{/* Father details */}
<div className="w-full">
  <label htmlFor="fathername" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father's Name</label>
  <input type="text" placeholder="Enter Father's Name" name="father_name" value={formdata.father_name} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="fathernumber" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father's Mobile No.</label>
  <input type="tel" placeholder="Enter Father's Mobile Number" name="father_contact_number" value={formdata.father_contact_number} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="fathersmail" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father's Email</label>
  <input type="email" placeholder="Enter Father's Email" name="father_email" value={formdata.father_email} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="fatheradharno" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father's Aadhar No.</label>
  <input type="text" placeholder="Enter Father's Aadhar No." name="father_aadhar_number" value={formdata.father_aadhar_number} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

{/* Mother details */}
<div className="w-full">
  <label htmlFor="mothername" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother's Name</label>
  <input type="text" placeholder="Enter Mother's Name" name="mother_name" value={formdata.mother_name} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="mothernumber" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother's Mobile No.</label>
  <input type="tel" placeholder="Enter Mother's Mobile Number" name="mother_contact_number" value={formdata.mother_contact_number} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="mothersmail" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother's Email</label>
  <input type="email" placeholder="Enter Mother's Email" name="mother_email" value={formdata.mother_email} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="motheradharno" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother's Aadhar No.</label>
  <input type="text" placeholder="Enter Mother's Aadhar No." name="mother_aadhar_number" value={formdata.mother_aadhar_number} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

{/* Address details */}
<div className="w-full">
  <label htmlFor="address" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Address</label>
  <input type="text" placeholder="Enter Address" name="address" value={formdata.address} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="city" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">City</label>
  <input type="text" placeholder="Enter City Name" name="city" value={formdata.city} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="state" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">State</label>
  <input type="text" placeholder="Enter State Name" name="state" value={formdata.state} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="pincode" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Pincode</label>
  <input type="number" name="pincode" value={formdata.pincode} onChange={handleChange} placeholder="Enter Pincode" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>


{/* Education Details */}
<div className="w-full">
  <label htmlFor="tenth_score_type" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">10th Score Type</label>
  <select name="tenth_score_type" value={formdata.tenth_score_type} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" >
    <option value=''>Select A Value</option>
    <option value='Percentage'>Percentage</option>
    <option value='CGPA'>CGPA</option>
    </select>
</div>
<div className="w-full">
  <label htmlFor="tenth_score" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">10th Score</label>
  <input type="number" name="tenth_score" value={formdata.tenth_score} onChange={handleChange} placeholder="Enter 10th Score" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>
<div className="w-full">
  <label htmlFor="twelfth_score_type" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12th Score Type</label>
  <select name="twelfth_score_type" value={formdata.twelfth_score_type} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" >
    <option value=''>Select A Value</option>
    <option value='Percentage'>Percentage</option>
    <option value='CGPA'>CGPA</option>
    </select>
</div>
<div className="w-full">
  <label htmlFor="twelfth_score" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12th Score</label>
  <input type="number" name="twelfth_score" value={formdata.twelfth_score} onChange={handleChange} placeholder="Enter 12th Score" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>
<div className="w-full">
  <label htmlFor="graduation_background" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Graduation Backgorund</label>
  <input type="text" name="graduation_background" value={formdata.graduation_background} onChange={handleChange} placeholder="Enter Graduation Backgorund" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>
<div className="w-full">
  <label htmlFor="graduation_score_type" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Graduation Score Type</label>
  <select name="graduation_score_type" value={formdata.graduation_score_type} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" >
    <option value=''>Select A Value</option>
    <option value='Percentage'>Percentage</option>
    <option value='CGPA'>CGPA</option>
    </select>
</div>
<div className="w-full">
  <label htmlFor="graduation_score" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Graduation Score</label>
  <input type="number" name="graduation_score" value={formdata.graduation_score} onChange={handleChange} placeholder="Enter Graduation Score" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>
<div className="w-full">
  <label htmlFor="date_of_joining" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Date of joining</label>
  <input type="date" name="date_of_joining" value={formdata.date_of_joining} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="score_card" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Entrance Exam Scorecard</label>
  <input type="text" name="score_card" value={formdata.score_card} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>
{/* Experience Details */}
<div className="w-full">
  <label htmlFor="experience" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Do you have work experience?</label>
  <div className="flex space-x-4">
    <label className="flex items-center cursor-pointer">
      <input type="radio" name="experience_status" value="true" onChange={() => setIsEnabled(true)} className="hidden peer" />
      <span className="px-4 py-2 bg-gray-200 rounded-sm peer-checked:bg-black peer-checked:text-white">
        Yes
      </span>
    </label>

    <label className="flex items-center cursor-pointer">
      <input type="radio" name="experience_status" value="false" onChange={() => setIsEnabled(false)} className="hidden peer" />
      <span className="px-4 py-2 bg-gray-200 rounded-sm peer-checked:bg-green-700 peer-checked:text-white">
        No
      </span>
    </label>
  </div>
</div>

<div className="w-full">
  <label htmlFor="experience_years" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Years of Experience</label>
  <input type="number" placeholder="Enter Years of Experience" name="experience_years" disabled={!isEnabled} className={`block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500 ${!isEnabled ? "bg-gray-200 cursor-not-allowed" : ""}`} />
</div>

<div className="w-full">
  <label htmlFor="company" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Company Name</label>
  <input type="text" placeholder="Enter Company Name" name="company" disabled={!isEnabled} className={`block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500 ${!isEnabled ? "bg-gray-200 cursor-not-allowed" : ""}`} />
</div>

{/* Address Details */}
<div className="w-full">
  <label htmlFor="address" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Address</label>
  <input type="text" placeholder="Enter Address" name="address" value={formdata.address} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="city" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">City</label>
  <input type="text" placeholder="Enter City Name" name="city" value={formdata.city} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="state" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">State</label>
  <input type="text" placeholder="Enter State Name" name="state" value={formdata.state} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>

<div className="w-full">
  <label htmlFor="pincode" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Pincode</label>
  <input type="number" name="pincode" value={formdata.pincode} onChange={handleChange} placeholder="Enter Pincode" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:border-blue-500" />
</div>
</div>
         <div className="fixed bottom-0 right-0 w-full bg-white border-t border-gray-300 p-4 shadow-lg flex gap-4 justify-end items-center">
        <button className="px-8 py-2 bg-black hover:bg-gray-800 text-white rounded-sm">Save</button>
        <button className="px-8 py-2 bg-green-700 hover:bg-black text-white rounded-sm" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
   )
}