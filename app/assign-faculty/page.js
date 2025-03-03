"use client"
import Table from "@/components/Table";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";

const NavigationTabs = () => {
  const [activeTab, setActiveTab] = useState("assignedsubject");

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 px-5">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {[
            { id: "assignedsubject", label: "Assigned Subjects" },
            { id: "assignsubject", label: "Assign Subject" },
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
        {activeTab === "assignedsubject" && <>
            <div className=" mx-5 border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-8">
                <div className="flex justify-between items-center gap-2">
                <div className="w-1/3">
                    <h2 className="text-xl font-bold">Assigned Subjects</h2>
                    <p className="text-sm text-gray-300">Faculty-Taxila Business School</p>
                </div>
                <div className="w-1/5">
  <input type="text" id="term" placeholder="Search..." className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
 
                </div>
                </div>
                
            </div>
            <div className="rounded-xl border border-gray-300 mt-4 ">
    <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase rounded-xl bg-black dark:bg-gray-700 dark:text-white-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                   S.No.
                </th>
                <th scope="col" className="px-6 py-3">
                    Faculty Name                
                    </th>
                    <th scope="col" className="px-6 py-3">
                   Course
                </th>
            <th scope="col" className="px-6 py-3">
                   Batch
                </th>
                <th scope="col" className="px-6 py-3">
                    Term
                </th>
                <th scope="col" className="px-6 py-3">
                    Subject
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className="rounded-xl">
            <tr className="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                
            <td className="px-6 py-4">
                    1
                </td>
                
                <td className="px-6 py-4">
                    Prof. Lavina Khilani
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                    PGDM+Business Analytics
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                    T-28
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                    Term-5
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                    International Business Management
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex gap-4">
                        <Trash2Icon className="h-6 w-6" />
                    </div>
                </td>
              
            </tr>
        </tbody>
    </table>
    </div>
         </>}
        {activeTab === "assignsubject" && <div className="flex justify-center items-center w-full rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Assign Subject</h4>
                <form className="py-5 px-5">
                    <label className="font-bold">Faculty Name</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Faculty</option>
    <option value="2024-25">Mr. Rajat Bohra</option>
    <option value="t-28">Mr. Kishore Sharma</option>
    <option value="t-27">Prof. Lavina Khilani</option>
  </select>
        <label className="font-bold ">Course</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Course</option>
    <option value="2024-25">PGDM+Business Analytics</option>
    <option value="t-28">PGPM</option>
    <option value="t-27">EPGDM</option>
  </select>
  <label className="font-bold">Batch</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Batch</option>
    <option value="2024-25">T-29</option>
    <option value="t-28">T-28</option>
  </select>
        <label className="font-bold">Term</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Term</option>
    <option value="2024-25">PGDM+Business Analytics</option>
    <option value="t-28">PGPM</option>
    <option value="t-27">EPGDM</option>
  </select>


  <label className="font-bold">Subject</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Subject</option>
    <option value="2024-25">International Business Management</option>
    <option value="t-28">Pyhton</option>
    <option value="t-27">Marketing </option>
  </select>
 
   <button className="w-full bg-red-700 py-2 text-white rounded-sm ">Submit</button>             
                </form>
            </div>
</div>}
      </div>
    </div>
  );
};

export default NavigationTabs;
