export default function InstructionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-10">

        <h1 className="text-4xl font-bold mb-6 text-center">
          START-UP CAP-1 Simulation Instructions
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          Official Player Guide for the Cap Table Simulation
        </p>

        {/* INTRODUCTION */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            1. Introduction
          </h2>

          <p className="text-gray-700 leading-relaxed">
            START-UP CAP-1 is a financial simulation designed for PGDM
            students to understand startup fundraising and equity
            dilution. In this simulation you will act as a startup
            founder raising capital across multiple funding rounds and
            eventually calculating exit payouts.
          </p>
        </section>

        {/* FUNDING ROUNDS */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            2. Funding Rounds in the Simulation
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Day 0 – Founders own 100% of the company.</li>
            <li>Round 1 – Angel investment round.</li>
            <li>Round 2 – Venture Capital round with ESOP creation.</li>
            <li>Round 3 – Series B growth funding.</li>
            <li>Exit – Acquisition payout distribution.</li>
          </ul>
        </section>

        {/* CORE CONCEPTS */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            3. Core Concepts
          </h2>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Pre-Money Valuation:</strong> Value of the startup
              before investment.
            </p>

            <p>
              <strong>Post-Money Valuation:</strong> Value after investment.
            </p>

            <p>
              <strong>Formula:</strong> Post Money = Pre Money + Investment
            </p>

            <p>
              <strong>Ownership %:</strong> Investor Ownership =
              Investment / Post Money
            </p>

            <p>
              <strong>Dilution:</strong> When new shares are issued,
              existing shareholders own a smaller percentage.
            </p>
          </div>
        </section>

        {/* ESOP */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            4. ESOP Pool
          </h2>

          <p className="text-gray-700">
            Venture capital investors typically require an Employee Stock
            Ownership Plan (ESOP) to be created before investing. This
            means founders and early investors absorb the dilution before
            the VC receives their shares.
          </p>
        </section>

        {/* GAMEPLAY */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            5. Gameplay Mechanics
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Enter your name and startup name to begin.</li>
            <li>You will receive a randomized dataset.</li>
            <li>You have 30 minutes to complete the simulation.</li>
            <li>Correct answers turn green.</li>
            <li>Incorrect answers turn red.</li>
          </ul>
        </section>

        {/* SCORING */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            6. Scoring System
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Maximum score: 100</li>
            <li>First 20 minutes have no penalty.</li>
            <li>After 20 minutes, 1 mark is deducted per minute.</li>
            <li>Simulation auto-stops when time reaches 0.</li>
          </ul>
        </section>

        {/* CERTIFICATE */}

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">
            7. Certification
          </h2>

          <p className="text-gray-700">
            After completing the simulation, you can download an official
            certificate containing your name, score, and the signature of
            the Dean of Taxila Business School. You can also share your
            achievement on LinkedIn.
          </p>
        </section>

        {/* TIPS */}

        <section>
          <h2 className="text-2xl font-semibold mb-3">
            8. Tips for Success
          </h2>

          <ul className="list-disc ml-6 text-gray-700 space-y-2">
            <li>Keep a calculator or spreadsheet ready.</li>
            <li>Carry decimals carefully in calculations.</li>
            <li>Remember the ESOP is created before VC investment.</li>
            <li>Ensure final ownership percentages sum to 100%.</li>
            <li>Stay calm and work systematically.</li>
          </ul>
        </section>

      </div>
    </div>
  );
}