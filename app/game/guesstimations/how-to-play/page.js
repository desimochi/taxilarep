'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Brain, Target, Trophy, Users, Zap, Calculator } from 'lucide-react'

export default function AndazaApnaApnaManual() {
  const [expandedSections, setExpandedSections] = useState({})

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10"></div>
        <div className="relative z-10 container mx-auto px-6 py-16 text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Andaza Apna Apna
            </h1>
            <p className="text-2xl text-gray-300 font-light">Player Manual</p>
            <div className="mt-4 inline-block px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-sm font-semibold">
              Taxila Business School
            </div>
          </div>
          <div className="flex justify-center items-center space-x-8 text-cyan-300">
            <div className="flex items-center">
              <Brain className="w-6 h-6 mr-2" />
              <span>Logic</span>
            </div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <div className="flex items-center">
              <Target className="w-6 h-6 mr-2" />
              <span>Intuition</span>
            </div>
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <div className="flex items-center">
              <Trophy className="w-6 h-6 mr-2" />
              <span>Victory</span>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center mb-6">
            <Zap className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-3xl font-bold text-cyan-400">Welcome to the Game!</h2>
          </div>
          <div className="text-lg leading-relaxed space-y-4">
            <p>
              Welcome to <strong className="text-cyan-400">Andaza Apna Apna</strong>, the guesstimation game where your logic 
              and intuition are more important than knowing the exact answer! Get ready to challenge your wits against our 
              resident AI geniuses, <span className="text-purple-400 font-semibold">Asha</span> and <span className="text-orange-400 font-semibold">Bala</span>, in a 
              <span className="text-yellow-400 font-bold">10-round contest</span> of outrageous questions and educated guesses.
            </p>
            <p>
              In this game, a good estimate and a smart bet can lead you to victory.
            </p>
          </div>
        </div>
      </section>

      {/* The Goal */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-lg rounded-3xl p-8 border border-green-400/30 shadow-2xl">
          <div className="flex items-center mb-6">
            <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-3xl font-bold text-green-400">The Goal</h2>
          </div>
          <p className="text-xl leading-relaxed">
            Your objective is simple: <strong className="text-yellow-400 text-2xl">have the most points at the end of 10 rounds</strong>. 
            You'll earn points in two distinct phases each round by making accurate guesses, logically deconstructing complex problems, 
            and cleverly betting on who you think has the best answer.
          </p>
        </div>
      </section>

      {/* How to Play */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            How to Play: A Round in Two Parts
          </h2>
          <p className="text-center text-lg mb-12 text-gray-300">
            Each round in "Andaza Apna Apna" is a two-part challenge designed to test different skills.
          </p>

          {/* Part 1: Standard Sawaal */}
          <div className="mb-12">
            <div 
              className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 border border-blue-400/30 cursor-pointer hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300"
              onClick={() => toggleSection('part1')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</div>
                  <h3 className="text-2xl font-bold text-blue-400">Part 1: The Standard Sawaal (The Guess & Bet)</h3>
                </div>
                {expandedSections.part1 ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </div>
              <p className="text-gray-300 mt-2 ml-12">This is a fast-paced test of your general knowledge and betting instincts.</p>
            </div>

            {expandedSections.part1 && (
              <div className="mt-4 ml-4 space-y-6">
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-blue-400">
                  <h4 className="text-xl font-semibold text-blue-300 mb-3 flex items-center">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                    The Question
                  </h4>
                  <p className="text-gray-300">At the start of the round, a "Standard Sawaal" with a numerical answer will be presented.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-400">
                  <h4 className="text-xl font-semibold text-green-300 mb-3 flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">2</span>
                    Your Guess
                  </h4>
                  <p className="text-gray-300">A holographic keypad will appear. Use it to type in your best estimate for the answer and press <strong className="text-yellow-400">OK</strong>.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-purple-400">
                  <h4 className="text-xl font-semibold text-purple-300 mb-3 flex items-center">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">3</span>
                    The Reveal
                  </h4>
                  <p className="text-gray-300">Once you've submitted your guess, your AI opponents, Asha and Bala, will reveal their guesses. Their answers will appear on 3D cards in the center of the game area.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-orange-400">
                  <h4 className="text-xl font-semibold text-orange-300 mb-3 flex items-center">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">4</span>
                    Place Your Bet
                  </h4>
                  <p className="text-gray-300">Now it's time for the most crucial step! A 3D betting chip will appear in front of you. <strong className="text-yellow-400">Drag and drop this chip</strong> onto the guess card (yours or an AI's) that you believe is closest to the correct answer.</p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-red-400">
                  <h4 className="text-xl font-semibold text-red-300 mb-3 flex items-center">
                    <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">5</span>
                    The Results
                  </h4>
                  <div className="text-gray-300 space-y-2">
                    <p>The correct answer will be revealed. Points are awarded as follows:</p>
                    <ul className="ml-6 space-y-2">
                      <li className="flex items-center">
                        <span className="text-green-400 text-2xl font-bold mr-3">10</span>
                        <span><strong className="text-green-400">Points</strong> to the player whose guess was closest.</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-yellow-400 text-2xl font-bold mr-3">15</span>
                        <span><strong className="text-yellow-400">Bonus Points</strong> to you if you correctly bet on the winning guess.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Part 2: Fermi Sawaal */}
          <div className="mb-12">
            <div 
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30 cursor-pointer hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300"
              onClick={() => toggleSection('part2')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</div>
                  <h3 className="text-2xl font-bold text-purple-400">Part 2: The Fermi Sawaal (The Logic Puzzle)</h3>
                </div>
                {expandedSections.part2 ? <ChevronDown className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
              </div>
              <p className="text-gray-300 mt-2 ml-12">After the Standard Sawaal, the round immediately continues with a logic-based challenge.</p>
            </div>

            {expandedSections.part2 && (
              <div className="mt-4 ml-4 space-y-6">
                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-purple-400">
                  <h4 className="text-xl font-semibold text-purple-300 mb-3 flex items-center">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3">1</span>
                    The Puzzle
                  </h4>
                  <p className="text-gray-300">
                    A "Fermi Sawaal" will be presented. This is a complex problem that's nearly impossible to know the exact answer to 
                    <span className="text-cyan-400 italic"> (e.g., "How many samosas are sold in Delhi every day?")</span>.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-green-400">
                  <h4 className="text-xl font-semibold text-green-300 mb-3 flex items-center">
                    <Calculator className="w-6 h-6 mr-2" />
                    Deconstruct the Problem
                  </h4>
                  <p className="text-gray-300">
                    Instead of guessing the final number, you must use logic to estimate the values of the <strong className="text-yellow-400">component variables</strong> that make up the problem. 
                    An input panel will appear for you to enter your estimates for each part.
                  </p>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border-l-4 border-orange-400">
                  <h4 className="text-xl font-semibold text-orange-300 mb-3 flex items-center">
                    <Trophy className="w-6 h-6 mr-2" />
                    The Calculation & Scoring
                  </h4>
                  <div className="text-gray-300 space-y-3">
                    <p>
                      Once you submit your estimates, the game will reveal the correct values for each variable and calculate the final answer. 
                      You don't need to be close to the final answer; your score is based on your reasoning.
                    </p>
                    <p className="font-semibold text-cyan-400">Points are awarded as follows:</p>
                    <ul className="ml-6 space-y-2">
                      <li className="flex items-center">
                        <span className="text-green-400 text-2xl font-bold mr-3">10</span>
                        <span><strong className="text-green-400">Points</strong> for each variable you estimated more accurately than your opponents.</span>
                      </li>
                      <li className="flex items-center">
                        <span className="text-yellow-400 text-2xl font-bold mr-3">15</span>
                        <span><strong className="text-yellow-400">Bonus Points</strong> to the player whose overall logic (their derived answer) was the most accurate.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-xl p-6 border border-cyan-400/30">
                  <p className="text-center text-lg font-semibold text-cyan-300">
                    After the Fermi Sawaal is scored, the round is complete, and the next round begins.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Meet Your Opponents */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex items-center justify-center mb-8">
            <Users className="w-8 h-8 text-cyan-400 mr-3" />
            <h2 className="text-3xl font-bold text-cyan-400">Meet Your Opponents</h2>
          </div>
          <p className="text-center text-lg mb-8 text-gray-300">
            You'll be playing against two distinct AI personalities:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Asha */}
            <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 rounded-2xl p-6 border border-purple-400/30 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                  A
                </div>
                <h3 className="text-2xl font-bold text-purple-400 mb-2">Asha (The Analyst)</h3>
                <div className="bg-purple-500/20 rounded-lg p-4 text-left space-y-2">
                  <p className="text-gray-300">
                    Asha is <strong className="text-purple-300">cautious and logical</strong>. Her guesses are usually well-reasoned and fall within a sensible range.
                  </p>
                  <p className="text-gray-300">
                    She is a <strong className="text-green-400">reliable</strong>, but sometimes <strong className="text-yellow-400">conservative</strong>, player to bet on.
                  </p>
                </div>
                <div className="mt-4 inline-block px-4 py-2 bg-purple-500/30 rounded-full text-sm font-semibold">
                  Reliable Strategy
                </div>
              </div>
            </div>

            {/* Bala */}
            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl p-6 border border-orange-400/30 shadow-xl hover:scale-105 transition-transform duration-300">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
                  B
                </div>
                <h3 className="text-2xl font-bold text-orange-400 mb-2">Bala (The Bold)</h3>
                <div className="bg-orange-500/20 rounded-lg p-4 text-left space-y-2">
                  <p className="text-gray-300">
                    Bala is a <strong className="text-orange-300">risk-taker</strong>. He's not afraid to make a wild guess, which can sometimes be 
                    <strong className="text-green-400"> surprisingly accurate</strong> and other times <strong className="text-red-400">spectacularly wrong</strong>.
                  </p>
                  <p className="text-gray-300">
                    Betting on Bala is a <strong className="text-yellow-400">high-risk, high-reward</strong> strategy.
                  </p>
                </div>
                <div className="mt-4 inline-block px-4 py-2 bg-orange-500/30 rounded-full text-sm font-semibold">
                  High-Risk Strategy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Winning the Game */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 border border-yellow-400/30 shadow-2xl">
          <div className="flex items-center justify-center mb-6">
            <Trophy className="w-8 h-8 text-yellow-400 mr-3" />
            <h2 className="text-3xl font-bold text-yellow-400">Winning the Game</h2>
          </div>
          <div className="text-center">
            <p className="text-xl leading-relaxed mb-6">
              The game concludes after the <strong className="text-yellow-400">10th round</strong>. All points are tallied, and the 
              player with the highest score is crowned the <strong className="text-gradient bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent text-2xl">"Andaza Apna Apna" champion!</strong>
            </p>
            <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-2xl p-6 inline-block">
              <p className="text-2xl font-bold text-yellow-300">Good luck!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference Card */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">Quick Reference: Scoring System</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-500/20 rounded-xl p-4">
              <h3 className="text-lg font-bold text-blue-300 mb-3">Standard Sawaal Points</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Closest Guess</span>
                  <span className="text-green-400 font-bold">10 pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Correct Bet</span>
                  <span className="text-yellow-400 font-bold">15 pts</span>
                </div>
              </div>
            </div>
            <div className="bg-purple-500/20 rounded-xl p-4">
              <h3 className="text-lg font-bold text-purple-300 mb-3">Fermi Sawaal Points</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Per Accurate Variable</span>
                  <span className="text-green-400 font-bold">10 pts</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Most Accurate Logic</span>
                  <span className="text-yellow-400 font-bold">15 pts</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-8 text-center">
        <div className="border-t border-white/20 pt-8">
          <p className="text-gray-400">
            © Taxila Business School • Andaza Apna Apna Player Manual
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Ready to test your logic and intuition? Let the game begin!
          </p>
        </div>
      </footer>
    </div>
  )
}