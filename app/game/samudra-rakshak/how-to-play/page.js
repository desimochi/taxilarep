"use client"
import { useState } from 'react';
import { ChevronDown, ChevronUp, Trophy, DollarSign, Heart, Clock, Eye, Anchor, FlaskConical, Pause, TrendingUp, Shield, AlertTriangle, Skull } from 'lucide-react';

const InstructionPage = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const CollapsibleSection = ({ id, title, icon: Icon, children, defaultOpen = false }) => {
    const isOpen = activeSection === id || (activeSection === null && defaultOpen);
    
    return (
      <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden mb-6 transition-all duration-300 hover:shadow-xl">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all duration-300"
        >
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          </div>
          {isOpen ? <ChevronUp className="w-5 h-5 text-blue-600" /> : <ChevronDown className="w-5 h-5 text-blue-600" />}
        </button>
        {isOpen && (
          <div className="p-6 bg-white">
            {children}
          </div>
        )}
      </div>
    );
  };

  const ActionCard = ({ icon: Icon, title, cost, description, color = "blue" }) => (
    <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 p-4 rounded-lg border border-${color}-200 hover:shadow-lg transition-all duration-300`}>
      <div className="flex items-center space-x-3 mb-3">
        <Icon className={`w-6 h-6 text-${color}-600`} />
        <h4 className="font-semibold text-gray-800">{title}</h4>
        {cost && <span className={`px-2 py-1 bg-${color}-200 text-${color}-800 text-sm rounded-full`}>{cost}</span>}
      </div>
      <p className="text-gray-700 text-sm">{description}</p>
    </div>
  );

  const StatCard = ({ icon: Icon, title, value, description, color = "blue" }) => (
    <div className={`bg-gradient-to-br from-${color}-50 to-${color}-100 p-4 rounded-lg text-center border border-${color}-200`}>
      <Icon className={`w-8 h-8 text-${color}-600 mx-auto mb-2`} />
      <h4 className="font-bold text-gray-800 mb-1">{title}</h4>
      <div className={`text-2xl font-bold text-${color}-700 mb-1`}>{value}</div>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              🌊 Samudra Rakshak
            </h1>
            <p className="text-2xl mb-6 text-blue-200">Strategic Marine Wealth Management</p>
            <div className="bg-blue-800/50 backdrop-blur-sm rounded-xl p-6 inline-block">
              <p className="text-lg mb-2"><strong>Welcome, Nayak!</strong></p>
              <p className="text-blue-200">Lead a maritime enterprise for 20 turns, balancing economic growth with ocean preservation.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={DollarSign} 
            title="Starting Budget" 
            value="₹100L" 
            description="Initial capital"
            color="green"
          />
          <StatCard 
            icon={Clock} 
            title="Time Limit" 
            value="35min" 
            description="Total game time"
            color="orange"
          />
          <StatCard 
            icon={Trophy} 
            title="Turns" 
            value="20" 
            description="Maximum turns"
            color="purple"
          />
          <StatCard 
            icon={Heart} 
            title="Ocean Health" 
            value="100%" 
            description="Starting condition"
            color="blue"
          />
        </div>

        {/* Collapsible Sections */}
        <CollapsibleSection id="objective" title="The Objective: Perfect Score" icon={Trophy} defaultOpen={true}>
          <div className="space-y-4">
            <p className="text-gray-700 text-lg mb-6">Achieve the highest possible score out of <strong className="text-blue-600">100 points</strong> across four key areas:</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg border border-green-200">
                <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-bold text-green-800 mb-2">Financial Health</h4>
                <div className="text-3xl font-bold text-green-700 mb-2">50pts</div>
                <p className="text-sm text-gray-600">Final Budget + Total Revenue</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-lg border border-blue-200">
                <Heart className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-bold text-blue-800 mb-2">Environmental</h4>
                <div className="text-3xl font-bold text-blue-700 mb-2">40pts</div>
                <p className="text-sm text-gray-600">Final Ocean Health</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-yellow-100 p-4 rounded-lg border border-orange-200">
                <Clock className="w-8 h-8 text-orange-600 mb-3" />
                <h4 className="font-bold text-orange-800 mb-2">Time Efficiency</h4>
                <div className="text-3xl font-bold text-orange-700 mb-2">10pts</div>
                <p className="text-sm text-gray-600">Time remaining bonus</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-lg border border-purple-200">
                <Trophy className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-bold text-purple-800 mb-2">Total Score</h4>
                <div className="text-3xl font-bold text-purple-700 mb-2">100pts</div>
                <p className="text-sm text-gray-600">Maximum possible</p>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="ocean" title="Understanding the Ocean" icon={Eye}>
          <div className="space-y-6">
            <p className="text-gray-700">The ocean is represented as a <strong>10×10 3D grid</strong>. Each sector has hidden properties revealed when explored:</p>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg border border-green-200">
                <div className="text-2xl mb-3">🐟</div>
                <h4 className="font-bold text-green-800 mb-2">Resources</h4>
                <p className="text-sm text-gray-700">Marine life density that determines harvesting revenue potential.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-indigo-100 p-4 rounded-lg border border-purple-200">
                <div className="text-2xl mb-3">🔬</div>
                <h4 className="font-bold text-purple-800 mb-2">Discovery Potential</h4>
                <p className="text-sm text-gray-700">Chance for scientific breakthroughs and significant budget bonuses.</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-orange-100 p-4 rounded-lg border border-red-200">
                <div className="text-2xl mb-3">⚠️</div>
                <h4 className="font-bold text-red-800 mb-2">Sensitivity</h4>
                <p className="text-sm text-gray-700">Ecological fragility - harvesting causes more Ocean Health damage.</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
              <h4 className="font-bold text-blue-800 mb-2">🗺️ Ocean Maps</h4>
              <p className="text-gray-700">Each game features a unique map: Rich Coral Reef, Deep Ocean Trench, Scattered Islands, or Uncharted Territory.</p>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="gameplay" title="How to Play" icon={Anchor}>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg border border-blue-200">
              <h4 className="font-bold text-blue-800 mb-4">Each Turn (3 Simple Steps):</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">1</div>
                  <h5 className="font-semibold text-gray-800 mb-2">Select Sector</h5>
                  <p className="text-sm text-gray-600">Click on any sector in the 3D grid</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">2</div>
                  <h5 className="font-semibold text-gray-800 mb-2">Choose Action</h5>
                  <p className="text-sm text-gray-600">Select what your fleet will do</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">3</div>
                  <h5 className="font-semibold text-gray-800 mb-2">Confirm & End</h5>
                  <p className="text-sm text-gray-600">Execute command and move to next turn</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-bold text-yellow-800 mb-2">🖱️ Controls</h4>
              <p className="text-gray-700"><strong>Click & Drag:</strong> Rotate the 3D view | <strong>Mouse Wheel:</strong> Zoom in/out</p>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="actions" title="Fleet Actions" icon={Anchor}>
          <div className="grid md:grid-cols-2 gap-4">
            <ActionCard
              icon={Eye}
              title="Explore"
              cost="₹5L"
              description="Essential first step! Reveals Resources, Sensitivity, and Discovery Potential. Required before Harvesting or Research."
              color="blue"
            />
            
            <ActionCard
              icon={DollarSign}
              title="Harvest"
              cost="Generates Income"
              description="Primary income source. Revenue depends on resources and Fleet Tech level. Always impacts Ocean Health."
              color="green"
            />
            
            <ActionCard
              icon={FlaskConical}
              title="Research"
              cost="₹8L"
              description="Available in sectors with Discovery Potential. Chance for breakthroughs and large budget bonuses."
              color="purple"
            />
            
            <ActionCard
              icon={Pause}
              title="Idle"
              cost="No Cost"
              description="Keep fleet idle for a turn. Useful when saving money or unable to make strategic moves."
              color="gray"
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="upgrades" title="Capital Investments" icon={TrendingUp}>
          <div className="space-y-4">
            <p className="text-gray-700 mb-6">Make crucial long-term investments to enhance your operations. Costs increase with each purchase.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg border border-green-200">
                <TrendingUp className="w-8 h-8 text-green-600 mb-4" />
                <h4 className="font-bold text-green-800 mb-3">Upgrade Fleet Tech</h4>
                <p className="text-gray-700 mb-4">Increases harvesting efficiency and revenue generation from the same amount of resources.</p>
                <div className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">💰 Higher Revenue</div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-6 rounded-lg border border-blue-200">
                <Shield className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="font-bold text-blue-800 mb-3">Sustainable Methods</h4>
                <p className="text-gray-700 mb-4">Reduces environmental damage during harvesting, protecting Ocean Health and your score.</p>
                <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block">🌊 Ocean Protection</div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection id="winning" title="Victory & Defeat Conditions" icon={Trophy}>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 p-6 rounded-lg border border-green-200">
              <Trophy className="w-8 h-8 text-green-600 mb-4" />
              <h4 className="font-bold text-green-800 mb-3">🎉 Victory Conditions</h4>
              <p className="text-gray-700">The simulation ends successfully after <strong>20 turns</strong> or when the <strong>35-minute timer</strong> runs out. Your performance is judged by your final score in a detailed report.</p>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-orange-100 p-6 rounded-lg border border-red-200">
              <AlertTriangle className="w-8 h-8 text-red-600 mb-4" />
              <h4 className="font-bold text-red-800 mb-3">💀 Defeat Conditions</h4>
              <p className="text-gray-700 mb-4">Your mission ends prematurely if:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-100 p-4 rounded-lg border border-red-300">
                  <Skull className="w-6 h-6 text-red-700 mb-2" />
                  <h5 className="font-semibold text-red-800">Bankruptcy</h5>
                  <p className="text-sm text-red-700">Budget drops to ₹0L or below</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg border border-red-300">
                  <AlertTriangle className="w-6 h-6 text-red-700 mb-2" />
                  <h5 className="font-semibold text-red-800">Ecosystem Collapse</h5>
                  <p className="text-sm text-red-700">Ocean Health drops to 0%</p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Final Message */}
        <div className="bg-gradient-to-r from-blue-800 to-cyan-800 text-white p-8 rounded-xl text-center mt-8">
          <h3 className="text-2xl font-bold mb-4">🌊 Good Luck, Nayak! 🌊</h3>
          <p className="text-blue-200 text-lg">The future of the ocean is in your hands.</p>
          <div className="mt-6 text-sm text-blue-300">
            <p>Created at Taxila Business School, Jaipur</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionPage;