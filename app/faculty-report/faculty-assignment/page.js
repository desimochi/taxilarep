import { SearchCheckIcon, SearchIcon } from "lucide-react";

export default function Page(){
    return(
        <div className="px-5 py-4">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-4 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-1/5">
                <h5 className="text-2xl font-bold">Faculty Assignment</h5>
                <span className="text-sm text-gray-300">Taxila Business School</span>
                </div>
                <div className="w-1/6">
  <select id="course"  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Course</option>
    <option value="PGDM+Business Analytics5">PGDM+Business Analytics</option>
    <option value="EPGDM">EPGDM</option>
    <option value="PGPM">PGPM</option>
  </select>
                </div>
                <div className="w-1/6">
  <select id="batch"  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Batch</option>
    <option value="t-29">T-29</option>
    <option value="t-28">T-28</option>
    <option value="t-27">T-27</option>
    <option value="t-26">T-26</option>
  </select>
                </div>
                <div className="w-1/6">
  <select id="term" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Term</option>
    <option  value="Term5">Term 5</option>
    <option value="Term4">Term 4</option>
    <option value="Term3">Term 3</option>
    <option value="Term2">Term 2</option>
    <option value="Term1">Term 1</option>
  </select>
  </div>
  <div className="w-1/6">
  <select id="faculty" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Faculty</option>
    <option  value="rajatbohra">Mr. Rajat Bohra</option>
    <option value="kishoresharma">Mr. Kishore Sharma</option>
    <option value="lavinakhilani">Prof. LAvina Khilani</option>
  </select>
                </div>
                <div className="w-1/6">
                <button className="bg-red-500 hover:bg-red-600 rounded-sm w-full py-2 text-white flex gap-2 items-center justify-center" ><SearchIcon className="h-5 w-5"/>Find</button>
                </div>
                </div>
                
                
 
  
  
            </div>
        </div>
    )
}