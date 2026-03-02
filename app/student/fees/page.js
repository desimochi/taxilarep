"use client";

import { useContext, useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import toast from "react-hot-toast";
import { handlePayment } from "@/lib/payments";
import Link from "next/link";
import { History, X, AlertCircle, CheckCircle2, Clock, CreditCard, Tag, TicketIcon } from "lucide-react";

export default function StudentCustomFeeList() {
  const { state } = useContext(GlobalContext);
  const studentId = state.user_id;
  const enrollment = state.enrollment_number;

  const [fees, setFees] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showPayModal, setShowPayModal] = useState(false);
  const [payAmount, setPayAmount] = useState(0);
  const [baseAmount, setBaseAmount] = useState(0);
  const [extraInterestAmount, setExtraInterestAmount] = useState(0);
  const [payFeeTypeId, setPayFeeTypeId] = useState(null);
  const [customFeeId, setCustomFeeId] = useState(null);

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponId, setCouponId] = useState(null);

  useEffect(() => {
    async function fetchFees() {
      try {
        const res = await authFetch(`custom-fee-student-wise/${studentId}`);
        const json = await res.json();

        const activeFees = (json.data || []).filter(f => !f.is_delete);
        setFees(activeFees);

        if (activeFees.length) {
          setStudent(activeFees[0].student);
        }
      } catch {
        toast.error("Failed to load fees");
      } finally {
        setLoading(false);
      }
    }
    fetchFees();
  }, [studentId]);

  function calculateExtraInterest(fee) {
    if (!fee.fee_type?.is_interest_applied) return 0;

    const baseDate = fee.payment_due_date 
      ? new Date(fee.payment_due_date) 
      : new Date(fee.created_at);

    const interestStartDate = new Date(baseDate);
    interestStartDate.setMonth(interestStartDate.getMonth() + 1);

    const today = new Date();

    if (today <= interestStartDate) return 0;

    const yearDiff = today.getFullYear() - interestStartDate.getFullYear();
    const monthDiff = today.getMonth() - interestStartDate.getMonth();
    
    let totalMonths = (yearDiff * 12) + monthDiff + 1;

    if (totalMonths <= 0) return 0;

    const rate = Number(fee.fee_type.interest_rate_percent || 0);
    const baseAmount = Number(fee.amount);

    const interest = (baseAmount * rate * totalMonths) / 100;

    return Number(interest.toFixed(2));
  }

  function handlePay(fee) {
    const interest = calculateExtraInterest(fee);

    setBaseAmount(Number(fee.amount));
    setExtraInterestAmount(interest);
    setPayAmount(Number((fee.amount + interest).toFixed(2)));

    setPayFeeTypeId(fee.fee_type?.id);
    setCustomFeeId(fee.id);

    setCoupon("");
    setCouponApplied(false);
    setCouponId(null);

    setShowPayModal(true);
  }

  async function applyCoupon() {
    if (couponApplied) return toast.error("Coupon already applied");

    try {
      const res = await authFetch("coupon-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          code: coupon,
        }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      const couponData = result.data;

      let discount = 0;
      if (couponData.discount_type === "percent") {
        discount = (baseAmount * couponData.discount_value) / 100;
      } else {
        discount = couponData.discount_value;
      }

    const discountedBase = baseAmount - discount;

// calculate final payable
let finalAmount = discountedBase + extraInterestAmount;

// 🔐 enforce minimum ₹1 payable
if (finalAmount <= 0) {
  finalAmount = 1;
}

setPayAmount(Number(finalAmount.toFixed(2)));
      setCouponApplied(true);
      setCouponId(couponData.id);

      toast.success(`Coupon applied: ₹${discount.toFixed(2)} off`);
    } catch (err) {
      toast.error(err.message || "Invalid coupon");
    }
  }

  async function proceedToPay() {
    if (payAmount <= 0) {
      return toast.error("Payable amount must be greater than zero");
    }
    try {
      const res = await handlePayment(
        enrollment,
        payAmount,
        payFeeTypeId,
        customFeeId,
        extraInterestAmount,
        couponId
      );

      if (res.payment === "successful") {
        toast.success("Payment Successful 🎉");
        setShowPayModal(false);
        return;
      }

      toast.error("Payment failed");
    } catch (err) {
      toast.error(err.reason || "Payment failed");
    }
  }

  const unpaidFees = fees.filter(f => !f.is_paid);
  const paidFees = fees.filter(f => f.is_paid);
  const totalUnpaid = unpaidFees.reduce((sum, f) => sum + Number(f.amount), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading fees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        {student && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">
                    {student.first_name} {student.last_name}
                  </h1>
                  <p className="text-red-100 text-sm">
                    Enrollment: {student.enrollment_number}
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link
                  href="/student/coupon-code"
                  className="flex items-center gap-2 bg-white text-red-600 px-5 py-2.5 rounded-lg font-medium hover:bg-red-50 transition-colors shadow-sm"
                >
                  <TicketIcon size={18} />
                  <span>Coupon Code</span>
                </Link>
                <Link
                  href="/student/fees/transactions"
                  className="flex items-center gap-2 bg-white text-red-600 px-5 py-2.5 rounded-lg font-medium hover:bg-red-50 transition-colors shadow-sm"
                >
                  <History size={18} />
                  <span>Transaction History</span>
                </Link>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 bg-slate-50">
              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Clock className="text-amber-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Pending</p>
                    <p className="text-2xl font-bold text-slate-900">{unpaidFees.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <CheckCircle2 className="text-emerald-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Paid</p>
                    <p className="text-2xl font-bold text-slate-900">{paidFees.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <CreditCard className="text-red-600" size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Total Due</p>
                    <p className="text-2xl font-bold text-slate-900">₹{totalUnpaid.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unpaid Fees */}
        {unpaidFees.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-amber-600" size={20} />
                <h2 className="text-xl font-bold text-slate-900">Pending Fees</h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Fee Type</th>
                    <th className="text-right p-4 text-sm font-semibold text-slate-700">Amount</th>
                    <th className="text-center p-4 text-sm font-semibold text-slate-700">Status</th>
                    <th className="text-right p-4 text-sm font-semibold text-slate-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {unpaidFees.map(fee => {
                    const interest = calculateExtraInterest(fee);
                    return (
                      <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <p className="font-medium text-slate-900">{fee.fee_type?.name}</p>
                          {interest > 0 && (
                            <p className="text-xs text-amber-600 mt-1">
                              +₹{interest.toFixed(2)} late interest
                            </p>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <p className="text-lg font-bold text-slate-900">₹{fee.amount}</p>
                        </td>
                        <td className="p-4 text-center">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                            <Clock size={12} />
                            Unpaid
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handlePay(fee)}
                            className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-sm"
                          >
                            <CreditCard size={16} />
                            Pay Now
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Paid Fees */}
        {paidFees.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-emerald-600" size={20} />
                <h2 className="text-xl font-bold text-slate-900">Paid Fees</h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-700">Fee Type</th>
                    <th className="text-right p-4 text-sm font-semibold text-slate-700">Amount</th>
                    <th className="text-center p-4 text-sm font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paidFees.map(fee => (
                    <tr key={fee.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <p className="font-medium text-slate-900">{fee.fee_type?.name}</p>
                      </td>
                      <td className="p-4 text-right">
                        <p className="text-lg font-bold text-slate-900">₹{fee.amount}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          <CheckCircle2 size={12} />
                          Paid
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {fees.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="text-slate-400" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Fees Found</h3>
            <p className="text-slate-600">There are no fee records available at this time.</p>
          </div>
        )}

        {/* Payment Modal */}
        {showPayModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Confirm Payment</h3>
                  <button 
                    onClick={() => setShowPayModal(false)}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Base Amount</span>
                    <span className="font-semibold text-slate-900">₹{baseAmount.toFixed(2)}</span>
                  </div>

                  {extraInterestAmount > 0 && (
                    <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                      <span className="text-amber-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        Late Interest
                      </span>
                      <span className="font-semibold text-amber-600">₹{extraInterestAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {couponApplied && (
                    <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Tag size={14} />
                        Discount Applied
                      </span>
                      <span className="font-semibold text-emerald-600">
                        -₹{(baseAmount + extraInterestAmount - payAmount).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-red-50 rounded-xl p-4 border-2 border-red-200">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 font-medium">Total Payable</span>
                    <span className="text-2xl font-bold text-red-600">₹{payAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                    <Tag size={14} />
                    Have a coupon code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:bg-slate-100 disabled:text-slate-500"
                      placeholder="Enter coupon code"
                      value={coupon}
                      disabled={couponApplied}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={!coupon || couponApplied}
                      className="px-5 py-2.5 bg-slate-900 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
                    >
                      {couponApplied ? "Applied" : "Apply"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <button
                  onClick={proceedToPay}
                  className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <CreditCard size={18} />
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}