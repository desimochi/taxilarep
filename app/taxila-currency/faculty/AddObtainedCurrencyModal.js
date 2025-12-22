"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { authFetch } from "@/app/lib/fetchWithAuth";

export default function AddObtainedCurrencyModal({
  project,
  onClose,
  onSuccess,
}) {
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    if (!amount || Number(amount) <= 0) {
      toast.error("Enter valid currency amount");
      return;
    }

    const res = await authFetch(
      `taxila-currency-add-obtain-currency/${project.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          obtained_currency: Number(amount),
        }),
      }
    );

    if (res.ok) {
      toast.success("Currency added successfully");
      onSuccess();
      onClose();
    } else {
      toast.error("Failed to add currency");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-[400px] rounded p-6">

        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Give Currency – {project.student.first_name}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <input
          type="number"
          placeholder="Obtained Currency"
          className="border p-2 w-full rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-5">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
