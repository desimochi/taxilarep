
import { Search } from "lucide-react"
export default function ResultSearch(){
    return(
       
                <div className="flex gap-2 mt-3">
                <div className="w-1/5">
                <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Course</option>
<option value="2024-25">PGDM+Business Analytics</option>
<option value="t-28">PGPM</option>
<option value="t-27">EPGDM</option>
</select>
                </div> 
                <div className="w-1/5">
                <select id="batch"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Batch</option>
<option value="t28">T-28</option>
<option value="t29">T-29</option>
</select>
                </div> 
                <div className="w-1/5">
                <select id="term"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Term</option>
<option value="term1">Term 1</option>
<option value="term2">Term 2</option>
<option value="term3">Term 3</option>
</select>
                </div> 
                <div className="w-1/5">
                <select id="subject"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Subject</option>
<option value="python">Python</option>
<option value="sql">SQL</option>
<option value="internationalmarketing">International Marketing</option>
</select>
                </div> 
                <div className="w-1/5 flex gap-2">
                <div className="3/4">
                <select id="component"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Component
</option>
<option value="2024-25">Assignement</option>
<option value="t-28">Case Study</option>
<option value="t-27">Quiz</option>
</select>
                </div>
                <div className="w-1/4">
                <button className="bg-red-600 px-5 rounded-sm text-white py-2 flex items-center justify-center"><Search className="h-5 w-5"/>Find</button>
                </div>
                </div> 
                </div>
    )
}