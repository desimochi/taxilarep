"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Target, TrendingUp, Search, Settings, Shield, Zap, Globe, Users, CheckCircle } from 'lucide-react';

const SixSigmaFacultyManual = () => {
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
          className="w-full px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-700 text-white flex items-center justify-between hover:from-blue-800 hover:to-indigo-800 transition-colors"
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

  const ConceptCard = ({ title, description, color = "blue" }) => (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4`}>
      <h4 className={`font-bold text-${color}-800 mb-2`}>{title}</h4>
      <p className={`text-${color}-700 text-sm`}>{description}</p>
    </div>
  );

  const DMAICPhase = ({ phase, description, simulationEquivalent, exercise = null, color = "blue" }) => (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-5 mb-4`}>
      <div className="flex items-center mb-3">
        <div className={`bg-${color}-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm mr-3`}>
          {phase[0]}
        </div>
        <h4 className={`font-bold text-${color}-800 text-lg`}>{phase}</h4>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5 className={`font-semibold text-${color}-800 mb-2`}>Six Sigma Phase:</h5>
          <p className={`text-${color}-700 text-sm`}>{description}</p>
        </div>
        <div>
          <h5 className={`font-semibold text-${color}-800 mb-2`}>Simulation Equivalent:</h5>
          <p className={`text-${color}-700 text-sm`}>{simulationEquivalent}</p>
        </div>
      </div>
      
      {exercise && (
        <div className={`mt-4 p-3 bg-${color}-100 border border-${color}-300 rounded`}>
          <h5 className={`font-semibold text-${color}-800 mb-1`}>Exercise:</h5>
          <p className={`text-${color}-700 text-sm`}>{exercise}</p>
        </div>
      )}
    </div>
  );

  const ProcessAnalogy = ({ label, description }) => (
    <div className="flex items-start space-x-3 mb-3">
      <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-1">
        •
      </div>
      <div>
        <span className="font-semibold text-indigo-800">{label}:</span>
        <span className="ml-2 text-gray-700">{description}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent mb-4">
            Six Sigma Simulation
          </h1>
          <p className="text-xl text-gray-600 mb-2">Faculty Manual</p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full mb-4"></div>
          <p className="text-lg font-semibold text-indigo-700 mb-2">A Visual Tool for Teaching Six Sigma Principles</p>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Transform abstract Six Sigma theory into tangible, visual learning experiences using the 
            Cosmic Gravity Simulation as a powerful metaphorical teaching tool.
          </p>
        </div>

        {/* Introduction */}
        <CollapsibleSection id="introduction" title="Introduction: Beyond the Game" icon={BookOpen} defaultExpanded={true}>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-lg font-semibold text-blue-800">Target Audience</h3>
              </div>
              <p className="text-blue-700 mb-4">
                This manual is designed for <span className="font-bold">instructors and corporate trainers</span> who want to 
                teach Six Sigma methodology through interactive, visual learning.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-bold text-green-800 mb-3">Educational Benefits</h4>
                <ul className="text-green-700 text-sm space-y-2">
                  <li>• Move from abstract theory to tangible results</li>
                  <li>• Intuitive grasp of input variables and process variation</li>
                  <li>• Understanding system complexity visually</li>
                  <li>• Build conceptual foundation before statistical analysis</li>
                </ul>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-bold text-purple-800 mb-3">Learning Approach</h4>
                <ul className="text-purple-700 text-sm space-y-2">
                  <li>• Consequence-free experimentation environment</li>
                  <li>• Fail-fast learning methodology</li>
                  <li>• Visual feedback and immediate results</li>
                  <li>• Strong intuitive mental model building</li>
                </ul>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Core Analogy */}
        <CollapsibleSection id="analogy" title="The Core Analogy: A Process in Motion" icon={Globe}>
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="font-bold text-indigo-800 mb-4">Present the Simulation as a Complex Process</h3>
              <p className="text-indigo-700 mb-4">
                Frame the cosmic gravity simulation as a process management challenge that students need to control and optimize.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <ProcessAnalogy 
                    label="The Process" 
                    description="Creating a stable celestial system"
                  />
                  <ProcessAnalogy 
                    label="The Process Manager" 
                    description="The student/player"
                  />
                  <ProcessAnalogy 
                    label="The Desired Outcome (Y)" 
                    description="A stable, predictable orbit or system"
                  />
                </div>
                <div className="space-y-3">
                  <ProcessAnalogy 
                    label="A Defect" 
                    description="Planet crashing into sun or being ejected from system"
                  />
                  <ProcessAnalogy 
                    label="Six Sigma Goal" 
                    description="Control inputs for 99.99966% defect-free outcomes"
                  />
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-yellow-600 mr-2" />
                <h4 className="font-semibold text-yellow-800">Six Sigma Quality Standard</h4>
              </div>
              <p className="text-yellow-700 text-sm">
                The ultimate goal is to achieve such precise control over the process inputs that 
                stable outcomes occur <span className="font-bold">99.99966% of the time</span> - 
                the hallmark of Six Sigma quality.
              </p>
            </div>
          </div>
        </CollapsibleSection>

        {/* DMAIC Framework */}
        <CollapsibleSection id="dmaic" title="Mapping Simulation to DMAIC Framework" icon={TrendingUp}>
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">DMAIC Overview</h3>
              <p className="text-gray-700 text-sm mb-4">
                Use the simulation's features to walk students through the Six Sigma DMAIC cycle: 
                <span className="font-bold"> Define, Measure, Analyze, Improve, Control</span>
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Define</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">Measure</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">Analyze</span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">Improve</span>
                <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">Control</span>
              </div>
            </div>

            <DMAICPhase
              phase="Define & Measure"
              description="Teams identify project goals and measure key aspects of the current process."
              simulationEquivalent='Use "Creating a Celestial Body" mechanic to identify critical inputs (X\s): Mass (slider), Initial Position (click location), Initial Velocity Vector (drag direction/length).'
              exercise='Ask students to define the goal (e.g., "create a stable orbit at specific distance") and identify the "critical-to-quality" (CTQ) inputs they must measure and control.'
              color="blue"
            />

            <DMAICPhase
              phase="Analyze"
              description="Focus on determining root causes of defects by understanding relationships between inputs and outputs."
              simulationEquivalent='Observation phase using visual "Trails" as built-in process behavior charts. Students analyze how inputs affected outcomes: Why did planet crash? (velocity too low) Why did it fly away? (velocity too high)'
              color="yellow"
            />

            <DMAICPhase
              phase="Improve & Control"
              description="Optimize the process based on analysis (Improve) and maintain gains while preventing reversion (Control)."
              simulationEquivalent='Core gameplay loop where students run "Design of Experiments" (DoE). After failed orbit, students improve by adjusting launch vector. Achieving stable multi-planet system demonstrates process control mastery.'
              color="purple"
            />
          </div>
        </CollapsibleSection>

        {/* Key Concepts */}
        <CollapsibleSection id="concepts" title="Key Six Sigma Concepts Illustrated" icon={Zap}>
          <div className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <TrendingUp className="w-6 h-6 text-red-600 mr-3" />
                  <h4 className="font-bold text-red-800">Variation is the Enemy</h4>
                </div>
                <p className="text-red-700 text-sm mb-3">
                  <span className="font-semibold">Most Powerfully Visualized Concept:</span> A tiny, almost imperceptible 
                  change in launch angle can be the difference between stable orbit and total chaos.
                </p>
                <div className="bg-red-100 border border-red-300 rounded p-3">
                  <p className="text-red-800 text-sm font-medium">
                    💡 Teaching Point: Demonstrates how small process variations lead to massive, undesirable output variations.
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <Globe className="w-6 h-6 text-blue-600 mr-3" />
                  <h4 className="font-bold text-blue-800">Interconnected Systems</h4>
                </div>
                <p className="text-blue-700 text-sm mb-3">
                  Ask students to create a stable two-planet system, then add a third massive planet. 
                  The new addition will likely disrupt the entire system.
                </p>
                <div className="bg-blue-100 border border-blue-300 rounded p-3">
                  <p className="text-blue-800 text-sm font-medium">
                    💡 Teaching Point: No part of a process exists in vacuum - changes have unforeseen ripple effects.
                  </p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <div className="flex items-center mb-3">
                  <Zap className="w-6 h-6 text-green-600 mr-3" />
                  <h4 className="font-bold text-green-800">The Slingshot Effect</h4>
                </div>
                <p className="text-green-700 text-sm mb-3">
                  Frame this as using a process's inherent properties to one's advantage, 
                  similar to finding clever, non-obvious optimizations in real-world workflows.
                </p>
                <div className="bg-green-100 border border-green-300 rounded p-3">
                  <p className="text-green-800 text-sm font-medium">
                    💡 Teaching Point: Demonstrates creative problem-solving and process optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Educational Implementation */}
        <CollapsibleSection id="implementation" title="Educational Implementation Guide" icon={Settings}>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg p-6">
              <h3 className="font-bold text-indigo-800 mb-4 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2" />
                Recommended Teaching Sequence
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">1</div>
                  <div>
                    <h4 className="font-semibold text-indigo-800">Course Icebreaker</h4>
                    <p className="text-indigo-700 text-sm">Use simulation as opening activity for Six Sigma or process management course</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">2</div>
                  <div>
                    <h4 className="font-semibold text-indigo-800">Experiential Learning</h4>
                    <p className="text-indigo-700 text-sm">Allow students to fail, learn, and improve in consequence-free environment</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">3</div>
                  <div>
                    <h4 className="font-semibold text-indigo-800">Mental Model Building</h4>
                    <p className="text-indigo-700 text-sm">Build strong intuitive understanding before introducing spreadsheets or control charts</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">4</div>
                  <div>
                    <h4 className="font-semibold text-indigo-800">Concept Reinforcement</h4>
                    <p className="text-indigo-700 text-sm">Reference simulation examples when teaching statistical analysis and formal Six Sigma tools</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <ConceptCard
                title="Learning Objectives"
                description="Students will understand process variation, input-output relationships, system complexity, and the importance of process control through hands-on experimentation."
                color="green"
              />
              
              <ConceptCard
                title="Assessment Ideas"
                description="Have students document their optimization process, identify critical inputs, explain failed attempts, and demonstrate consistent successful outcomes."
                color="purple"
              />
            </div>
          </div>
        </CollapsibleSection>

        {/* Conclusion */}
        <CollapsibleSection id="conclusion" title="Conclusion for Educators" icon={CheckCircle}>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Transform Your Six Sigma Teaching</h3>
              <p className="text-gray-700 text-lg">
                Bridge the gap between theory and practice with interactive, visual learning
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Engaging Introduction</h4>
                <p className="text-gray-600 text-sm">Perfect icebreaker that captures student attention and curiosity</p>
              </div>
              
              <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Intuitive Learning</h4>
                <p className="text-gray-600 text-sm">Students develop deep understanding through visual, hands-on experience</p>
              </div>
              
              <div className="text-center bg-white rounded-lg p-4 shadow-sm">
                <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Risk-Free Practice</h4>
                <p className="text-gray-600 text-sm">Safe environment for experimentation and learning from mistakes</p>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-100 border border-blue-300 rounded-lg p-4 text-center">
              <p className="text-blue-800 font-medium">
                🚀 Ready to revolutionize your Six Sigma curriculum? Start with the Cosmic Gravity Simulation!
              </p>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default SixSigmaFacultyManual;