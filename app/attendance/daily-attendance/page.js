import { Calendar1Icon, SaveIcon, Search } from "lucide-react";

export default function Page (){
    return (
        <div className="px-5 py-4">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold flex gap-1">
                    <Calendar1Icon className="w-7 h-7"/> Daily Attendance </h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                </div>
            </div>
            <div className="mt-5 border border-gray-300 rounded-xl">
            <div className="flex gap-2 p-3 mt-3">
            <div className="w-1/5">
                    <input type="date" name="date" className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
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
<option value="t-29">T-29</option>
<option value="t-28">T-28</option>
</select>
                </div>
                <div className="w-1/6">
                <select id="term"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Term</option>
<option value="Term1">Term 1</option>
<option value="term2">Term 2</option>
<option value="term3">Term 3</option>
</select>
                </div>
                <div className="w-1/5 flex gap-2">
                    <div className="w-3/4">
                    <select id="subject"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Subject</option>
<option value="python">Python</option>
<option value="sql">SQL</option>
</select>
                    </div>
                    <div className="w-1/4">
                    <button className="bg-red-600 rounded-sm flex justify-center py-2 px-5 text-white"><Search className="h-5 w-5"/>Find</button>
                    </div>
                </div>
            </div>
            <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 mt-4">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
                <th scope="col" className="px-6 py-3">S.No. </th>
                <th scope="col" className="px-6 py-3">Student Name</th>
                <th scope="col" className="px-6 py-3">Present</th>
                <th scope="col" className="px-6 py-3">Absent</th>
            </tr>
        </thead>
        <tbody className="w-full">
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
          
                <td className="px-6 py-4 ">1</td>
                <td className="px-6 py-4 ">Rajat Singh</td>
                <td className="px-6 py-4 "><input type="radio" value="yes" name="attendance" /></td>
                <td className="px-6 py-4 "><input type="radio" value="no" name="attendance"/></td>
            </tr>
        </tbody>
    </table>
    <div className="flex justify-center mt-4 mb-4">
        <button className="bg-red-600 py-1.5 px-8 flex gap-2 text-white rounded-sm"> <SaveIcon className="h-5 w-5"/>Save Attendance</button>
    </div>
            </div>
        </div>
    )
}


