'use client'
import React, { useState, useEffect, useContext } from 'react';
import { Eye, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { authFetch } from '@/app/lib/fetchWithAuth';
import { GlobalContext } from '@/components/GlobalContext';

export default function ProjectList({id}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);
  const [currencyInputs, setCurrencyInputs] = useState({});
  const [obtained_currency, setObtained_currency] = useState("")

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const response = await authFetch(`student-currency-project/${id}`);
      const result = await response.json();

      if (result.code === 200) {
        setProjects(result.data);
        setError(null);
      } else {
        setError('Failed to fetch project data');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

const saveProject = async (id, currencyValue) => {
  try {
    setSaving(true);

    const payload = {
      obtained_currency: currencyValue, // 👈 Add this
    };

    const res = await authFetch(
      `taxila-currency-viewset/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload)
      }
    );

    const result = await res.json();

    if (result.code === 200) {
      await fetchProject();
      setSelectedProject(null);
      setIsEditing(false);
    } else {
      alert("Failed to update project");
    }
  } catch (err) {
    alert("Error saving: " + err.message);
  } finally {
    setSaving(false);
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <AlertCircle className="w-4 h-4" />;
      case 'Approved': return <CheckCircle className="w-4 h-4" />;
      case 'Rejected': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <div className="text-red-500 text-center mb-4">
            <XCircle className="w-12 h-12 mx-auto mb-2" />
            <h2 className="text-xl font-bold">Error</h2>
          </div>
          <p className="text-gray-600 text-center mb-4">{error}</p>

          <button
            onClick={fetchProject}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className=" mt-4">
        <div className="bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden">
          <div className='flex justify-between items-center'>
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Your Projects</h1>
          </div>
          <div>
          </div>
</div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Give Obtain Marks</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{project.project_name}</td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(project.project_status)}`}
                      >
                        {getStatusIcon(project.project_status)}
                        {project.project_status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setIsEditing(false);
                        }}
                        className="text-indigo-600 hover:text-indigo-900 flex gap-2 items-center"
                      >
                        <Eye className="w-5 h-5" /> View / Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                         <div>
                    <label className="font-semibold text-xs text-gray-700">Obtained Currency</label>
                    <div className='flex gap-3'>
<input
  type="number"
  value={currencyInputs[project.id] || ""}
  onChange={(e) =>
    setCurrencyInputs({
      ...currencyInputs,
      [project.id]: e.target.value,
    })
  }
  className="w-full border px-3 py-2 rounded mt-1"
/>
                    <button onClick={()=>saveProject(project.id, currencyInputs[project.id])} className='bg-zinc-950 px-4 py-2 text-white w-80' >Give Currency</button>
                    </div>
                   
                  </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- */}
      {/* ---------------------- MODAL ---------------------- */}
      {/* -------------------------------------------------- */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">

            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-red-800 to-red-600 p-6 text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {isEditing ? "Edit Project" : "Project Details"}
              </h2>

              <button onClick={() => setSelectedProject(null)} className="p-2 rounded-full hover:bg-white/20">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">

              {/* EDIT BUTTON */}
              {!isEditing && (
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditData(selectedProject);
                    }}
                    className="bg-zinc-950 text-white px-4 py-2 rounded-lg hover:bg-zinc-900"
                  >
                    Edit Project
                  </button>
                </div>
              )}

              {/* ---------------- VIEW MODE ---------------- */}
              {!isEditing && (
                <table className="w-full border-collapse">
                  <tbody>

                    {Object.entries({
                      "Project ID": selectedProject.id,
                      "Project Name": selectedProject.project_name,
                      "Status": selectedProject.project_status,
                      "Student ID": selectedProject.student,
                      "Project Date": new Date(selectedProject.project_date).toLocaleDateString(),
                      "Project Days": selectedProject.project_days,
                      "Taxila Currency": selectedProject.taxila_currency,
                      "Obtained Currency": selectedProject.obtained_currency,
                      "Project Description": selectedProject.project_description || "N/A",
                      "Work Description": selectedProject.project_work_description || "N/A",
                      "Active": selectedProject.is_active ? "Yes" : "No",
                      "Created At": new Date(selectedProject.created_at).toLocaleString(),
                      "Updated At": new Date(selectedProject.updated_at).toLocaleString(),
                    }).map(([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="py-3 px-4 bg-gray-50 font-semibold w-1/3">{key}</td>
                        <td className="py-3 px-4">{value}</td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              )}

              {/* ---------------- EDIT MODE ---------------- */}
              {isEditing && (
                <div className="grid md:grid-cols-2 gap-6">

                  {/* Project Name */}
              
                
              {/* Status */}
                  <div>
                    <label className="font-semibold text-gray-700">Status</label>
                    <select
                      className="w-full border px-3 py-2 rounded mt-1"
                      value={editData.project_status}
                      onChange={(e) => setEditData({ ...editData, project_status: e.target.value })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  {/* Student ID */}
                  

                  {/* Project Date */}
              

                  {/* Project Days */}
               

                  {/* Taxila Currency */}
                  <div>
                    <label className="font-semibold text-gray-700">Taxila Currency</label>
                    <input
                      type="number"
                      value={editData.taxila_currency}
                      onChange={(e) => setEditData({ ...editData, taxila_currency: e.target.value })}
                      className="w-full border px-3 py-2 rounded mt-1"
                    />
                  </div>

                  {/* Obtained Currency */}
                 

                  {/* Project Description */}
              

                  {/* Work Description */}
            

                  {/* Active */}
                  <div>
                    <label className="font-semibold text-gray-700">Active</label>
                    <select
                      className="w-full border px-3 py-2 rounded mt-1"
                      value={editData.is_active ? "Yes" : "No"}
                      onChange={(e) =>
                        setEditData({ ...editData, is_active: e.target.value === "Yes" })
                      }
                    >
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>

                </div>
              )}

              {/* FOOTER BUTTONS */}
              <div className="mt-6 flex justify-end gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2 rounded-lg border"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={saveProject}
                      disabled={saving}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Close
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
