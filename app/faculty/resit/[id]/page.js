"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import FullWidthLoader from "@/components/Loaader";
import Toast from "@/components/Toast";
import { set } from "date-fns";
import { use, useState, useEffect } from "react";
 
export default  function Page({params}) {
    const [sclass, setsclass] = useState([])
   
    const [message, setMessage] = useState(false)
    const [show, setShow] = useState(false)
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const {id} =  use(params)
    useEffect(()=>{
        async function fetchData() {
            setLoading(true)
            try {
                const response = await authFetch(`resit-creitria-edit/${id}`)
                if(!response.ok){
                    throw new Error("Something Went Wrong")
                }
                const data = await response.json()
                setsclass(data.data)
                setLoading(false)
            } catch (error) {
                setError(error.message)
            } finally{
                setLoading(false)
            }
        }
        fetchData()
    },[id])
    const handleChange = (index, field) => {
        setsclass((prev) => {
          const updated = [...prev];
          updated[index] = {
            ...updated[index],
            [field]: !updated[index][field],
          };
          return updated;
        });
      };
      const handleSubmit = async (e) => {
        setLoading(true);
        try {
            const payload = sclass.map((item) => ({
                student_id: item.student.id,
                criteria_first: item.criteria_first,
                criteria_second: item.criteria_second,
              }));
          const response = await authFetch(`resit-creitria-edit/${id}`, {
            method: "POST",
            body: JSON.stringify({applicant:payload}),
          });
          if (!response.ok) throw new Error("Failed to update data");
          const data = await response.json();
          setMessage(data.message);
          setShow(true);
          setTimeout(() => {
            setMessage("");
            setShow(false);
            // window.location.reload();
          }, 2000);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
      
    return(
        <section className="relative">
            {show && <Toast message={message} />}
            {error && <Toast message={error} />}
    <div className="bg-violet-200 w-full sm:w-80 h-40 rounded-full absolute top-1 opacity-20 max-sm:left-0 sm:right-56 z-0"></div>
    <div className="bg-violet-300 w-full sm:w-40 h-24 absolute top-0 -right-0 opacity-20 z-0"></div>
    <div className="bg-violet-500 w-full sm:w-40 h-24 absolute top-40 -right-0 opacity-20 z-0"></div>
    <div className="w-full pt-12 px-16 relative z-10 backdrop-blur-3xl min-h-screen">
        <div className="flex justify-between items-center mb-4">
            <div>
            <h1 className="text-3xl font-bold mb-2 font-sans">Resit Submission Information </h1>
            <p className="text-sm text-gray-500 mb-8">Resit Subjects Students Information Panel</p>
            </div>
            <button onClick={handleSubmit} disabled={loading} className="bg-red-800 text-white px-12 py-2 rounded-md">{loading? "Submitting..." :  "Submit"}</button>
            </div>
            <hr className=" border  border-spacing-y-0.5 mb-6"/>
    <div className="">
      {loading ? (
        <FullWidthLoader />
      ) : (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="overflow-x-auto w-full text-center">
            <thead className="min-w-full border border-red-200 rounded-lg">
              <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
                <th scope="col" className="px-6 py-3">S.No.</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Enrollement</th>
                <th scope="col" className="px-6 py-3">Viva/Presentation</th>
                <th scope="col" className="px-6 py-3">Writeup</th>
              </tr>
            </thead>
            <tbody>
              {sclass.length> 0 ? sclass.map((product, index) => (
                <tr key={index} className="border-b text-sm">
                    <td className="px-6 py-4">{index+1}</td>
                  <td className="px-6 py-4">{`${product.student?.first_name} ${product.student?.last_name}`}</td>
                  <td className="px-6 py-4">{`${product.student?.enrollment_number}`}</td>
                  <td className="px-6 py-4">
      <input
        type="checkbox"
        checked={product.criteria_first}
        onChange={() => handleChange(index, "criteria_first")}
      />
    </td>
    <td className="px-6 py-4">
      <input
        type="checkbox"
        checked={product.criteria_second}
        onChange={() => handleChange(index, "criteria_second")}
      />
    </td>
                </tr>
              )) : <tr><td colSpan={7} className="p-2">No Students Available</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </div>
    </section>
    )
}