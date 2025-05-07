import { cookies } from "next/headers";

export async function POST(req) {
  const { username, password } = await req.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return new Response(JSON.stringify({ message: data.message || "Login failed" }), {
      status: response.status,
    });
  }

  const cookieStore = await cookies();

  // Store tokens
  cookieStore.set("accessToken", data.data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "Strict",
    maxAge: 60 * 60 * 24, // 1 day
  });

  cookieStore.set("refreshToken", data.data.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "Strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Optionally expose user cookie client-side (for preloading state)
  cookieStore.set("user", JSON.stringify(data.data.user), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "Strict",
    maxAge: 60 * 60 * 24 * 365 * 10, // 10 years
  });

  // ✅ Send user data in the response to update client-side state
  return new Response(JSON.stringify({
    success: true,
    user: data.data.user
  }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
