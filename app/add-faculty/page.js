'use client';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { authFetch } from '../lib/fetchWithAuth';
import Toast from '@/components/Toast';
export default function AddFacultyPage() {
  const [loading, setLoading] = useState(false)
  const [salutations, setSalutations] = useState([]);
  const [message, setMessage] = useState("")
  const[showToast, setShowToast]= useState(false)
  const [error, setError]= useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchSalutations = async () => {
      try {
        const res = await authFetch('salutation-viewset'); // <-- Replace with your actual endpoint
        const json = await res.json();
        if (res.ok) {
          setSalutations(json.data);
        } else {
          throw new Error(json.message || 'Failed to fetch salutations');
        }
      } catch (error) {
        console.error('Error fetching salutations:', error.message);
      }
    };

    fetchSalutations();
  }, []);



  const onSubmit = async (data) => {
    const {
      salutation,
      first_name,
      last_name,
      contact_no,
      email,
      date_of_birth,
    } = data;
    const payload = {
      user:{
        email,
        user_type : "EMPLOYEE",
      },
      salutation : parseInt(salutation),
      first_name,
      last_name,
      contact_no,
      date_of_birth,
      employee_type : "Teaching",
      employee_role : [4]
    };
    setLoading(true)
    try {
      const response = await authFetch('employee-viewset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong!');
      }

      setMessage("Faculty Added Successfully")
      setShowToast(true)
      setLoading(false)
      setTimeout(()=>{
        setMessage("")
        setShowToast(false)
        window.location.replace("/all-faculty")
      },2000)
    } catch (error) {
      setError(error.message)
      setLoading(false)
    } finally{
      setLoading(false)
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center w-full rounded-sm py-12">
      {showToast && <Toast message={message}/>}
      <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm w-full max-w-2xl">
        <h4 className="text-center py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white rounded-t-sm">
          Add A Faculty
        </h4>
        {error && <p className='text-sm text-red-600 text-center mt-4'>{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="py-5 px-5 space-y-4">
          <div>
            <label className="font-bold">Title</label>
            <select
              {...register('salutation', { required: 'salutation is required' })}
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5"
              defaultValue=""
            >
              <option value="" disabled>
                Select a Title
              </option>
              {salutations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            {errors.title && <p className="text-red-600">{errors.title.message}</p>}
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="font-bold">First Name</label>
              <input
                {...register('first_name', { required: 'First name is required' })}
                type="text"
                placeholder="Enter First Name"
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5"
              />
              {errors.first_name && <p className="text-red-600">{errors.first_name.message}</p>}
            </div>
            <div className="w-1/2">
              <label className="font-bold">Last Name</label>
              <input
                {...register('last_name', { required: 'Last name is required' })}
                type="text"
                placeholder="Enter Last Name"
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5"
              />
              {errors.last_name && <p className="text-red-600">{errors.last_name.message}</p>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="font-bold">Mobile</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex bg-red-50 items-center p-3 text-sm text-red-800 border border-red-300 rounded-l-sm">+91</span>
                <input
                  {...register('contact_no', {
                    required: 'Mobile number is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Enter a valid 10-digit mobile number',
                    },
                  })}
                  type="tel"
                  maxLength={10}
                  placeholder="Enter Mobile No."
                  className="pl-16 bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5"
                />
              </div>
              {errors.contact_no && <p className="text-red-600">{errors.contact_no.message}</p>}
            </div>

            <div className="w-1/2">
              <label className="font-bold">Email</label>
              
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Enter Email Address"
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5"
              />
              {errors.email && <p className="text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="font-bold">Date of Birth</label>
            <input
              {...register('date_of_birth', { required: 'Date of Birth is required' })}
              type="date"
              className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm block w-full p-2.5"
            />
            {errors.date_of_birth && <p className="text-red-600">{errors.date_of_birth.message}</p>}
          </div>

          <button type="submit" disabled ={loading} className="w-full bg-red-700 py-2 text-white rounded-sm hover:bg-red-800 transition">
            {loading? "Submitting....": "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
