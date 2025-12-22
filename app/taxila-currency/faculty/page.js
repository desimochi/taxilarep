"use client";

import { useContext, useEffect, useState } from "react";
import BulkProjectModal from "./BulkProjectModal";
import { GlobalContext } from "@/components/GlobalContext";
import { authFetch } from "@/app/lib/fetchWithAuth";
import EditTaxilaCurrencyModal from "./EditTaxilaCurrencyModal";
import AddObtainedCurrencyModal from "./AddObtainedCurrencyModal";

export default function CreateBulkProject() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currencyProject, setCurrencyProject] = useState(null);

const [editProject, setEditProject] = useState(null);
  const { state } = useContext(GlobalContext);
  const facId = state.user_id;

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await authFetch(
        `taxila-currnency-project-faculty-wise/${facId}`
      );
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (facId) fetchProjects();
  }, [facId]);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-12 py-8">
        <h1 className="text-2xl font-bold">Taxila Currency Project</h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Create Bulk Project
        </button>
      </div>

      {/* Table */}
      <div className="px-12">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto border rounded">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 text-left">Student</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Batch</th>
                  <th className="p-2 text-left">Project</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Days</th>
                  <th className="p-2 text-left">Currency</th>
                  <th className="p-2 text-left">Obtained</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Action</th>
                  <th className="p-2 text-left">Currency</th>
                </tr>
              </thead>

              <tbody>
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={9} className="p-4 text-center text-gray-500">
                      No projects found
                    </td>
                  </tr>
                )}

                {projects.map((p) => (
                  <tr key={p.id} className="border-t">
                    <td className="p-2 font-medium">
                      {p.student.first_name} {p.student.last_name}
                    </td>
                    <td className="p-2">{p.student.user.email}</td>
                    <td className="p-2">{p.student.batch?.name}</td>
                    <td className="p-2">{p.project_name}</td>
                    <td className="p-2">{p.project_date}</td>
                    <td className="p-2">{p.project_days}</td>
                    <td className="p-2 font-semibold">
                      {p.taxila_currency}
                    </td>
                    <td className="p-2">{p.obtained_currency}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          p.project_status === "Approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {p.project_status}
                      </span>
                    </td>

                    <td className="p-2">
  <button
    onClick={() => setEditProject(p)}
    className="text-blue-600 hover:underline text-sm"
  >
    Edit
  </button>
</td>
<td className="p-2">
  {p.is_disable_after_add_one_time_obtained_currency ? (
    <span className="text-gray-500 text-xs">Already Added</span>
  ) : (
    <button
      onClick={() => setCurrencyProject(p)}
      className="text-green-600 hover:underline text-sm"
    >
      Award Currency
    </button>
  )}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
{editProject && (
  <EditTaxilaCurrencyModal
    project={editProject}
    onClose={() => setEditProject(null)}
    onSuccess={fetchProjects}
  />
)}
{currencyProject && (
  <AddObtainedCurrencyModal
    project={currencyProject}
    onClose={() => setCurrencyProject(null)}
    onSuccess={fetchProjects}
  />
)}
      {/* Modal */}
      {open && (
        <BulkProjectModal
          onClose={() => {
            setOpen(false);
            fetchProjects(); // refresh after create
          }}
          facultyId={facId}
        />
      )}
    </>
  );
}
