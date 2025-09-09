"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "../public/logo.png";
import {
  Accountant,
  menuItems,
  Staff,
  stumenuItems,
  FacmenuItems,
  ITManager,
} from "@/app/lib/MenuItems";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  AlignCenterVerticalIcon,
  AlignEndVertical,
  Plus,
  X,
} from "lucide-react";

const Sidebar = ({ collapsed, toggleSidebar, role, type }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  // ✅ toggle menu open/close
  const toggleMenu = (label) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // ✅ Menu builder based on role/type
  const getMenuByRole = (role, type) => {
    const roles = Array.isArray(role) ? role.map(String) : [String(role)];
    let result = [];

    roles.forEach((r) => {
      switch (r) {
        case "1":
          result = [...result, ...menuItems];
          break;
        case "2":
          result =
            type === "Teaching"
              ? [...result, ...FacmenuItems, ...menuItems]
              : [...result, ...menuItems];
          break;
        case "3":
          result = [...result, ...stumenuItems];
          break;
        case "4":
          result = [...result, ...FacmenuItems];
          break;
        case "5":
          result = [...result, ...Staff];
          break;
        case "6":
          result =
            type === "Teaching"
              ? [...result, ...FacmenuItems, ...ITManager]
              : [...result, ...menuItems];
          break;
        case "7":
          result = [...result, ...Accountant];
          break;
        default:
          break;
      }
    });

    return result.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.label === item.label)
    );
  };

  const selectedMenu = getMenuByRole(role, type);

  // ✅ Recursive renderer for menu & submenu
  const renderItem = (item, collapsed, level = 0) => (
    <div key={item.label}>
      {item.path ? (
        <Link href={item.path}>
          <span
            className={`flex items-center px-4 py-2 mt-2 rounded-md ${
              pathname.includes(item.path)
                ? "bg-black text-white"
                : "text-gray-800 hover:bg-gray-200"
            }`}
            style={{ paddingLeft: `${level * 16 + 16}px` }}
          >
            {item.icon}
            {!collapsed && <span className="ml-2">{item.label}</span>}
          </span>
        </Link>
      ) : (
        <>
          {/* Parent */}
          <button
            onClick={() => toggleMenu(item.label)}
            className="flex items-center justify-between w-full px-4 py-2 mt-2 text-gray-800 hover:bg-gray-200 rounded-md"
            style={{ paddingLeft: `${level * 16 + 16}px` }}
          >
            <div className="flex items-center space-x-2">
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </div>
            {!collapsed && item.subMenu && (
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${
                  openMenus[item.label] ? "rotate-180" : ""
                }`}
              />
            )}
          </button>

          {/* Submenu */}
          {openMenus[item.label] &&
            item.subMenu &&
            item.subMenu.map((sub) => renderItem(sub, collapsed, level + 1))}
        </>
      )}
    </div>
  );

  return (
    <>
      {/* Floating Mobile Toggle */}
      <div className="md:hidden fixed bottom-10 right-6 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-3 rounded-full bg-black text-white shadow-lg hover:bg-gray-800 transition"
        >
          {mobileOpen ? <X className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="relative w-64 bg-white h-full shadow-xl z-50 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between h-[70px] p-2 flex-shrink-0">
              <Link href={`/`}>
                <Image src={logo} width={140} height={60} alt="Taxila Logo" />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-md hover:bg-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <hr />

            {/* Scrollable Menu */}
            <div className="flex-1 overflow-y-auto p-2">
              <nav>{selectedMenu.map((item) => renderItem(item, false))}</nav>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex flex-col bg-white border-r-2 p-4 transition-all ${
          collapsed ? "w-24" : "w-80"
        } h-screen`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-[70px] p-2 flex-shrink-0">
          {!collapsed && (
            <Link href={`/`}>
              <Image src={logo} width={140} height={60} alt="Taxila Logo" />
            </Link>
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-200"
          >
            {collapsed ? (
              <AlignEndVertical className="h-5 w-5" />
            ) : (
              <AlignCenterVerticalIcon className="h-5 w-5" />
            )}
          </button>
        </div>
        <hr className="border-1 mb-4" />

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto">
          <nav>{selectedMenu.map((item) => renderItem(item, collapsed))}</nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
