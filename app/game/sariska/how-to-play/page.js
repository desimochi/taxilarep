"use client"
import React, { useState, useEffect } from 'react';
import { Clock, Target, Search, Calculator, FileText, Trophy, TrendingUp, Filter, Brain, Timer, CheckCircle2, AlertCircle, BarChart3, Users, Briefcase, MapPin, ChevronDown, ChevronRight, Lightbulb } from 'lucide-react';

const SariskaHillsManual = () => {
  const [activePhase, setActivePhase] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(35 * 60);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const phases = [
    {
      id: 1,
      title: "Investigation",
      duration: "10-12 minutes",
      icon: Search,
      color: "bg-blue-500",
      description: "Filter information and collect essential data points",
      goal: "To filter a large amount of information and collect only the essential data points needed for your analysis.",
      process: [
        "Read the Project Memo carefully to understand your primary objective",
        "Scan all exhibits (tables, charts, text) - much data is irrelevant noise",
        "Drag and drop only critical data points (highlighted in yellow) to your Research Journal",
        "Remember: Only data saved in the journal will be available in the next phase!"
      ]
    },
    {
      id: 2,
      title: "Analysis", 
      duration: "10-12 minutes",
      icon: Calculator,
      color: "bg-purple-500",
      description: "Use collected data to answer quantitative questions",
      goal: "To use the data you collected to answer a series of quantitative questions.",
      process: [
        "Answer 3-5 analytical questions using your collected data",
        "Use the on-screen Calculator for all computations",
        "Drag numerical values from Research Journal directly into calculator",
        "Once you submit an answer, it's locked in - double-check calculations!"
      ]
    },
    {
      id: 3,
      title: "Report",
      duration: "10-13 minutes",
      icon: FileText,
      color: "bg-green-500", 
      description: "Synthesize findings into executive summary and visualization",
      goal: "To synthesize your findings into a clear, concise executive summary and supporting data visualization.",
      process: [
        "Fill in blanks in pre-written report by dragging answers from Answers Bank",
        "Build final line graph by dragging raw data from journal to chart inputs",
        "Click 'Generate Chart' to complete your visualization",
        "Ensure your story flows logically from data to conclusions"
      ]
    }
  ];

  const scoringCriteria = [
    {
      phase: "Investigation",
      positive: "+10 points for each relevant data point added",
      negative: "-5 points for each irrelevant data point added",
      icon: Search,
      color: "text-blue-400"
    },
    {
      phase: "Analysis", 
      positive: "+50 points for each correctly answered question",
      negative: "-10 points for each incorrectly answered question",
      icon: Calculator,
      color: "text-purple-400"
    },
    {
      phase: "Report",
      positive: "+25 points for each correctly filled field in final chart",
      negative: "No negative scoring in this phase",
      icon: FileText,
      color: "text-green-400"
    }
  ];

  const keySkills = [
    {
      title: "Data Filtering",
      description: "Ability to distinguish critical information from noise",
      icon: Filter,
      color: "bg-blue-500"
    },
    {
      title: "Quantitative Acumen", 
      description: "Precision in calculation and data interpretation",
      icon: Calculator,
      color: "bg-purple-500"
    },
    {
      title: "Problem Structuring",
      description: "Understanding core questions and solution steps",
      icon: Target,
      color: "bg-red-500"
    },
    {
      title: "Synthesis & Communication",
      description: "Distilling complex analysis into clear conclusions",
      icon: Brain,
      color: "bg-green-500"
    },
    {
      title: "Time Management",
      description: "Performing all tasks efficiently under strict deadline",
      icon: Clock,
      color: "bg-yellow-500"
    }
  ];

  const successTips = [
    {
      title: "Read the Objective First",
      description: "Before touching any data, be absolutely clear on what you are being asked to solve.",
      icon: Target
    },
    {
      title: "Don't Hoard Data",
      description: "A cluttered journal is as bad as an empty one. Only save what you are certain you will need.",
      icon: Filter
    },
    {
      title: "Trust Your Calculator", 
      description: "Use the on-screen calculator for everything to avoid simple arithmetic errors.",
      icon: Calculator
    },
    {
      title: "Pace Yourself",
      description: "Keep an eye on the timer. Allocate roughly 10-12 minutes for each of the first two phases.",
      icon: Timer
    },
    {
      title: "Tell a Story",
      description: "Think about the narrative. What story is the data telling you? Focus on the most important points.",
      icon: FileText
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="mb-8">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="w-8 h-8 mr-3 text-blue-400" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Sariska Hills Study
              </h1>
            </div>
            <p className="text-xl text-blue-200 mb-2">Business Analysis Simulation</p>
            <p className="text-lg text-indigo-200">Taxila Business School, Jaipur</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 mr-3 text-red-400" />
              <h2 className="text-3xl font-semibold text-blue-200">Mission Critical: 35 Minutes</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-200 mb-4">
              Act as a lead analyst to diagnose the primary cause of the Sambar Deer population decline. 
              This high-fidelity simulation mirrors real-world business analysis challenges.
            </p>
            <div className="text-4xl font-mono font-bold text-red-400">
              {formatTime(timeRemaining)}
            </div>
          </div>
        </div>
      </div>

      {/* Objective Section */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-8 border border-amber-400/30 mb-16">
          <div className="flex items-center mb-6">
            <Briefcase className="w-8 h-8 mr-3 text-amber-400" />
            <h2 className="text-3xl font-bold text-amber-200">Your Role: Lead Business Analyst</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-4">
              <Target className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <h3 className="font-semibold text-blue-200">Sharp Analysis</h3>
              <p className="text-sm text-gray-300">Filter data and identify key insights</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-green-400" />
              <h3 className="font-semibold text-green-200">Clear Decisions</h3>
              <p className="text-sm text-gray-300">Make data-driven conclusions</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <Clock className="w-8 h-8 mx-auto mb-2 text-red-400" />
              <h3 className="font-semibold text-red-200">Time Management</h3>
              <p className="text-sm text-gray-300">Execute efficiently under pressure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Three Phases */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-blue-200">Three Critical Phases</h2>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <div key={phase.id} 
                   className={`cursor-pointer transition-all duration-300 ${
                     activePhase === phase.id 
                       ? 'transform scale-105' 
                       : 'hover:scale-102'
                   }`}
                   onClick={() => setActivePhase(phase.id)}>
                <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 border-2 ${
                  activePhase === phase.id 
                    ? 'border-blue-400 shadow-lg shadow-blue-500/25' 
                    : 'border-white/20'
                }`}>
                  <div className={`w-16 h-16 ${phase.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-blue-200">
                    Phase {phase.id}: {phase.title}
                  </h3>
                  <p className="text-center text-gray-300 mb-3">{phase.description}</p>
                  <div className="text-center">
                    <span className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm">
                      {phase.duration}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase Details */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
          {phases.map((phase) => (
            activePhase === phase.id && (
              <div key={phase.id}>
                <div className="flex items-center mb-6">
                  <div className={`w-12 h-12 ${phase.color} rounded-full flex items-center justify-center mr-4`}>
                    <phase.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-blue-200">
                    Phase {phase.id}: {phase.title}
                  </h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-2 text-indigo-200">Goal:</h4>
                  <p className="text-gray-300 leading-relaxed">{phase.goal}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-indigo-200">Process:</h4>
                  <div className="space-y-3">
                    {phase.process.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-white text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-300">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Scoring System */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-4xl font-bold mb-4 text-blue-200">Scoring System</h2>
          <p className="text-xl text-gray-300">Performance evaluated in real-time, final score out of 100</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {scoringCriteria.map((criteria, index) => {
            const Icon = criteria.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <Icon className={`w-8 h-8 mr-3 ${criteria.color}`} />
                  <h3 className="text-xl font-semibold text-blue-200">{criteria.phase}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-green-300 text-sm">{criteria.positive}</p>
                  </div>
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-red-300 text-sm">{criteria.negative}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Skills */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Brain className="w-16 h-16 mx-auto mb-4 text-purple-400" />
          <h2 className="text-4xl font-bold mb-4 text-blue-200">Key Skills Tested</h2>
          <p className="text-xl text-gray-300">Essential competencies for business analysis success</p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {keySkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:scale-105 transition-transform text-center">
                <div className={`w-12 h-12 ${skill.color} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-blue-200">{skill.title}</h3>
                <p className="text-gray-300 text-sm">{skill.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Tips */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Lightbulb className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-4xl font-bold mb-4 text-blue-200">Tips for Success</h2>
          <p className="text-xl text-gray-300">Strategic advice from experienced consultants</p>
        </div>

        <div className="space-y-6">
          {successTips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} 
                   className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/15 transition-all"
                   onClick={() => toggleSection(`tip-${index}`)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-yellow-500 rounded-full p-3 mr-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-200">{tip.title}</h3>
                  </div>
                  {activeSection === `tip-${index}` ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </div>
                {activeSection === `tip-${index}` && (
                  <p className="mt-4 ml-16 text-gray-300 leading-relaxed">{tip.description}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl p-12 border border-blue-400/30">
          <h2 className="text-3xl font-bold mb-4 text-blue-200">Ready to Begin Your Analysis?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Remember: This simulation tests the same skills used by top-tier management consultants. 
            Success requires sharp analytical thinking, precise execution, and effective time management 
            under pressure.
          </p>
          <div className="text-2xl font-semibold text-indigo-200 mb-4">Good Luck, Analyst. 📊</div>
          <div className="text-lg text-yellow-300">
            The clock is ticking. Your analysis awaits.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SariskaHillsManual;