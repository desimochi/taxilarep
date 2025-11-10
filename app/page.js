"use client";
import { GlobalContext } from "@/components/GlobalContext";
import RoleCards from "@/components/RoleCards";
import { useContext } from "react";
import { TrendingUp, TrendingDown, Handshake } from "lucide-react";
import Watch from "@/components/Watch";

export default function Home() {
  const { state } = useContext(GlobalContext);

  // Example stats (you can fetch from API later)
  const stats = [
    {
      label: "Lead Attempts",
      value: 100,
      change: "-55.95%",
      trend: "down",
    },
    {
      label: "Connected Calls",
      value: 98,
      change: "-55.05%",
      trend: "down",
    },
    {
      label: "Queued Calls",
      value: 0,
      change: "0%",
      trend: "neutral",
    },
    {
      label: "Unconnected Calls",
      value: 2,
      change: "+2.5%",
      trend: "up",
    },
    {
      label: "Call Connection Rate",
      value: "98%",
      change: "+4.2%",
      trend: "up",
    },
    {
      label: "Conversion Rate",
      value: "5.82%",
      change: "-1.2%",
      trend: "down",
    },
  ];

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
      <RoleCards role={state?.role_id} type={state?.employee_type} batch = {state?.batch} />

     
    </div>
  );
}
