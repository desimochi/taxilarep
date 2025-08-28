import React from 'react';
import { DollarSign, Target, Users, TrendingUp, Home, Car, CreditCard, Gift, Baby, Briefcase } from 'lucide-react';

export default function RatRaceManual() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-8 px-6 shadow-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Rat Race & Fast Track 3D
            </h1>
            <p className="text-2xl font-semibold text-blue-200">Player's Manual</p>
          </div>
          <div className="text-center">
            <p className="text-xl text-blue-100 font-medium">A Financial Literacy Game from Taxila Business School</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Section 1: Welcome */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-blue-500">
          <div className="flex items-center mb-6">
            <Gift className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">1. Welcome to the Game!</h2>
          </div>
          <div className="text-lg text-gray-700 space-y-4">
            <p>
              Welcome to <strong>Rat Race & Fast Track 3D</strong>, an interactive game designed to teach the core principles of financial freedom. Your journey will take you from the daily grind of the "Rat Race" to the wealth-building opportunities of the "Fast Track."
            </p>
            <p>
              The goal isn't just to get rich—it's to learn how money works. By making smart financial decisions, you can make your money work for you.
            </p>
          </div>
        </section>

        {/* Section 2: The Objective */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">2. The Objective</h2>
          </div>
          <div className="text-lg text-gray-700 space-y-4">
            <p>Your journey has two primary goals:</p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-3">1. Escape the Rat Race:</h3>
                <p className="text-red-700">The first phase of the game is about breaking free from your routine job. You achieve this by building up your <strong>passive income</strong> until it is greater than your total expenses.</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                <h3 className="text-xl font-bold text-purple-800 mb-3">2. Conquer the Fast Track:</h3>
                <p className="text-purple-700">Once you've escaped, you'll enter the Fast Track, where the real wealth is built. The ultimate goal here is to land on and purchase one of your "Dream" spaces to win the game!</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Getting Started */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-yellow-500">
          <div className="flex items-center mb-6">
            <Users className="w-8 h-8 text-yellow-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">3. Getting Started</h2>
          </div>
          <div className="text-lg text-gray-700 space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-800 mb-3">1. Enter Your Name:</h3>
                <p className="text-yellow-700">The game is personalized for you. Start by entering your name. The game will automatically save your progress under this name, so you can quit and resume anytime.</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                <h3 className="text-xl font-bold text-yellow-800 mb-3">2. Choose Your Profession:</h3>
                <p className="text-yellow-700">You will be asked to select a profession. This choice is crucial as it determines your starting salary, cash, expenses, assets, and liabilities. Each profession offers a different starting scenario and challenge.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Financial Statement */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-indigo-500">
          <div className="flex items-center mb-6">
            <DollarSign className="w-8 h-8 text-indigo-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">4. Understanding Your Financial Statement</h2>
          </div>
          <div className="text-lg text-gray-700 space-y-6">
            <p>Your Financial Statement is the most important tool in the game. It's on the left side of the screen and gives you a real-time snapshot of your financial health.</p>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Income Section */}
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2" />
                  Income:
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold text-green-700">Salary:</h4>
                    <p className="text-green-600">This is the money you earn from your job. It's your primary income at the start.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700">Passive Income:</h4>
                    <p className="text-green-600">This is money you earn from your assets (like stocks, real estate, or businesses) without actively working. <strong>This is the key to winning.</strong></p>
                  </div>
                </div>
              </div>

              {/* Expenses Section */}
              <div className="bg-red-50 p-6 rounded-xl border border-red-200">
                <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2" />
                  Expenses:
                </h3>
                <p className="text-red-600">This section lists all your monthly costs, such as taxes, mortgage, loans, and other living expenses.</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Cash Flow Section */}
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-blue-800 mb-4">Monthly Cash Flow:</h3>
                <p className="text-blue-600">This is the most critical number in the Rat Race. It is calculated as: <strong>Total Income - Total Expenses</strong>. A positive cash flow means you have money left over each month, while a negative cash flow means you're losing money.</p>
              </div>

              {/* Assets & Liabilities */}
              <div className="space-y-4">
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                  <h3 className="text-lg font-bold text-emerald-800 mb-2">Assets:</h3>
                  <p className="text-emerald-600">These are things that put money <em>in</em> your pocket. The goal is to acquire as many income-generating assets as possible.</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <h3 className="text-lg font-bold text-orange-800 mb-2">Liabilities:</h3>
                  <p className="text-orange-600">These are things that take money <em>out</em> of your pocket, like your mortgage, car loan, and credit card debt.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: How to Play */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-purple-500">
          <div className="flex items-center mb-6">
            <Briefcase className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">5. How to Play: The Rat Race</h2>
          </div>
          
          <div className="space-y-8">
            {/* Taking a Turn */}
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Taking a Turn</h3>
              <p className="text-lg text-purple-700">Your turn begins by clicking the <strong>"Roll Dice"</strong> button. Your 3D token will move around the board, and you will land on one of several space types.</p>
            </div>

            {/* Board Spaces */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Board Spaces</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-5 rounded-xl border-2 border-green-300">
                  <h4 className="font-bold text-green-800 mb-2">Pay Day:</h4>
                  <p className="text-green-700 text-sm">Each time you land on or pass this space, you collect your Monthly Cash Flow. If your cash flow is negative, you must pay that amount!</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-5 rounded-xl border-2 border-blue-300">
                  <h4 className="font-bold text-blue-800 mb-2">Opportunity:</h4>
                  <p className="text-blue-700 text-sm">Landing here gives you a chance to buy an asset. These can be small deals or large deals. Analyze the deal carefully: does it generate positive cash flow?</p>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-5 rounded-xl border-2 border-yellow-300">
                  <h4 className="font-bold text-yellow-800 mb-2">Market:</h4>
                  <p className="text-yellow-700 text-sm">These spaces trigger an event that could affect your finances, like a stock market boom or a real estate opportunity.</p>
                </div>
                
                <div className="bg-gradient-to-br from-red-100 to-red-200 p-5 rounded-xl border-2 border-red-300">
                  <h4 className="font-bold text-red-800 mb-2">Doodad:</h4>
                  <p className="text-red-700 text-sm">You are forced to spend money on a non-essential item. This represents the unexpected expenses in life that can derail your financial plans.</p>
                </div>
                
                <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-5 rounded-xl border-2 border-pink-300">
                  <h4 className="font-bold text-pink-800 mb-2">Charity:</h4>
                  <p className="text-pink-700 text-sm">You have the option to donate 10% of your total income. If you do, you can roll two dice for your next turn.</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-5 rounded-xl border-2 border-purple-300">
                  <h4 className="font-bold text-purple-800 mb-2 flex items-center">
                    <Baby className="w-4 h-4 mr-1" />
                    Baby:
                  </h4>
                  <p className="text-purple-700 text-sm">Congratulations! You have a new child. Unfortunately, this also means your expenses increase.</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-5 rounded-xl border-2 border-gray-300 md:col-span-2 lg:col-span-1">
                  <h4 className="font-bold text-gray-800 mb-2">Downsized:</h4>
                  <p className="text-gray-700 text-sm">You lose your job. You must pay one month's worth of your total expenses and you will miss your next two turns.</p>
                </div>
              </div>
            </div>

            {/* Financial Actions */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Financial Actions</h3>
              <p className="text-lg text-gray-700 mb-4">On the right panel, you have several options:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
                  <h4 className="font-bold text-indigo-800 mb-2">Take Loan:</h4>
                  <p className="text-indigo-700 text-sm">You can borrow money from the bank. This increases your cash but also adds a "Bank Loan" liability and a "Bank Loan EMI" expense, reducing your monthly cash flow.</p>
                </div>
                
                <div className="bg-teal-50 p-5 rounded-xl border border-teal-200">
                  <h4 className="font-bold text-teal-800 mb-2">Repay Loan:</h4>
                  <p className="text-teal-700 text-sm">Use your available cash to pay back your bank loan.</p>
                </div>
                
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 md:col-span-2">
                  <h4 className="font-bold text-emerald-800 mb-2">Pay Off Other Debts:</h4>
                  <p className="text-emerald-700 text-sm">Use your cash to pay down your other liabilities, like your mortgage or credit card debt. Paying these off will reduce your monthly expenses and increase your cash flow.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Escaping the Rat Race */}
        <section className="mb-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl shadow-lg p-8 border-2 border-green-300">
          <div className="flex items-center mb-6">
            <TrendingUp className="w-8 h-8 text-green-600 mr-3" />
            <h2 className="text-3xl font-bold text-green-800">6. Escaping the Rat Race</h2>
          </div>
          <div className="text-lg text-green-800 space-y-4">
            <p className="text-xl font-semibold">
              You escape the Rat Race the moment your <strong>Passive Income is greater than your Total Expenses</strong>.
            </p>
            <p>
              When this happens, you are no longer dependent on your salary. A pop-up will appear to congratulate you, and you will have the option to <strong>download a personalized Certificate of Achievement</strong> from Taxila Business School to celebrate this milestone!
            </p>
          </div>
        </section>

        {/* Section 7: Fast Track */}
        <section className="mb-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-orange-500">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-orange-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">7. Playing on the Fast Track</h2>
          </div>
          <div className="text-lg text-gray-700 space-y-6">
            <p>The Fast Track is a new board with bigger risks and bigger rewards. Your goal is now to either land on and buy your dream or accumulate a massive monthly cash flow.</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 p-6 rounded-xl border-2 border-cyan-300">
                <h4 className="font-bold text-cyan-800 mb-3">Cash Flow Day:</h4>
                <p className="text-cyan-700">Landing here gives you a massive cash injection equal to 10 times your current passive income!</p>
              </div>
              
              <div className="bg-gradient-to-br from-violet-100 to-violet-200 p-6 rounded-xl border-2 border-violet-300">
                <h4 className="font-bold text-violet-800 mb-3">Business Deals:</h4>
                <p className="text-violet-700">Invest in large-scale businesses that can dramatically increase your passive income.</p>
              </div>
              
              <div className="bg-gradient-to-br from-gold-100 to-yellow-200 p-6 rounded-xl border-2 border-yellow-400">
                <h4 className="font-bold text-yellow-800 mb-3">Your Dream:</h4>
                <p className="text-yellow-700">Land on one of these spaces and have enough cash to buy it, and you win the game!</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-100 to-rose-200 p-6 rounded-xl border-2 border-red-300">
                <h4 className="font-bold text-red-800 mb-3">Life Events:</h4>
                <p className="text-red-700">Be careful of spaces like Divorce or Lawsuit, which can have a major negative impact on your finances.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Winning */}
        <section className="mb-12 bg-gradient-to-br from-gold-100 to-yellow-100 rounded-2xl shadow-lg p-8 border-2 border-yellow-400">
          <div className="flex items-center mb-6">
            <Target className="w-8 h-8 text-yellow-600 mr-3" />
            <h2 className="text-3xl font-bold text-yellow-800">8. Winning the Game</h2>
          </div>
          <div className="text-lg text-yellow-800 space-y-4">
            <p className="text-xl font-semibold">
              You win the game by landing on a <strong>Dream</strong> space on the Fast Track and having enough cash on hand to purchase it. Fulfilling your dream is the ultimate sign of financial freedom.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="text-center bg-gradient-to-r from-blue-900 to-indigo-800 text-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Good luck, and may your assets always outgrow your liabilities!</h2>
          <p className="text-blue-200 text-lg">— Taxila Business School</p>
        </section>
      </div>
    </div>
  );
}