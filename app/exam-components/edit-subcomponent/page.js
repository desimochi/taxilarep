'use client';

import { authFetch } from '@/app/lib/fetchWithAuth';
import { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";
import Toast from '@/components/Toast';


export default function EditSubcomponent() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
const searchParams = useSearchParams();
    const [showToast, setShowToast] = useState(false);
    const[message, setmessage] = useState("")
    const componentID = searchParams.get("componentID"); 
  // Async function to load data
  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
    

      if (!componentID) {
        throw new Error("componentID not found in URL");
      }

      const res = await authFetch(`subcomponents-action/${componentID}`);
      const result = await res.json();

      if (result.code !== 200) {
        throw new Error(result.error_message || "Failed to load data");
      }

      setFormData(result.data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch(`subcomponents-action/${componentID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.code === 200) {
        setmessage("Sub Component Updated Successfully")
        setShowToast(true)
        setTimeout(() => {
          setmessage("")
          setShowToast(false)
          window.location.reload()
        }, 2000);
      } else {
        throw new Error(result.error_message || 'Update failed!');
      }
    } catch (err) {
      setmessage(err)
      showToast(true)
      setTimeout(() => {
        showToast(false)
      }, 2000);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;

  return (
    <>
    {showToast && <Toast message={message}/>}
    <div className='border px-8 py-4 max-w-3xl mx-auto mt-8'>
      <h3 className="text-center w-full py-2 bg-red-50 text-red-800 font-bold rounded-sm">Edit Subcomponent</h3>
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl mx-auto mt-6  rounded">
      <div>
        <label className="block font-semibold">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Description</label>
        <textarea
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">Start Date</label>
        <input
          type="datetime-local"
          name="start_date"
          value={formData.start_date?.slice(0, 16)}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label className="block font-semibold">End Date</label>
        <input
          type="datetime-local"
          name="end_date"
          value={formData.end_date?.slice(0, 16)}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <label>
          <input
            type="checkbox"
            name="is_submission"
            checked={formData.is_submission}
            onChange={handleChange}
          /> Submission Required
        </label>

        <label>
          <input
            type="checkbox"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
          /> Active
        </label>
      </div>

      <button type="submit" className="bg-red-800 text-white px-4 py-2 rounded">
        Update Subcomponent
      </button>
    </form>
    </div>
    </>
  );
}
