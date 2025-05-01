"use client"
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader, Save, } from "lucide-react";
import { useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Toast from "@/components/Toast";
import { useClassFormData } from "@/hooks/useClassFormData";
import ResueForm from '@/components/Form';

export default function Page() {
    const router = useRouter()
    const { batch, term, course, loading, error } = useClassFormData();    


    return (
        <div className="bg-white min-h-screen">
        <section className="relative">
           <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
           <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
           <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
           <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
            <div className="px-6 pt-8">
            <button 
                onClick={() => router.back()} 
                className="px-12 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
            <ResueForm heading="Add Result Announcement" batch={batch} term={term} course={course} showterm={true} enrollement={false} api="student-result-save" redirect="/exam-components/result"type={true} method="POST"/>
          </div>
        </div>
        </section>
        </div>
    )
}
