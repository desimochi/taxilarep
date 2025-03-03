"use client"
import Table from "@/components/Table";
import { useState } from "react";

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState("uploaded");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-5">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {[
            { id: "uploaded", label: "All Uploaded Case Study" },
            { id: "studentanswer", label: "Stundent Answers" },
          ].map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group ${
                  activeTab === tab.id
                    ? "text-black border-black dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className=" mx-5 border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-8">
                <div className="flex justify-between items-center gap-2">
                <div className="w-1/3">
                    <input type="date" name="date" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                <div className="w-1/3">
  <select id="batch"  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:
  
  
  -blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Batch</option>
    <option value="2024-25">T-29</option>
    <option value="t-28">T-28</option>
    <option value="t-27">T-27</option>
    <option value="t-26">T-26</option>
  </select>
                </div>
                <div className="w-1/3">
  <select id="term" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Subject</option>
    <option  value="Term5">Python</option>
    <option value="Term4">SQL</option>
    <option value="Term3">Marekting</option>
    <option value="Term2">HRM</option>
    <option value="Term1">Business Analytics</option>
  </select>
                </div>
                </div>
                
            </div>
      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "uploaded" && <Table student={false}/>}
        {activeTab === "studentanswer" && <Table student={true} />}
      </div>
    </div>
  );
};

export default NavigationTabs;
