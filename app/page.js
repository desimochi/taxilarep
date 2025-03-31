"use client"
import { GlobalContext } from "@/components/GlobalContext";
import { AcademicCapIcon, BellAlertIcon } from "@heroicons/react/24/outline";
import { BookCheckIcon, GroupIcon, PenSquareIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

export default function Home() {
  const {state} = useContext(GlobalContext)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-4">
      <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-red-500 text-transparent bg-clip-text">
        Welcome! {state.name && state.name}
      </h1>
      <p className="text-gray-600 mt-2">At the ERP of Taxila Business School</p>
      <p className="mt-4 px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-gradient-to-r from-purple-600 to-red-500 hover:text-white transition">
        Click on the Dashboard to get started
      </p>
      
      <div className="flex space-x-8 mt-10">
        <div className="flex flex-col items-center">
          <AcademicCapIcon className="h-10 w-10" />
          <p className="text-sm text-gray-600 mt-2">Academic Information</p>
        </div>
        <div className="flex flex-col items-center">
          <BellAlertIcon className="h-10 w-10" />
          <p className="text-sm text-gray-600 mt-2">Notifications</p>
        </div>
        <div className="flex flex-col items-center">
          <BookCheckIcon className="h-10 w-10" />
          <p className="text-sm text-gray-600 mt-2">Classes Details</p>
        </div>
        <div className="flex flex-col items-center">
          <PenSquareIcon className="h-10 w-10" />
          <p className="text-sm text-gray-600 mt-2">Exam Information</p>
        </div>
        <div className="flex flex-col items-center">
          <GroupIcon className="h-10 w-10" />
          <p className="text-sm text-gray-600 mt-2">Events</p>
        </div>
      </div>
    </div>
  );
}
