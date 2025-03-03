"use client"
import { AttendanceChart } from "@/components/AttendanceChart";
import Calendar from "@/components/Calendra";
import { LecComponent } from "@/components/Lecture";
import { useState } from 'react';
import {
  UserGroupIcon,
  AcademicCapIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { BookAIcon, BookCheck, BookCopyIcon, PersonStandingIcon } from "lucide-react";
import Link from "next/link";
export default function Page(){
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  function handleSubmit (e){ 
      e.preventDefault()
      console.log("submitted")
  }
    const events = [
          { title: "Admissions Meeting", date: "2025-02-12T10:00:00" },
          { title: "Management Conclave Meeting", date: "2025-02-16T15:00:00" },
           { title: "Stundents Exam", date: "2025-02-19T09:00:00" },
        ];
    return(
        <>
          {isOpen && (
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-xl shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-6 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Create New Notice
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <form className="p-6 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Select Notice For
                    </label>
                    <select
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="all" selected>
                        All
                      </option>
                      <option value="accounts">Accounts</option>
                      <option value="faculty">Faculty</option>
                      <option value="students">Students/Console</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Notice Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write product description here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex justify-center w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Post the Notice
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
        
       
            
            <div className="p-8">
                <div className="flex gap-4">
                    <div className="w-3/4">
                    <div >
      {/* Total Balance Section */}
      <div className="flex gap-2 items-center">
        <div className="w-1/4 border border-gray-300 rounded-md hover:shadow-xl transition-shadow hover:bg-gray-100">
        <div className="flex items-center space-x-3  p-4 rounded-lg ">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-tl from-red-400 to-red-900 rounded-full">
          <AcademicCapIcon className="h-5 w-5 text-white" />
          </div>
          <div>   
          <p className="text-3xl font-semibold">148</p>
            <p className="text-gray-500 text-md">No. of Students</p>
          </div>
        </div>
        <hr className="border-1 border-gray-300" />
         <Link href='/students' ><p className="py-1 px-4 text-center text-sm text-white  bg-red-700 rounded-bl-sm rounded-br-sm">View Details</p></Link>
        </div>
        <div className="w-1/4 border border-gray-300 rounded-md hover:shadow-xl transition-shadow hover:bg-gray-100" >
        <div className="flex items-center space-x-3  p-4 rounded-lg ">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-tl from-red-400 to-red-900  rounded-full">
          <UserGroupIcon className="h-5 w-5 text-white" />
          
          </div>
          <div>   
          <p className="text-3xl font-semibold">36</p>
            <p className="text-gray-500 text-md">No. of Faculty</p>
          </div>
        </div>
        <hr className="border-1 border-gray-300" />
        <Link href='/faculty' >  <p className="py-1 px-4 text-center text-sm text-white bg-red-700 rounded-bl-sm rounded-br-sm">View Details</p></Link>
        
        </div>
        <div className="w-1/4 border border-gray-300 rounded-md hover:shadow-xl transition-shadow hover:bg-gray-100">
        <div className="flex items-center space-x-3 p-4 ">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-tl from-red-400 to-red-900  rounded-full">
          <BookCheck className="h-5 w-5 text-white" />
          </div>
          <div>
            
            <p className="text-3xl font-semibold">28</p>
            <p className="text-gray-500 text-md">Subjects</p>
          </div>
        </div>
        <hr className="border-1 border-gray-300" />
        <Link href='/course/subject-manager' >  <p className="py-1 px-4 text-center text-white text-sm bg-red-700 rounded-bl-sm rounded-br-sm">View Details</p></Link>
        </div>
        <div className="w-1/4 border border-gray-300 rounded-md hover:shadow-xl transition-shadow hover:bg-gray-100">
        <Link href="/course/course-manager" >
        <div className="flex items-center space-x-3 p-4 ">
          <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-tl from-red-400 to-red-900  rounded-full">
            <BookCopyIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            
            <p className="text-3xl font-semibold">02</p>
            <p className="text-gray-500 text-md">Courses</p>
            
          </div>
          
        </div>
        <hr className="border-1 border-gray-300" />
        <p className="py-1 px-4 text-center text-white text-sm bg-red-700 rounded-bl-sm rounded-br-sm">View Details</p>
        </Link>
        </div>
      </div>

    </div>
                        <div className="flex gap-4">
                          <div className="w-3/4">
                              <AttendanceChart />
                          </div>
                          <div className="w-1/2">
                                <LecComponent />
                          </div>
                        </div>
                        <div className=" flex gap-3">
                          <div className="w-1/2">
                              <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow">
                                    <div className="flex justify-between align-middle p-6 items-center">
                                      <h4 className="font-bold ">Notice Board</h4>
                                      <button 
        onClick={toggleModal}
        className="block text-black bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-sm text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Post a Notice
      </button>
                                    </div>
                                    <hr className="border-spacing-1 border-white"/>
                                    <ul className="p-6 list-disc">
                                      <li className="">Prof. Lavina Will Have Webinar on Feb 01. <hr className="border-spacing-0.5 border-white mb-2" /></li>
                                      <li className="">Prof. Lavina Will Have Webinar on Feb 01. <hr className="border-spacing-0.5 border-white mb-2" /></li>
                                    </ul>
                                    <div>

                                    </div>
                              </div>
                          </div>
                          <div className="w-1/2">
                          <div className="border border-gray-700 rounded-xl mt-4 bg-gray-100 text-black p-2 hover:shadow-xl transition-shadow">
                                    <div className="flex justify-between align-middle p-6 items-center">
                                      <h4 className="font-bold text-xl">Results - Term 4</h4>
                                      <button className="py-2 px-4 bg-black text-white rounded-sm ">See Full Rresult</button>
                                    </div>
                                    <hr className="border-spacing-1 border-gray-800"/>

                                    <div className="flex mt-6 align-middle text-center gap-8 mb-2">
                                        <div className="w-1/2">
                                        <span className="text-4xl font-bold">24</span>
                                        <p className="text-sm text-gray-800">Students Passed in All Subjects</p>
                                        </div>
                                        <div className="w-1/2">
                                        <span className="text-3xl font-bold">36</span>
                                        <p className="text-sm text-gray-800">Students Failed in Minimum One Subject</p>
                                        </div>
                                    </div>
                              </div>
                          
                          </div>
                        </div>
                    </div>
                    <div className="w-1/4">
                        <Calendar events={events}/>
                    </div>
                </div>
            </div>
        </>
    )
}