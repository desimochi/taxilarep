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
export const menuItems = [
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
  
  export const FacmenuItems = [
    { label: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/faculty" },
    {
      label: "Subject",
      icon: <PenSquareIcon className="h-5 w-5" />,
      subMenu: [
        { label: "See Subject", path: "/faculty/assign-subject" },
        { label: "Internship Report", path: "faculty/internship-report" },
        {label : "Syllabus", hasSubMenu:true,  subMenu : [
            {label:"Upload Syllabus", path:"/faculty/upload-syllabus"},
            { label: "Uploaded Syllabus", path: "/faculty/uploaded-syllabus" },
          ]},
          { label: "Student Attendance", path: "faculty/see-attendance" },
      ],
    },
   
    {
        label: "Exam",
        icon: <PenSquareIcon className="h-5 w-5" />,
        subMenu: [
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
    { label: "Noticeboard", icon: <NewspaperIcon className="h-5 w-5" />, path: "/see-notice" },
    { label: "Mentorship Student", icon: <NewspaperIcon className="h-5 w-5" />, path: "faculty/mentorship-assign-student" },
    {label : "Faculty Report",  icon: <BookCheckIcon className="h-5 w-5" />, hasSubMenu: true, subMenu :[
          { label: "Faculty Activity", path: "/faculty-report/faculty-activity" },
          { label: "Faculty Syllabus", path: "/faculty-report/faculty-syllabus" },
          { label: "Faculty Assignment", path: "/faculty-report/faculty-assignment" },
          { label: "Faculty Case Study", path: "/faculty-report/faculty-casestudy" },
          { label: "Faculty Questions", path: "/faculty-report/faculty-questions" },
          { label: "Add Syllabus", path: "/faculty-report/add-syllabus" },
        ]},
    { label: "Events", icon: <CalendarIcon className="h-5 w-5" />, path: "/see/events" },
  ];

  export const ITManager = [
    {
        label: "User Manager",
        icon: <UserGroupIcon className="h-5 w-5" />,
        subMenu: [
          { label: "Add New User", path: "/add-user" },
          { label: "All Users", path: "/users" },
          { label: "Change Password", path: "/reset-password" },
        ],
      },
  ]