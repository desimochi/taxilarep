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

  const noLayoutRoutes = ["/login"];

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token && !noLayoutRoutes.includes(pathname)) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router, noLayoutRoutes]);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("user");
    router.push("/login");
  };

  const toggleMenu = (menu) => setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  const toggleSidebar = () => setCollapsed(!collapsed);

  const entermouse = () => { setIsHovered(true); setIsOpen(false); };
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
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} toggleMenu={toggleMenu} openMenus={openMenus} role={state.role_name} type={state.employee_type} />
        
        <aside className="w-full bg-white">
          <div className="w-full h-[87px] p-8 flex items-center justify-between bg-white">
            <input className="w-1/5 px-4 py-2 border rounded-sm text-gray-900 shadow-sm" placeholder="Search Now..." />

            <div className="flex items-center gap-4 relative">
              {/* Notification Bell */}
              <button onClick={() => setIsOpen(!isOpen)} className="bg-gradient-to-tl from-red-400 to-red-900 text-white p-2 rounded-full hover:bg-red-600 relative">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 17h5l-1.405-1.405A2 2 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 7 7.388 7 9v5.159c0 .538-.214 1.055-.595 1.436L5 17h5a3 3 0 006 0z" />
                </svg>
                <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-sm border-2 border-white"></span>
              </button>

              {/* Notification Dropdown */}
              <div className={`absolute right-60 top-9 z-50 transform mt-2 w-80 text-sm bg-white border rounded-lg shadow-md transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0 z-10" : "opacity-0 -translate-y-3 pointer-events-none"}`}>
                <div className="px-6 py-2 bg-gray-900 text-white flex justify-between items-center rounded-t-lg">
                  <h3 className="font-semibold text-md">Notification</h3>
                  <button className="bg-gray-100 text-black px-3 py-1 rounded-full" onClick={() => setIsOpen(false)}>X</button>
                </div>
                {["urgent", "", ""].map((tag, idx) => (
                  <div key={idx} className="px-3 py-2">
                    {tag && <span className="bg-red-200 text-red-700 px-2 py-0.5 rounded-sm">{tag}</span>}
                    <p className="mt-1">Exam Time Table for Term 5 Just Announced</p>
                    <hr className="mt-2 border-gray-500" />
                  </div>
                ))}
              </div>

              {/* User Profile Dropdown */}
              <div onMouseEnter={entermouse} onMouseLeave={leavemouse} className="relative">
                <button className="bg-black text-white py-2 px-12 rounded-md hover:bg-gray-800">{state.name}</button>

                <div className={`absolute right-0 mt-2 w-64 z-50 bg-white dark:bg-gray-900 border rounded-lg shadow-md transition-all duration-300 ${isHovered ? "opacity-100 z-10" : "opacity-0 pointer-events-none"}`}>
                  <div className="p-4 border-b dark:border-gray-700 flex items-center gap-3">
                    <Image src={userImage} height={40} width={40} alt="user" />
                    <div>
                      <h3 className="font-semibold">{state.name || "User"}</h3>
                      <p className="text-sm text-gray-500">{state.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <ul className="p-4 space-y-2">
                  <li className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded cursor-pointer">
                  <Link href={`/profile/${state.role_name === "Student" ? "student" : "employee"}/${state.user_id}`} className="w-full">
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
                    <li onClick={handleLogout} className="flex items-center gap-2 p-3 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
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
