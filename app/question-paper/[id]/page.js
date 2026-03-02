"use client"
import { authFetch } from "@/app/lib/fetchWithAuth";
import BackButton from "@/components/ui/Backbutton";
import { set } from "date-fns";
import DOMPurify from "dompurify";
import { ArrowLeft, BookIcon, Download, EyeIcon, FileEdit, Loader2Icon, UploadCloud, X } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
export default function Page(){
    const searchParams = useSearchParams();
    const subjectId = searchParams.get("subName");
    const { id } = useParams();
     const router = useRouter()
     const [popup, setPopup] = useState(false);
    const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [previewOpen, setPrevirewOpen] = useState(false);
  const [preview, setPrevirew] = useState("");
  const [editData, setEditData] = useState(null);
  const [editPaper, setEditPaper] = useState(false);
  const [name, setName] = useState("");
  const [editname, setEditName] = useState("");
  const [loading, setLoading] = useState(false) 
   const [uploadloading, setUploadLoading] = useState(false);
    useEffect(() => {
        const fetchClassData = async () => {
            try {
                setLoading(true)
                const response = await authFetch(`subject-exam-paper/${id}`)
                if (!response.ok) throw new Error("Failed to fetch Subject data")

                const data = await response.json()
                if (data.data) setData(data.data) // ✅ No TypeError here
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchClassData()
    }, [id])
const handleSubmit = async (e) => {
  e.preventDefault();

  const fileInput = e.target.paperTitle.files[0];
  if (!fileInput) {
    setError("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("mapping", id); // mapping id
   formData.append("file_name", name);
  formData.append("file", fileInput); // actual file

  setUploadLoading(true);

  try {
    const res = await authFetch("exam-paper-viewset", {
      method: "POST",
      
      body: formData, 
      // ❌ do not set Content-Type manually
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const data = await res.json();
    setError(`File uploaded successfully! ID: ${data.id}`);
    setTimeout(() => {
        setPopup(false)
        router.refresh()
    }, 2000);
  } catch (err) {
    console.error(err);
    setError("Error uploading file");
  } finally {
    setUploadLoading(false);
  }
};
function handleOpen(paper,fileUrl) {
    setPrevirew(fileUrl);
    setPrevirewOpen(true);
    setEditData(paper);

}
function handleEdit(paper) {
    setEditPaper(true);
    setEditName(paper.file_name || paper.file.split("/").pop());
    setEditData(paper);
}
const handleSubmitEdit = async (e) => {
  e.preventDefault();

  const fileInput = e.target.paperTitle.files[0];
  if (!fileInput) {
    setError("Please select a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("mapping", id); // mapping id
   formData.append("file_name", editname);
  formData.append("file", fileInput); // actual file

  setUploadLoading(true);

  try {
    const res = await authFetch(`exam-paper-viewset/${editData.id}`, {
      method: "PUT",
      
      body: formData, 
      // ❌ do not set Content-Type manually
    });

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    const data = await res.json();
    setError(`File uploaded successfully! ID: ${data.id}`);
    setTimeout(() => {
        setEditPaper(false)
        router.refresh()
    }, 2000);
  } catch (err) {
    console.error(err);
    setError("Error uploading file");
  } finally {
    setUploadLoading(false);
  }
};
    return(
        <>
        <div className="px-6 py-6">
            <BackButton/>
            <div className={`  py-8 sm:px-12 `}>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                      <div className="sm:w-3/5">
                        <h5 className="text-2xl font-bold flex gap-1">
                          <BookIcon className="w-7 h-7" /> {subjectId} Question Papers
                        </h5>
                      </div>
                      <div className=" flex gap-3 mt-3 sm:mt-0">
                       <button onClick={()=>setPopup(true)}><span className="border border-gray-300 bg-gray-800 text-gray-50 py-2 px-8 mt-4 sm:mt-0 rounded-md shadow-sm hover:shadow-xl transition-shadow cursor-pointer">Uplaod Paper</span></button>
                        
                      </div>
                    </div>
                  </div>
            <div>
          <div className="overflow-x-auto sm:px-12">
        <table className="min-w-full bg-white border border-gray-200 rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">File Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Created At</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Updated At</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.exam_paper.map((paper) => (
              <tr key={paper.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6 text-sm text-gray-800">
                  {paper.file_name || paper.file.split("/").pop()}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {new Date(paper.created_at).toLocaleString()}
                </td>
                <td className="py-3 px-6 text-sm text-gray-800">
                  {new Date(paper.updated_at).toLocaleString()}
                </td>
                <td className="py-3 px-6 text-sm flex gap-3 text-gray-800">
                     <button
                    onClick={() => handleOpen(paper, paper.file)}
                    className="text-black hover:text-gray-700 transition-colors"
                  >
                    <Download size={18} />
                  </button> 
                  <button
                    onClick={() => handleEdit(paper)}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    <FileEdit size={18} />
                  </button>
                 
                </td>
              </tr>
            ))}
            {data?.exam_paper.length === 0 && (
              <tr>
                <td colSpan={4} className="py-3 px-6 text-center text-gray-500">
                  No exam papers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
            </div>
        </div>
        {popup && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">    
                <div className="bg-white rounded-lg shadow-lg max-w-xl p-6 relative">
                    <button
                        className="absolute top-4 right-2 text-gray-600 hover:text-gray-800 "
                        onClick={() => setPopup(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <h3 className="text-xl mt-5 font-bold">Upload {subjectId} Question Paper</h3>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-gray-700  mb-2" htmlFor="paperTitle"> Name of Set</label>
                            <input
  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>
                            <label className="block text-gray-700  mb-2 mt-3" htmlFor="paperTitle"> Upload Paper</label>
                            <input
  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  type="file"
  accept="image/*,.pdf,.doc,.docx"
  id="paperTitle"
  name="paperTitle"
  required
/>
<button
  type="submit"
  disabled = {uploadloading}
  className="group bg-gray-900 text-gray-50 w-full mt-5 flex items-center gap-2 justify-center px-8 py-2 mb-3 cursor-pointer rounded-md text-sm transition-all duration-300"
>
 {uploadloading? <span className="flex gap-1 items-center"><Loader2Icon className="animate-spin" /></span> : "Submit"}
  <UploadCloud
    className="h-0 w-0 opacity-0 transform translate-x-[-5px] transition-all duration-300 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 group-hover:translate-x-0"
  />
</button>
                        </div>  
                    </form>
            </div>
            </div>
            </>
            )}
            {previewOpen && (
              <>

                    <iframe
                      src={`https://taxila.in/exam-paper-file/${editData.id}`}
                      className="w-full h-full border-none"
                        title="Document Preview"
                        />
                </>)}
                {editPaper && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">    
                <div className="bg-white rounded-lg shadow-lg max-w-xl p-6 relative">
                    <button
                        className="absolute top-4 right-2 text-gray-600 hover:text-gray-800 "
                        onClick={() => setEditPaper(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <h3 className="text-xl mt-5 font-bold">Edit {subjectId} - {editData.file_name || editData.file.split("/").pop()} Question Paper</h3>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    <form onSubmit={handleSubmitEdit} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-gray-700  mb-2" htmlFor="paperTitle"> Name of Set</label>
                            <input
  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  type="text"
  value={editname}
  onChange={(e) => setEditName(e.target.value)}
  required
/>
                            <label className="block text-gray-700  mb-2 mt-3" htmlFor="paperTitle"> Upload Paper</label>
                            <input
  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
  type="file"
  accept="image/*,.pdf,.doc,.docx"
  id="paperTitle"
  name="paperTitle"
  required
/>
<button
  type="submit"
  disabled = {uploadloading}
  className="group bg-gray-900 text-gray-50 w-full mt-5 flex items-center gap-2 justify-center px-8 py-2 mb-3 cursor-pointer rounded-md text-sm transition-all duration-300"
>
 {uploadloading? <span className="flex gap-1 items-center"><Loader2Icon className="animate-spin" /></span> : "Submit"}
  <UploadCloud
    className="h-0 w-0 opacity-0 transform translate-x-[-5px] transition-all duration-300 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 group-hover:translate-x-0"
  />
</button>
                        </div>  
                    </form>
            </div>
            </div>
            </>
            )}
        </>
    )

}