"use client"

export default function Page(){
    return(
        <div className="py-4 px-5">
            <div>
            <div className="w-full">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-2/5">
                <h5 className="text-2xl font-bold">Student Attendance</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                    <input type="date" name="date" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
                <div className="w-1/5">
  <select id="term" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Subject</option>
    <option  value="Term5">Python</option>
    <option value="Term4">SQL</option>
    <option value="Term3">Marekting</option>
    <option value="Term2">HRM</option>
    <option value="Term1">Business Analytics</option>
  </select>
                </div>
                <div className="w-1/5">
                <button className="bg-black rounded-sm w-full py-2.5 text-white" >Submit</button>
                </div>
                </div>
                
            </div>
            <div className="flex gap-4">
                <div className="4/5">
                <div className="rounded-xl border border-gray-300 mt-4 ">
                <div className="w-full overflow-x-auto">
    <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
                <th scope="col" className="px-6 py-3">Roll No.</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Subject</th>
                <th scope="col" className="px-6 py-3">Batch</th>
                <th scope="col" className="px-6 py-3">Present</th>
            </tr>
        </thead>
        <tbody className="w-full">
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 w-40 text-gray-700 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4 w-40">Rajat Singh</td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">78 - Pass</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Marekting</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">T-28</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Yes</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 w-40 text-gray-700 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4 w-40">Rajat Singh</td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">78 - Pass</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Marekting</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">T-28</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Yes</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 w-40 text-gray-700 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4 w-40">Rajat Singh</td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">78 - Pass</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Marekting</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">T-28</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Yes</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 w-40 text-gray-700 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4 w-40">Rajat Singh</td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">78 - Pass</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Marekting</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">T-28</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Yes</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 w-40 text-gray-700 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4 w-40">Rajat Singh</td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">78 - Pass</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Marekting</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">T-28</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Yes</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 w-40 text-gray-700 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4 w-40">Rajat Singh</td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">78 - Pass</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Marekting</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">T-28</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Yes</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 w-40 text-gray-700 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4 w-40">Rajat Singh</td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">78 - Pass</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Marekting</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">T-28</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Yes</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="flex items-center px-6 py-4 w-40 text-gray-700 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">TAXB10210</div>
                    </div>  
                </th>
                <td className="px-6 py-4 w-40">Rajat Singh</td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">78 - Pass</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Marekting</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">T-28</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">Yes</div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
    </div>
                </div>
                <div className="1/5">
                    <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow text-center py-8 px-12">
                        <span className="text-6xl font-bold mb-2">48</span>
                        <p className="text-sm mt-2 text-gray-300">Students are Present for the Marketing Class on 12 Feb. 2024</p>
                    </div>
                    <div className="border border-gray-300 shadow-sm hover:shadow-md transition-shadow mt-2 px-3 rounded-lg">
                        <p className="text-xl font-bold mt-4 ">Last 7 Days Attendance</p>
                        <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
                        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
                        <tr>
                <th scope="col" className="px-6 py-3">Date</th>
                <th scope="col" className="px-6 py-3">Present</th>
                <th scope="col" className="px-6 py-3">Absent</th>
            </tr>
                        </thead>
                        <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">12/02/2024</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">48</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">36</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">11/02/2024</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">48</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">36</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">10/02/2024</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">48</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">36</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">08/02/2024</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">48</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">36</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">07/02/2024</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">48</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">36</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">06/02/2024</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">48</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">36</div>
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">05/02/2024</div>
                </td>
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">48</div>
                </td>
                
                <td className="px-6 py-4 w-40">
                    <div className="flex items-center">36</div>
                </td>
            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
            </div>
            </div>
    
    )
}