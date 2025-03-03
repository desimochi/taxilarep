"use client"
import { useState } from "react"

export default function AssignMarkTable(){
    const [maxmar, setmaxmark] = useState(null)
    const [error, seterror] = useState(false)
    function handlemaxmark(e){
        const marks = e.target.value
        if(marks>10){
            seterror(true)
        }else{
            seterror(false)
        }
    }

    return(
        <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mt-4 mb-2">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
            <tr>
                <th scope="col" className="px-6 py-3">Enroll. No.</th>
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
            <td className="px-6 py-4 border-r-2">TAX202412</td>
                <td className="px-6 py-4 border-r-2">Mr. Rajat Singh</td>
                <td className="px-6 py-4 border-r-2">T-28</td>
                <td className="px-6 py-4 border-r-2">Term 3</td>
                <td className="px-6 py-4 border-r-2">Business Ethics</td>
                <td className="px-6 py-4 border-r-2">Assignment</td>
                <td className="px-6 py-4 border-r-2">10</td>
                <td className="px-6 py-4 border-r-2">
                <input type="number" name="marks"value={maxmar} onChange={handlemaxmark} placeholder="Obtain Mark" className={` ${error?'bg-red-50' : 'bg-white'} border ${error? 'border-red-600' : 'border-gray-300'}  text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
                {error && <p className="text-sm text-red-600">Please Enter Mark less then 10</p>}
                </td>
            </tr>
        </tbody>
    </table>
    )
}