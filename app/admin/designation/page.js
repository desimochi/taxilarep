"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import DepartmentForm from "@/components/DepartmentForm";
import Toast from "@/components/Toast";
import { PenSquareIcon, PlusIcon, Settings2Icon, SettingsIcon } from "lucide-react";
import { useEffect, useState } from "react";
export default function Page(){
       const[message, setMessage] = useState("")
          const[showToast, setShowToast] = useState(false)
          const [showPopup, setShowPopup] = useState(false);
          const [actionType, setActionType] = useState("");
          const[loading, setLoading]= useState(false)
          const[error, setError]= useState(false)
          const[department, setDepartment]= useState([])
            const [searchQuery, setSearchQuery] = useState("");
          const[selectedDepartment, setSelectedDepartment] = useState('')
          const [formData, setFormData] = useState({
            name: "",
            description: "",
          is_active : ""
        })
        const [editformData, setEditFormData] = useState({
            name: "",
            description: "",
          is_active : ""
        })
        const filteredExams = Array.isArray(department)
  ? department.filter((exam) => {
      const name = `${exam.name}`.toLowerCase();
      const query = searchQuery.toLowerCase();
      return name.includes(query);
    })
  : [];
        useEffect(()=>{
           async function fetchDepartmentData(){
            setLoading(true)
                    try {
                        const respose = await authFetch(`designation-viewset`)
                        const data = await respose.json()
                        if(!respose.ok){
                            throw new Error("")
                        }
                        setDepartment(data.data)
                        setLoading(false)
                    } catch (error) {
                        setError(error.message)
                    } finally {
                        setLoading(false)
                    }
            }
            fetchDepartmentData()
        },[])
        const handleAddClick =  (type) => {
            setActionType(type);
            setShowPopup(true);
        };
        
        const handleEditClick = async (classId, type) => {
            try {
                const response = await authFetch(`designation-viewset/${classId}`);
                const resData = await response.json();
        
                if (!response.ok) {
                    throw new Error("Something Went Wrong");
                }
        
                // Set the data from API response to editFormData state
                setEditFormData({
                    name: resData.data.name || "",
                    description: resData.data.description || "",
                    is_active: resData.data.is_active ? "true" : "false", // Ensure it's a string
                });
        
            } catch (error) {
                console.error(error);
            }
        
            setSelectedDepartment(classId);
            setActionType(type);
            setShowPopup(true);
        };
        
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData((prev) => ({ ...prev, [name]: value }));
        };
        const handleEditChange = (e) => {
            const { name, value } = e.target;
            setEditFormData((prev) => ({ ...prev, [name]: value }));
        };

       async function handleAddDepartment(){
                try {
                            const response  = await authFetch(`designation-viewset`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(formData),
                            });
                            const data = await response.json()
                            if(!response.ok){
                                throw new Error(data.message)
                            }
                            setMessage("Add Designation Succcessfully")
                            setShowToast(true)
                            setTimeout(()=>{
                                setShowToast(false)
                                window.location.reload()
                            },2000)
                        } catch (error) {
                            setMessage(error.message)
                            setShowToast(true)
                            setTimeout(()=>{
                                setShowToast(false)
                            },2000)
                        }
        }
        async function handleEditSaveDepartment(id){
            try {
                        const response  = await authFetch(`designation-viewset/${id}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(editformData),
                        });
                        const data = await response.json()
                        if(!response.ok){
                            throw new Error(data.message)
                        }
                        setMessage("Edit Designation Succcessfully")
                        setShowToast(true)
                        setTimeout(()=>{
                            setShowToast(false)
                            window.location.reload()
                        },2000)
                    } catch (error) {
                        setMessage(error.message)
                        setShowToast(true)
                        setTimeout(()=>{
                            setShowToast(false)
                        },2000)
                    }
    }
       
    return <div className="bg-white min-h-screen">
      {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    {showToast && <Toast message={message} />}

    <DepartmentForm
        heading= "Designation"
      data={actionType === "add" ? formData : editformData}
      onChange={actionType === "add" ? handleChange : handleEditChange}
      onSubmit={
        actionType === "add"
          ? handleAddDepartment
          :() => {handleEditSaveDepartment(selectedDepartment)}
      }
      actionType={actionType}
      popup= {setShowPopup}
    />
  </div>
)}

          <section className="relative">
           
           <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
           <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
           <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
           <div className="w-full pt-4 relative z-10 backdrop-blur-3xl">
           <div className="py-4 px-5">
            
            <div>
            <div className="w-full px-12 py-6">
            <h1 className="text-3xl font-bold mb-2 font-sans">Designation Details </h1>
            <p className="text-sm text-gray-500 mb-8">See, Create and Edit the Designation for Taxila Business School</p>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
            <div className="flex justify-between">
                <div className=" flex gap-3">
                    <input type="text" value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Department...." className="p-2 rounded-sm border border-x-gray-200" />
                    <button onClick={() => handleAddClick("add")} className="flex justify-center items-center border border-gray-200 hover:bg-gray-200 px-4"> <PlusIcon className="h-4 w-4"/>Add Salutation</button>
                </div>
                {/* <button className="border border-gray-500 px-4 flex items-center justify-center gap-1"><Settings2Icon className="h-4 w-4"/>View</button> */}
            </div>
            <table className="overflow-x-auto w-full text-center mt-4" >
            <thead className="min-w-full border border-red-200 rounded-lg">
             
             <tr className="text-red-700 bg-red-50 font-normal text-sm border-b" >
                    <th scope="col" className="px-6 py-3">S.No.</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Status</th>
    <th scope="col" className="px-6 py-3">Description</th>
    <th scope="col" className="px-6 py-3">Action</th>
             </tr>
    
</thead>{filteredExams.length>0? (<tbody>

                    {filteredExams.map((item, index)=>{
                        return <tr key={item.id} className="border-b text-sm">
                            <td className="p-3">{index+1}</td>
                            <td className="p-3">{item.name}</td>
                            <td className="p-3">{item.is_active ? <span className="bg-green-100 text-green-800 py-0.5 px-2 rounded-sm">Active</span>:<span className="bg-red-100 text-red-800 py-0.5 px-2 rounded-sm">Inactive</span>}</td>
                            <td className="p-3">{item.description}</td>
                            <td className="p-3"><PenSquareIcon className="h-5 w-5 cursor-pointer" onClick={() => handleEditClick(item.id, "edit")}/></td>
                        </tr>
                    })}
</tbody>) : <tbody><tr> <td className="P-3" colSpan={5}>No Designation Data Found </td></tr> </tbody>}
            </table>
            </div>
            </div>
            </div>
        </div>
        </section>
    </div>
}