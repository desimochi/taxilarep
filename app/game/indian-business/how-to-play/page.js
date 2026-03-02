import React from "react";

export default function IndianBusinessStrategyChallenge() {
  return (
    <main className="max-w-6xl mx-auto p-8 bg-gradient-to-br from-amber-900 via-yellow-900 to-black text-gray-100 rounded-2xl shadow-xl mt-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-3 drop-shadow-lg">
          Indian Business Strategy Challenge (IBSC)
        </h1>
        <p className="text-gray-300 italic">
          Players Manual — Created at <span className="font-semibold">Taxila Business School, Jaipur</span>
        </p>
      </header>

      <section className="space-y-12">
        {/* Introduction */}
        <div className="bg-amber-950/60 border border-amber-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-3">1. Introduction: Welcome, CEO!</h2>
          <p>
            You are the CEO of a new FMCG company specializing in snacks. Compete against AI rivals — TasteMasters, Bharat Bites, and QuickCrunch — and lead your company to dominance between 2025 and 2035.
          </p>
          <p className="mt-2 font-semibold text-yellow-200">Success requires strategy, finance, and market awareness.</p>
        </div>

        {/* Getting Started */}
        <div className="bg-amber-950/60 border border-amber-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-3">2. Getting Started</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Enter your <strong>Name</strong> as CEO.</li>
            <li>Choose your <strong>Company Name</strong>.</li>
            <li>Click <span className="px-2 py-1 bg-yellow-400 text-black rounded-md font-medium">Begin The Challenge</span> to start.</li>
          </ol>
          <p className="mt-2 text-gray-300">Your progress is saved yearly. Use “Restart Game” to begin anew anytime.</p>
        </div>

        {/* Game Interface */}
        <div className="bg-amber-950/60 border border-amber-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-3">3. The Game Interface</h2>
          <p className="mb-4">The screen is split into two parts:</p>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Sidebar:</strong> Navigation hub — Dashboard, Decisions, Reports, Market Research, Next Year, Restart Game.</li>
            <li><strong>Main Content Area:</strong> Displays detailed info for each section.</li>
          </ul>
        </div>

        {/* Decisions */}
        <div className="bg-amber-950/60 border border-amber-800 rounded-xl p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-3">4. Understanding Your Decisions</h2>
          <div>
            <h3 className="text-xl font-semibold text-yellow-200">🏭 Production & Operations</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Target Production Volume based on Plant & Worker capacity.</li>
              <li>Product Quality Investment (1–10).</li>
              <li>Expand Plant Capacity for long-term growth.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-yellow-200">👥 Human Resources</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Hire/Fire employees across Production, Sales, Logistics, Admin.</li>
              <li>Training boosts morale and efficiency.</li>
              <li>Compensation affects morale and turnover.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-yellow-200">📈 Marketing, Sales & Distribution</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Set regional prices per pack.</li>
              <li>Advertise to boost demand.</li>
              <li>Distribute across Kiranas, Malls, E-commerce.</li>
              <li>Hire a Brand Ambassador for image boost.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-yellow-200">🚚 Supply Chain & Logistics</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Choose warehousing to reduce costs.</li>
              <li>Invest in supplier relations.</li>
              <li>Clear old inventory with sales.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-yellow-200">💰 Finance & Treasury</h3>
            <ul className="list-disc list-inside ml-4">
              <li>Issue or repay loans to manage expansion and costs.</li>
            </ul>
          </div>
        </div>

        {/* Analyzing Performance */}
        <div className="bg-amber-950/60 border border-amber-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-3">5. Analyzing Performance</h2>
          <p className="mb-2">Use the Reports & Market Research tabs:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Income Statement:</strong> Track profitability.</li>
            <li><strong>Balance Sheet:</strong> Snapshot of assets and liabilities.</li>
            <li><strong>Cash Flow:</strong> Monitor liquidity.</li>
            <li><strong>Competitor Insights:</strong> Market share, pricing, ads, brand image.</li>
          </ul>
        </div>

        {/* Winning */}
        <div className="bg-amber-950/60 border border-amber-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-yellow-300 mb-3">6. Winning the Game</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Win:</strong> Successfully manage till 2035.</li>
            <li><strong>Lose:</strong> Bankruptcy (Cash Balance  0 or Equity negative).</li>
          </ul>
          <p className="mt-2 font-semibold text-yellow-200">Good luck, CEO!</p>
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>Rendered as an attractive Next.js game manual page. 🚀</p>
      </footer>
    </main>
  );
}