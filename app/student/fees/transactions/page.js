"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import BackButton from "@/components/ui/Backbutton";
import { useContext, useEffect, useState } from "react";

export default function StudentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
     const { state } = useContext(GlobalContext); 
     const studentId = state.user_id;
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await authFetch(
          `payment-student-wise/${studentId}`
        );

        if (!res.ok) throw new Error("Failed to fetch payments");

        const json = await res.json();
        setPayments(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading transactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
        <BackButton/>
      <h2 className="text-2xl font-semibold mb-4 px-12 mt-6">
        Payment Transactions
      </h2>

      <div className="overflow-x-auto px-12">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Fee Type</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Mode</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Paid At</th>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Payment ID</th>
            </tr>
          </thead>

          <tbody>
            {payments
              .sort(
                (a, b) =>
                  new Date(b.paid_at) - new Date(a.paid_at)
              )
              .map((p, index) => (
                <tr
                  key={p.id}
                  className="text-sm hover:bg-gray-50"
                >
                  <td className="p-3 border">
                    {index + 1}
                  </td>

                  <td className="p-3 border">
                    {p.fee_type?.name}
                  </td>

                  <td className="p-3 border font-medium">
                    ₹{p.amount}
                  </td>

                  <td className="p-3 border capitalize">
                    {p.mode}
                  </td>

                  <td className="p-3 border">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        p.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-3 border">
                    {new Date(p.paid_at).toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td className="p-3 border text-xs">
                    {p.razorpay_order_id || "-"}
                  </td>

                  <td className="p-3 border text-xs">
                    {p.razorpay_payment_id || "-"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
