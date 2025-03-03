"use client"
import { useState } from "react";
export default function Page(){
   const [image, setImage] = useState(null);
   const [isEnabled, setIsEnabled] = useState(false);
   const [error, setError] = useState("");
 
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
   return(
    <div className="p-8 flex flex-col min-h-screen">
         <div className="border border-gray-300 px-8 py-8 rounded-xl shadow-xl shadow-gray-100 flex-1 ">
            <h3 className="text-xl font-semibold">Student Registration - Personal Details</h3>
            <hr className="border-2 mb-4 mt-4 border-green-900 w-full" />
            <div className="flex gap-6 justify-between">
               <div className="w-full">
               <label htmlFor="firstname" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">First Name <span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter First Name" name="fistname"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
               <div  className="w-full">
               <label htmlFor="middlename" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Middle Name </label>
               <input type="text" placeholder="Enter Middle Name" name="middlename"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="lastname" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Last Name </label>
               <input type="text" placeholder="Enter Last Name" name="lastname"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
               <div className="w-full">
               <label htmlFor="aadharcard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Aadhar Card<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Aadhar Card Number" name="aadharcard" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
               <div  className="w-full">
               <label htmlFor="pancard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">PAN Card </label>
               <input type="text" placeholder="Enter PAN Card Number" name="pancard"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div className="w-full">
               <label htmlFor="mobile" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mobile No. <span className="text-red-600">*</span> </label>
               <input type="tel" placeholder="Enter Mobile No." name="mobile" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
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
               <input type="email" placeholder="Enter Email Address" name="email" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="dob" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Date of Birth </label>
               <input type="date" name="dob" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
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
               <input type="text" placeholder="Enter School Name" name="10thschool"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
               <div  className="w-full">
               <label htmlFor="10thboard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">10<sup>th</sup> Board Name </label>
               <input type="text" placeholder="Enter Board Name" name="10thboard"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="10thpercentage" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">10<sup>th</sup> Percentage/CGPA</label>
               <input type="text" placeholder="Enter 10th Percentage/CGPA" name="10thpercentage"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
               <div  className="w-full">
               <label htmlFor="10thyear" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">10<sup>th</sup> Passing Year</label>
               <input type="date"  name="10thyear"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
               <div className="w-full">
               <label htmlFor="12th" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12<sup>th</sup> Institute Name<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Institute Name" name="12th" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
               <div  className="w-full">
               <label htmlFor="12thboard" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12<sup>th</sup> Board Name </label>
               <input type="text" placeholder="Enter Board Name" name="12thboard"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="12thpercentage" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">12<sup>th</sup> Percentage/CGPA</label>
               <input type="text" placeholder="Enter 12th Percentage/CGPA" name="12thpercentage"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
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
               <input type="date"  name="12thyear"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
            <div className="w-full">
               <label htmlFor="gradution" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Graduation Degree<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="EnterDegree" name="12th" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
               <div  className="w-full">
               <label htmlFor="gradutionInstitute" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Institute/University Name </label>
               <input type="text" placeholder="Enter Institute/University Name" name="gradutionInstitute"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="gradutionpercentage" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Graduation Percentage/CGPA</label>
               <input type="text" placeholder="Enter Graduation Percentage/CGPA" name="gradutionpercentage"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
<div  className="w-full">
               <label htmlFor="gradutionyear" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Graduation Passing Year</label>
               <input type="date"  name="gradutionyear"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
            </div>
         </div>
         <div className="border border-gray-300 px-8 py-8 rounded-xl shadow-xl shadow-gray-100 flex-1 mt-4 ">
            <h3 className="text-xl font-semibold">Contact &amp; Other Details</h3>
            <hr className="border-2 mb-4 mt-4 border-green-900 w-full" />
            <div className="flex gap-6 justify-between">
               <div className="w-full">
               <label htmlFor="Category" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Category<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Student Category" name="category"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
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
          } dark:focus:ring-red-500 dark:focus:border-red-500`} required/>
               </div>
               <div  className="w-full">
               <label htmlFor="company" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Company Name</label>
               <input type="text"  name="company" placeholder="Enter Company Name" disabled={!isEnabled} className={`block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${
            !isEnabled ? "bg-gray-200 cursor-not-allowed" : ""
          } dark:focus:ring-red-500 dark:focus:border-red-500`} required/>
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
               <div className="w-full">
               <label htmlFor="address" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Address<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Address" name="address" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
               <div  className="w-full">
               <label htmlFor="city" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">City</label>
               <input type="text" placeholder="Enter City Name" name="city"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="state" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">State</label>
               <input type="text" placeholder="Enter State Name" name="12thpercentage"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
<div  className="w-full">
               <label htmlFor="pincode" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Pincode</label>
               <input type="number"  name="pincode" placeholder="Enter Pincode" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3">
            <div className="w-full">
               <label htmlFor="fathername" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father&apos;s Name<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter Father's Name" name="fathername" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
               <div  className="w-full">
               <label htmlFor="fathernumber" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father&apos;s Mobile No.</label>
               <input type="tel" placeholder="Enter Father's Mobile Number" name="fathernumber"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="fathersmail" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father&apos;s Email</label>
               <input type="email" placeholder="Enter Father's Email" name="fathersmail"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
<div  className="w-full">
               <label htmlFor="fatheradharno" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Father&apos;s Aadhar No.</label>
               <input type="number"  name="fatheradharno" placeholder="Father's Aadhar No."  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
            </div>
            <div className="flex gap-6 justify-between mt-3 mb-6">
            <div className="w-full">
               <label htmlFor="mothername" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother&apos;s Name<span className="text-red-600">*</span> </label>
               <input type="text" placeholder="Enter mother's Name" name="Mothername" className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
               <div  className="w-full">
               <label htmlFor="mothernumber" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother&apos;s Mobile No.</label>
               <input type="tel" placeholder="Enter mother's Mobile Number" name="Mothernumber"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"/>
               </div>
               <div  className="w-full">
               <label htmlFor="mothersmail" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother&apos;s Email</label>
               <input type="email" placeholder="Enter mother's Email" name="Mothersmail"  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
<div  className="w-full">
               <label htmlFor="motheradharno" className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white mt-2">Mother&apos;s Aadhar No.</label>
               <input type="number"  name="motheradharno" placeholder="Mother's Aadhar No."  className="block p-2 ps-4 text-sm text-gray-900 border border-gray-400 rounded-sm w-full bg-white focus:red-blue-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500" required/>
               </div>
            </div>
         </div>
         <div className="fixed bottom-0 right-0 w-full bg-white border-t border-gray-300 p-4 shadow-lg flex gap-4 justify-end items-center">
        <button className="px-8 py-2 bg-black hover:bg-gray-800 text-white rounded-sm">Save</button>
        <button className="px-8 py-2 bg-green-700 hover:bg-black text-white rounded-sm">Submit</button>
      </div>
    </div>
   )
}