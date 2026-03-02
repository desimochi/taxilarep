"use client";
import { useContext, useState } from "react";
import BackButton from "@/components/ui/Backbutton";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { CalendarCheck } from "lucide-react";
import { getCookieValue } from "@/lib/getcookie";
import { GlobalContext } from "@/components/GlobalContext";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";

export default function ParentMeeting() {
    const {state} =  useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [show, setShow] = useState(false)

  const [formData, setFormData] = useState({
    relation: "",
    person_name: "",
    contact_number: "",
    meeting_date: "",
    meeting_time: "",
    short_description: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    const { relation, person_name, contact_number, meeting_date, meeting_time, short_description } = formData;
    if (!relation || !person_name || !contact_number || !meeting_date || !meeting_time || !short_description) {
      return "All fields are required.";
    }
    if (!/^[6-9]\d{9}$/.test(contact_number)) {
      return "Invalid Mobile no.";
    }
    return null;
  };

  const handleSubmit = async () => {
    setLoading(true)
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await authFetch("parent-meeting-viewset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({...formData, student:state.user_id}),
      });

      if (!res.ok) throw new Error("Submission failed");
      setSuccess("Meeting scheduled successfully!");
      setShow(true)
      setLoading(false)
      setFormData({
        relation: "",
        person_name: "",
        contact_number: "",
        meeting_date: "",
        meeting_time: "",
        short_description: "",
      });
      setTimeout(() => {
        setShow(false)
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="px-12 py-8">
      <BackButton />
      {show && <Toast message={success} />}
      <div className="px-12 mt-4 max-w-xl mx-auto">
        <div className="border p-4 rounded-xl shadow">
          <div className="flex flex-col items-center w-full">
            <UserGroupIcon className="h-7 w-7" />
            <h2 className="text-center text-xl font-bold mt-2 text-red-800">Parents Meeting Booking</h2>
            <p className="text-sm text-gray-600 text-center">Book Your Parents Meeting with Taxila Business School</p>
          </div>
          <hr className="w-[120px] mx-auto mt-4 border border-b-1 border-red-800 mb-3" />

          {error && <p className="text-red-600 text-sm px-4">{error}</p>}

          <div className="flex flex-col px-4">
            <label className="text-sm px-1 mb-1 text-gray-700" htmlFor="relation">Relation</label>
            <select name="relation" value={formData.relation} onChange={handleChange} className="border text-sm text-gray-800 border-gray-200 shadow p-2 rounded-md">
              <option value="">Select Relation</option>
              <option value="parent">Parent</option>
              <option value="guardian">Guardian</option>
            </select>
          </div>

          <div className="flex flex-col mt-3 px-4">
            <label className="text-sm px-1 mb-1 text-gray-700" htmlFor="person_name">Person Name</label>
            <input
              type="text"
              name="person_name"
              value={formData.person_name}
              onChange={handleChange}
              placeholder="Enter Person Name"
              className="border text-sm text-gray-800 border-gray-200 shadow p-2 rounded-md"
            />
          </div>

          <div className="flex px-4 gap-2 w-full items-center">
            <div className="flex flex-col mt-3">
              <label className="text-sm px-1 mb-1 text-gray-700" htmlFor="contact_number">Mobile No.</label>
              <input
                type="number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                placeholder="Enter Mobile no."
                className="border text-sm text-gray-800 border-gray-200 shadow p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col mt-3">
              <label className="text-sm px-1 mb-1 text-gray-700" htmlFor="meeting_date">Meeting Date</label>
              <input
                type="date"
                name="meeting_date"
                value={formData.meeting_date}
                onChange={handleChange}
                className="border text-sm text-gray-800 border-gray-200 shadow p-2 rounded-md"
              />
            </div>

            <div className="flex flex-col mt-3">
              <label className="text-sm px-1 mb-1 text-gray-700" htmlFor="meeting_time">Time</label>
              <input
                type="time"
                name="meeting_time"
                value={formData.meeting_time}
                onChange={handleChange}
                className="border text-sm text-gray-800 border-gray-200 shadow p-2 rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-col mt-3 px-4">
            <label className="text-sm px-1 mb-1 text-gray-700" htmlFor="short_description">Reason of Meeting/Description</label>
            <textarea
              rows={3}
              name="short_description"
              value={formData.short_description}
              onChange={handleChange}
              placeholder="Enter short description of what meeting is about..."
              className="border text-sm text-gray-800 border-gray-200 shadow p-2 rounded-md"
            />
          </div>

          <div className="p-4">
            <button
            disabled={loading}
              onClick={handleSubmit}
              className="bg-red-800 w-full py-2 rounded-md flex items-center justify-center gap-1 text-white"
            >
              <CalendarCheck className="h-5 w-5" /> {loading? "Scheduling...." : "Schedule Meeting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
