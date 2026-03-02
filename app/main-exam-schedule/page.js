"use client"
import ExamCreate from "@/components/ExamCreate";
import MainExamCom from "@/components/MainExamCom";
import Table from "@/components/Table";
import TableExam from "@/components/TableExam";
import { Trash2Icon, PlusIcon, SaveIcon,  } from "lucide-react";
import { useState } from "react";

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState("mainexam");


  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-5">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {[
            { id: "mainexam", label: "Main Exam Details" },
            { id: "addmainexam", label: `+ Add Main Exam ` },
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
        {activeTab === "mainexam" && <> <MainExamCom/> </>}
        {activeTab === "addmainexam" && <ExamCreate />}
      </div>
    </div>
  );
};

export default NavigationTabs;
