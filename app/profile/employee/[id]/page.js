"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { PencilIcon, SaveAllIcon } from "lucide-react";
export default function EmployeeProfile() {
  const [data, setData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const {id} = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const res = await authFetch(`employee-viewset/${id}`); // Adjust the endpoint
      const result = await res.json();
      setData(result.data);
      setFormData(result.data);
    };

    fetchData();
  }, [id]);

  const handleEdit = () => setEditing(!editing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/employee", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const updatedData = await res.json();
      setData(updatedData.data);
      setEditing(false);
    }
  };

  if (!data) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-xl font-sans">
        <h2 className="text-xl font-bold">My Profile</h2>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border border-gray-200 rounded-md mt-3 p-4">

        <div>
        
          <h1 className="font-semibold text-xl font-sans">{data.salutation.name} {data.first_name} {data.last_name}</h1>
          <p className="text-gray-600 font-semibold">{data.designation?.name} - {data.employee_role.name}</p>
          <p className="text-gray-500 text-sm">{data.institute_department?.name}</p>
        </div>
        <button
          onClick={editing ? handleSubmit : handleEdit}
          className={`border border-gray-300 text-gray-700 flex gap-1 items-center rounded-full px-9 py-1 ${editing?'bg-red-600':''}`}
        >
         {editing?<SaveAllIcon className="h-4 w-4"/>:<PencilIcon className="h-4 w-4"/>} {editing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Personal Information */}
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.user.email}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="border-t pt-4 mt-4">
        <h2 className="text-xl font-semibold mb-2">Address</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label>Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              disabled={!editing}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}