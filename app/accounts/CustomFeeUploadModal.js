    "use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { SheetIcon } from "lucide-react";

export default function CustomFeeUploadModal() {
  const [open, setOpen] = useState(false);
  const [feeTypes, setFeeTypes] = useState([]);
  const [feeType, setFeeType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH FEE TYPES ----------------
  useEffect(() => {
    const fetchFeeTypes = async () => {
      try {
        const res = await authFetch("fee-type-viewset");
        const data = await res.json();
        setFeeTypes(data.data || []);
      } catch {
        toast.error("Failed to load fee types");
      }
    };

    fetchFeeTypes();
  }, []);

  // ---------------- SUBMIT ----------------
  const handleUpload = async () => {
    if (!file || !feeType) {
      toast.error("Please select fee type and file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fee_type", feeType);

    setLoading(true);

    try {
      const res = await authFetch("custom-fee/file-upload", {
        method: "POST",
        body: formData, // ❗ DO NOT set Content-Type
      });

      if (!res.ok) throw new Error();

      toast.success("File uploaded successfully 🎉");
      setOpen(false);
      setFile(null);
      setFeeType("");
    } catch {
      toast.error("File upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />

      {/* OPEN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-red-700 flex gap-2 text-white px-4 py-2 rounded"
      >
       <SheetIcon/> Upload Fee File
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg p-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500"
            >
              ✕
            </button>

            <h3 className="text-lg font-bold mb-4">
              Upload Custom Fee File
            </h3>

            {/* Fee Type */}
            <label className="block mb-2 text-sm font-medium">
              Fee Type
            </label>
            <select
              value={feeType}
              onChange={(e) => setFeeType(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">Select Fee Type</option>
              {feeTypes.map((fee) => (
                <option key={fee.id} value={fee.id}>
                  {fee.name}
                </option>
              ))}
            </select>

            {/* File Upload */}
            <label className="block mb-2 text-sm font-medium">
              Upload File (Excel / CSV)
            </label>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-2 rounded mb-4"
            />

            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-red-700 text-white py-2 rounded"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
