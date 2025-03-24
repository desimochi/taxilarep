import { NextResponse } from "next/server";
const studentAllowedPaths = [
  "/student/dashboard",
  "/student/subject",
  "/student/attendance",
  "/student/class-schedule",
  "/student/exam-schedule",
  "/notice/noticeboard",
  "/see/events"
];

export function middleware(req) {
  const { nextUrl, cookies } = req;
  const userCookie = cookies.get("user");

  // Redirect to login if no user data and not already on login page
  if (!userCookie) {
    if (nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    const userData = JSON.parse(userCookie.value);

    if (userData.employee_type === "Teaching") {
      // Allow access only to "/faculty" and "/login"
      if (nextUrl.pathname !== "/faculty" && nextUrl.pathname !== "/login") {
        return NextResponse.redirect(new URL("/faculty", req.url));
      }
    } else if (userData.user_type === "STUDENT") {
      // Students should only access "/student-dashboard" or "/login"
      if (!studentAllowedPaths.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    } else {
      // Non-teaching and non-student users (like admin) should go to "/admin"
      if (nextUrl.pathname === "/faculty" || nextUrl.pathname === "/student-dashboard") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware only to relevant pages
export const config = {
  matcher: [
    "/faculty",
    "/admin",
    "/dashboard",
    "/settings",
    "/subjects",
    "/student/dashboard",
    "/student/subject",
    "/student/attendance",
    "/student/class-schedule",
    "/student/exam-schedule",
    "/see/events",
  ],
};