"use client";

import { GlobalProvider, GlobalContext } from "@/components/GlobalContext";
import { useState, useEffect, useContext } from "react";
import { Roboto, Roboto_Mono } from "next/font/google";
import Cookies from "js-cookie";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { LogOut, Settings2Icon, User2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import userImage from "@/public/userimage.jpg";

const roboto = Roboto({ variable: "--font-roboto", subsets: ["latin"], weight: ["400", "700"] });
const robotoMono = Roboto_Mono({ variable: "--font-roboto-mono", subsets: ["latin"], weight: ["400", "700"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <GlobalProvider>
          <Layout>{children}</Layout>
        </GlobalProvider>
      </body>
    </html>
  );
}

function Layout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { state } = useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const noLayoutRoutes = ["/login", "/unauthorized", "/forgot-password"];

  useEffect(() => {
    const userCookie = Cookies.get("user");
    const token = localStorage.getItem("accessToken");

    if ((!token || !userCookie) && !noLayoutRoutes.includes(pathname)) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("user");
    window.location.reload();
    router.push("/login");
  };

  const toggleMenu = (menu) => setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  const toggleSidebar = () => setCollapsed(!collapsed);

  const entermouse = () => {
    setIsHovered(true);
    setIsOpen(false);
  };
  const leavemouse = () => setIsHovered(false);

  if (isAuthenticated === null && !noLayoutRoutes.includes(pathname)) {
    return null;
  }

  if (noLayoutRoutes.includes(pathname)) {
    return <div>{children}</div>;
  }

  return (
    <div className={`${roboto.variable} ${robotoMono.variable}`}>
      <main className="flex">
        <Sidebar
          collapsed={collapsed}
          toggleSidebar={toggleSidebar}
          toggleMenu={toggleMenu}
          openMenus={openMenus}
          role={state.role_id}
          type={state.employee_type}
        />

        <aside className="w-full bg-white">
          <div className="w-full h-[87px] p-8 flex items-center justify-between bg-white">
            <input
              className="w-1/5 px-4 py-2 border rounded-sm text-gray-900 shadow-sm"
              placeholder="Search Now..."
            />

            <div className="flex items-center gap-4 relative">
              {/* User Profile Dropdown */}
              <div onMouseEnter={entermouse} onMouseLeave={leavemouse} className="relative">
                <button className="bg-black text-white py-2 px-12 rounded-md hover:bg-gray-800">
                  {state.name}
                </button>

                <div
                  className={`absolute right-0 mt-2 w-64 z-50 bg-white dark:bg-gray-900 border rounded-lg shadow-md transition-all duration-300 ${
                    isHovered ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <div className="p-4 border-b dark:border-gray-700 flex items-center gap-3">
                    <Image src={userImage} height={40} width={40} alt="user" />
                    <div>
                      <h3 className="font-semibold">{state.name || "User"}</h3>
                      <p className="text-sm text-gray-500">{state.email || "user@example.com"}</p>
                    </div>
                  </div>

                  <ul className="p-4 space-y-2">
                    <li className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
                      <Link
                        href={`/profile/${state.role_name === "Student" ? "student" : "employee"}/${state.user_id}`}
                        className="w-full"
                      >
                        <div className="flex gap-2 items-center">
                          <User2Icon className="w-5 h-5" />
                          Profile
                        </div>
                      </Link>
                    </li>

                    <li className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
                      <Link href={`/reset-password`} className="w-full">
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
      </main>
    </div>
  );
}
