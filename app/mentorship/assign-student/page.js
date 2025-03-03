import { UsersRound } from "lucide-react";


export default function Page (){
    return (
        <div className="px-5 py-4">
            <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-700 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
                <div className="flex justify-between items-center gap-2">
                    <div className="w-3/5">
                <h5 className="text-2xl font-bold flex gap-1"><UsersRound className="w-7 h-7"/> Mentorship - Assign Student</h5>
                <span className="text-sm text-gray-400">Taxila Business School</span>
                </div>
                <div className="w-1/5">
                    <input type="text" name="name" placeholder="Search Student..." className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                </div>
                </div>
                
            </div>
        <div className="border border-gray-300 rounded-lg mt-6">
        <div className="px-5 py-2 mt-6">
                <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Faculty</option>
<option value="rajatbohra">Mr. Rajat Bohra</option>
<option value="lavinakhilani">Prof. Lavina Khilani</option>
<option value="sanjolijain">Prof. Sanjoli Jain</option>
</select>
</div>
            <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 mt-4">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
                <th scope="col" className="px-6 py-3">Action</th>
                <th scope="col" className="px-6 py-3">Name </th>
                <th scope="col" className="px-6 py-3">Eamil</th>
                <th scope="col" className="px-6 py-3">Batch</th>
            </tr>
        </thead>
        <tbody className="w-full">
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="px-6 py-4">
                <input type="checkbox" />
            </td>
                <td className="px-6 py-4 ">Rajat Singh</td>
                <td className="px-6 py-4">
                    rajat29@taxila.in
                </td>
                <td className="px-6 py-4">
                    T-28
                </td>
            </tr>
        </tbody>
    </table>
    <div className="flex items-center justify-center">
    <button className="bg-red-600 text-white py-2 px-8 rounded-sm mt-5 mb-5 mx-5">Assign Student</button>
    </div>
    </div>
        </div>
    )
}