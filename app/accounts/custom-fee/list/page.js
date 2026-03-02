"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { Edit2, Trash2, DollarSign, Calendar, Filter, X, Check, AlertCircle } from "lucide-react";

export default function CustomFeeManager() {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    batch: "",
    course: "",
    feeType: "",
    status: "",
    paymentStatus: "",
  });

  const [form, setForm] = useState({
    description: "",
    amount: "",
    is_active: true,
    payment_due_date: "",
  });

  // Get unique values for filters
  const batches = [...new Set(fees.map(f => f.student.batch?.name).filter(Boolean))];
  const courses = [...new Set(fees.map(f => f.student.course?.name).filter(Boolean))];
  const feeTypes = [...new Set(fees.map(f => f.fee_type?.name).filter(Boolean))];

  // Filtered fees
  const filteredFees = fees.filter((fee) => {
    if (fee.is_delete) return false;
    
    const searchTerm = filters.search.toLowerCase();
    const matchesSearch = 
      fee.student.first_name.toLowerCase().includes(searchTerm) ||
      fee.student.last_name.toLowerCase().includes(searchTerm) ||
      fee.student.enrollment_number.toLowerCase().includes(searchTerm) ||
      fee.student.user?.email.toLowerCase().includes(searchTerm);

    const matchesBatch = !filters.batch || fee.student.batch?.name === filters.batch;
    const matchesCourse = !filters.course || fee.student.course?.name === filters.course;
    const matchesFeeType = !filters.feeType || fee.fee_type?.name === filters.feeType;
    const matchesStatus = !filters.status || 
      (filters.status === "active" ? fee.is_active : !fee.is_active);
    const matchesPaymentStatus = !filters.paymentStatus || 
      (filters.paymentStatus === "paid" ? fee.is_paid : !fee.is_paid);

    return matchesSearch && matchesBatch && matchesCourse && matchesFeeType && matchesStatus && matchesPaymentStatus;
  });

  // Statistics
  const stats = {
    total: filteredFees.length,
    totalAmount: filteredFees.reduce((sum, fee) => sum + Number(fee.amount), 0),
    paid: filteredFees.filter(f => f.is_paid).length,
    unpaid: filteredFees.filter(f => !f.is_paid).length,
    active: filteredFees.filter(f => f.is_active).length,
  };

  // ---------------- FETCH LIST ----------------
  const fetchFees = async () => {
    try {
      const res = await authFetch("custom-fee-viewset");
      const json = await res.json();
      setFees(json.data || []);
    } catch (err) {
      toast.error("Failed to load custom fees");
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
      description: fee.description,
      amount: fee.amount,
      is_active: fee.is_active,
      payment_due_date: fee.payment_due_date,
    });
    setOpenEdit(true);
  };

  // ---------------- UPDATE ----------------
  const handleUpdate = async () => {
    try {
      const res = await authFetch(
        `custom-fee-viewset/${selectedFee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student: selectedFee.student.id,
            fee_type: selectedFee.fee_type.id,
            description: form.description,
            amount: Number(form.amount),
            is_active: form.is_active,
            payment_due_date: form.payment_due_date,
          }),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Fee updated successfully");
      setOpenEdit(false);
      fetchFees();
    } catch {
      toast.error("Failed to update fee");
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (fee) => {
    if (!confirm("Are you sure you want to delete this fee?")) return;

    try {
      const res = await authFetch(
        `custom-fee-viewset/${fee.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student: fee.student.id,
            fee_type: fee.fee_type.id,
            description: fee.description,
            amount: fee.amount,
            is_delete: true,
          }),
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Fee deleted successfully");
      setFees((prev) => prev.filter((f) => f.id !== fee.id));
    } catch {
      toast.error("Failed to delete fee");
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      batch: "",
      course: "",
      feeType: "",
      status: "",
      paymentStatus: "",
    });
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== "").length;

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <Toaster position="top-right" />

      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Custom Fee Management</h1>
            <p className="text-red-100">
              Manage and track custom fees for students
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-right">
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold">{stats.total}</div>
              <div className="text-red-100 text-sm">Total Fees</div>
            </div>
            <div className="bg-white/20 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold">₹{stats.totalAmount.toLocaleString()}</div>
              <div className="text-red-100 text-sm">Total Amount</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Paid Fees</p>
              <p className="text-2xl font-bold text-green-600">{stats.paid}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Check className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Unpaid Fees</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.unpaid}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertCircle className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Fees</p>
              <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <DollarSign className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Inactive Fees</p>
              <p className="text-2xl font-bold text-gray-600">{stats.total - stats.active}</p>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg">
              <X className="text-gray-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="text-gray-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-red-100 text-red-700 text-xs font-semibold px-2 py-1 rounded-full">
              {activeFilterCount} active
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <input
            type="text"
            placeholder="Search student..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />

          <select
            value={filters.batch}
            onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">All Batches</option>
            {batches.map(b => <option key={b} value={b}>{b}</option>)}
          </select>

          <select
            value={filters.course}
            onChange={(e) => setFilters({ ...filters, course: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">All Courses</option>
            {courses.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={filters.feeType}
            onChange={(e) => setFilters({ ...filters, feeType: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">All Fee Types</option>
            {feeTypes.map(ft => <option key={ft} value={ft}>{ft}</option>)}
          </select>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <select
            value={filters.paymentStatus}
            onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="">All Payments</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="mt-4 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {filteredFees.length === 0 ? (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <DollarSign size={32} className="text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-900">No fees found</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Student
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Enrollment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Batch & Course
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fee Type
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-red-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {fee.student.first_name} {fee.student.last_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {fee.student.user?.email}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {fee.student.enrollment_number}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {fee.student.batch?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {fee.student.course?.name}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {fee.fee_type?.name}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-bold text-gray-900">
                        ₹{Number(fee.amount).toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                        <Calendar size={14} />
                        {fee.payment_due_date ? new Date(fee.payment_due_date).toLocaleDateString() : "N/A"}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {fee.is_paid ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          <Check size={14} className="mr-1" />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                          <AlertCircle size={14} className="mr-1" />
                          Unpaid
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {fee.is_active ? (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                          Inactive
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(fee)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(fee)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {openEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Edit Custom Fee</h2>
              <button
                onClick={() => setOpenEdit(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter fee description..."
                  rows="3"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter amount..."
                  value={form.amount}
                  onChange={(e) =>
                    setForm({ ...form, amount: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Due Date
                </label>
                <input
                  type="datetime-local"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={form.payment_due_date}
                  onChange={(e) =>
                    setForm({ ...form, payment_due_date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  value={form.is_active}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      is_active: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={() => setOpenEdit(false)}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}