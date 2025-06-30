"use client";
import Image from "next/image";
import Cookies from "js-cookie";
import logo from "@/public/logo.png";
import campus from "@/public/campus.jpeg";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { saveTokens, savePermission } from "@/app/lib/auth";
import { GlobalContext } from "@/components/GlobalContext";
import Link from "next/link";

export default function LoginPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { state, updateState } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/");  // Redirect if already logged in
    }
  }, [router]);
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
  
    try {
      const response = await fetch(`${API_BASE_URL}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
      if(response.status===400){
        setError(data.message)
      }
      if (response.ok) {
        // Save tokens
        saveTokens(data.data.access_token, data.data.refresh_token);
        savePermission(data.data.permission_list)
        Cookies.set("user", JSON.stringify(data.data.user), { expires: 365, path: "/", secure: true,
          sameSite: "Lax" });
  
        // ✅ Wait for state to update before reloading
        await new Promise((resolve) => {
          updateState(data.data.user);
          resolve();
        });
        if(data.data.user.role_name?.includes("admin"))
        {
          router.replace("/admin/dashboard")
        } else{
router.replace("/");
        }
         // Redirect to home page
      } else {
        
        setLoading(false)
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    } finally {
    }
  }
  
  

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="md:w-1/2 sm:w-full flex flex-col justify-center items-center md:bg-gray-100 sm:bg-white p-10">
        <div className="max-w-md w-full space-y-8">
          <div className="border-2 p-6 md:p-12 rounded-lg bg-white mt-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image src={logo} height={60} width={120} alt="taxila logo" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sign in to your account
              </h2>
            </div>
            {error && <p className="text-sm text-center text-red-600">{error}</p>}
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="username"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-red-600 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div> */}

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  {loading? "Signing In...." : "Sign in"}
                </button>
                <p className="text-sm text-gray-600 mt-3">Forgot Password <Link href={"/forgot-password"} className="font-bold text-red-600 underline">Click here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden md:block w-1/2">
        <Image
          src={campus}
          alt="Right Section"
          className="w-full h-screen object-cover"
          width={800}
          height={400}
        />
      </div>
    </div>
  );
}
