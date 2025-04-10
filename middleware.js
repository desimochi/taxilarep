import { NextResponse } from "next/server";

const studentAllowedPaths = [
  "/student",
  "/student/subject",
  "/student/subject/details", // Base path
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
];

export function middleware(req) {
  const { nextUrl, cookies } = req;
  const userCookie = cookies.get("user");
  const urlPath = nextUrl.pathname;

  console.log("Requested Path:", urlPath);

  // ✅ No user session cookie — redirect to login
  if (!userCookie) {
    if (urlPath !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    const userData = JSON.parse(userCookie.value);
    console.log("User Data:", userData);

    // ✅ Priority 1: Admin has full access, skip all other checks
    if (userData.role_name === "admin") {
      return NextResponse.next();
    }

    // ✅ Priority 2: Teaching Faculty
    if (userData.employee_type === "Teaching") {
      const isAllowed = facultyPaths.some(
        (path) => urlPath === path || urlPath.startsWith(path + "/")
      );
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/faculty", req.url));
      }
      return NextResponse.next();
    }

    // ✅ Priority 3: Student
    if (userData.user_type === "STUDENT") {
      const isAllowed =
        studentAllowedPaths.some((path) => urlPath.startsWith(path)) ||
        urlPath.startsWith("/student/subject/details/");
      console.log("Student Access Allowed:", isAllowed);

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      return NextResponse.next();
    }

    // ✅ Default: Non-teaching or unknown — restrict faculty/student areas
    if (urlPath.startsWith("/faculty") || urlPath.startsWith("/student")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/faculty/:path*",
    "/admin",
    "/dashboard",
    "/settings",
    "/profile/:path*",
    "/subjects/:path*",
    "/student/:path*",
    "/notice/:path*",
    "/see/events",
    "/attendance/class-attendance",
  ],
};
