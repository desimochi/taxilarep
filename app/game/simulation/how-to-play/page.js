"use client"
import { useState, useEffect } from 'react';
import { Factory, DollarSign, TrendingUp, Users, Truck, BarChart3, Building2, Target, Clock, Award, Play, ArrowRight, Zap, Droplets, Wind, Link } from 'lucide-react';import { useRouter } from 'next/navigation';
;

const TaxilaStartupChallenge = () => {
  const [activeTab, setActiveTab] = useState('production');
  const [currentDay, setCurrentDay] = useState(1);
const router  = useRouter()
function handleClick(){
  router.push('/game/simulation')
}
  const gameFeatures = [
    { icon: Factory, title: "Manufacturing Plants", desc: "Build Air Purifiers, Water Purifiers, and Inverters" },
    { icon: DollarSign, title: "₹1 Crore Capital", desc: "Start with 1,00,00,000 rupees initial investment" },
    { icon: Clock, title: "90-Day Challenge", desc: "Build your empire in 90 simulated business days" },
    { icon: TrendingUp, title: "Strategic Growth", desc: "Balance aggressive expansion with financial stability" }
  ];

  const gameplayTabs = [
    { id: 'production', icon: Factory, title: 'Production', color: 'from-blue-500 to-blue-600' },
    { id: 'costing', icon: DollarSign, title: 'Costing', color: 'from-green-500 to-green-600' },
    { id: 'supply', icon: Truck, title: 'Supply Chain', color: 'from-purple-500 to-purple-600' },
    { id: 'sales', icon: BarChart3, title: 'Sales Channels', color: 'from-red-500 to-red-600' },
    { id: 'hr', icon: Users, title: 'HR', color: 'from-yellow-500 to-yellow-600' },
    { id: 'finance', icon: Building2, title: 'Finance', color: 'from-indigo-500 to-indigo-600' },
    { id: 'marketing', icon: Target, title: 'Marketing', color: 'from-pink-500 to-pink-600' }
  ];

  const tabContent = {
    production: {
      title: "Manufacturing & Production",
      points: [
        "View and manage your manufacturing plants",
        "Set daily production targets for each product line",
        "Monitor plant capacity and operational status",
        "Plants take 2 days to become operational",
        "Requires sufficient workers to meet production targets"
      ]
    },
    costing: {
      title: "Quality & Cost Management",
      points: [
        "Adjust quality levels for your products",
        "Higher quality increases material costs but boosts sales",
        "Lower quality saves money but may reduce demand",
        "Balance cost efficiency with market competitiveness"
      ]
    },
    supply: {
      title: "Logistics & Warehousing",
      points: [
        "Manage warehouse space in operational cities",
        "Ship goods from Jaipur factory to city warehouses",
        "Calculate shipping costs based on distance and volume",
        "Goods take several days to arrive based on distance",
        "Monitor inventory levels across all locations"
      ]
    },
    sales: {
      title: "Distribution Network",
      points: [
        "Expand business into new cities across different zones",
        "Appoint distributors and retailers in each market",
        "Set competitive retail prices and profit margins",
        "Requires sales officers to manage distributors",
        "Lock-in daily prices to enable sales simulation"
      ]
    },
    hr: {
      title: "Human Resources",
      points: [
        "Hire workers essential for manufacturing",
        "Recruit sales officers to manage distribution zones",
        "Assign sales officers to specific zones for effectiveness",
        "Manage workforce across all departments",
        "Balance hiring costs with operational needs"
      ]
    },
    finance: {
      title: "Financial Management",
      points: [
        "Apply for loans when additional capital is needed",
        "Monitor daily profit & loss statements",
        "Track balance sheet with assets and liabilities",
        "Manage loan repayments to avoid penalties",
        "Maintain positive cash flow to stay in business"
      ]
    },
    marketing: {
      title: "Market Intelligence",
      points: [
        "Analyze competitor pricing and market share",
        "Monitor market trends for strategic decisions",
        "Bid on institutional bulk orders for extra revenue",
        "Track your market presence and competitive position"
      ]
    }
  };

  const scoringFactors = [
    { factor: "Sales Revenue", weight: "40%", desc: "Total cumulative revenue from all products", icon: DollarSign },
    { factor: "Profitability", weight: "50%", desc: "Retained earnings and accumulated profits", icon: TrendingUp },
    { factor: "Scale", weight: "10%", desc: "Number of different product plants built", icon: Factory }
  ];

  const products = [
    { name: "Air Purifiers", icon: Wind, color: "from-cyan-400 to-blue-500" },
    { name: "Water Purifiers", icon: Droplets, color: "from-blue-400 to-indigo-500" },
    { name: "Inverters", icon: Zap, color: "from-yellow-400 to-orange-500" }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-500 to-red-800 bg-clip-text text-transparent">
              Taxila Start-up Challenge
            </h1>
            <p className="text-xl  text-gray-800 mb-8">
              Build Your Manufacturing Empire in 90 Days
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
              {gameFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-3">
                    <Icon className="w-5 md:w-6 h-5 md:h-6 text-blue-800" />
                    <span className="font-semibold text-sm md:text-base">{feature.title}</span>
                  </div>
                );
              })}
            </div>
            <button onClick={handleClick} className="group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="flex items-center gap-3">
                <Play className="w-5 md:w-6 h-5 md:h-6" />
                Start Your Journey
                <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Products Showcase */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {products.map((product, index) => {
              const Icon = product.icon;
              return (
                <div key={index} className={`relative bg-gradient-to-br ${product.color} p-6 md:p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500`}>
                  <div className="text-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 md:w-10 h-8 md:h-10 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{product.name}</h3>
                    <p className="text-white/80 text-sm md:text-base">Manufacturing Plant Option</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Game Dashboard Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Your Command Center</h2>
            <p className="text-lg md:text-xl text-gray-600">Navigate through different departments to manage your business empire</p>
          </div>

          {/* Mock Dashboard */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden">
            {/* Dashboard Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 text-white">
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold">Day {currentDay}</div>
                  <div className="text-xs md:text-sm opacity-80">of 90</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold">₹85,42,000</div>
                  <div className="text-xs md:text-sm opacity-80">Cash Balance</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold">₹15,00,000</div>
                  <div className="text-xs md:text-sm opacity-80">Loan Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-green-300">+₹2,34,000</div>
                  <div className="text-xs md:text-sm opacity-80">Daily Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold">12.4%</div>
                  <div className="text-xs md:text-sm opacity-80">Market Share</div>
                </div>
                <div className="text-center">
                  <div className="text-lg md:text-2xl font-bold text-yellow-300">8,245</div>
                  <div className="text-xs md:text-sm opacity-80">Overall Score</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap bg-gray-800 border-b border-gray-700">
              {gameplayTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 md:gap-3 px-3 md:px-6 py-3 md:py-4 transition-all duration-300 text-sm md:text-base ${
                      isActive 
                        ? `bg-gradient-to-r ${tab.color} text-white` 
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-4 md:w-5 h-4 md:h-5" />
                    <span className="font-medium hidden sm:inline">{tab.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8 text-white bg-gray-900">
              <h3 className="text-xl md:text-2xl font-bold mb-6">{tabContent[activeTab].title}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-blue-300">Key Features:</h4>
                  <ul className="space-y-3">
                    {tabContent[activeTab].points.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 text-sm md:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border border-indigo-700/30">
                  <div className="text-center">
                    <div className="mb-4">
                      {(() => {
                        const IconComponent = gameplayTabs.find(t => t.id === activeTab)?.icon || Factory;
                        return <IconComponent className="w-12 md:w-16 h-12 md:h-16 mx-auto text-blue-400" />;
                      })()}
                    </div>
                    <p className="text-gray-300 text-sm md:text-base">
                      Master this department to build a successful manufacturing empire
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scoring System */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">How Victory is Measured</h2>
            <p className="text-lg md:text-xl text-gray-600">Your Overall Score is calculated from three key performance indicators</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {scoringFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full w-16 md:w-20 h-16 md:h-20 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 md:w-10 h-8 md:h-10 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">{factor.factor}</h3>
                    <div className="text-3xl md:text-4xl font-bold text-indigo-600 mb-4">{factor.weight}</div>
                    <p className="text-gray-600 text-sm md:text-base">{factor.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl inline-block">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Winning Strategy</h3>
              <p className="text-base md:text-lg text-gray-600 max-w-2xl">
                Balance aggressive growth with financial stability. Build multiple product lines, 
                maximize profitability, and scale your operations across different markets to achieve the highest overall score.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Build Your Empire?</h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Start with ₹1 crore, make strategic decisions across 7 departments, 
            and transform your startup into a manufacturing powerhouse in just 90 days.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center mb-8">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-3">
              <Award className="w-5 md:w-6 h-5 md:h-6 text-yellow-300" />
              <span className="text-sm md:text-base">Compete for the highest score</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-3">
              <Clock className="w-5 md:w-6 h-5 md:h-6 text-blue-300" />
              <span className="text-sm md:text-base">90-day business simulation</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 md:px-6 py-3">
              <TrendingUp className="w-5 md:w-6 h-5 md:h-6 text-green-300" />
              <span className="text-sm md:text-base">Real business challenges</span>
            </div>
          </div>

          <button onClick={handleClick} className="group bg-white text-indigo-600 px-8 md:px-10 py-3 md:py-4 rounded-full text-lg md:text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-white/20">
            <div className="flex items-center gap-3">
              <Play className="w-5 md:w-6 h-5 md:h-6" />
              Launch Your Startup
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          <p className="mt-6 text-blue-200 text-sm">
            Experience the thrill of entrepreneurship in a risk-free environment
          </p>
        </div>
      </section>
    </div>
  );
};

export default TaxilaStartupChallenge;