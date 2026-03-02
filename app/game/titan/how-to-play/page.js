import React from 'react';
import { AlertTriangle, Target, TrendingUp, Shield, DollarSign, FileText, BarChart3, Calendar, Award } from 'lucide-react';

export default function ProjectTitanGuidelines() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm border-b border-blue-500/30">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
              Taxila Business School
            </h1>
            <h2 className="text-3xl font-semibold text-blue-300 mb-4">
              Project Titan: Player Guidelines and Manual
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto"></div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-12">
        
        {/* Section 1: Introduction */}
        <section className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/20">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-bold text-blue-300">1. Introduction: Your Role as CEO</h3>
          </div>
          
          <div className="space-y-4 text-gray-200 leading-relaxed">
            <p>Welcome to Project Titan. You are the newly appointed <span className="font-semibold text-blue-300">Chief Executive Officer</span> of <span className="font-bold text-cyan-300">Aether Corp.</span>, a multinational technology conglomerate with three distinct business divisions.</p>
            
            <p>Your mission is to lead the company for <span className="font-semibold text-yellow-300">five simulated years</span>. Every decision you make—from setting growth targets to launching major strategic initiatives—will be reflected in the company's financial performance.</p>
            
            <p>Your performance will be judged by one primary metric: <span className="font-bold text-green-300">Total Shareholder Return (TSR)</span>. Your goal is to maximize this score by making sound, strategic, and well-justified financial decisions.</p>
          </div>
        </section>

        {/* Section 2: Rules of Engagement */}
        <section className="bg-gradient-to-r from-red-900/40 to-orange-900/40 rounded-2xl p-8 backdrop-blur-sm border border-red-500/20">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <h3 className="text-2xl font-bold text-red-300">2. The Rules of Engagement: High Stakes</h3>
          </div>
          
          <div className="space-y-6 text-gray-200">
            <p className="text-lg">This is a <span className="font-bold text-red-300">high-difficulty simulation</span> with severe consequences for poor performance.</p>
            
            {/* The Objective */}
            <div className="bg-black/30 rounded-lg p-6 border border-green-500/30">
              <h4 className="text-xl font-semibold text-green-300 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                The Objective:
              </h4>
              <p>Your primary goal is to maximize the <span className="font-bold text-green-300">TSR score</span>. This is a comprehensive metric that tracks the total value you create for your shareholders through stock price appreciation and dividends paid. A score of <span className="font-semibold text-blue-300">100</span> means you have returned the initial value. Scores above <span className="font-bold text-yellow-300">130</span> are considered <span className="font-bold text-yellow-300">Excellent</span>.</p>
            </div>

            {/* Board Oversight */}
            <div className="bg-black/30 rounded-lg p-6 border border-orange-500/30">
              <h4 className="text-xl font-semibold text-orange-300 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Board Oversight:
              </h4>
              <p className="mb-4">The Board of Directors is watching you closely. The simulation operates on a <span className="font-bold text-red-300">"two-strike" policy</span>.</p>
              
              <div className="space-y-4">
                <div className="bg-yellow-900/30 rounded-lg p-4 border border-yellow-500/30">
                  <h5 className="font-semibold text-yellow-300 mb-2">First Strike (CEO UNDER NOTICE):</h5>
                  <p>If you receive any warnings for poor performance in <span className="font-semibold">Year 1 or 2</span>, you will be put on notice. A banner will appear at the top of the screen, and you will be allowed to continue, but you are now under scrutiny.</p>
                </div>
                
                <div className="bg-red-900/30 rounded-lg p-4 border border-red-500/30">
                  <h5 className="font-semibold text-red-300 mb-2">Second Strike (CEO TERMINATED):</h5>
                  <p>If you are already on notice and receive <span className="font-bold text-red-300">any new warning in Year 3 or later</span>, the board will lose confidence, and you will be terminated immediately. The simulation will end, and your <span className="font-bold text-red-300">TSR will be set to zero</span>.</p>
                </div>
              </div>
            </div>

            {/* Strategy is Mandatory */}
            <div className="bg-black/30 rounded-lg p-6 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-purple-300 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Strategy is Mandatory:
              </h4>
              <p className="mb-4">You cannot simply change numbers and advance. After finalizing your decisions each year, you must:</p>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">1</span>
                  <div>
                    <span className="font-semibold text-purple-300">Write a Strategy Memo:</span>
                    <span className="ml-2">Justify your decisions in a memo of at least <span className="font-bold text-yellow-300">100 words</span>.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">2</span>
                  <div>
                    <span className="font-semibold text-purple-300">Answer Board Questions:</span>
                    <span className="ml-2">Respond to <span className="font-bold">two pointed questions</span> from the board based on your most significant decisions. Only after successfully defending your strategy will the simulation advance.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: CEO's Dashboard */}
        <section className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 rounded-2xl p-8 backdrop-blur-sm border border-indigo-500/20">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="w-8 h-8 text-indigo-400" />
            <h3 className="text-2xl font-bold text-indigo-300">3. The CEO's Dashboard: Your Key Tools</h3>
          </div>
          
          <p className="text-gray-200 mb-6">Your interface is divided into several key components:</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/30 rounded-lg p-5 border border-blue-500/30">
              <h4 className="font-semibold text-blue-300 mb-3">Decision Panel:</h4>
              <p className="text-gray-200">This is where you will input all of your assumptions for the upcoming year using sliders and radio buttons. All inputs start at zero, forcing you to make active decisions.</p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-5 border border-red-500/30">
              <h4 className="font-semibold text-red-300 mb-3">Warning Box:</h4>
              <p className="text-gray-200">This box will only appear if you have made a critical error. It will list the specific mistakes that have put your performance—and your job—at risk.</p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-5 border border-green-500/30">
              <h4 className="font-semibold text-green-300 mb-3">Metrics Dashboard:</h4>
              <p className="text-gray-200">This gives you an at-a-glance view of your company's health, including key valuation and credit ratios like <span className="font-semibold">EV/EBITDA</span> and <span className="font-semibold">Debt/EBITDA</span>.</p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-5 border border-purple-500/30">
              <h4 className="font-semibold text-purple-300 mb-3">Graphs & Charts:</h4>
              <p className="text-gray-200">Visualize your performance over time. Track your TSR, see the revenue contribution of each division, and monitor your key ratios.</p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-5 border border-cyan-500/30">
              <h4 className="font-semibold text-cyan-300 mb-3">Financial Statements:</h4>
              <p className="text-gray-200">The detailed results of your decisions are reflected here. All figures are in <span className="font-bold text-yellow-300">Indian Rupees (₹) Millions</span>.</p>
            </div>
            
            <div className="bg-black/30 rounded-lg p-5 border border-orange-500/30">
              <h4 className="font-semibold text-orange-300 mb-3">Event Log:</h4>
              <p className="text-gray-200">This provides a running commentary of the events that happen each year, including market shocks and the results of your strategic choices.</p>
            </div>
          </div>
        </section>

        {/* Section 4: How to Win */}
        <section className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 rounded-2xl p-8 backdrop-blur-sm border border-emerald-500/20">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-emerald-400" />
            <h3 className="text-2xl font-bold text-emerald-300">4. How to Win: The Path to an Excellent TSR</h3>
          </div>
          
          <div className="space-y-6 text-gray-200">
            <p className="text-lg font-medium text-emerald-300">There is no single "correct" answer. Success requires a balanced and thoughtful strategy.</p>
            
            {/* Avoid Negligence */}
            <div className="bg-red-900/30 rounded-lg p-6 border border-red-500/30">
              <h4 className="text-xl font-semibold text-red-300 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Avoid Negligence:
              </h4>
              <p>Leaving key inputs at zero is considered <span className="font-bold text-red-300">management negligence</span>. The model will apply severe penalties, causing your revenue to collapse and costs to spiral out of control.</p>
            </div>

            {/* Balance Growth and Investment */}
            <div className="bg-blue-900/30 rounded-lg p-6 border border-blue-500/30">
              <h4 className="text-xl font-semibold text-blue-300 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Balance Growth and Investment:
              </h4>
              <p className="mb-4">The simulation punishes unbalanced strategies.</p>
              
              <div className="space-y-3 ml-4">
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <p>If you target high revenue growth without supporting it with sufficient investment in <span className="font-semibold text-blue-300">CapEx</span> and <span className="font-semibold text-blue-300">SG&A</span>, your margins will be penalized.</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <p>If your growth is too rapid, it will strain your working capital, burning through cash.</p>
                </div>
              </div>
            </div>

            {/* Manage Your Debt */}
            <div className="bg-orange-900/30 rounded-lg p-6 border border-orange-500/30">
              <h4 className="text-xl font-semibold text-orange-300 mb-3 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Manage Your Debt:
              </h4>
              <p>Keep a close eye on your <span className="font-bold text-orange-300">Debt/EBITDA ratio</span>. Breaching your debt covenants will result in higher interest rates and a freeze on dividends.</p>
            </div>

            {/* Think Long-Term */}
            <div className="bg-purple-900/30 rounded-lg p-6 border border-purple-500/30">
              <h4 className="text-xl font-semibold text-purple-300 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Think Long-Term:
              </h4>
              <p>A decision that looks good in one year (like cutting all investment to boost short-term profit) can have disastrous consequences in the following years.</p>
            </div>

            {/* Achievement Goal */}
            <div className="bg-gradient-to-r from-yellow-600/30 to-amber-600/30 rounded-lg p-6 border border-yellow-500/30">
              <div className="text-center">
                <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <p className="text-lg">Achieve an <span className="font-bold text-yellow-300">"Excellent"</span> TSR score, and you will be rewarded. The final screen will allow you to enter your name and download a personalized <span className="font-semibold text-yellow-300">Certificate of Achievement</span> on behalf of <span className="font-bold text-blue-300">Taxila Business School</span>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics Summary */}
        <section className="bg-gradient-to-r from-gray-900/40 to-slate-800/40 rounded-2xl p-8 backdrop-blur-sm border border-gray-500/20">
          <h3 className="text-2xl font-bold text-gray-300 mb-6 text-center">Key Performance Indicators</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center bg-black/40 rounded-lg p-6 border border-green-500/30">
              <div className="text-3xl font-bold text-green-400 mb-2">100</div>
              <div className="text-green-300 font-medium">TSR Baseline</div>
              <div className="text-sm text-gray-400 mt-2">Initial value return</div>
            </div>
            
            <div className="text-center bg-black/40 rounded-lg p-6 border border-yellow-500/30">
              <div className="text-3xl font-bold text-yellow-400 mb-2">130+</div>
              <div className="text-yellow-300 font-medium">Excellent TSR</div>
              <div className="text-sm text-gray-400 mt-2">Target achievement</div>
            </div>
            
            <div className="text-center bg-black/40 rounded-lg p-6 border border-blue-500/30">
              <div className="text-3xl font-bold text-blue-400 mb-2">5</div>
              <div className="text-blue-300 font-medium">Simulation Years</div>
              <div className="text-sm text-gray-400 mt-2">Leadership duration</div>
            </div>
          </div>
        </section>

        {/* Warning System */}
        <section className="bg-gradient-to-r from-red-800/40 to-pink-800/40 rounded-2xl p-8 backdrop-blur-sm border border-red-500/20">
          <h3 className="text-2xl font-bold text-red-300 mb-6 text-center">Warning System & Termination Policy</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/40 rounded-lg p-6 border border-yellow-500/30">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-yellow-400">1</span>
                </div>
                <h4 className="text-xl font-bold text-yellow-300">FIRST STRIKE</h4>
                <p className="text-yellow-200 font-medium">CEO UNDER NOTICE</p>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Warning in Year 1 or 2</p>
                <p>• Banner appears on screen</p>
                <p>• Continue under scrutiny</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-lg p-6 border border-red-500/30">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-red-400">2</span>
                </div>
                <h4 className="text-xl font-bold text-red-300">SECOND STRIKE</h4>
                <p className="text-red-200 font-medium">CEO TERMINATED</p>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Warning in Year 3+ while on notice</p>
                <p>• Immediate termination</p>
                <p>• TSR set to zero</p>
                <p>• Simulation ends</p>
              </div>
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-2xl p-8 backdrop-blur-sm border border-cyan-500/20">
          <h3 className="text-2xl font-bold text-cyan-300 mb-6 text-center">Company Overview</h3>
          
          <div className="text-center bg-black/40 rounded-lg p-8 border border-cyan-500/30">
            <h4 className="text-3xl font-bold text-cyan-300 mb-4">Aether Corp.</h4>
            <p className="text-xl text-gray-200 mb-4">Multinational Technology Conglomerate</p>
            <div className="inline-block bg-cyan-900/50 rounded-lg px-6 py-3">
              <p className="text-cyan-200 font-medium">Three Distinct Business Divisions</p>
            </div>
          </div>
        </section>

        {/* Financial Details */}
        <section className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-2xl p-8 backdrop-blur-sm border border-green-500/20">
          <h3 className="text-2xl font-bold text-green-300 mb-6 text-center">Financial Framework</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/40 rounded-lg p-6 border border-green-500/30">
              <h4 className="text-xl font-semibold text-green-300 mb-4">Currency</h4>
              <p className="text-2xl font-bold text-yellow-300 mb-2">₹ (Indian Rupees)</p>
              <p className="text-gray-200">All figures reported in <span className="font-semibold">Millions</span></p>
            </div>
            
            <div className="bg-black/40 rounded-lg p-6 border border-blue-500/30">
              <h4 className="text-xl font-semibold text-blue-300 mb-4">Key Ratios to Monitor</h4>
              <div className="space-y-2">
                <p className="text-gray-200">• <span className="font-semibold text-blue-300">EV/EBITDA</span> - Valuation ratio</p>
                <p className="text-gray-200">• <span className="font-semibold text-blue-300">Debt/EBITDA</span> - Credit ratio</p>
              </div>
            </div>
          </div>
        </section>

        {/* Strategic Requirements */}
        <section className="bg-gradient-to-r from-violet-900/40 to-fuchsia-900/40 rounded-2xl p-8 backdrop-blur-sm border border-violet-500/20">
          <h3 className="text-2xl font-bold text-violet-300 mb-6 text-center">Strategic Requirements & Penalties</h3>
          
          <div className="grid gap-6">
            <div className="bg-black/40 rounded-lg p-6 border border-violet-500/30">
              <h4 className="text-xl font-semibold text-violet-300 mb-4">Investment Requirements</h4>
              <div className="space-y-3 text-gray-200">
                <p>• High revenue growth targets must be supported by sufficient investment in <span className="font-bold text-violet-300">Capital Expenditure (CapEx)</span></p>
                <p>• Adequate <span className="font-bold text-violet-300">Selling, General & Administrative (SG&A)</span> investment required to support growth</p>
                <p>• Insufficient investment will result in <span className="font-bold text-red-300">margin penalties</span></p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-lg p-6 border border-orange-500/30">
              <h4 className="text-xl font-semibold text-orange-300 mb-4">Growth Management</h4>
              <div className="space-y-3 text-gray-200">
                <p>• Rapid growth strains <span className="font-bold text-orange-300">working capital</span></p>
                <p>• Excessive growth rates will <span className="font-bold text-red-300">burn through cash</span></p>
                <p>• Balance growth ambitions with operational capacity</p>
              </div>
            </div>
            
            <div className="bg-black/40 rounded-lg p-6 border border-red-500/30">
              <h4 className="text-xl font-semibold text-red-300 mb-4">Debt Covenant Management</h4>
              <div className="space-y-3 text-gray-200">
                <p>• Monitor <span className="font-bold text-red-300">Debt/EBITDA ratio</span> closely</p>
                <p>• Breaching debt covenants results in <span className="font-bold text-red-300">higher interest rates</span></p>
                <p>• Covenant breaches will <span className="font-bold text-red-300">freeze dividend payments</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* Final Message */}
        <section className="text-center bg-gradient-to-r from-slate-800/60 to-gray-800/60 rounded-2xl p-8 backdrop-blur-sm border border-gray-500/30">
          <div className="space-y-4">
            <h3 className="text-3xl font-bold text-gray-300">Ready to Lead?</h3>
            <p className="text-xl text-gray-400 italic">"Good luck, CEO."</p>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-300 mx-auto mt-6"></div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-blue-500/30 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-400">
          <p>© Taxila Business School - Project Titan Simulation</p>
        </div>
      </footer>
    </div>
  );
}