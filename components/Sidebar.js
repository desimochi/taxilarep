"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import { menuItems, stumenuItems } from "@/app/lib/MenuItems";
import { FacmenuItems } from "@/app/lib/MenuItems";
import { ITManager } from "@/app/lib/MenuItems";
import {
  HomeIcon,
  AcademicCapIcon,
  UserGroupIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { AlignLeftIcon, AlignRightIcon, BookCheckIcon, NewspaperIcon, PenSquareIcon } from "lucide-react";
import { lastDayOfDecade } from "date-fns";

const Sidebar = ({collapsed, toggleSidebar, toggleMenu, openMenus, role, type  }) => {
  const pathname = usePathname();
  const getMenuByRole = (role, type) => {
    switch (role) {
        case "admin":
            return menuItems;
        case "faculty":
            return FacmenuItems;
        case "Student":
              return stumenuItems;
          case "IT Manager":
            if (type === "Teaching") {
              return [...FacmenuItems, ...ITManager]; 
          } else {
            return menuItems;
          }
        default:
            return []; // Return an empty array if the role is not recognized
    }
};
const selectedMenu = getMenuByRole(role, type);
console.log(selectedMenu);
  return (
    <div className={`h-screen bg-white shadow-md border-r-2 p-4 transition-all ${collapsed ? "w-24" : "w-80"}`}>
      <div className="flex items-center justify-between h-[70px] p-2">
        {!collapsed && <Image src={logo} width={140} height={60} alt="Taxila Logo" />}
        <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-gray-200">
          {collapsed ? <AlignRightIcon className="h-5 w-5" /> : <AlignLeftIcon className="h-5 w-5" />}
        </button>
      </div>
      <hr className="border-1 mb-4" />

      <nav>
        {selectedMenu.map((item, index) => (
          <div key={index}>
            {item.path ? (
              <Link href={item.path}>
                <span className={`flex items-center px-4 py-2 mt-2 rounded-md ${pathname.includes(item.path) ? "bg-black text-white" : "text-gray-800 hover:bg-gray-200"}`}>
                  {item.icon}
                  {!collapsed && <span className="ml-2">{item.label}</span>}
                </span>
              </Link>
            ) : (
              <>
                {/* Main Menu Button */}
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="flex items-center justify-between w-full px-4 py-2 mt-2 text-gray-800 hover:bg-gray-200 rounded-md"
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    {!collapsed && <span>{item.label}</span>}
                  </div>
                  {!collapsed && <ChevronDownIcon className={`h-5 w-5 transition-transform ${openMenus[item.label] ? "rotate-180" : ""}`} />}
                </button>

                {/* Submenu */}
                {openMenus[item.label] && (
                  <div className="ml-6 space-y-2 mt-2">
                    {item.subMenu.map((subItem, subIndex) => (
                      <div key={subIndex}>
                        {subItem.path ? (
                          <Link href={subItem.path}>
                            <span className={`block px-4 py-2 text-sm rounded-md ${pathname.includes(subItem.path) ? "bg-gray-300" : "hover:bg-gray-100"}`}>
                              {subItem.label}
                            </span>
                          </Link>
                        ) : (
                          <>
                            {/* Submenu Toggle Button */}
                            <button
                              onClick={() => toggleMenu(subItem.label)}
                              className="flex items-center justify-between text-sm w-full px-4 py-2 text-gray-900 hover:bg-gray-200 rounded-md"
                            >
                              <span>{subItem.label}</span>
                              <ChevronDownIcon className={`h-5 w-5 transition-transform ${openMenus[subItem.label] ? "rotate-180" : ""}`} />
                            </button>

                            {/* Nested Submenu */}
                            {openMenus[subItem.label] && (
                              <div className="ml-6 space-y-2">
                                {subItem.subMenu.map((nestedItem, nestedIndex) => (
                                  <Link key={nestedIndex} href={nestedItem.path}>
                                    <span className={`block px-4 py-2 text-sm rounded-md ${pathname.includes(nestedItem.path) ? "bg-gray-300" : "hover:bg-gray-100"}`}>
                                      {nestedItem.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
