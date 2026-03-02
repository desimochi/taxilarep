// app/refund-policy/page.js

export const metadata = {
  title: 'Refund & Cancellation Policy | Taxila Business School',
  description: 'Policy regarding non-refundable student fees including admission, exam, hostel, and utility charges.',
};

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
        
        {/* Header Section */}
        <header className="bg-slate-900 px-8 py-10 text-white border-b-4 border-yellow-500">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Refund & Cancellation Policy
          </h1>
          <p className="mt-4 text-slate-300 text-sm font-medium">
            Effective for all Student Fee Submissions & Charges
          </p>
        </header>

        {/* Content Body */}
        <div className="px-8 py-10 space-y-10 text-gray-700 leading-relaxed">
          
          {/* 1. The Core Policy (Strict No Refund) */}
          <section className="bg-red-50 border-l-4 border-red-600 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-red-800 mb-2 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              No Cancellation & No Refund Policy
            </h2>
            <p className="text-red-900 font-medium">
              Taxila Business School maintains a strict <strong>No Cancellation and No Refund</strong> policy. Once a fee is submitted, it cannot be cancelled, refunded, or transferred under any circumstances.
            </p>
          </section>

          {/* 2. Scope of Policy (Fee Types) */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Applicable Fee Categories
            </h2>
            <p className="mb-4 text-gray-600">
              This policy applies to all financial transactions made by students or guardians to the institute, including but not limited to:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Admission Fees",
                "Exam Fees (Regular)",
                "Re-sit / Backlog Exam Fees",
                "Hostel & Accommodation Charges",
                "Electricity & Utility Bills",
                "Book & Study Material Charges",
                "Late Payment Penalties",
                "Other Miscellaneous Charges"
              ].map((item, index) => (
                <div key={index} className="flex items-center bg-gray-50 px-4 py-3 rounded border border-gray-200">
                  <svg className="w-5 h-5 text-slate-900 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* 3. Logic Explanation (Dynamic Fees) */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Why No Refunds?
            </h2>
            <div className="prose text-gray-600">
              <p className="mb-4">
                Our student portal utilizes a <strong>Dynamic Fee Generation System</strong>. Fees for exams, penalties, electricity, and other charges are calculated precisely based on the student's actual usage, academic records, and applicable fines.
              </p>
              <p>
                Since the system generates the <strong>exact payable amount</strong>, there is no possibility of overpayment by the student. As no excess amount can be paid, the question of a refund does not arise. Students are advised to verify their payable amount before finalizing the transaction.
              </p>
            </div>
          </section>

          <hr className="border-gray-200" />

          {/* 4. Transaction Terms */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Transaction Terms
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>
                <strong>Finality of Payment:</strong> By clicking the "Pay" button, you agree that the transaction is final.
              </li>
              <li>
                <strong>Processing Errors:</strong> In the rare event of a technical glitch resulting in a double payment for the exact same invoice ID, students must contact the accounts department with proof of transaction within 3 working days.
              </li>
              <li>
                <strong>Academic Penalties:</strong> Penalties levied for late submissions or disciplinary actions are absolute and non-negotiable.
              </li>
            </ul>
          </section>

          {/* Footer Contact */}
          <div className="bg-slate-50 p-6 rounded-lg mt-8 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900">Have questions about your invoice?</h3>
              <p className="text-sm text-gray-500">Contact the Accounts Department before paying.</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <a 
                href="mailto:accounts@taxila.in" 
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800"
              >
                Contact Accounts
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}