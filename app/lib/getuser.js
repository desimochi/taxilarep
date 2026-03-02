import { cookies } from "next/headers";

export function getuser() {
    const cookieStore = cookies(); // Get cookie store
    const userCookie = cookieStore.get("user")
   let user = null;
   if (userCookie?.value) {
    try {
      user = JSON.parse(decodeURIComponent(userCookie.value));
      return user // Decode and parse JSON
    } catch (error) {
      console.error("Failed to parse user cookie:", error);
    }
   }}