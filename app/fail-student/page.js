"use client"

import { useState } from "react";
import { useEffect } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import ResultsTable from "./FailStudent";
import { SearchIcon } from "lucide-react";

export default function Page(){
    const [datas, setData] =  useState([])
    const [datas1, setData1] =  useState([])
    const [admit, setAdmit] = useState([])
    const [batch, setBatch] = useState()
    const [term, setTerm] = useState()
    const [type, setType] = useState()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    useEffect(()=>{
        async function fetchAdmitCard() {
            setLoading(true)
            try {
                const [response, response1] = await Promise.all([
                authFetch(`batches-list`),
                authFetch(`terms-list`)
            ]);
                if(!response.ok){
                    throw new Error("Something Went Wronf")
                }
                const data = await response.json()
                const data1 = await response1.json()
                console.log(data1);
                setData(data.data)
                setData1(data1.data)
               
            } catch (error) {
                
            }
        }
        fetchAdmitCard()
    },[])

    async function  handlechange() {
        try {
            const response = await authFetch(`student-result-status?batch=${batch}&term=${term}&type=${type}`)
            if(!response.ok){
                throw new Error("Something Went Wronf")
            }
            const data = await response.json()
            setAdmit(data.data)
        } catch (error) {
            
        }
        
    }
    return (
<div className=" py-8 px-12">
    <h1 className="text-2xl font-bold mb-3">List of Fail Students </h1>
<div className=" flex flex-col sm:flex-row gap-2">
    
<select name="batch" onChange={(e)=>setBatch(e.target.value)} className="border border-gray-300 shadow rounded-md w-80 p-2">
 <option value={0} >Select Batch</option>
 {datas.map((item)=>(
    <option key={item.id} value={item.id}>{item.name}</option>
 ))}
</select>
<select name="term" onChange={(e)=>setTerm(e.target.value)} className="border border-gray-300 shadow rounded-md w-80 p-2">
 <option value={0} >Select Term</option>
 {datas1.map((item)=>(
    <option key={item.id} value={item.id}>{item.name}</option>
 ))}
</select>
<select name="type" onChange={(e)=>setType(e.target.value)} className="border border-gray-300 shadow rounded-md w-80 p-2">
 <option value={0} >Select Type</option>
  <option  value='main'>Main</option>
   <option value='resit-1'>Resit-1 </option>
    <option  value='resit-2'>Resit-2</option>
</select>
<button onClick={handlechange} className="bg-red-700 text-white px-16 py-2 rounded-md flex gap-1 items-center"><SearchIcon/> Search</button>
<hr className="border border-b-2 mt-4 mb-4"/>

</div>
{admit.length > 0 ? (
    <ResultsTable results={admit} type={type} />
) : (
    <p className="text-center text-gray-600 mt-3">No Fail Students found.</p>
)}
</div>

    )
}