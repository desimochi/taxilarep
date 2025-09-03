"use client"
import React from 'react';
import { BookOpen, User, Target, Palette, Award, Share2, Volume2, ArrowBigLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WordifyPlayerManual = () => {
    const router = useRouter()
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      
      <div className="bg-white shadow-lg border-b-4 border-blue-600">
        <div className="px-8 py-8">
            <button onClick={()=>router.back()} className="text-gray-800 flex items-center gap-1"><ArrowBigLeft />Go Back</button>
        </div>
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">TAXILA BUSINESS SCHOOL</h1>
            <div className="flex items-center justify-center gap-3 mt-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <h2 className="text-3xl font-semibold text-blue-600">Wordify: Player Manual</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to Wordify, the daily word challenge designed to test your vocabulary and deduction skills! 
            This manual will guide you through everything you need to know to play and succeed.
          </p>
        </div>

        {/* Section 1: Getting Started */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">1. Getting Started: Enter Your Name</h3>
          </div>
          
          <p className="text-gray-700 mb-6">
            When you first launch the game, you'll be asked to enter your name.
          </p>
          
          <div className="space-y-4 ml-6">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-blue-600 mt-1">•</span>
              <div>
                <span className="font-semibold text-gray-900">Why?</span>
                <span className="text-gray-700 ml-2">
                  Your name is used to personalize your "Certificate of Participation" after you complete the day's challenge.
                </span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="font-semibold text-blue-600 mt-1">•</span>
              <div>
                <span className="font-semibold text-gray-900">Privacy:</span>
                <span className="text-gray-700 ml-2">
                  Your name is saved only on your own device in your browser's local storage for convenience. 
                  It is not sent to any server.
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mt-6">
            Once you enter your name and click "Start Game," you're ready for the first puzzle!
          </p>
        </div>

        {/* Section 2: How to Play */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-100 p-3 rounded-full">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">2. How to Play: The Daily Challenge</h3>
          </div>
          
          <p className="text-gray-700 mb-6">
            The goal of Wordify is to guess <span className="font-bold text-green-600">10 secret five-letter words</span> in a row. 
            For each secret word, you have <span className="font-bold text-green-600">6 attempts</span>.
          </p>
          
          <div className="space-y-4 ml-6">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-green-600 mt-1">•</span>
              <div>
                <span className="font-semibold text-gray-900">Making a Guess:</span>
                <span className="text-gray-700 ml-2">
                  Type a five-letter word using your physical keyboard or the on-screen keyboard and press <span className="font-bold">Enter</span>.
                </span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="font-semibold text-green-600 mt-1">•</span>
              <div>
                <span className="font-semibold text-gray-900">Valid Words:</span>
                <span className="text-gray-700 ml-2">
                  Your guess must be a valid five-letter word from the game's dictionary.
                </span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="font-semibold text-green-600 mt-1">•</span>
              <div>
                <span className="font-semibold text-gray-900">Moving On:</span>
                <span className="text-gray-700 ml-2">
                  After you correctly guess a word, or if you run out of attempts, you will click the "Next Word" 
                  button to move on to the next puzzle in the sequence.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Understanding Colors */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-full">
              <Palette className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">3. Understanding the Colors: Your Clues</h3>
          </div>
          
          <p className="text-gray-700 mb-6">
            After each guess, the tiles will flip and change color, giving you clues to solve the puzzle.
          </p>
          
          <div className="space-y-6 ml-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                🟩
              </div>
              <div>
                <span className="font-semibold text-gray-900">Green:</span>
                <span className="text-gray-700 ml-2">
                  The letter is in the secret word, and it's in the <span className="font-bold">correct position</span>.
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                🟨
              </div>
              <div>
                <span className="font-semibold text-gray-900">Yellow:</span>
                <span className="text-gray-700 ml-2">
                  The letter is in the secret word, but it's in the <span className="font-bold">wrong position</span>.
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                ⬜
              </div>
              <div>
                <span className="font-semibold text-gray-900">Gray:</span>
                <span className="text-gray-700 ml-2">
                  The letter is <span className="font-bold">not in the secret word</span> at all.
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 mt-6">
            Use these clues to inform your next guess and narrow down the possibilities.
          </p>
        </div>

        {/* Section 4: Certificate and Sharing */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Award className="w-6 h-6 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">4. Certificate of Participation & Sharing</h3>
          </div>
          
          <p className="text-gray-700 mb-6">
            Once you have completed all 10 words for the day, the game will end, and you'll be presented with your final score.
          </p>
          
          <div className="space-y-4 ml-6">
            <div className="flex items-start gap-3">
              <span className="font-semibold text-yellow-600 mt-1">•</span>
              <div>
                <span className="font-semibold text-gray-900">Your Certificate:</span>
                <span className="text-gray-700 ml-2">
                  A personalized "Certificate of Participation" will be generated, displaying your name, 
                  your final score, and the date.
                </span>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <span className="font-semibold text-yellow-600 mt-1">•</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">Share on LinkedIn:</span>
                  <Share2 className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  You can celebrate your achievement by clicking the "Share on LinkedIn" button. 
                  This will open a new tab with a pre-populated post, making it easy to share your success with your network.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Sound Settings */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-red-100 p-3 rounded-full">
              <Volume2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">5. Sound Settings</h3>
          </div>
          
          <p className="text-gray-700">
            The game includes sound effects for a more interactive experience. You can toggle the sound on or off 
            at any time by clicking the sound icon in the top-right corner of the screen.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-gray-600 italic text-lg">
            Created at Taxila Business School
          </p>
        </div>
      </div>
    </div>
  );
};

export default WordifyPlayerManual;