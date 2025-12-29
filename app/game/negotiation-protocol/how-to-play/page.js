import React, { useState } from 'react';
import { Book, Target, Brain, TrendingUp, Clock, Award, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function HowToPlay() {
  const [activePhase, setActivePhase] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Negotiation Protocol
              </h1>
              <p className="text-slate-400 text-sm mt-1">Taxila Business School Edition</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-300">
              <Clock className="w-4 h-4" />
              <span>40 Minutes</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800/50 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Book },
              { id: 'objectives', label: 'Objectives', icon: Target },
              { id: 'phase1', label: 'Phase 1: Intelligence', icon: Brain },
              { id: 'phase2', label: 'Phase 2: Gauntlet', icon: TrendingUp },
              { id: 'scoring', label: 'Scoring', icon: Award }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePhase(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activePhase === tab.id
                    ? 'border-blue-400 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activePhase === 'overview' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Simulation Overview</h2>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <p className="text-lg text-slate-300 leading-relaxed mb-6">
                  Negotiation Protocol is a high-fidelity executive simulation designed to test your ability to navigate high-stakes, cross-cultural negotiations under pressure.
                </p>
                <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-700/50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-3 text-blue-300">Your Mission</h3>
                  <p className="text-slate-300">
                    You assume the role of an operative for <span className="text-blue-400 font-semibold">Meridian Capital</span>, tasked with acquiring a majority stake in <span className="text-cyan-400 font-semibold">Vayu Aerospace</span>, a strategic Indian defense contractor led by the brilliant but traditional <span className="text-amber-400 font-semibold">Dr. Arjun Rao</span>.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <Clock className="w-10 h-10 text-orange-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Time Pressure</h3>
                <p className="text-slate-400">40 minutes to complete the entire simulation</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <Brain className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">High Stakes</h3>
                <p className="text-slate-400">Every decision impacts your final score and outcome</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <Target className="w-10 h-10 text-green-400 mb-3" />
                <h3 className="text-xl font-semibold mb-2">Strategic Thinking</h3>
                <p className="text-slate-400">Balance profit with legacy and cultural sensitivity</p>
              </div>
            </div>
          </div>
        )}

        {activePhase === 'objectives' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Learning Objectives</h2>
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-semibold mb-3 text-green-300">Primary Objective</h3>
                <p className="text-lg text-slate-300">
                  Secure a <span className="text-green-400 font-bold">51% controlling stake</span> in Vayu Aerospace while preserving the founder's legacy and ensuring his continued cooperation.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Learning Outcomes (Bloom's Taxonomy)</h3>
              <div className="space-y-4">
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 rounded-full p-3">
                      <span className="text-2xl font-bold text-blue-400">4</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-blue-300">Analyze</h4>
                      <p className="text-slate-300">
                        Interpret fragmented digital intelligence (OSINT) from Instagram, LinkedIn, and Financial Reports to construct an accurate psychological profile of a counter-party.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500/20 rounded-full p-3">
                      <span className="text-2xl font-bold text-purple-400">5</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-purple-300">Evaluate</h4>
                      <p className="text-slate-300">
                        Differentiate between <span className="text-amber-400">Transactional</span> (Western/Corporate) and <span className="text-cyan-400">Relational</span> (High-Context/Indian) negotiation styles and determine the appropriate approach.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-green-500/20 rounded-full p-3">
                      <span className="text-2xl font-bold text-green-400">3</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-green-300">Apply</h4>
                      <p className="text-slate-300">
                        Utilize strategic empathy to de-escalate tension and align conflicting interests (e.g., Profit vs. Legacy).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500/20 rounded-full p-3">
                      <AlertTriangle className="w-8 h-8 text-orange-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold mb-2 text-orange-300">Manage</h4>
                      <p className="text-slate-300">
                        Maintain cognitive performance and decision quality under simulated sensory stress (Audio/Visual stressors) and time constraints.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePhase === 'phase1' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Phase 1: The Intelligence Hub</h2>
              <p className="text-lg text-slate-300 mb-8">
                Before the meeting, you have limited time to review three data streams and build a psychological profile of Dr. Arjun Rao.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 border border-pink-700/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-pink-300">📱 Instagram (Personal)</h3>
                <p className="text-slate-300 mb-4">Look for clues about personal values.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                    <span className="text-slate-400">Ego (Narcissist)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                    <span className="text-slate-400">Duty (Guardian)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                    <span className="text-slate-400">Pleasure (Hedonist)</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-700/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-300">💼 LinkedIn (Professional)</h3>
                <p className="text-slate-300 mb-4">Analyze business ideology.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-slate-400">Globalist</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-slate-400">Nationalist (Swadeshi)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span className="text-slate-400">Efficiency Expert</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-700/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-emerald-300">📊 Financials (Forensic)</h3>
                <p className="text-slate-300 mb-4">Identify hidden pressure points.</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-slate-400">Corporate Debt</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-slate-400">R&D Burn</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    <span className="text-slate-400">Supply Chain Failure</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border border-amber-700/50 rounded-lg p-6">
              <h3 className="text-2xl font-semibold mb-4 text-amber-300">⚠️ Profiling Task</h3>
              <p className="text-slate-300 mb-4">
                You must explicitly identify Dr. Rao's <span className="text-amber-400 font-semibold">Personal Archetype</span> and <span className="text-amber-400 font-semibold">Professional Code</span>.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="font-semibold text-green-300">Correct Profile</span>
                  </div>
                  <p className="text-2xl font-bold text-green-400">+5 Points</p>
                </div>
                <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-400" />
                    <span className="font-semibold text-red-300">Incorrect Profile</span>
                  </div>
                  <p className="text-2xl font-bold text-red-400">-10 Points</p>
                  <p className="text-xs text-red-300 mt-1">(Critical Risk)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePhase === 'phase2' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Phase 2: The Gauntlet</h2>
              <p className="text-lg text-slate-300 mb-8">
                A 16-turn linear negotiation where Dr. Rao challenges you at every step. Choose your responses wisely.
              </p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8">
              <h3 className="text-2xl font-semibold mb-4">Each Turn Structure</h3>
              <p className="text-slate-300 mb-4">
                In each turn, Dr. Rao will present a challenge. You must respond with one of three options:
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-700/50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-500/20 rounded-full p-3 flex-shrink-0">
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-green-300">The Aligned Choice</h4>
                      <span className="text-2xl font-bold text-green-400">+1 Point</span>
                    </div>
                    <p className="text-slate-300">
                      Resonates with his specific psychological profile. Builds trust and rapport. This is your ideal response when you've correctly identified his archetype.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-500/20 rounded-full p-3 flex-shrink-0">
                    <AlertTriangle className="w-8 h-8 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-slate-300">The Neutral Choice</h4>
                      <span className="text-2xl font-bold text-slate-400">-2 Points</span>
                    </div>
                    <p className="text-slate-300">
                      Standard corporate response. Perceived as cold or wasting time. Safe but ineffective for building the relationship.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 border border-red-700/50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-500/20 rounded-full p-3 flex-shrink-0">
                    <XCircle className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xl font-semibold text-red-300">The Fatal Choice</h4>
                      <span className="text-2xl font-bold text-red-400">-15 Points</span>
                    </div>
                    <p className="text-slate-300 mb-3">
                      Triggers his specific anxieties and destroys trust. Avoid at all costs!
                    </p>
                    <div className="bg-red-950/50 rounded p-3">
                      <p className="text-sm text-red-300 font-semibold mb-2">Examples of Fatal Choices:</p>
                      <ul className="text-sm text-slate-400 space-y-1">
                        <li>• Mentioning his personal debt</li>
                        <li>• Threatening his staff or team</li>
                        <li>• Disrespecting cultural values</li>
                        <li>• Undermining his legacy</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-700/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-purple-300">💡 Strategy Tip</h3>
              <p className="text-slate-300">
                The key to success is understanding Dr. Rao's psychological profile from Phase 1. Each aligned choice should reflect your understanding of whether he values duty over profit, tradition over efficiency, or legacy over expansion.
              </p>
            </div>
          </div>
        )}

        {activePhase === 'scoring' && (
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Scoring & Certification</h2>
              <p className="text-lg text-slate-300 mb-8">
                The simulation uses a strict scoring engine (0-100) that tracks your performance throughout.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">65</div>
                <p className="text-slate-300">Starting Score</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">&lt; 60</div>
                <p className="text-slate-300">Termination Threshold</p>
                <p className="text-xs text-red-400 mt-1">Immediate Game Over</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">40</div>
                <p className="text-slate-300">Minutes Time Limit</p>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-6">Final Outcomes</h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-amber-900/30 to-yellow-900/30 border-2 border-amber-500/50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Award className="w-10 h-10 text-amber-400" />
                      <div>
                        <h4 className="text-2xl font-bold text-amber-300">S-Rank</h4>
                        <p className="text-amber-500 font-semibold">Score 85-100</p>
                      </div>
                    </div>
                    <div className="bg-amber-500/20 rounded-full px-4 py-2">
                      <span className="text-amber-300 font-bold">Certificate Awarded</span>
                    </div>
                  </div>
                  <p className="text-slate-300">
                    <span className="text-green-400 font-semibold">Mission Success.</span> Deal signed, legacy preserved. You've demonstrated exceptional negotiation skills and cultural intelligence.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-600 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-slate-300">C</span>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-slate-300">C-Rank</h4>
                        <p className="text-slate-500 font-semibold">Score 60-84</p>
                      </div>
                    </div>
                    <div className="bg-slate-600/20 rounded-full px-4 py-2">
                      <span className="text-slate-400 font-bold">No Certificate</span>
                    </div>
                  </div>
                  <p className="text-slate-300">
                    <span className="text-yellow-400 font-semibold">Partial Success.</span> Deal signed, but relationship damaged. The acquisition went through, but future cooperation may be challenging.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-red-900/30 to-rose-900/30 border border-red-700/50 rounded-lg p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <XCircle className="w-10 h-10 text-red-400" />
                    <div>
                      <h4 className="text-2xl font-bold text-red-300">F-Rank</h4>
                      <p className="text-red-500 font-semibold">Score &lt; 60</p>
                    </div>
                  </div>
                  <p className="text-slate-300">
                    <span className="text-red-400 font-semibold">Mission Failure.</span> Negotiation terminated. Dr. Rao walked away from the table. You'll need to restart and reconsider your approach.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700/50 rounded-lg p-6 mt-8">
              <h3 className="text-xl font-semibold mb-3 text-blue-300">📚 About This Simulation</h3>
              <div className="space-y-2 text-slate-300">
                <p>Created by <span className="text-blue-400 font-semibold">Taxila Business School</span></p>
                <p className="text-sm text-slate-400">
                  Signed: Prof. Alka Jain, MBA PhD, Director
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-slate-400 text-sm">
          <p>© Taxila Business School - Negotiation Protocol Simulation</p>
          <p className="mt-2">High-Fidelity Executive Training in Cross-Cultural Negotiations</p>
        </div>
      </footer>
    </div>
  );
}