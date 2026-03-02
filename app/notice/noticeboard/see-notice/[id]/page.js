"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { ArrowLeft } from "lucide-react";

export default function NoticeDetail() {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
const router = useRouter()
  useEffect(() => {
    async function fetchNotice() {
      const res = await authFetch(`noticeboard-viewset/${id}`);
      const data = await res.json();

      setNotice(data.data);
    }

    if (id) {
      fetchNotice();
    }
  }, [id]);

  if (!notice) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative">
           
    <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
    <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
    <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
    <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
     <div className="px-6 py-6">
     <button 
                onClick={() => router.back()} 
                className="px-12 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
            <div className="px-12 py-6">
     <h1 className="text-2xl font-bold">{notice.title}</h1>
     <p className="text-gray-500 text-sm mt-2">
        {new Date(notice.date).toLocaleDateString()} -{" "}
        {new Date(notice.valid_date).toLocaleDateString()}
      </p>
     <hr className=" border border-b-2 mt-4 mb-8"/>
      <p dangerouslySetInnerHTML={{ __html: notice.description }} />
      
      </div>
      </div>
    </div>
    </section>
   
  );
}
