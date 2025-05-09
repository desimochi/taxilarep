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
];

export function middleware(req) {
  const { nextUrl, cookies } = req;
  const userCookie = cookies.get("user");
  const urlPath = nextUrl.pathname;
  if (!userCookie && urlPath !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Prevent logged-in users from accessing login again
  if (userCookie && urlPath === "/login") {
    return NextResponse.redirect(new URL("/", req.url)); // Change "/" to your dashboard or homepage
  }


  try {
    const userData = JSON.parse(userCookie.value);
    const roles = userData?.role_name || [];
    const employeeType = userData?.employee_type;
    const userType = userData?.user_type;


    // ✅ Admin role has full access
    if (Array.isArray(roles) && roles.includes("admin")) {
      console.log("Admin access granted");
      return NextResponse.next();
    }

    // ✅ Teaching faculty role
    if (employeeType === "Teaching") {
      const isAllowed = facultyPaths.some(
        (path) => urlPath === path || urlPath.startsWith(path + "/")
      );
      console.log("Faculty Access Allowed:", isAllowed);
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      return NextResponse.next();
    }

    // ✅ Student access
    if (userType === "STUDENT") {
      const isAllowed =
        studentAllowedPaths.some((path) => urlPath.startsWith(path)) ||
        urlPath.startsWith("/student/subject/details/");
      console.log("Student Access Allowed:", isAllowed);

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
      return NextResponse.next();
    }

    // ✅ Fallback: no access to student/faculty areas
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
    "/course/:path*",
    "/see/events",
    "/attendance/class-attendance",
  ],
};
