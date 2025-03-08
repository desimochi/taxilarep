import { NextResponse } from "next/server";

export function middleware(req) {
  const { nextUrl, cookies } = req;
  const userCookie = cookies.get("user");

  if (!userCookie) {
    // Prevent redirect loop if already on login page
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
        // Prevent redirect loop if already on "/faculty"
        if (nextUrl.pathname !== "/faculty") {
          return NextResponse.redirect(new URL("/faculty", req.url));
        }
      }
    } else {
      // Non-teaching employees should not access "/faculty"
      if (nextUrl.pathname === "/faculty") {
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
  matcher: ["/faculty", "/admin", "/dashboard", "/settings"],
};
