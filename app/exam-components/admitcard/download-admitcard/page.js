"use client"

import Image from "next/image";
import logo from "@/public/logo.png";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Link from "next/link";
import { DownloadCloudIcon } from "lucide-react";
export default function Page(){
    const [datas, setData] =  useState([])
    const [admit, setAdmit] = useState([])
    const [batch, setBatch] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    useEffect(()=>{
        async function fetchAdmitCard() {
            setLoading(true)
            try {
                const response = await authFetch(`batches-list`)
                if(!response.ok){
                    throw new Error("Something Went Wronf")
                }
                const data = await response.json()
                setData(data.data)
            } catch (error) {
                
            }
        }
        fetchAdmitCard()
    },[])

    async function  handlechange(e) {
        const id = e.target.value
        setBatch(id)
        try {
            const response = await authFetch(`batch-wise-hall-ticket-announced/${id}`)
            if(!response.ok){
                throw new Error("Something Went Wronf")
            }
            const data = await response.json()
            setAdmit(data.data)
        } catch (error) {
            
        }
        
    }
    return (
<div className="mx-auto max-w-2xl py-8">
<div className="border border-gray-300 rounded-sm p-4 px-6">
    <h3 className="text-center text-xl text-red-800 font-bold">Download Admit Card</h3>
    <hr className="border border-b-2 mt-3 mb-4" />
    <label className="font-bold mb-2">Batch</label>
<select name="batch" onChange={handlechange} className="border border-gray-300 w-full p-2">
 <option value={0} >Select Batch</option>
 {datas.map((item)=>(
    <option key={item.id} value={item.id}>{item.name}</option>
 ))}
</select>
<hr className="border border-b-2 mt-4 mb-4"/>
{admit.length > 0 ? (
    admit.map((item) => (
        <div key={item.id} className="flex justify-between mt-3 items-center">
            <p className="font-bold text-red-800">{item.term?.name} - {item.type}</p>
            <Link href={`/exam-components/admitcard/download?term=${item.term?.id}&batch=${batch}&type=${item.type}`} className="text-sm bg-red-50 text-red-800 py-0.5 px-2 rounded-sm flex items-center gap-2"><DownloadCloudIcon className="h-3 w-3"/>Download</Link>
        </div>
    ))
) : (
    <p>No admits found.</p>
)}
</div>
</div>

    )
}