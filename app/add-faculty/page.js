export default function Page(){
    return(
        <div className="flex justify-center items-center w-full rounded-sm py-12">
            <div className="border border-gray-300 shadow-sm hover:shadow-md rounded-sm">
                <h4 className="px-60 py-4 bg-gradient-to-bl font-bold from-gray-700 to-stone-900 text-white">Add A Faculty</h4>
                <form className="py-5 px-5">
                    <label className="font-bold">Title</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Title</option>
    <option value="2024-25">Mr.</option>
    <option value="t-28">Ms/Mrs</option>
    <option value="t-27">Dr.</option>
    <option value="t-27">Prof.</option>
  </select>
  <div className="flex gap-2 justify-between">
        <div className="w-1/2">
        <label className="font-bold ">Name</label>
        <input type="text" name="username" placeholder="Enter Name of User" className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="w-1/2">
        <label className="font-bold">Gender</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-red-600 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
        </div>
  </div>

  <div className="flex gap-2 justify-between">
        <div className="w-1/2">
        <label className="font-bold ">Mobile</label>
        <input type="tel" name="mobile" placeholder="Enter Mobile No. of User" className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="w-1/2">
        <label className="font-bold">Email</label>
        <input type="email" name="email" placeholder="Enter Email Address of User" className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />     
        </div>
  </div>
  <label className="font-bold">Address</label>
  <input type="text" name="address" placeholder="Enter Address of User"className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
  <div className="flex gap-2 justify-between">
        <div className="w-1/2">
        <label className="font-bold ">Date of Birth</label>
        <input type="date" name="dob" className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="w-1/2">
        <label className="font-bold">Password</label>
        <input type="password" name="password" placeholder="Enter Password" className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />     
        </div>
  </div>
  <label className="font-bold">Status</label>
                    <select id="course"  className="bg-white border border-gray-300 mb-3 text-gray-700 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-red-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option value="" disabled selected>Select a Role</option>
    <option value="2024-25">Active</option>
    <option value="t-28">Inactive</option>
  </select>
  <button className="w-full bg-red-700 py-2 text-white rounded-sm ">Submit</button>             
                </form>
            </div>
</div>
    )
}