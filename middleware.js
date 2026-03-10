import { NextResponse } from "next/server";

export function middleware(req) {
  const { cookies, nextUrl } = req;
  const userCookie = cookies.get("new_user");

  // If user not logged in → redirect to login
  if (!userCookie && nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If logged in → prevent accessing login page
  if (userCookie && nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};