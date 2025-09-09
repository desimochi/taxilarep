"use client"
import RichTextEditor from "@/components/CKEditor";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft, BookAIcon } from "lucide-react";
import BackButton from "@/components/ui/Backbutton";

export default function Page(){
    const searchParams = useSearchParams();
    const router = useRouter()
    const subID = searchParams.get("subID");
    return <div className="p-2 sm:p-6">
        <BackButton/>
            <div className={`  py-8 sm:px-12 `}>
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div className="sm:w-3/5">
                        <h5 className="text-2xl font-bold flex gap-1">
                          <BookAIcon className="w-7 h-7" /> Edit Syllabus
                        </h5>
                      </div>
                      <div className=" flex gap-3">
                       
                      </div>
                    </div>
                  </div>
         <RichTextEditor id={subID} api ="subject-mapping-syllabus"/></div>
}