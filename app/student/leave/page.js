"use client"
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { authFetch } from '@/app/lib/fetchWithAuth';
import Toast from '@/components/Toast';

export default function Page() {
  const searchParams = useSearchParams();
  const stuId = searchParams.get('stuId'); // get stuId from URL
  const router = useRouter();
 const [message, setmessage] = useState('')
 const [showtoast, setShowToast] = useState(false)
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    student_reason: ''
  });

  useEffect(() => {
    if (!stuId) {
        router.push('/unauthorized'); // replace with your unauthorized route
    }
}, [stuId, router]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      student: Number(stuId), // auto fill student ID from URL
      ...formData
    };
    try {
        const response = await authFetch('student-leave-viewset', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload) // ✅ remove extra parenthesis
        });
      if(!response.ok){
        throw new Error("Request Fail")
      }
      const data =  await response.json()
      setmessage("Your Leave Request Send Successfully")
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
        router.back()
      },2000)
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (<>
  {showtoast && <Toast message={message} />}
  <div className="flex justify-center items-center w-full rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Apply For Leave</h4>
                <form className="py-5 px-5" onSubmit={handleSubmit}>
                
  <label className="font-bold">From </label>
  <input
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        required
        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      />
      <label className="font-bold">To </label>
  <input
         type="date"
         name="end_date"
         value={formData.end_date}
         onChange={handleChange}
         required
        className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
      />
  <label className="font-bold">Reason</label>
  <textarea
        name="student_reason"
        value={formData.student_reason}
        onChange={handleChange}
        placeholder="Enter Your Reason..."
        required
        className='bg-white border border-gray-300 mb-6 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />           
   <button type="submit" className="w-full bg-red-700 py-2 text-white rounded-sm ">Submit Leave</button>             
                </form>
            </div>
</div>
  
  </>
    
  );
}
