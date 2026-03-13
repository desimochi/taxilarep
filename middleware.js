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

// Paths that don't require login
const publicPaths = ["/login", "/privacy-policy"];

// Paths that EVERY logged-in user can access
const sharedAuthPaths = ["/", "/unauthorized"]; 

export function middleware(req) {
  const { nextUrl, cookies } = req;
  const urlPath = nextUrl.pathname;
  const userCookie = cookies.get("new_user");

  // 1. 🔐 If user NOT logged in and trying to access a protected route
  if (!userCookie && !publicPaths.includes(urlPath)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 2. 🔐 If logged in, prevent access to the login page
  if (userCookie && urlPath === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 3. Pass through for public paths if no cookie
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

    // ✅ Shared Authenticated Routes (Home, Unauthorized page, etc.)
    if (sharedAuthPaths.includes(urlPath)) {
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
      // Changed to match the exact strictness of faculty logic
      const isAllowed = studentAllowedPaths.some(
        (path) => urlPath === path || urlPath.startsWith(path + "/")
      );

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }

      return NextResponse.next();
    }

    // 🚫 Fallback for users who don't match the roles above
    if (urlPath.startsWith("/faculty") || urlPath.startsWith("/student")) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

  } catch (error) {
    console.error("Cookie parse error:", error);
    // Clear the invalid cookie and redirect to login
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("new_user");
    return response;
  }

  return NextResponse.next();
}

// Optimized matcher to ignore APIs, Next static files, and images
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
    "/fail-student",
    "/question-paper/:path*",
    "/attendance/class-attendance",
    "/accounts/:path*",
  ],
};