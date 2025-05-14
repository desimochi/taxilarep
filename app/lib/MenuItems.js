import {
    HomeIcon,
    AcademicCapIcon,
    UserGroupIcon,
    CalendarIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
  } from "@heroicons/react/24/outline";
  import { AlignLeftIcon, AlignRightIcon, BookCheckIcon, BookCopyIcon, DockIcon, FileAxis3D, IndianRupee, NewspaperIcon, PaperclipIcon, PenBox, PenSquareIcon, UserCircle, UserRoundCheck } from "lucide-react";
export const menuItems = [
    // { label: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/admin" },
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
        // { label: "Internship Report", path: "/internship-report" },
          {label : "Exam Schedule", hasSubMenu:true,  subMenu : [
            {label:"Main Exam Schedule", path:"/main-exam-schedule"},
            // { label: "Re-Sit Exam Schedule", path: "/resit-exam-schedule" },
          ]},
          {label : "Attendance Manager", hasSubMenu:true,  subMenu : [
            { label: "Student Attendence", path: "/attendance/student-attendance" },
            { label: "Subjet-Wise Attendance", path: "/attendance/subject-wise" },
          ]},
         
          // {label : "Exam Manager", hasSubMenu:true,  subMenu : [
          //   {label:"Add Marks", path:"/written/add-marks"},
          //   { label: "See Result", path: "/written/result" },
          // ]},
          // {label : "Re-Sit Exam Manager", hasSubMenu:true,  subMenu : [
          //   {label:"Add Marks", path:"/resit/add-marks"},
          //   { label: "See Result", path: "/resit/result" },
          // ]},
          {label : "Component Manager", path: "/exam-components/component-manager"},
          
          {label : "Admit Card", path: "/exam-components/admitcard"},
          {label : "Download Admit Card", path: "/exam-components/admitcard/download-admitcard"},
          {label : "Result", path: "/exam-components/result"},
          {label : "Resit", path: "/exam-components/resit"},
      ],
    },
   
    {
      label: "Imp. News & Notice",
      icon: <NewspaperIcon className="h-5 w-5" />,
      path: "/notice/noticeboard" 
    },
    {
      label: "Students",
      icon: <AcademicCapIcon className="h-5 w-5" />,
      subMenu: [
        { label: "Add New Student", path: "/add-student" },
        { label: "All Students", path: "/students" },
        { label: "Assign Students", path: "/assign-students" },
         { label: "Student Mapping", path: "/edit-student-mapping" },
        {label: "Promote Students", path: "/promote-student" },
      ],
    },
    {
      label: "Faculty",
      icon: <BookCheckIcon className="h-5 w-5" />,
      subMenu: [
        { label: "Add Faculty", path: "/add-faculty" },
        { label: "All Faculty", path: "/all-faculty" },
        { label: "Assign Subject", path: "/course/subject-manager" },
      ],
    },
    {
      label: "Staff",
      icon: <UserCircle className="h-5 w-5" />,
      subMenu: [
        { label: "Department", path: "/admin/department" },
        { label: "Salutation", path: "/admin/salutation" },
        { label: "Role Management", path: "/admin/role-manager" },
        { label: "Designation", path: "/admin/designation" },
        { label: "All Employee", path: "/all-employee" },
      ],
    },
    {
      label: "Accounts",
      icon: <IndianRupee className="h-5 w-5" />,
      subMenu: [
        { label: "Fee Management", path: "/fees-management" },
      ],
    },
    { label: "Events", icon: <CalendarIcon className="h-5 w-5" />, path: "/events" },
   
  ];
  
  export const FacmenuItems = [
    { label: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/faculty" },
    {
      label: "Academics",
      icon: <PenSquareIcon className="h-5 w-5" />,
      subMenu: [
        { label: "Subject", path: "/faculty/assign-subject" },
        { label: "Class Schedule", path: "/faculty/class-schedule" },
        {label : "Syllabus", hasSubMenu:true,  subMenu : [
            {label:"Upload Syllabus", path:"/syllabus/see-syllabus"},
          ]},
          { label: "Notes", path: "/notes" },
          { label: "Class Attendance", path: "/attendance/class-attendance" },
          { label: "Subject Wise Attendance", path: "/attendance/subject-attendance" },
          { label: "Resit", path: "/faculty/resit" },
      ],
    },
   
    {
      label: "Imp. News & Notice",
      icon: <NewspaperIcon className="h-5 w-5" />,
      path: "/notice/noticeboard" 
    },
    { label: "Mentorship Student", icon: <NewspaperIcon className="h-5 w-5" />, path: "/faculty/mentorship-assign-student" },
    { label: "Events", icon: <CalendarIcon className="h-5 w-5" />, path: "/events" },
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

  export const stumenuItems = [
    { label: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/student" },
    { label: "Subject", icon: <BookCheckIcon className="h-5 w-5" />, path: "/student/subject" },
    { label: "Attendance", icon: <UserRoundCheck className="h-5 w-5" />, path: "/student/attendance" },
    { label: "Class Schedule", icon: <BookCopyIcon className="h-5 w-5" />, path: "/student/class-schedule" },
    { label: "Exam Schedule", icon: <PenBox className="h-5 w-5" />, path: "/student/exam-schedule" },
    { label: "Result", icon: <PenBox className="h-5 w-5" />, path: "/exam-components/result/see-result" },
    { label: "Admit Card", icon: <FileAxis3D className="h-5 w-5" />, path: "/student/admit-card" },
    { label: "Notice", icon: <NewspaperIcon className="h-5 w-5" />, path: "/notice/noticeboard" },
    { label: "Events", icon: <CalendarIcon className="h-5 w-5" />, path: "/events" },
  ];

  export const Accountant = [
    {
      label: "Staff",
      icon: <UserCircle className="h-5 w-5" />,
      subMenu: [
        { label: "Department", path: "/admin/department" },
        { label: "Salutation", path: "/admin/salutation" },
        { label: "Role Management", path: "/admin/role-manager" },
        { label: "Designation", path: "/admin/designation" },
        { label: "All Employee", path: "/all-employee" },
      ],
    },
    {
      label: "Accounts",
      icon: <IndianRupee className="h-5 w-5" />,
      subMenu: [
        { label: "Fee Management", path: "/fees-management" },
      ],
    },
  ]

  export const Staff = [
    { label: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/staf" },
    { label: "Attendance", icon: <BookCheckIcon className="h-5 w-5" />, path: "/staff/attendance" },
    { label: "Payroll", icon: <IndianRupee className="h-5 w-5" />, path: "/staff/payroll" },
  ]
