"use client"
import ExamCreate from "@/components/ExamCreate";
import Table from "@/components/Table";
import TableExam from "@/components/TableExam";
import { Trash2Icon, PlusIcon, SaveIcon,  } from "lucide-react";
import { useState } from "react";

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState("mainexam");
  const [fields, setFields] = useState([
    { subject: "", component: "", examDate: "", examTime: "" },
  ]);

  // Function to add a new field group
  const addFields = () => {
    setFields([...fields, { subject: "", component: "", examDate: "", examTime: "" }]);
  };

  // Function to remove a field group
  const removeFields = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  // Function to handle input changes
  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newFields = [...fields];
    newFields[index][name] = value;
    setFields(newFields);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted Data:", fields);
  };


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
        {activeTab === "mainexam" && <> <div className=" mx-5 border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-8">
                <div className="flex justify-between items-center gap-2">
                <div className="w-1/3">
                   <h2 className="text-2xl font-bold">Main Exam Schedule</h2>
                   <p className="text-gray-200 text-sm">Check the examination schedule</p>
                </div>
                <div className="w-1/3">
  <select id="course"  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm  focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Course</option>
    <option value="2024-25">PGDM+Business Analytics</option>
    <option value="PGPM">PGPM</option>
    <option value="EPGDM">EPGDM</option>
  </select>
                </div>
                <div className="w-1/3">
  <select id="batch"  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm  focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Batch</option>
    <option value="2024-25">T-29</option>
    <option value="t-28">T-28</option>
    <option value="t-27">T-27</option>
    <option value="t-26">T-26</option>
  </select>
                </div>
                <div className="w-1/3">
  <select id="term" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Term</option>
    <option  value="Term5">Term5</option>
    <option value="Term4">Term4</option>
    <option value="Term3">Term3</option>
    <option value="Term2">Term2</option>
    <option value="Term1">Term1</option>
  </select>
                </div>
                </div>
                
            </div> <TableExam/></>}
        {activeTab === "addmainexam" && <ExamCreate />}
      </div>
    </div>
  );
};

export default NavigationTabs;
