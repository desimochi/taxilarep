"use client";
import { GlobalProvider, GlobalContext } from "@/components/GlobalContext";
import { useState, useEffect, useContext } from "react";
import { Roboto, Roboto_Mono } from "next/font/google";
import userImage from "@/public/userimage.jpg";
import Cookies from "js-cookie";

import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { User, CreditCard, Users, LogOut, FileUp, Moon, Settings2Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"], // Optional: specify weights
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"], // Optional: specify weights
});

export default function RootLayout({ children }) {
  return (
    <GlobalProvider>
      <InnerLayout>{children}</InnerLayout>
    </GlobalProvider>
  );
}


function InnerLayout({ children }) {

  const pathname = usePathname()
  const router = useRouter()
  const { state, updateState } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const storedState = localStorage.getItem("userState");
    if (storedState) {
      updateState(JSON.parse(storedState)); // Assuming updateState is available from GlobalContext
    }
  }, [updateState]);

 
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      router.replace("/login"); // 🔒 Redirect if not logged in
    } else{
      setIsAuthenticated(true)
    }
  }, [router]);

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  function entermouse (){
    setIsHovered(true)
    setIsOpen(false)
  }
  function leavemouse(){
    setIsHovered(false)
  }
  
  function handleLogout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userState");
    Cookies.remove("user");
    router.push("/login"); // Redirect to login page
  }
  const noLayoutRoutes = ["/login", "/student"]
  const isStudentLayout = pathname.includes("student"); // Check if URL contains "student"

  if (isAuthenticated === null) {
    if (noLayoutRoutes.includes(pathname) || isStudentLayout) {
      return <GlobalProvider><html> <body>{children}</body></html></GlobalProvider>;
    } else {
      return <html><body></body></html>;
    }
  }
  
  if(noLayoutRoutes.includes(pathname)){
    return <GlobalProvider><html> <body>{children}</body></html></GlobalProvider>
  }
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased`}
      >
        <main className="flex">
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} toggleMenu={toggleMenu} openMenus={openMenus} role={state.role_name} type={state.employee_type} />
        
        <aside className={`${collapsed ? "w-full" : "w-full"} bg-white `}>
        <div className="w-full h-[87px] p-8 flex items-center justify-between bg-white">
                <input className="mt-1 block w-1/5 px-4 py-2 border border-gray-300 bg-gray-50 rounded-sm shadow-sm text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Search Now..."/>
                <div className="flex justify-evenly gap-4">
                    <div>
                    <button  type="button" class="bg-gradient-to-tl from-red-400 to-red-900  text-white p-2 rounded-full hover:bg-red-600"  onClick={() => setIsOpen(!isOpen)}>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 7 7.388 7 9v5.159c0 .538-.214 1.055-.595 1.436L5 17h5m0 0a3 3 0 006 0m-6 0H9"
        />
      </svg>
    </button>
    <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-red-500 rounded-sm border-2 border-white" ></span>
    <div className={`absolute right-0 z-50 transform -translate-x-40 mt-2 w-120 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-md dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 transition-all duration-300 ${
                    isOpen ? "opacity-100 translate-y-0 z-10" : "opacity-0 -translate-y-3 pointer-events-none"
                }`}
            >
                <div className="px-6 py-2 bg-gray-900 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold text-md text-white dark:text-white">Notification</h3>
                    <button className="p-1.5 px-3 text-black text-sm rounded-full bg-gray-100" onClick={()=>setIsOpen(!isOpen)}>X</button>
                </div>
                <div className="px-3 py-2 ">
                    <span className="bg-red-200 rounded-sm text-red-700 py-0.5 px-2">urgent</span>
                    <p className="mt-1">Exam Time Table for Term 5 Just Announced</p>
                    <hr className="border-1 border-gray-500 mt-2" />
                </div>
                <div className="px-3 py-2">
                    <p className="mt-1">Exam Time Table for Term 5 Just Announced</p>
                    <hr className="border-1 border-gray-500 " />
                </div>
                <div className="px-3 py-2">
                    <p className="mt-1">Exam Time Table for Term 5 Just Announced</p>
                    <hr className="border-1 border-gray-500 mt-2 mb-2" />
                </div>
            </div>
                    </div>
    <div>
    <button className="bg-black text-white py-2 px-8 rounded-md hover:bg-gray-800" onMouseEnter={()=>entermouse()} onMouseLeave={()=>leavemouse()}>
      {state.name}
    </button>
    <div
                className={`absolute z-50  right-0 transform -translate-x-10 mt-2 w-64 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-md dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800 transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-y-0 z-10" : "opacity-0 -translate-y-3 pointer-events-none"
                }`}
                onMouseEnter={()=>entermouse()}
                onMouseLeave={()=>leavemouse()}
            >
                  <div className="w-64 bg-white shadow-xl rounded-xl p-4 space-y-2 dark:bg-gray-900">
            {/* Profile Section */}
            <div className="flex items-center space-x-3 p-3 border-b dark:border-gray-700">
                
                 <Image src={userImage} height={40} width={40} alt="user image" />
                <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{state.name? `${state.name}`:"user"}</h3>
                    <p className="text-gray-500 text-sm">{state.email? `${state.email}`:"useremail"}</p>
                </div>
            </div>

            {/* Menu Items */}
            <ul className="space-y-2">
            <Link href={`/profile/${state.role_name==="Student"?'student':'employee'}/${state.user_id}`} passHref>
                <li className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                 
                  Profile
                    
                </li>
                </Link>
                <li className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                    <div className="flex items-center space-x-2">
                        <Settings2Icon className="text-gray-500 dark:text-gray-400 w-5 h-5" />
                        <span className="text-gray-700 dark:text-gray-300">Account Setting</span>
                    </div>
                    <span className="text-xs text-gray-400">⌘B</span>
                </li>

          
            </ul>

            {/* Export Account */}
            <div className="border-t dark:border-gray-700 pt-2">
                
            </div>

            {/* Logout */}
            <li onClick={handleLogout} className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <LogOut className="text-gray-500 dark:text-gray-400 w-5 h-5" />
                <button className="text-gray-700 dark:text-gray-300 ml-2" >Logout</button>
            </li>
        </div>
            </div>
  </div>
  
  <div>
    
  </div>
            </div>
            </div>
            
            <hr className="border-1"/>
            {children}
        </aside>
        
        </main>
      </body>
    </html>
  );
}
