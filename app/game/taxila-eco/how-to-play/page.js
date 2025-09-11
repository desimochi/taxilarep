"use client"
import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Target, TrendingUp, Zap, DollarSign, Users, Building, Network, Award, ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TaxilaInstructions = () => {
  const [expandedSection, setExpandedSection] = useState('introduction');
const router = useRouter()
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <Target className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Welcome, Strategist. You are about to enter a dynamic world of corporate strategy and ecosystem building. 
            This simulation places you at the helm of a burgeoning conglomerate with significant capital and a 10-year 
            window to create a dominant business empire.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-blue-800 font-medium">
              Your goal is not just to be profitable, but to create powerful synergies between your businesses, 
              building an ecosystem where the <strong>whole is far greater than the sum of its parts.</strong>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'objective',
      title: 'Your Objective',
      icon: <Award className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg border">
            <h4 className="text-xl font-bold text-gray-800 mb-3">Mission: Achieve Highest Total Ecosystem Value</h4>
            <p className="text-gray-700 mb-4">
              Over the course of <strong>10 turns (years)</strong>, you must maximize your Total Ecosystem Value - 
              a composite score calculated from your final-turn Revenue, Customers, and remaining Capital.
            </p>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h5 className="font-semibold text-gray-800 mb-2">Scoring Formula:</h5>
              <p className="text-lg font-mono bg-gray-100 p-3 rounded text-center">
                (Revenue × 8) + (Customers × 50) + Capital
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'interface',
      title: 'Command Center Interface',
      icon: <Building className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 p-5 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-800 mb-3 flex items-center">
                <Network className="w-4 h-4 mr-2" />
                Left Panel: Your Ecosystem
              </h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li>• <strong>Nodes:</strong> 5 business arenas (glowing circles)</li>
                <li>• <strong>Ventures:</strong> Icons within arena nodes</li>
                <li>• <strong>Synergy Lines:</strong> Animated connections between linked arenas</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center">
                <TrendingUp className="w-4 h-4 mr-2" />
                Center Panel: Dashboard
              </h4>
              <ul className="text-sm text-blue-700 space-y-2">
                <li>• <strong>KPIs:</strong> Turn, Capital, Revenue, Customers</li>
                <li>• <strong>Total Ecosystem Value:</strong> Real-time score</li>
                <li>• <strong>End Turn Button:</strong> Advance simulation</li>
                <li>• <strong>Hall of Fame:</strong> Top 5 scores leaderboard</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 p-5 rounded-lg border border-orange-200">
              <h4 className="font-bold text-orange-800 mb-3 flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Right Panel: Opportunities
              </h4>
              <ul className="text-sm text-orange-700 space-y-2">
                <li>• <strong>4 Random Cards:</strong> From pool of 20 opportunities</li>
                <li>• <strong>Key Data:</strong> Name, Arena, Cost, Revenue & Customer boost</li>
                <li>• <strong>Balance Sheets:</strong> Hover for detailed financials</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'gameplay',
      title: 'Core Gameplay Loop',
      icon: <Zap className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
            <h4 className="text-lg font-bold text-gray-800 mb-4">Three Simple Steps Each Turn:</h4>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">1</div>
                <div>
                  <h5 className="font-semibold text-gray-800">Analyze Opportunities</h5>
                  <p className="text-gray-600 text-sm mt-1">
                    Examine 4 investment cards. Consider cost vs. benefit and potential synergies with existing ventures.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">2</div>
                <div>
                  <h5 className="font-semibold text-gray-800">Invest (Drag & Drop)</h5>
                  <p className="text-gray-600 text-sm mt-1">
                    Drag opportunity cards to your ecosystem. Maximum 2 investments per turn. Requires sufficient capital.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">3</div>
                <div>
                  <h5 className="font-semibold text-gray-800">End Your Turn</h5>
                  <p className="text-gray-600 text-sm mt-1">
                    Click "End Turn" to calculate interest, apply organic growth, and advance to next year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'kpis',
      title: 'Key Performance Indicators',
      icon: <TrendingUp className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-bold text-green-800">Capital</h4>
              </div>
              <p className="text-sm text-green-700">
                Your liquid cash for investments. Grows slightly from interest each turn but primarily used for acquisitions.
              </p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-bold text-blue-800">Revenue</h4>
              </div>
              <p className="text-sm text-blue-700">
                Your yearly income. Critical driver of final score with 8x multiplier in the scoring formula.
              </p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-purple-600 mr-2" />
                <h4 className="font-bold text-purple-800">Customers</h4>
              </div>
              <p className="text-sm text-purple-700">
                Size of your user base. Another key score driver with 50x multiplier - highly valuable!
              </p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center mb-2">
                <Award className="w-5 h-5 text-orange-600 mr-2" />
                <h4 className="font-bold text-orange-800">Total Ecosystem Value</h4>
              </div>
              <p className="text-sm text-orange-700">
                Your real-time score combining all KPIs. This is your primary success metric.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'synergy',
      title: 'The Power of Synergy',
      icon: <Network className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-6 rounded-lg border-2 border-yellow-300">
            <h4 className="text-xl font-bold text-orange-800 mb-3 flex items-center">
              <Zap className="w-6 h-6 mr-2" />
              Most Important Mechanic for High Scores!
            </h4>
            <p className="text-orange-700 mb-4">
              Synergy is the key differentiator between good and great strategists. It's not just about buying profitable companies—it's about creating interconnected value networks.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h5 className="font-bold text-gray-800 mb-3">How It Works:</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Each investment lists potential synergy arenas</li>
                <li>• Game checks for existing ventures in those arenas</li>
                <li>• Creates visual synergy lines between connected nodes</li>
                <li>• Immediate percentage-based revenue bonus applied</li>
              </ul>
            </div>
            
            <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
              <h5 className="font-bold text-gray-800 mb-3">The Reward:</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Substantial bonus to total revenue</li>
                <li>• Exponential growth potential</li>
                <li>• Multiple synergies = explosive growth</li>
                <li>• Compound effect over remaining turns</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'strategy',
      title: 'Winning Strategies',
      icon: <Target className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-5 rounded-lg border border-red-200">
              <h4 className="font-bold text-red-800 mb-3">🎯 Prioritize Synergies</h4>
              <p className="text-sm text-red-700">
                Don't just buy the highest base revenue company. A lower-cost investment creating two synergy links 
                is almost always more valuable long-term.
              </p>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-3">🌐 Diversify Early</h4>
              <p className="text-sm text-blue-700">
                Get footholds in 2-3 interconnected arenas in the first few turns. This sets you up to capitalize 
                on wider synergy opportunities later.
              </p>
            </div>
            
            <div className="bg-green-50 p-5 rounded-lg border border-green-200">
              <h4 className="font-bold text-green-800 mb-3">💰 Manage Capital Wisely</h4>
              <p className="text-sm text-green-700">
                Don't spend everything early. Keep reserves for high-cost, high-synergy opportunities that may 
                appear in late game turns.
              </p>
            </div>
            
            <div className="bg-purple-50 p-5 rounded-lg border border-purple-200">
              <h4 className="font-bold text-purple-800 mb-3">📊 Read the Financials</h4>
              <p className="text-sm text-purple-700">
                Use hover-over balance sheets. Companies with low debt and high equity are fundamentally stronger 
                acquisitions than those with high liabilities.
              </p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-6 rounded-lg border">
            <h4 className="text-lg font-bold text-indigo-800 mb-3">Pro Tip: The Synergy Multiplier Effect</h4>
            <p className="text-indigo-700 text-sm">
              A venture that costs $200K but creates synergies worth 20% revenue boost will likely outperform 
              a $300K venture with higher base revenue but no synergies, especially over multiple turns.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'endgame',
      title: 'End of Game',
      icon: <Award className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6 rounded-lg">
            <h4 className="text-xl font-bold mb-3">Game Conclusion</h4>
            <p className="text-gray-200 mb-4">
              The simulation automatically concludes after Turn 10. Your final results screen will display your 
              <strong> Final Ecosystem Value</strong>.
            </p>
            
            <div className="bg-white bg-opacity-10 p-4 rounded-lg">
              <h5 className="font-semibold mb-2">High scores are achieved by:</h5>
              <ul className="text-sm space-y-1 text-gray-200">
                <li>• Building multiple synergistic connections</li>
                <li>• Maintaining steady revenue growth</li>
                <li>• Accumulating large customer bases</li>
                <li>• Preserving capital for strategic opportunities</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="text-lg font-bold text-yellow-800 mb-2">Ready to Build Your Empire?</h4>
            <p className="text-yellow-700 text-sm">
              Remember: Success comes not from individual ventures, but from the powerful synergies you create between them. 
              Think ecosystem, not just portfolio.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="px-8 py-8">
            <button onClick={()=>router.back()} className="text-gray-50 flex items-center gap-1"><ArrowBigLeft />Go Back</button>
        </div>
          <h1 className="text-4xl font-bold mb-2">Taxila Ecosystem Simulation</h1>
          <p className="text-xl text-indigo-200">The Strategist's Manual</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          
          {/* Quick Start Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
            <h2 className="text-2xl font-bold mb-4">Quick Start Summary</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="font-semibold">Objective</div>
                <div>Maximize Total Ecosystem Value over 10 turns</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="font-semibold">Key Strategy</div>
                <div>Create synergies between business arenas</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="font-semibold">Actions Per Turn</div>
                <div>Make 0-2 investments, then end turn</div>
              </div>
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="divide-y divide-gray-200">
            {sections.map((section) => (
              <div key={section.id} className="p-6">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-3 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-indigo-600">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {section.title}
                    </h3>
                  </div>
                  <div className="text-gray-400">
                    {expandedSection === section.id ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                </button>
                
                {expandedSection === section.id && (
                  <div className="mt-4 pl-8">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500">
          <p className="text-sm">
            Master the art of strategic synergy. Build not just a portfolio, but an ecosystem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaxilaInstructions;