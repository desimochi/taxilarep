"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Crown, 
  TrendingUp, 
  Settings, 
  AlertTriangle, 
  Users, 
  Factory, 
  DollarSign, 
  Target,
  Award,
  BarChart3,
  Building2,
  Briefcase,
  Bot,
  Eye,
  Calendar,
  Trophy,
  ArrowBigLeft
} from 'lucide-react';


const TaxilaCapitalQuestManual = () => {
    const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-2xl">
        <div className="px-8 py-8">
            <button onClick={()=>router.back()} className="text-gray-50 flex items-center gap-1"><ArrowBigLeft />Go Back</button>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Crown className="w-12 h-12 text-yellow-400" />
              <h1 className="text-5xl font-bold">Taxila Capital Quest</h1>
            </div>
            <h2 className="text-2xl font-semibold text-blue-200">The Official Player's Manual</h2>
            <div className="mt-4 px-4 py-2 bg-blue-800 rounded-full inline-block">
              <p className="text-sm">Designed at Taxila Business School for PGDM Students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* Section 1: Introduction */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-10 border-l-8 border-blue-600">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-100 p-4 rounded-full">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">1. Introduction: Your Role as CEO</h3>
          </div>
          
          <div className="space-y-6">
            <p className="text-xl font-semibold text-blue-700">Welcome, CEO.</p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              This simulation was designed at Taxila Business School for their PGDM students. You have been appointed 
              to lead a promising manufacturing company for a ten-year term. Your objective is simple but challenging: 
              <span className="font-bold text-blue-600"> maximize your final Company Value.</span>
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              You are operating in a dynamic, competitive market within the growing Indian economy. You will face a 
              persistent AI competitor, "Apex Innovations," and must navigate unpredictable market events, manage your 
              finances, and make difficult strategic decisions that will define your company's legacy.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Every choice you make will be reflected in your financial statements and your ultimate success or failure. 
              <span className="font-bold text-red-600"> The Board is watching.</span>
            </p>
          </div>
        </div>

        {/* Section 2: CEO's Dashboard */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-10 border-l-8 border-green-600">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-green-100 p-4 rounded-full">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">2. The CEO's Dashboard: Understanding Your Interface</h3>
          </div>
          
          <p className="text-lg text-gray-700 mb-8">Your screen is divided into three key areas:</p>
          
          {/* 2.1 KPIs */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-emerald-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">2.1. Key Performance Indicators (KPIs) - At a Glance</h4>
            </div>
            
            <p className="text-gray-700 mb-6">
              Located at the top, this bar gives you the most critical, real-time data:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-bold text-gray-900">Year:</span>
                </div>
                <p className="text-gray-700">The current year of the 10-year simulation.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="font-bold text-gray-900">Cash:</span>
                </div>
                <p className="text-gray-700">Your liquid capital, available for immediate investment.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-gray-900">Prev. Year Profit:</span>
                </div>
                <p className="text-gray-700">Your net profit or loss from the previous year.</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-red-600" />
                  <span className="font-bold text-gray-900">Current Loan:</span>
                </div>
                <p className="text-gray-700">The total outstanding principal on all your loans.</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl mt-6 border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-blue-600" />
                <span className="font-bold text-gray-900 text-lg">Company Value:</span>
              </div>
              <p className="text-gray-700">
                The ultimate measure of your success. It is a formula based on your cash, assets (like machinery), 
                inventory, and profitability, minus your debt.
              </p>
            </div>
          </div>

          {/* 2.2 Decision Panel */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-orange-100 p-3 rounded-full">
                <Settings className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">2.2. The Decision Panel - Your Strategic Toolkit</h4>
            </div>
            
            <p className="text-gray-700 mb-6">
              This is the main panel on the right where you will make all your yearly investment decisions using sliders:
            </p>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-xl border-l-4 border-pink-500">
                <h5 className="font-bold text-gray-900 mb-2">R&D Investment:</h5>
                <p className="text-gray-700">
                  Boosts your Product Quality over time, allowing you to command higher prices. A long-term strategy.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl border-l-4 border-yellow-500">
                <h5 className="font-bold text-gray-900 mb-2">Marketing Spend:</h5>
                <p className="text-gray-700">
                  Directly increases demand for your product in the current year, fighting for market share against your competitor.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border-l-4 border-green-500">
                <h5 className="font-bold text-gray-900 mb-2">Production Volume:</h5>
                <p className="text-gray-700">
                  The number of units you will manufacture this year. This directly impacts your workforce size and costs.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border-l-4 border-blue-500">
                <h5 className="font-bold text-gray-900 mb-2">Capital Investment:</h5>
                <p className="text-gray-700">
                  Improves your factory's machinery, reducing the cost to produce each unit. A long-term investment in efficiency.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border-l-4 border-purple-500">
                <h5 className="font-bold text-gray-900 mb-2">HR Training Investment:</h5>
                <p className="text-gray-700">
                  Increases your workforce's <span className="font-bold">Productivity Index</span>, meaning you need fewer employees 
                  (and lower labor costs) to produce the same number of goods.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border-l-4 border-gray-500">
                <h5 className="font-bold text-gray-900 mb-2">Additional Loan Repayment:</h5>
                <p className="text-gray-700">
                  Allows you to pay off your loans faster to reduce future interest payments.
                </p>
              </div>
            </div>
          </div>

          {/* 2.3 Information Panels */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Eye className="w-6 h-6 text-indigo-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">2.3. Information & Analysis Panels - Your Intelligence Briefing</h4>
            </div>
            
            <p className="text-gray-700 mb-6">
              The column on the left contains several cards that provide critical data for your decisions:
            </p>
            
            <div className="grid gap-4">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h5 className="font-bold text-gray-900 mb-2">Automation Crossroads:</h5>
                <p className="text-gray-700">This special card presents a one-time, game-altering strategic decision.</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-bold text-gray-900 mb-2">Market & Economic Outlook:</h5>
                <p className="text-gray-700">
                  Your most important briefing. It shows the projected GDP growth for the next year (which directly impacts demand), 
                  consumer confidence, and inflation. It also contains your competitor's last-known stats.
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h5 className="font-bold text-gray-900 mb-2">Cumulative Financials:</h5>
                <p className="text-gray-700">
                  A running total of your company's performance since Year 1, including total revenue, costs, and overall profitability.
                </p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h5 className="font-bold text-gray-900 mb-2">HR Department:</h5>
                <p className="text-gray-700">
                  Shows your current workforce size, total labor cost for the year (based on production), 
                  and your all-important Productivity Index.
                </p>
              </div>
              
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h5 className="font-bold text-gray-900 mb-2">Jaipur Imperial Bank:</h5>
                <p className="text-gray-700">Displays your mandatory loan payments and allows you to request new loans.</p>
              </div>
              
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h5 className="font-bold text-gray-900 mb-2">Hall of Fame:</h5>
                <p className="text-gray-700">Tracks your personal best scores from previous games.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h5 className="font-bold text-gray-900 mb-2">Yearly Log:</h5>
                <p className="text-gray-700">
                  A detailed, chronological record of every major event, success, and setback. 
                  Check this often to understand <em>why</em> things happened.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Core Mechanics */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-10 border-l-8 border-purple-600">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-purple-100 p-4 rounded-full">
              <Factory className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">3. Core Mechanics: The Engine of Business</h3>
          </div>
          
          {/* 3.1 Automation Crossroads */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-100 p-3 rounded-full">
                <Bot className="w-6 h-6 text-red-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">3.1. The Automation Crossroads</h4>
            </div>
            
            <p className="text-gray-700 mb-6">
              At the start of a Year, not first, you will face a pivotal choice. You will be offered the chance to invest in robotics.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h5 className="font-bold text-red-700 mb-3">The Cost:</h5>
                <p className="text-gray-700">
                  50% of your <span className="font-bold">cash on hand</span> at the start of the year, 
                  plus a severance package for laid-off employees.
                </p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h5 className="font-bold text-green-700 mb-3">The Benefit:</h5>
                <p className="text-gray-700">
                  Your workforce's productivity <span className="font-bold">doubles permanently</span>.
                </p>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
                <h5 className="font-bold text-orange-700 mb-3">The Human Cost:</h5>
                <p className="text-gray-700">
                  You must immediately lay off <span className="font-bold">50% of your previous year's workforce.</span> 
                  This decision is irreversible and will fundamentally shape the rest of your game.
                </p>
              </div>
            </div>
          </div>

          {/* 3.2 Executive Accountability */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">3.2. Executive Accountability: The Board is Watching</h4>
            </div>
            
            <p className="text-gray-700 mb-6">Your position is not guaranteed. The board expects results.</p>
            
            <div className="space-y-4">
              <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
                <h5 className="font-bold text-yellow-700 mb-2">First Year of Loss:</h5>
                <p className="text-gray-700">
                  You will receive an official <span className="font-bold">Warning from the Board</span> in your log.
                </p>
              </div>
              
              <div className="bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                <h5 className="font-bold text-red-700 mb-2">Two Consecutive Years of Losses:</h5>
                <p className="text-gray-700">
                  You will be <span className="font-bold">terminated immediately</span>, and the game will end.
                </p>
              </div>
            </div>
          </div>

          {/* 3.3 Market Dynamics */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">3.3. Market Dynamics & Demand</h4>
            </div>
            
            <p className="text-gray-700">
              The total demand in the market is influenced by the <span className="font-bold">Projected GDP Growth</span>. 
              Your share of that demand is determined by a battle between your <span className="font-bold">Marketing Spend</span> 
              and your <span className="font-bold">Product Quality</span> versus that of Apex Innovations.
            </p>
          </div>

          {/* 3.4 HR and Production */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">3.4. HR and Production</h4>
            </div>
            
            <p className="text-gray-700">
              Your <span className="font-bold">Production Volume</span> directly determines your <span className="font-bold">Workforce Size</span>. 
              More units require more employees, increasing your <span className="font-bold">Annual Labor Cost</span>. 
              Investing in <span className="font-bold">HR Training</span> increases your <span className="font-bold">Productivity Index</span>, 
              allowing you to make more units with fewer people, thus lowering your costs over the long term.
            </p>
          </div>
        </div>

        {/* Section 4: Winning the Game */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-10 mb-10 border-l-8 border-yellow-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-yellow-100 p-4 rounded-full">
              <Trophy className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">4. Winning the Game</h3>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              Your final score is your <span className="font-bold text-yellow-600">Company Value</span> at the end of Year 10. 
              A high score will earn you a place in the <span className="font-bold text-yellow-600">Hall of Fame.</span>
            </p>
            
            <p className="text-lg text-gray-700">
              Remember that bankruptcy or being terminated by the board will end the game prematurely. 
              A successful CEO must balance aggressive growth with financial stability.
            </p>
            
            <div className="bg-white p-6 rounded-xl border-2 border-yellow-300 text-center">
              <p className="text-xl font-bold text-gray-900">
                Good luck, CEO. The future of the company is in your hands.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxilaCapitalQuestManual;