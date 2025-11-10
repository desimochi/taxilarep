"use client";
import {
  Accountant,
  menuItems,
  Staff,
  stumenuItems,
  FacmenuItems,
  ITManager,
  EPGDMAdmin,
  EPGDMStudnets
} from "@/app/lib/MenuItems";
import Link from "next/link";

const RoleCards = ({ role, type, batch }) => {
  // 🔹 Build menu based on role
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
                  result = 
                  batch === "EPGDM T-2" 
                  ?[...result, ...EPGDMStudnets]
                   : [...result, ...stumenuItems];
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
           case "8":
          result = [...result, ...EPGDMAdmin];
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

  const cards = getMenuByRole(role, type);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full">
      {cards.map((item) => (
        <Link key={item.label}  href={item.label === "Simulations" ? "/game" : (item.path || "#")}>
          <div className="group bg-white border border-gray-100 p-6 flex flex-col items-center justify-center cursor-pointer transform transition-all hover:shadow-2xl hover:-translate-y-1 hover:bg-gradient-to-br from-gray-100 to-gray-50">
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-gray-800 border text-3xl  group-hover:scale-110 transition">
              {item.icon}
            </div>

            {/* Label */}
            <h3 className="mt-4  text-gray-900 group-hover:text-gray-600">
              {item.label}
            </h3>

            {/* Subtext */}
            <p className="text-gray-500 text-sm mt-1">
              Access {item.label} features
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RoleCards;
