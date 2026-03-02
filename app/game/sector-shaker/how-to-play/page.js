"use client"
import React from 'react';
import { Trophy, Target, BarChart3, Lightbulb, Users, TrendingUp, Award, Download, Play, Brain, MessageSquare, Search, Zap, ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SectorShakerManual() {
    const router = useRouter()
    function handleClick(){
        alert("yes")
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              SECTOR SHAKER
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-semibold">The Sales Challenge</p>
            <p className="text-xl mb-8 text-blue-200">Player's Manual</p>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <p className="text-lg leading-relaxed">
                Welcome, future industry leader! You are about to embark on the <strong className="text-yellow-400">Sector Shaker Challenge</strong>, a 5-year business simulation designed at Taxila Business School, Jaipur. Your mission is to launch a new venture in a competitive Indian market sector and grow it into a dominant force.
              </p>
              <p className="text-lg mt-4 text-blue-200">
                This manual will guide you through every phase of your journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Objective Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Target className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
          <h2 className="text-4xl font-bold mb-6">Objective</h2>
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-8 max-w-4xl mx-auto border border-green-500/30">
            <p className="text-2xl font-semibold mb-4">The goal is simple:</p>
            <p className="text-3xl font-bold text-yellow-400 mb-4">
              Maximize your company's turnover and market share over five simulated years.
            </p>
            <p className="text-lg text-blue-200">
              Your performance will be measured by your final turnover, your growth multiple, and the leadership title you earn.
            </p>
          </div>
        </div>
      </div>

      {/* Phases Section */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-16">The Five Phases</h2>
        
        {/* Phase 1 */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">1</div>
              <h3 className="text-3xl font-bold">Phase 1: Choose Your Battlefield</h3>
            </div>
            <p className="text-lg mb-6">Your first strategic decision is to select the industry you want to enter.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-500/20 rounded-xl p-6 border border-red-500/30">
                <div className="flex items-center mb-4">
                  <Search className="w-6 h-6 mr-2 text-red-400" />
                  <h4 className="text-xl font-semibold">Sector Selection</h4>
                </div>
                <p>You will see a grid of major Indian economic sectors (e.g., Automobile, E-commerce, EdTech).</p>
              </div>
              
              <div className="bg-red-500/20 rounded-xl p-6 border border-red-500/30">
                <div className="flex items-center mb-4">
                  <BarChart3 className="w-6 h-6 mr-2 text-red-400" />
                  <h4 className="text-xl font-semibold">Consider the Market</h4>
                </div>
                <p>Each sector has unique characteristics, including market size, growth potential (CAGR), and customer spending power. Click on a sector to analyze it more deeply.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 2 */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">2</div>
              <h3 className="text-3xl font-bold">Phase 2: Market Intelligence & Company Creation</h3>
            </div>
            <p className="text-lg mb-6">Once you've selected a sector, it's time to do your homework and build your company.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-orange-500/20 rounded-xl p-6 border border-orange-500/30">
                <div className="flex items-center mb-4">
                  <Brain className="w-6 h-6 mr-2 text-orange-400" />
                  <h4 className="text-xl font-semibold">Market Intelligence</h4>
                </div>
                <p className="mb-4">On the left, you'll find a detailed analysis of the sector:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <TrendingUp className="w-4 h-4 mr-2 mt-1 text-orange-400 flex-shrink-0" />
                    <div>
                      <strong>Key Trends:</strong> Understand the forces shaping the industry.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="w-4 h-4 mr-2 mt-1 text-orange-400 flex-shrink-0" />
                    <div>
                      <strong>Competitor Analysis:</strong> Study the top 5 existing companies. Pay close attention to their Turnover, Market Share, and especially their Unique Selling Propositions (USPs). This is your key to finding a weakness to exploit.
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-orange-500/20 rounded-xl p-6 border border-orange-500/30">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 mr-2 text-orange-400" />
                  <h4 className="text-xl font-semibold">Create Your Venture</h4>
                </div>
                <p className="mb-4">On the right, you will define your new company:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong>Company Name:</strong> Choose a name that reflects your brand.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                    <div>
                      <strong>Unique Selling Propositions (USPs):</strong> This is the most critical step. You must define three core strengths of your company. Your initial success is directly determined by how well your USPs align with market trends and differentiate you from the competition. Be specific and innovative!
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 3 */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="bg-yellow-500 text-black rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">3</div>
              <h3 className="text-3xl font-bold">Phase 3: Launch Assessment</h3>
            </div>
            <p className="text-lg mb-6">After submitting your company details, our AI analyst will evaluate your launch strategy.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-500/20 rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center mb-4">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                  <h4 className="text-xl font-semibold">Initial Valuation</h4>
                </div>
                <p>You will be assigned an <strong>Initial Annual Turnover</strong> and <strong>Market Share</strong> based on the strength of your USPs.</p>
              </div>
              
              <div className="bg-yellow-500/20 rounded-xl p-6 border border-yellow-500/30">
                <div className="flex items-center mb-4">
                  <MessageSquare className="w-6 h-6 mr-2 text-yellow-400" />
                  <h4 className="text-xl font-semibold">Analyst's Remarks</h4>
                </div>
                <p>Read the feedback carefully. It will provide insights into the strengths and weaknesses of your initial strategy.</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
              <p className="text-center font-semibold">From here, you will proceed to the Battlefield.</p>
            </div>
          </div>
        </div>

        {/* Phase 4 */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">4</div>
              <h3 className="text-3xl font-bold">Phase 4: Annual Strategy & Execution</h3>
            </div>
            <p className="text-lg mb-6">Each of the five years is a round of strategic decision-making. This phase begins when you click "Set Marketing Strategy" from the Battlefield.</p>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="bg-green-500/20 rounded-xl p-6 border border-green-500/30">
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">1</span>
                  Marketing Budget Allocation
                </h4>
                <ul className="space-y-2">
                  <li>• Your annual marketing budget is a percentage of your company's turnover from the previous year.</li>
                  <li>• Allocate this budget across three channels: <strong>Digital Marketing</strong>, <strong>Print Media</strong>, and <strong>Direct to Customer</strong>. Each channel has a different cost per lead and conversion rate. Use the sliders to allocate funds and observe the estimated leads and conversions you can generate.</li>
                </ul>
              </div>

              {/* Step 2 */}
              <div className="bg-green-500/20 rounded-xl p-6 border border-green-500/30">
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">2</span>
                  Initial Marketing Message
                </h4>
                <ul className="space-y-2">
                  <li>• After allocating your budget, you'll craft a marketing message.</li>
                  <li>• <strong>The Goal:</strong> Write a compelling message that resonates with the market. The effectiveness of this message (and your initial customer conversion rate) is determined by how well it incorporates keywords related to your USPs and the USPs of the market leaders.</li>
                </ul>
              </div>

              {/* Step 3 */}
              <div className="bg-green-500/20 rounded-xl p-6 border border-green-500/30">
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">3</span>
                  Handling Remaining Leads
                </h4>
                <p className="mb-4">Not all leads will convert on the first try. You have two options to engage the remaining leads:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-600/30 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">1. Conduct a Survey</h5>
                    <p className="text-sm">This costs money but provides valuable insights. You'll ask 7 questions. Questions that are relevant to the market's USPs will yield a high "Yes" percentage, revealing what customers truly care about.</p>
                  </div>
                  <div className="bg-green-600/30 rounded-lg p-4">
                    <h5 className="font-semibold mb-2">2. Send a Targeted Follow-up</h5>
                    <p className="text-sm">Skip the survey and send another message immediately. This is cheaper but less informed. Success depends on how well you can guess the market's needs.</p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-green-500/20 rounded-xl p-6 border border-green-500/30">
                <h4 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">4</span>
                  Follow-up Campaigns
                </h4>
                <ul className="space-y-2">
                  <li>• <strong>If you chose the survey:</strong> Use the insights from the survey results to craft a highly targeted follow-up message. A message that addresses the key points from your survey will have a high conversion rate.</li>
                  <li>• <strong>The Final Push:</strong> After the follow-up, you have one last chance to convert the very last group of remaining leads with a final, concise message. You can also choose to skip this and end your marketing for the year.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Phase 5 */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-6">
              <div className="bg-purple-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">5</div>
              <h3 className="text-3xl font-bold">Phase 5: The Battlefield</h3>
            </div>
            <p className="text-lg mb-6">This is your main dashboard, showing the state of the market at the end of each year's marketing cycle.</p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 mr-2 text-purple-400" />
                  <h4 className="text-lg font-semibold">Company Cards</h4>
                </div>
                <p className="text-sm">See how your company stacks up against the competition in terms of turnover, market share, and marketing spend.</p>
              </div>
              
              <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center mb-4">
                  <TrendingUp className="w-6 h-6 mr-2 text-purple-400" />
                  <h4 className="text-lg font-semibold">Market Dynamics</h4>
                </div>
                <p className="text-sm">View the overall health of the sector, including the total number of customers and their average spending power.</p>
              </div>
              
              <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-500/30">
                <div className="flex items-center mb-4">
                  <Play className="w-6 h-6 mr-2 text-purple-400" />
                  <h4 className="text-lg font-semibold">Game Actions</h4>
                </div>
                <p className="text-sm">From here, you can save your game, start a new one, or proceed to the next year.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5-Year Journey Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl p-8 border border-indigo-500/30">
          <div className="text-center mb-8">
            <Zap className="w-16 h-16 mx-auto mb-4 text-indigo-400" />
            <h2 className="text-4xl font-bold mb-4">The 5-Year Journey</h2>
            <p className="text-lg">When you click <strong>"Go to Year X"</strong>, the simulation advances:</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-indigo-600/30 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <TrendingUp className="w-8 h-8 mr-3 text-indigo-400" />
                <h3 className="text-xl font-semibold">Market Growth</h3>
              </div>
              <p>The entire market grows based on its CAGR. Competitors' turnovers and the total customer base will increase.</p>
            </div>
            
            <div className="bg-indigo-600/30 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-8 h-8 mr-3 text-indigo-400" />
                <h3 className="text-xl font-semibold">Company Growth</h3>
              </div>
              <p>Your company's turnover from the previous year (including new customers) becomes your new baseline, which then also grows by your company's assigned CAGR.</p>
            </div>
            
            <div className="bg-indigo-600/30 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Lightbulb className="w-8 h-8 mr-3 text-indigo-400" />
                <h3 className="text-xl font-semibold">Evolving USPs</h3>
              </div>
              <p>The market is not static! Each year, your competitors will innovate, and their USPs will change. You must adapt your strategy to keep up.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Winning Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-8 border border-yellow-500/30">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
            <h2 className="text-4xl font-bold mb-4">Winning the Game</h2>
            <p className="text-lg">After completing Year 5, you'll reach the end screen.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-yellow-600/30 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-6 h-6 mr-2 text-yellow-400" />
                <h3 className="text-lg font-semibold">Final Results</h3>
              </div>
              <p className="text-sm">Your performance is summarized, showing your initial turnover, final turnover, and overall growth multiple.</p>
            </div>
            
            <div className="bg-yellow-600/30 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Award className="w-6 h-6 mr-2 text-yellow-400" />
                <h3 className="text-lg font-semibold">Leadership Title</h3>
              </div>
              <p className="text-sm">Based on your growth multiple, you will be awarded a title.</p>
            </div>
            
            <div className="bg-yellow-600/30 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Download className="w-6 h-6 mr-2 text-yellow-400" />
                <h3 className="text-lg font-semibold">Certificate</h3>
              </div>
              <p className="text-sm">You can download a personalized Certificate of Achievement to commemorate your success.</p>
            </div>
          </div>

          <div className="bg-yellow-500/30 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-center">Leadership Titles</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-yellow-600/40 rounded-lg">
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <h4 className="font-semibold">Dedicated Participant</h4>
              </div>
              <div className="text-center p-4 bg-yellow-600/40 rounded-lg">
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <h4 className="font-semibold">Excellent Leader</h4>
                <p className="text-sm">(2x+ growth)</p>
              </div>
              <div className="text-center p-4 bg-yellow-600/40 rounded-lg">
                <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <h4 className="font-semibold">Extraordinary Leader</h4>
                <p className="text-sm">(10x+ growth)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-12 border border-blue-500/30">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Good luck, and may you shake up the sector!
            </h2>
            <div className="flex justify-center items-center space-x-4">
              <Trophy className="w-8 h-8 text-yellow-400" />
              <span className="text-lg font-semibold">Taxila Business School, Jaipur</span>
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}