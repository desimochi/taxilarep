import { Delete, DeleteIcon, DownloadCloudIcon } from "lucide-react";
import { useState } from "react";

export default function TableExam(){
    const [isOpen, setIsOpen] = useState(false)

    return(
        <>
        <div className="rounded-xl border border-gray-300 mt-4 mx-4 ">
             <h5 className="text-center mt-3 font-bold text-xl">PGDM-25 BA</h5>
    <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-700 dark:text-gray-400 mt-4 mb-2">
       
        <thead className="text-xs text-white uppercase rounded-xl bg-black dark:bg-gray-700 dark:text-white-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    Batch
                </th>
                <th scope="col" className="px-6 py-3">
                    Term
                </th>
                <th scope="col" className="px-6 py-3">
                    Subject
                </th>
                <th scope="col" className="px-6 py-3">
                    Component
                </th>
                <th scope="col" className="px-6 py-3">
                    Exam Date
                </th>
                <th scope="col" className="px-6 py-3">
                    Exam Time
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
                <td className="px-6 py-4">
                    Term-5
                </td>
                <td className="px-6 py-4">
                    Security Analysis & Portfolio Management
                </td>
                <td className="px-6 py-4">
                    Objective
                </td>
                <td className="px-6 py-4">
                    15/02/2025
                </td>
                <td className="px-6 py-4">
                    10:00 AM-10:30AM
                </td>
                <td className="px-6 py-4">
                        <Delete className="h-6 w-6 cursor-pointer" onClick={()=>setIsOpen(true)}/>
                </td>
              
            </tr>
        </tbody>
    </table>
    </div>
    {isOpen && (
        <div
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
          <div className="relative m-4 p-4 rounded-lg bg-white shadow-sm transition-all duration-300 opacity-100 translate-y-0 scale-100">
       
            <div className="relative font-semibold  border-b border-slate-200 py-4 px-8 leading-normal text-slate-800">
              Do you want to delete this item?
            </div>
            <div className="flex shrink-0 flex-wrap gap-3 items-center pt-4 justify-between">
            <button
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-red-600 w-full py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-md border bg-slate-200 hover:text-white border-transparent w-full py-2 px-4 text-center text-sm transition-all text-slate-800 hover:bg-slate-900 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Cancel
              </button>
              
            </div>
          </div>
        </div>
      )}
    </>
    )
}