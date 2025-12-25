"use client";

import { authFetch } from "@/app/lib/fetchWithAuth";
import { GlobalContext } from "@/components/GlobalContext";
import BackButton from "@/components/ui/Backbutton";
import { useContext, useEffect, useState } from "react";
import { Download, CreditCard, Calendar, ReceiptText, CheckCircle2, Clock, TrendingUp, ArrowUpRight, Filter, Search } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function StudentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const { state } = useContext(GlobalContext);
  const studentId = state.user_id;

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await authFetch(`payment-student-wise/${studentId}`);
        if (!res.ok) throw new Error("Failed to fetch payments");
        const json = await res.json();
        setPayments(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) fetchPayments();
  }, [studentId]);

  const generateInvoice = (p) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Modern header with gradient effect simulation
    doc.setFillColor(99, 102, 241); // Indigo-500
    doc.rect(0, 0, pageWidth, 50, 'F');
    
    // White text on colored background
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.text("PAYMENT RECEIPT", pageWidth / 2, 25, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Invoice #${p.razorpay_payment_id?.slice(-8) || p.id}`, pageWidth / 2, 35, { align: 'center' });
    
    // Reset text color
    doc.setTextColor(0, 0, 0);
    
    // Invoice details section
    doc.setFontSize(9);
    doc.setTextColor(107, 114, 128); // Gray-500
    doc.text(`Issue Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`, 14, 65);
    doc.text(`Payment Date: ${new Date(p.paid_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}`, 14, 72);
    
    // Status badge
    const statusX = pageWidth - 14;
    if (p.status === "Success") {
      doc.setFillColor(220, 252, 231); // Green-100
      doc.setDrawColor(134, 239, 172); // Green-300
    } else {
      doc.setFillColor(254, 243, 199); // Amber-100
      doc.setDrawColor(252, 211, 77); // Amber-300
    }
    doc.roundedRect(statusX - 35, 60, 35, 8, 2, 2, 'FD');
    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(p.status === "Success" ? 21 : 146, p.status === "Success" ? 128 : 64, p.status === "Success" ? 61 : 14);
    doc.text(p.status.toUpperCase(), statusX - 17.5, 65, { align: 'center' });
    
    // Amount highlight box
    doc.setFillColor(238, 242, 255); // Indigo-50
    doc.setDrawColor(199, 210, 254); // Indigo-200
    doc.roundedRect(14, 85, pageWidth - 28, 30, 3, 3, 'FD');
    
    doc.setTextColor(79, 70, 229); // Indigo-600
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text("Amount Paid", pageWidth / 2, 95, { align: 'center' });
    
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text(`₹${p.amount}`, pageWidth / 2, 108, { align: 'center' });
    
    // Transaction details table
    doc.setTextColor(0, 0, 0);
    autoTable(doc, {
      startY: 125,
      head: [["Transaction Details", ""]],
      body: [
        ["Fee Type", p.fee_type?.name || "General Fee"],
        ["Payment Method", p.mode?.toUpperCase()],
        ["Order ID", p.razorpay_order_id || "N/A"],
        ["Payment ID", p.razorpay_payment_id || "N/A"],
        ["Transaction Time", new Date(p.paid_at).toLocaleString('en-IN')],
      ],
      theme: 'plain',
      headStyles: { 
        fillColor: [249, 250, 251],
        textColor: [17, 24, 39],
        fontStyle: 'bold',
        fontSize: 11,
        cellPadding: 6
      },
      bodyStyles: {
        textColor: [55, 65, 81],
        fontSize: 9,
        cellPadding: 5
      },
      columnStyles: {
        0: { cellWidth: 60, fontStyle: 'bold', textColor: [107, 114, 128] },
        1: { cellWidth: 'auto' }
      },
      alternateRowStyles: {
        fillColor: [249, 250, 251]
      }
    });
    
    // Footer
    const finalY = doc.lastAutoTable.finalY + 20;
    doc.setFontSize(8);
    doc.setTextColor(156, 163, 175); // Gray-400
    doc.text("This is a computer-generated receipt and does not require a signature.", pageWidth / 2, finalY, { align: 'center' });
    doc.text("For queries, please contact the accounts department.", pageWidth / 2, finalY + 5, { align: 'center' });
    
    // Border
    doc.setDrawColor(229, 231, 235); // Gray-200
    doc.setLineWidth(0.5);
    doc.rect(10, 55, pageWidth - 20, doc.internal.pageSize.getHeight() - 65, 'S');

    doc.save(`Receipt_${p.razorpay_payment_id?.slice(-8) || p.id}.pdf`);
  };

  const totalAmount = payments
    .filter(p => p.status === "Success")
    .reduce((sum, p) => sum + parseFloat(p.amount), 0);

  const filteredPayments = payments
    .filter(p => filterStatus === "all" || p.status.toLowerCase() === filterStatus)
    .filter(p => 
      p.fee_type?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.razorpay_payment_id?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.paid_at).getTime() - new Date(a.paid_at).getTime());

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200"></div>
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-red-600 absolute top-0 left-0"></div>
      </div>
      <p className="text-gray-600 font-medium">Loading your transactions...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-red-50/30">
      <div className="max-w-8xl mx-auto p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <BackButton />
          <div className="mt-6 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">
                Payment History
              </h1>
              <p className="text-gray-600 text-lg">Track and manage all your fee transactions</p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <CheckCircle2 className="text-green-600" size={24} />
                  <TrendingUp className="text-green-600" size={16} />
                </div>
                <p className="text-sm text-gray-600 font-medium">Success</p>
                <p className="text-2xl font-bold text-gray-900">
                  {payments.filter(p => p.status === "Success").length}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="text-white" size={24} />
                  <ArrowUpRight className="text-white/80" size={16} />
                </div>
                <p className="text-sm text-red-100 font-medium">Total Paid</p>
                <p className="text-2xl font-bold text-white">
                  ₹{totalAmount.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {error ? (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-lg shadow-sm">
            <p className="font-semibold">Error loading payments</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : (
          <>
            {/* Filters Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by fee type or payment ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="text-gray-400" size={20} />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="success">Success</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Transaction Details
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredPayments.map((p, idx) => (
                      <tr 
                        key={p.id} 
                        className="hover:bg-red-50/50 transition-all duration-200 group"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                              <ReceiptText className="text-white" size={22} />
                            </div>
                            <div>
                              <div className="text-sm font-bold text-gray-900 mb-0.5">
                                {p.fee_type?.name || "School Fees"}
                              </div>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <CreditCard size={12} />
                                <span className="capitalize">{p.mode}</span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-base font-bold text-gray-900">₹{p.amount}</div>
                          <div className="text-xs text-gray-500">INR</div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border-2 ${
                            p.status === "Success" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}>
                            {p.status === "Success" ? (
                              <CheckCircle2 size={14} className="animate-pulse" />
                            ) : (
                              <Clock size={14} />
                            )}
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-sm text-gray-900 font-medium mb-1">
                            <Calendar size={14} className="text-gray-400" />
                            {new Date(p.paid_at).toLocaleDateString("en-IN", { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </div>
                          <div className="font-mono text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded inline-block">
                            {p.razorpay_payment_id?.slice(-12) || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button
                            onClick={() => generateInvoice(p)}
                            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all"
                          >
                            <Download size={16} />
                            Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredPayments.length === 0 && (
                <div className="p-16 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <ReceiptText className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
                  <p className="text-gray-500">
                    {searchTerm || filterStatus !== "all" 
                      ? "Try adjusting your filters" 
                      : "Your payment history will appear here"}
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}