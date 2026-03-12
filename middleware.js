import { NextResponse } from "next/server";

const studentAllowedPaths = [
  "/student",
  "/student/subject",
  "/student/subject/details",
  "/student/attendance",
  "/student/class-schedule",
  "/student/exam-schedule",
  "/notice/noticeboard",
  "/see/events",
  "/profile/student",
];

const facultyPaths = [
  "/faculty",
  "/profile/employee",
  "/faculty/mentorship-assign-student",
  "/students/details",
  "/see/events",
  "/profile/student",
  "/profile/employee",
  "/student/attendance",
  "/student/see-attendance",
  "/notice/noticeboard",
  "/notice/noticeboard/add-notice",
  "/attendance/class-attendance",
  "/syllabus/see-syllabus",
  "/syllabus/upload-syllabus",
  "/faculty/class-schedule",
  "/faculty/assign-subject",
  "/subjects/details",
  "/subjects/details/component",
  "/subjects/details/component/sub-component",
  "/subjects/details/component/add-marks",
  "/question-paper",
  "/accounts/fee-type",
  "/accounts/custom-fee",
];

export function middleware(req) {
  const { nextUrl, cookies } = req;
  const urlPath = nextUrl.pathname;
  const userCookie = cookies.get("new_user");

  // 🔐 If user not logged in
  if (!userCookie && urlPath !== "/login" && urlPath !== "/privacy-policy") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔐 If logged in prevent login page
  if (userCookie && urlPath === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!userCookie) {
    return NextResponse.next();
  }

  try {
    const userData = JSON.parse(userCookie.value);
    const roles = userData?.role_name || [];
    const employeeType = userData?.employee_type;
    const userType = userData?.user_type;

    // ✅ Admin → Full access
    if (Array.isArray(roles) && roles.includes("admin")) {
      return NextResponse.next();
    }

    // 👨‍🏫 Faculty Access
    if (employeeType === "Teaching") {
      const isAllowed = facultyPaths.some(
        (path) => urlPath === path || urlPath.startsWith(path + "/")
      );

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    }

    // 🎓 Student Access
    if (userType === "STUDENT") {
      const isAllowed =
        studentAllowedPaths.some((path) => urlPath.startsWith(path)) ||
        urlPath.startsWith("/student/subject/details/");

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    }

    // 🚫 Fallback
    if (urlPath.startsWith("/faculty") || urlPath.startsWith("/student")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

  } catch (error) {
    console.error("Cookie parse error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};