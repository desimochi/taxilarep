"use client"
import { NewspaperIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { Check, Download, PlusSquareIcon, Trash } from "lucide-react";
import { useState } from "react";

export default function Page(){
    const [isOpen, setIsOpen] = useState(false);
    const [isDel, setIsDel] = useState(false)
    const toggleModal = () => {
        setIsOpen(!isOpen);
      };
      function handleSubmit (e){ 
        e.preventDefault()
        console.log("submitted")
    }
    return(
        <>
         {isOpen && (
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-xl shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-6 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                  Create New Notice
                </h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-700 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {/* Modal body */}
              <form className="p-6 md:p-5" onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Type product name"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="price"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      name="price"
                      id="price"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      required
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="category"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Select Notice For
                    </label>
                    <select
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="all" selected>
                        All
                      </option>
                      <option value="accounts">Accounts</option>
                      <option value="faculty">Faculty</option>
                      <option value="students">Students/Console</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-bold text-gray-700 dark:text-white"
                    >
                      Notice Description
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      className="block p-2.5 w-full text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Write product description here"
                    ></textarea>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex justify-center w-full bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  Post the Notice
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
        <div className="py-4 px-5">
        <div className="border border-gray-300 rounded-xl mt-4 bg-gradient-to-bl from-gray-600 to-stone-900 text-white p-2 hover:shadow-xl transition-shadow  py-8 px-12">
            <div className="flex justify-between items-center gap-2">
                <div className="w-3/5">
            <h5 className="text-2xl font-bold flex"><NewspaperIcon className="h-7 w-7"/>News Manager</h5>
            <span className="text-sm text-gray-400">Taxila Business School</span>
            </div>
            <div className="w-1/5">
                <input type="text" name="search" placeholder="search a news.." className="bg-white border border-gray-300 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="w-1/5">
            <button onClick={toggleModal} className="flex gap-1 justify-center w-full bg-black py-2.5 rounded-sm"><PlusSquareIcon className="h-5 w-5" />Post a News</button>
            </div>
            </div>
            
        </div>
         <table className="w-full rounded-xl text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400 mt-4 mb-2">
    <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-white-400 w-full">
        <tr>
            <th scope="col" className="px-6 py-3">Faculty Name</th>
            <th scope="col" className="px-6 py-3">Title</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Posted By</th>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Action</th>
        </tr>
    </thead>
    <tbody className="w-full">
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="px-6 py-4 w-40">Prof. Lavina Khilani</td>
            <td className="px-6 py-4 w-100">Presented a paper on A study of key strategic HR issues in IT and Banking Industry in India in International Conference on “Management, Business & Economy (ICMBE)” on 20th April, 2019 in Swami Keshvanand Institute of Technology Management & Gramothan, Jaipur.</td>
            <td className="px-6 py-4 w-100">
            Presented a paper on A study of key strategic HR issues in IT and Banking Industry in India in  International Conference on “Management, Business & Economy (ICMBE)” on 20th April, 2019 in Swami Keshvanand Institute of Technology Management & Gramothan, Jaipur
            </td>
            <td className="px-6 py-4 w-40">
                <div className="flex items-center">Prof. Lavina Khilani</div>
            </td>
            <td className="px-6 py-4 w-20">
                <div className="flex items-center">18/02/2025</div>
            </td>
            <td className="px-6 py-4 w-20">
                <span className="p-1 text-sm bg-green-600 text-white rounded-sm">Approved</span>
            </td>
            
            <td className="px-6 py-4 w-40 flex justify-between items-center">
            <Download className="w-5 h-5 font-bold text-blue-600" />
            <Check className="w-5 h-5 text-black"/>
            <Trash className="w-5 h-5 text-red-700" onClick={()=>setIsDel(true)} />
            </td>
        </tr>
    </tbody>
</table>
    </div>
    {isDel && (
        <div
          className="fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
          <div className="relative m-4 p-4 rounded-lg bg-white shadow-sm transition-all duration-300 opacity-100 translate-y-0 scale-100">
       
            <div className="relative font-semibold  border-b border-slate-200 py-4 px-8 leading-normal text-slate-800">
              Do you want to delete this item?
            </div>
            <div className="flex shrink-0 flex-wrap gap-3 items-center pt-4 justify-between">
            <button
                onClick={() => setIsDel(false)}
                className="rounded-md bg-red-600 w-full py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Confirm
              </button>
              <button
                onClick={() => setIsDel(false)}
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