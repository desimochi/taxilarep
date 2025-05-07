'use client';

import { useEffect, useState } from 'react';
import { authFetch } from '@/app/lib/fetchWithAuth';
import Toast from '@/components/Toast';
import FullWidthLoader from '@/components/Loaader';

export default function AddFacultyPage() {
  const [loading, setLoading] = useState(false);
  const [permissionloading, setPermissionLoading] = useState(false);
  const [salutations, setSalutations] = useState([]);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');
  const [permissions, setPermissions] = useState({});
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  useEffect(() => {
    const fetchSalutations = async () => {
      try {
        const res = await authFetch('role-viewset');
        const json = await res.json();
        if (res.ok) {
          setSalutations(json.data);
        } else {
          throw new Error(json.message || 'Failed to fetch roles');
        }
      } catch (error) {
        console.error('Error fetching roles:', error.message);
      }
    };

    fetchSalutations();
  }, []);

  useEffect(() => {
    if (showToast || error) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showToast, error]);

  const handleChangePermission = async (e) => {
    const id = e.target.value;
    setSelectedRole(id);
    setPermissionLoading(true);
    try {
      const res = await authFetch(`assign-permissions/${id}`);
      const json = await res.json();
      if (res.ok) {
        setPermissions(json.data.permission);

        // Flatten all permission groups into one array of IDs with has_permission true
        const selected = Object.values(json.data.permission)
          .flat()
          .filter((perm) => perm.has_permission)
          .map((perm) => perm.id);

        setSelectedPermissions(selected);
      } else {
        throw new Error(json.message || 'Failed to fetch permissions');
      }
    } catch (error) {
      console.error('Error fetching permissions:', error.message);
    } finally {
      setPermissionLoading(false);
    }
  };

  const handleCheckboxChange = (permId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId)
        ? prev.filter((id) => id !== permId)
        : [...prev, permId]
    );
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      setError('Please select a role first');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await authFetch(`assign-permissions/${selectedRole}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ permission: selectedPermissions }),
      });
      const json = await res.json();
      if (res.ok) {
        setMessage('Permissions assigned successfully!');
        setShowToast(true);
        setTimeout(() => {
          setMessage('');
          setShowToast(false);
        }, 2000);
      } else {
        setError(json.message || 'Failed to assign permissions');
      }
    } catch (error) {
      setError('Something went wrong while submitting');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {showToast && <Toast message={message} />}
      <div className="flex justify-center items-center w-full rounded-sm py-12">
        <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm w-full max-w-5xl">
          <h4 className="text-center py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white rounded-t-sm">
            Assign Permission
          </h4>
          {error && (
            <p className="text-sm text-red-600 text-center mt-4">{error}</p>
          )}
          <div className="p-4">
            <label className="font-bold">Role</label>
            <select
              onChange={handleChangePermission}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5"
              defaultValue=""
            >
              <option value="" disabled>
                Select a Role
              </option>
              {salutations.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="p-4 grid grid-cols-6 gap-4">
            {permissionloading ? (
              <FullWidthLoader />
            ) : (
              Object.entries(permissions).map(([group, perms]) => (
                <div key={group} className="col-span-4 md:col-span-2">
                  <h3 className="text-lg font-semibold capitalize mb-2">
                    {group.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ')}
                  </h3>
                  <div className="grid grid-cols-1 gap-2 pl-2">
                    {perms.map((perm) => (
                      <label key={perm.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(perm.id)}
                          onChange={() => handleCheckboxChange(perm.id)}
                          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        />
                        <span className="text-sm">{perm.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-fit px-20 mx-4 mb-8 bg-red-700 py-2 text-white rounded-sm hover:bg-red-800 transition mt-5"
          >
            {loading ? 'Submitting…' : 'Submit'}
          </button>
        </div>
      </div>
    </>
  );
}
