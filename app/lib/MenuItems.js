import {
    HomeIcon,
    AcademicCapIcon,
    UserGroupIcon,
    CalendarIcon,
    DocumentChartBarIcon,
    DocumentIcon,
  } from "@heroicons/react/24/outline";
  import { AlignLeftIcon, AlignRightIcon, Award, BookCheckIcon, BookCopyIcon, Brain, Briefcase, BriefcaseBusiness, Building2, Building2Icon, Calculator, CalendarCheck2Icon, DockIcon, Dog, DollarSign, FileAxis3D, FishIcon, Gamepad, Globe, HandshakeIcon, HelpCircleIcon, IndianRupee, IndianRupeeIcon, NewspaperIcon, Paperclip, PaperclipIcon, PenBox, PenSquareIcon, ProjectorIcon, Puzzle, Settings2Icon, Sheet, SpeakerIcon, UserCheck, UserCircle, UserRoundCheck, UserSquare, WholeWord, WorkflowIcon } from "lucide-react";
export const menuItems = [
    { label: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/admin/dashboard" },
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
    { label: "Leave Management", icon: <Paperclip className="h-5 w-5" />, path: "/leaves" },
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
      label: "Accounts",
      icon: <IndianRupee className="h-5 w-5" />,
      subMenu: [
        { label: "Fee Details Student", path: "/fees-management" },
        { label: "Fee Management", path: "/accounts/fee-type" },
        { label: "Coupon Management", path: "/accounts/coupon" },
        { label: "Transactions", path: "/accounts/transactions" },
      ],
    },
    {
      label: "Parent Meetings",
      icon: <HandshakeIcon className="h-5 w-5" />,
      path: "/admin/parents-meeting" 
    },
    {
      label: "Internship & Placement",
      icon: <Building2Icon className="h-5 w-5" />,
      subMenu: [
        { label: "Internship Management", path: "/internship/admin" },
      ],
    },
    {
      label: "Imp. News & Notice",
      icon: <NewspaperIcon className="h-5 w-5" />,
      path: "/notice/noticeboard" 
    },
    {
      label: "Toppers",
      icon: <Award className="h-5 w-5" />,
      path: "/toppers" 
    },
      {
      label: "Fail Students",
      icon: <NewspaperIcon className="h-5 w-5" />,
      path: "/fail-student" 
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
         { label: "Task Management", icon: <UserSquare className="h-5 w-5" />, path: "/admin/task" },
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
        { label: "Fee Details Student", path: "/fees-management" },
        { label: "Fee Management", path: "/accounts/fee-type" },
          {
      label: "Fail Students",
      icon: <NewspaperIcon className="h-5 w-5" />,
      path: "/fail-student" 
    }
      ],
    },
    {
      label: "Support",
      icon: <HelpCircleIcon className="h-5 w-5" />,
      path: "/help/support" 
    },
    { label: "Events", icon: <CalendarIcon className="h-5 w-5" />, path: "/events" },
   
  ];
  
  export const FacmenuItems = [
    { label: "Faculty Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/faculty" },
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
      {
      label: "Internship ",
      icon: <Building2Icon className="h-5 w-5" />,
      path: "/internship/mentor" 
    },
      {label : "Attendance Manager",icon: <UserGroupIcon className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            { label: "Student Attendence", path: "/attendance/student-attendance" },
            { label: "Subjet-Wise Attendance", path: "/attendance/subject-wise" },
          ]},
    { label: "Mentorship Student", icon: <NewspaperIcon className="h-5 w-5" />, path: "/faculty/mentorship-assign-student" },
     { label: "Taxila Curreny", icon: <IndianRupee className="h-5 w-5" />, path: "/taxila-currency/faculty" },
    { label: "Events", icon: <CalendarIcon className="h-5 w-5" />, path: "/events" },
    { label: "Simulation Guides", icon: <DocumentIcon className="h-5 w-5" />, path: "/game-guides" },
    {label : "Simulations", icon: <Gamepad className="h-5 w-5" />,  hasSubMenu:true,  subMenu : [
            {label:"Startup Simulation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/simulation"},
             {label:"Guesstimation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/guesstimations"},
            {label : "Finance", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
               {label:"Accouting Cycle",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/accounting-cycle"},
               {label:"Fund Manager",  icon: <DollarSign className="h-5 w-5" />, path:"/game/fund-manager"},
               {label:"Financial Modeling - 1",  icon: <IndianRupeeIcon className="h-5 w-5" />, path:"/game/financial-modeling"},
            {label:"Rat Race 3d",  icon: <Gamepad className="h-5 w-5" />, path:"/game/rat-race"},
            {label:"Project Titan",  icon: <Gamepad className="h-5 w-5" />, path:"/game/titan"},
          ]},
          {label : "Sales and Marketing", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Sector Shaker",  icon: <Gamepad className="h-5 w-5" />, path:"/game/sector-shaker"},
            {label:"Marketing Strategy",  icon: <Gamepad className="h-5 w-5" />, path:"/game/marketing-strategy"},
            {label:"STRATSIM",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim"},
            {label:"STRATSIM 2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim2"},
          ]},
          {label : "Negotiation ", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Negotiation Protocol",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation-protocol"},
            {label:"Negotiation2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation2"},
          ]},
          {label : "Human Resource Development", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Netritva",  icon: <Gamepad className="h-5 w-5" />, path:"/game/netrvita"},
          ]},
          {label : "Project Management", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Project Taxila",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/project-management"},
            {label:"Ledership Challange ",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/leadership-challange"},
          ]},
         {label : "Critical Thinking", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Last City",  icon: <Gamepad className="h-5 w-5" />, path:"/game/lastcity"},
            {label:"Idea Generation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/idea-generator"},
          ]},
          {label : "Strategy", icon: <Brain className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Capital Quest",  icon: <Gamepad className="h-5 w-5" />, path:"/game/quest"},
            {label:"Indian Business Strategy",  icon: <BriefcaseBusiness className="h-5 w-5" />, path:"/game/indian-business"},
          ]},
           {label : "Economics", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Airthniti",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/airthniti"},
          ]},
            {label : "Consumer Behaviour", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Hyper-Competitive Consumer Simulation",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/consumer-behaviour"},
            {label:"ICBS",  icon: <UserCheck className="h-5 w-5" />, path:"/game/indian-consumer"},
          ]},
         {label : "Consulting/Business Analytics", icon: <Sheet className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Ecosystem",  icon: <Globe className="h-5 w-5" />, path:"/game/taxila-eco"},
            {label:"Taxila Solve",  icon: <Puzzle className="h-5 w-5" />, path:"/game/taxila-solve"},
            {label:"Sariska Hills",  icon: <Dog className="h-5 w-5" />, path:"/game/sariska"},
            {label:"Samudra Rakshak",  icon: <FishIcon className="h-5 w-5" />, path:"/game/samudra-rakshak"},
             {label:"DILIGENCE",  icon: <Gamepad className="h-5 w-5" />, path:"/game/diligence"},
             {label:"Market Research-New Product Launch",  icon: <FishIcon className="h-5 w-5" />, path:"/game/product-launch"},
          ]},
          {label : "Quality Management", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Six Sigma Simulation",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/six-sigma"},
          ]},
           {label:"Wordify",  icon: <WholeWord className="h-5 w-5" />, path:"/game/wordfy"},
           {label:"Interview",  icon: <Briefcase className="h-5 w-5" />, path:"/game/interview-preparation"},
           {label:"Public Speaking",  icon: <SpeakerIcon className="h-5 w-5" />, path:"/game/public-speaking"},
          ]},
           {
      label: "Support",
      icon: <HelpCircleIcon className="h-5 w-5" />,
      path: "/help/support" 
    },
  ];

  export const ITManager = [
    { label: "IT Team Task", icon: <UserSquare className="h-5 w-5" />, path: "/admin/task-manager" },
  ]

  export const stumenuItems = [
    { label: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/student" },
    { label: "Subject", icon: <BookCheckIcon className="h-5 w-5" />, path: "/student/subject" },
    { label: "Attendance", icon: <UserRoundCheck className="h-5 w-5" />, path: "/student/attendance" },
    { label: "Class Schedule", icon: <BookCopyIcon className="h-5 w-5" />, path: "/student/class-schedule" },
    { label: "Leave Management", icon: <Paperclip className="h-5 w-5" />, path: "/student/leave-management" },
    { label: "Internship Management", icon: <Building2 className="h-5 w-5" />, path: "/student/internship" },
    { label: "Exam Schedule", icon: <PenBox className="h-5 w-5" />, path: "/student/exam-schedule" },
    { label: "Fee Management", icon: <IndianRupee className="h-5 w-5" />, path: "/student/fees" },
     { label: "Taxila Curreny", icon: <IndianRupee className="h-5 w-5" />, path: "/taxila-currency/wallet" },
    {label : "Simulations", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Startup Simluation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/simulation"},
             {label:"Guesstimation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/guesstimations"},
            {label : "Finance", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
                          {label:"Accouting Cycle",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/accounting-cycle"},
                          {label:"Fund Manager",  icon: <DollarSign className="h-5 w-5" />, path:"/game/fund-manager"},
                          {label:"Financial Modeling - 1",  icon: <IndianRupeeIcon className="h-5 w-5" />, path:"/game/financial-modeling"},
            {label:"Rat Race 3d",  icon: <Gamepad className="h-5 w-5" />, path:"/game/rat-race"},
            {label:"Project Titan",  icon: <Gamepad className="h-5 w-5" />, path:"/game/titan"},
          ]},
          {label : "Negotiation ", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Negotiation Protocol",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation-protocol"},
            {label:"Negotiation2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation2"},
          ]},
          {label : "Sales and Marketing", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Sector Shaker",  icon: <Gamepad className="h-5 w-5" />, path:"/game/sector-shaker"},
            {label:"Marketing Strategy",  icon: <Gamepad className="h-5 w-5" />, path:"/game/marketing-strategy"},
            {label:"STRATSIM",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim"},
            {label:"STRATSIM 2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim2"},
          ]},
          {label : "Human Resource Development", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Netritva",  icon: <Gamepad className="h-5 w-5" />, path:"/game/netrvita"},
          ]},
          {label : "Consumer Behaviour", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Hyper-Competitive Consumer Simulation",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/consumer-behaviour"},
            {label:"ICBS",  icon: <UserCheck className="h-5 w-5" />, path:"/game/indian-consumer"},
          ]},
           {label : "Project Management", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Project Taxila",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/project-management"},
            {label:"Ledership Challange ",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/leadership-challange"},
          ]},
           {label : "Economics", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Airthniti",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/airthniti"},
          ]},
          {label : "Strategy", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Capital Quest",  icon: <Gamepad className="h-5 w-5" />, path:"/game/quest"},
            {label:"Indian Business Strategy",  icon: <Gamepad className="h-5 w-5" />, path:"/game/indian-business"},
          ]},
          {label : "Critical Thinking", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Last City",  icon: <Gamepad className="h-5 w-5" />, path:"/game/lastcity"},
            {label:"Idea Generation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/idea-generator"},
          ]},
          {label : "Consulting/Business Analytics", icon: <Sheet className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Ecosystem",  icon: <Globe className="h-5 w-5" />, path:"/game/taxila-eco"},
            {label:"Taxila Solve",  icon: <Puzzle className="h-5 w-5" />, path:"/game/taxila-solve"},
            {label:"Sariska Hills",  icon: <Dog className="h-5 w-5" />, path:"/game/sariska"},
            {label:"Samudra Rakshak",  icon: <FishIcon className="h-5 w-5" />, path:"/game/samudra-rakshak"},
            {label:"DILIGENCE",  icon: <Gamepad className="h-5 w-5" />, path:"/game/diligence"},
            {label:"Market Research-New Product Launch",  icon: <FishIcon className="h-5 w-5" />, path:"/game/product-launch"},
          ]},
          {label : "Quality Management", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Six Sigma Simulation",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/six-sigma"},
          ]},
            {label:"Interview",  icon: <WholeWord className="h-5 w-5" />, path:"/game/interview-preparation"},
           {label:"Wordify",  icon: <Gamepad className="h-5 w-5" />, path:"/game/wordfy"},
           {label:"Public Speaking",  icon: <SpeakerIcon className="h-5 w-5" />, path:"/game/public-speaking"},
          ]},
     { label: "Marks", icon: <DocumentChartBarIcon className="h-5 w-5" />, path: "/student/marks" },
    { label: "Result", icon: <PenBox className="h-5 w-5" />, path: "/exam-components/result/see-result/student" },
    { label: "Admit Card", icon: <FileAxis3D className="h-5 w-5" />, path: "/student/admit-card" },
    { label: "Notice", icon: <NewspaperIcon className="h-5 w-5" />, path: "/notice/noticeboard" },
     {
      label: "Parent Meetings",
      icon: <HandshakeIcon className="h-5 w-5" />,
      path: "/student/parent-meeting" 
    },
    { label: "Events", icon: <CalendarIcon className="h-5 w-5" />, path: "/events" },
     {
      label: "Support",
      icon: <HelpCircleIcon className="h-5 w-5" />,
      path: "/help/support" 
    },

  ];

  export const Accountant = [
    {
      label: "Staff",
      icon: <UserCircle className="h-5 w-5" />,
      subMenu: [
        { label: "Department", path: "/admin/department" },
        { label: "Salutation", path: "/admin/salutation" },
        { label: "Fee Management", path: "/accounts/fee-type" },
        { label: "Role Management", path: "/admin/role-manager" },
        { label: "Designation", path: "/admin/designation" },
        { label: "All Employee", path: "/all-employee" },
        {label : "Simulations", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Startup Simluation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/simulation"},
             {label:"Guesstimation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/guesstimations"},
            {label : "Finance", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
                          {label:"Accouting Cycle",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/accounting-cycle"},
                          {label:"Fund Manager",  icon: <DollarSign className="h-5 w-5" />, path:"/game/fund-manager"},
                          {label:"Financial Modeling - 1",  icon: <IndianRupeeIcon className="h-5 w-5" />, path:"/game/financial-modeling"},
            {label:"Rat Race 3d",  icon: <Gamepad className="h-5 w-5" />, path:"/game/rat-race"},
            {label:"Project Titan",  icon: <Gamepad className="h-5 w-5" />, path:"/game/titan"},
          ]},
          {label : "Negotiation ", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Negotiation Protocol",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation-protocol"},
            {label:"Negotiation2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation2"},
          ]},
          {label : "Sales and Marketing", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Sector Shaker",  icon: <Gamepad className="h-5 w-5" />, path:"/game/sector-shaker"},
            {label:"Marketing Strategy",  icon: <Gamepad className="h-5 w-5" />, path:"/game/marketing-strategy"},
            {label:"STRATSIM",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim"},
            {label:"STRATSIM 2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim2"},
          ]},
          {label : "Human Resource Development", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Netritva",  icon: <Gamepad className="h-5 w-5" />, path:"/game/netrvita"},
          ]},
           {label : "Project Management", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Project Taxila",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/project-management"},
            {label:"Ledership Challange ",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/leadership-challange"},
          ]},
          {label : "Strategy", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Capital Quest",  icon: <Gamepad className="h-5 w-5" />, path:"/game/quest"},
            {label:"Indian Business Strategy",  icon: <Gamepad className="h-5 w-5" />, path:"/game/indian-business"},
          ]},
          {label : "Critical Thinking", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Last City",  icon: <Gamepad className="h-5 w-5" />, path:"/game/lastcity"},
            {label:"Idea Generation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/idea-generator"},
          ]},
          {label : "Consulting/Business Analytics", icon: <Sheet className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Ecosystem",  icon: <Globe className="h-5 w-5" />, path:"/game/taxila-eco"},
            {label:"Taxila Solve",  icon: <Puzzle className="h-5 w-5" />, path:"/game/taxila-solve"},
            {label:"Sariska Hills",  icon: <Dog className="h-5 w-5" />, path:"/game/sariska"},
            {label:"Samudra Rakshak",  icon: <FishIcon className="h-5 w-5" />, path:"/game/samudra-rakshak"},
          ]},
          {label : "Quality Management", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Six Sigma Simulation",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/six-sigma"},
          ]},
           {label : "Economics", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Airthniti",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/airthniti"},
          ]},
            {label:"Interview",  icon: <WholeWord className="h-5 w-5" />, path:"/game/interview-preparation"},
           {label:"Wordify",  icon: <Gamepad className="h-5 w-5" />, path:"/game/wordfy"},
           {label:"Public Speaking",  icon: <SpeakerIcon className="h-5 w-5" />, path:"/game/public-speaking"},
          ]},
      ],
    },
    {
      label: "Accounts",
      icon: <IndianRupee className="h-5 w-5" />,
      subMenu: [
        { label: "Fee Details Student", path: "/fees-management" },
        { label: "Fee Management", path: "/accounts/fee-type" },
        { label: "Coupon Management", path: "/accounts/coupon" },
        { label: "Transactions", path: "/accounts/transactions" },
      ],
    },
  ]

  export const Staff = [
    { label: "Task Manager", icon: <WorkflowIcon className="h-5 w-5" />, path: "/staff/task-manager" },
    {label : "Simulations", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Startup Simluation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/simulation"},
             {label:"Guesstimation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/guesstimations"},
            {label : "Finance", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
                          {label:"Accouting Cycle",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/accounting-cycle"},
                          {label:"Fund Manager",  icon: <DollarSign className="h-5 w-5" />, path:"/game/fund-manager"},
                          {label:"Financial Modeling - 1",  icon: <IndianRupeeIcon className="h-5 w-5" />, path:"/game/financial-modeling"},
            {label:"Rat Race 3d",  icon: <Gamepad className="h-5 w-5" />, path:"/game/rat-race"},
            {label:"Project Titan",  icon: <Gamepad className="h-5 w-5" />, path:"/game/titan"},
          ]},
          {label : "Negotiation ", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Negotiation Protocol",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation-protocol"},
            {label:"Negotiation2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation2"},
          ]},
         {label : "Sales and Marketing", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Sector Shaker",  icon: <Gamepad className="h-5 w-5" />, path:"/game/sector-shaker"},
            {label:"Marketing Strategy",  icon: <Gamepad className="h-5 w-5" />, path:"/game/marketing-strategy"},
            {label:"STRATSIM",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim"},
            {label:"STRATSIM 2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim2"},
          ]},
          {label : "Human Resource Development", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Netritva",  icon: <Gamepad className="h-5 w-5" />, path:"/game/netrvita"},
          ]},
          {label : "Consumer Behaviour", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Hyper-Competitive Consumer Simulation",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/consumer-behaviour"},
          ]},
           {label : "Project Management", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Project Taxila",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/project-management"},
            {label:"Ledership Challange ",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/leadership-challange"},
          ]},
          {label : "Strategy", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Capital Quest",  icon: <Gamepad className="h-5 w-5" />, path:"/game/quest"},
            {label:"Indian Business Strategy",  icon: <Gamepad className="h-5 w-5" />, path:"/game/indian-business"},
          ]},
          {label : "Critical Thinking", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Last City",  icon: <Gamepad className="h-5 w-5" />, path:"/game/lastcity"},
            {label:"Idea Generation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/idea-generator"},
          ]},
          {label : "Consulting/Business Analytics", icon: <Sheet className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Ecosystem",  icon: <Globe className="h-5 w-5" />, path:"/game/taxila-eco"},
            {label:"Taxila Solve",  icon: <Puzzle className="h-5 w-5" />, path:"/game/taxila-solve"},
            {label:"Sariska Hills",  icon: <Dog className="h-5 w-5" />, path:"/game/sariska"},
            {label:"Samudra Rakshak",  icon: <FishIcon className="h-5 w-5" />, path:"/game/samudra-rakshak"},
            {label:"DILIGENCE",  icon: <Gamepad className="h-5 w-5" />, path:"/game/diligence"},
             {label:"Market Research-New Product Launch",  icon: <FishIcon className="h-5 w-5" />, path:"/game/product-launch"},
          ]},
          {label : "Quality Management", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Six Sigma Simulation",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/six-sigma"},
          ]},
           {label : "Economics", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Airthniti",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/airthniti"},
          ]},
            {label:"Interview",  icon: <WholeWord className="h-5 w-5" />, path:"/game/interview-preparation"},
           {label:"Wordify",  icon: <Gamepad className="h-5 w-5" />, path:"/game/wordfy"},
           {label:"Public Speaking",  icon: <SpeakerIcon className="h-5 w-5" />, path:"/game/public-speaking"},
          ]},
  ]
export const EPGDMAdmin = [
    { label: "Faculty Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/" },
    {
      label: "Academics",
      icon: <PenSquareIcon className="h-5 w-5" />,
      subMenu: [
        { label: "Upload Videos", path: "/epgdm/subjects" },
        { label: "Subjects", path: "/epgdm/subjects" },
      ],
    },
   
    {
      label: "Imp. News & Notice",
      icon: <NewspaperIcon className="h-5 w-5" />,
      path: "/notice/noticeboard" 
    },
    { label: "Events", icon: <CalendarIcon className="h-5 w-5" />, path: "/events" },
    { label: "Game Guides", icon: <DocumentIcon className="h-5 w-5" />, path: "/game-guides" },
    {label : "Simulations", icon: <Gamepad className="h-5 w-5" />,  hasSubMenu:true,  subMenu : [
            {label:"Startup Simulation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/simulation"},
             {label:"Guesstimation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/guesstimations"},
            {label : "Finance", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
               {label:"Accouting Cycle",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/accounting-cycle"},
               {label:"Financial Modeling - 1",  icon: <IndianRupeeIcon className="h-5 w-5" />, path:"/game/financial-modeling"},
            {label:"Rat Race 3d",  icon: <Gamepad className="h-5 w-5" />, path:"/game/rat-race"},
            {label:"Project Titan",  icon: <Gamepad className="h-5 w-5" />, path:"/game/titan"},
          ]},
          {label : "Negotiation ", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Negotiation Protocol",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation-protocol"},
            {label:"Negotiation2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/negotiation2"},
          ]},
         {label : "Sales and Marketing", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Sector Shaker",  icon: <Gamepad className="h-5 w-5" />, path:"/game/sector-shaker"},
            {label:"Marketing Strategy",  icon: <Gamepad className="h-5 w-5" />, path:"/game/marketing-strategy"},
            {label:"STRATSIM",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim"},
            {label:"STRATSIM 2",  icon: <Gamepad className="h-5 w-5" />, path:"/game/stratsim2"},
          ]},
          {label : "Human Resource Development", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Netritva",  icon: <Gamepad className="h-5 w-5" />, path:"/game/netrvita"},
          ]},
          {label : "Project Management", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Project Taxila",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/project-management"},
            {label:"Ledership Challange ",  icon: <ProjectorIcon className="h-5 w-5" />, path:"/game/leadership-challange"},
          ]},
         {label : "Critical Thinking", icon: <Gamepad className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Last City",  icon: <Gamepad className="h-5 w-5" />, path:"/game/lastcity"},
            {label:"Idea Generation",  icon: <Gamepad className="h-5 w-5" />, path:"/game/idea-generator"},
          ]},
          {label : "Strategy", icon: <Brain className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Capital Quest",  icon: <Gamepad className="h-5 w-5" />, path:"/game/quest"},
            {label:"Indian Business Strategy",  icon: <BriefcaseBusiness className="h-5 w-5" />, path:"/game/indian-business"},
          ]},
           {label : "Economics", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Airthniti",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/airthniti"},
          ]},
            {label : "Consumer Behaviour", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Hyper-Competitive Consumer Simulation",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/consumer-behaviour"},
            {label:"ICBS",  icon: <UserCheck className="h-5 w-5" />, path:"/game/indian-consumer"},
          ]},
         {label : "Consulting/Business Analytics", icon: <Sheet className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Taxila Ecosystem",  icon: <Globe className="h-5 w-5" />, path:"/game/taxila-eco"},
            {label:"Taxila Solve",  icon: <Puzzle className="h-5 w-5" />, path:"/game/taxila-solve"},
            {label:"Sariska Hills",  icon: <Dog className="h-5 w-5" />, path:"/game/sariska"},
            {label:"Samudra Rakshak",  icon: <FishIcon className="h-5 w-5" />, path:"/game/samudra-rakshak"},
             {label:"Market Research-New Product Launch",  icon: <FishIcon className="h-5 w-5" />, path:"/game/product-launch"},
          ]},
          {label : "Quality Management", icon: <Calculator className="h-5 w-5" />, hasSubMenu:true,  subMenu : [
            {label:"Six Sigma Simulation",  icon: <CalendarCheck2Icon className="h-5 w-5" />, path:"/game/six-sigma"},
          ]},
           {label:"Wordify",  icon: <WholeWord className="h-5 w-5" />, path:"/game/wordfy"},
           {label:"Interview",  icon: <Briefcase className="h-5 w-5" />, path:"/game/interview-preparation"},
           {label:"Public Speaking",  icon: <SpeakerIcon className="h-5 w-5" />, path:"/game/public-speaking"},
          ]},
           {
      label: "Support",
      icon: <HelpCircleIcon className="h-5 w-5" />,
      path: "/help/support" 
    },
  ];
 export const EPGDMStudnets = [
    { label: "Dashboard", icon: <HomeIcon className="h-5 w-5" />, path: "/student" },
    { label: "Subject", icon: <BookCheckIcon className="h-5 w-5" />, path: "/student/subject" },
     { label: "Marks", icon: <DocumentChartBarIcon className="h-5 w-5" />, path: "/student/marks" },
     {
      label: "Support",
      icon: <HelpCircleIcon className="h-5 w-5" />,
      path: "/help/support" 
    },

  ];

  export const PlacementHead = [
     { label: "Leave Management", icon: <Paperclip className="h-5 w-5" />, path: "/leaves" },
       {
      label: "Internship & Placement",
      icon: <Building2Icon className="h-5 w-5" />,
      subMenu: [
        { label: "Internship Management", path: "/internship/admin" },
      ],
    },

  ];
  