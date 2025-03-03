"use client";

import { useState } from "react";
import { MailIcon, PhoneCallIcon } from "lucide-react";
import StudentProfileDetails from "./StudentProfileDetails";
import InterviewDetails from "./InterviewDetails";

export default function StudentDetails({ setIsOpen }) {
  const [activeTab, setActiveTab] = useState("Profile Details");

  const tabs = [
    "Profile Details", "Interview Details", "Mentoring Details", "Attendance Details",
    "Exam Details", "Result Details", "Assignment Details", "LMS Details",
    "Institute Event", "Feedback", "Fees"
  ];

  const tabContent = {
    "Profile Details": <StudentProfileDetails/>,
    "Interview Details": <InterviewDetails/>,
    "Mentoring Details": <p>Mentoring Details Content</p>,
    "Attendance Details": <p>Attendance Details Content</p>,
    "Exam Details": <p>Exam Details Content</p>,
    "Result Details": <p>Result Details Content</p>,
    "Assignment Details": <p>Assignment Details Content</p>,
    "LMS Details": <p>LMS Details Content</p>,
    "Institute Event": <p>Institute Event Content</p>,
    "Feedback": <p>Feedback Content</p>,
    "Fees": <p>Fees Content</p>
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="flex items-center justify-between p-4 bg-red-50 border border-gray-300 rounded-lg shadow-sm w-full ">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <img src="/avatar-placeholder.png" alt="Avatar" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Adarsh Kumar</h2>
            <p className="text-sm text-gray-500">Student ID: STTBSR231</p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-gray-600">
          <div className="flex items-center space-x-1">
            <MailIcon size={16} />
            <span className="text-sm cursor-pointer">ad****.in</span>
          </div>
          <div className="flex items-center space-x-1">
            <PhoneCallIcon size={16} />
            <a href="tel:99******89" className="text-sm text-red-700">99******89</a>
          </div>
        </div>

        <p className="text-sm font-medium">Male</p>

        <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-red-700 text-white rounded-full hover:bg-red-600">
          X
        </button>
      </div>

      <div className="flex p-8 bg-white rounded-lg mt-6 gap-4 h-[500px]">
  {/* Left Sidebar with Independent Scroll */}
  <div className="w-1/5 flex flex-col overflow-y-auto max-h-full border-r border-gray-300">
    {tabs.map((tab) => (
      <span
        key={tab}
        className={`px-4 w-full text-center py-4 text-sm cursor-pointer rounded-sm mt-2 ${
          activeTab === tab ? "bg-black text-white" : "bg-gray-300 hover:bg-black hover:text-white"
        }`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </span>
    ))}
  </div>

  {/* Right Content Area with Independent Scroll */}
  <div className="w-4/5 p-4 border border-gray-200 rounded-md overflow-y-auto max-h-full">
    {tabContent[activeTab]}
  </div>
</div>

    </div>
  );
}