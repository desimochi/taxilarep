"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";
import BackButton from "@/components/ui/Backbutton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const [message, setMessage] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [user, setUser] = useState("")
    const searchParamas = useSearchParams()
    const id = searchParamas.get("id")
    useEffect(()=>{
               async function fetchDepartmentData(){
                setLoading(true)
                        try {
                            const respose =  await authFetch(`employee-role-edit/${id}`)
                            const data = await respose.json()
                            if(!respose.ok ){
                                throw new Error("")
                            }
                            setRoles(data.data)
                            setUser(data.extra.employee_name)
                            setLoading(false)
                        } catch (error) {
                            setError(error.message)
                        } finally {
                            setLoading(false)
                        }
                }
                fetchDepartmentData()
            },[id])
            const handleChange = (roleId) => {
                const updated = roles.map((role) =>
                  role.id === roleId ? { ...role, assigned: !role.assigned } : role
                );
                setRoles(updated);
              };
              async function handleSubmit() {
                setLoading(true);
                try {
                  const role_ids = roles
                    .filter((role) => role.assigned)
                    .map((role) => role.id);
              
                  const response = await authFetch(`employee-role-edit/${id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ role_ids }),
                  });
              
                  const result = await response.json();
                  if (!response.ok) throw new Error(result.message || "Failed to update roles");
              
                  setMessage("Roles updated successfully.");
                  setShowToast(true);
                  setTimeout(()=>{
                    setMessage("")
                    setShowToast(false)
                  },2000)
                } catch (err) {
                  setError(err.message || "Error submitting roles");
                } finally {
                  setLoading(false);
                }
              }
    return(
        <div className="px-12 py-8">
            {showToast && <Toast message={message} setShowToast={setShowToast} />}
           <BackButton />
           <div className="max-w-3xl mx-auto py-8">
            <div className="border border-red-50 p-4 rounded-sm shadow-lg">
                <h3 className="text-center text-xl font-bold text-red-800">Assign Role to - {user}</h3>
                <hr className="border border-b-1 border-dashed mt-3 mb-4 border-red-800" />
                {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-2">
                {roles.map((role, index) => (
                    <div key={index} className="flex items-center gap-2 mb-4">
                        <input
                  type="checkbox"
                  id={`role-${role.id}`}
                  checked={role.assigned}
                  onChange={() => handleChange(role.id)}
                  className="h-4 w-4"
                />
                        <label htmlFor={role.id} className="text-gray-700">{role.name}</label>
                    </div>
                ))}
            </div>
            <hr className="border border-b-1 mt-3 mb-4" />
            <button className="bg-red-800 text-white px-4 py-2 rounded-sm hover:bg-red-700" onClick={handleSubmit}>Update</button>
            </div>
            </div>
        </div>
    )
}