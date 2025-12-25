"use client";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authFetch } from "@/app/lib/fetchWithAuth";
import { useContext } from "react";
import { GlobalContext } from "@/components/GlobalContext";
import { 
  Tag, 
  Copy, 
  CheckCircle, 
  Clock, 
  XCircle,
  Percent,
  DollarSign,
  Calendar,
  TrendingUp,
  Gift,
  Sparkles,
  Filter,
  X
} from "lucide-react";

export default function StudentCouponList() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedCode, setCopiedCode] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const { state } = useContext(GlobalContext);
  const studentId = state.user_id;

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await authFetch(`coupon-student-wise/${studentId}`);
      const json = await res.json();

      if (json.code !== 200) throw new Error();
      setCoupons(json.data || []);
    } catch {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success("Coupon code copied!");
      setTimeout(() => setCopiedCode(null), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const stats = {
    total: coupons.length,
    active: coupons.filter(c => c.is_active && !c.is_used).length,
    used: coupons.filter(c => c.is_used).length,
  };

  const filteredCoupons = coupons.filter(coupon => {
    if (filterStatus === "all") return true;
    if (filterStatus === "used") return coupon.is_used;
    if (filterStatus === "unused") return !coupon.is_used;
    if (filterStatus === "active") return coupon.is_active && !coupon.is_used;
    return true;
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-red-600 absolute top-0 left-0"></div>
        </div>
        <p className="text-gray-600 font-medium">Loading your coupons...</p>
      </div>
    );
  }

  if (!coupons.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/30 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-100 mb-6">
              <Gift className="text-red-600" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Coupons Yet</h3>
            <p className="text-gray-600 text-lg">
              You don't have any discount coupons assigned at the moment.
            </p>
            <p className="text-gray-500 mt-2">
              Check back later for exclusive offers!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50/30 p-4 md:p-8">
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
              <Sparkles className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Your Coupons
              </h1>
              <p className="text-gray-600 mt-1">Save more with exclusive discount codes</p>
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

            <div className="bg-gradient-to-br from-red-500 to-red-600 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-100 font-medium mb-1">Active Coupons</p>
                  <p className="text-3xl font-bold text-white">{stats.active}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <CheckCircle className="text-white" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-5 rounded-2xl shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-100 font-medium mb-1">Used Coupons</p>
                  <p className="text-3xl font-bold text-white">{stats.used}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-xl">
                  <TrendingUp className="text-white" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400" size={20} />
              <span className="text-sm font-semibold text-gray-700">Filter by Status:</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  filterStatus === "all"
                    ? "bg-gradient-to-r from-red-600 to-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Coupons ({coupons.length})
              </button>
              
              <button
                onClick={() => setFilterStatus("active")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  filterStatus === "active"
                    ? "bg-gradient-to-r from-red-600 to-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Active ({stats.active})
              </button>
              
              <button
                onClick={() => setFilterStatus("unused")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  filterStatus === "unused"
                    ? "bg-gradient-to-r from-red-600 to-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Unused ({coupons.filter(c => !c.is_used).length})
              </button>
              
              <button
                onClick={() => setFilterStatus("used")}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                  filterStatus === "used"
                    ? "bg-gradient-to-r from-red-600 to-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Used ({stats.used})
              </button>
            </div>
          </div>
          
          {filterStatus !== "all" && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                  Filter: {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                  <X 
                    size={14} 
                    className="cursor-pointer hover:text-red-900" 
                    onClick={() => setFilterStatus("all")}
                  />
                </span>
                <span className="text-sm text-gray-600">
                  Showing {filteredCoupons.length} of {coupons.length} coupons
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Coupon Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCoupons.map((coupon, idx) => (
            <div
              key={coupon.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {/* Card Header with Gradient */}
              <div className={`p-6 ${
                coupon.is_used 
                  ? "bg-gradient-to-r from-gray-400 to-gray-500"
                  : coupon.is_active
                  ? "bg-gradient-to-r from-red-500 to-red-600"
                  : "bg-gradient-to-r from-gray-400 to-gray-500"
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">
                      {coupon.discount_type === "percent" ? (
                        <Percent className="text-white" size={24} />
                      ) : (
                        <DollarSign className="text-white" size={24} />
                      )}
                    </div>
                    <div>
                      <p className="text-white/90 text-sm font-medium">
                        {coupon.discount_type === "percent" ? "Percentage Discount" : "Flat Discount"}
                      </p>
                      <p className="text-white text-2xl font-bold">
                        {coupon.discount_type === "percent"
                          ? `${coupon.discount_value}% OFF`
                          : `₹${coupon.discount_value} OFF`}
                      </p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {coupon.is_used ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-semibold border border-white/30">
                        <XCircle size={14} />
                        Used
                      </span>
                    ) : coupon.is_active ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-semibold border border-white/30">
                        <CheckCircle size={14} />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-semibold border border-white/30">
                        <Clock size={14} />
                        Inactive
                      </span>
                    )}
                  </div>
                </div>

                {/* Coupon Code with Copy Button */}
                <div className="relative">
                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-xl p-4">
                    <Tag className="text-white/80" size={20} />
                    <span className="flex-1 font-mono text-xl font-bold text-white tracking-wider">
                      {coupon.code}
                    </span>
                    <button
                      onClick={() => copyCode(coupon.code)}
                      className="p-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all group/btn"
                      title="Copy coupon code"
                    >
                      {copiedCode === coupon.code ? (
                        <CheckCircle className="text-white" size={18} />
                      ) : (
                        <Copy className="text-white group-hover/btn:scale-110 transition-transform" size={18} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                {/* Validity Period */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Valid From</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="text-red-600" size={16} />
                      <span className="font-semibold text-gray-900">
                        {new Date(coupon.valid_from).toLocaleDateString("en-IN", {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(coupon.valid_from).toLocaleTimeString("en-IN", {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Valid Until</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="text-red-600" size={16} />
                      <span className="font-semibold text-gray-900">
                        {new Date(coupon.valid_to).toLocaleDateString("en-IN", {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(coupon.valid_to).toLocaleTimeString("en-IN", {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                {/* Usage Info */}
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Usage Count</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-900 rounded-lg font-bold text-sm">
                      {coupon.used_count} {coupon.used_count === 1 ? 'time' : 'times'}
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                {coupon.is_active && !coupon.is_used && (
                  <button
                    onClick={() => copyCode(coupon.code)}
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-red-600 hover:from-red-700 hover:to-red-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <Copy size={18} />
                    {copiedCode === coupon.code ? "Copied!" : "Copy Code"}
                  </button>
                )}
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden opacity-10">
                <div className="absolute transform rotate-45 bg-white w-10 h-32 -right-5 -top-10"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for Filtered Results */}
        {filteredCoupons.length === 0 && coupons.length > 0 && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 mb-6">
              <Filter className="text-gray-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Coupons Found</h3>
            <p className="text-gray-600 text-lg mb-4">
              No coupons match the selected filter.
            </p>
            <button
              onClick={() => setFilterStatus("all")}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-600 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-700 shadow-md hover:shadow-lg transition-all"
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
}