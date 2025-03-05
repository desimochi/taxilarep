"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import {
  HomeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { AlignLeftIcon, AlignRightIcon, BookCheckIcon, NewspaperIcon, PenSquareIcon } from "lucide-react";
import { lastDayOfDecade } from "date-fns";

const Sidebar = ({collapsed, toggleSidebar, toggleMenu, openMenus  }) => {
  const pathname = usePathname();


  const menuItems = [
    { label: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/admin" },
    {
      label: "Course",
      icon: <BookCheckIcon className="h-5 w-5" />,
      subMenu: [
        {label : "Specialization Manager", hasSubMenu: true, subMenu :[
          { label: "Specialization", path: "/course/specialization" },
          { label: "Create Specialization", path: "/course/specialization/create-specialization" },
        ]},
        { label: "Course Manager", path: "/course/course-manager" },
        { label: "Batch Manager", path: "/course/batch-manager" },
        { label: "Subject Manager", path: "/course/subject-manager" },
        { label: "Class Schedule", path: "/course/course-schedule" },
        {label : "Terms Manager", hasSubMenu: true, subMenu :[
          { label: "Terms", path: "/terms" },
          { label: "Create Terms", path: "/terms/create-terms" },
        ]},
        {label : "Mentorship Manager", hasSubMenu: true, subMenu :[
          { label: "Assign Student", path: "/mentorship/assign-student" },
          { label: "Assigned Students", path: "/mentorship/assigned-students" },
        ]},
      ],
    },
    {
      label: "Examination",
      icon: <PenSquareIcon className="h-5 w-5" />,
      subMenu: [
        { label: "Internship Report", path: "/internship-report" },
        {label : "Exam Case Study", hasSubMenu:true,  subMenu : [
            {label:"Upload Case Study", path:"/upload-casestudy"},
            { label: "Uploaded Case Study", path: "/uploaded-casestudy" },
          ]},
          {label : "Exam Schedule", hasSubMenu:true,  subMenu : [
            {label:"Main Exam Schedule", path:"/main-exam-schedule"},
            { label: "Re-Sit Exam Schedule", path: "/resit-exam-schedule" },
          ]},
          {label : "Attendance Manager", hasSubMenu:true,  subMenu : [
            {label:"Daily Attendance", path:"/attendance/daily-attendance"},
            { label: "Update Attendance", path: "/attendance/update-attendance" },
            { label: "Student Attendence", path: "/attendance/student-attendance" },
            { label: "Faculty Attendence", path: "/attendance/faculty-attendance" },
          ]},
          {label : "CE Exam Manager", hasSubMenu:true,  subMenu : [
            {label:"Add Marks", path:"/ceexam/add-marks"},
            { label: "Upload Excel Sheet", path: "/ceexam/upload-excel" }, 
            { label: "See Result", path: "/ceexam/result" },
          ]},
          {label : "Written Exam Manager", hasSubMenu:true,  subMenu : [
            {label:"Add Marks", path:"/written/add-marks"},
            { label: "Upload Excel Sheet", path: "/written/upload-excel" },
            { label: "See Result", path: "/written/result" },
          ]},
          {label : "Re-Sit Exam Manager", hasSubMenu:true,  subMenu : [
            {label:"Add Marks", path:"/resit/add-marks"},
            { label: "Upload Excel Sheet", path: "/resit/upload-excel" },
            { label: "See Result", path: "/resit/result" },
          ]},
          {label : "Component Manager", path: "/exam-components/component-manager"},
        { label: "Question Paper", path: "/question-paper" },
      ],
    },
   
    {
      label: "Imp. News & Notice",
      icon: <NewspaperIcon className="h-5 w-5" />,
      subMenu: [
        { label: "Noticeboard", path: "/notice/noticeboard" },
        { label: "News Manager", path: "/notice/news-manager" },
        { label: "Upload Document", path: "/notice/upload-document" },
        { label: "Uploaded Document", path: "/notice/uploaded-document" },
      ],
    },
    {
      label: "Students",
      icon: <AcademicCapIcon className="h-5 w-5" />,
      subMenu: [
        { label: "Add New Student", path: "/add-student" },
        { label: "Add Bulk Student", path: "/add-bulk-student" },
        { label: "All Students", path: "/students" },
        { label: "Batch Assign", path: "/batch-assign" },
      ],
    },
    {
      label: "Faculty",
      icon: <BookCheckIcon className="h-5 w-5" />,
      subMenu: [
        { label: "Add Faculty", path: "/add-faculty" },
        { label: "All Faculty", path: "/faculty" },
        { label: "Assign Subject", path: "/assign-faculty" },
        {label : "Faculty Report", hasSubMenu: true, subMenu :[
          { label: "Faculty Activity", path: "/faculty-report/faculty-activity" },
          { label: "Faculty Syllabus", path: "/faculty-report/faculty-syllabus" },
          { label: "Faculty Assignment", path: "/faculty-report/faculty-assignment" },
          { label: "Faculty Case Study", path: "/faculty-report/faculty-casestudy" },
          { label: "Faculty Questions", path: "/faculty-report/faculty-questions" },
          { label: "Add Syllabus", path: "/faculty-report/add-syllabus" },
        ]},
       
      ],
    },
    { label: "Events", icon: <CalendarIcon className="h-5 w-5" />, path: "/events" },
    {
      label: "User Manager",
      icon: <UserGroupIcon className="h-5 w-5" />,
      subMenu: [
        { label: "Add New User", path: "/add-user" },
        { label: "All Users", path: "/users" },
        { label: "Change Password", path: "/reset-password" },
      ],
    },
  ];

  return (
    <div className={`h-screen bg-white shadow-md border-r-2 p-4 transition-all ${collapsed ? "w-24" : "w-80"}`}>
      <div className="flex items-center justify-between h-[70px] p-2">
        {!collapsed && <Image src={logo} width={140} height={60} alt="Taxila Logo" />}
        <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-200">
          {collapsed ? <AlignRightIcon className="h-5 w-5" /> : <AlignLeftIcon className="h-5 w-5" />}
        </button>
      </div>
      <hr className="border-1 mb-4" />

      <nav>
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.path ? (
              <Link href={item.path}>
                <span className={`flex items-center px-4 py-2 mt-2 rounded-md ${pathname.includes(item.path) ? "bg-black text-white" : "text-gray-800 hover:bg-gray-200"}`}>
                  {item.icon}
                  {!collapsed && <span className="ml-2">{item.label}</span>}
                </span>
              </Link>
            ) : (
              <>
                {/* Main Menu Button */}
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full px-4 py-2 mt-2 text-gray-800 hover:bg-gray-200 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && <ChevronDownIcon className={`h-5 w-5 transition-transform ${openMenus[item.label] ? "rotate-180" : ""}`} />}
                </button>

                {/* Submenu */}
                {openMenus[item.label] && (
                  <div className="ml-6 space-y-2 mt-2">
                    {item.subMenu.map((subItem, subIndex) => (
                      <div key={subIndex}>
                        {subItem.path ? (
                          <Link href={subItem.path}>
                            <span className={`block px-4 py-2 text-sm rounded-md ${pathname.includes(subItem.path) ? "bg-gray-300" : "hover:bg-gray-100"}`}>
                              {subItem.label}
                            </span>
                          </Link>
                        ) : (
                          <>
                            {/* Submenu Toggle Button */}
                            <button
                              onClick={() => toggleMenu(subItem.label)}
                              className="flex items-center justify-between text-sm w-full px-4 py-2 text-gray-900 hover:bg-gray-200 rounded-md"
                            >
                              <span>{subItem.label}</span>
                              <ChevronDownIcon className={`h-5 w-5 transition-transform ${openMenus[subItem.label] ? "rotate-180" : ""}`} />
                            </button>

                            {/* Nested Submenu */}
                            {openMenus[subItem.label] && (
                              <div className="ml-6 space-y-2">
                                {subItem.subMenu.map((nestedItem, nestedIndex) => (
                                  <Link key={nestedIndex} href={nestedItem.path}>
                                    <span className={`block px-4 py-2 text-sm rounded-md ${pathname.includes(nestedItem.path) ? "bg-gray-300" : "hover:bg-gray-100"}`}>
                                      {nestedItem.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
