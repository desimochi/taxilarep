"use client"
import Table from "@/components/Table";
import TableExam from "@/components/TableExam";
import { Trash2Icon, PlusIcon, SaveIcon,  } from "lucide-react";
import { useState } from "react";

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState("resitexam");
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
            { id: "resitexam", label: "Re-Sit Exam Schedule" },
            { id: "addresitexam", label: `+ Add Re-Sit Exam Schedule` },
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
        {activeTab === "resitexam" && <> <div className=" mx-5 border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-8">
                <div className="flex justify-between items-center gap-2">
                <div className="w-1/3">
                   <h2 className="text-2xl font-bold">Re-Sit Exam Schedule</h2>
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
        {activeTab === "addresitexam" && <div className="w-full  rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-md">
                <h4 className="px-6 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Add Re-Sit Exam Schedule</h4>
                <form className="py-5 px-5">
                    <label className="font-bold">Course</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Course</option>
    <option value="2024-25">PGDM+Business Analytics</option>
    <option value="t-28">PGPM</option>
    <option value="t-27">EPGDM</option>
  </select>
  <div className="flex gap-2 justify-between">
        <div className="w-1/2">
        <label className="font-bold ">Batch</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Batch</option>
    <option value="T-29">T-29</option>
    <option value="t-28">T-28</option>
    <option value="t-27">T-27</option>
  </select>
        </div>
        <div className="w-1/2">
        <label className="font-bold">Term</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Term</option>
    <option value="Term 1">Term 1</option>
    <option value="Term 2">Term 2</option>
    <option value="Term 3">Term 3</option>
    <option value="Term 4">Term 4</option>
    <option value="Term 5">Term 5</option>
  </select>
        </div>
  </div>
  {fields.map((field, index) => (
        <div key={index} className="flex gap-2 justify-between mb-4 mt-2">
          <div className="w-1/4">
            <label className="font-bold">Subject</label>
            <select
              name="subject"
              value={field.subject}
              onChange={(event) => handleChange(index, event)}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 block w-full"
            >
              <option value="" disabled>Select a Subject</option>
              <option value="Python">Python</option>
              <option value="SQL">SQL</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="w-1/4">
            <label className="font-bold">Component</label>
            <select
              name="component"
              value={field.component}
              onChange={(event) => handleChange(index, event)}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 block w-full"
            >
              <option value="" disabled>Select a Component</option>
              <option value="Theory">Theory</option>
              <option value="Practical">Practical</option>
              <option value="Viva">Viva</option>
            </select>
          </div>

          <div className="w-1/4">
            <label className="font-bold">Exam Date</label>
            <input
              type="date"
              name="examDate"
              value={field.examDate}
              onChange={(event) => handleChange(index, event)}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 block w-full"
            />
          </div>

          <div className="w-1/4 flex gap-4 justify-between items-center">
            <div className="w-4/5">
              <label className="font-bold">Exam Time</label>
              <input
                type="text"
                name="examTime"
                placeholder="10AM to 10:30AM"
                value={field.examTime}
                onChange={(event) => handleChange(index, event)}
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm p-2.5 block w-full"
              />
            </div>

            <div className="w-1/5 flex items-center mt-6">
              {index === 0 ? (
                <button
                  type="button"
                  onClick={addFields}
                  className="bg-red-600 hover:bg-red-700 p-2 rounded text-white font-bold cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
                >
                  <PlusIcon className="h-5 w-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => removeFields(index)}
                  className="bg-black hover:bg-gray-700 p-2 rounded text-white font-bold cursor-pointer shadow-sm hover:shadow-lg transition-shadow"
                >
                  <Trash2Icon className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
  <div className="flex justify-center mt-6">
  <button className="w-40 bg-red-700 py-2 text-white rounded-sm flex items-center justify-center gap-1"><SaveIcon className="h-4 w-4" />Submit</button>  
  </div>
              
                </form>
            </div>
</div>}
      </div>
    </div>
  );
};

export default NavigationTabs;
