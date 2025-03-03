import { UploadCloud } from "lucide-react";

export default function Page(){
    return(
        <div className="px-5 py-6">
            <div className="border border-gray-300 rounded-xl mt-4  text-white p-2 hover:shadow-xl transition-shadow  py-4 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl text-gray-900 font-bold">Students Batch Assign</h5>
                <span className="text-sm text-gray-600">Taxila Business School</span>
                </div>
                <div className="w-1/5">
  <select id="term" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Course</option>
    <option  value="PGDM+Business Analytics">PGDM+Business Analytics</option>
    <option value="EPGDM">EPGDM</option>
    <option value="PGPM">PGPM</option>
  </select>
                </div>
                <div className="w-1/5">
  <select id="batch"  className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Batch</option>
    <option value="2024-25">T-29</option>
    <option value="t-28">T-28</option>
    <option value="t-27">T-27</option>
    <option value="t-26">T-26</option>
  </select>
                </div>
                </div>
                <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-gray-900 uppercase rounded-xl bg-gray-300 dark:bg-gray-700 dark:text-white-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                    Action
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Father&apos;s Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
            </tr>
        </thead>
        <tbody className="rounded-xl">
            <tr className="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                
            <td className="px-6 py-4">
                    <input type="checkbox" />
                </td>
               
                <td className="px-6 py-4">
                    Rajat Singh
                </td>
                <td className="px-6 py-4">
                    Mr. Singh
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                    rajat28@taxila.in
                    </div>
                </td>
              
              
            </tr>
            <tr className="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <td className="px-6 py-4">
                        <input type="checkbox" />
                    </td>
                   
                    <td className="px-6 py-4">
                        Rajat Singh
                    </td>
                    <td className="px-6 py-4">
                        Mr. Singh
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                        rajat28@taxila.in
                        </div>
                    </td>
                  
                  
                </tr>
                <tr className="bg-white border-b rounded-xl dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                
                <td className="px-6 py-4">
                        <input type="checkbox" />
                    </td>
                   
                    <td className="px-6 py-4">
                        Rajat Singh
                    </td>
                    <td className="px-6 py-4">
                        Mr. Singh
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex items-center">
                        rajat28@taxila.in
                        </div>
                    </td>
                  
                  
                </tr>
        </tbody>
    </table>
    <div className="flex justify-center">
    <button className="bg-red-600 py-2 px-8 rounded-sm mt-4 flex gap-2 justify-center"><UploadCloud className="h-5 w-5" /> Update</button>
    </div>
            </div>

        </div>
    )
}