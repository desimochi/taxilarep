export const metadata = {
  title: "Financial Modeling Level 1 – Instruction Manual",
  description:
    "Learn leveraged buyouts, capital structuring, risk management, and value creation through an 8-year private equity simulation.",
};

export default function FinancialModelingLevelOne() {
  return (
    <main className="bg-gray-50 text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">

        {/* ================= HERO ================= */}
        <section className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Financial Modeling Level 1
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Step into the role of a <strong>Managing Partner at a Private Equity Fund</strong>.
            Execute a leveraged buyout, manage risk, navigate macro shocks, and maximize returns
            over an 8-year investment horizon.
          </p>
        </section>

        {/* ================= ROLE & OBJECTIVE ================= */}
        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold mb-4">🎯 Role & Objective</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Role: Managing Partner, Private Equity Fund</li>
            <li>Target Companies: 15 randomly selected firms (e.g., TechNova, BioGen)</li>
            <li>
              Objective: Execute a Leveraged Buyout (LBO), manage the company for 8 years,
              and maximize investor returns while managing downside risk.
            </li>
          </ul>
        </section>

        {/* ================= LEARNING OUTCOMES ================= */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">📚 Learning Outcomes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Capital Structuring",
                text: "Optimize the mix of Equity, Senior Debt, and Mezzanine Debt to balance risk and return.",
              },
              {
                title: "Risk Management",
                text: "Monitor leverage and interest coverage covenants to avoid bankruptcy.",
              },
              {
                title: "Strategic Operations",
                text: "Balance cost cutting versus growth while managing employee morale.",
              },
              {
                title: "Value Creation",
                text: "Drive Internal Rate of Return (IRR) and Multiple on Invested Capital (MOIC).",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= PHASE 1 ================= */}
        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold mb-4">Phase 1: Deal Structuring (Pre-Close)</h2>
          <p className="mb-6">
            Your first task is to acquire the company. The purchase price equals
            <strong> Entry Multiple × EBITDA</strong>.
          </p>

          <h3 className="font-semibold text-lg mb-3">Capital Stack</h3>
          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 text-left">Capital Source</th>
                  <th className="border p-2 text-left">Cost</th>
                  <th className="border p-2 text-left">Key Characteristics</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Senior Debt</td>
                  <td className="border p-2">SOFR + 3.5%</td>
                  <td className="border p-2">
                    Cheapest capital, strict covenants, first priority repayment via cash sweep.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Mezzanine Debt</td>
                  <td className="border p-2">12% PIK</td>
                  <td className="border p-2">
                    Expensive but flexible. Interest compounds and reduces equity value at exit.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2">Sponsor Equity</td>
                  <td className="border p-2">N/A</td>
                  <td className="border p-2">
                    Your capital at risk. Less equity boosts IRR but increases leverage risk.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Key Decisions</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Entry Multiple: Higher price lowers returns.</li>
              <li>
                Loan-to-Value (LTV): Above 60% boosts IRR but risks a financial death spiral.
              </li>
            </ul>
          </div>
        </section>

        {/* ================= PHASE 2 ================= */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Phase 2: Holding Period (8 Years)
          </h2>

          <div className="bg-white rounded-2xl shadow p-8 mb-6">
            <h3 className="font-semibold text-lg mb-4">Strategy Slider</h3>
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2">Strategy</th>
                  <th className="border p-2">Financial Impact</th>
                  <th className="border p-2">Morale Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Aggressive Cost Cut</td>
                  <td className="border p-2">High margin expansion</td>
                  <td className="border p-2">-15% morale per year</td>
                </tr>
                <tr>
                  <td className="border p-2">Balanced</td>
                  <td className="border p-2">Stable margins</td>
                  <td className="border p-2">-2% morale per year</td>
                </tr>
                <tr>
                  <td className="border p-2">Aggressive Growth</td>
                  <td className="border p-2">Margin compression</td>
                  <td className="border p-2">+5% morale per year</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">⚠ Hidden Risks</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>
                <strong>Brain Drain:</strong> Morale below 50% causes permanent revenue drag.
              </li>
              <li>
                <strong>Death Spiral:</strong> Covenant breach raises interest spreads by +2%.
              </li>
              <li>
                <strong>Working Capital Drag:</strong> 12% of growth is locked in NWC.
              </li>
              <li>
                <strong>Macro Shocks:</strong> SOFR hikes increase interest expense.
              </li>
            </ul>
          </div>
        </section>

        {/* ================= PHASE 3 ================= */}
        <section className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold mb-4">Phase 3: Exit</h2>
          <p>
            After Year 8, the company is sold at:
          </p>
          <p className="font-semibold mt-2">
            Exit Value = Year 8 EBITDA × Exit Multiple
          </p>
          <p className="mt-4 text-sm text-gray-600">
            If cumulative revenue growth is less than 40%, the exit multiple is reduced by 2.0x.
          </p>
        </section>

        {/* ================= SCORING ================= */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">🏆 Scoring & Rankings</h2>
          <div className="bg-white rounded-2xl shadow p-8">
            <ul className="list-disc pl-6 space-y-1">
              <li>IRR (40 pts): Max score above 25%</li>
              <li>MOIC (30 pts): Max score above 3.0x</li>
              <li>Risk (20 pts): -10 per covenant breach</li>
              <li>Operations (10 pts): Growth above 40%</li>
            </ul>

            <div className="mt-6 text-sm text-gray-600">
              Final ranks range from <strong>Managing Partner (90+)</strong> to
              <strong> Analyst (Fired)</strong>.
            </div>
          </div>
        </section>

        {/* ================= GLOSSARY ================= */}
        <section className="bg-gray-100 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-4">📖 Glossary</h2>
          <ul className="text-sm space-y-1">
            <li><strong>EBITDA:</strong> Earnings before interest, taxes, depreciation & amortization</li>
            <li><strong>Cash Sweep:</strong> Mandatory senior debt repayment from free cash flow</li>
            <li><strong>Covenants:</strong> Financial rules enforced by lenders</li>
            <li><strong>Net Leverage:</strong> Net Debt ÷ EBITDA (Max 5.0x)</li>
            <li><strong>Interest Coverage:</strong> EBITDA ÷ Cash Interest (Min 2.0x)</li>
            <li><strong>SOFR:</strong> Base rate for floating-rate debt</li>
          </ul>
        </section>

      </div>
    </main>
  );
}
