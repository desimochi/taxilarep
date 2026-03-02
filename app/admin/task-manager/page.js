"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import BackButton from "@/components/ui/Backbutton";
import Link from "next/link";
import { useEffect, useState } from "react";
import TaskCreator from "./[id]/PostButton";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const allowedNames = [
    "Mohit",
    "Babita",
    "Hitesh",
    "Lalit",
    "Pria",
    "Puneet",
    "Nipender",
    "Kamlesh",
    "Shivani",
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await authFetch("all-employee_list");
        const json = await res.json();

        // Filter API employees
        const filtered = json.data.filter((emp) =>
          allowedNames.includes(emp.first_name)
        );

        // Add missing names manually
        const missingNames = allowedNames.filter(
          (name) => !filtered.some((emp) => emp.first_name === name)
        );

        const manualEmployees = missingNames.map((name, index) => ({
          id: `manual-${index}`,
          first_name: name,
          last_name: "",
          user: {
            email: "-",
            is_active: true,
          },
        }));

        setEmployees([...filtered, ...manualEmployees]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-white rounded-md shadow">
        <BackButton />
        <div className="flex justify-between items-center">
            <div >
 <h2 className="text-xl font-semibold mb-4 px-8 mt-8">IT Staff Task Management</h2>
 </div>
      <TaskCreator />
        </div>
     
<div className="px-8">
      <table className="w-full border-collapse px-8">
        <thead>
          <tr className="border-b text-left text-gray-500 text-sm">
            <th className="py-3">S.No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Task</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp, index) => (
            <tr
              key={emp.id}
              className="border-b hover:bg-gray-50 text-sm"
            >
              <td className="py-3">{index + 1}</td>

              <td className="font-medium">
                {emp.first_name} {emp.last_name}
              </td>

              <td>{emp.user?.email || "-"}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded text-xs font-medium ${
                    emp.user?.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {emp.user?.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td>
                <Link
                href={`/admin/task-manager/${emp.id}`}
                  className="px-4 py-1 text-sm rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                 
                >
                  See tasks
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
