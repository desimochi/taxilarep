"use client";

import { useContext, useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import toast from "react-hot-toast";
import { handlePayment } from "@/lib/payments";
export default function StudentCustomFeeList() {
  const [fees, setFees] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
    const { state } = useContext(GlobalContext);
      const studentId = state.user_id;
      const enrollment =  state.enrollment_number
  useEffect(() => {

    const fetchFees = async () => {
      try {
        const res = await authFetch(`custom-fee-student-wise/${studentId}`);
        const json = await res.json();

        // hide soft-deleted
        const activeFees = (json.data || []).filter(
          (f) => !f.is_delete
        );

        setFees(activeFees);

        // student info (same for all records)
        if (activeFees.length > 0) {
          setStudent(activeFees[0].student);
        }
      } catch (err) {
        console.error("Failed to fetch student fees", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, [studentId]);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading fees...</p>;
  }

  if (!fees.length) {
    return (
      <div className="p-6 bg-white rounded-xl shadow text-center">
        No fees found for this student
      </div>
    );
  }
 async function handlePay(totalAmount, feeTypeId, custom_fee) {
    console.log("Initiating payment for amount:", totalAmount, feeTypeId);
  try {
    const res = await handlePayment(enrollment, totalAmount, feeTypeId, custom_fee);

    if (res.payment === "successful") {
        toast.success("Payment Successful 🎉");
      return;
    }

    toast.error("Payment Failed. Please try again.");
  } catch (err) {
    toast.error(err.reason || "Payment Failed");
  }
}
  return (
    <div className="space-y-6">
      {/* STUDENT INFO */}
      {student && (
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-2">
            {student.first_name} {student.last_name}
          </h2>
          <p className="text-sm text-gray-600">
            Enrollment: {student.enrollment_number}
          </p>
          <p className="text-sm text-gray-600">
            Email: {student.user?.email}
          </p>
          <p className="text-sm text-gray-600">
            Batch: {student.batch?.name} | Course: {student.course?.name}
          </p>
        </div>
      )}

      {/* FEES TABLE */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold mb-4">Fee Details</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Fee Type</th>
                <th className="border p-2">Description</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Paid</th>
                <th className="border p-2">Status</th>
                 <th className="border p-2">Payment</th>
                <th className="border p-2">Created At</th>
              </tr>
            </thead>

            <tbody>
              {fees.map((fee) => (
                <tr key={fee.id} className="hover:bg-gray-50">
                  <td className="border p-2 font-semibold">
                    {fee.fee_type?.name}
                  </td>

                  <td className="border p-2">
                    {fee.description || "-"}
                  </td>

                  <td className="border p-2 font-bold">
                    ₹{fee.amount}
                  </td>

                  <td className="border p-2">
                    {fee.is_paid ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                        Unpaid
                      </span>
                    )}
                  </td>

                  <td className="border p-2">
                    {fee.is_active ? (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        Active
                      </span>
                    ) : (
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                        Inactive
                      </span>
                    )}
                  </td>
<td className="border p-2">
                    {!fee.is_paid ? (
                      <button onClick={() => handlePay(fee.amount,fee.id, fee.fee_type?.id)} className="bg-red-700 text-red-50 px-2 py-1 rounded text-xs">
                        Pay Now
                      </button>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                        Paid
                      </span>
                    )}
                  </td>
                  <td className="border p-2 text-xs text-gray-600">
                    {new Date(fee.created_at).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
