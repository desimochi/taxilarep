"use client"
import { useParams } from "next/navigation"
import { useRouter } from 'next/navigation';
import { ArrowLeft, PenSquareIcon, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "@/components/Loaader";

import Link from "next/link";

export default function Page() {
    const router = useRouter()
    const [clases, setClases] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setLoading(true)
                const response = await authFetch(`exam-result-viewset`)
                if (!response.ok) throw new Error("Failed to fetch data")
                const data = await response.json()
                setClases(data.data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClassData()
    }, [])

    // Filtered data
    // const filteredClasses = clases.filter(cls =>
    //     cls.batch?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    // )

    return (
        <div className="bg-white min-h-screen">
            <section className="relative">
                <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
                <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
                <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
                <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
                    <div className="px-6 pt-8">
                        <button
                            onClick={() => router.back()}
                            className="px-12 py-1 flex align-middle items-center gap-1 text-gray-600 text-sm rounded"
                        >
                            <ArrowLeft className='h-4 w-4' /> Back to List
                        </button>
                        <div className="flex justify-between items-center">
                        <div className=" px-12 py-6">
                            <h1 className="text-3xl font-bold mb-2 font-sans">Result Details</h1>
                            <p className="text-sm text-gray-500 mb-4">Everything you need to know about Result</p>
                            
                        </div>
                        <Link href={`/exam-components/result/see-result`}className="px-6 py-2 bg-gray-800 text-white rounded-sm mx-12">See Result</Link>
                        </div>
                        <hr className=" border border-spacing-y-8 mb-8" />
                    </div>
                    <div className="px-12">
                        <div className="flex px-6 mb-4 justify-between items-center">
                            <div className="flex gap-2">
                            <div className="relative w-full max-w-xs">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
    <input
        type="text"
        placeholder="Search for Batch"
        className="border border-gray-300 pl-10 pr-4 py-2 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
    />
</div>

                            </div>
                        
                            <Link
                                href={`/exam-components/result/add-result`}
                                className="border border-red-800 text-red-800 bg-red-50 py-2 px-6 rounded-sm hover:bg-red-800 hover:text-white"
                            >
                                Add Result Announcement
                            </Link>
                        </div>

                        {loading && <FullWidthLoader />}
                        {error && <p className="text-red-500">{error}</p>}

                        {!loading && !error && (
                            <div className="flex gap-4 px-6">
                                <table className="overflow-x-auto w-full text-center mt-2">
                                    <thead className="min-w-full border border-red-200 rounded-lg">
                                        <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
                                            <th scope="col" className="px-6 py-3">S.no.</th>
                                            <th scope="col" className="px-6 py-3">Batch</th>
                                            <th scope="col" className="px-6 py-3">Term</th>
                                            <th scope="col" className="px-6 py-3">Type</th>
                                            <th scope="col" className="px-6 py-3">Active</th>
                                            <th scope="col" className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                        {clases.length > 0 ? (
                                            clases.map((cls, index) => (
                                                <tr key={cls.id} className="border-b text-sm hover:bg-gray-50">
                                                    <td className="px-6 py-3">{index + 1}</td>
                                                    <td className="px-6 py-3">{cls.batch?.name}</td>
                                                    <td className="px-6 py-3">{cls.term?.name}</td>
                                                    <td className="px-6 py-3">{cls.type}</td>
                                                    <td className="px-6 py-3">{cls.is_active ? "Active" : "Inactive"}</td>
                                                    <td className="px-6 py-3 flex justify-center">
                                                        <Link href={`/exam-components/result/edit?id=${cls.id}`}>
                                                            <PenSquareIcon className="h-4 w-4" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-center py-4">No Result Announcement Found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
