"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Target, Users, BarChart3, Settings, MapPin, Eye, RefreshCw, CheckCircle2, Lightbulb, TreePine, Fish, Zap, ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TaxilaInstructions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
const router = useRouter()
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const steps = [
    { id: 1, title: "Enter Your Name", description: "Unlock the simulation by providing your identity", icon: Users },
    { id: 2, title: "Select a Range", description: "Choose species from Range A, B, or C", icon: Target },
    { id: 3, title: "Choose Location", description: "Find suitable environmental conditions on the map", icon: MapPin },
    { id: 4, title: "Build Ecosystem", description: "Drag 8 species into your ecosystem slots", icon: TreePine },
    { id: 5, title: "Analyze & Iterate", description: "Review species relationships and needs", icon: Eye },
    { id: 6, title: "Check Stability", description: "Test your ecosystem design", icon: CheckCircle2 },
    { id: 7, title: "Review Results", description: "Learn from feedback and adjust strategy", icon: BarChart3 },
    { id: 8, title: "Reset & Refine", description: "Clear slots and try new combinations", icon: RefreshCw }
  ];

  const keyPrinciples = [
    {
      icon: TreePine,
      title: "Environmental Match",
      description: "Every species has specific environmental needs. Your location must meet ALL 8 species' requirements.",
      color: "bg-green-500"
    },
    {
      icon: Fish,
      title: "Food Chain Pyramid",
      description: "A stable ecosystem needs a strong base with enough Producers (plants) to support Animals above them.",
      color: "bg-blue-500"
    },
    {
      icon: Zap,
      title: "Caloric Balance",
      description: "Animals need sufficient calories to survive. Balance predator-prey relationships to prevent starvation or extinction.",
      color: "bg-yellow-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 text-white">
      {/* Hero Section */}
      <div className="px-8 py-8">
            <button onClick={()=>router.back()} className="text-gray-50 flex items-center gap-1 z-50"><ArrowBigLeft />Go Back</button>
        </div>
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              TAXILA SOLVE SIMULATION
            </h1>
            <p className="text-xl text-emerald-200 mb-2">Player's Manual</p>
            <p className="text-lg text-cyan-200">Taxila Business School, Jaipur</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-200">Your Strategic Challenge</h2>
            <p className="text-lg leading-relaxed text-gray-200">
              Design a stable, self-sustaining ecosystem through careful planning, analysis, and understanding of complex systems. 
              This simulation serves as a practical exercise in core business and consulting principles.
            </p>
          </div>
        </div>
      </div>

      {/* Why This Matters Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-emerald-200">Why This Simulation Matters</h2>
          <p className="text-xl text-gray-300">Building essential MBA and consulting skills through ecological metaphors</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Systems Thinking",
              description: "Each species affects others, like departments in a company. Learn to think holistically about organizations.",
              icon: "🌐"
            },
            {
              title: "Resource Management", 
              description: "Caloric flow mirrors managing finite business resources like capital, time, and personnel.",
              icon: "💼"
            },
            {
              title: "Data-Driven Strategy",
              description: "Success requires analyzing environmental data, mirroring how consultants use market research and financial data.",
              icon: "📊"
            },
            {
              title: "Constraint Optimization",
              description: "Build the best system within limits (8 species, specific location) - fundamental to business decision-making.",
              icon: "⚖️"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-emerald-200">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interface Overview */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-emerald-200">Your Dashboard Interface</h2>
        
        <div className="space-y-6">
          {[
            {
              title: "Header & Evaluation Panel",
              description: "Track your performance with metrics including attempts, successes, success rate, and evolving rank from 'Novice' to 'Master Ecologist'",
              position: "Top"
            },
            {
              title: "Left Panel - Available Species",
              description: "Browse and filter species by environmental ranges (A, B, C). These are your building blocks.",
              position: "Left"
            },
            {
              title: "Center Panel - Your Workshop", 
              description: "Interactive map for location selection and ecosystem builder canvas for your 8-species slots.",
              position: "Center"
            },
            {
              title: "Right Panel - Information Hub",
              description: "View location details and selected species stats, including predator-prey relationships.",
              position: "Right"
            }
          ].map((panel, index) => (
            <div key={index} 
                 className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/15 transition-all"
                 onClick={() => toggleSection(`panel-${index}`)}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {panel.position}
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-200">{panel.title}</h3>
                </div>
                {activeSection === `panel-${index}` ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
              </div>
              {activeSection === `panel-${index}` && (
                <p className="mt-4 text-gray-300 leading-relaxed">{panel.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-emerald-200">How to Play: Step-by-Step</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} 
                     className={`p-6 rounded-xl border transition-all cursor-pointer ${
                       currentStep === step.id 
                         ? 'bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/25' 
                         : 'bg-white/10 border-white/20 hover:bg-white/15'
                     }`}
                     onClick={() => setCurrentStep(step.id)}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${
                      currentStep === step.id ? 'bg-emerald-500' : 'bg-white/20'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-emerald-200">
                        Step {step.id}: {step.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 h-fit">
            <h3 className="text-2xl font-semibold mb-6 text-emerald-200">
              Step {currentStep}: {steps.find(s => s.id === currentStep)?.title}
            </h3>
            <div className="space-y-4 text-gray-300">
              {currentStep === 1 && (
                <p>Start by entering your name in the designated field. The simulation will remain locked until you provide your identity. Your performance throughout the session will be tracked and displayed in the evaluation panel.</p>
              )}
              {currentStep === 2 && (
                <p>Use the "Range A/B/C" buttons in the left panel to choose a set of species. Important: You must use species from only one range for your ecosystem to work properly.</p>
              )}
              {currentStep === 3 && (
                <p>Drag the red marker on the map to find a location with suitable environmental conditions. The environmental parameters (Altitude, Temperature, etc.) of your chosen spot are critical for your species' survival.</p>
              )}
              {currentStep === 4 && (
                <p>Drag 8 species from the list and drop them into the ecosystem slots. Pay close attention to the roles of Producers (plants) and Animals (herbivores and carnivores).</p>
              )}
              {currentStep === 5 && (
                <p>Hover over placed species to review their needs and relationships. Ask yourself: Does every animal have a food source? Are there enough producers to support the herbivores?</p>
              )}
              {currentStep === 6 && (
                <p>Once you have 8 species placed, click the "Check Ecosystem Stability" button. The system will run a simulation to test your design and provide immediate feedback.</p>
              )}
              {currentStep === 7 && (
                <p>You'll receive a message indicating success or failure. If you fail, the message will explain why (e.g., a species starved, location was unsuitable). Use this feedback to adjust your strategy.</p>
              )}
              {currentStep === 8 && (
                <p>Use the "Reset" button to clear the slots and try a new combination. Each attempt is a learning opportunity to refine your understanding of ecosystem dynamics.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Keys to Success */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Lightbulb className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-4xl font-bold mb-4 text-emerald-200">Keys to Success</h2>
          <p className="text-xl text-gray-300">Master these principles to build stable ecosystems</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {keyPrinciples.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 hover:scale-105 transition-transform">
                <div className={`w-16 h-16 ${principle.color} rounded-full flex items-center justify-center mb-6 mx-auto`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-center text-emerald-200">{principle.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{principle.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl p-12 border border-emerald-400/30">
          <h2 className="text-3xl font-bold mb-4 text-emerald-200">Ready to Begin?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Apply strategic thinking to create a balanced system, much like a successful business. 
            Remember: this is a hands-on case study that develops the strategic, analytical, and 
            problem-solving skills essential for high-level management and consulting.
          </p>
          <div className="text-2xl font-semibold text-cyan-200">Good Luck, Future Ecologist! 🌿</div>
        </div>
      </div>
    </div>
  );
};

export default TaxilaInstructions;