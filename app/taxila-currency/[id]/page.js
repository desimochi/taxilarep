'use client'
import { useParams } from "next/navigation";
import ProjectList from "./ProjectList";

export default function Page(){
    const {id} = useParams()
     
    return (
        <div className="relative">
         <section className="relative">
        <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
        <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
        <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
        <div className="w-full pt-12 px-2 sm:px-16 relative z-10 backdrop-blur-3xl min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                     <h1 className="text-3xl font-bold mb-2 font-sans">Welcome to Taxila Currency</h1>
            <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about Your Currency</p>
                </div>
               
            </div>
       
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
            <div className="flex">
            <ProjectList id={id} />
            </div>

            
    </div>
    </section>


        </div>
    )
}