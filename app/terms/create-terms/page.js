"use client"

import { authFetch } from "@/app/lib/fetchWithAuth";

export default function Page(){
    const token = localStorage.getItem("accessToken");
    async function  handlesubmit(e) {
        e.preventDefault();
    const formData = new FormData(e.target);
    const newTerm = {
        name: formData.get("name"),
        duration_in_months: formData.get("duration_in_months"),
        is_active: true,
      };

      try {
        const response = await authFetch("terms-viewset", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTerm),
        });
    
        const data = await response.json();
        console.log("Success:", data);
    
        if (response.ok) {
            alert(data.message)
        } else {
          console.error("Course creation failed:", data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    return(
        <div className="flex justify-center items-center w-full rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Create a Term</h4>
                <form onSubmit={handlesubmit} className="py-5 px-5">
                <label className="font-bold">Term Name</label>
  <input type="text" name="name" placeholder="Enter Term Name.."className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  <label className="font-bold">Durationa(In Months)</label>
  <input type="number" name="duration_in_months" placeholder="4"className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
   <button className="w-full bg-red-700 py-2 text-white rounded-sm ">Submit</button>             
                </form>
            </div>
</div>
    )
}