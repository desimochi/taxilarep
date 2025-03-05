"use client";
import Image from "next/image";
import logo from "@/public/logo.png";
import campus from "@/public/campus.jpeg";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { saveTokens } from "@/app/lib/auth";
import { GlobalContext } from "@/components/GlobalContext";

export default function LoginPage() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { state, updateState } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.replace("/admin");  // Redirect if already logged in
    }
  }, [router]);
  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");
  
    try {
      const response = await fetch(`${API_BASE_URL}login`, {
        method: "POST",
        mode:"cors",
        headers: { "Content-Type": "application/json",
         },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (data.code === 400) {
          setError(true);
          return;
        }
        saveTokens(data.data.access_token, data.data.refresh_token);
        updateState(data.data.user);
        console.log(updateState, state)
        router.push("/dashboard");
      } else {
        console.error("Login failed:", data);
      }
    } catch (error) {
      console.error("Error:", error);
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
            {error && <p className="text-sm text-center text-red-600">Invalid Credentials</p>}
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

              <div className="flex items-center justify-between">
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
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in
                </button>
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
