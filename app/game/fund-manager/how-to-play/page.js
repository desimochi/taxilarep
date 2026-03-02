'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Zap, Bomb, Sprout, Target, DollarSign, AlertTriangle, Users, BarChart3, Trophy, BookOpen } from 'lucide-react';

const InstructionsComponent = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const Section = ({ id, title, icon: Icon, children }) => {
    const isExpanded = expandedSection === id;
    
    return (
      <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden bg-white shadow-sm">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <Icon className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {isExpanded && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            {children}
          </div>
        )}
      </div>
    );
  };

  const MetricCard = ({ title, description, color }) => (
    <div className={`p-4 rounded-lg border-l-4 ${color} bg-white`}>
      <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );

  const RegimeCard = ({ icon, name, characteristics, strategy, color }) => (
    <div className={`p-4 rounded-lg border-2 ${color} bg-white`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <h4 className="font-bold text-gray-800">{name}</h4>
      </div>
      <p className="text-sm text-gray-700 mb-2">{characteristics}</p>
      <p className="text-sm font-semibold text-gray-800">
        Strategy: <span className="font-normal">{strategy}</span>
      </p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-8 mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Taxila Fund Manager</h1>
        <p className="text-xl mb-2">Official Player's Manual</p>
        <div className="flex items-center gap-6 text-sm mt-4">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span>Duration: 10 Years (3650 Days)</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            <span>Build a legendary track record</span>
          </div>
        </div>
      </div>

      {/* Objective */}
      <div className="bg-white rounded-lg p-6 mb-6 shadow-md border-l-4 border-blue-600">
        <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          Core Objective
        </h2>
        <p className="text-gray-700 leading-relaxed">
          You are a Fund Manager at <strong>Taxila Business School</strong>. Your goal is not just to make money, 
          but to build a sustainable career over a 10-year period. Manage capital efficiently, generate alpha, 
          and adhere to strict compliance and liquidity mandates.
        </p>
      </div>

      {/* Key Metrics Section */}
      <Section id="metrics" title="Key Metrics to Watch" icon={BarChart3}>
        <div className="space-y-3">
          <MetricCard
            title="AUM (Assets Under Management)"
            description="The total size of your fund (Cash + Stock Value). Larger AUM means higher daily commissions."
            color="border-green-500"
          />
          <MetricCard
            title="NAV (Net Asset Value)"
            description="The price of a single unit of your fund. Starts at ₹10.00. Investors track this to judge your performance."
            color="border-blue-500"
          />
          <MetricCard
            title="Score (Reputation)"
            description="Dynamic rating (0-100) based on performance vs Benchmark. >80: Legendary. <30: Toxic. <10: GAME OVER."
            color="border-purple-500"
          />
          <MetricCard
            title="Career Capital"
            description="Cumulative amount of money raised and managed across all fund cycles."
            color="border-orange-500"
          />
          <MetricCard
            title="Commission (My Fees)"
            description="Your personal earnings. You earn 0.005% of AUM daily. Larger fund = more earnings."
            color="border-yellow-500"
          />
        </div>
      </Section>

      {/* Gameplay Mechanics */}
      <Section id="gameplay" title="Gameplay Mechanics" icon={Users}>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              The Fund Cycle
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6">
              <li>Choose a mandate (Large Cap, Mid Cap, Multi Cap, or Debt)</li>
              <li>Investors subscribe based on your Score (high score = more capital)</li>
              <li>Trade stocks, manage cash, and handle investors daily</li>
              <li>Voluntarily close the fund to book reputation and earnings</li>
              <li>Start new fund cycles with accumulated Score and Career Capital</li>
              <li>Automatic closure after 10 years (retirement)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Trading & Portfolio
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700 ml-6">
              <li>Click the T button on any stock to open trade window</li>
              <li>Buying stocks reduces Cash; Selling increases it</li>
              <li>Use Market Radar in "Live Chart" tab to predict regimes 60 days ahead</li>
            </ul>
          </div>

          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Investor Management (Critical)
            </h4>
            <div className="space-y-2 text-gray-700">
              <p><strong>Applications:</strong> Accept or reject new investors to increase Cash and AUM.</p>
              <p><strong>Redemptions:</strong> You have <strong className="text-red-600">3 Days</strong> to fulfill requests.</p>
              <p className="text-red-600 font-semibold">
                ⚠️ Failure Penalty: -5 Score, -₹50k Fees (Liquidity Crisis)
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <h4 className="font-semibold text-amber-800 mb-2">Compliance</h4>
            <p className="text-gray-700 mb-2">
              Adhere to your fund's mandate (e.g., Large Cap fund must hold more then 80% Large Cap stocks).
            </p>
            <p className="text-gray-700">
              <strong>Grace Period:</strong> 7 days to fix violations<br />
              <strong className="text-amber-700">Penalty:</strong> -5 Score, -₹1L Fees (Regulatory Penalty)
            </p>
          </div>
        </div>
      </Section>

      {/* Market Regimes */}
      <Section id="regimes" title="Market Regimes (The Radar)" icon={Zap}>
        <p className="text-gray-700 mb-4">
          The simulation includes a sophisticated market cycle engine that predicts regimes 60 days in advance.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <RegimeCard
            icon="📈"
            name="Normal"
            characteristics="Steady, low volatility growth"
            strategy="Balanced Portfolio"
            color="border-gray-300"
          />
          <RegimeCard
            icon="🚀"
            name="Bull Run"
            characteristics="Rapid growth, high beta stocks soar"
            strategy="Overweight Mid/Small Caps"
            color="border-green-400"
          />
          <RegimeCard
            icon="📉"
            name="Bear Market"
            characteristics="Negative drift, prices fall slowly"
            strategy="Shift to Large Caps or Cash"
            color="border-red-400"
          />
          <RegimeCard
            icon="⚡"
            name="Volatile"
            characteristics="Erratic price swings, high risk"
            strategy="Reduce position sizing"
            color="border-yellow-400"
          />
          <RegimeCard
            icon="💥"
            name="Crash"
            characteristics="Severe drops (-3% drift)"
            strategy="Flight to Safety: Buy Bonds/Debt or hold Cash"
            color="border-red-600"
          />
          <RegimeCard
            icon="🌱"
            name="Recovery"
            characteristics="Fast rebound after a crash"
            strategy="Aggressive buying"
            color="border-emerald-400"
          />
        </div>
      </Section>

      {/* Key Learnings */}
      <Section id="learnings" title="Key Learnings" icon={BookOpen}>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">1. Liquidity Risk is Real</h4>
            <p className="text-gray-700">
              You might be profitable (high NAV), but if fully invested and a large redemption comes in, 
              you're forced to sell assets—potentially at a loss. Always maintain a cash buffer (5-10%) 
              to handle outflows without disrupting your long-term strategy.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-900 mb-2">2. The Cost of Compliance</h4>
            <p className="text-gray-700">
              It might be tempting to buy high-growth Small Cap stocks in a Large Cap fund to boost returns. 
              However, the penalty for violation often outweighs the "alpha" generated by breaking the rules. 
              Regulatory mandates are hard constraints, not guidelines.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-900 mb-2">3. Reputation is an Asset</h4>
            <p className="text-gray-700">
              Your Score acts as a "Reputation Asset." A high score allows you to raise massive capital 
              in Cycle 2 or 3 easily. In fund management, your track record is your product. 
              Protecting your reputation is more important than chasing the highest possible return in a single year.
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-900 mb-2">4. Market Regimes Dictate Strategy</h4>
            <p className="text-gray-700">
              A "Buy and Hold" strategy works in a Bull market but fails in a Crash regime. 
              Alpha is often generated by sector allocation and cash calls (sitting on cash during a crash) 
              rather than just stock selection.
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-semibold text-indigo-900 mb-2">5. Career Longevity</h4>
            <p className="text-gray-700">
              The game tracks your "Career Capital." Think in cycles rather than day-to-day trades. 
              Closing a fund successfully to lock in a high score is a strategic career move. 
              Fund management is a marathon, not a sprint. Survival is the first prerequisite for success.
            </p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg p-6 mt-8 text-center">
        <Trophy className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
        <h3 className="text-xl font-bold mb-2">Ready to Build Your Legacy?</h3>
        <p className="text-gray-300">
          Master these concepts and become a legendary fund manager at Taxila Business School
        </p>
      </div>
    </div>
  );
};

export default InstructionsComponent;