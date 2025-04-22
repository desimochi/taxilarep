"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';

export default function Page (){
    const [exam, setExams] =  useState()
    const [loading, setLoading] =  useState(false)
    const params = useParams();
  const id = params.id;
      useEffect(() => {
        const fetchExams = async () => {
            setLoading(true)
            try {
                const response = await authFetch(`employee-viewset/${id}`); // Replace with your API URL
                const data = await response.json();
                setExams(data.data);
            } catch (error) {
                console.error("Error fetching exams:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchExams();
    }, []);
    return(
        <div className="p-6 min-h-screen">
        <div className="bg-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-2 font-sans">Faculty </h1>
            <p className="text-sm text-gray-500 mb-8">Everyhting you need to know about faculty</p>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
            <div className="mb-4 flex items-center justify-between gap-2">
            </div>
            </div>
            </div>
    )
}