import Script from "next/script";

export const metadata = {
  title: "Free MBA Preparation Resources 2025–26 | GDPI, ROI, Working Professionals",
  description:
    "Download free MBA preparation PDFs for 2025–26. GDPI interview questions, MBA fees vs salary ROI report, and MBA guide for working professionals.",
};

export default function MBALandingPage() {
  return (
    <>
      {/* ---------- SEO SCHEMA (FAQ + Product) ---------- */}
      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Are these MBA PDFs really free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. All three MBA preparation PDFs are 100% free and available after quick registration.",
                },
              },
              {
                "@type": "Question",
                "name": "Who should download these MBA resources?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "CAT/XAT/CMAT aspirants, working professionals, parents, and MBA interview candidates.",
                },
              },
              {
                "@type": "Question",
                "name": "Will my data be safe?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes. Your data is used only to share the PDFs and important MBA-related updates. No spam.",
                },
              },
            ],
          }),
        }}
      />

      <main className="bg-white text-gray-900">
        {/* ---------- HERO ---------- */}
        <section className="bg-gradient-to-br from-blue-50 to-white py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              🎓 Free MBA Preparation Resources 2025–26
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-700">
              Crack IIM Interviews • Make Smarter MBA Decisions • Advance Your Career
            </p>

            <p className="mt-6 max-w-3xl mx-auto text-gray-600">
              Preparing for an MBA is not just about CAT/XAT — it’s about making
              the <strong> right decisions at the right time</strong>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <button className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700">
                Download Free PDFs
              </button>
              <button className="px-6 py-3 rounded-xl border border-gray-300 font-semibold">
                View What’s Inside
              </button>
            </div>
          </div>
        </section>

        {/* ---------- WHAT YOU GET ---------- */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              🔥 What You’ll Get (100% Free)
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* PDF 1 */}
              <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-2">
                  📘 GDPI Preparation Kit
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  40 Most Asked MBA Interview Questions + Best Answers (IIM Focused)
                </p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✔ 40 real IIM interview questions</li>
                  <li>✔ Structured, high-impact answers</li>
                  <li>✔ HR, academics, ethics & stress questions</li>
                  <li>✔ Tips to stand out with average percentile</li>
                </ul>
                <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold">
                  Download GDPI Preparation Kit
                </button>
              </div>

              {/* PDF 2 */}
              <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-2">
                  📊 MBA Fees vs Salary Report
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  ROI-Based Comparison of Top B-Schools (2025–26)
                </p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✔ Fees vs salary data of IIMs & top colleges</li>
                  <li>✔ ROI & payback period analysis</li>
                  <li>✔ College selection by CAT percentile</li>
                </ul>
                <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold">
                  Get MBA Fees vs Salary Report
                </button>
              </div>

              {/* PDF 3 */}
              <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-2">
                  👔 MBA Guide for Working Professionals
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Career Switch, Executive MBA & Growth Strategy
                </p>
                <ul className="text-sm space-y-2 mb-6">
                  <li>✔ MBA vs Executive MBA clarity</li>
                  <li>✔ Career switch & gap justification</li>
                  <li>✔ CAT prep with job</li>
                  <li>✔ Salary growth expectations</li>
                </ul>
                <button className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold">
                  Download MBA Guide for Working Professionals
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- WHY DOWNLOAD ---------- */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              🚀 Why Download These PDFs?
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div>✅ Curated by MBA admission experts</div>
              <div>✅ Practical, no-fluff content</div>
              <div>✅ Avoid wrong college decisions</div>
              <div>✅ Trusted by thousands of aspirants</div>
              <div>✅ Saves months of confusion</div>
              <div>✅ Completely FREE</div>
            </div>
          </div>
        </section>

        {/* ---------- WHO SHOULD DOWNLOAD ---------- */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center">
              🎯 Who Should Download This?
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <li>✔ CAT / XAT / CMAT / SNAP aspirants</li>
              <li>✔ IIM & top B-school applicants</li>
              <li>✔ Working professionals planning MBA</li>
              <li>✔ Parents evaluating MBA ROI</li>
              <li>✔ Repeat GDPI candidates</li>
            </ul>
          </div>
        </section>

        {/* ---------- PRIVACY ---------- */}
        <section className="bg-blue-50 py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h3 className="text-xl font-bold mb-2">🔐 Your Data is Safe</h3>
            <p className="text-sm text-gray-700">
              We respect your privacy. No spam. No third-party selling.
              Used only for sharing PDFs & MBA-related updates.
            </p>
          </div>
        </section>

        {/* ---------- FINAL CTA ---------- */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">
            📢 Start Your MBA Journey the Right Way
          </h2>
          <p className="text-gray-600 mb-8">
            Stop relying on random videos. Make expert-backed decisions.
          </p>
          <button className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-lg">
            👉 Download Your Free MBA PDFs Now
          </button>
        </section>
      </main>
    </>
  );
}
