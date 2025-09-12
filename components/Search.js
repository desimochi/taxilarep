"use client";
import { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  Accountant,
  menuItems,
  Staff,
  stumenuItems,
  FacmenuItems,
  ITManager,
} from "@/app/lib/MenuItems";

// ✅ Get menu by role (same as Sidebar logic)
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

  // remove duplicates
  return result.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.label === item.label)
  );
};

export default function RoleSearch({ role, type }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const menu = getMenuByRole(role, type);

  // ✅ Flatten menu + submenus for search
 const flattenMenu = (items) =>
  items.flatMap((item) => [
    ...(item.path ? [{ label: item.label, path: item.path }] : []),
    ...(item.subMenu ? flattenMenu(item.subMenu) : []),
  ]);

  const searchItems = flattenMenu(menu);

  const filtered =
    query.trim() === ""
      ? []
      : searchItems.filter((item) =>
          item.label.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="relative ">
      {/* Search Bar */}
      <div className="flex items-center bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-gray-300">
        <Search className="h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="Search dashboard..."
          className="flex-1 bg-transparent focus:outline-none px-2"
        />
      </div>

      {/* Results Dropdown */}
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          {filtered.map((item) => (
            <Link
              key={item.label}
              href={item.path}
              className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-800"
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* No results */}
      {open && query && filtered.length === 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg p-4 text-gray-500 text-sm">
          No results found
        </div>
      )}
    </div>
  );
}
