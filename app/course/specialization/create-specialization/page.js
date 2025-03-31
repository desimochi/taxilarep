"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useState } from "react";
import Toast from "@/components/Toast";
import { set } from "date-fns";
export default function Page(){
  const[message, setMessage] = useState("")
  const[showToast, setShowToast] = useState(false)
  const [errors, setErrors] = useState({});
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const token = localStorage.getItem("accessToken");
    async function  handlesubmit(e) {
        e.preventDefault();
    const formData = new FormData(e.target);
    const newTerm = {
        name: formData.get("name"),
        description: formData.get("description"),
      };

      try {
        const response = await authFetch(`specialization-viewset`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTerm),
        });
    
        const data = await response.json();
    
        if (response.ok) {
            setMessage("Specialization created successfully")
            setShowToast(true)
            setTimeout(()=>{
        
              setShowToast(false)
              setMessage("")
              window.location.href = "/course/specialization"
            },2000)
        } else {
          // Handle validation errors
          if (data.message) {
            const errorMessages = {};
            data.message.forEach((error) => {
              const [field, msg] = error.split(": ");
              errorMessages[field] = msg;
            });
            setErrors(errorMessages);
          } else {
            setMessage("Something went wrong.");
            setShowToast(true);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setMessage("An error occurred. Please try again.");
        setShowToast(true);
      }
    }
    return(
        <div className="flex justify-center items-center w-full rounded-sm py-12">
          {showToast && <Toast message={message}/>}
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Create a Specialization</h4>
                <form onSubmit={handlesubmit} className="py-5 px-5">
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                <label className="font-bold">Specialization Name</label>
  <input type="text" name="name" placeholder="Enter Term Name.."className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
  <label className="font-bold">Description</label>
  <input type="text" name="description" placeholder="Enter Description...."className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
   <button className="w-full bg-red-700 py-2 text-white rounded-sm ">Submit</button>             
                </form>
            </div>
</div>
    )
}