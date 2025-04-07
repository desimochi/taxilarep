"use client";
import { SaveAll } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import Toast from "@/components/Toast";

export default function Page() {
  const [matchPasswordError, setMatchPasswordError] = useState(false);
  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showReNewPass, setShowReNewPass] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const oldPass = formData.get("oldpass");
    const newPass = formData.get("newpass");
    const renewPass = formData.get("renewpass");

    if (newPass !== renewPass) {
      setMatchPasswordError(true);
      return;
    }
    try {
      setLoading(true);
      const response = await authFetch("reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_password: oldPass,
          new_password: newPass,
          confirm_password: renewPass,
        }),
      });
      const data = await response.json();
      if (data.code === 400) {
       setCurrentPasswordError(true);
        return; // prevent execution of next lines
      }
      if (!response.ok) {
        throw new Error(data.message || "Failed to reset password");
      }
      
      setMessage("Password changed successfully");
      setShowToast(true);
      setLoading(false);
      setTimeout(() => {
        setMessage("");
      setShowToast(false);
      window.location.reload = "/"; // Redirect to login page after 2 seconds
      }, 2000);
    }
    catch (error) { 
      console.error("Error resetting password:", error);
      setMatchPasswordError(true);
    } finally{
      setMatchPasswordError(false);
      setLoading(false);
    }

    // Proceed with API call or further processing
  }

  return (
    <div className="flex justify-center items-center w-full rounded-sm py-12">
      {showToast && <Toast message={message} />}
      <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-md">
        <h4 className="px-60 py-4 bg-red-800 font-bold  text-red-50 rounded-t-md">
          Reset Password
        </h4>
        <form onSubmit={handleSubmit} className="py-5 px-5">
          {currentPasswordError && (
            <p className="text-red-600 text-sm mb-3">Current Password is Incorrect!</p>
          )}
          <label className="font-bold">Old Password</label>
<div className="relative mb-3">
  <input
    type={showOldPass ? "text" : "password"}
    name="oldpass"
    placeholder="Enter Old Password"
    className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
    required
  />
  <span
    onClick={() => setShowOldPass(!showOldPass)}
    className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
  >
    {showOldPass ? <EyeOff size={18} /> : <Eye size={18} />}
  </span>
</div>

<label className="font-bold">New Password</label>
<div className="relative mb-3">
  <input
    type={showNewPass ? "text" : "password"}
    name="newpass"
    placeholder="Enter New Password..."
    className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
    required
  />
  <span
    onClick={() => setShowNewPass(!showNewPass)}
    className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
  >
    {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
  </span>
</div>
<label className="font-bold">Confirm New Password</label>
<div className="relative mb-3">
  <input
    type={showReNewPass ? "text" : "password"}
    name="renewpass"
    placeholder="Re-Enter New Password..."
    className={`bg-white border text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 ${
      matchPasswordError ? "border-red-500" : "border-gray-300"
    }`}
    required
  />
  <span
    onClick={() => setShowReNewPass(!showReNewPass)}
    className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
  >
    {showReNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
  </span>
</div>
          {matchPasswordError && (
            <p className="text-red-600 text-sm mb-3">New Password and Confirm Password Are Not Matching!</p>
          )}
          <button className="w-full bg-red-50 py-2 text-red-800 border border-red-800 hover:bg-red-800 hover:text-white rounded-sm flex justify-center gap-1 mt-6 transition-all duration-200 ease-linear">
            <SaveAll className="h-5 w-5" /> {loading?"Updating...":"Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
