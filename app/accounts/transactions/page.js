"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { useEffect, useState } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";

export default function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [perPage, setPerPage] = useState(10);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: "",
    enrollment: "",
    paymentId: "",
    orderId: "",
    batch: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Count active filters
  useEffect(() => {
    const count = Object.values(filters).filter(value => value !== "").length;
    setActiveFiltersCount(count);
  }, [filters]);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        per_page: perPage.toString(),
      });
      
      if (filters.search) params.append("search", filters.search);
      if (filters.enrollment) params.append("enrollment", filters.enrollment);
      if (filters.paymentId) params.append("payment_id", filters.paymentId);
      if (filters.orderId) params.append("order_id", filters.orderId);
      if (filters.batch) params.append("batch", filters.batch);
      if (filters.status) params.append("status", filters.status);
      if (filters.startDate) params.append("start_date", filters.startDate);
      if (filters.endDate) params.append("end_date", filters.endDate);
      
      const res = await authFetch(`payment-list?${params.toString()}`);
      const json = await res.json();

      if (!res.ok) throw new Error("Failed to fetch payments");

      setPayments(json.data || []);
      setTotalPages(json.extra?.total || 1);
      setTotalRecords(json.extra?.count || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [currentPage, perPage]);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    setCurrentPage(1);
    setShowFilterPopup(false);
    fetchPayments();
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      enrollment: "",
      paymentId: "",
      orderId: "",
      batch: "",
      status: "",
      startDate: "",
      endDate: "",
    });
    setCurrentPage(1);
    setTimeout(() => fetchPayments(), 0);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 text-red-600 bg-red-50 rounded-lg border border-red-200">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Payment Management</h1>
            <p className="text-red-100">
              Track and manage all payment transactions
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{totalRecords}</div>
            <div className="text-red-100 text-sm">Total Payments</div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Quick search by name, enrollment, or payment ID..."
              value={filters.search}
              onChange={(e) => {
                handleFilterChange("search", e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  applyFilters();
                }
              }}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilterPopup(true)}
            className="relative flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
          >
            <Filter size={20} />
            Advanced Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <select
            value={perPage}
            onChange={(e) => {
              setPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="10">10 per page</option>
            <option value="25">25 per page</option>
            <option value="50">50 per page</option>
            <option value="100">100 per page</option>
          </select>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600 font-medium">Active Filters:</span>
            {filters.enrollment && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                Enrollment: {filters.enrollment}
                <X 
                  size={14} 
                  className="cursor-pointer hover:text-red-900" 
                  onClick={() => {
                    handleFilterChange("enrollment", "");
                    setTimeout(applyFilters, 0);
                  }}
                />
              </span>
            )}
            {filters.paymentId && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                Payment ID: {filters.paymentId}
                <X 
                  size={14} 
                  className="cursor-pointer hover:text-red-900" 
                  onClick={() => {
                    handleFilterChange("paymentId", "");
                    setTimeout(applyFilters, 0);
                  }}
                />
              </span>
            )}
            {filters.orderId && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                Order ID: {filters.orderId}
                <X 
                  size={14} 
                  className="cursor-pointer hover:text-red-900" 
                  onClick={() => {
                    handleFilterChange("orderId", "");
                    setTimeout(applyFilters, 0);
                  }}
                />
              </span>
            )}
            {filters.batch && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                Batch: {filters.batch}
                <X 
                  size={14} 
                  className="cursor-pointer hover:text-red-900" 
                  onClick={() => {
                    handleFilterChange("batch", "");
                    setTimeout(applyFilters, 0);
                  }}
                />
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                Status: {filters.status}
                <X 
                  size={14} 
                  className="cursor-pointer hover:text-red-900" 
                  onClick={() => {
                    handleFilterChange("status", "");
                    setTimeout(applyFilters, 0);
                  }}
                />
              </span>
            )}
            {(filters.startDate || filters.endDate) && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
                Date Range: {filters.startDate || "Start"} - {filters.endDate || "End"}
                <X 
                  size={14} 
                  className="cursor-pointer hover:text-red-900" 
                  onClick={() => {
                    handleFilterChange("startDate", "");
                    handleFilterChange("endDate", "");
                    setTimeout(applyFilters, 0);
                  }}
                />
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium underline"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-16 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-red-600"></div>
              <p className="mt-4 text-gray-600 font-medium">Loading payments...</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="p-16 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <p className="text-lg font-medium text-gray-900">No payments found</p>
              <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Student Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Enrollment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Fee Type
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Mode
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Paid At
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-red-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-bold text-gray-900">#{p.id}</span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        {p.student.first_name} {p.student.last_name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {p.student.user.email}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {p.student.enrollment_number}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {p.fee_type.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Default ₹{p.fee_type.default_amount.toLocaleString("en-IN")}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <span className="text-sm font-bold text-gray-900">
                        ₹{p.amount.toLocaleString("en-IN")}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="inline-flex px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full capitalize">
                        {p.mode}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          p.status === "Success"
                            ? "bg-green-100 text-green-800"
                            : p.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(p.paid_at).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {!loading && payments.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {(currentPage - 1) * perPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min(currentPage * perPage, totalRecords)}
                </span>{" "}
                of <span className="font-semibold text-gray-900">{totalRecords}</span> results
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={20} />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, idx) => {
                    const page = idx + 1;
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[40px] px-3 py-2 rounded-lg font-medium transition ${
                            currentPage === page
                              ? "bg-red-600 text-white shadow-sm"
                              : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-2 py-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Popup Modal */}
      {showFilterPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Advanced Filters</h2>
              <button
                onClick={() => setShowFilterPopup(false)}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Student Name
                  </label>
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Enrollment Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enrollment Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter enrollment number..."
                    value={filters.enrollment}
                    onChange={(e) => handleFilterChange("enrollment", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Payment ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter payment ID..."
                    value={filters.paymentId}
                    onChange={(e) => handleFilterChange("paymentId", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Order ID */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Order ID
                  </label>
                  <input
                    type="text"
                    placeholder="Enter order ID..."
                    value={filters.orderId}
                    onChange={(e) => handleFilterChange("orderId", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Batch */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Batch
                  </label>
                  <input
                    type="text"
                    placeholder="Enter batch..."
                    value={filters.batch}
                    onChange={(e) => handleFilterChange("batch", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange("status", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="">All Status</option>
                    <option value="Success">Success</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => handleFilterChange("startDate", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => handleFilterChange("endDate", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex gap-3 justify-end">
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Clear All
              </button>
              <button
                onClick={applyFilters}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow-sm"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}