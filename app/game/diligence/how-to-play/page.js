'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, Clock, Target, Award } from 'lucide-react';

const InstructionsComponent = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const levels = [
    {
      id: 1,
      title: "FINANCE: Quality of Earnings",
      icon: "💰",
      tasks: [
        { name: "Normalized EBITDA", formula: "EBIT + Depreciation + One-Time Adjustments", tip: "Check MD&A Notes for hidden non-recurring charges in SG&A" },
        { name: "Free Cash Flow", formula: "Net Income + Depreciation - (Δ AR + Δ Inv - Δ AP) - CapEx", tip: "Increase in Assets = Cash Outflow (-), Increase in Liabilities = Cash Inflow (+)" },
        { name: "Net Working Capital", formula: "Current Assets - Current Liabilities", tip: "Use Year-End Snapshot data" }
      ],
      outcome: "Master financial statement reconstruction and understand reported vs. adjusted earnings"
    },
    {
      id: 2,
      title: "OPERATIONS: Project Crashing",
      icon: "⚙️",
      tasks: [
        { name: "Find lowest cost to crash project", steps: ["Identify Critical Path", "Crash only Critical Path tasks", "Select lowest Cost/Day", "Recalculate if path changes"] }
      ],
      outcome: "Apply Critical Path Method (CPM) and optimize operational efficiency under budget constraints"
    },
    {
      id: 3,
      title: "STRATEGY: Porter's Five Forces",
      icon: "🎯",
      tasks: [
        { name: "Categorize intel cards", categories: ["Supplier Power", "Buyer Power", "Competitive Rivalry", "Threat of Substitution", "Threat of New Entry"] }
      ],
      outcome: "Assess strategic environment and evaluate industry attractiveness"
    },
    {
      id: 4,
      title: "MARKETING: Market Viability",
      icon: "📊",
      tasks: [
        { name: "Calculate Customer Lifetime Value", formula: "(ARPU × Gross Margin %) / Churn Rate", tip: "Convert percentages to decimals (5% = 0.05)" }
      ],
      outcome: "Understand unit economics and assess long-term business viability"
    },
    {
      id: 5,
      title: "DATA ANALYTICS: Forensic Auditing",
      icon: "🔍",
      tasks: [
        { name: "Find fraudulent Transaction ID", rule: "Profit = Revenue × Margin %", tip: "Verify each row and enter the ID where math doesn't add up" }
      ],
      outcome: "Perform forensic data auditing and detect anomalies in large datasets"
    },
    {
      id: 6,
      title: "ETHICS: Crisis Negotiation",
      icon: "⚖️",
      tasks: [
        { name: "Navigate dialogue tree", strategy: ["DON'T accept bribes (Game Over)", "DON'T rely on threats (Game Over)", "DO appeal to self-preservation and regulatory leniency"] }
      ],
      outcome: "Navigate ethical dilemmas and understand consequences of financial fraud"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 border-b-2 border-red-500 pb-6">
          <div className="inline-block bg-red-600 text-white px-4 py-1 text-sm font-bold mb-3 transform -rotate-1">
            CLASSIFIED
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-2 text-red-500 tracking-wider">
            OPERATION: DUE DILIGENCE DISASTER
          </h1>
          <p className="text-gray-300 text-lg">APEX Global Intelligence Brief</p>
        </div>

        {/* Mission Overview */}
        <div className="bg-slate-800 border-2 border-red-500 rounded-lg p-6 mb-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4 text-red-400 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6" />
            MISSION OVERVIEW
          </h2>
          <p className="mb-4 text-gray-300">
            You've been air-dropped into APEX Global's servers. Intelligence suggests their financial health is fabricated.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-4">
            <div className="bg-slate-700 p-4 rounded border border-red-500/30">
              <Target className="w-5 h-5 text-red-400 mb-2" />
              <div className="text-sm text-gray-400">OBJECTIVE</div>
              <div className="font-bold">Complete 6 Protocols</div>
            </div>
            <div className="bg-slate-700 p-4 rounded border border-red-500/30">
              <Clock className="w-5 h-5 text-red-400 mb-2" />
              <div className="text-sm text-gray-400">TIME LIMIT</div>
              <div className="font-bold">60 Minutes</div>
            </div>
            <div className="bg-slate-700 p-4 rounded border border-red-500/30">
              <AlertTriangle className="w-5 h-5 text-red-400 mb-2" />
              <div className="text-sm text-gray-400">FAILURE</div>
              <div className="font-bold">Market Collapse</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-slate-800 border border-purple-500 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">INTERFACE & CONTROLS</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-bold text-purple-300 mb-2">Navigation</h3>
              <p className="text-gray-300">Sidebar (Desktop) or Hamburger Menu (Mobile)</p>
            </div>
            <div>
              <h3 className="font-bold text-purple-300 mb-2">Drag & Drop</h3>
              <p className="text-gray-300">Desktop: Click & drag | Mobile: Tap card, then tap destination</p>
            </div>
            <div>
              <h3 className="font-bold text-purple-300 mb-2">HUD Display</h3>
              <p className="text-gray-300">Timer (top right), Time Bar, Chat Box, Help button</p>
            </div>
            <div>
              <h3 className="font-bold text-purple-300 mb-2">Hardcore Mode</h3>
              <p className="text-gray-300">Wrong answers won't reveal correct solution - recalculate!</p>
            </div>
          </div>
        </div>

        {/* Protocol Levels */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-cyan-400">PROTOCOL SEQUENCE</h2>
          {levels.map((level) => (
            <div key={level.id} className="bg-slate-800 border border-cyan-500/50 rounded-lg mb-3 overflow-hidden">
              <button
                onClick={() => toggleSection(level.id)}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{level.icon}</span>
                  <div className="text-left">
                    <div className="text-sm text-cyan-400">LEVEL {level.id}</div>
                    <div className="font-bold">{level.title}</div>
                  </div>
                </div>
                {expandedSection === level.id ? (
                  <ChevronUp className="w-5 h-5 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-cyan-400" />
                )}
              </button>
              
              {expandedSection === level.id && (
                <div className="p-4 bg-slate-900 border-t border-cyan-500/30">
                  {level.tasks.map((task, idx) => (
                    <div key={idx} className="mb-4 pb-4 border-b border-slate-700 last:border-0">
                      <h4 className="font-bold text-cyan-300 mb-2">{task.name}</h4>
                      {task.formula && (
                        <div className="bg-slate-800 p-3 rounded mb-2 font-mono text-sm text-green-400">
                          {task.formula}
                        </div>
                      )}
                      {task.tip && (
                        <div className="text-sm text-gray-400 italic">💡 Tip: {task.tip}</div>
                      )}
                      {task.steps && (
                        <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
                          {task.steps.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      )}
                      {task.categories && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                          {task.categories.map((cat, i) => (
                            <div key={i} className="bg-slate-800 p-2 rounded text-sm text-gray-300">
                              {cat}
                            </div>
                          ))}
                        </div>
                      )}
                      {task.rule && (
                        <div className="bg-red-900/30 border border-red-500/50 p-2 rounded text-sm text-red-300 mt-2">
                          ⚠️ Rule: {task.rule}
                        </div>
                      )}
                      {task.strategy && (
                        <ul className="space-y-1 mt-2 text-sm">
                          {task.strategy.map((s, i) => (
                            <li key={i} className={s.includes("DON'T") ? "text-red-400" : "text-green-400"}>
                              {s}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                  <div className="bg-purple-900/30 border border-purple-500/50 p-3 rounded mt-3">
                    <div className="text-xs text-purple-300 mb-1">MBA LEARNING OUTCOME</div>
                    <div className="text-sm text-gray-300">{level.outcome}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Victory Condition */}
        <div className="bg-gradient-to-r from-yellow-900 to-yellow-800 border-2 border-yellow-500 rounded-lg p-6 text-center">
          <Award className="w-12 h-12 text-yellow-300 mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2 text-yellow-300">MISSION SUCCESS</h2>
          <p className="text-yellow-100">
            Complete all 6 protocols to receive your downloadable <strong>Certificate of Completion</strong> signed by Prof. Rajat Bohra, Dean of Taxila Business School.
          </p>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Good luck, Agent. The fate of APEX Global is in your hands.</p>
        </div>
      </div>
    </div>
  );
};

export default InstructionsComponent;