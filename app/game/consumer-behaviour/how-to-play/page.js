"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Target, TrendingUp, Users, DollarSign, Zap, AlertTriangle, Award, BookOpen } from 'lucide-react';

export default function InstructionsPage() {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const Section = ({ id, title, icon: Icon, children, highlight = false }) => {
    const isExpanded = expandedSection === id;
    
    return (
      <div className={`mb-4 rounded-lg border ${highlight ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'} shadow-sm overflow-hidden`}>
        <button
          onClick={() => toggleSection(id)}
          className={`w-full flex items-center justify-between p-5 text-left ${highlight ? 'hover:bg-red-100' : 'hover:bg-gray-50'} transition-colors`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-6 h-6 ${highlight ? 'text-red-600' : 'text-blue-600'}`} />
            <h2 className={`text-xl font-bold ${highlight ? 'text-red-900' : 'text-gray-900'}`}>{title}</h2>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        {isExpanded && (
          <div className="p-5 pt-0 border-t border-gray-100">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-3">Hyper-Competitive Consumer Simulation</h1>
          <p className="text-xl text-blue-100">Player's Manual</p>
          <p className="text-sm mt-2 text-blue-200">Developed at Taxila Business School</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* Introduction Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-600">
          <div className="flex items-start gap-4">
            <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Welcome, CEO!</h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                You are the new CEO of a technology company in the bustling market of Jaipur, India. Your goal is to make strategic decisions over a five-year period (20 quarters) to outperform your rivals and achieve market leadership.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Each game begins with a <strong>random starting scenario</strong> - you might be a market leader, a struggling underdog, or in a dead heat with rivals.
              </p>
            </div>
          </div>
        </div>

        {/* Competitors */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-5 shadow-md">
            <h4 className="font-bold text-lg mb-2">InnovateNext</h4>
            <p className="text-purple-100 text-sm">Well-funded rival focused on premium quality and latest technology</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-5 shadow-md">
            <h4 className="font-bold text-lg mb-2">ValueFirst</h4>
            <p className="text-green-100 text-sm">Aggressive competitor focused on offering the lowest possible prices</p>
          </div>
        </div>

        {/* Objective */}
        <Section id="objective" title="Your Objective" icon={Award}>
          <div className="space-y-3">
            <p className="text-gray-700">
              The primary goal is to <strong className="text-blue-600">maximize your Cumulative Sales</strong> over 20 quarters.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-900 font-semibold">🏆 Successfully complete the simulation to earn a Certificate of Completion from Taxila Business School!</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-900">⚠️ Survival is not guaranteed - poor performance can lead to an early exit from the market.</p>
            </div>
          </div>
        </Section>

        {/* Consumer Segments */}
        <Section id="segments" title="Consumer Segments" icon={Users}>
          <p className="text-gray-700 mb-4">The Jaipur market is divided into distinct segments. Understanding each group is key to success:</p>
          
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-blue-600 mb-1">Demographic Segmentation</h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li><strong>Practical Professionals:</strong> Value reliability and balanced features for fair price</li>
                <li><strong>Young Students:</strong> Highly price-sensitive and influenced by trends</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-purple-600 mb-1">Psychographic Segmentation</h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li><strong>Aspirational Achievers:</strong> Driven by brand and status, want premium products</li>
                <li><strong>Mainstream Followers:</strong> Prefer trusted, well-known brands</li>
                <li><strong>Tech Enthusiasts:</strong> Care about highest quality and latest features</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <h4 className="font-bold text-green-600 mb-1">Behavioral Segmentation</h4>
              <ul className="text-sm text-gray-700 space-y-1 ml-4">
                <li><strong>Budget Buyers:</strong> Extremely price-sensitive, want cheapest option</li>
                <li><strong>Savvy Shoppers:</strong> Look for best value - balance of price and quality</li>
                <li><strong>Brand Loyalists:</strong> Loyal to existing brands, difficult to win over</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* Dashboard Stats */}
        <Section id="dashboard" title="Dashboard Stats" icon={TrendingUp}>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <h4 className="font-bold text-gray-900">QTR Sales</h4>
              </div>
              <p className="text-sm text-gray-700">Revenue generated in the most recent quarter</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-gray-900">Cumulative Sales</h4>
              </div>
              <p className="text-sm text-gray-700">Total revenue earned - primary metric for victory</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-600" />
                <h4 className="font-bold text-gray-900">Quality (0-100)</h4>
              </div>
              <p className="text-sm text-gray-700">Product performance score, increased by R&D Investment</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-purple-600" />
                <h4 className="font-bold text-gray-900">Awareness (0-100)</h4>
              </div>
              <p className="text-sm text-gray-700">Brand visibility, increased by Marketing Budget</p>
            </div>
          </div>
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-900 mb-1">Total Budget</h4>
            <p className="text-sm text-blue-800">Calculated as <strong>12% of your Cumulative Sales</strong></p>
          </div>
        </Section>

        {/* How to Play */}
        <Section id="howtoplay" title="How to Play: The Quarterly Cycle" icon={BookOpen}>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Step 1: Analyze the Market</h4>
              <ul className="text-sm text-gray-700 space-y-1 list-disc ml-4">
                <li>Check Live Market Dashboard for competitor performance</li>
                <li>Review your market share in each consumer segment</li>
                <li><strong className="text-red-600">Read Market News - This is critical!</strong> Events change segment sizes and priorities</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Step 2: Make Strategic Decisions</h4>
              <p className="text-sm text-gray-700 mb-2">Set your strategy using three sliders:</p>
              <ul className="text-sm text-gray-700 space-y-1 list-disc ml-4">
                <li><strong>Product Price:</strong> Lower appeals to budget segments, higher signals premium</li>
                <li><strong>Marketing Budget:</strong> Advertising spend to grow brand Awareness</li>
                <li><strong>R&D Investment:</strong> Funds innovation and improves Quality score</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Step 3: Create Your Ad Campaign (Most Important!)</h4>
              <ul className="text-sm text-gray-700 space-y-2 list-disc ml-4">
                <li><strong>Target Segment:</strong> Select the ONE consumer segment you'll sell to this quarter</li>
                <li><strong>Campaign Message:</strong> Write a short ad - content is crucial!
                  <div className="mt-2 space-y-2">
                    <div className="bg-green-50 border border-green-300 rounded p-2">
                      <p className="text-green-900 text-xs"><strong>✅ Effective Ads:</strong> Using keywords aligned with your target segment's key driver (e.g., "affordable" for Budget Buyers) gives a <strong>massive 50% sales boost</strong></p>
                    </div>
                    <div className="bg-red-50 border border-red-300 rounded p-2">
                      <p className="text-red-900 text-xs"><strong>❌ Misleading Ads:</strong> Promising what you don't deliver (e.g., "premium quality" with low quality score) results in a <strong>severe 50% sales reduction</strong></p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-bold text-gray-900 mb-2">Step 4: Finalize and Review</h4>
              <p className="text-sm text-gray-700">Click "Finalize Decisions & End Quarter" and review the Quarterly Report card</p>
            </div>
          </div>
        </Section>

        {/* Critical Rules */}
        <Section id="rules" title="Critical Rules for Success & Failure" icon={AlertTriangle} highlight={true}>
          <div className="space-y-3">
            <div className="bg-white border-l-4 border-red-600 p-4 rounded">
              <h4 className="font-bold text-red-900 mb-1">🎯 The Golden Rule</h4>
              <p className="text-red-800 text-sm">You can ONLY generate sales from the single consumer segment you select in your "Target Segment" dropdown each quarter</p>
            </div>

            <div className="bg-white border-l-4 border-red-600 p-4 rounded">
              <h4 className="font-bold text-red-900 mb-1">⚠️ Zero Means Zero</h4>
              <p className="text-red-800 text-sm">If "Your Customers" value for a segment is '0' at the start of a quarter, targeting it will result in ZERO sales</p>
            </div>

            <div className="bg-white border-l-4 border-yellow-600 p-4 rounded">
              <h4 className="font-bold text-yellow-900 mb-1">📊 Sales Cap</h4>
              <p className="text-yellow-800 text-sm">Maximum sales any company can achieve in a single quarter is capped at ₹50 Crore</p>
            </div>

            <div className="bg-white border-l-4 border-yellow-600 p-4 rounded">
              <h4 className="font-bold text-yellow-900 mb-1">💰 Budgeting is Key</h4>
              <p className="text-yellow-800 text-sm">You cannot spend more than your "Total Budget" for the quarter</p>
            </div>

            <div className="bg-white border-l-4 border-red-600 p-4 rounded">
              <h4 className="font-bold text-red-900 mb-1">💀 Bankruptcy Rule</h4>
              <p className="text-red-800 text-sm">Two consecutive quarters with zero sales will result in market failure and the simulation will end</p>
            </div>

            <div className="bg-white border-l-4 border-red-600 p-4 rounded">
              <h4 className="font-bold text-red-900 mb-1">⏰ Time Limit</h4>
              <p className="text-red-800 text-sm">You have FIVE MINUTES to make your decisions each quarter. Failing to finalize in time will end the simulation</p>
            </div>
          </div>
        </Section>

        {/* Learning Outcomes */}
        <Section id="learning" title="Learning Outcomes" icon={BookOpen}>
          <p className="text-gray-700 mb-3">By completing this simulation, you will develop practical understanding of:</p>
          <div className="grid md:grid-cols-2 gap-2">
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Strategic Market Segmentation</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Competitive Analysis</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Resource Allocation</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Marketing & Messaging</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Financial Acumen</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-blue-600 font-bold">•</span>
              <span>Adaptability</span>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm border-t pt-6">
          <p className="font-semibold text-lg text-gray-900 mb-2">Good luck, CEO!</p>
          <p>Taxila Business School • Jaipur, Rajasthan</p>
        </div>
      </div>
    </div>
  );
}