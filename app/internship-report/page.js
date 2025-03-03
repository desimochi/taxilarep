export default function Page(){
    return (
        <div className="py-4 px-5">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold">Internship Report</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                    <input type="text" name="name" placeholder="Enter Enrollment id..." className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
                
            </div>
             <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
                <th scope="col" className="px-6 py-3">Enrollment No.</th>
                <th scope="col" className="px-6 py-3">Stundent Name</th>
                <th scope="col" className="px-6 py-3">Batch</th>
                <th scope="col" className="px-6 py-3">Submission Date</th>
                <th scope="col" className="px-6 py-3">Submitted on</th>
                <th scope="col" className="px-6 py-3">Work Done</th>
                <th scope="col" className="px-6 py-3">Learning</th>
                <th scope="col" className="px-6 py-3">Theory/Research</th>
            </tr>
        </thead>
        <tbody className="w-full">
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4 w-40">Rajat Singh</td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">T-28</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">12/02/2024</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">09/02/2024</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Competitor Store Visit , Competitor Analysis , Store stock order and sales Analysis, Stock Alignment Analysis</div>
                </td>
            </tr>
        </tbody>
    </table>
        </div>
    )
}