'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authFetch } from '@/app/lib/fetchWithAuth';
import Toast from '@/components/Toast';
import { ArrowLeft } from 'lucide-react';

export default function EditAdmitCard() {
    const router = useRouter()
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const[message, setMessage] = useState("")
  const [showtoast, setShowToast] = useState(false)
  const [formData, setFormData] = useState({
    batchName: '',
    termName: '',
    is_active: false,
  });
  // Fetch data based on ID
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await authFetch(`exam-result-viewset/${id}`);
        const json = await res.json();
          setFormData({
            batchName: json.data?.batch?.name || '',
            termName: json.data?.term?.name || '',
            is_active: json.data?.is_active,
            type : json.data?.type 
          });
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle checkbox toggle
  const handleCheckbox = (e) => {
    setFormData((prev) => ({
      ...prev,
      is_active: e.target.checked,
    }));
  };

  // Submit only is_active change
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authFetch(`exam-result-viewset/${id}`, {
        method: 'PUT', // or PATCH depending on your backend
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: formData.is_active }),
      });
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      setMessage("Staus Updated Successfully")
      setShowToast(true)
      setTimeout(()=>{
        setMessage("")
        setShowToast(false)
        router.push('/exam-components/admitcard')
      },2000)
    } catch (err) {
      setError(err.message)
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className='px-8 py-6'>
          <button 
                onClick={() => router.back()} 
                className="px-12 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
        
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        {showtoast && <Toast message={message}/>}
      
      <h2 className="text-xl text-center text-red-800 font-bold mb-4">Edit Result Status</h2>
      <hr className=' border border-b-2 mt-4 mb-4'/>
    {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Batch</label>
          <input
            value={formData.batchName}
            className="w-full mt-1 p-2 border rounded bg-gray-100"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Term</label>
          <input
            value={formData.termName}
            className="w-full mt-1 p-2 border rounded bg-gray-100"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">Term</label>
          <input
            value={formData.type}
            className="w-full mt-1 p-2 border rounded bg-gray-100"
            readOnly
          />
        </div>

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={handleCheckbox}
            id="is_active"
            className="w-4 h-4"
          />
          <label htmlFor="is_active" className="text-gray-700 font-medium">
            Is Active
          </label>
        </div>

        <button
          type="submit"
          className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Update
        </button>
      </form>
    </div>
    </div>
  );
}
