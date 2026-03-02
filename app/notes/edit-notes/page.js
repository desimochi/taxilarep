"use client"
import RichTextEditor from "@/components/CKEditor";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookAIcon } from "lucide-react";

export default function Page(){
    const searchParams = useSearchParams();
    const router = useRouter()
    const subID = searchParams.get("subID");
    return <div className="p-6">
        <button 
                onClick={() => router.back()} 
                className="px-6 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to Subject
            </button>
            <div className={`rounded-xl mt-4  p-2   py-8 px-12 `}>
                    <div className="flex justify-between items-center gap-2">
                      <div className="w-3/5">
                        <h5 className="text-2xl font-bold flex gap-1">
                          <BookAIcon className="w-7 h-7" /> Edit Notes
                        </h5>
                      </div>
                      <div className=" flex gap-3">
                       
                      </div>
                    </div>
                  </div>
         <RichTextEditor id={subID} api ="subject-mapping-notes"/></div>
}