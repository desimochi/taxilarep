import { NextRequest, NextResponse } from "next/server";

const studentAllowedPaths = [
  "/student/dashboard",
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

  console.log("Requested Path:", nextUrl.pathname);

  // If no user session, redirect to login
  if (!userCookie) {
    if (nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    const userData = JSON.parse(userCookie.value);
    const urlPath = nextUrl.pathname;

    if (userData.employee_type === "Teaching") {
      // Allow faculty to access only defined faculty paths
      const isAllowed = facultyPaths.some(
        (path) => urlPath === path || urlPath.startsWith(path + "/")
      );
      if (!isAllowed) {
        return NextResponse.redirect(new URL("/faculty", req.url));
      }
    } else if (userData.user_type === "STUDENT") {
      // ✅ Check if the path is allowed or starts with `/student/subject/details/`
      const isAllowed = studentAllowedPaths.some((path) =>
        urlPath.startsWith(path)
      ) || urlPath.startsWith("/student/subject/details/");

      console.log("Student Access Allowed:", isAllowed);

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } else {
      // Handle non-teaching staff (Admins, other roles)
      if (urlPath.startsWith("/faculty") || urlPath.startsWith("/student")) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to relevant pages
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
