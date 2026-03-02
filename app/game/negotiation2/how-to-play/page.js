"use client"
import React, { useState } from 'react';
import { AlertCircle, Award, BookOpen, Brain, Clock, Gauge, Radio, Shield, Target, TrendingUp, Users, Zap } from 'lucide-react';

export default function HowToPlay() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'learning', label: 'Learning Outcomes', icon: Brain },
    { id: 'interface', label: 'Interface & HUD', icon: Gauge },
    { id: 'mechanics', label: 'Critical Mechanics', icon: Zap },
    { id: 'priority', label: 'Priority Intercept', icon: AlertCircle },
    { id: 'scoring', label: 'Scoring System', icon: Award },
    { id: 'analytics', label: 'Post-Simulation', icon: TrendingUp },
    { id: 'strategy', label: 'Strategy Tips', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/40 border-b border-red-500/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">NEGOTIATION PROTOCOL-2</h1>
              <p className="text-sm text-gray-400">Tactical Crisis Management Simulation</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar Navigation */}
        <nav className="w-64 flex-shrink-0">
          <div className="bg-slate-800/50 rounded-lg p-4 sticky top-24 border border-slate-700">
            <h2 className="text-xs font-semibold text-gray-400 uppercase mb-3">Contents</h2>
            <ul className="space-y-1">
              {sections.map(section => {
                const Icon = section.icon;
                return (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
                        activeSection === section.id
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : 'hover:bg-slate-700/50 text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {section.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1">
          {activeSection === 'overview' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-3xl font-bold mb-4 text-red-400">Simulation Overview</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  NEGOTIATION PROTOCOL-2 is an advanced tactical simulation designed to test crisis management skills under high-pressure conditions. You assume the role of the Lead Negotiator for Tactical Command during an active hijacking of Flight 404.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-yellow-400 mt-1" />
                      <div>
                        <h3 className="font-semibold text-yellow-400 mb-2">Dynamic Scenario Engine</h3>
                        <p className="text-sm text-gray-400">Randomly selects from 20 unique datasets, randomizing hijacker name, flight number, fuel status, and psychological motive (Political, Desperate, Narcissistic).</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-blue-400 mt-1" />
                      <div>
                        <h3 className="font-semibold text-blue-400 mb-2">The Stakes</h3>
                        <p className="text-sm text-gray-400">142+ passengers and crew depend on your decisions. Subject "Echo-1" is a hostile actor with piloting skills and explosives.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-4 rounded border border-slate-700 md:col-span-2">
                    <div className="flex items-start gap-3">
                      <Radio className="w-5 h-5 text-green-400 mt-1" />
                      <div>
                        <h3 className="font-semibold text-green-400 mb-2">Environment</h3>
                        <p className="text-sm text-gray-400">Real-time 3D tactical interface with live audio intercepts, dynamic metrics, and responsive design for Mobile/Laptop usage.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg p-4">
                <p className="text-sm text-center text-gray-300">
                  <strong className="text-red-400">Created at Taxila Business School</strong> • High replayability with randomized scenarios
                </p>
              </div>
            </div>
          )}

          {activeSection === 'learning' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-3xl font-bold mb-4 text-red-400">Learning Outcomes</h2>
                <p className="text-gray-300 mb-6">
                  By engaging with this simulation, you will demonstrate and improve the following competencies:
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-5 rounded border border-blue-500/30">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3">A. Psychological Profiling (Cognitive Empathy)</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-gray-300">Objective:</strong> <span className="text-gray-400">Distinguish between surface-level demands (money) and deep-seated psychological drivers (need for validation/recognition).</span></p>
                      <p><strong className="text-gray-300">Outcome:</strong> <span className="text-gray-400">Learn to identify traits such as "Narcissistic Injury" or "Injustice Gathering" and use specific validation techniques to de-escalate hostility.</span></p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-5 rounded border border-purple-500/30">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3">B. Decision Making Under Constraints</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-gray-300">Objective:</strong> <span className="text-gray-400">Manage conflicting resources—specifically Time (Fuel) vs. Patience (Authority/Hijacker).</span></p>
                      <p><strong className="text-gray-300">Outcome:</strong> <span className="text-gray-400">Learn to prioritize critical actions (fuel logistics) while managing stakeholder anxiety, avoiding "analysis paralysis."</span></p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-5 rounded border border-green-500/30">
                    <h3 className="text-xl font-semibold text-green-400 mb-3">C. Active Listening & Intel Synthesis</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-gray-300">Objective:</strong> <span className="text-gray-400">Correlate disparate data points (Audio intercepts, Manifests, Dialogue cues) to form a negotiation strategy.</span></p>
                      <p><strong className="text-gray-300">Outcome:</strong> <span className="text-gray-400">Realize that "listening" is an active strategic tool, not just a passive waiting period.</span></p>
                    </div>
                  </div>

                  <div className="bg-slate-900/50 p-5 rounded border border-red-500/30">
                    <h3 className="text-xl font-semibold text-red-400 mb-3">D. Emotional Regulation</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong className="text-gray-300">Objective:</strong> <span className="text-gray-400">Maintain composure during "Priority Intercepts" (simulated violence/gunshots).</span></p>
                      <p><strong className="text-gray-300">Outcome:</strong> <span className="text-gray-400">Practice resisting the "fight or flight" response to make rational decisions immediately following a shock event.</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'interface' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-3xl font-bold mb-4 text-red-400">Interface & HUD</h2>
                <p className="text-gray-300 mb-6">The Heads-Up Display provides critical real-time information:</p>

                <div className="grid gap-4">
                  <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 p-4 rounded border border-red-500/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Gauge className="w-5 h-5 text-red-400" />
                      <h3 className="text-lg font-semibold text-red-400">THREAT LEVEL (0-100%)</h3>
                    </div>
                    <p className="text-sm text-gray-300">The hijacker's likelihood of violence. Keep this low. High threat leads to immediate breach or execution.</p>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/30 to-yellow-800/30 p-4 rounded border border-yellow-500/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-lg font-semibold text-yellow-400">AUTHORITY PATIENCE (100-0%)</h3>
                    </div>
                    <p className="text-sm text-gray-300">Your bosses (The Mayor/Chief). If this hits 0%, they order a SWAT breach, resulting in casualties.</p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 p-4 rounded border border-blue-500/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Shield className="w-5 h-5 text-blue-400" />
                      <h3 className="text-lg font-semibold text-blue-400">SUBJECT TRUST (0-100%)</h3>
                    </div>
                    <p className="text-sm text-gray-300">How much the subject believes you. High trust unlocks special dialogue options (e.g., "Medical Release").</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 p-4 rounded border border-purple-500/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-purple-400" />
                      <h3 className="text-lg font-semibold text-purple-400">T-MINUS</h3>
                    </div>
                    <p className="text-sm text-gray-300">The master mission clock tracking your available time.</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 p-4 rounded border border-green-500/50">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <h3 className="text-lg font-semibold text-green-400">LIVE SCORE</h3>
                    </div>
                    <p className="text-sm text-gray-300">Your real-time performance rating. <strong className="text-red-400">If this drops below 30, you are immediately relieved of command (Game Over).</strong></p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'mechanics' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-3xl font-bold mb-4 text-red-400">Critical Mechanics</h2>

                <div className="space-y-4">
                  <div className="bg-red-900/20 p-5 rounded border border-red-500/50">
                    <h3 className="text-xl font-semibold text-red-400 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Fuel Burn
                    </h3>
                    <p className="text-gray-300">
                      The aircraft starts with low fuel (approx 12%). It burns <strong className="text-red-400">1% every 3 minutes</strong>. If Fuel hits 0%, the plane crashes.
                    </p>
                  </div>

                  <div className="bg-blue-900/20 p-5 rounded border border-blue-500/50">
                    <h3 className="text-xl font-semibold text-blue-400 mb-3 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Consulting Experts
                    </h3>
                    <p className="text-gray-300 mb-2">
                      You can consult a Psychologist, Tactical Commander, or Audio Tech via the controls panel.
                    </p>
                    <p className="text-sm text-yellow-300">
                      <strong>Cost:</strong> Each consult deducts 2 minutes from the clock and applies a score penalty.
                    </p>
                  </div>

                  <div className="bg-purple-900/20 p-5 rounded border border-purple-500/50">
                    <h3 className="text-xl font-semibold text-purple-400 mb-3 flex items-center gap-2">
                      <Radio className="w-5 h-5" />
                      Audio Analysis
                    </h3>
                    <p className="text-gray-300">
                      In the Intel Phase, you must listen to a 30-second intercept. Identifying the psychological driver correctly grants a massive Trust bonus later.
                    </p>
                  </div>

                  <div className="bg-green-900/20 p-5 rounded border border-green-500/50">
                    <h3 className="text-xl font-semibold text-green-400 mb-3 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Tactical Manual
                    </h3>
                    <p className="text-gray-300">
                      A "HELP" button is available in the console to review objectives during the mission without pausing the game.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'priority' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-red-500">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
                  <h2 className="text-3xl font-bold text-red-400">The "Priority Intercept" Event</h2>
                </div>

                <div className="bg-red-900/30 p-5 rounded border border-red-500/50 mb-6">
                  <p className="text-yellow-300 font-semibold mb-2">⚠️ WARNING</p>
                  <p className="text-gray-300">
                    Approximately <strong className="text-red-400">60 seconds</strong> into the negotiation, a critical event will occur involving a gunshot.
                  </p>
                </div>

                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-400 text-sm font-bold">1</span>
                    </div>
                    <p><strong className="text-white">Do not panic.</strong> This is a test of your emotional regulation.</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-400 text-sm font-bold">2</span>
                    </div>
                    <p>The simulation measures your <strong className="text-white">reaction speed</strong> and <strong className="text-white">choice of words</strong> immediately following this event.</p>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-red-400 text-sm font-bold">3</span>
                    </div>
                    <p>Aggressive responses usually <strong className="text-red-400">escalate threat</strong>. Calm, firm verification is preferred.</p>
                  </div>
                </div>

                <div className="mt-6 bg-slate-900/50 p-4 rounded border border-slate-700">
                  <p className="text-sm text-gray-400 italic">
                    "Your ability to maintain composure during Priority Intercepts separates expert negotiators from novices."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'scoring' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-3xl font-bold mb-4 text-red-400">Scoring System (0-100)</h2>
                <p className="text-gray-300 mb-6">
                  The simulation uses a weighted algorithm to calculate your final grade. Getting above <strong className="text-green-400">80/100</strong> is considered "Expert" level. Passing grade is <strong className="text-yellow-400">50/100</strong>.
                </p>

                <div className="space-y-3">
                  <div className="bg-green-900/20 p-4 rounded border border-green-500/50 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-green-400 mb-1">Mission Outcome</h3>
                      <p className="text-sm text-gray-400">Awarded only for a successful surrender. (0 for crash/breach)</p>
                    </div>
                    <div className="text-2xl font-bold text-green-400">30 Pts</div>
                  </div>

                  <div className="bg-blue-900/20 p-4 rounded border border-blue-500/50 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-blue-400 mb-1">Time Efficiency</h3>
                      <p className="text-sm text-gray-400">+0.5 points for every minute remaining on the clock. Speed matters.</p>
                    </div>
                    <div className="text-2xl font-bold text-blue-400">Variable</div>
                  </div>

                  <div className="bg-purple-900/20 p-4 rounded border border-purple-500/50 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-purple-400 mb-1">Intel Accuracy</h3>
                      <p className="text-sm text-gray-400">Awarded for correctly profiling the subject (e.g., Narcissist vs Radical)</p>
                    </div>
                    <div className="text-2xl font-bold text-purple-400">15 Pts</div>
                  </div>

                  <div className="bg-yellow-900/20 p-4 rounded border border-yellow-500/50 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-yellow-400 mb-1">Metric Balance</h3>
                      <p className="text-sm text-gray-400">Calculated based on final Trust, Patience, and Threat levels</p>
                    </div>
                    <div className="text-2xl font-bold text-yellow-400">40 Pts</div>
                  </div>

                  <div className="bg-red-900/20 p-4 rounded border border-red-500/50 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-red-400 mb-1">Consult Penalty</h3>
                      <p className="text-sm text-gray-400">Deducted for every time you use the "Consult" button</p>
                    </div>
                    <div className="text-2xl font-bold text-red-400">-5 Pts</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-3xl font-bold mb-4 text-red-400">Post-Simulation Analytics</h2>
                <p className="text-gray-300 mb-6">
                  Upon completion of the simulation, the system generates specific documents based on your performance:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-900/20 p-6 rounded border border-green-500/50">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-8 h-8 text-green-400" />
                      <h3 className="text-xl font-semibold text-green-400">Success (Score &gt; 50)</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-300 font-semibold">Certificate of Competence</p>
                      <p className="text-sm text-gray-400">
                        A downloadable, high-resolution PNG certificate featuring your name, score, and the digital signature of Prof. Rajat Bohra, Dean of Taxila Business School.
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-900/20 p-6 rounded border border-red-500/50">
                    <div className="flex items-center gap-3 mb-4">
                      <AlertCircle className="w-8 h-8 text-red-400" />
                      <h3 className="text-xl font-semibold text-red-400">Failure (Score &lt; 50 or Crash)</h3>
                    </div>
                    <div className="space-y-3">
                      <p className="text-gray-300 font-semibold">Tactical Failure Report</p>
                      <p className="text-sm text-gray-400">
                        A downloadable HTML dossier detailing the specific cause of failure (Fuel Starvation, Authority Intervention, etc.) and providing targeted learning recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'strategy' && (
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <h2 className="text-3xl font-bold mb-4 text-red-400">Strategy Tips</h2>

                <div className="space-y-4">
                  <div className="bg-slate-900/50 p-5 rounded border-l-4 border-yellow-500">
                    <h3 className="font-semibold text-yellow-400 mb-2">1. Don't Lie About the News</h3>
                    <p className="text-gray-300 text-sm">
                      The subject has access to live feeds. If you lie about a news broadcast he can verify, Trust will plummet.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 p-5 rounded border-l-4 border-blue-500">
                    <h3 className="font-semibold text-blue-400 mb-2">2. Validate, Don't Pity</h3>
                    <p className="text-gray-300 text-sm">
                      Narcissists hate pity. Do not say "I feel bad for you." Instead, say "They made a mistake firing you; you are valuable."
                    </p>
                  </div>

                  <div className="bg-slate-900/50 p-5 rounded border-l-4 border-red-500">
                    <h3 className="font-semibold text-red-400 mb-2">3. Manage the Fuel</h3>
                    <p className="text-gray-300 text-sm">
                      Do not stall on the fuel negotiation. The physical reality of the plane falling out of the sky is your hardest deadline.
                    </p>
                  </div>

                  <div className="bg-slate-900/50 p-5 rounded border-l-4 border-purple-500">
                    <h3 className="font-semibold text-purple-400 mb-2">4. The Medical Trap</h3>
                    <p className="text-gray-300 text-sm">
                      Refusing medical aid causes a death (Game Over). Allowing a full medical team causes a breach scare. Find the middle ground.
                    </p>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-red-500/20 to-orange-500/20 p-6 rounded border border-red-500/50 text-center">
                  <p className="text-2xl font-bold text-red-400 mb-2">Good Luck, Officer.</p>
                  <p className="text-gray-400 text-sm">142 lives are counting on you.</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-slate-700 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>Created at Taxila Business School</p>
          <p className="mt-1">Negotiation Protocol-2 © 2026 • Advanced Tactical Crisis Management Training</p>
        </div>
      </footer>
    </div>
  );
}