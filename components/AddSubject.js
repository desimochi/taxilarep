"use client";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { SaveIcon } from "lucide-react";
import { useState } from "react";
import Toast from "./Toast";

export default function AddSubject() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    code: "",
    credit: "",
    type: "",
  });
  const token = localStorage.getItem("accessToken");
  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    const formDataObj = new FormData(event.target);
    const newSubject = {
      name: formDataObj.get("name"),
      description: formDataObj.get("description"),
      code: formDataObj.get("code"),
      type: formDataObj.get("type"),
      credit: formDataObj.get("credit"),
      is_active: true,
    };
    try {
      const response = await authFetch(`subject-viewset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubject),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage("Subject created successfully");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setMessage("");
          window.location.href = "/course/subject-manager";
        }, 2000);
      } else {
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
    }
  }

  return (
    <div className="p-5">
      {showToast && <Toast message={message} />}
      <div className="w-full rounded-sm py-12">
        <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-md">
          <h4 className="px-6 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">
            Add Subject
          </h4>
          <form className="py-5 px-5" onSubmit={handleSubmit}>
            <label className="font-bold flex justify-between"><p>Subject Name</p>{errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Subject Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 block w-full"
            />

            <div className="flex gap-2 justify-between mb-4 mt-2">
              <div className="w-1/3">
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                <label className="font-bold">Subject Details</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Details of Subject"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 block w-full"
                />
              </div>

              <div className="w-1/4">
              {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
                <label className="font-bold">Subject Code</label>
                <input
                  type="text"
                  name="code"
                  placeholder="Enter Subject Code"
                  value={formData.code}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 block w-full"
                />
              </div>

              <div className="w-1/4">
              {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
                <label className="font-bold">Subject Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 block w-full">
                  <option value="">Select Subject Type</option>
                  <option value="Theory">Theory</option>
                  <option value="Practical">Practical</option>
                  </select>
              </div>

              <div className="w-1/3">
              {errors.credit && <p className="text-red-500 text-sm">{errors.credit}</p>}
                <label className="font-bold">Subject Credit</label>
                <input
                  type="number"
                  name="credit"
                  placeholder="Enter Credits"
                  value={formData.credit}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 block w-full"
                />
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button className="w-40 bg-red-700 py-2 text-white rounded-sm flex items-center justify-center gap-1">
                <SaveIcon className="h-4 w-4" /> Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
