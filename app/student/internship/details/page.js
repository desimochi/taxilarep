"use client";

// import { authFetch } from "@/app/lib/fetchWithAuth";
// import { GlobalContext } from "@/components/GlobalContext";
// import { useContext, useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   Building2,
//   Calendar,
//   MapPin,
//   User,
//   Phone,
//   FileText,
//   Upload,
//   X,
//   CheckCircle2,
//   Clock,
//   Briefcase,
//   Eye,
//   AlertCircle,
//   Plus,
// } from "lucide-react";
// import { useSearchParams } from "next/navigation";

// /* ---------------- HELPERS ---------------- */
// const getTotalWeeks = (start, end) => {
//   const s = new Date(start);
//   const e = new Date(end);
//   const diffDays = Math.floor((e - s) / (1000 * 60 * 60 * 24));
//   return Math.floor(diffDays / 7);
// };

// const getWeekDates = (internshipStartDate, weekNumber) => {
//   const start = new Date(internshipStartDate);

//   // Calculate week start date
//   const weekStart = new Date(start);
//   weekStart.setDate(start.getDate() + (weekNumber - 1) * 7);

//   // Find the next Wednesday from week start
//   const deadline = new Date(weekStart);
//   const dayOfWeek = weekStart.getDay(); // 0=Sunday, 3=Wednesday
//   const daysUntilWednesday = (3 - dayOfWeek + 7) % 7;
  
//   // If week starts on Wednesday, deadline is same day; otherwise find next Wednesday
//   deadline.setDate(weekStart.getDate() + (daysUntilWednesday === 0 ? 0 : daysUntilWednesday));
//   deadline.setHours(23, 59, 59, 999);

//   return {
//     weekStart,
//     deadline,
//     canUpload: new Date() <= deadline,
//   };
// };

const formatDateTime = (date) =>
  date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDateShort = (date) =>
  date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
  });

// const getIframeUrl = (url) =>
//   `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`;

// const getStatusInfo = (canUpload, hasReport) => {
//   if (hasReport) {
//     return {
//       label: "Submitted",
//       color: "bg-emerald-50 text-emerald-700 border-emerald-200",
//       icon: CheckCircle2,
//     };
//   }
//   if (!canUpload) {
//     return {
//       label: "Overdue",
//       color: "bg-red-50 text-red-700 border-red-200",
//       icon: AlertCircle,
//     };
//   }
//   return {
//     label: "Pending",
//     color: "bg-amber-50 text-amber-700 border-amber-200",
//     icon: Clock,
//   };
// };

// /* ---------------- MAIN ---------------- */
// export default function InternshipPage() {
//   const { state } = useContext(GlobalContext);
//   const studentId = state.user_id;
// const searchParams = useSearchParams();
// const compId = searchParams.get("compId");
// const subId = searchParams.get("subId");
//   const [internships, setInternships] = useState([]);
//   const [reports, setReports] = useState([]);
// const [companies, setCompanies] = useState([]);
//   const [reportModal, setReportModal] = useState(false);
//   const [viewReportModal, setViewReportModal] = useState(false);
//   const [reportInfo, setReportInfo] = useState(null);
//   const [reportFile, setReportFile] = useState(null);
//    const [open, setOpen] = useState(false);
//   const [viewReportUrl, setViewReportUrl] = useState(null);
//     const [form, setForm] = useState({
//       company_name: "",
//       start_date: "",
//       end_date: "",
//       mentor_name: "",
//       mentor_mobile_number: "",
//       location: "",
//       campus_joining_date: "",
//       offer_letter: null,
//     });
// const fetchCompanies = async () => {
//     const res = await authFetch(`company-viewset`);
//     const data = await res.json();
//     setCompanies(data.data || []);
//   };
//   const fetchInternships = async () => {
//     const res = await authFetch(
//       `internship-company-student-wise/${studentId}`
//     );
//     const data = await res.json();
//     setInternships(data.data || []);
//   };

//   const fetchReports = async () => {
//     const res = await authFetch(
//       `report-student-wise/${studentId}/${compId}`
//     );
//     const data = await res.json();
//     setReports(data.data || []);
//   };

//   useEffect(() => {
//     fetchCompanies();
//     fetchInternships();
//     fetchReports();
//   }, []);

//   const getWeeklyReportUrl = (week) => {
//     const report = reports[0];
//     return report?.weekly_report?.[week]
//       ? `https://taxila.in/media/${report.weekly_report[week]}`
//       : null;
//   };

//   const getFinalReportUrl = () => {
//     const report = reports[0];
//     return report?.weekly_report?.[0]
//       ? `https://taxila.in/media/${report.weekly_report[0]}`
//       : null;
//   };
//  const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     fd.append("subject_mapping", subId);
//     fd.append("student", studentId);
//     Object.entries(form).forEach(([k, v]) => fd.append(k, v));

//     const res = await authFetch(`intership-company-viewset`, {
//       method: "POST",
//       body: fd,
//     });

//     if (res.ok) {
//       toast.success("Internship added successfully! 🎉");
//       setOpen(false);
//       fetchInternships();
//     } else {
//       toast.error("Failed to submit internship");
//     }
//   };
//   const submitReport = async () => {
//     if (!reportFile) return toast.error("Upload file");

//     const fd = new FormData();
//     fd.append("student", studentId);
//     fd.append("component", compId);
//     fd.append("week", reportInfo.week);
//     fd.append("weekly_report", reportFile);

//     const res = await authFetch(`internship-report-upload`, {
//       method: "POST",
//       body: fd,
//     });

//     if (res.ok) {
//       toast.success("Report uploaded");
//       setReportModal(false);
//       setReportFile(null);
//       fetchReports();
//     } else toast.error("Upload failed");
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Page Header */}
//         <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//           <div className="flex items-center gap-3 justify-between">
//             <div className="flex items-center gap-3" >
//             <div className="bg-slate-900 p-3 rounded-lg">
//               <Briefcase className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-slate-900">My Internships</h1>
//               <p className="text-sm text-slate-600">Track your progress and submit weekly reports</p>
//             </div>
//             </div>
//               <button
//             onClick={() => setOpen(true)}
//             disabled={internships.length > 0}
//             className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-md font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
//           >
//             <Plus className="w-5 h-5" />
//             Add Internship
//             <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           </button>
//           </div>
//         </div>

//         {internships.map((i) => {
//           const totalWeeks = getTotalWeeks(i.start_date, i.end_date);
//           const submittedCount = Array.from({ length: totalWeeks }).filter(
//             (_, idx) => getWeeklyReportUrl(idx + 1)
//           ).length;

//           return (
//             <div key={i.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
//               {/* Company Header */}
//               <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
//                 <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                   <div className="space-y-2">
//                     <h2 className="text-2xl font-bold flex items-center gap-3">
//                       <Building2 className="w-6 h-6" />
//                       {i.company_name?.name}
//                     </h2>
//                     <p className="text-slate-300 flex items-center gap-2 text-sm">
//                       <MapPin className="w-4 h-4" />
//                       {i.location}
//                     </p>
//                   </div>
//                   <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
//                     <div className="text-xs text-slate-300 mb-1">Progress</div>
//                     <div className="text-2xl font-bold">
//                       {submittedCount}/{totalWeeks}
//                     </div>
//                     <div className="text-xs text-slate-300">weeks completed</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Internship Details */}
//               <div className="p-6 bg-slate-50 border-b border-slate-200">
//                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">
//                     <Calendar className="w-5 h-5 text-slate-600 mt-0.5" />
//                     <div>
//                       <div className="text-xs text-slate-500 font-medium">Start Date</div>
//                       <div className="text-sm font-semibold text-slate-900 mt-1">
//                         {formatDateTime(new Date(i.start_date))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">
//                     <Calendar className="w-5 h-5 text-slate-600 mt-0.5" />
//                     <div>
//                       <div className="text-xs text-slate-500 font-medium">End Date</div>
//                       <div className="text-sm font-semibold text-slate-900 mt-1">
//                         {formatDateTime(new Date(i.end_date))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">
//                     <User className="w-5 h-5 text-slate-600 mt-0.5" />
//                     <div>
//                       <div className="text-xs text-slate-500 font-medium">Mentor</div>
//                       <div className="text-sm font-semibold text-slate-900 mt-1">
//                         {i.mentor_name || "Not Assigned"}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">
//                     <Phone className="w-5 h-5 text-slate-600 mt-0.5" />
//                     <div>
//                       <div className="text-xs text-slate-500 font-medium">Mentor Contact</div>
//                       <div className="text-sm font-semibold text-slate-900 mt-1">
//                         {i.mentor_mobile_number || "—"}
//                       </div>
//                     </div>
//                   </div>

//                   {i.offer_letter && (
//                     <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 md:col-span-2">
//                       <FileText className="w-5 h-5 text-slate-600 mt-0.5" />
//                       <div className="flex-1">
//                         <div className="text-xs text-slate-500 font-medium mb-2">Offer Letter</div>
//                         <a
//                           href={`https://taxila.in/media/${i.offer_letter}`}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
//                         >
//                           <Eye className="w-4 h-4" />
//                           View Document
//                         </a>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Weekly Reports Table */}
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
//                   <FileText className="w-5 h-5" />
//                   Weekly Reports
//                 </h3>

//                 <div className="overflow-x-auto rounded-lg border border-slate-200">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-slate-100 border-b border-slate-200">
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                           Week
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                           Period
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                           Deadline
//                         </th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                           Status
//                         </th>
//                         <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase tracking-wider">
//                           Actions
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-slate-200">
//                       {Array.from({ length: totalWeeks }).map((_, idx) => {
//                         const week = idx + 1;
//                         const { weekStart, deadline, canUpload } =
//                           getWeekDates(i.start_date, week);
//                         const reportUrl = getWeeklyReportUrl(week);
//                         const status = getStatusInfo(canUpload, !!reportUrl);
//                         const StatusIcon = status.icon;

//                         return (
//                           <tr key={week} className="hover:bg-slate-50 transition-colors">
//                             <td className="px-4 py-4 text-sm font-medium text-slate-900">
//                               Week {week}
//                             </td>
//                             <td className="px-4 py-4 text-sm text-slate-600">
//                               {formatDateShort(weekStart)}
//                             </td>
//                             <td className="px-4 py-4 text-sm">
//                               <div className="flex items-center gap-2">
//                                 <Clock className="w-4 h-4 text-slate-400" />
//                                 <span className={canUpload ? "text-slate-600" : "text-red-600 font-medium"}>
//                                   {formatDateTime(deadline)}
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-4 py-4">
//                               <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${status.color}`}>
//                                 <StatusIcon className="w-3.5 h-3.5" />
//                                 {status.label}
//                               </span>
//                             </td>
//                             <td className="px-4 py-4">
//                               <div className="flex items-center justify-center gap-2">
//                                 <button
//                                   disabled={!canUpload}
//                                   onClick={() => {
//                                     setReportInfo({ week });
//                                     setReportModal(true);
//                                   }}
//                                   className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                                     canUpload
//                                       ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
//                                       : "bg-slate-200 text-slate-400 cursor-not-allowed"
//                                   }`}
//                                 >
//                                   <Upload className="w-4 h-4" />
//                                   Upload
//                                 </button>
                                
//                                 {reportUrl ? (
//                                   <button
//                                     onClick={() => {
//                                       setViewReportUrl(reportUrl);
//                                       setViewReportModal(true);
//                                     }}
//                                     className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md transition-all"
//                                   >
//                                     <Eye className="w-4 h-4" />
//                                     View
//                                   </button>
//                                 ) : (
//                                   <div className="w-20 text-center text-sm text-slate-400">—</div>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
                      
//                       {/* Final Report Row */}
//                       <tr className="hover:bg-slate-50 transition-colors bg-blue-50/50">
//                         <td className="px-4 py-4 text-sm font-bold text-blue-900">
//                           Final Report
//                         </td>
//                         <td className="px-4 py-4 text-sm text-slate-600">
//                           —
//                         </td>
//                         <td className="px-4 py-4 text-sm">
//                           <div className="flex items-center gap-2">
//                             <Clock className="w-4 h-4 text-slate-400" />
//                             <span className="text-slate-600">
//                               {formatDateTime(new Date(i.end_date))}
//                             </span>
//                           </div>
//                         </td>
//                         <td className="px-4 py-4">
//                           {getFinalReportUrl() ? (
//                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-emerald-50 text-emerald-700 border-emerald-200">
//                               <CheckCircle2 className="w-3.5 h-3.5" />
//                               Submitted
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-amber-50 text-amber-700 border-amber-200">
//                               <Clock className="w-3.5 h-3.5" />
//                               Pending
//                             </span>
//                           )}
//                         </td>
//                         <td className="px-4 py-4">
//                           <div className="flex items-center justify-center gap-2">
//                             <button
//                               onClick={() => {
//                                 setReportInfo({ week: 0 });
//                                 setReportModal(true);
//                               }}
//                               className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all bg-blue-900 text-white hover:bg-blue-800 hover:shadow-md"
//                             >
//                               <Upload className="w-4 h-4" />
//                               Upload
//                             </button>
                            
//                             {getFinalReportUrl() ? (
//                               <button
//                                 onClick={() => {
//                                   setViewReportUrl(getFinalReportUrl());
//                                   setViewReportModal(true);
//                                 }}
//                                 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-md transition-all"
//                               >
//                                 <Eye className="w-4 h-4" />
//                                 View
//                               </button>
//                             ) : (
//                               <div className="w-20 text-center text-sm text-slate-400">—</div>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* View Report Modal */}
//       {viewReportModal && (
//         <Modal title="View Report" onClose={() => setViewReportModal(false)}>
//           <iframe
//             src={getIframeUrl(viewReportUrl)}
//             className="w-full h-[70vh] rounded-lg border border-slate-200"
//           />
//         </Modal>
//       )}
//  {open && (
//         <Modal title="Add New Internship" onClose={() => setOpen(false)}>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                 <Building2 className="w-4 h-4 text-blue-600" />
//                 Company
//               </label>
//               <select
//                 required
//                 className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
//                 onChange={(e) => setForm({ ...form, company_name: e.target.value })}
//               >
//                 <option value="">Select Company</option>
//                 {companies.map((c) => (
//                   <option key={c.id} value={c.id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-blue-600" />
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   required
//                   className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
//                   onChange={(e) => setForm({ ...form, start_date: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-blue-600" />
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   required
//                   className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
//                   onChange={(e) => setForm({ ...form, end_date: e.target.value })}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                 <User className="w-4 h-4 text-blue-600" />
//                 Mentor Name
//               </label>
//               <input
//                 placeholder="Enter mentor's name"
//                 className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
//                 onChange={(e) => setForm({ ...form, mentor_name: e.target.value })}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                 <Phone className="w-4 h-4 text-blue-600" />
//                 Mentor Mobile
//               </label>
//               <input
//                 placeholder="Enter mobile number"
//                 className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
//                 onChange={(e) => setForm({ ...form, mentor_mobile_number: e.target.value })}
//               />
//             </div>
//   <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-blue-600" />
//                   Location
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
//                   onChange={(e) => setForm({ ...form, location: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                   <Calendar className="w-4 h-4 text-blue-600" />
//                     Campus Joining Date
//                 </label>
//                 <input
//                   type="date"
//                   required
//                   className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
//                   onChange={(e) => setForm({ ...form, campus_joining_date: e.target.value })}
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
//                 <Upload className="w-4 h-4 text-blue-600" />
//                 Offer Letter
//               </label>
//               <div className="relative">
//                 <input
//                   type="file"
//                   required
//                   className="w-full p-3 border-2 border-dashed border-slate-300 rounded-xl focus:border-blue-500 transition-all duration-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100"
//                   onChange={(e) => setForm({ ...form, offer_letter: e.target.files[0] })}
//                 />
//               </div>
//             </div>

//             <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2">
//               <CheckCircle2 className="w-5 h-5" />
//               Submit Internship
//             </button>
//           </form>
//         </Modal>
//       )}
//       {/* Upload Report Modal */}
//       {reportModal && (
//         <Modal
//           title={`Upload Report - Week ${reportInfo.week}`}
//           onClose={() => {
//             setReportModal(false);
//             setReportFile(null);
//           }}
//         >
//           <div className="space-y-4">
//             <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
//               <input
//                 type="file"
//                 id="file-upload"
//                 onChange={(e) => setReportFile(e.target.files[0])}
//                 className="hidden"
//                 accept=".pdf,.doc,.docx"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="cursor-pointer flex flex-col items-center gap-3"
//               >
//                 <Upload className="w-12 h-12 text-slate-400" />
//                 <div>
//                   <p className="text-sm font-medium text-slate-700">
//                     Click to upload or drag and drop
//                   </p>
//                   <p className="text-xs text-slate-500 mt-1">
//                     PDF, DOC, DOCX (Max 10MB)
//                   </p>
//                 </div>
//               </label>
//             </div>
            
//             {reportFile && (
//               <div className="bg-slate-50 rounded-lg p-3 flex items-center gap-3 border border-slate-200">
//                 <FileText className="w-5 h-5 text-slate-600" />
//                 <span className="text-sm text-slate-700 flex-1 truncate">
//                   {reportFile.name}
//                 </span>
//                 <button
//                   onClick={() => setReportFile(null)}
//                   className="text-slate-400 hover:text-slate-600"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             )}

//             <button
//               onClick={submitReport}
//               disabled={!reportFile}
//               className={`w-full py-3 rounded-lg font-medium transition-all ${
//                 reportFile
//                   ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-md"
//                   : "bg-slate-200 text-slate-400 cursor-not-allowed"
//               }`}
//             >
//               Submit Report
//             </button>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// }

// /* ---------------- MODAL ---------------- */
// function Modal({ title, children, onClose }) {
//   return (
//     <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
//         <div className="flex justify-between items-center p-6 border-b border-slate-200 bg-slate-50">
//           <h2 className="text-xl font-bold text-slate-900">{title}</h2>
//           <button
//             onClick={onClose}
//             className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-2 rounded-lg transition-colors"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//         <div className="p-6">{children}</div>
//       </div>
//     </div>
//   );
// }



import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  Building2, Calendar, MapPin, User, Phone, FileText,
  Upload, X, CheckCircle2, Clock, Briefcase, Eye,
  AlertCircle, Plus, Sparkles, Send, Mail,
  Link
} from "lucide-react";
import { useSearchParams } from "next/navigation";

/* ---------------- HELPERS ---------------- */
const getTotalWeeks = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  const diffDays = Math.floor((e - s) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.floor(diffDays / 7));
};

const getWeekDates = (internshipStartDate, weekNumber) => {
  const start = new Date(internshipStartDate);
  const weekStart = new Date(start);
  weekStart.setDate(start.getDate() + (weekNumber - 1) * 7);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const deadline = new Date(weekEnd);
  deadline.setDate(weekEnd.getDate() + 1); 
  deadline.setHours(23, 59, 59, 999);
  return { weekStart, weekEnd, deadline, canUpload: new Date() <= deadline };
};

export default function InternshipPage() {
  const { state } = useContext(GlobalContext);
  const studentId = state.user_id;
  const searchParams = useSearchParams();
const rawCompId = searchParams.get("compId");
const directSubId = searchParams.get("subId");

let compId = null;
let subId = null;

if (rawCompId) {
  compId = rawCompId.split("?")[0];

  if (rawCompId.includes("subId=")) {
    subId = rawCompId.split("subId=")[1];
  }
}

// If URL is correct (?compId=272&subId=87), prefer this
if (directSubId) {
  subId = directSubId;
}

console.log({ compId, subId });

console.log("Clean Component ID:", compId)
  const [internships, setInternships] = useState([]);
  const [reports, setReports] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [reportModal, setReportModal] = useState(false);
  const [reportInfo, setReportInfo] = useState(null);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [finalReportFile, setFinalReportFile] = useState(null);
const [finalReportModal, setFinalReportModal] = useState(false);
  // Data State
  const [journalData, setJournalData] = useState({
    bigWin: "",
    skillFocus: "",
    extraMile: "",
    challenges: "",
    dailyLogs: {
        "Monday": "", "Tuesday": "", "Wednesday": "", "Thursday": "", "Friday": ""
    } 
  });

  const [evaluationResult, setEvaluationResult] = useState(null);
  const [form, setForm] = useState({
    company_name: "", start_date: "", end_date: "",
    mentor_name: "", mentor_mobile_number: "", location: "",
    campus_joining_date: "", offer_letter: null,
  });

  /* ---------------- ORIGINAL API CALLS ---------------- */
  const fetchCompanies = async () => {
    const res = await authFetch(`company-viewset`);
    const data = await res.json();
    setCompanies(data.data || []);
  };

  const fetchInternships = async () => {
    const res = await authFetch(`internship-company-student-wise/${studentId}`);
    const data = await res.json();
    setInternships(data.data || []);
  };

  const fetchReports = async () => {
    const res = await authFetch(`report-student-wise/${studentId}/${compId}`);
    const data = await res.json();
    setReports(data.data || []);
  };

  useEffect(() => {
    fetchCompanies();
    fetchInternships();
    fetchReports();
  }, []);

  /* ---------------- AI ANALYSIS LOGIC ---------------- */
 const analyzeWithAI = async () => {
  if (!journalData.bigWin || !journalData.skillFocus) {
    return toast.error("Fill objective & skill first");
  }

  setIsAiAnalyzing(true);
  setEvaluationResult(null);

  try {
    const res = await fetch("/api/analyse-week", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bigWin: journalData.bigWin,
        skillFocus: journalData.skillFocus,
        dailyLogs: journalData.dailyLogs,
      }),
    });

    if (!res.ok) throw new Error("AI failed");

    const result = await res.json();
    setEvaluationResult(result);

    toast.success("AI Coach Analysis Complete!");
  } catch (e) {
    toast.error("AI analysis failed");
  } finally {
    setIsAiAnalyzing(false);
  }
};

const handleSubmit = async (e) => {
     e.preventDefault();

     const fd = new FormData();
    fd.append("subject_mapping", subId);
    fd.append("student", studentId);
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));

     const res = await authFetch(`intership-company-viewset`, {
       method: "POST",
      body: fd,
     });
     if (res.ok) {
       toast.success("Internship added successfully! 🎉");
       setOpen(false);       
       fetchInternships();
     } else {
       toast.error("Failed to submit internship");
     }
   };
  /* ---------------- PROGRESS SUBMISSION ---------------- */
  const submitReport = async () => {
  if (!evaluationResult) {
    return toast.error("Please run the AI Coach analysis first.");
  }

  setIsSubmitting(true);

  try {
    const formData = new FormData();

    formData.append("student", studentId);
    formData.append("component", compId);
    formData.append("main_report", ""); // null not allowed in FormData
    formData.append("weekly_report", evaluationResult.reason);
    formData.append("week", reportInfo.week);
    formData.append("marks", evaluationResult.alignmentScore);

    const res = await authFetch("internship-report-upload", {
      method: "POST",
      body: formData, // ✅ form-data
    });

    if (res.ok) {
      toast.success("Progress report saved!");
      setReportModal(false);
      fetchReports();
    } else {
      toast.error("Submission failed.");
    }
  } catch (error) {
    toast.error("Submission failed.");
  } finally {
    setIsSubmitting(false);
  }
};
const submitFinalReport = async () => {
  if (!finalReportFile) {
    return toast.error("Please upload the final report file.");
  }

  setIsSubmitting(true);

  try {
    const formData = new FormData();

    formData.append("student", studentId);
    formData.append("component", compId);

    // FINAL REPORT FILE
    formData.append("main_report", finalReportFile);
    const res = await authFetch("internship-report-upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      toast.success("Final internship report uploaded successfully!");
      setFinalReportModal(false);
      setFinalReportFile(null);
      fetchReports();
    } else {
      toast.error("Submission failed.");
    }
  } catch (error) {
    toast.error("Submission failed.");
  } finally {
    setIsSubmitting(false);
  }
};


  const draftEmail = () => {
    const logs = Object.entries(journalData.dailyLogs).filter(([_, l]) => l).map(([d, l]) => `${d}: ${l}`).join("\n");
    const body = `Hi,\n\nWeekly Update for Week ${reportInfo.week}:\n\n${logs}\n\nChallenges: ${journalData.challenges}\n\nBest,`;
    window.location.href = `mailto:?subject=Internship Update&body=${encodeURIComponent(body)}`;
  };
const getReportByWeek = (week) => {
  if (!reports || reports.length === 0) return null;
  // Based on your JSON, we check the first item's weekly_report object
  return reports[0].weekly_report?.[week.toString()];
};
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">         <div className="flex items-center gap-3 justify-between">
           <div className="flex items-center gap-3" >            <div className="bg-slate-900 p-3 rounded-lg">
            <Briefcase className="w-6 h-6 text-white" />
           </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">My Internships</h1>
             <p className="text-sm text-slate-600">Track your progress and submit weekly reports</p>
           </div>
            </div>
             <button
           onClick={() => setOpen(true)}
           disabled={internships.length > 0}
           className="group relative bg-gradient-to-r from-red-600 to-red-800 text-white px-6 py-3 rounded-md font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 disabled:hover:scale-100 flex items-center gap-2"
         >
           <Plus className="w-5 h-5" />
           Add Internship
          <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
         </button>
         </div>
       </div>
        {internships.map((i) => (
          <div key={i.id} className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <Building2 className="w-6 h-6" /> {i.company_name}
            </h2>
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6">
               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <Building2 className="w-6 h-6" />
                      {i.company_name}
                    </h2>
                    <p className="text-slate-300 flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                     {i.location}
                   </p>
                 </div>
              
                </div>
             </div>

             {/* Internship Details */}
             <div className="p-6 bg-slate-50 border-b border-slate-200">                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                 <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">
                    <Calendar className="w-5 h-5 text-slate-600 mt-0.5" />                    <div>
                    <div className="text-xs text-slate-500 font-medium">Start Date</div>
                     <div className="text-sm font-semibold text-slate-900 mt-1">
                       {formatDateTime(new Date(i.start_date))}
                     </div>                   </div>                   </div>

                   <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">                    <Calendar className="w-5 h-5 text-slate-600 mt-0.5" />                   <div>
                      <div className="text-xs text-slate-500 font-medium">End Date</div>                      <div className="text-sm font-semibold text-slate-900 mt-1">                        {formatDateTime(new Date(i.end_date))}                     </div>
                   </div>
                </div>

                 <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">                    <User className="w-5 h-5 text-slate-600 mt-0.5" />
                     <div>
                      <div className="text-xs text-slate-500 font-medium">Mentor</div>
                      <div className="text-sm font-semibold text-slate-900 mt-1">
                        {i.mentor_name || "Not Assigned"}
                      </div>
                    </div>
                  </div>

                 <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200">
                  <Phone className="w-5 h-5 text-slate-600 mt-0.5" />
                    <div>                       <div className="text-xs text-slate-500 font-medium">Mentor Contact</div>
                       <div className="text-sm font-semibold text-slate-900 mt-1">
                         {i.mentor_mobile_number || "—"}
                       </div>
                     </div>
                   </div>
                   {i.offer_letter && (
                     <div className="flex items-start gap-3 bg-white p-4 rounded-lg border border-slate-200 md:col-span-2">                      <FileText className="w-5 h-5 text-slate-600 mt-0.5" />
                      <div className="flex-1">
                        <div className="text-xs text-slate-500 font-medium mb-2">Offer Letter</div>                        <a
                         href={`https://taxila.in/media/${i.offer_letter}`}
                         target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          <Eye className="w-4 h-4" />
                         View Document
                        </a>
                      </div>
                    </div>
                )}
                </div>               </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left px-4 py-2 mt-4">
                    <thead>
    <tr className="border-b text-slate-500 text-sm py-2">
        <th className="pb-3">Week</th>
        <th className="pb-3">Status & Marks</th>
        <th className="pb-3 text-center">Action</th>
    </tr>
</thead>
                   <tbody>
  {Array.from({ length: getTotalWeeks(i.start_date, i.end_date) }).map((_, idx) => {
    const weekNum = idx + 1;
    // Find the report object in the array
    const reportData = reports[0]; // Based on your API, data is an array
    const weeklyEntry = reportData?.weekly_report?.[weekNum.toString()];
    const isSubmitted = !!weeklyEntry;

    return (
      <tr key={idx} className="border-b last:border-0 hover:bg-slate-50 transition-colors">
        <td className="py-4 font-medium text-slate-700">Week {weekNum}</td>
        <td className="py-4">
          {isSubmitted ? (
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                Score: {weeklyEntry.marks}/50
              </span>
            </div>
          ) : (
            <span className="text-slate-400 text-xs italic">Not submitted</span>
          )}
        </td>
        <td className="py-4 text-center">
          <button 
            onClick={() => { 
              setReportInfo({ week: weekNum }); 
              setReportModal(true); 
              // Pre-fill result if already submitted to view it
              if (isSubmitted) {
                setEvaluationResult({
                  alignmentScore: weeklyEntry.marks,
                  reason: weeklyEntry.weekly_report
                });
              } else {
                setEvaluationResult(null);
              }
            }}
            className={`px-4 py-2 rounded-lg text-sm transition-all font-semibold ${
              isSubmitted 
                ? "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50" 
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            {isSubmitted ? "View Report" : "Journal & Submit"}
          </button>
        </td>
      </tr>
    );
  })}
</tbody>
                </table>
               <div className="mt-6">
  {reports?.[0]?.main_report ? (
    /* -------- SUBMITTED STATE -------- */
    <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-6 py-4">
      
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-900">
            Final Internship Report
          </p>
          <p className="text-xs text-green-600 font-medium">
            Submitted Successfully
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <a
        href={`https://taxila.in${reports[0].main_report}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 hover:text-blue-800 transition"
      >
        <Eye className="w-4 h-4" />
        View Report
      </a>
    </div>
  ) : (
    /* -------- NOT SUBMITTED STATE -------- */
    <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-6 py-4">
      
      {/* LEFT */}
      <div>
        <p className="text-sm font-semibold text-slate-900">
          Final Internship Report
        </p>
        <p className="text-xs text-slate-500">
          Upload your final internship report (PDF / DOC)
        </p>
      </div>

      {/* RIGHT */}
      <button
        onClick={() => setFinalReportModal(true)}
        className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition shadow-sm"
      >
        Upload Report
      </button>
    </div>
  )}
</div>

            </div>
          </div>
        ))}
      </div>
{finalReportModal && (
  <Modal
    title="Upload Final Internship Report"
    onClose={() => setFinalReportModal(false)}
  >
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700">
        Final Report (PDF / DOC)
      </label>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="w-full border p-2 rounded"
        onChange={(e) => setFinalReportFile(e.target.files[0])}
      />

      <button
        disabled={!finalReportFile || isSubmitting}
        onClick={submitFinalReport}
        className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold disabled:opacity-40"
      >
        Submit Final Report
      </button>
    </div>
  </Modal>
)}
      {reportModal && (
        <Modal title={`Week ${reportInfo.week} Journal & Coach`} onClose={() => setReportModal(false)}>
          <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">
            
            {/* Part 1: Objectives */}
            <div className="space-y-4 bg-slate-50 p-4 rounded-lg border">
                <h3 className="text-sm font-bold text-slate-500 uppercase">Part 1: Weekly Planning</h3>
                <input 
                    className="w-full p-2 border rounded" placeholder="Main Objective (Big Win)" 
                    value={journalData.bigWin} onChange={(e) => setJournalData({...journalData, bigWin: e.target.value})}
                />
                <input 
                    className="w-full p-2 border rounded" placeholder="Skill Focus" 
                    value={journalData.skillFocus} onChange={(e) => setJournalData({...journalData, skillFocus: e.target.value})}
                />
            </div>

            {/* Part 2: Daily Logs */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-500 uppercase">Part 2: Daily Activity Log</h3>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
                    <div key={day} className="flex gap-2 items-center">
                        <span className="w-20 text-xs font-bold text-slate-400">{day}</span>
                        <input 
                            className="flex-1 p-2 border rounded text-sm" placeholder="What did you achieve?" 
                            value={journalData.dailyLogs[day]}
                            onChange={(e) => setJournalData({
                                ...journalData, dailyLogs: {...journalData.dailyLogs, [day]: e.target.value}
                            })}
                        />
                    </div>
                ))}
            </div>

            {/* Part 3: AI Analysis DISPLAY */}
            {evaluationResult && (
                <div className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-bold text-purple-900">AI Evaluation Report</span>
                        <span className="px-2 py-0.5 bg-purple-200 text-purple-900 rounded text-xs font-bold">Score: {evaluationResult.alignmentScore}/50</span>
                    </div>
                    <p className="text-xs text-purple-700 italic leading-relaxed">"{evaluationResult.reason}"</p>
                </div>
            )}

            {/* Buttons */}
            {getReportByWeek(reportInfo?.week) ? (
    <div className="p-4 bg-blue-50 text-blue-800 rounded-lg text-sm text-center font-medium">
        This report has already been submitted.
    </div>
) :(
            <div className="space-y-3 pt-4 border-t sticky bottom-0 bg-white pb-2">
                <button 
                    onClick={analyzeWithAI} disabled={isAiAnalyzing}
                    className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-xl font-bold hover:bg-purple-700 disabled:opacity-50 shadow-md shadow-purple-200"
                >
                    {isAiAnalyzing ? <Clock className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                    Coach Progress (Analyze with AI)
                </button>

                <div className="grid grid-cols-2 gap-3">
                    <button 
                        onClick={submitReport} disabled={!evaluationResult || isSubmitting}
                        className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-30 shadow-md"
                    >
                        <CheckCircle2 className="w-4 h-4" /> Submit Report
                    </button>
                    <button onClick={draftEmail} className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-md">
                        <Mail className="w-4 h-4" /> Draft Mail
                    </button>
                </div>
            </div> ) }
          </div>
        </Modal>
      )}
      {open && (
     <Modal title="Add New Internship" onClose={() => setOpen(false)}>
       <form onSubmit={handleSubmit} className="space-y-4">
                   <div className="space-y-2">             <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
           <Building2 className="w-4 h-4 text-blue-600" />
               Company
             </label>
             <input
                 type="text"
                required
                 className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                  onChange={(e) => setForm({ ...form, company_name: e.target.value })}                />
           </div>

           <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Start Date                 </label>
              <input
                 type="date"
                required
                 className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                  onChange={(e) => setForm({ ...form, start_date: e.target.value })}                />
            </div>
              <div className="space-y-2">               <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">                <Calendar className="w-4 h-4 text-blue-600" />               End Date
                </label>
                <input
                 type="date"
                 required
                 className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                 onChange={(e) => setForm({ ...form, end_date: e.target.value })}
               />
          </div>
           </div>

             <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">                 <User className="w-4 h-4 text-blue-600" />
                 Mentor Name
              </label>
              <input
                 placeholder="Enter mentor's name"
                 className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                onChange={(e) => setForm({ ...form, mentor_name: e.target.value })}
               />
             </div>

             <div className="space-y-2">
<label className="text-sm font-semibold text-slate-700 flex items-center gap-2">                 <Phone className="w-4 h-4 text-blue-600" />
                 Mentor Mobile
              </label>
              <input                 placeholder="Enter mobile number"                 className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                 onChange={(e) => setForm({ ...form, mentor_mobile_number: e.target.value })}
              />            </div>
   <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                   <Calendar className="w-4 h-4 text-blue-600" />
                   Location
                </label>
                 <input                   type="text"
                  required
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>
               <div className="space-y-2">                 <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                    Campus Joining Date                 </label>
                <input
                  type="date"                   required
                  className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 outline-none"
                   onChange={(e) => setForm({ ...form, campus_joining_date: e.target.value })}
                />               </div>
             </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                 <Upload className="w-4 h-4 text-blue-600" />
                Offer Letter
               </label>
               <div className="relative">
                 <input
                   type="file"
                   required
                   className="w-full p-3 border-2 border-dashed border-slate-300 rounded-xl focus:border-blue-500 transition-all duration-200 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100"
                   onChange={(e) => setForm({ ...form, offer_letter: e.target.files[0] })}
                 />
               </div>
            </div>

           <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2">
             <CheckCircle2 className="w-5 h-5" />
             Submit Internship
            </button>
          </form>
      </Modal>
     )}    
                    
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}