"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import { ShieldCheckIcon } from "lucide-react";

export default function ChangePassword({ email }) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(""); // "success", "error", "loading"
  const [message, setMessage] = useState("");
const router = useRouter()
  const handleSubmit = async () => {
    setMessage("");

    if (!newPassword || !confirmPassword) {
      setStatus("error");
      setMessage("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("Passwords do not match.");
      return;
    }

    setStatus("loading");

    try {
      const res = await authFetch("forget-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username:email, new_password: newPassword, confirm_password:confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "Password reset successfully! Redirecting You to Login");
        setTimeout(()=>{
                router.push("/login")
        }, 2000)
        
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto mt-10 p-6 bg-white shadow rounded flex flex-col items-center">
        <ShieldCheckIcon className="h-7 w-7 text-center text-red-700 mb-3" />
      <h2 className="text-xl font-semibold mb-4 text-center">Set New Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full mb-4 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        disabled={status === "loading"}
        className="w-full bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700 disabled:bg-gray-400"
      >
        {status === "loading" ? "Saving..." : "Save Password"}
      </button>

      {message && (
        <p
          className={`mt-3 text-center font-medium ${
            status === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
