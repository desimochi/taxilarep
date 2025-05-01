"use client";

import { useState, useEffect, useContext } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import Link from "next/link";
import { ArrowLeft, DownloadCloudIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { GlobalContext } from "@/components/GlobalContext";
import { set } from "date-fns";

export default function Page() {
    const [term, setTerm] = useState([]);
    const [loading, setLoading] = useState(false);
    const [gpa, setGpa] = useState(0);
    const [cgpa, setCgpa] = useState(0);
    const {state} =  useContext(GlobalContext)
    const [display, setdisplay] = useState(true)
    const [showresult, setshowResult] = useState(false)
    const [error, setError] = useState("");
    const [result, setResult] = useState([])
    const [formData, setFormData] = useState({
        type: "main",
        term: "",
        enrollment_number: "",
    });

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Fetch terms
                const termResponse = await authFetch("terms-list");

                // Check if the response is OK
                if (!termResponse.ok) {
                    throw new Error("Something went wrong");
                }

                const termData = await termResponse.json();
                setTerm(termData.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Handle form data changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Send the form data to the backend
            const response = await authFetch("student-result", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }

            // Handle successful form submission
            
            setResult(data.data)
            setGpa(data.extra.gpa)
            setCgpa(data.extra.cgpa)
            if(data.data.length>0){
                setdisplay(false)
                setshowResult(true)
            }else{
                setError("No Result Found")
            }
            
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    function handleback(){
        setdisplay(true)
        setshowResult(false)
    }
    return (
        <>        {display && <div className="mx-auto max-w-2xl py-8">
            <div className="border border-gray-300 rounded-sm p-4 px-6">
                <h3 className="text-center text-xl text-red-800 font-bold">Check Result</h3>
                <hr className="border border-b-2 mt-3 mb-4" />
                <form onSubmit={handleSubmit}>
                    <label className="font-bold mb-2">Exam Type</label>
                    <select
                        name="type"
                        className="border border-gray-300 w-full p-2"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="main">Main</option>
                        <option value="resit-1">Resit-1</option>
                        <option value="resit-2">Resit-2</option>
                    </select>

                    <div className="mt-2">
                        <label className="font-bold mb-2 mt-2">Term</label>
                        <select
                            name="term"
                            className="border border-gray-300 w-full p-2"
                            value={formData.term}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Term</option>
                            {term.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mt-2">
                        <label className="font-bold mb-2 mt-2">Enrollment No.</label>
                        <input
                            type="text"
                            name="enrollment_number"
                            value={formData.enrollment_number}
                            onChange={handleChange}
                            placeholder="Enter Enrollment Number"
                            className="border border-gray-300 w-full p-2"
                            required
                        />
                    </div>

                    <hr className="border border-b-2 mt-4 mb-4" />

                    {error && <p className="text-red-600">{error}</p>}

                    <button
                        type="submit"
                        className="bg-red-800 py-2 rounded-sm w-full text-white"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "See Result"}
                    </button>
                </form>
            </div>
        </div>}
        {showresult && (
  result.length > 0 ? (
    <div className="px-16 py-8">
      <div
        className="flex items-center gap-1 text-sm text-gray-500"
        onClick={handleback}
      >
        <ArrowLeft className="h-5 w-5" />
        <p>Back</p>
      </div>
      <div className="flex justify-between items-center mt-4 mb-2">
      <div className="px-2 p-6">
        <h2 className="text-2xl font-bold">Exam Result</h2>
        <p className="text-sm text-gray-600">See the final exam result</p>
      </div>
      <div className="flex gap-2">
        <div className="bg-green-50 px-4 py-1 text-sm text-green-800 rounded-sm">
          GPA: {gpa}
        </div>
        <div className="bg-red-50 px-4 py-1 text-sm text-red-800 rounded-sm">
          CGPA: {cgpa}
        </div>
        {/* <Link
          href={`/student/result/download?term=${formData.term}&type=${formData.type}&enrollment_number=${formData.enrollment_number}`}
          className="bg-red-800 text-white px-4 py-1 rounded-sm flex items-center gap-2"
        >
          <DownloadCloudIcon className="h-3 w-3" />
          Download
        </Link> */}
      </div>
      </div>
      <hr className="border border-b-2 mb-6 " />
      <table className="overflow-x-auto w-full text-center mt-2">
                                    <thead className="min-w-full border border-red-200 rounded-lg">
                                        <tr className="text-red-700 bg-red-50 font-normal text-sm border-b">
                                            <th scope="col" className="px-6 py-3">S.no.</th>
                                            <th scope="col" className="px-6 py-3">Subject</th>
                                            <th scope="col" className="px-6 py-3">Credit</th>
                                            <th scope="col" className="px-6 py-3">External Marks</th>
                                            <th scope="col" className="px-6 py-3">Internal Marks</th>
                                            <th scope="col" className="px-6 py-3">Grade</th>
                                            <th scope="col" className="px-6 py-3">Grade Point</th>
                                            <th scope="col" className="px-6 py-3">Total Marks</th>
                                            <th scope="col" className="px-6 py-3">Pass/Fail</th>
                                            <th scope="col" className="px-6 py-3">Credit XGP</th>
                                    {state.role_name === 'Student' &&         <th scope="col" className="px-6 py-3">Resit</th>}
                                        </tr>
                                    </thead>
                                    {result.map((item, index)=>(
                                        <tr key={item["Subject Code"]} className="border-b text-sm">
                                            <td className="p-3">{index+1}</td>
                                            <td className="p-2">{item.subject_name}</td>
                                            <td className="p-2">{item.credit}</td>
                                            <td className="p-2">{Math.floor(item.external_marks * 100) / 100}</td>
                                            <td className="p-2">{Math.floor(item.internal_marks * 100) / 100}</td>
                                            <td className="p-2">{item.grade}</td>
                                            <td className="p-2">{item.grade_point || "NA"}</td>
                                            <td className="p-2">{Math.floor(item.total_marks * 100) / 100}</td>
                                            {item.is_pass ? <td className="bg-green-50 text-green-800 px-4 py-1 rounded-sm">Pass</td> : <td><span className="bg-red-50 text-red-800 px-4 py-1 rounded-sm">Fail</span></td>}
                                            <td className="p-2">{item.get_credit_xgp || "NA"}</td>
                                            {state.role_name === 'Student' && (
  item.is_pass ? (
    <td>
      <span className="bg-green-50 text-green-800 px-4 py-1 rounded-sm">NA</span>
    </td>
  ) : (
    <td>
      <Link href={`/apply-resit`} className="bg-red-800 text-red-50 px-4 py-1 rounded-sm text-center">
        Apply 
      </Link>
    </td>
  )
)}

                                        </tr>
                                    ))}
                                    </table>
    </div>
  ) : (
    <div className="px-16 py-8">
      <p className="text-center text-gray-500">No results found.</p>
    </div>
  )
)}

        
        </>

    );
}
