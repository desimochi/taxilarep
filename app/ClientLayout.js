"use client";

import { GlobalContext, GlobalProvider } from "@/components/GlobalContext";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import userImage from "@/public/userimage.jpg";
import { LogOut, Settings2Icon, User2Icon } from "lucide-react";

function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useContext(GlobalContext);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const noLayoutRoutes = ["/login", "/unauthorized", "/forgot-password"];

  // Use a state variable to control the rendering of the authenticated layout
  const [showLayout, setShowLayout] = useState(false);

  useEffect(() => {
    const isNoLayoutRoute = noLayoutRoutes.includes(pathname);
    const userCookie = Cookies.get("new_user");
    const token = localStorage.getItem("accessToken");

    // If it's a no-layout route, just render the children without a check
    if (isNoLayoutRoute) {
      setShowLayout(false); // Indicate that the main layout should not be shown
      return;
    }

    // Check for authentication synchronously
    if (!userCookie) {
      localStorage.removeItem("accessToken");
      router.replace("/login");
    } else {
      setShowLayout(true); // User is authenticated, show the layout
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("new_user");
    Cookies.remove("user");
    router.push("/login");
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleMenu = (menu) => setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));

  // If we're on a "no-layout" route or still checking authentication, render only the children
  if (!showLayout && noLayoutRoutes.includes(pathname)) {
    return <div>{children}</div>;
  }
  
  // If showLayout is false and it's not a no-layout route, it means we are in the middle of a redirect
  if (!showLayout) {
    return null; // Don't render anything while redirecting
  }

  // Render the main layout once authentication is confirmed
  return (
    <div className="flex">
      <Sidebar
        collapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        toggleMenu={toggleMenu}
        openMenus={openMenus}
        role={state?.role_id}
        type={state?.employee_type}
      />
      <aside className="w-full bg-white">
        <div className="w-full h-[87px] p-8 flex items-center justify-between bg-white">
          <input className="w-1/5 px-4 py-2 border rounded-sm text-gray-900 shadow-sm" placeholder="Search Now..." />
          <div className="flex items-center gap-4 relative">
            <div
              onMouseEnter={() => setIsProfileMenuOpen(true)}
              onMouseLeave={() => setIsProfileMenuOpen(false)}
              className="relative"
            >
              <button className="bg-black text-white py-2 px-12 rounded-md hover:bg-gray-800">
                {state?.name}
              </button>
              <div
                className={`absolute right-0 mt-2 w-64 z-50 bg-white dark:bg-gray-900 border rounded-lg shadow-md transition-all duration-300 ${
                  isProfileMenuOpen ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="p-4 border-b dark:border-gray-700 flex items-center gap-3">
                  <Image src={userImage} height={40} width={40} alt="user" />
                  <div>
                    <h3 className="font-semibold">{state?.name || "User"}</h3>
                    <p className="text-sm text-gray-500">{state?.email || "user@example.com"}</p>
                  </div>
                </div>
                <ul className="p-4 space-y-2">
                  <li className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
                    <Link
                      href={`/profile/${state?.role_name === "Student" ? "student" : "employee"}/${state?.user_id}`}
                      className="w-full"
                    >
                      <div className="flex gap-2 items-center">
                        <User2Icon className="w-5 h-5" />
                        Profile
                      </div>
                    </Link>
                  </li>
                  <li className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
                    <Link href="/reset-password" className="w-full">
                      <div className="flex gap-2 items-center">
                        <Settings2Icon className="w-5 h-5" />
                        Account Setting
                      </div>
                    </Link>
                  </li>
                </ul>
                <div className="border-t dark:border-gray-700">
                  <li
                    onClick={handleLogout}
                    className="flex items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {children}
      </aside>
    </div>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <Layout>{children}</Layout>
        </GlobalProvider>
      </body>
    </html>
  );
}