"use client";

import { useContext, useEffect, useState } from "react";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import { handlePayment } from "@/lib/payments";
import toast from "react-hot-toast";
import { Check, AlertCircle, Tag, CreditCard, Cross } from "lucide-react";
import { useParams } from "next/navigation";

export default function Page() {
    const {id} =  useParams()
    const studentId = id;

  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponId, setCouponId] = useState(null);
  const [couponApplied, setCouponApplied] = useState(false);
const [resitFeeTypes, setResitFeeTypes] = useState([]);

  const [course, setCourse] = useState([]);
  const [batch, setBatch] = useState([]);
  const [term, setTerm] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [feeTypeId, setFeeTypeId] = useState(null);
  const [baseAmount, setBaseAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // ---------------- INITIAL DATA ----------------
  useEffect(() => {
    Promise.all([
      authFetch("courses-list"),
      authFetch("batches-list"),
      authFetch("terms-list"),
    ])
      .then(async ([c, b, t]) => {
        setCourse((await c.json()).data);
        setBatch((await b.json()).data);
        setTerm((await t.json()).data);
      })
      .catch(() => toast.error("Failed to load initial data"));
  }, []);

  // ---------------- FETCH SUBJECTS ----------------
  useEffect(() => {
    if (selectedCourse && selectedBatch && selectedTerm && selectedType) {
      fetchSubjects();
    }
  }, [selectedCourse, selectedBatch, selectedTerm, selectedType]);

async function fetchResitFeeTypes(batchId) {
  try {
    const res = await authFetch(
      `fee-type-batch-wise-for-resit/${batchId}`
    );
    const json = await res.json();
    setResitFeeTypes(json.data || []);
  } catch {
    toast.error("Failed to fetch resit fee types");
  }
}
  async function fetchSubjects() {
    try {
      const res = await authFetch(
        `resit-subject-mapping-filter?course_id=${selectedCourse}&batch_id=${selectedBatch}&term_id=${selectedTerm}&type=${selectedType}`
      );
      const data = await res.json();
      setSubjects(data.data || []);
    } catch {
      toast.error("Failed to fetch subjects");
    }
  }

  // ---------------- FETCH FEE ----------------
  useEffect(() => {
    if (!feeTypeId) return;

    authFetch(`fee-type-viewset/${feeTypeId}`)
      .then((res) => res.json())
      .then((data) => setBaseAmount(data.data.default_amount || 0))
      .catch(() => setBaseAmount(0));
  }, [feeTypeId]);

  // ---------------- TOTAL + RESET COUPON ----------------
 useEffect(() => {
  if (!selectedType || resitFeeTypes.length === 0) return;

  const targetNumber = selectedType === "resit-1" ? "1" : "2";

  const matchedFee = resitFeeTypes.find((f) => {
    // Normalize name: remove extra spaces, lowercase
    const normalizedName = f.name.replace(/\s+/g, " ").toLowerCase();
    return normalizedName.includes(`resit ${targetNumber}`);
  });

  if (!matchedFee) {
    console.error("No matching resit fee found", resitFeeTypes);
    return;
  }

  setBaseAmount(Number(matchedFee.default_amount));
  setFeeTypeId(matchedFee.id);
}, [selectedType, resitFeeTypes]);
useEffect(() => {
  if (!selectedType || resitFeeTypes.length === 0) return;

  const feeName =
    selectedType === "resit-1" ? "Resit 1" : "Resit 2";

  const matchedFee = resitFeeTypes.find(
    (f) => f.name.toLowerCase() === feeName.toLowerCase()
  );

  if (matchedFee) {
    setBaseAmount(Number(matchedFee.default_amount));
    setFeeTypeId(matchedFee.id);
  }
}, [selectedType, resitFeeTypes]);

useEffect(() => {
  if (!baseAmount || selectedSubjects.length === 0) {
    setTotalAmount(0);
    return;
  }

  const total = Number(baseAmount) * selectedSubjects.length;
  setTotalAmount(Number(total.toFixed(2)));
}, [baseAmount, selectedSubjects]);

  // ---------------- APPLY COUPON ----------------
  async function applyCoupon() {
  if (couponApplied) {
    toast.error("Coupon already applied");
    return;
  }

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

    // ✅ TOTAL BEFORE DISCOUNT
    const currentTotal = baseAmount * selectedSubjects.length;

    let discount = 0;

    if (couponData.discount_type === "percent") {
      discount = (currentTotal * couponData.discount_value) / 100;
    } else {
      discount = Number(couponData.discount_value);
    }

    // 🔐 Prevent negative payable
    let finalAmount = currentTotal - discount;
    if (finalAmount < 1) finalAmount = 1;

    setTotalAmount(Number(finalAmount.toFixed(2)));
    setCouponApplied(true);
    setCouponId(couponData.id);

    toast.success(`Coupon applied: ₹${discount.toFixed(2)} off`);
  } catch (err) {
    toast.error(err.message || "Invalid coupon");
  }
}


  // ---------------- SUBMIT ----------------
  async function handleSubmit() {
    if (loading) return;
    if (!selectedSubjects.length) return toast.error("Select at least one subject");

    try {
      setLoading(true);

      await authFetch("resit-request-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType,
          student: studentId,
          subjects: selectedSubjects,
          term: selectedTerm,
          fee_type: feeTypeId,
          amount: totalAmount,
          coupon: couponId,
        }),
      });

      toast.success("Resit Applied Successfully");
    //   setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      toast.error(err.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          {/* Step Indicator */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedCourse && selectedBatch && selectedTerm && selectedType ? 'bg-white text-red-600' : 'bg-red-500'}`}>
                  {selectedCourse && selectedBatch && selectedTerm && selectedType ? <Check size={16} /> : '1'}
                </div>
                <span className="text-sm font-medium">Course Details</span>
              </div>
              <div className="flex-1 h-0.5 bg-red-500 mx-4"></div>
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedSubjects.length > 0 ? 'bg-white text-red-600' : 'bg-red-500'}`}>
                  {selectedSubjects.length > 0 ? <Check size={16} /> : '2'}
                </div>
                <span className="text-sm font-medium">Select Subjects</span>
              </div>
              <div className="flex-1 h-0.5 bg-red-500 mx-4"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center">
                  3
                </div>
                <span className="text-sm font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Course Selection Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 font-bold">1</div>
                Course Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Course</label>
                  <select 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    value={selectedCourse}
                  >
                    <option value="">Select Course</option>
                    {course.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Batch</label>
                  <select 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                    onChange={(e) => setSelectedBatch(e.target.value)}
                    value={selectedBatch}
                  >
                    <option value="">Select Batch</option>
                    {batch.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Term</label>
                  <select 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors bg-white"
                    onChange={(e) => setSelectedTerm(e.target.value)}
                    value={selectedTerm}
                  >
                    <option value="">Select Term</option>
                    {term.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Resit Type</label>
                 <select
  value={selectedType}
  onChange={(e) => {
    const type = e.target.value;

    setSelectedType(type);
    setSelectedSubjects([]);
    setCoupon("");
    setCouponApplied(false);
    setCouponId(null);

    if (selectedBatch) {
      fetchResitFeeTypes(selectedBatch);
    }
  }}
>
  <option value="">Select Type</option>
  <option value="resit-1">Resit-1</option>
  <option value="resit-2">Resit-2</option>
</select>
                </div>
              </div>
            </div>

            {/* Subjects Section */}
            {subjects.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-200 text-xs">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 font-bold">2</div>
                  Select Subjects
                </h3>
                
                <div className="bg-slate-50 rounded-xl p-4 space-y-2 max-h-64 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {subjects.map((s) => (
                    <label 
                      key={s.id} 
                      className="flex items-center p-3 bg-white rounded-lg border border-slate-200 hover:border-red-500 hover:bg-red-50 transition-all cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-red-600 border-slate-300 rounded focus:ring-red-500 cursor-pointer"
                        checked={selectedSubjects.includes(s.id)}
                        onChange={(e) => {
                          const id = s.id;
                          setSelectedSubjects((prev) =>
                            e.target.checked
                              ? [...prev, id]
                              : prev.filter((x) => x !== id)
                          );
                        }}
                      />
                      <span className="ml-3 text-slate-900 font-medium group-hover:text-red-700">{s.subject?.name}</span>
                    </label>
                  ))}
                </div>

                {subjects.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <AlertCircle className="mx-auto mb-2" size={32} />
                    <p>No subjects available for selected criteria</p>
                  </div>
                )}
              </div>
            )}

            {/* Payment Section */}
            {selectedSubjects.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-200 flex gap-2">
                <div className="w-1/2">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center mr-3 font-bold">3</div>
                  Payment Details
                </h3>

                {/* Fee Breakdown */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between items-center text-slate-700">
                    <span>Fee per subject</span>
                    <span className="font-semibold">₹{baseAmount}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-700">
                    <span>Number of subjects</span>
                    <span className="font-semibold">{selectedSubjects.length}</span>
                  </div>
                  <div className="border-t border-slate-300 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-900">Total Amount</span>
                    <span className="text-2xl font-bold text-red-600">₹{totalAmount}</span>
                  </div>
                </div>
</div>
                {/* Coupon Section */}
                <div className="w-1/2">
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Tag className="text-amber-600 mr-2" size={20} />
                    <span className="font-semibold text-slate-900">Have a coupon code?</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Enter coupon code"
                      value={coupon}
                      disabled={couponApplied}
                      onChange={(e) => setCoupon(e.target.value)}
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={!coupon || couponApplied}
                      className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                      {couponApplied ? (
                        <>
                          <Check size={18} className="mr-1" />
                          Applied
                        </>
                      ) : (
                        'Apply'
                      )}
                    </button>
                  </div>
                  <p className="text-red-600 mt-2 cursor-pointer flex items-center text-xs gap-2" onClick={() => {
                    setCoupon("");
                    setCouponApplied(false);
                    setCouponId(null);
                  }}><Cross className="h-3 w-3 rotate-45"/> Remove Code</p>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} className="mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </button>
                    </div>
              
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
      
      </div>
    </div>
  );
}

