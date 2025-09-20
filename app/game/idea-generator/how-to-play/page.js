"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Eye, Lightbulb, Target, Timer, Zap, Trophy, AlertTriangle } from 'lucide-react';

const InnovationAcademyManual = () => {
  const [expandedSections, setExpandedSections] = useState({});
  
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const CollapsibleSection = ({ id, title, icon: Icon, children, defaultExpanded = false }) => {
    const isExpanded = expandedSections[id] ?? defaultExpanded;
    
    return (
      <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-between hover:from-blue-700 hover:to-purple-700 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Icon className="w-6 h-6" />
            <h2 className="text-xl font-bold">{title}</h2>
          </div>
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </button>
        
        {isExpanded && (
          <div className="p-6">
            {children}
          </div>
        )}
      </div>
    );
  };

  const StatCard = ({ label, value, description, color = "blue" }) => (
    <div className={`bg-${color}-50 border-l-4 border-${color}-500 p-4 rounded-r-lg`}>
      <div className="flex items-center justify-between">
        <h4 className={`font-semibold text-${color}-800`}>{label}</h4>
        <span className={`text-2xl font-bold text-${color}-600`}>{value}</span>
      </div>
      <p className={`text-sm text-${color}-700 mt-1`}>{description}</p>
    </div>
  );

  const NodeType = ({ type, color, description }) => (
    <div className="flex items-center space-x-3 mb-3">
      <div className={`w-6 h-6 rounded-full bg-${color}-500 shadow-lg`}></div>
      <div>
        <span className="font-semibold">{type}:</span>
        <span className="ml-2 text-gray-700">{description}</span>
      </div>
    </div>
  );

  const RankBadge = ({ rank, score, color }) => (
    <div className={`bg-${color}-100 border border-${color}-300 rounded-lg p-3 text-center`}>
      <div className={`text-${color}-800 font-bold text-lg`}>{rank}</div>
      <div className={`text-${color}-600 text-sm`}>{score} points</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Innovation Academy
          </h1>
          <p className="text-xl text-gray-600 mb-2">Player's Manual</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-700 max-w-2xl mx-auto">
            Welcome, aspiring innovator! Your journey from curious observer to master of creation begins here. 
            Solve complex challenges by combining ideas and achieve the rank of <span className="font-bold text-purple-600">Great Innovator</span>.
          </p>
        </div>

        {/* Phase 1: The Observer */}
        <CollapsibleSection id="phase1" title="Phase 1: The Observer" icon={Eye} defaultExpanded={true}>
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-bold text-green-800 mb-2 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Your Objective
              </h3>
              <p className="text-green-700">
                Watch the simulation until at least <span className="font-bold">50 ideas</span> have been generated. 
                This will unlock the next phase.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Understanding the Interface</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Simulation Canvas</h4>
                  <p className="text-gray-600 text-sm mb-4">Main screen where ideas (nodes) appear and form connections</p>
                  
                  <div className="space-y-2">
                    <NodeType type="Green Nodes" color="green" description="Foundational base concepts" />
                    <NodeType type="Blue Nodes" color="blue" description="New ideas from combinations" />
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <p className="text-sm text-yellow-800">
                      <span className="font-semibold">Node Size & Glow:</span> Larger nodes have more influence and begin to glow
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Control Panel</h4>
                  <div className="space-y-3">
                    <div className="border-l-3 border-blue-400 pl-3">
                      <p className="font-medium text-gray-700">Simulation Controls</p>
                      <p className="text-sm text-gray-600">Start/Stop automatic generation, Reset canvas</p>
                    </div>
                    <div className="border-l-3 border-purple-400 pl-3">
                      <p className="font-medium text-gray-700">Generation Speed</p>
                      <p className="text-sm text-gray-600">Slider to control idea creation speed</p>
                    </div>
                    <div className="border-l-3 border-green-400 pl-3">
                      <p className="font-medium text-gray-700">Add Your Concept</p>
                      <p className="text-sm text-gray-600">Type and add your own base concepts</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-3">Creativity Models</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white rounded-lg p-3 mb-2">
                      <p className="font-bold">Combinatorial</p>
                      <p className="text-sm">A + B → C</p>
                    </div>
                    <p className="text-sm text-blue-700">Combines two different ideas</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-600 text-white rounded-lg p-3 mb-2">
                      <p className="font-bold">Exploratory</p>
                      <p className="text-sm">A → A'</p>
                    </div>
                    <p className="text-sm text-purple-700">Creates variations of one idea</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-600 text-white rounded-lg p-3 mb-2">
                      <p className="font-bold">Hybrid</p>
                      <p className="text-sm">Mix</p>
                    </div>
                    <p className="text-sm text-green-700">Randomly uses both models</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Phase 2: IdeaCraft Challenge */}
        <CollapsibleSection id="phase2" title="Phase 2: The IdeaCraft Challenge" icon={Lightbulb}>
          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-bold text-orange-800 mb-2 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Your Objective
              </h3>
              <p className="text-orange-700">
                Solve innovation problems by creating new ideas that meet specific requirements for 
                <span className="font-bold"> Novelty</span>, <span className="font-bold">Feasibility</span>, 
                and <span className="font-bold">Impact</span>.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Interface Components</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Workbench (Top)</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• <span className="font-medium">Idea Slots:</span> Select two ideas from Mindscape</li>
                      <li>• <span className="font-medium">Preview Area:</span> Shows potential combination outcome</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">Mindscape (Bottom Left)</h4>
                    <p className="text-sm text-green-700">Your library of all available ideas to combine</p>
                  </div>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-2">Objective & Resources (Bottom Right)</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• <span className="font-medium">Objective Card:</span> Current problem and minimum scores needed</li>
                    <li>• <span className="font-medium">Resource Displays:</span> Cognitive Energy, Innovation Score, Rank, Timer</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Gameplay Rules</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">1</div>
                    <h4 className="font-semibold mb-1">Select & Combine</h4>
                    <p className="text-sm text-gray-600">Click two idea cards from Mindscape</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">2</div>
                    <h4 className="font-semibold mb-1">Preview Outcome</h4>
                    <p className="text-sm text-gray-600">Costs 10 Cognitive Energy</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-2 font-bold">3</div>
                    <h4 className="font-semibold mb-1">Create Idea</h4>
                    <p className="text-sm text-gray-600">Rewards +10 Cognitive Energy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Scoring and Resources */}
        <CollapsibleSection id="scoring" title="Scoring and Resources" icon={Zap}>
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="font-bold text-red-800 mb-3 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Cognitive Energy - CRUCIAL RULES
              </h3>
              <div className="space-y-2 text-red-700">
                <p>• Starts at 0, capped at 100</p>
                <p>• If energy hits 0: <span className="font-bold">5-minute recharge</span> to 80 (ONCE only)</p>
                <p>• If energy hits 0 a <span className="font-bold">second time</span>: Game Over</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Innovation Score System</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <StatCard 
                  label="Solve Objective" 
                  value="+15" 
                  description="Create idea that meets requirements"
                  color="green"
                />
                <StatCard 
                  label="Valid but Wrong" 
                  value="-2" 
                  description="Idea doesn't solve objective"
                  color="yellow"
                />
                <StatCard 
                  label="Duplicate Idea" 
                  value="-5" 
                  description="Idea already exists"
                  color="red"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Innovation Ranks</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <RankBadge rank="Dumbo" score="0-20" color="gray" />
                <RankBadge rank="Novice Thinker" score="21-40" color="blue" />
                <RankBadge rank="Idea Assembler" score="41-60" color="green" />
                <RankBadge rank="Creative Strategist" score="61-89" color="purple" />
                <RankBadge rank="Great Innovator" score="90-100" color="yellow" />
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Win/Lose Conditions */}
        <CollapsibleSection id="conditions" title="Winning and Losing" icon={Trophy}>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-800 mb-3 flex items-center">
                <Trophy className="w-6 h-6 mr-2" />
                Win Condition
              </h3>
              <p className="text-green-700">
                Reach an <span className="font-bold">Innovation Score of 100</span>. 
                A Finish Challenge button will appear to end the game early and record your time.
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-bold text-red-800 mb-3 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2" />
                Lose Conditions
              </h3>
              <div className="space-y-2 text-red-700">
                <p>1. The <span className="font-bold">1-hour timer</span> runs out</p>
                <p>2. Your <span className="font-bold">Cognitive Energy hits zero</span> for the second time</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Good Luck, Innovator!</h3>
            <p className="text-gray-600 text-lg">May your ideas be brilliant! 💡</p>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default InnovationAcademyManual;