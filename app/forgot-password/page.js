"use client"
import Link from "next/link";
import { useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import VerifyOTP from "./VerifyOTP";
import ChangePassword from "./ChangePassword";

export default function Page(){
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1)
    const [error, setError] = useState('')
    const [message, setMessage] = useState("")
     async function handleSubmit() {
        setLoading(true)
        try {
            const res = await authFetch('send-otp',  {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username:email})})
        const response  = await res.json()
        if(!res.ok){
            setError(response.message)
            return
        }
        setMessage("OTP Sent Succuessfully")
        setStep(2)
        } catch (error) {
            console.error(error)
        } finally{
            setLoading(false)
        }
     }

    return(
        <div className="min-h-screen flex items-center">
           {step ===1 &&  <div className="w-[480px] mx-auto border border-gray-200 rounded-md p-4">
                <h1 className="w-full bg-red-100 text-red-800 px-30 py-2 text-center mb-5">Forgot password</h1>
                {error && <p className="text-sm text-red-700">{error}</p>}
                <label htmlFor="email" className="text-sm font-bold ">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="border border-gray-200 w-full rounded-md  p-2 shadow" placeholder="Enter Email Address"/>
                <p className="text-gray-600 mt-4 text-sm">Move to <Link href={"/login"} className="text-red-600">Login</Link></p>
                <button onClick={handleSubmit} disabled={loading} className="bg-red-800 text-center w-full py-2 mt-5 text-white rounded-sm">{loading? "Sending" : "Send Otp"}</button>
            </div> }
            {step ===2 && <VerifyOTP setStep={setStep} email={email} />}
            {step ===3 && <ChangePassword email={email} />}
        </div>
    )
}