"use client";

import BackButton from "@/components/ui/Backbutton";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <BackButton />
        <div className="flex justify-center">
          
          <svg
            className="w-16 h-16 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mt-4">
          Access Denied
        </h1>
        <p className="text-center text-gray-600 mt-2">
          You are not authorized to access this page.
        </p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => router.push("/")}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg shadow"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
