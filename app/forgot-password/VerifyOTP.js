"use client";
import { useRef, useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import { PenSquareIcon, ShieldAlertIcon, VerifiedIcon } from "lucide-react";

export default function OtpInput({ length = 4, setStep, email }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // "success", "error", "loading"
  const inputsRef = useRef([]);

  const getOtpString = () => otp.join("");

  const verifyOtp = async () => {
    const enteredOtp = getOtpString();

    if (enteredOtp.length < length) {
      setMessage("Please fill all OTP digits");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await authFetch("verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username:email, otp: enteredOtp }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message || "OTP verified!");
        setStep(3)
      } else {
        setStatus("error");
        setMessage(data.message || "Invalid OTP");
        resetOtp();
      }
    } catch (err) {
      setStatus("error");
      setMessage("Something went wrong.");
      resetOtp();
    }
  };

  const resetOtp = () => {
    setOtp(Array(length).fill(""));
    inputsRef.current[0]?.focus();
  };

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    if (!val) return;

    const newOtp = [...otp];
    newOtp[index] = val[0];
    setOtp(newOtp);

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft") {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight") {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, length);
    const numbers = paste.replace(/[^0-9]/g, "").split("");

    const newOtp = Array(length).fill("");
    numbers.forEach((num, i) => {
      newOtp[i] = num;
    });
    setOtp(newOtp);

    inputsRef.current[Math.min(numbers.length, length) - 1]?.focus();
  };

  return (
     <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="max-w-sm w-full bg-white flex flex-col items-center rounded-3xl shadow-md p-6">
        <ShieldAlertIcon className="h-7 w-7"/>
        <h2 className="text-lg font-semibold mb-2">Enter Verification Code</h2>
        <p className="text-sm text-gray-500 mb-4">
          We have sent a code to <strong>{email}</strong>
        </p>
    <div className=" mx-auto flex flex-col items-center gap-4 p-4 rounded-md">
      <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-12 text-center border rounded text-xl focus:outline-none focus:ring-2 transition-all duration-200
              border-gray-300 focus:ring-blue-500
              disabled:opacity-50"
            disabled={status === "loading"}
          />
        ))}
      </div>

      <button
        onClick={verifyOtp}
        disabled={status === "loading"}
        className="mt-2 px-16 py-2 bg-red-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {status === "loading" ? "Verifying..." : "Verify OTP"}
      </button>

      {message && (
        <p
          className={`mt-2 text-sm font-medium ${
            status === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
    </div>
    </div>
  );
}
