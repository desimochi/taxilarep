"use client"
import React, { useState } from 'react';
import { ChevronRight, Play, Target, Cog, TrendingUp, Users, Package, Award, Book, BarChart3, Lightbulb } from 'lucide-react';

const InstructionPage = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: Book },
    { id: 'getting-started', title: 'Getting Started', icon: Play },
    { id: 'scenarios', title: 'Game Scenarios', icon: Target },
    { id: 'interface', title: 'Interface', icon: BarChart3 },
    { id: 'gameplay', title: 'Gameplay Loop', icon: Cog },
    { id: 'advanced', title: 'Advanced Tips', icon: Lightbulb }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Marketing Strategy Simulation</h1>
              <p className="text-gray-600">Player's Manual & Instructions</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-8 bg-white rounded-lg shadow-sm border p-4">
              <nav className="space-y-2">
                {sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 space-y-8">
            {/* Introduction */}
            <section id="introduction" className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Book className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Introduction</h2>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6">
                  Welcome to the Marketing Strategy Simulation! You are the lead executive of a new bicycle company. 
                  Your goal is to navigate a dynamic marketplace over a three-year period (12 quarters), make strategic decisions, 
                  and grow your company into a market leader.
                </p>
                
                <div className="bg-blue-50 p-6 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Success Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {['Market Share', 'Net Profit', 'Stock Price', 'Balanced Scorecard'].map((metric) => (
                      <div key={metric} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-800 font-medium">{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Getting Started */}
            <section id="getting-started" className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Play className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">Getting Started</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-3">Step 1: Enter Your Name</h3>
                    <p className="text-green-800">This will identify you as the player and will be used on your final certificate.</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-3">Step 2: Company Name</h3>
                    <p className="text-green-800">Brand your enterprise! This name will appear on the dashboard and in reports.</p>
                  </div>
                </div>
                
                <div className="text-center py-4">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Start Simulation
                  </button>
                </div>
              </div>
            </section>

            {/* Game Scenarios */}
            <section id="scenarios" className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="h-6 w-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Game Scenarios & Replayability</h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                The simulation begins with one of three distinct market scenarios, each featuring different starting conditions:
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: 'Competitor Strengths', desc: 'Rivals may be stronger or weaker in certain segments', color: 'red' },
                  { title: 'Market Demand', desc: 'Consumer preferences for Recreation, Mountain, or Speed bikes will vary', color: 'blue' },
                  { title: 'Economic Climate', desc: 'The total size of the market might be larger or smaller', color: 'green' }
                ].map((scenario) => (
                  <div key={scenario.title} className={`bg-${scenario.color}-50 p-6 rounded-lg border border-${scenario.color}-200`}>
                    <h3 className={`font-semibold text-${scenario.color}-900 mb-3`}>{scenario.title}</h3>
                    <p className={`text-${scenario.color}-800`}>{scenario.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Interface */}
            <section id="interface" className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Understanding the Interface</h2>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Executive Dashboard</h3>
                  <p className="text-gray-700 mb-4">Your at-a-glance view of your company's health, updated at the end of every quarter:</p>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      'Market Share: Your percentage of total market sales',
                      'Stock Price: Reflection of investor confidence', 
                      'Net Profit: Total revenue minus all costs',
                      'Total Sales: Revenue generated from bike sales',
                      'Marketing Budget: 10% of current quarter\'s sales',
                      'Sales Force Cost: Total salary cost for salespeople'
                    ].map((item) => (
                      <div key={item} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Decision Center</h3>
                  <p className="text-gray-700">Where you make all strategic choices, organized into tabs for easy navigation.</p>
                </div>
              </div>
            </section>

            {/* Gameplay Loop */}
            <section id="gameplay" className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Cog className="h-6 w-6 text-indigo-600" />
                <h2 className="text-2xl font-bold text-gray-900">The Gameplay Loop</h2>
              </div>
              
              <p className="text-gray-700 mb-6">Follow this strategic process each quarter, moving through the tabs from left to right:</p>
              
              <div className="space-y-6">
                {[
                  { 
                    step: 1, 
                    title: 'Market Research', 
                    subtitle: 'Your Intelligence Hub',
                    desc: 'Always start here! Analyze market segments (Recreation, Mountain, Speed) and scout competitors.',
                    color: 'blue'
                  },
                  { 
                    step: 2, 
                    title: 'R&D / Brand Design', 
                    subtitle: 'Innovation',
                    desc: 'Create your products using the Parts Bin. Two new, advanced parts unlock each quarter.',
                    color: 'green'
                  },
                  { 
                    step: 3, 
                    title: 'Marketing', 
                    subtitle: 'Creating Demand',
                    desc: 'Set target segment, pricing (Cost + Margin), and advertising within your budget.',
                    color: 'purple'
                  },
                  { 
                    step: 4, 
                    title: 'Production', 
                    subtitle: 'Supply',
                    desc: 'Decide manufacturing quantities. Be careful not to overproduce!',
                    color: 'orange'
                  },
                  { 
                    step: 5, 
                    title: 'Sales Channel', 
                    subtitle: 'Distribution',
                    desc: 'Hire sales team ($20,000/employee/quarter) and allocate across three channels.',
                    color: 'red'
                  },
                  { 
                    step: 6, 
                    title: 'End Quarter', 
                    subtitle: 'Execute',
                    desc: 'Submit decisions and wait 5 seconds for results processing.',
                    color: 'gray'
                  }
                ].map((step) => (
                  <div key={step.step} className={`bg-${step.color}-50 p-6 rounded-lg border-l-4 border-${step.color}-400`}>
                    <div className="flex items-start space-x-4">
                      <div className={`bg-${step.color}-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm`}>
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold text-${step.color}-900`}>
                          {step.title} <span className={`text-${step.color}-700 font-normal`}>({step.subtitle})</span>
                        </h3>
                        <p className={`text-${step.color}-800 mt-2`}>{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Advanced Tips */}
            <section id="advanced" className="bg-white rounded-lg shadow-sm border p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Lightbulb className="h-6 w-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900">Advanced Mechanics & Tips</h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-yellow-900 mb-3">Dynamic Marketplace</h3>
                  <p className="text-yellow-800">The market is not static. Competitors evolve and consumer demand shifts every quarter. Constant adaptation is key.</p>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-3">Sales Calculation</h3>
                  <p className="text-blue-800">Sales use a "share of voice" model. Your brand's attractiveness score (design + price + ads) is compared to competitors, modified by sales channel effectiveness.</p>
                </div>
                
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-3">Inventory Management</h3>
                  <p className="text-red-800">Unsold bikes depreciate by 20% each quarter (minimum 50% of cost). Managing inventory is crucial for protecting profits.</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">Innovation Strategy</h3>
                  <p className="text-green-800">Use new parts unlocked each quarter to create superior products that command higher prices or better appeal.</p>
                </div>
              </div>
            </section>

            {/* End Game */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <Award className="h-6 w-6" />
                <h2 className="text-2xl font-bold">End of Simulation</h2>
              </div>
              
              <p className="mb-6">After Quarter 12, view your final performance summary:</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Performance Reports</h3>
                  <p className="text-blue-100">Download yearly reports summarizing your three-year performance.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Certificate of Achievement</h3>
                  <p className="text-blue-100">Score 60+ on Balanced Scorecard to earn a certificate you can download and share on LinkedIn!</p>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;