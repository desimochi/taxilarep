"use client"
import { useRouter } from 'next/navigation'
import { ArrowLeft } from "lucide-react"
export default function BackButton() {
    const router = useRouter()
    
        return (
            <button
                onClick={() => router.back()}
                className="px-12 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
            >
                <ArrowLeft className='h-4 w-4' /> Back to List
            </button>
        )       
}