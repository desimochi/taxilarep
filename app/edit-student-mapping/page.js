"use client"
import BackButton from "@/components/ui/Backbutton";
import { useEffect, useState } from "react";
import { authFetch } from "../lib/fetchWithAuth";
import { ArrowBigLeft, ArrowBigRight, ArrowLeft, PenBoxIcon } from "lucide-react";
import Link from "next/link";

export default function Page(){
    const [data, setdata] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalpage, setTotalPages] = useState(0)

    useEffect(()=>{
        async function fetchData() {
            setLoading(true)
            try {
                const res =  await authFetch(`student-mapping-viewset?page=${currentPage}`)
                const response = await res.json()
                if(!res.ok){
                    throw new Error("Failed to Fetch Data")
                }
                setdata(response.data)
                setTotalPages(response.extra.total)
            } catch (error) {
                setError(error)
            } finally{
                setLoading(false)
            }
        }
        fetchData()
    },[currentPage])


    return (
        <div className="px-8 py-12">
            <BackButton />
            <div className="px-12 py-4">
                <h1 className="font-bold text-2xl">Edit Student Mapping</h1>
                <p className="text-gray-600 pt-2">Here you can edit the students mapping</p>





                <hr className="border border-b-2 mt-4 mb-8"/>
            </div>
            <div className="px-12">
                <table className="overflow-x-auto w-full text-center">
                     <thead className="min-w-full bg-red-50 text-red-800 border border-red-300 rounded-lg">
                        <tr>
                        <th className=" px-4 py-2">S.no.</th>
                <th className=" px-4 py-2">Term</th>
                <th className=" px-4 py-2">Batch</th>
                <th className=" px-4 py-2">Course</th>
                <th className=" px-4 py-2">Specialisation</th>
                <th className=" px-4 py-2">Action</th>
                </tr>
                     </thead>
                    <tbody>
                    {data.length>0? (data.map((item, index)=> (
                        <tr key={item.id} className="text-sm border border-b-1">
                                <td className="px-2 py-3">{index+1}</td>
                                 <td className="px-2 py-3">{item.term}</td>
                                  <td className="px-2 py-3">{item.batch}</td>
                                   <td className="px-2 py-3">{item.course}</td>
                                    <td className="px-2 py-3">{item.specialization}</td>
                                     <td className="px-2 py-3 flex items-center justify-center text-center"><Link href={`/edit-student-mapping/${item.id}`}><PenBoxIcon className="h-5 w-5" /></Link></td>
                        </tr>
                    ))):(<tr><td colSpan={6} className="p-2 text-gray-600">No Mapping Found</td></tr>)}
                    </tbody>
                </table>
            </div>
            <div className="px-12 py-4 flex justify-between">
                <button disabled={currentPage===1} onClick={()=>setCurrentPage((prev)=>(prev-1))} className={`bg-gray-400 py-2 px-6 rounded-sm text-white flex items-center disabled:opacity-40 disabled:cursor-not-allowed`}><ArrowBigLeft className="h-5 w-5"/>Previous</button>
                <p>{currentPage} of {totalpage} pages</p>
                <button disabled={currentPage===totalpage} onClick={()=>setCurrentPage((prev)=>(prev+1))} className={`bg-red-800 py-2 px-6 rounded-sm text-white flex items-center disabled:opacity-40 disabled:cursor-not-allowed`}>Next <ArrowBigRight className="h-5 w-5"/></button>
            </div>
        </div>
    )
}