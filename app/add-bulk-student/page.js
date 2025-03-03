
export default function Page(){
    return(
        <div className="flex justify-center items-center w-full rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Upload Students in Bulk</h4>
                <form className="py-5 px-5">
                   
  <input type="file" name="casestudytitile" placeholder="Enter Title for Case Study..." accept=".csv, .xls" className="bg-white border border-gray-300 mb-1 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  <p className="text-blue-600 mb-4 text-sm">Download Sample File</p>            
   <button className="w-full bg-red-700 py-2 text-white rounded-sm ">Upload</button>             
                </form>
            </div>
</div>
    )
}