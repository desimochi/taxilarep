import { authFetch } from "@/app/lib/fetchWithAuth";

export function handlePayment(enrollment, amount, fee_type, custom_fee, extra_interest_amount, coupon_id) {
    console.log(custom_fee)
  return new Promise(async (resolve, reject) => {
    try {
      // 1️⃣ Create order
      const res = await authFetch("create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollment, amount, fee_type, custom_fee }),
      });

      const data = await res.json();

      if (!res.ok) {
        reject({ payment: "failed", reason: "Order creation failed" });
        return;
      }

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_RqHzPxuaD8vitF",
        name: "Taxila Business School",
        description: "Payment",
        order_id: data.razorpay_order_id,

        handler: async function (response) {
          try {
            // 3️⃣ Verify payment
            const verifyRes = await authFetch("payment-success", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                custom_fee: custom_fee,
                extra_interest_amount: extra_interest_amount,
                coupon_id: coupon_id,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              reject({ payment: "failed", reason: verifyData.error });
              return;
            }

            // ✅ SUCCESS
            resolve({ payment: "successful", data: verifyData });
          } catch (err) {
            reject({ payment: "failed", reason: err.message });
          }
        },

        modal: {
          ondismiss: function () {
            reject({ payment: "failed", reason: "Payment cancelled" });
          },
        },

        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      reject({ payment: "failed", reason: err.message });
    }
  });
}
