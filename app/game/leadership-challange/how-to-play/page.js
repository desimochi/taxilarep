'use client'
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp, Users, Settings, DollarSign, Target, AlertTriangle, BookOpen, Save, Play } from 'lucide-react';

const TaxilaInstructions = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', label: 'Introduction', icon: BookOpen },
    { id: 'objective', label: 'Objective', icon: Target },
    { id: 'annual-cycle', label: 'Annual Cycle', icon: Play },
    { id: 'metrics', label: 'Key Metrics', icon: TrendingUp },
    { id: 'departments', label: 'Departments', icon: Settings },
    { id: 'save-load', label: 'Save & Load', icon: Save }
  ];

  const handleKeyNavigation = (e) => {
    const currentIndex = sections.findIndex(section => section.id === activeSection);
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    } else if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyNavigation);
    return () => document.removeEventListener('keydown', handleKeyNavigation);
  }, [activeSection]);

  const NavigationButton = ({ section, isActive, onClick }) => {
    const Icon = section.icon;
    return (
      <button
        onClick={onClick}
        className={`
          flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm
          transition-all duration-300 transform hover:-translate-y-1
          ${isActive 
            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30' 
            : 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'
          }
        `}
      >
        <Icon size={16} />
        <span className="hidden sm:inline">{section.label}</span>
      </button>
    );
  };

  const KPICard = ({ icon, title, description, gradient = "from-indigo-500 to-purple-600" }) => (
    <div className={`
      bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl
      shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2
      relative overflow-hidden group
    `}>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="text-2xl mb-3">{icon}</div>
        <h4 className="text-xl font-bold mb-2">{title}</h4>
        <p className="text-white/90 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );

  const DepartmentCard = ({ title, content, gradient = "from-white to-gray-50" }) => (
    <div className={`
      bg-gradient-to-br ${gradient} p-6 rounded-2xl border-2 border-transparent
      shadow-lg hover:shadow-xl hover:border-indigo-300 transition-all duration-300
      transform hover:-translate-y-2 relative overflow-hidden
    `}>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
      <h3 className="text-xl font-bold text-indigo-600 mb-4">{title}</h3>
      <div className="text-gray-700 space-y-2">
        {content}
      </div>
    </div>
  );

  const CycleStep = ({ number, title, description }) => (
    <div className="flex items-start gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-x-2">
      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
        {number}
      </div>
      <div>
        <h4 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h4>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );

  const WarningBox = ({ title, children }) => (
    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg shadow-red-500/30 my-6">
      <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
        <AlertTriangle size={24} />
        {title}
      </h4>
      <div>{children}</div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome, CEO
            </h2>
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl border-l-4 border-indigo-500">
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">About the Simulation</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Welcome to the TAXILA LEADERSHIP CHALLENGE, where you'll take command of <strong>Apex Innovations</strong>, 
                a major player in a competitive and dynamic industry. This sophisticated business simulation is designed to 
                test your strategic thinking, financial acumen, and leadership skills.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Created at the Taxila Business School, this simulation moves beyond simple choices into a complex ecosystem 
                of interconnected variables. Your decisions in one department will have cascading effects across the entire organization.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-l-4 border-purple-500">
              <h3 className="text-2xl font-semibold text-purple-600 mb-4">Your Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Your goal is not just to survive, but to <strong>thrive</strong>. You must navigate complex business challenges, 
                make strategic decisions, and lead your company to sustained success over a 10-year tenure.
              </p>
            </div>
          </div>
        );

      case 'objective':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Your Objective
            </h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border-l-4 border-blue-500">
              <h3 className="text-2xl font-semibold text-blue-600 mb-4">Primary Goal</h3>
              <p className="text-gray-700 leading-relaxed">
                Successfully lead Apex Innovations for a <strong>10-year tenure</strong>. Success is measured by your 
                <strong> Leadership Score</strong>, a holistic metric that evaluates your performance across four key pillars:
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <KPICard 
                icon="💰" 
                title="Financial Health" 
                description="Your ability to manage profits, cash flow, and debt effectively"
                gradient="from-green-500 to-emerald-600"
              />
              <KPICard 
                icon="📈" 
                title="Market Position" 
                description="Your dominance in the market through market share and brand reputation"
                gradient="from-blue-500 to-cyan-600"
              />
              <KPICard 
                icon="⚙️" 
                title="Operational Excellence" 
                description="The quality of your products and the efficiency of your supply chain"
                gradient="from-purple-500 to-pink-600"
              />
              <KPICard 
                icon="👥" 
                title="Human Capital" 
                description="The morale and skill level of your workforce"
                gradient="from-orange-500 to-red-600"
              />
            </div>

            <WarningBox title="Performance Benchmarks">
              <p>The board of directors has set strict performance benchmarks. Failure to meet these minimums will result in your immediate termination!</p>
            </WarningBox>
          </div>
        );

      case 'annual-cycle':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              The Annual Cycle
            </h2>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border-l-4 border-gray-500">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">A Year in Your Life as CEO</h3>
              <p className="text-gray-700 leading-relaxed">Each year in the simulation is divided into three key phases:</p>
            </div>

            <div className="space-y-6">
              <CycleStep 
                number="1"
                title="Annual Budget Allocation"
                description="At the start of the year, you allocate your available cash to the five core departments: R&D, Marketing, Operations, HR, and Finance."
              />
              <CycleStep 
                number="2"
                title="Departmental & CapEx Planning"
                description="Break down high-level budgets for Marketing, Operations, and HR into specific sub-categories. Make long-term Capital Expenditure (CapEx) decisions for factory expansion and automation."
              />
              <CycleStep 
                number="3"
                title="Action Phase & Year-End"
                description="Set your product price, fund specific R&D projects, and manage corporate finances (loans, share actions). End the year and see the results of your decisions."
              />
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Understanding Your Company
            </h2>
            
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 p-8 rounded-2xl border-l-4 border-slate-500">
              <h3 className="text-2xl font-semibold text-slate-700 mb-6">Primary KPIs (Dashboard)</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <KPICard icon="🎯" title="Leadership Score" description="Ultimate measure of performance, rated out of 100" />
                <KPICard icon="💎" title="Company Valuation" description="Total worth based on cash, assets, stock performance, and market position" />
                <KPICard icon="💵" title="Cash" description="Your liquid assets. Running out means bankruptcy!" gradient="from-green-500 to-teal-600" />
                <KPICard icon="⚠️" title="Debt" description="Total amount owed. High debt is risky and incurs interest" gradient="from-red-500 to-orange-600" />
                <KPICard icon="📊" title="Stock Price" description="Reflects market confidence in your company" gradient="from-blue-500 to-indigo-600" />
                <KPICard icon="🌍" title="Economy" description="Global economic state affecting market growth and interest rates" gradient="from-purple-500 to-pink-600" />
              </div>
            </div>

            <WarningBox title="Critical Termination Thresholds">
              <ul className="space-y-2 text-sm">
                <li><strong>Market Share:</strong> Must stay above 35%</li>
                <li><strong>Quality:</strong> Must maintain above 60</li>
                <li><strong>Brand Reputation:</strong> Must keep above 60</li>
                <li><strong>Employee Skill Level:</strong> Cannot drop below 60</li>
                <li><strong>Supply Chain Stability:</strong> Must remain above 75%</li>
              </ul>
            </WarningBox>
          </div>
        );

      case 'departments':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Departmental Strategy
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <DepartmentCard 
                title="🔬 R&D (Research & Development)"
                content={
                  <div>
                    <p><strong>Budget Impact:</strong> Determines likelihood of research project progression</p>
                    <p className="mt-2"><strong>Key Actions:</strong> Fund multi-year projects for quality breakthroughs, cost reduction, and brand improvement</p>
                  </div>
                }
              />
              
              <DepartmentCard 
                title="📢 Marketing"
                content={
                  <div>
                    <p><strong>Brand Awareness Budget:</strong> Directly contributes to Brand Reputation</p>
                    <p className="mt-2"><strong>Digital Campaigns Budget:</strong> Creates Digital Multiplier for market penetration</p>
                  </div>
                }
              />
              
              <DepartmentCard 
                title="⚙️ Operations"
                content={
                  <div>
                    <p><strong>Quality Control:</strong> Primary driver for Product Quality</p>
                    <p className="mt-2"><strong>Process Efficiency:</strong> Reduces unit costs and improves supply chain</p>
                    <p className="mt-2"><strong>CapEx:</strong> Factory expansion and automation investments</p>
                  </div>
                }
              />
              
              <DepartmentCard 
                title="👥 HR (Human Resources)"
                content={
                  <div>
                    <p><strong>Employee Training:</strong> Directly increases workforce Skill Level</p>
                    <p className="mt-2"><strong>Salaries & Benefits:</strong> Most effective way to improve Employee Morale</p>
                  </div>
                }
              />
              
              <DepartmentCard 
                title="💼 Finance"
                content={
                  <div>
                    <p className="mb-2"><strong>Key Actions:</strong></p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>Take/Repay loans (3-year deadline)</li>
                      <li>Share buyback (boosts stock price)</li>
                      <li>Issue shares (max $100M/year)</li>
                    </ul>
                  </div>
                }
              />
              
              <DepartmentCard 
                title="💡 Critical Pricing Strategy"
                content={
                  <p><strong>Product Price Setting:</strong> Balance between profit margin and market demand. This decision significantly impacts your sales volume and profitability.</p>
                }
                gradient="from-yellow-50 to-orange-50"
              />
            </div>
          </div>
        );

      case 'save-load':
        return (
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Save & Load
            </h2>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border-l-4 border-green-500">
              <h3 className="text-2xl font-semibold text-green-600 mb-4">Managing Your Progress</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You can save your simulation progress at any time using the <strong>"Save Simulation"</strong> button on the main game screen.
              </p>
              <p className="text-gray-700 leading-relaxed">
                On the welcome screen, you can view and load any of your previous sessions to continue your progress from where you left off.
              </p>
            </div>
            
            <KPICard 
              icon="💾" 
              title="Pro Tip" 
              description="Save frequently, especially before making major strategic decisions. This allows you to experiment with different approaches and learn from various outcomes."
              gradient="from-cyan-500 to-blue-600"
            />

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border-l-4 border-purple-500 text-center">
              <h3 className="text-2xl font-semibold text-purple-600 mb-4">Good Luck, CEO!</h3>
              <p className="text-gray-700 leading-relaxed">
                The future of Apex Innovations is in your hands. Use this guide as your strategic companion, 
                make informed decisions, and lead your company to unprecedented success!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center bg-white/90 backdrop-blur-sm p-12 mb-8 rounded-3xl shadow-2xl border border-white/20">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            TAXILA LEADERSHIP CHALLENGE
          </h1>
          <p className="text-xl text-gray-600 font-light">Master the Art of Strategic Business Leadership</p>
        </div>

        {/* Navigation */}
        <nav className="sticky top-4 z-50 bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20 mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {sections.map((section) => (
              <NavigationButton
                key={section.id}
                section={section}
                isActive={activeSection === section.id}
                onClick={() => setActiveSection(section.id)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <ChevronLeft size={16} />
              Use arrow keys to navigate
              <ChevronRight size={16} />
            </span>
          </div>
        </nav>

        {/* Content */}
        <div className="bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-white/20">
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxilaInstructions;