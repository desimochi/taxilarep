"use client"
import CreateComponents from "@/components/CreateComponent";
import CreateComponent from "@/components/CreateComponent";
import Table from "@/components/Table";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("assignComponent");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-5">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {[
            { id: "assignComponent", label: "Assign Component" },
            { id: "createcomponent", label: "Create Component" },
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
     
      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "assignComponent" && <Table student={false}/>}
        {activeTab === "createcomponent" && <CreateComponents />}
      </div>
    </div>
  );
};
