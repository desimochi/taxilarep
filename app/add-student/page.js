"use client"
import { useEffect, useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import Toast from "@/components/Toast";
export default function Page(){
   const [image, setImage] = useState(null);
   const [isEnabled, setIsEnabled] = useState(false);
   const[message, setmessage] = useState("")
   const [showToast, setShowToast] = useState(false);
   const [formdata, setFormdata] = useState({
      email:"",
      user_type:"STUDENT",
      first_name:"",
      last_name :"",
      middle_name:"",
      date_of_birth:"",
      student_role:3,
      contact_number:"",
      gender:"Male"
   })
   const [batch, setBatch]= useState([])
   const [selectedBatch, setSelectedBatch] = useState("");
   const [selectedCourse, setSelectedCourse] = useState("");
   const [course, setCourse]= useState([])
   const[loading, setLoading] = useState(false)
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
   setFormdata(prevState => ({
       ...prevState,
       [name]: value
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
      setSelectedCourse(selectedId);// Pass selected batch ID to parent component (if needed)
    }
    async function handleSubmit() {
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
            setmessage(data.message);
            setShowToast(true);
          }, 100); // Small delay ensures re-triggering
        } else {
          setShowToast(false); // Reset state first
          setTimeout(() => {
            setmessage("Student Added successfully");
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
         <div className="border border-gray-300 px-8 py-8 rounded-xl shadow-xl shadow-gray-100 flex-1 ">
            <h3 className="text-xl font-semibold">Student Registration - Personal Details</h3>
            <hr className="border-2 mb-4 mt-4 border-green-900 w-full" />
            <div className="flex gap-6 justify-between">
               <div className="w-full">
               <label htmlFor="firstname" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">First Name <span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter First Name"  value={formdata.first_name} name="first_name" onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="middlename" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Middle Name </label>
               <input type="text" placeholder="Enter Middle Name" value={formdata.middle_name} name="middle_name" onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="lastname" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Last Name </label>
               <input type="text" placeholder="Enter Last Name" value={formdata.last_name} name="last_name" onChange={handleChange}  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
               <div className="w-full">
               <label htmlFor="aadharcard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Batch<span className="text-red-600">*</span> </label>
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
               <label htmlFor="course" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Course<span className="text-red-600">*</span> </label>
               <select value={selectedCourse} onChange={handleCourseChange} className="p-2 border rounded">
      <option value="">Select Course</option>
      {course.map((batch) => (
        <option key={batch.id} value={batch.id}>
          {batch.name}
        </option>
      ))}
    </select>
               </div>
               <div className="w-full">
               <label htmlFor="aadharcard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Aadhar Card<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Aadhar Card Number" name="aadharcard" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="pancard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">PAN Card </label>
               <input type="text" placeholder="Enter PAN Card Number" name="pancard"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div className="w-full">
               <label htmlFor="mobile" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mobile No. <span className="text-red-600">*</span> </label>
               <input type="tel" placeholder="Enter Mobile No." name="contact_number" value={formdata.contact_number} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="bloodgroup" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Blood Group</label>
               <select id="bloodgroup" name="bloodgroup" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:black- dark:focus:border-red-500">
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
            </div>
            <div className="flex gap-6 justify-between mt-3">
               <div  className="w-full">
               <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Email Address </label>
               <input type="email" placeholder="Enter Email Address" value={formdata.email} name="email" onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="gender" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Gender</label>
               <select id="gender" name="gender" onChange={handleChange} value={formdata.gender} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:black- dark:focus:border-red-500">
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>
</div>
               <div  className="w-full">
               <label htmlFor="dob" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Date of Birth </label>
               <input type="date" name="date_of_birth" value={formdata.date_of_birth} onChange={handleChange} className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div className="w-full">
               <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Upload Photo </label>
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="mb-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
               </div>
            </div>
         </div>
         <div className="border border-gray-300 px-8 py-8 rounded-xl shadow-xl shadow-gray-100 flex-1 mt-4 ">
            <h3 className="text-xl font-semibold">Education Details</h3>
            <hr className="border-2 mb-4 mt-4 border-green-900 w-full" />
            <div className="flex gap-6 justify-between">
               <div className="w-full">
               <label htmlFor="10th" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">10<sup>th</sup> School Name <span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter School Name" name="10thschool"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="10thboard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">10<sup>th</sup> Board Name </label>
               <input type="text" placeholder="Enter Board Name" name="10thboard"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="10thpercentage" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">10<sup>th</sup> Percentage/CGPA</label>
               <input type="text" placeholder="Enter 10th Percentage/CGPA" name="10thpercentage"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="10thyear" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">10<sup>th</sup> Passing Year</label>
               <input type="date"  name="10thyear"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
               <div className="w-full">
               <label htmlFor="12th" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12<sup>th</sup> Institute Name<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Institute Name" name="12th" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="12thboard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12<sup>th</sup> Board Name </label>
               <input type="text" placeholder="Enter Board Name" name="12thboard"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="12thpercentage" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12<sup>th</sup> Percentage/CGPA</label>
               <input type="text" placeholder="Enter 12th Percentage/CGPA" name="12thpercentage"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="12thpercentage" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12<sup>th</sup> Stream</label>
               <select id="stream" name="stream" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:black- dark:focus:border-red-500">
  <option value="science">Science</option>
  <option value="commerece">Commerece</option>
  <option value="arts">Arts</option>
  <option value="Humanities">Humanities</option>
</select>
</div>
<div  className="w-full">
               <label htmlFor="12thyear" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12<sup>th</sup> Passing Year</label>
               <input type="date"  name="12thyear"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
            <div className="w-full">
               <label htmlFor="gradution" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Graduation Degree<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="EnterDegree" name="12th" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="gradutionInstitute" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Institute/University Name </label>
               <input type="text" placeholder="Enter Institute/University Name" name="gradutionInstitute"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="gradutionpercentage" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Graduation Percentage/CGPA</label>
               <input type="text" placeholder="Enter Graduation Percentage/CGPA" name="gradutionpercentage"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
<div  className="w-full">
               <label htmlFor="gradutionyear" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Graduation Passing Year</label>
               <input type="date"  name="gradutionyear"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
            </div>
         </div>
         <div className="border border-gray-300 px-8 py-8 rounded-xl shadow-xl shadow-gray-100 flex-1 mt-4 ">
            <h3 className="text-xl font-semibold">Contact &amp; Other Details</h3>
            <hr className="border-2 mb-4 mt-4 border-green-900 w-full" />
            <div className="flex gap-6 justify-between">
               <div className="w-full">
               <label htmlFor="Category" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Category<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Student Category" name="category"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="experience" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Do Student Have Work Exp.? </label>
               <div class="flex space-x-4">
    <label class="flex items-center cursor-pointer">
        <input type="radio" name="exp" value="yes" class="hidden peer" onChange={() => setIsEnabled(true)}/>
        <span class="px-20 py-2 bg-gray-200 rounded-sm peer-checked:bg-black peer-checked:text-white">
            Yes
        </span>
    </label>

    <label class="flex items-center  cursor-pointer">
        <input type="radio" name="exp" value="no" class="hidden peer" onChange={() => setIsEnabled(false)}/>
        <span class="px-20 py-2 bg-gray-200 rounded-sm peer-checked:bg-green-700 peer-checked:text-white">
            No
        </span>
    </label>
</div>

               </div>
               <div  className="w-full">
               <label htmlFor="expyear" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Year of Experience</label>
               <input type="number" placeholder="Enter Year of experience" name="10thpercentage" disabled={!isEnabled} className={`block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
            !isEnabled ? "bg-gray-200 cursor-not-allowed" : ""
          } dark:focus:ring-red-500 dark:focus:border-red-500`}  />
               </div>
               <div  className="w-full">
               <label htmlFor="company" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Company Name</label>
               <input type="text"  name="company" placeholder="Enter Company Name" disabled={!isEnabled} className={`block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
            !isEnabled ? "bg-gray-200 cursor-not-allowed" : ""
          } dark:focus:ring-red-500 dark:focus:border-red-500`}  />
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
               <div className="w-full">
               <label htmlFor="address" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Address<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Address" name="address" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="city" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">City</label>
               <input type="text" placeholder="Enter City Name" name="city"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="state" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">State</label>
               <input type="text" placeholder="Enter State Name" name="12thpercentage"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
<div  className="w-full">
               <label htmlFor="pincode" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Pincode</label>
               <input type="number"  name="pincode" placeholder="Enter Pincode" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
            <div className="w-full">
               <label htmlFor="fathername" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father&apos;s Name<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Father's Name" name="fathername" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="fathernumber" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father&apos;s Mobile No.</label>
               <input type="tel" placeholder="Enter Father's Mobile Number" name="fathernumber"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="fathersmail" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father&apos;s Email</label>
               <input type="email" placeholder="Enter Father's Email" name="fathersmail"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
<div  className="w-full">
               <label htmlFor="fatheradharno" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father&apos;s Aadhar No.</label>
               <input type="number"  name="fatheradharno" placeholder="Father's Aadhar No."  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3 mb-6">
            <div className="w-full">
               <label htmlFor="mothername" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother&apos;s Name<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter mother's Name" name="Mothername" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
               <div  className="w-full">
               <label htmlFor="mothernumber" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother&apos;s Mobile No.</label>
               <input type="tel" placeholder="Enter mother's Mobile Number" name="Mothernumber"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="mothersmail" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother&apos;s Email</label>
               <input type="email" placeholder="Enter mother's Email" name="Mothersmail"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
<div  className="w-full">
               <label htmlFor="motheradharno" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother&apos;s Aadhar No.</label>
               <input type="number"  name="motheradharno" placeholder="Mother's Aadhar No."  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"  />
               </div>
            </div>
         </div>
         <div className="fixed bottom-0 right-0 w-full bg-white border-t border-gray-300 p-4 shadow-lg flex gap-4 justify-end items-center">
        <button className="px-8 py-2 bg-black hover:bg-gray-800 text-white rounded-sm">Save</button>
        <button className="px-8 py-2 bg-green-700 hover:bg-black text-white rounded-sm" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
   )
}