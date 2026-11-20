"use client";

import { useContext } from "react";
import Link from "next/link";
import { ClipboardCheck, FileSpreadsheet, GraduationCap } from "lucide-react";
import { GlobalContext } from "@/components/GlobalContext";
import RoleCards from "@/components/RoleCards";
import Watch from "@/components/Watch";
import StudentDashboard from "./StudentDashboard";

export default function Home() {
  const { state } = useContext(GlobalContext);
  const roles = Array.isArray(state?.role_id) ? state.role_id.map(String) : [String(state?.role_id || "")];

  if (!state) {
    return <div className="p-8 text-sm text-gray-500">Loading dashboard…</div>;
  }

  if (roles.includes("3")) {
    return <StudentDashboard key={state.user_id} />;
  }

  return (
    <div className="min-h-screen bg-white px-12 py-8">
      <div className="mb-6 flex flex-col items-center justify-between sm:flex-row">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            Welcome, {state?.name || "User"}
          </h1>
          <p className="mt-1 text-center text-sm text-gray-600 sm:text-left">
            All your insights, all in one dashboard
          </p>
        </div>
        <Watch />
      </div>

      <h2 className="text-center font-semibold text-gray-900 sm:text-left">Quick Access Panel</h2>
      <hr className="mx-auto mb-6 w-20 border-gray-200 sm:mx-0" />

      <div className="mb-8 mt-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
        <Link
          href="/admin/reports/attendance"
          className="group relative flex -translate-y-0 flex-col items-center rounded-2xl border-2 border-transparent bg-red-600 p-6 text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-red-200"
        >
          <div className="mb-4 rounded-full bg-white/20 p-3 transition-transform group-hover:scale-110">
            <ClipboardCheck size={32} />
          </div>
          <h3 className="text-lg font-bold">Attendance Reports</h3>
          <p className="mt-1 text-xs text-red-100 opacity-80">Track student presence</p>
        </Link>

        <Link
          href="/admin/reports/marks"
          className="group flex -translate-y-0 flex-col items-center rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-md"
        >
          <div className="mb-4 rounded-full bg-red-50 p-3 text-red-600 transition-all group-hover:bg-red-600 group-hover:text-white">
            <FileSpreadsheet size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Marks Reports</h3>
          <p className="mt-1 text-xs text-gray-500">Detailed subject performance</p>
        </Link>

        <Link
          href="/admin/reports/results"
          className="group flex -translate-y-0 flex-col items-center rounded-2xl border-2 border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-md"
        >
          <div className="mb-4 rounded-full bg-red-50 p-3 text-red-600 transition-all group-hover:bg-red-600 group-hover:text-white">
            <GraduationCap size={32} />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Final Results</h3>
          <p className="mt-1 text-xs text-gray-500">GPA and Pass/Fail status</p>
        </Link>
      </div>

      <RoleCards role={state?.role_id} type={state?.employee_type} batch={state?.batch} />
    </div>
  );
}
