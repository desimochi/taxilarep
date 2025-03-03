import Image from "next/image";
import { Star } from "lucide-react";
import businessnalytics from "@/public/2150970195.jpg"
import pgpm from "@/public/pgpm.jpg"
import epgdm from "@/public/epgdm.jpg"

export default function Page(){
     return ( 
        <section className="relative bg-stone-50">
        <div className="bg-red-400 w-full sm:w-40 h-40 rounded-full absolute top-1 opacity-20 max-sm:right-0 sm:left-56 z-0"></div>
        <div className="bg-red-500 w-full sm:w-40 h-24 absolute top-0 -left-0 opacity-20 z-0"></div>
        <div className="bg-rose-300 w-full sm:w-40 h-24 absolute top-40 -left-0 opacity-20 z-0"></div>
        <div className="w-fullpy-24 relative z-10 backdrop-blur-3xl">
            <div className="flex gap-3 p-8">
            <div className="w-3/4">
            <div className="relative w-full rounded-xl shadow-lg">
      <div className="relative rounded-xl h-72 w-full">
        <Image
          src={businessnalytics} // Replace with actual image path
          alt="business Analytics"
          layout="fill"
          objectFit="cover"
          className="rounded-xl border border-gray-700 blur-0"
        />
      </div>
      <div className="absolute top-6 right-0 bg-white m-4 p-4 rounded-lg shadow-md w-100">
        <h2 className="text-lg font-semibold">PGDM with Business Analytics + Triple Specilization</h2>
        <p className="text-sm text-gray-500">Batch Active - T 28, T 29</p>
        <p className="text-gray-600 text-sm mt-2">
          Takes you to the most iconic destinations around the world. Experience natural.
        </p>
      
        <button className="w-full bg-red-700 text-white font-semibold text-sm py-2 mt-4 rounded-lg hover:bg-red-600">
          Check Complete Details
        </button>
      </div>
    </div>
            <div className="flex gap-3 mt-3">
                <div className="w-1/2">
                    <div className="border shadow-2xl bg-white rounded-xl">
                        <Image src={pgpm} alt="PGPM"
          objectFit="cover" className="rounded-xl w-full" />
                        <div className="p-4">
                        <h5 className="text-lg font-semibold">Post Gradution Program in Managment</h5>
                        <p>Online Program</p>
                       
                        <button className="w-full bg-red-700 text-white font-semibold text-sm py-2 mt-4 rounded-lg hover:bg-red-600">Check details</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="w-1/4">
            
            </div>
            </div>
       </div>
      </section>
                                            
    )
}