"use client";
import React, { useEffect, useState } from "react";
import { ArrowUpCircle, ArrowDownCircle, Clock } from "lucide-react";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function StudentCurrencyTransaction({ studentId }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await authFetch(`student-currency-transaction/${studentId}`);
      const data = await res.json();

      if (data.code === 200) {
        setTransactions(data.data);
      }
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [studentId]);

  return (
    <div className="bg-white p-5 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Currency Transactions</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : transactions.length === 0 ? (
        <p className="text-gray-500">No transactions found.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((t) => {
            const isCredit = t.description.toLowerCase().includes("received");

            return (
              <div
                key={t.id}
                className="border p-4 rounded-lg flex justify-between items-start hover:bg-gray-50"
              >
                <div>
                  <p className="font-semibold text-gray-800">
                    {isCredit ? (
                      <span className="text-green-600 flex items-center gap-2">
                        <ArrowUpCircle className="w-5 h-5" />
                        +{t.transaction_currency}
                      </span>
                    ) : (
                      <span className="text-red-600 flex items-center gap-2">
                        <ArrowDownCircle className="w-5 h-5" />
                        -{t.transaction_currency}
                      </span>
                    )}
                  </p>

                  <p className="text-gray-700 mt-1">{t.description}</p>

                  <p className="text-xs text-gray-500 flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4" />
                    {new Date(t.created_at).toLocaleString()}
                  </p>
                </div>

                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  ID: {t.id}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
