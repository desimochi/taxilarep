export default function UploadExcelMarks(){
    return (
        <div className="flex justify-center items-center w-full rounded-sm py-12">
        <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
            <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Upload Excel Marks</h4>
            <form className="py-5 px-5">
                <div className="flex justify-between">
                <label className="font-bold">Course</label>
                <p className="text-sm text-blue-500">Download Sample File</p>
                </div>
                <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Course</option>
<option value="2024-25">PGDM+Business Analytics</option>
<option value="t-28">PGPM</option>
<option value="t-27">EPGDM</option>
</select>
<div className="flex gap-2 justify-between">
    <div className="w-1/2">
    <label className="font-bold ">Batch</label>
                <select id="batch"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Batch</option>
<option value="t-29">T-29</option>
<option value="t-28">T-28</option>
</select>
    </div>
    <div className="w-1/2">
    <label className="font-bold">Term</label>
                <select id="term"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Term</option>
<option value="Term1">Term 1</option>
<option value="term2">Term 2</option>
<option value="term3">Term 3</option>
</select>
    </div>
</div>


<label className="font-bold">Subject</label>
                <select id="subject"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Subject</option>
<option value="python">Python</option>
<option value="sql">SQL</option>
</select>
<label className="font-bold">Component</label>
                <select id="componnet"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
<option value="" disabled selected>Select a Component</option>
<option value="assignment">Assignment</option>
<option value="casestudy">Case Study</option>
</select>

<label className="font-bold">File Upload</label>
<input type="file" name="casestudytitile"  accept=".csv, xls, xlsx" className="bg-white border border-gray-300 mb-6 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />            
<button className="w-full bg-red-700 py-2 text-white rounded-sm ">Submit</button>             
            </form>
        </div>
</div>
    )
}