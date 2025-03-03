import AssignMarkTable from "@/components/AssignMarkTable";
import ResultSearch from "@/components/ResultSearch";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";

export default function Page(){
    return(
        <div className="px-5 py-4">
             <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold flex gap-1">
                    <DocumentCheckIcon className="w-7 h-7"/> See Written Exam Result </h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                </div>
            </div>
            <ResultSearch />
            <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Student Name </th>
                <th scope="col" className="px-6 py-3">Batch</th>
                <th scope="col" className="px-6 py-3">Term</th>
                <th scope="col" className="px-6 py-3">Subject</th>
                <th scope="col" className="px-6 py-3">Component</th>
                <th scope="col" className="px-6 py-3">Max. Mark</th>
                <th scope="col" className="px-6 py-3">Obtain</th>
            </tr>
        </thead>
        <tbody className="w-full">
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4 border-r-2">12/03/2025</td>
                <td className="px-6 py-4 border-r-2">Mr. Rajat Singh</td>
                <td className="px-6 py-4 border-r-2">T-28</td>
                <td className="px-6 py-4 border-r-2">Term 3</td>
                <td className="px-6 py-4 border-r-2">Business Ethics</td>
                <td className="px-6 py-4 border-r-2">Assignment</td>
                <td className="px-6 py-4 border-r-2">10</td>
                <td className="px-6 py-4 border-r-2">8</td>
              
            </tr>
        </tbody>
    </table>
        </div>
    )
}