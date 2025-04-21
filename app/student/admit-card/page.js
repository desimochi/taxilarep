"use client"

import Image from "next/image";
import logo from "@/public/logo.png";
import { useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Link from "next/link";
import { DownloadCloudIcon } from "lucide-react";
import { GlobalContext } from "@/components/GlobalContext";
import FullWidthLoader from "@/components/Loaader";
export default function Page(){
    const [datas, setData] =  useState([])
    const [admit, setAdmit] = useState([])
    const {state} =  useContext(GlobalContext)
    const [batch, setBatch] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const id  = state.user_id
    useEffect(()=>{
        async function fetchAdmitCard() {
            setLoading(true)
            try {
                const response = await authFetch(`student-viewset/${id}`)
                if(!response.ok){
                    throw new Error("Something Went Wronf")
                }
                const data = await response.json()
                setData(data.data?.batch.id)
                setLoading(false)
            } catch (error) {
                
            }
        }
        fetchAdmitCard()
    },[id])
useEffect(()=>{
    async function  handlechange() {
        try {
            const response = await authFetch(`batch-wise-hall-ticket-announced/${datas}`)
            if(!response.ok){
                throw new Error("Something Went Wronf")
            }
            const data = await response.json()
            setAdmit(data.data)
        } catch (error) {
            
        }
        
    }
    handlechange()
},[datas])
    
  
    return (
<div className="mx-auto max-w-2xl py-8">
{loading ? <FullWidthLoader /> : <div className="border border-gray-300 rounded-sm p-4 px-6">
    <h3 className="text-center text-xl text-red-800 font-bold">Download Admit Card</h3>
    <hr className="border border-b-2 mt-3 mb-4" />
   <hr className="border border-b-2 mt-4 mb-4"/>
{admit.length > 0 && (
    admit.map((item) => (
        <div key={item.id} className="flex justify-between mt-3 items-center">
            <p className="font-bold text-red-800">{item.term?.name}</p>
            <Link href={`/student/admit-card/download?term=${item.term?.id}`} className="text-sm bg-red-50 text-red-800 py-0.5 px-2 rounded-sm flex items-center gap-2"><DownloadCloudIcon className="h-3 w-3"/>Download</Link>
        </div>
    ))
)}
</div>}
</div>

    )
}