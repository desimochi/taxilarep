"use client";
import { GlobalContext } from "@/components/GlobalContext";
import RoleCards from "@/components/RoleCards";
import { useContext } from "react";
import { TrendingUp, TrendingDown, Handshake } from "lucide-react";
import Watch from "@/components/Watch";
import Link from "next/link";
import { ClipboardCheck, FileSpreadsheet, GraduationCap } from "lucide-react";
export default function Home() {
  const { state } = useContext(GlobalContext);

  return (
    <div className="min-h-screen bg-white px-12 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
<h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome, {state?.name || "User"}</h1>
<p className="text-sm text-gray-600 text-center sm:text-left mt-1">All your insights, all in one dashboard</p>
        </div>
        
        <Watch />
      </div>

      {/* 🔹 Stats Cards */}
  

      {/* 🔹 Role-based Dashboard Cards */}
      <h2 className=" font-semibold text-center sm:text-left text-gray-900">
        Quick Access Panel
      </h2>
      <hr className="border border-b-0.5 border-gray-200 w-20 mb-6 mx-auto sm:mx-0" />
   



    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mt-6 mb-8">
      {/* Attendance Card - Highlighted with Primary Color */}
      <Link
        href="/admin/reports/attendance"
        className="group relative flex flex-col items-center p-6 rounded-2xl border-2 border-transparent bg-red-600 text-white shadow-xl hover:shadow-red-200 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="p-3 rounded-full bg-white/20 mb-4 group-hover:scale-110 transition-transform">
          <ClipboardCheck size={32} />
        </div>
        <h3 className="text-lg font-bold">Attendance Reports</h3>
        <p className="text-xs text-red-100 mt-1 opacity-80">Track student presence</p>
      </Link>

      {/* Marks Card */}
      <Link
        href="/admin/reports/marks"
        className="group flex flex-col items-center p-6 rounded-2xl border-2 border-gray-100 bg-white shadow-sm hover:border-red-500 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      >
        <div className="p-3 rounded-full bg-red-50 text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all">
          <FileSpreadsheet size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Marks Reports</h3>
        <p className="text-xs text-gray-500 mt-1">Detailed subject performance</p>
      </Link>

      {/* Results Card */}
      <Link
        href="/admin/reports/results"
        className="group flex flex-col items-center p-6 rounded-2xl border-2 border-gray-100 bg-white shadow-sm hover:border-red-500 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
      >
        <div className="p-3 rounded-full bg-red-50 text-red-600 mb-4 group-hover:bg-red-600 group-hover:text-white transition-all">
          <GraduationCap size={32} />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Final Results</h3>
        <p className="text-xs text-gray-500 mt-1">GPA and Pass/Fail status</p>
      </Link>
    </div>
      <RoleCards role={state?.role_id} type={state?.employee_type} batch = {state?.batch} />

     
    </div>
  );
}
