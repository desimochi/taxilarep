"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Clock, Trophy, Move, CheckCircle, ArrowRight, BookOpen, Calculator, PieChart, TrendingUp, Users } from 'lucide-react';

const AccordionItem = ({ title, children, isOpen, onToggle, icon: Icon }) => (
  <div className="border border-gray-200 rounded-lg mb-4 overflow-hidden shadow-sm">
    <button
      onClick={onToggle}
      className="w-full px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 flex items-center justify-between text-left transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-gray-800">{title}</span>
      </div>
      {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
    </button>
    {isOpen && (
      <div className="px-6 py-4 bg-white">
        {children}
      </div>
    )}
  </div>
);

const StageCard = ({ number, title, description, points, icon: Icon, color }) => (
  <div className={`bg-gradient-to-br ${color} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="bg-white bg-opacity-20 p-2 rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Stage {number}</h3>
      </div>
      <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
        <span className="text-white font-semibold">{points} pts</span>
      </div>
    </div>
    <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
    <p className="text-white text-opacity-90 leading-relaxed">{description}</p>
  </div>
);

export default function AccountingSimulationInstructions() {
  const [openSections, setOpenSections] = useState({
    welcome: true,
    getting_started: false,
    interface: false,
    stage1: false,
    stage2: false,
    stage3: false,
    stage4: false,
    checking: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const stages = [
    {
      number: 1,
      title: "Posting to the Ledger",
      description: "Act as a bookkeeper and post transactions to the General Ledger by dragging debits and credits to the correct T-Accounts.",
      points: 25,
      icon: BookOpen,
      color: "from-emerald-500 to-emerald-600"
    },
    {
      number: 2,
      title: "Preparing the Trial Balance",
      description: "Verify the accounting equation is balanced by placing T-Account balances in the correct debit or credit columns.",
      points: 25,
      icon: Calculator,
      color: "from-blue-500 to-blue-600"
    },
    {
      number: 3,
      title: "Creating Financial Statements",
      description: "Build the company's financial story by organizing accounts into Profit & Loss Statement and Balance Sheet.",
      points: 25,
      icon: PieChart,
      color: "from-purple-500 to-purple-600"
    },
    {
      number: 4,
      title: "Financial Ratio Analysis",
      description: "Analyze company performance by calculating key financial ratios using statement values.",
      points: 25,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen px-8 py-12 rounded">
      {/* Header */}
      <div className="bg-gray-100 text-white rounded-md">
        <div className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Users className="w-8 h-8" />
              </div>
              <h1 className="text-4xl">Accounting Cycle Simulation</h1>
            </div>
            <p className="text-xl text-gray-700 mb-2">Player's Manual</p>
            <p className="text-lg text-gray-700">Taxila Business School, Jaipur</p>
            <div className="flex items-center justify-center gap-6 mt-8 text-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>25 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span>100 Points</span>
              </div>
              <div className="flex items-center gap-2">
                <Move className="w-5 h-5" />
                <span>Drag & Drop</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stages.map((stage) => (
            <StageCard key={stage.number} {...stage} />
          ))}
        </div>

        {/* Detailed Instructions */}
        <div className="space-y-4">
          <AccordionItem
            title="Welcome to the Simulation!"
            isOpen={openSections.welcome}
            onToggle={() => toggleSection('welcome')}
            icon={Users}
          >
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Welcome, future financial analyst! This interactive simulation is your hands-on guide to mastering 
                the complete accounting cycle. You'll navigate a company's finances from initial transactions to 
                high-level ratio analysis.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 font-medium">
                  💡 Remember: The goal is to build understanding, not just to find the right answer. 
                  Mistakes are valuable learning opportunities!
                </p>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Getting Started"
            isOpen={openSections.getting_started}
            onToggle={() => toggleSection('getting_started')}
            icon={ArrowRight}
          >
            <div className="space-y-4">
              <p className="text-gray-700">When you launch the simulation, follow these simple steps:</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Step 1: Enter Your Name</h4>
                  <p className="text-green-700">Type your name into the welcome box to personalize your experience.</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Step 2: Start Learning</h4>
                  <p className="text-blue-700">Click the button to begin. Your 25-minute countdown starts immediately!</p>
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="The Game Interface"
            isOpen={openSections.interface}
            onToggle={() => toggleSection('interface')}
            icon={Move}
          >
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-600" />
                    <h4 className="font-semibold text-yellow-800">Scorecard</h4>
                  </div>
                  <p className="text-yellow-700">Tracks your progress out of 100 points (25 points per stage)</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">Timer</h4>
                  </div>
                  <p className="text-red-700">25 minutes total. Simulation restarts if time runs out</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Move className="w-5 h-5 text-purple-600" />
                    <h4 className="font-semibold text-purple-800">Drag & Drop</h4>
                  </div>
                  <p className="text-purple-700">Click, hold, drag to dashed zones, and release to place items</p>
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Stage 1: Posting to the Ledger"
            isOpen={openSections.stage1}
            onToggle={() => toggleSection('stage1')}
            icon={BookOpen}
          >
            <div className="space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h4 className="font-semibold text-emerald-800 mb-2">Your Role: Bookkeeper</h4>
                <p className="text-emerald-700">Post transactions to the General Ledger by dragging items to correct T-Account sides.</p>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold text-gray-800">Step-by-Step Process:</h5>
                <ol className="space-y-2 text-gray-700">
                  <li className="flex gap-3">
                    <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">1</span>
                    <span>Analyze the transaction (e.g., "Took a bank loan of ₹20,000")</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">2</span>
                    <span>Identify affected accounts: Cash (Asset) and Loan Payable (Liability)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">3</span>
                    <span>Determine effects: Cash increases (Debit), Loan Payable increases (Credit)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">4</span>
                    <span>Drag blue Debit item to Debit side of Cash T-Account</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-emerald-100 text-emerald-800 w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">5</span>
                    <span>Drag pink Credit item to Credit side of Loan Payable T-Account</span>
                  </li>
                </ol>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Stage 2: Preparing the Trial Balance"
            isOpen={openSections.stage2}
            onToggle={() => toggleSection('stage2')}
            icon={Calculator}
          >
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Your Goal: Verify Balance</h4>
                <p className="text-blue-700">Drag T-Account balances to correct Debit or Credit columns in the Trial Balance.</p>
              </div>
              
              <div className="bg-blue-25 border-l-4 border-blue-500 p-4">
                <h5 className="font-semibold text-blue-800 mb-2">💡 Remember Normal Balances:</h5>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-blue-700">Typically Debits:</span>
                    <ul className="text-blue-600 ml-4 mt-1">
                      <li>• Assets</li>
                      <li>• Expenses</li>
                    </ul>
                  </div>
                  <div>
                    <span className="font-medium text-blue-700">Typically Credits:</span>
                    <ul className="text-blue-600 ml-4 mt-1">
                      <li>• Liabilities</li>
                      <li>• Equity</li>
                      <li>• Revenue</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Stage 3: Creating Financial Statements"
            isOpen={openSections.stage3}
            onToggle={() => toggleSection('stage3')}
            icon={PieChart}
          >
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Your Goal: Tell the Financial Story</h4>
                <p className="text-purple-700">Move accounts to correct sections in P&L Statement and Balance Sheet.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-800">Profit & Loss Statement:</h5>
                  <ol className="space-y-1 text-gray-700 text-sm">
                    <li>1. Drag Revenue accounts to Revenue section</li>
                    <li>2. Drag Expense accounts to Expense section</li>
                    <li>3. System calculates Net Profit automatically</li>
                  </ol>
                </div>
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-800">Balance Sheet:</h5>
                  <ol className="space-y-1 text-gray-700 text-sm">
                    <li>1. Drag Net Profit to Equity section (crucial link!)</li>
                    <li>2. Drag Assets to Assets section</li>
                    <li>3. Drag Liabilities to Liabilities section</li>
                    <li>4. Drag remaining Equity accounts</li>
                  </ol>
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Stage 4: Financial Ratio Analysis"
            isOpen={openSections.stage4}
            onToggle={() => toggleSection('stage4')}
            icon={TrendingUp}
          >
            <div className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Your Goal: Analyze Performance</h4>
                <p className="text-orange-700">Calculate key financial ratios by dragging correct values to formula boxes.</p>
              </div>
              
              <div className="bg-orange-25 border-l-4 border-orange-500 p-4">
                <h5 className="font-semibold text-orange-800 mb-2">Example: Current Ratio</h5>
                <div className="space-y-2 text-orange-700">
                  <p>Formula: Current Assets ÷ Current Liabilities</p>
                  <ol className="space-y-1 text-sm ml-4">
                    <li>1. Find "Current Assets" value in left pool</li>
                    <li>2. Drag to top (numerator) box</li>
                    <li>3. Find "Current Liabilities" value</li>
                    <li>4. Drag to bottom (denominator) box</li>
                    <li>5. System calculates result automatically</li>
                  </ol>
                </div>
              </div>
            </div>
          </AccordionItem>

          <AccordionItem
            title="Checking Your Work & Progressing"
            isOpen={openSections.checking}
            onToggle={() => toggleSection('checking')}
            icon={CheckCircle}
          >
            <div className="space-y-4">
              <p className="text-gray-700">After completing each stage, click the blue "Check My Work" button:</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-semibold text-green-800">If Correct</h4>
                  </div>
                  <ul className="text-green-700 space-y-1">
                    <li>• Success message appears</li>
                    <li>• Score updates automatically</li>
                    <li>• "Proceed to Next Stage" button activates</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-red-600" />
                    <h4 className="font-semibold text-red-800">If Incorrect</h4>
                  </div>
                  <ul className="text-red-700 space-y-1">
                    <li>• Error explanation pop-up appears</li>
                    <li>• Incorrect items highlighted in red</li>
                    <li>• Fix errors and re-check</li>
                  </ul>
                </div>
              </div>
            </div>
          </AccordionItem>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to Begin?</h3>
          <p className="text-blue-100 mb-4">Good luck, and have fun building your accounting expertise!</p>
          <div className="flex items-center justify-center gap-4 text-blue-200">
            <span>🎯 Master the Accounting Cycle</span>
            <span>📊 Build Financial Expertise</span>
            <span>🚀 Launch Your Career</span>
          </div>
        </div>
      </div>
    </div>
  );
}