    "use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";
import CustomFeeUploadModal from "../CustomFeeUploadModal";

export default function AssignFeePage() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [feeTypes, setFeeTypes] = useState([]);

  const [filters, setFilters] = useState({ batch: "", search: "" });
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [feeForm, setFeeForm] = useState({
    code: "",
    discount_type: "",
    discount_value: "",
    valid_from: "",
    valid_to: "",
  });

  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------- FETCH STUDENTS ----------------
  useEffect(() => {
    const fetchStudents = async () => {
      const res = await authFetch("student-list");
      const data = await res.json();

      setStudents(data.data);

      const batches = [
        ...new Set(data.data.map((s) => s.batch?.name).filter(Boolean)),
      ];
      setBatchOptions(batches);
    };

    fetchStudents();
  }, []);

  // ---------------- FETCH FEE TYPES ----------------
  useEffect(() => {
    const fetchFeeTypes = async () => {
      const res = await authFetch(`fee-type-viewset?batch__name=${filters.batch}`);
      const data = await res.json();
      setFeeTypes(data.data);
    };

    fetchFeeTypes();
  }, [filteredStudents]);

  // ---------------- FILTER STUDENTS ----------------
  useEffect(() => {
    if (!filters.batch) {
      setFilteredStudents([]);
      return;
    }

    let filtered = students.filter((s) => {
      const batchMatch = s.batch?.name === filters.batch;
      const search = filters.search.toLowerCase();

      const searchMatch =
        s.enrollment_number?.toString().includes(search) ||
        `${s.first_name} ${s.last_name}`.toLowerCase().includes(search) ||
        s.user?.email?.toLowerCase().includes(search);

      return batchMatch && (filters.search ? searchMatch : true);
    });

    setFilteredStudents(filtered);
  }, [filters, students]);

  // ---------------- CHECKBOX LOGIC ----------------
  const toggleStudent = (id) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const selectAll = (checked) => {
    setSelectedStudents(checked ? filteredStudents.map((s) => s.id) : []);
  };

  // ---------------- SUBMIT ----------------
  const submitFee = async () => {
    setLoading(true);

    try {
      const res = await authFetch("bulk-coupon-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_ids: selectedStudents,
            code: feeForm.coupon_code,
            discount_type: feeForm.discount_type,
            discount_value: feeForm.discount_value,
            valid_from: feeForm.valid_from,
            valid_to: feeForm.valid_to,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Coupon Code Create successfully 🎉");
      setShowPreview(false);
      setSelectedStudents([]);
      setFeeForm({ code: "", discount_type: "", discount_value: "", valid_from: "", valid_to: "" });

    } catch {
      toast.error("Failed to create coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow">
      <Toaster position="top-right" />
<div className="flex justify-between items-center">
<h2 className="text-2xl font-bold mb-6">Assign Coupon to Students</h2>
<div className="flex gap-2">
    <Link href={'/accounts/coupon/list'} className="py-2 flex gap-2 items-center px-8 rounded-sm bg-zinc-900 text-white"> <EyeIcon className="h-4 w-4" />See Coupon List</Link>
</div>

</div>
      

      {/* FILTERS */}
      <div className="flex gap-3 mb-6">
        <select
          className="border p-2 rounded"
          value={filters.batch}
          onChange={(e) =>
            setFilters({ ...filters, batch: e.target.value })
          }
        >
          <option value="">Select Batch</option>
          {batchOptions.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <input
          placeholder="Search name, email, enrollment"
          className="border p-2 rounded w-64"
          value={filters.search}
          onChange={(e) =>
            setFilters({ ...filters, search: e.target.value })
          }
        />
      </div>

      {/* STUDENT TABLE */}
      {!filters.batch && (
        <p className="text-gray-500 text-center py-10">
          Please select a batch to view students
        </p>
      )}
 {selectedStudents.length > 0 && (
        <div className="mt-8 p-6 border rounded bg-gray-50">
          <h3 className="font-bold mb-4">
            Assign Coupon ({selectedStudents.length} students)
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <label className="font-medium">Coupon Code</label>
            <input
              type="text"
              placeholder="Coupon Code"
                className="border p-2 rounded"
                value={feeForm.coupon_code}
                onChange={(e) =>
                    setFeeForm({ ...feeForm, coupon_code: e.target.value })
                }
            />
            <label className="font-medium">Fee Type</label>
           <select
  className="border p-2 rounded"
  value={feeForm.discount_type}
  onChange={(e) => {
    setFeeForm({
      ...feeForm,
      discount_type: e.target.value,
      discount_value: "", // 🔄 reset amount
    });
  }}
>
  <option value="">Select Discount Type</option>
  <option value="flat">Amount</option>
  <option value="percent">Percentage</option>
</select>

<label className="font-medium">Amount</label>
            <input
  type="number"
  placeholder="Amount"
  className="border p-2 rounded"
  value={feeForm.discount_value}
  min={0}
  max={feeForm.discount_type === "percent" ? 100 : undefined}
  onChange={(e) => {
    let value = e.target.value;

    // Convert to number
    let numericValue = Number(value);

    // 🔐 If percent → cap at 100
    if (feeForm.discount_type === "percent") {
      if (numericValue > 100) {
        numericValue = 100;
        toast.error("Percentage cannot be greater than 100");
      }
    }

    setFeeForm({
      ...feeForm,
      discount_value: numericValue,
    });
  }}
/>

         <label className="col-span-2 font-medium">Valid From</label>
            <input
              type="datetime-local"
              placeholder="Description"
              className="border p-2 rounded col-span-2"
              value={feeForm.valid_from}
              onChange={(e) =>
                setFeeForm({ ...feeForm, valid_from: e.target.value })
              }
            />
            <label className="col-span-2 font-medium">Valid To</label>
            <input
              type="datetime-local"
              placeholder="Description"
              className="border p-2 rounded col-span-2"
              value={feeForm.valid_to}
              onChange={(e) =>
                setFeeForm({ ...feeForm, valid_to: e.target.value })
              }
            />
          </div>

          <button
            onClick={() => setShowPreview(true)}
            className="mt-4 bg-red-700 text-white px-6 py-2 rounded"
          >
            Preview & Submit
          </button>
        </div>
      )}
      {filters.batch && (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">
                <input
                  type="checkbox"
                  checked={
                    selectedStudents.length === filteredStudents.length &&
                    filteredStudents.length > 0
                  }
                  onChange={(e) => selectAll(e.target.checked)}
                />
              </th>
              <th className="p-2">Enrollment</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(s.id)}
                    onChange={() => toggleStudent(s.id)}
                  />
                </td>
                <td className="p-2">{s.enrollment_number}</td>
                <td className="p-2">
                  {s.first_name} {s.last_name}
                </td>
                <td className="p-2">{s.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* FEE FORM */}
     

      {/* PREVIEW MODAL */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="font-bold mb-4">Confirm Fee Assignment</h3>

            <p><b>Students:</b> {selectedStudents.length}</p>
            <p>
              <b>Fee Type:</b>{" "}
              {feeForm.discount_type === "flat"
                ? "Amount"
                : feeForm.discount_type === "percent"
                ? "Percentage"
                : ""}
            </p>
            <p><b>Amount:</b> ₹{feeForm.discount_value}</p>
            <p className="mb-4"><b>Coupon Code:</b> {feeForm.coupon_code}</p>

            <p><b>Valid From:</b> {feeForm.valid_from}</p>
            <p className="mb-4"><b>Valid To:</b> {feeForm.valid_to}</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={submitFee}
                disabled={loading}
                className="px-4 py-2 bg-red-700 text-white rounded"
              >
                {loading ? "Submitting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
