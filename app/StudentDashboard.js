"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  CircleHelp,
  GraduationCap,
  IndianRupee,
  RefreshCw,
  Search,
  TrendingUp,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";

const ATTENDANCE_MINIMUM = 75;

async function getJson(endpoint, options) {
  const response = await authFetch(endpoint, options);
  if (!response?.ok) {
    throw new Error(`Request failed: ${endpoint}`);
  }
  return response.json();
}

function asArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.results)) return value.results;
  return [];
}

function numeric(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function termIdFrom(value) {
  if (value && typeof value === "object") return value.id ?? "";
  return value ?? "";
}

function termLabel(term, termsById) {
  if (term && typeof term === "object") return term.name || String(term.id || "");
  return termsById.get(String(term))?.name || (term ? String(term) : "Term unavailable");
}

function subjectKey(termId, code, name) {
  const identifier = code || name || "unknown";
  return `${String(termId || "")}:${String(identifier).trim().toLowerCase()}`;
}

function normalizeAttendance(item, termsById) {
  const mapping = item?.subject_mapping || {};
  const subject = mapping.subject || {};
  const attendanceRecords = asArray(item?.attendance);
  const presentRecords = attendanceRecords.filter(
    (record) => String(record?.status || "").toLowerCase() === "present"
  );
  const countedRecords = attendanceRecords.filter((record) =>
    ["present", "absent", "late"].includes(String(record?.status || "").toLowerCase())
  );

  let percentage = numeric(item?.attended_percentage);
  if (percentage === null && countedRecords.length > 0) {
    percentage = (presentRecords.length / countedRecords.length) * 100;
  }

  return {
    code: subject.subject_code || subject.code || subject.course_code || "",
    name: subject.name || item?.subject_name || "",
    termId: mapping?.term?.id ?? mapping?.term ?? "",
    term: termLabel(mapping?.term, termsById),
    faculty: [mapping?.faculty?.first_name, mapping?.faculty?.last_name].filter(Boolean).join(" "),
    attendancePct: percentage,
    attendedCount: numeric(item?.attended_classes) ?? (countedRecords.length ? presentRecords.length : null),
    completedClasses: numeric(mapping?.classes_completed) ?? (countedRecords.length || null),
    totalClasses: numeric(mapping?.total_classes),
    type: mapping?.type || "",
    breakdown: [],
  };
}

function resultStatus(row) {
  const grade = String(row?.grade || "").trim().toUpperCase();
  const score = numeric(row?.scaled_total_marks);
  if (["F", "FAIL", "FAILED", "AB", "U"].includes(grade) || (score !== null && score < 50)) {
    return "Failed";
  }
  if (grade === "IP" || grade === "IN PROGRESS") return "Ongoing";
  if (grade || score !== null) return "Passed";
  return "Pending";
}

function parseDate(value) {
  if (!value) return null;
  const text = String(value).trim();
  const indiaDate = text.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
  if (indiaDate) {
    const [, day, month, year] = indiaDate;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
  const date = value instanceof Date ? value : parseDate(value);
  return date
    ? date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : "Date unavailable";
}

function formatMoney(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function makeStudentModel({
  appUser,
  profile,
  attendanceRows,
  subjectRows,
  resultsByTerm,
  marksByTerm,
  terms,
  fees,
  exams,
  notices,
  availability,
  updatedAt,
}) {
  const termsById = new Map(terms.map((term) => [String(term.id), term]));
  const subjects = new Map();

  const ensureSubject = ({ termId, code, name, term }) => {
    const key = subjectKey(termId, code, name);
    let subject = subjects.get(key);
    if (!subject) {
      const nextCode = String(code || "").trim().toLowerCase();
      const nextName = String(name || "").trim().toLowerCase();
      subject = Array.from(subjects.values()).find((existing) => {
        if (String(existing.termId || "") !== String(termId || "")) return false;
        const existingCode = String(existing.code || "").trim().toLowerCase();
        const existingName = String(existing.name || "").trim().toLowerCase();
        const sameCode = nextCode && existingCode && nextCode === existingCode;
        const sameNameWithoutConflictingCodes = nextName && nextName === existingName &&
          (!nextCode || !existingCode || nextCode === existingCode);
        return sameCode || sameNameWithoutConflictingCodes;
      });
    }
    if (!subject) {
      subject = {
        key,
        code: code || "",
        name: name || "Subject",
        termId: termId || "",
        term: term || termLabel(termId, termsById),
        faculty: "",
        attendancePct: null,
        attendedCount: null,
        completedClasses: null,
        totalClasses: null,
        score: null,
        grade: "",
        status: "Pending",
        credits: null,
        breakdown: [],
      };
      subjects.set(key, subject);
    } else {
      if (code && !subject.code) subject.code = code;
      if (name && (!subject.name || subject.name === "Subject")) subject.name = name;
      if (term && (!subject.term || subject.term === "Term unavailable")) subject.term = term;
    }
    return subject;
  };

  for (const item of subjectRows) {
    const subject = item?.subject || {};
    const termId = item?.term?.id ?? item?.term ?? "";
    ensureSubject({
      termId,
      code: subject.subject_code || subject.code || "",
      name: subject.name || item?.subject_name,
      term: termLabel(item?.term, termsById),
    }).type = item?.type || "";
  }

  for (const item of attendanceRows) {
    const attendance = normalizeAttendance(item, termsById);
    const subject = ensureSubject(attendance);
    subject.faculty = attendance.faculty || subject.faculty;
    subject.attendancePct = attendance.attendancePct;
    subject.attendedCount = attendance.attendedCount;
    subject.completedClasses = attendance.completedClasses;
    subject.totalClasses = attendance.totalClasses;
    subject.type = attendance.type || subject.type;
  }

  for (const resultSet of resultsByTerm) {
    for (const row of asArray(resultSet?.json?.data)) {
      const subject = ensureSubject({
        termId: resultSet.term?.id,
        code: row.subject_code || row.code || "",
        name: row.subject_name || row.name,
        term: resultSet.term?.name,
      });
      subject.score = numeric(row.scaled_total_marks);
      subject.grade = row.grade || "";
      subject.status = resultStatus(row);
      subject.credits = numeric(row.credit);
    }
  }

  const marksResultRows = [];
  for (const resultSet of marksByTerm) {
    for (const row of asArray(resultSet?.json?.data)) {
      marksResultRows.push({ ...row, termId: resultSet.term?.id, termName: resultSet.term?.name });
    }
  }
  for (const row of marksResultRows) {
    const name = row.subject_name || row.subject?.name || "";
    const code = row.subject_code || row.subject?.subject_code || "";
    const subject = ensureSubject({ termId: row.termId, code, name, term: row.termName });
    subject.breakdown = asArray(row.component_marks).map((component) => ({
      name: component.component_name || component.name || "Component",
      obtained: numeric(component.obtained_marks),
      maximum: numeric(component.max_marks),
    }));
  }

  const subjectList = Array.from(subjects.values()).sort((a, b) => {
    const termCompare = String(a.term).localeCompare(String(b.term), undefined, { numeric: true });
    return termCompare || a.name.localeCompare(b.name);
  });

  const attendanceSubjects = subjectList.filter(
    (subject) => subject.attendancePct !== null && subject.completedClasses !== 0
  );
  const countableAttendance = attendanceSubjects.filter(
    (subject) => subject.completedClasses > 0
  );
  let overallAttendance = null;
  if (countableAttendance.length > 0) {
    const classes = countableAttendance.reduce(
      (sum, subject) => sum + Number(subject.completedClasses || 0),
      0
    );
    overallAttendance = classes > 0
      ? countableAttendance.reduce(
          (sum, subject) => sum + subject.attendancePct * Number(subject.completedClasses || 0),
          0
        ) / classes
      : countableAttendance.reduce((sum, subject) => sum + subject.attendancePct, 0) /
        countableAttendance.length;
  } else if (attendanceSubjects.length > 0) {
    overallAttendance = attendanceSubjects.reduce((sum, subject) => sum + subject.attendancePct, 0) /
      attendanceSubjects.length;
  }

  const failedSubjects = subjectList.filter((subject) => subject.status === "Failed");
  const activeFees = fees.filter((fee) => !fee?.is_delete);
  const unpaidFees = activeFees.filter((fee) => !fee?.is_paid);
  const paidFees = activeFees.filter((fee) => Boolean(fee?.is_paid));
  const totalDue = unpaidFees.reduce((sum, fee) => sum + (numeric(fee.amount) || 0), 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const upcomingExams = exams
    .map((exam) => ({ ...exam, parsedDate: parseDate(exam.date) }))
    .filter((exam) => exam.parsedDate && exam.parsedDate >= today)
    .sort((a, b) => a.parsedDate - b.parsedDate);

  const latestResult = [...resultsByTerm]
    .reverse()
    .find((resultSet) => numeric(resultSet?.json?.extra?.cgpa) !== null);
  const currentResult = resultsByTerm.find((resultSet) => resultSet?.isCurrent);
  const gpaValue = currentResult?.json?.extra?.gpa ?? latestResult?.json?.extra?.gpa;
  const cgpaValue = currentResult?.json?.extra?.cgpa ?? latestResult?.json?.extra?.cgpa;
  const hasPublishedResults = resultsByTerm.some((resultSet) =>
    asArray(resultSet?.json?.data).length > 0 ||
    numeric(resultSet?.json?.extra?.cgpa) !== null
  );
  const coursesPassed = subjectList.filter((subject) => subject.status === "Passed");
  const passedCredits = coursesPassed.reduce((sum, subject) => sum + (subject.credits || 0), 0);

  const generatedAlerts = [];
  for (const subject of attendanceSubjects.filter(
    (item) => item.attendancePct < ATTENDANCE_MINIMUM
  )) {
    generatedAlerts.push({
      id: `attendance-${subject.key}`,
      severity: "warning",
      department: "Attendance",
      title: `Attendance below ${ATTENDANCE_MINIMUM}%: ${subject.name}`,
      description: `${subject.attendancePct.toFixed(1)}% attendance recorded for ${subject.term}.`,
      time: "From attendance records",
    });
  }
  for (const subject of failedSubjects) {
    generatedAlerts.push({
      id: `result-${subject.key}`,
      severity: "critical",
      department: "Examination",
      title: `Result requires attention: ${subject.name}`,
      description: `The published result for ${subject.term} shows ${subject.grade || "a failing score"}.`,
      time: "From published results",
    });
  }
  if (unpaidFees.length > 0) {
    generatedAlerts.push({
      id: "unpaid-fees",
      severity: "warning",
      department: "Accounts",
      title: "Pending fee records",
      description: `${unpaidFees.length} unpaid fee record(s), totaling ${formatMoney(totalDue)}.`,
      time: "From fee records",
    });
  }

  const noticeAlerts = notices.map((notice, index) => ({
    id: notice.id || `notice-${index}`,
    severity: notice.is_important || notice.priority === "high" ? "warning" : "info",
    department: notice.department?.name || notice.department || "Notice Board",
    title: notice.title || notice.subject || "Notice",
    description: notice.description || notice.content || notice.message || "Open the notice for details.",
    time: notice.date || notice.created_at || "",
    href: notice.id ? `/notice/noticeboard/see-notice/${notice.id}` : "/notice/noticeboard",
  }));

  const currentUserName =
    [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
    profile.name ||
    appUser?.name ||
    "Student";
  const currentTermId = termIdFrom(appUser?.term);
  const currentTerm = termsById.get(String(currentTermId))?.name ||
    (currentTermId ? String(currentTermId) : "");
  const profileSpecialization = profile.specialization || appUser?.specialization;
  const specialization = Array.isArray(profileSpecialization)
    ? profileSpecialization.map((item) => item?.name || item).filter(Boolean).join(", ")
    : profileSpecialization?.name || profileSpecialization || "";

  return {
    name: currentUserName,
    enrollment: profile.enrollment_number || appUser?.enrollment_number || "",
    course: profile.course?.name || profile.course_name || appUser?.course?.name || appUser?.course_name || "",
    batch: profile.batch?.name || appUser?.batch?.name || appUser?.batch || "",
    specialization,
    mentor: profile.mentor_name || profile.mentor?.name || appUser?.mentor_name || "",
    currentTerm,
    updatedAt,
    overallAttendance,
    attendanceSubjects,
    attendanceAvailable: availability.attendance,
    cgpa: numeric(cgpaValue),
    gpa: numeric(gpaValue),
    resultsAvailable: availability.results && hasPublishedResults,
    resultsRequestAvailable: availability.results,
    failedSubjects,
    subjectList,
    passedCredits,
    totalCredits: subjectList.reduce((sum, subject) => sum + (subject.credits || 0), 0),
    activeFees,
    unpaidFees,
    paidFees,
    totalDue,
    feesAvailable: availability.fees,
    upcomingExam: upcomingExams[0] || null,
    examsAvailable: availability.exams,
    alerts: [...generatedAlerts, ...noticeAlerts],
    notices: noticeAlerts,
  };
}

export default function StudentDashboard() {
  const { state } = useContext(GlobalContext);
  const studentId = state?.user_id;
  const enrollment = state?.enrollment_number;
  const currentTermId = termIdFrom(state?.term);
  const [raw, setRaw] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [alertFilter, setAlertFilter] = useState("ALL");
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    if (!studentId) return;
    let isCurrent = true;

    async function loadDashboard() {
      setLoading(true);
      setLoadError("");

      const requests = await Promise.allSettled([
        getJson(`dashboard-student-data/${encodeURIComponent(studentId)}`),
        //getJson(`attendance-summary-filter/${encodeURIComponent(studentId)}`),
        getJson(`attendance-summary-filter/${encodeURIComponent(studentId)}?summary=1`),
        getJson(`subject-student-wise/${encodeURIComponent(studentId)}`),
        getJson(`custom-fee-student-wise/${encodeURIComponent(studentId)}`),
        getJson(`student-wise-exam-list/${encodeURIComponent(studentId)}`),
        getJson("noticeboard-viewset?page=1"),
        getJson("terms-list"),
      ]);
      if (!isCurrent) return;

      const value = (index) => requests[index].status === "fulfilled" ? requests[index].value : null;
      const profile = value(0)?.data || {};
      const attendanceRows = asArray(value(1)?.data);
      const subjectRows = asArray(value(2)?.data);
      const fees = asArray(value(3)?.data);
      const exams = asArray(value(4)?.data);
      const notices = asArray(value(5)?.data);
      const fetchedTerms = asArray(value(6)?.data);
      const termsByKey = new Map(fetchedTerms.map((term) => [String(term.id), term]));
      const relevantTermIds = new Set();
      for (const row of subjectRows) {
        const term = row?.term;
        const id = term?.id ?? term;
        if (id !== null && id !== undefined && id !== "") {
          relevantTermIds.add(String(id));
          if (term && typeof term === "object") termsByKey.set(String(id), term);
        }
      }
      for (const row of attendanceRows) {
        const term = row?.subject_mapping?.term;
        const id = term?.id ?? term;
        if (id !== null && id !== undefined && id !== "") {
          relevantTermIds.add(String(id));
          if (term && typeof term === "object") termsByKey.set(String(id), term);
        }
      }
      if (currentTermId && !termsByKey.has(String(currentTermId))) {
        termsByKey.set(String(currentTermId), { id: currentTermId, name: String(currentTermId) });
      }
      if (currentTermId) relevantTermIds.add(String(currentTermId));
      for (const termId of relevantTermIds) {
        if (!termsByKey.has(termId)) termsByKey.set(termId, { id: termId, name: termId });
      }
      const terms = Array.from(termsByKey.values());
      let resultTerms = terms.filter((term) => relevantTermIds.has(String(term.id)));
      if (resultTerms.length === 0 && currentTermId) {
        resultTerms = [{ id: currentTermId, name: String(currentTermId) }];
      }

      const resultEnrollment = enrollment || profile.enrollment_number;
      const resultRequests = resultEnrollment
        ? await Promise.allSettled(
            resultTerms.map(async (term) => ({
              term,
              isCurrent: String(term.id) === String(currentTermId),
              json: await getJson("student-result", {
                method: "POST",
                body: JSON.stringify({
                  type: "main",
                  term: term.id,
                  enrollment_number: resultEnrollment,
                }),
              }),
            }))
          )
        : [];
      if (!isCurrent) return;

      const resultsByTerm = resultRequests
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value)
        .sort((a, b) => terms.findIndex((term) => String(term.id) === String(a.term.id)) -
          terms.findIndex((term) => String(term.id) === String(b.term.id)));

      const marksRequests = await Promise.allSettled(
        resultTerms.map(async (term) => ({
          term,
          json: await getJson(
            `marks-summary-filter/${encodeURIComponent(studentId)}?term=${encodeURIComponent(term.id)}`
          ),
        }))
      );
      if (!isCurrent) return;
      const marksByTerm = marksRequests
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      const dataAvailability = {
        attendance: requests[1].status === "fulfilled",
        fees: requests[3].status === "fulfilled",
        exams: requests[4].status === "fulfilled",
        results: resultRequests.some((result) => result.status === "fulfilled"),
      };
      const failedSections = Object.entries({
        profile: requests[0],
        attendance: requests[1],
        subjects: requests[2],
        fees: requests[3],
        exams: requests[4],
        notices: requests[5],
      })
        .filter(([, result]) => result.status === "rejected")
        .map(([name]) => name);

      setRaw({
        studentId: String(studentId),
        appUser: state,
        profile,
        attendanceRows,
        subjectRows,
        resultsByTerm,
        marksByTerm,
        terms,
        fees,
        exams,
        notices,
        availability: dataAvailability,
        updatedAt: new Date(),
        failedSections,
      });
      if (failedSections.length > 0 || (resultRequests.length > 0 && !resultsByTerm.length)) {
        setLoadError("Some dashboard sections could not be refreshed. Missing values are left blank.");
      }
      if (marksRequests.length > 0 && !marksByTerm.length) {
        setLoadError("Assessment component marks could not be refreshed. Other values use your available records.");
      }
      setLoading(false);
    }

    loadDashboard().catch((error) => {
      if (!isCurrent) return;
      setLoadError(error?.message || "Could not load student data.");
      setLoading(false);
    });

    return () => {
      isCurrent = false;
    };
  }, [studentId, enrollment, currentTermId, state]);

  const model = useMemo(() => {
    if (!raw || raw.studentId !== String(studentId)) return null;
    return makeStudentModel(raw);
  }, [raw, studentId]);

  const terms = useMemo(() => {
    const uniqueTerms = new Set((model?.subjectList || []).map((subject) => subject.term).filter(Boolean));
    return Array.from(uniqueTerms);
  }, [model]);

  const filteredSubjects = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return (model?.subjectList || []).filter((subject) => {
      const matchesTerm = selectedTerm === "ALL" || subject.term === selectedTerm;
      const matchesStatus = selectedStatus === "ALL" ||
        (selectedStatus === "FAILED" && subject.status === "Failed") ||
        (selectedStatus === "LOW_ATTENDANCE" && subject.attendancePct !== null && subject.attendancePct < ATTENDANCE_MINIMUM);
      const matchesSearch = !normalizedSearch ||
        `${subject.code} ${subject.name} ${subject.term} ${subject.faculty}`.toLowerCase().includes(normalizedSearch);
      return matchesTerm && matchesStatus && matchesSearch;
    });
  }, [model, selectedTerm, selectedStatus, search]);

  const chartData = useMemo(() => (model?.subjectList || [])
    .filter((subject) => subject.attendancePct !== null && subject.score !== null)
    .map((subject) => ({
      subject: subject.code || subject.name,
      attendance: Number(subject.attendancePct.toFixed(1)),
      score: Number(subject.score.toFixed(1)),
    })), [model]);

  const alerts = useMemo(() => {
    const items = model?.alerts || [];
    return alertFilter === "URGENT" ? items.filter((item) => item.severity !== "info") : items;
  }, [model, alertFilter]);

  if (!state || !studentId) {
    return <DashboardMessage title="Loading your student account" detail="Your records will appear here when your account is ready." />;
  }

  if (loading && !model) {
    return <DashboardMessage title="Loading your dashboard" detail="Fetching your attendance, results, fees, and exam schedule." loading />;
  }

  if (!model) {
    return <DashboardMessage title="Dashboard data unavailable" detail={loadError || "We could not load your student records."} />;
  }

  const lowAttendanceCount = model.attendanceSubjects.filter(
    (subject) => subject.attendancePct < ATTENDANCE_MINIMUM
  ).length;
  const nextExam = model.upcomingExam;
  const examName = nextExam?.subject_name || nextExam?.subject?.name || "Upcoming exam";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1520px] space-y-5">
        <section className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-blue-700">Student dashboard</p>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900">Welcome, {model.name}</h1>
            <p className="mt-1 text-sm text-slate-500">Your academic and account summary</p>
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <ProfileValue label="Current term" value={model.currentTerm} />
            <ProfileValue label="Program" value={model.course} />
            <ProfileValue label="Batch" value={model.batch} />
            <ProfileValue label="Specialization" value={model.specialization} />
            <ProfileValue label="Faculty mentor" value={model.mentor} />
            <ProfileValue label="Enrollment" value={model.enrollment} />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <RefreshCw size={14} />
            <span>Updated {model.updatedAt.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span>
          </div>
        </section>

        {loadError && (
          <div role="status" className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <CircleHelp size={17} className="shrink-0" />
            <span>{loadError}</span>
          </div>
        )}

        {(lowAttendanceCount > 0 || model.failedSubjects.length > 0 || model.unpaidFees.length > 0) && (
          <section aria-label="Student alerts" className="space-y-2">
            {lowAttendanceCount > 0 && (
              <AlertBanner tone="amber" icon={<AlertTriangle size={18} />}>
                {lowAttendanceCount} subject{lowAttendanceCount === 1 ? "" : "s"} below the {ATTENDANCE_MINIMUM}% attendance threshold.
              </AlertBanner>
            )}
            {model.failedSubjects.length > 0 && (
              <AlertBanner tone="rose" icon={<AlertTriangle size={18} />}>
                {model.failedSubjects.length} published result{model.failedSubjects.length === 1 ? "" : "s"} need attention.
              </AlertBanner>
            )}
            {model.unpaidFees.length > 0 && (
              <AlertBanner tone="amber" icon={<IndianRupee size={18} />}>
                {model.unpaidFees.length} unpaid fee record{model.unpaidFees.length === 1 ? "" : "s"} totaling {formatMoney(model.totalDue)}.
              </AlertBanner>
            )}
          </section>
        )}

        <section aria-label="Academic summary" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <MetricCard title="Overall attendance" icon={<CheckCircle2 size={20} />} accent="blue">
            <MetricValue value={model.attendanceAvailable && model.overallAttendance !== null ? `${model.overallAttendance.toFixed(1)}%` : "—"} />
            <p className="mt-3 text-xs text-slate-500">
              {model.attendanceAvailable
                ? `${model.attendanceSubjects.length} subject records${lowAttendanceCount ? ` · ${lowAttendanceCount} below ${ATTENDANCE_MINIMUM}%` : ""}`
                : "Attendance data unavailable"}
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${Math.min(100, Math.max(0, model.overallAttendance || 0))}%` }}
              />
            </div>
          </MetricCard>

          <MetricCard title="Cumulative GPA" icon={<TrendingUp size={20} />} accent="emerald">
            <MetricValue value={model.cgpa === null ? "—" : model.cgpa.toFixed(2)} />
            <p className="mt-3 text-xs text-slate-500">
              {model.gpa === null ? "No published term GPA" : `Latest term GPA: ${model.gpa.toFixed(2)}`}
            </p>
          </MetricCard>

          <MetricCard title="Failed subjects" icon={<GraduationCap size={20} />} accent={model.failedSubjects.length ? "rose" : "emerald"}>
            <MetricValue value={model.resultsAvailable ? String(model.failedSubjects.length) : "—"} />
            <p className="mt-3 truncate text-xs text-slate-500">
              {model.resultsAvailable
                ? model.failedSubjects.length
                  ? model.failedSubjects.map((subject) => subject.code || subject.name).join(", ")
                  : "No failures in published results"
                : model.resultsRequestAvailable
                  ? "No published results available yet"
                  : "Published result data unavailable"}
            </p>
          </MetricCard>

          <MetricCard title="Pending fees" icon={<IndianRupee size={20} />} accent="amber">
            <MetricValue value={model.feesAvailable ? formatMoney(model.totalDue) : "—"} />
            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-slate-500">
              <span>{model.feesAvailable ? `${model.unpaidFees.length} unpaid · ${model.paidFees.length} paid` : "Fee data unavailable"}</span>
              <Link href="/student/fees" className="shrink-0 font-semibold text-amber-700 hover:underline">Details</Link>
            </div>
          </MetricCard>

          <MetricCard title="Next scheduled exam" icon={<CalendarDays size={20} />} accent="navy">
            <MetricValue value={model.examsAvailable ? nextExam ? formatDate(nextExam.parsedDate) : "None listed" : "—"} small />
            <p className="mt-3 truncate text-xs text-slate-500">
              {model.examsAvailable ? nextExam ? `${examName}${nextExam.start_time ? ` · ${nextExam.start_time}` : ""}` : "No upcoming exam in your schedule" : "Exam schedule unavailable"}
            </p>
          </MetricCard>
        </section>

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-12">
          <div className="space-y-5 xl:col-span-8">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="space-y-4 border-b border-slate-200 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Attendance and examination results</h2>
                    <p className="mt-1 text-xs text-slate-500">Records associated with your student account</p>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <select
                      value={selectedTerm}
                      onChange={(event) => setSelectedTerm(event.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2"
                      aria-label="Filter by term"
                    >
                      <option value="ALL">All terms</option>
                      {terms.map((term) => <option key={term} value={term}>{term}</option>)}
                    </select>
                    <select
                      value={selectedStatus}
                      onChange={(event) => setSelectedStatus(event.target.value)}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2"
                      aria-label="Filter by status"
                    >
                      <option value="ALL">All records</option>
                      <option value="FAILED">Failed results</option>
                      <option value="LOW_ATTENDANCE">Attendance below {ATTENDANCE_MINIMUM}%</option>
                    </select>
                    <label className="relative">
                      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Search subjects"
                        className="w-48 rounded-lg border border-slate-200 py-2 pl-9 pr-3"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-4 py-3">Term / Subject</th>
                      <th className="px-4 py-3">Attendance</th>
                      <th className="px-4 py-3">Published marks</th>
                      <th className="px-4 py-3">Grade / status</th>
                      <th className="px-4 py-3 text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSubjects.map((subject) => (
                      <tr key={subject.key} className="hover:bg-slate-50/70">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-slate-900">{subject.name}</div>
                          <div className="mt-1 text-xs text-slate-500">{subject.code || "Code unavailable"} · {subject.term}</div>
                        </td>
                        <td className="px-4 py-3">
                          {subject.attendancePct === null ? "—" : (
                            <span className={subject.attendancePct < ATTENDANCE_MINIMUM ? "font-semibold text-rose-700" : "font-semibold text-emerald-700"}>
                              {subject.attendancePct.toFixed(1)}%
                            </span>
                          )}
                          <div className="mt-1 text-xs text-slate-500">
                            {subject.attendedCount !== null && subject.completedClasses !== null
                              ? `${subject.attendedCount}/${subject.completedClasses} recorded sessions`
                              : subject.completedClasses !== null
                                ? `${subject.completedClasses} completed sessions`
                                : "Session count unavailable"}
                          </div>
                        </td>
                        <td className="px-4 py-3">{subject.score === null ? "—" : `${subject.score}/100`}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClass(subject.status)}`}>
                            {subject.grade || subject.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedSubject(subject)}
                            className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline"
                          >
                            Breakdown <ArrowUpRight size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredSubjects.length === 0 && (
                      <tr><td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-500">No records match these filters.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-5 py-3 text-xs text-slate-500">
                <span>Attendance threshold: {ATTENDANCE_MINIMUM}%</span>
                <div className="flex gap-4">
                  <Link href="/student/attendance" className="font-semibold text-blue-700 hover:underline">Attendance details</Link>
                  <Link href="/student/marks" className="font-semibold text-blue-700 hover:underline">Marks details</Link>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="font-bold text-slate-900">Attendance and published score</h2>
                  <p className="mt-1 text-xs text-slate-500">Only subjects with both attendance and a published score are charted.</p>
                </div>
                <div className="flex gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-blue-600" /> Attendance %</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-amber-500" /> Score %</span>
                </div>
              </div>
              {chartData.length ? (
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 8 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="subject" tick={{ fontSize: 11 }} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="attendance" name="Attendance %" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="score" name="Score %" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex h-48 items-center justify-center rounded-xl bg-slate-50 text-sm text-slate-500">
                  No subjects have both attendance and published marks yet.
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-5 xl:col-span-4">
            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between bg-slate-900 px-5 py-4 text-white">
                <div className="flex items-center gap-2"><BookOpenCheck size={18} className="text-amber-300" /><h2 className="font-bold">Results needing attention</h2></div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs">{model.resultsAvailable ? model.failedSubjects.length : "—"}</span>
              </div>
              <div className="space-y-3 p-4">
                {!model.resultsAvailable ? (
                  <EmptyState text={model.resultsRequestAvailable ? "No published results are available yet." : "Published result data unavailable."} />
                ) : model.failedSubjects.length ? model.failedSubjects.map((subject) => (
                  <div key={subject.key} className="rounded-xl border border-rose-200 bg-rose-50/70 p-3">
                    <p className="font-semibold text-slate-900">{subject.name}</p>
                    <p className="mt-1 text-xs text-slate-600">{subject.code || ""} {subject.term ? `· ${subject.term}` : ""}</p>
                    <p className="mt-2 text-xs font-semibold text-rose-700">{subject.score === null ? subject.grade || "Failed" : `${subject.score}/100 · ${subject.grade || "Failed"}`}</p>
                  </div>
                )) : <EmptyState text="No failed subjects in the published results." />}
                <Link href="/apply-resit" className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800">
                  Resit options <ArrowUpRight size={15} />
                </Link>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="flex items-center gap-2"><IndianRupee size={18} className="text-amber-600" /><h2 className="font-bold text-slate-900">Fee records</h2></div>
                <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${model.totalDue > 0 ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                  {model.feesAvailable ? `${formatMoney(model.totalDue)} due` : "Unavailable"}
                </span>
              </div>
              <div className="space-y-3 p-4">
                {!model.feesAvailable ? <EmptyState text="Fee data unavailable." /> : model.activeFees.length ? model.activeFees.slice(0, 5).map((fee) => (
                  <div key={fee.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">{fee.fee_type?.name || fee.description || "Fee record"}</p>
                      <p className="mt-1 text-xs text-slate-500">{fee.payment_due_date ? `Due ${formatDate(fee.payment_due_date)}` : fee.is_paid ? "Paid" : "Due date unavailable"}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold">{formatMoney(numeric(fee.amount) || 0)}</p>
                      <p className={`text-[11px] font-semibold ${fee.is_paid ? "text-emerald-700" : "text-amber-700"}`}>{fee.is_paid ? "Paid" : "Unpaid"}</p>
                    </div>
                  </div>
                )) : <EmptyState text="No fee records found." />}
                <Link href="/student/fees" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  View fee details <ArrowUpRight size={15} />
                </Link>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="flex items-center gap-2"><CalendarDays size={18} className="text-blue-700" /><h2 className="font-bold text-slate-900">Next exam</h2></div>
                <span className="text-xs text-slate-500">{model.examsAvailable ? "Your schedule" : "Unavailable"}</span>
              </div>
              <div className="p-4">
                {nextExam ? (
                  <div className="rounded-xl bg-slate-50 p-4">
                    <p className="font-bold text-slate-900">{examName}</p>
                    <p className="mt-1 text-sm text-slate-600">{formatDate(nextExam.parsedDate)}{nextExam.start_time ? ` · ${nextExam.start_time}` : ""}</p>
                    <p className="mt-1 text-xs text-slate-500">{nextExam.term_name || ""}{nextExam.duration ? ` · ${nextExam.duration}` : ""}</p>
                  </div>
                ) : <EmptyState text={model.examsAvailable ? "No upcoming exam is listed." : "Exam schedule unavailable."} />}
                <Link href="/student/exam-schedule" className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  View exam schedule <ArrowUpRight size={15} />
                </Link>
              </div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <div className="flex items-center gap-2"><AlertTriangle size={18} className="text-amber-600" /><h2 className="font-bold text-slate-900">Alerts and notices</h2></div>
                <div className="flex rounded-lg bg-slate-100 p-1 text-[11px] font-semibold">
                  <button onClick={() => setAlertFilter("ALL")} className={`rounded-md px-2 py-1 ${alertFilter === "ALL" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>All</button>
                  <button onClick={() => setAlertFilter("URGENT")} className={`rounded-md px-2 py-1 ${alertFilter === "URGENT" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"}`}>Urgent</button>
                </div>
              </div>
              <div className="max-h-[420px] divide-y divide-slate-100 overflow-y-auto">
                {alerts.length ? alerts.slice(0, 8).map((alert) => (
                  <div key={alert.id} className="space-y-1 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <span className={`h-2 w-2 rounded-full ${alert.severity === "critical" ? "bg-rose-500" : alert.severity === "warning" ? "bg-amber-500" : "bg-blue-500"}`} />
                        {alert.department}
                      </span>
                      <span className="text-[10px] text-slate-400">{alert.time}</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{alert.title}</p>
                    <p className="text-xs leading-relaxed text-slate-500">{alert.description}</p>
                    {alert.href && <Link href={alert.href} className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline">Open notice <ArrowUpRight size={13} /></Link>}
                  </div>
                )) : <div className="p-6 text-center text-sm text-slate-500">No alerts or notices are available.</div>}
              </div>
            </section>
          </aside>
        </div>

        {model.totalCredits > 0 && (
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <GraduationCap size={14} />
            Credits from published results: {model.passedCredits}/{model.totalCredits}
          </p>
        )}
      </div>

      {selectedSubject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          role="presentation"
          onClick={() => setSelectedSubject(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-subject-dialog-title"
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 bg-slate-900 px-5 py-4 text-white">
              <div>
                <p className="text-xs font-semibold text-amber-300">{selectedSubject.code || "Course code unavailable"} · {selectedSubject.term}</p>
                <h2 id="student-subject-dialog-title" className="mt-1 text-lg font-bold">{selectedSubject.name}</h2>
                <p className="mt-1 text-xs text-slate-300">{selectedSubject.faculty || "Faculty information unavailable"}</p>
              </div>
              <button type="button" onClick={() => setSelectedSubject(null)} className="rounded-lg bg-white/10 px-3 py-1.5 text-sm hover:bg-white/20">Close</button>
            </div>
            <div className="space-y-5 p-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <DetailValue label="Attendance" value={selectedSubject.attendancePct === null ? "—" : `${selectedSubject.attendancePct.toFixed(1)}%`} />
                <DetailValue label="Recorded sessions" value={selectedSubject.attendedCount !== null && selectedSubject.completedClasses !== null ? `${selectedSubject.attendedCount} / ${selectedSubject.completedClasses}` : "—"} />
                <DetailValue label="Published score" value={selectedSubject.score === null ? "—" : `${selectedSubject.score}/100`} />
              </div>
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">Assessment components</h3>
                {selectedSubject.breakdown.length ? (
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {selectedSubject.breakdown.map((component, index) => (
                      <div key={`${component.name}-${index}`} className="rounded-xl border border-slate-200 p-3">
                        <p className="text-xs text-slate-500">{component.name}</p>
                        <p className="mt-1 font-mono text-sm font-bold text-slate-900">
                          {component.obtained === null ? "—" : component.obtained}
                          {component.maximum === null ? "" : ` / ${component.maximum}`}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState text="Assessment component marks are not available for this subject." />
                )}
              </div>
              <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-4">
                <Link href="/student/attendance" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Attendance details</Link>
                <Link href="/student/marks" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800">Marks details</Link>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function DashboardMessage({ title, detail, loading = false }) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-6 py-12">
      <div className="max-w-md text-center">
        {loading && <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-700" />}
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
        <p className="mt-2 text-sm text-slate-500">{detail}</p>
      </div>
    </main>
  );
}

function ProfileValue({ label, value }) {
  return (
    <div className="min-w-28">
      <span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</span>
      <span className="mt-1 block font-semibold text-slate-800">{value || "—"}</span>
    </div>
  );
}

function AlertBanner({ children, tone, icon }) {
  const colors = tone === "rose"
    ? "border-rose-200 bg-rose-50 text-rose-900"
    : "border-amber-200 bg-amber-50 text-amber-900";
  return <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${colors}`}>{icon}<span>{children}</span></div>;
}

function MetricCard({ children, title, icon, accent }) {
  const accents = {
    blue: "bg-blue-50 text-blue-700",
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
    amber: "bg-amber-50 text-amber-700",
    navy: "bg-slate-100 text-slate-800",
  };
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{title}</div>
        <div className={`rounded-xl p-2 ${accents[accent]}`}>{icon}</div>
      </div>
      {children}
    </article>
  );
}

function MetricValue({ value, small = false }) {
  return <div className={`mt-2 font-extrabold tabular-nums text-slate-900 ${small ? "text-lg" : "text-3xl"}`}>{value}</div>;
}

function EmptyState({ text }) {
  return <p className="rounded-xl bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">{text}</p>;
}

function DetailValue({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-bold text-slate-900">{value}</p>
    </div>
  );
}

function statusClass(status) {
  if (status === "Failed") return "bg-rose-100 text-rose-800";
  if (status === "Passed") return "bg-emerald-100 text-emerald-800";
  if (status === "Ongoing") return "bg-blue-100 text-blue-800";
  return "bg-slate-100 text-slate-700";
}
