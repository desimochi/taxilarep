import { Delete, DeleteIcon, DownloadCloudIcon } from "lucide-react";

export default function Table({student}){
    return(
        <div className="rounded-xl border border-gray-300 mt-4 ">
    <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase rounded-xl bg-black dark:bg-gray-700 dark:text-white-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    {student? "Enrollment No." : "Batch"}
                </th>
                {student && <th scope="col" className="px-6 py-3">
                    Name
                </th>}
                <th scope="col" className="px-6 py-3">
                    Term
                </th>
                <th scope="col" className="px-6 py-3">
                    Subject
                </th>
                <th scope="col" className="px-6 py-3">
                    File Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className="rounded-xl">
            <tr className="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                
            <td className="px-6 py-4">
                    PGDM-25 BA
                </td>
                {student && <td className="px-6 py-4">
                    Rajat Singh
                </td>}
                <td className="px-6 py-4">
                    Term-5
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                    Security Analysis & Portfolio Management
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                    Pricing the InfoEdge (naukri) IPO
                    </div>
                </td>
                <td className="px-6 py-4">
                    <div className="flex gap-4">
                        <DownloadCloudIcon className="h-6 w-6 text-red-700" />
                        <Delete className="h-6 w-6" />
                    </div>
                </td>
              
            </tr>
        </tbody>
    </table>
    </div>
    )
}