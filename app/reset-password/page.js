"use client";
import { SaveAll } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [matchPasswordError, setMatchPasswordError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const oldPass = formData.get("oldpass");
    const newPass = formData.get("newpass");
    const renewPass = formData.get("renewpass");

    if (newPass !== renewPass) {
      setMatchPasswordError(true);
      return;
    }

    setMatchPasswordError(false);
    alert("password chaged")

    // Proceed with API call or further processing
  }

  return (
    <div className="flex justify-center items-center w-full rounded-sm py-12">
      <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
        <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">
          Reset Password
        </h4>
        <form onSubmit={handleSubmit} className="py-5 px-5">
          <label className="font-bold">Old Password</label>
          <input
            type="password"
            name="oldpass"
            placeholder="Enter Old Password"
            className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          <label className="font-bold">New Password</label>
          <input
            type="password"
            name="newpass"
            placeholder="Enter New Password..."
            className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
          <label className="font-bold">Confirm New Password</label>
          <input
            type="password"
            name="renewpass"
            placeholder="Re-Enter New Password..."
            className={`bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
              matchPasswordError ? "border-red-500" : ""
            }`}
            required
          />
          {matchPasswordError && (
            <p className="text-red-600 text-sm mb-3">Passwords do not match!</p>
          )}
          <button className="w-full bg-red-700 py-2 text-white rounded-sm flex justify-center gap-1">
            <SaveAll className="h-5 w-5" /> Update
          </button>
        </form>
      </div>
    </div>
  );
}
