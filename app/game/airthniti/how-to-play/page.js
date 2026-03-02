"use client"
import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, BarChart3, Users, DollarSign, Building2, Shield, Target, Zap, ChevronDown, ChevronUp } from 'lucide-react';

export default function ArthnItiInstructions() {
  const [expandedSection, setExpandedSection] = useState('objective');

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const criticalLimits = [
    { name: 'Public Approval', threshold: '< 40%', icon: Users },
    { name: 'Inflation (CPI)', threshold: '> 10%', icon: TrendingUp },
    { name: 'Forex Reserves', threshold: '< $250B', icon: DollarSign },
    { name: 'Unemployment', threshold: '> 12%', icon: AlertTriangle },
    { name: 'Fiscal Deficit', threshold: '> 9% of GDP', icon: BarChart3 },
    { name: 'Recession', threshold: '2 consecutive quarters', icon: Target }
  ];

  const indicators = [
    { name: 'GDP', desc: 'Total value of goods and services', trend: 'Higher is better' },
    { name: 'GDP Growth (YoY)', desc: 'Annual rate of economic expansion', trend: 'Strong growth crucial' },
    { name: 'Inflation (CPI)', desc: 'Rate of price increases', trend: 'Keep low' },
    { name: 'Unemployment', desc: 'Workforce without jobs', trend: 'Keep low' },
    { name: 'Public Approval', desc: 'Your political health bar', trend: 'Keep above 40%' },
    { name: 'Fiscal Deficit', desc: 'Government spending gap', trend: 'Manage carefully' },
    { name: 'Forex Reserves', desc: 'Foreign currency holdings', trend: 'Essential for stability' },
    { name: 'Sensex', desc: 'Stock market confidence', trend: 'Reflects investor sentiment' }
  ];

  const policyLevers = [
    { 
      name: 'RBI Repo Rate & CRR', 
      type: 'Monetary Policy',
      effect: 'Increase to fight inflation, decrease to stimulate growth',
      icon: Building2
    },
    { 
      name: 'Average GST & Customs Duty', 
      type: 'Taxation',
      effect: 'Increase for revenue, but may slow consumption',
      icon: DollarSign
    },
    { 
      name: 'Infrastructure Spending', 
      type: 'Fiscal Policy',
      effect: 'Long-term GDP boost and job creation',
      icon: Building2
    },
    { 
      name: 'Welfare Spending', 
      type: 'Fiscal Policy',
      effect: 'Immediate approval boost, but budget drain',
      icon: Shield
    }
  ];

  const strategies = [
    { title: 'The Balancing Act', desc: 'Economics is about trade-offs. Every decision has consequences.' },
    { title: 'Read the Briefings', desc: 'Market Inputs are crucial. Adjust policies to counter threats and seize opportunities.' },
    { title: 'Incremental Changes', desc: 'Avoid drastic shifts. Sudden changes can shock the economy.' },
    { title: 'Think Ahead', desc: 'Infrastructure takes time to pay off, but neglecting it hurts long-term growth.' },
    { title: 'Manage Your Approval', desc: 'Public Approval is your lifeline. Act when it falls.' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <BarChart3 className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold tracking-tight">ARTHNITI</h1>
              <p className="text-blue-100 text-lg">The Finance Minister's Mandate</p>
            </div>
          </div>
          <p className="text-blue-50 text-lg max-w-3xl">
            Welcome, Finance Minister! You have been entrusted with managing the Indian economy for a five-year term. Your legacy depends on the choices you make.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Game Objective */}
        <section className="mb-12">
          <button 
            onClick={() => toggleSection('objective')}
            className="w-full flex items-center justify-between bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all mb-4"
          >
            <div className="flex items-center gap-4">
              <Target className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Game Objective</h2>
            </div>
            {expandedSection === 'objective' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSection === 'objective' && (
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3 text-green-400">Victory Condition</h3>
                <p className="text-slate-300 text-lg">Complete 20 quarters (5 years) with positive Public Approval rating</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-400">Critical Limits - Do Not Breach!</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {criticalLimits.map((limit, idx) => {
                    const Icon = limit.icon;
                    return (
                      <div key={idx} className="bg-slate-700 rounded-lg p-4 border-l-4 border-red-500">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6 text-red-400" />
                          <div>
                            <p className="font-semibold">{limit.name}</p>
                            <p className="text-red-300 text-sm">{limit.threshold}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Dashboard */}
        <section className="mb-12">
          <button 
            onClick={() => toggleSection('dashboard')}
            className="w-full flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all mb-4"
          >
            <div className="flex items-center gap-4">
              <BarChart3 className="w-8 h-8" />
              <h2 className="text-3xl font-bold">The Dashboard Explained</h2>
            </div>
            {expandedSection === 'dashboard' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSection === 'dashboard' && (
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg space-y-6">
              {/* Color Coding */}
              <div className="bg-slate-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-3">Color Coding System</h3>
                <div className="flex gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Improved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Worsened</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>No change</span>
                  </div>
                </div>
              </div>

              {/* Key Indicators */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Economic Indicators</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {indicators.map((indicator, idx) => (
                    <div key={idx} className="bg-slate-700 rounded-lg p-4">
                      <h4 className="font-bold text-blue-300 mb-1">{indicator.name}</h4>
                      <p className="text-sm text-slate-300 mb-1">{indicator.desc}</p>
                      <p className="text-xs text-slate-400 italic">{indicator.trend}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Policy Levers */}
        <section className="mb-12">
          <button 
            onClick={() => toggleSection('policy')}
            className="w-full flex items-center justify-between bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all mb-4"
          >
            <div className="flex items-center gap-4">
              <Zap className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Policy Levers - Your Controls</h2>
            </div>
            {expandedSection === 'policy' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSection === 'policy' && (
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <div className="grid md:grid-cols-2 gap-6">
                {policyLevers.map((lever, idx) => {
                  const Icon = lever.icon;
                  return (
                    <div key={idx} className="bg-gradient-to-br from-slate-700 to-slate-600 rounded-lg p-5 border border-slate-500">
                      <div className="flex items-start gap-3 mb-3">
                        <Icon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-lg">{lever.name}</h4>
                          <span className="text-xs text-purple-300 bg-purple-900 px-2 py-1 rounded">{lever.type}</span>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm">{lever.effect}</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 bg-slate-700 rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-yellow-300">Strategic Briefing Panel</h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li><span className="font-semibold text-white">Economic Outlook:</span> Current state summary</li>
                  <li><span className="font-semibold text-white">Market Inputs:</span> Three random events each quarter (threats or opportunities)</li>
                  <li><span className="font-semibold text-white">Policy Advisor:</span> Hover over levers for detailed effects</li>
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* Strategy */}
        <section className="mb-12">
          <button 
            onClick={() => toggleSection('strategy')}
            className="w-full flex items-center justify-between bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all mb-4"
          >
            <div className="flex items-center gap-4">
              <Shield className="w-8 h-8" />
              <h2 className="text-3xl font-bold">Strategy for Success</h2>
            </div>
            {expandedSection === 'strategy' ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSection === 'strategy' && (
            <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
              <div className="space-y-4">
                {strategies.map((strategy, idx) => (
                  <div key={idx} className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg p-5 border-l-4 border-green-500">
                    <h4 className="font-bold text-green-300 mb-2">{strategy.title}</h4>
                    <p className="text-slate-300">{strategy.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <div className="bg-gradient-to-r from-indigo-900 to-blue-900 rounded-xl p-8 text-center shadow-2xl">
          <h3 className="text-2xl font-bold mb-3">Good luck, Finance Minister</h3>
          <p className="text-blue-200 text-lg">The fate of the economy is in your hands.</p>
        </div>
      </div>
    </div>
  );
}