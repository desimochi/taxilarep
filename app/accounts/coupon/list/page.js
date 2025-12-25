"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { 
  Pencil, 
  Trash2, 
  Search, 
  Filter, 
  Tag, 
  Calendar,
  TrendingDown,
  Percent,
  DollarSign,
  User,
  Mail,
  Hash,
  X
} from "lucide-react";

export default function CustomFeeManager() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const [form, setForm] = useState({
    code: "",
    discount_type: "",
    discount_value: "",
    valid_from: "",
    valid_to: "",
  });

  // ---------------- FETCH LIST ----------------
  const fetchFees = async () => {
    try {
      const res = await authFetch("coupon-viewset");
      const json = await res.json();
      setFees(json.data || []);
    } catch {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  // ---------------- OPEN EDIT ----------------
  const openEditModal = (fee) => {
    setSelectedFee(fee);
    setForm({
      code: fee.code || "",
      discount_type: fee.discount_type || "",
      discount_value: fee.discount_value || "",
      valid_from: fee.valid_from || "",
      valid_to: fee.valid_to || "",
    });
    setOpenEdit(true);
  };

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    if (!form.discount_type) {
      toast.error("Select discount type");
      return false;
    }

    if (form.discount_value === "") {
      toast.error("Enter discount value");
      return false;
    }

    const value = Number(form.discount_value);

    if (value < 0) {
      toast.error("Discount cannot be negative");
      return false;
    }

    if (form.discount_type === "percent" && value > 100) {
      toast.error("Percentage discount cannot exceed 100%");
      return false;
    }

    return true;
  };

  // ---------------- UPDATE ----------------
  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      setUpdating(true);

      const res = await authFetch(
        `coupon-viewset/${selectedFee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student: selectedFee.student.id,
            code: form.code,
            discount_type: form.discount_type,
            discount_value: Number(form.discount_value),
            valid_from: form.valid_from,
            valid_to: form.valid_to,
          }),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Coupon updated successfully");
      setOpenEdit(false);
      fetchFees();
    } catch {
      toast.error("Failed to update coupon");
    } finally {
      setUpdating(false);
    }
  };

  // ---------------- DELETE (SOFT) ----------------
  const handleDelete = async (fee) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    try {
      const res = await authFetch(
        `coupon-viewset/${fee.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Coupon deleted");
      setFees((prev) => prev.filter((f) => f.id !== fee.id));
    } catch {
      toast.error("Failed to delete coupon");
    }
  };

  // ---------------- FILTERING ----------------
  const filteredFees = fees
    .filter(f => !f.is_delete)
    .filter(f => {
      const matchesSearch = 
        f.student.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.student.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.student.enrollment_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.student.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === "all" || f.discount_type === filterType;
      
      return matchesSearch && matchesType;
    });

  const stats = {
    total: fees.filter(f => !f.is_delete).length,
    flat: fees.filter(f => !f.is_delete && f.discount_type === "flat").length,
    percent: fees.filter(f => !f.is_delete && f.discount_type === "percent").length,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-purple-600 absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading coupons...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50/30 p-4 md:p-8">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
              <Tag className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Custom Coupons
              </h1>
              <p className="text-gray-600 mt-1">Manage student discount codes and offers</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium mb-1">Total Coupons</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Tag className="text-purple-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-100 font-medium mb-1">Flat Discounts</p>
                  <p className="text-3xl font-bold text-white">{stats.flat}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <DollarSign className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-pink-100 font-medium mb-1">Percentage Off</p>
                  <p className="text-3xl font-bold text-white">{stats.percent}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <Percent className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by student name, enrollment, email, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2 font-medium"
              >
                <Filter size={20} />
                Filters
              </button>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white font-medium"
              >
                <option value="all">All Types</option>
                <option value="flat">Flat Discount</option>
                <option value="percent">Percentage</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                    Search: {searchTerm}
                    <X 
                      size={14} 
                      className="cursor-pointer hover:text-purple-900" 
                      onClick={() => setSearchTerm("")}
                    />
                  </span>
                )}
                {filterType !== "all" && (
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                    Type: {filterType}
                    <X 
                      size={14} 
                      className="cursor-pointer hover:text-blue-900" 
                      onClick={() => setFilterType("all")}
                    />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Student Info
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Discount Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Coupon Code
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Validity Period
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredFees.map((fee, idx) => (
                  <tr 
                    key={fee.id} 
                    className="hover:bg-purple-50/50 transition-all duration-200 group"
                    style={{ animationDelay: `${idx * 30}ms` }}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 flex-shrink-0 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 mb-0.5">
                            {fee.student.first_name} {fee.student.last_name}
                          </div>
                          <div className="flex flex-col gap-0.5 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Hash size={10} />
                              {fee.student.enrollment_number}
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail size={10} />
                              {fee.student.user?.email}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-lg ${
                          fee.discount_type === "percent" 
                            ? "bg-pink-100" 
                            : "bg-blue-100"
                        }`}>
                          {fee.discount_type === "percent" ? (
                            <Percent className={fee.discount_type === "percent" ? "text-pink-600" : "text-blue-600"} size={18} />
                          ) : (
                            <DollarSign className="text-blue-600" size={18} />
                          )}
                        </div>
                        <div>
                          <div className="text-base font-bold text-gray-900">
                            {fee.discount_type === "percent" ? `${fee.discount_value}%` : `₹${fee.discount_value}`}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {fee.discount_type} Discount
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border-2 border-purple-200">
                        <Tag className="text-purple-600" size={14} />
                        <span className="font-mono font-bold text-purple-900 text-sm">
                          {fee.code || "N/A"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar size={12} className="text-green-600" />
                          <span className="text-gray-600">From:</span>
                          <span className="font-semibold text-gray-900">
                            {fee.valid_from ? new Date(fee.valid_from).toLocaleDateString() : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Calendar size={12} className="text-red-600" />
                          <span className="text-gray-600">To:</span>
                          <span className="font-semibold text-gray-900">
                            {fee.valid_to ? new Date(fee.valid_to).toLocaleDateString() : "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditModal(fee)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(fee)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:from-red-700 hover:to-red-800 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredFees.length === 0 && (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                <Tag className="text-purple-400" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No coupons found</h3>
              <p className="text-gray-500">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your filters" 
                  : "Create your first coupon to get started"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ---------------- EDIT MODAL ---------------- */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Tag className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">Edit Coupon</h3>
                </div>
                <button
                  onClick={() => setOpenEdit(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="text-white" size={20} />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Enter code (e.g., SAVE20)"
                    value={form.code}
                    onChange={(e) => setForm({ ...form, code: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Type
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none bg-white"
                  value={form.discount_type}
                  onChange={(e) => setForm({ ...form, discount_type: e.target.value })}
                >
                  <option value="">Select Type</option>
                  <option value="flat">💰 Flat Amount</option>
                  <option value="percent">📊 Percentage</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Value
                </label>
                <div className="relative">
                  {form.discount_type === "percent" ? (
                    <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  ) : (
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  )}
                  <input
                    type="number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder={form.discount_type === "percent" ? "e.g., 15 (max 100)" : "e.g., 500"}
                    value={form.discount_value}
                    onChange={(e) => setForm({ ...form, discount_value: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valid From
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    value={form.valid_from}
                    onChange={(e) => setForm({ ...form, valid_from: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valid To
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    value={form.valid_to}
                    onChange={(e) => setForm({ ...form, valid_to: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 rounded-b-2xl flex justify-end gap-3">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={updating}
                onClick={handleUpdate}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Saving...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}