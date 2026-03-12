import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Target, GraduationCap, Calculator, 
  Clock, Trophy, Lightbulb, Share2, CheckCircle, 
  XCircle, AlertCircle, ChevronRight, Menu, X
} from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'intro', title: '1. Introduction', icon: BookOpen },
    { id: 'courses', title: '2. Courses Covered', icon: GraduationCap },
    { id: 'outcomes', title: '3. Learning Outcomes', icon: Target },
    { id: 'concepts', title: '4. Core Concepts', icon: Lightbulb },
    { id: 'gameplay', title: '5. Gameplay Mechanics', icon: Clock },
    { id: 'math', title: '6. Mathematical Walkthrough', icon: Calculator },
    { id: 'scoring', title: '7. Evaluation & Scoring', icon: Trophy },
    { id: 'certification', title: '8. Certification', icon: Share2 },
    { id: 'tips', title: '9. Tips for Success', icon: AlertCircle },
  ];

  // Optional: Add scroll spy to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const currentScrollPosition = window.scrollY + 100;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= currentScrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 30,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      
      {/* Mobile Header & Menu */}
      <div className="lg:hidden bg-indigo-900 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <h1 className="font-bold text-lg truncate">START-UP CAP-1 Manual</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-indigo-800 rounded">
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto border-t border-slate-200 shadow-xl">
          <div className="p-4 space-y-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`flex items-center w-full text-left p-3 rounded-lg transition-colors ${activeSection === s.id ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <s.icon className="w-5 h-5 mr-3" />
                {s.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <header className="bg-indigo-900 text-white pt-20 pb-16 px-6 lg:px-12 relative overflow-hidden hidden lg:block">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-2/3">
            <div className="inline-block px-3 py-1 bg-indigo-800 rounded-full text-indigo-200 text-sm font-semibold tracking-wider mb-4 border border-indigo-700">OFFICIAL PLAYER'S MANUAL</div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">START-UP CAP-1: The Ultimate Cap Table Simulation</h1>
            <p className="text-xl text-indigo-200 font-light max-w-2xl">A comprehensive guide to mastering venture capital mechanics, dilution, and founder exits.</p>
          </div>
          <div className="md:w-1/3 mt-8 md:mt-0 flex flex-col items-start md:items-end">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <p className="text-sm text-indigo-200 uppercase tracking-widest font-semibold mb-1">Developed At</p>
              <p className="text-xl font-bold mb-4">Taxila Business School</p>
              <p className="text-sm text-indigo-200 uppercase tracking-widest font-semibold mb-1">Approved By</p>
              <p className="text-lg font-medium">Prof. Rajat Bohra, Dean</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:py-12 px-4 sm:px-6 lg:px-8 gap-12">
        
        {/* Desktop Sidebar Navigation */}
        <nav className="hidden lg:block w-72 shrink-0 sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide pr-6">
          <div className="space-y-1 border-l-2 border-slate-200 pl-4">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`flex items-center w-full text-left py-3 px-4 rounded-r-lg transition-all duration-200 group relative -ml-[18px] ${activeSection === s.id ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'}`}
              >
                {/* Active Indicator Line */}
                <span className={`absolute left-0 top-0 bottom-0 w-[2px] transition-colors ${activeSection === s.id ? 'bg-indigo-600' : 'bg-transparent group-hover:bg-slate-300'}`}></span>
                <s.icon className={`w-4 h-4 mr-3 ${activeSection === s.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="text-sm">{s.title}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content Area */}
        <main className="flex-1 w-full bg-white shadow-xl shadow-slate-200/50 rounded-2xl p-6 lg:p-12 mb-20 ring-1 ring-slate-100">
          
          <div className="prose prose-slate prose-indigo max-w-none">
            
            {/* 1. Introduction */}
            <section id="intro" className="scroll-mt-24 mb-16">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg"><BookOpen size={24} /></div>
                <h2 className="text-3xl font-bold m-0 text-slate-900">1. Introduction and Welcome</h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-600">
                Welcome to START-UP CAP-1, an immersive, interactive, and academically rigorous financial simulation designed exclusively for the PGDM students at Taxila Business School. This simulation bridges the gap between theoretical corporate finance and the high-stakes, practical world of venture capital and startup fundraising.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 mt-4">
                As a business student, you are likely aware that building a successful startup requires more than just a brilliant idea and relentless execution. It requires capital. However, capital is never free; it comes at the cost of equity. Every time a founder raises money, they must give away a piece of their company. If founders do not possess a deep, mathematical understanding of how equity is distributed, diluted, and valued over multiple rounds of funding, they risk losing control of their own creation and walking away with a fraction of what they deserve during an acquisition or IPO.
              </p>
              <p className="text-lg leading-relaxed text-slate-600 mt-4">
                The START-UP CAP-1 simulation places you directly into the shoes of a startup founder. You will take the helm of a fictitious company (which you get to name yourself) alongside your co-founders. Starting from "Day 0" with 100% ownership, you will navigate through three distinct, critical stages of startup funding: an Angel Investment round, a Series A Venture Capital round (which introduces the complexities of an Employee Stock Ownership Plan or ESOP), and a massive Series B growth round. Finally, you will simulate a high-value exit (acquisition) to see exactly how the financial pie is sliced.
              </p>
            </section>

            {/* 2. Courses Covered */}
            <section id="courses" className="scroll-mt-24 mb-16">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><GraduationCap size={24} /></div>
                <h2 className="text-3xl font-bold m-0 text-slate-900">2. Courses Covered & Academic Integration</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                The START-UP CAP-1 simulation is not an isolated game; it is a highly integrated pedagogical tool designed to synthesize concepts from multiple core and elective courses in the Taxila Business School PGDM curriculum.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">2.1. Corporate Finance</h3>
                  <p className="text-slate-600 text-sm">Deal with the fundamental accounting equation as it applies to equity. Calculate post-money valuations, understand authorized vs. issued shares, and see how the balance sheet's equity section evolves.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">2.2. Entrepreneurship</h3>
                  <p className="text-slate-600 text-sm">Experience the financial lifecycle of a startup. Learn the psychological and mathematical reality of founder dilution, learning that owning a smaller piece of a massive pie is generally better than 100% of nothing.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">2.3. Venture Capital (VC/PE)</h3>
                  <p className="text-slate-600 text-sm">A masterclass in VC deal-making. Learn how VCs value companies, demand specific equity targets, and experience the "ESOP Shuffle" to protect their investments from dilution.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">2.4. Financial Modeling</h3>
                  <p className="text-slate-600 text-sm">Do the exact Cap Table modeling that junior analysts at VC firms and investment banks do. Set up algebraic equations to solve for unknown share counts based on target percentages.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 md:col-span-2">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">2.5. Strategic HR Management (SHRM)</h3>
                  <p className="text-slate-600 text-sm">Startups use equity (ESOPs) to attract, retain, and motivate crucial early employees. Understanding how to size this pool mathematically without overly diluting the founders is a key crossover skill between HR and Finance.</p>
                </div>
              </div>
            </section>

            {/* 3. Learning Outcomes */}
            <section id="outcomes" className="scroll-mt-24 mb-16">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg"><Target size={24} /></div>
                <h2 className="text-3xl font-bold m-0 text-slate-900">3. Learning Outcomes</h2>
              </div>
              <ul className="space-y-4">
                {[
                  { title: 'Mastery of Valuation Terminology', desc: 'Flawlessly articulate and calculate the relationship between Investment Amount, Pre-Money Valuation, and Post-Money Valuation.' },
                  { title: 'Dilution Mechanics', desc: 'Practically understand how issuing new shares dilutes the ownership percentage of existing shareholders, even though total value increases.' },
                  { title: 'Cap Table Construction', desc: 'Build a capitalization table from scratch, tracking share counts and ownership percentages across multiple complex rounds.' },
                  { title: 'The ESOP Impact', desc: 'Understand the mathematical and strategic implications of creating an ESOP pool on the pre-money valuation of a specific funding round.' },
                  { title: 'Exit Waterfall Analysis', desc: 'Calculate the final monetary payout for different classes of shareholders during a liquidity event (acquisition), applying standard pro-rata distribution.' },
                  { title: 'Working Under Pressure', desc: 'Develop the ability to perform high-level financial math under strict time constraints against a ticking clock.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">{i + 1}</div>
                    <div>
                      <strong className="block text-slate-900 text-lg mb-1">{item.title}</strong>
                      <span className="text-slate-600">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* 4. Core Concepts */}
            <section id="concepts" className="scroll-mt-24 mb-16">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-amber-100 text-amber-700 rounded-lg"><Lightbulb size={24} /></div>
                <h2 className="text-3xl font-bold m-0 text-slate-900">4. Core Concepts & Background</h2>
              </div>
              <p className="text-slate-600 mb-8 italic">Before you begin, it is absolutely essential that you understand the underlying vocabulary. The simulation will not teach you these terms; it expects you to know them.</p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">4.1. Pre-Money vs. Post-Money Valuation</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                      <strong className="text-indigo-700 block mb-2">Pre-Money Valuation</strong>
                      <p className="text-sm text-slate-600">The value of the startup immediately before a new investor puts money into the company. It represents the value of everything built up to that exact moment.</p>
                    </div>
                    <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                      <strong className="text-emerald-600 block mb-2">Investment Amount</strong>
                      <p className="text-sm text-slate-600">The actual cash the new investor is wiring into the company's bank account.</p>
                    </div>
                    <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-sm">
                      <strong className="text-purple-600 block mb-2">Post-Money Valuation</strong>
                      <p className="text-sm text-slate-600">The value of the startup immediately after the new investment is made.</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 p-6 rounded-xl flex flex-col items-center justify-center text-center shadow-inner">
                    <span className="text-amber-800 font-bold uppercase tracking-wider text-sm mb-2">The Golden Formula</span>
                    <code className="text-xl md:text-2xl font-mono font-bold text-slate-900 bg-white px-4 py-2 rounded-lg shadow-sm">
                      Post-Money = Pre-Money + Investment
                    </code>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">4.2. Ownership Percentage</h3>
                  <p className="text-slate-600 mb-3">When an investor puts money into a startup, they are buying a percentage of the Post-Money valuation.</p>
                  <div className="bg-slate-900 text-slate-100 p-4 rounded-lg font-mono text-sm shadow-md mb-3">
                    <span className="text-indigo-400">Formula:</span> Investor Ownership % = (Investment Amount / Post-Money Valuation) × 100
                  </div>
                  <div className="bg-slate-100 border-l-4 border-indigo-500 p-4 text-slate-700 text-sm">
                    <strong>Example:</strong> If a VC invests 10 Cr into a company with a pre-money valuation of 40 Cr. The Post-money is 50 Cr. The VC's ownership is (10/50) = 20%.
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">4.3. Shares Outstanding & Issuance</h3>
                  <p className="text-slate-600">Ownership percentages are represented by actual "shares" of stock. When a new investor comes in, the founders do not sell their own personal shares. Instead, the company issues brand new shares to the investor. Because the total number of shares increases, the percentage owned by founders goes down (dilution).</p>
                </div>

                <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><AlertCircle size={100} /></div>
                  <h3 className="text-xl font-bold text-rose-900 mb-3 relative z-10">4.4. The ESOP Pool (Critical Industry Standard)</h3>
                  <p className="text-rose-800 relative z-10">
                    An ESOP is a block of shares set aside for future employees. New investors (like Series A VCs) will almost always demand that an ESOP pool be created or expanded before they invest, <strong>out of the pre-money valuation</strong>.
                  </p>
                  <p className="text-rose-800 relative z-10 mt-2 font-medium">
                    Why? If the ESOP is created after the VC invests, the VC's ownership would be diluted. VCs want a guaranteed percentage. Therefore, they force the founders (and Angel investors) to take the entire dilution hit of creating the ESOP.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. Gameplay Mechanics */}
            <section id="gameplay" className="scroll-mt-24 mb-16">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-purple-100 text-purple-700 rounded-lg"><Clock size={24} /></div>
                <h2 className="text-3xl font-bold m-0 text-slate-900">5. Gameplay Mechanics</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Starting the Game</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <span className="text-purple-600 mt-1"><ChevronRight size={20} /></span>
                      <span><strong>Welcome Screen:</strong> Enter your real name (for the certificate) and your fictional startup name.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-600 mt-1"><ChevronRight size={20} /></span>
                      <span><strong>Randomized Dataset:</strong> Investment amounts, valuations, and exit values are unique to your session. You cannot copy answers.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-purple-600 mt-1"><ChevronRight size={20} /></span>
                      <span><strong>The Timer:</strong> A 30-minute countdown begins on clicking "Start".</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Input & Feedback</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3 items-start">
                      <div className="bg-red-100 text-red-600 p-1 rounded mt-1"><XCircle size={16} /></div>
                      <span>If your answer is incorrect, the box turns <strong>Red</strong> and displays an 'X'.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="bg-green-100 text-green-600 p-1 rounded mt-1"><CheckCircle size={16} /></div>
                      <span>If correct (within decimal tolerance), the box turns <strong>Green</strong> and displays a checkmark.</span>
                    </li>
                    <li className="flex gap-3 items-start">
                      <div className="bg-slate-100 text-slate-600 p-1 rounded mt-1"><ChevronRight size={16} /></div>
                      <span><strong>Progression:</strong> You cannot move forward until all inputs in the current step are Green.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-slate-50 border border-slate-200 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Navigating the Rounds</h3>
                <div className="flex flex-col md:flex-row gap-4 relative">
                  {/* Process line for desktop */}
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
                  
                  {['Day 0', 'Round 1 (Angel)', 'Round 2 (VC & ESOP)', 'Round 3 (Series B)', 'Exit Scenario'].map((step, idx) => (
                    <div key={idx} className="flex-1 relative z-10 flex flex-row md:flex-col items-center gap-4 md:gap-2">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-md border-4 border-white">{idx}</div>
                      <div className="text-sm font-semibold text-slate-700 text-center">{step}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Mathematical Walkthrough */}
            <section id="math" className="scroll-mt-24 mb-16">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-slate-800 text-white rounded-lg"><Calculator size={24} /></div>
                <h2 className="text-3xl font-bold m-0 text-slate-900">6. Mathematical Walkthrough</h2>
              </div>
              <p className="text-slate-600 mb-8 font-medium">This is the most important section of the manual. Here are the precise algebraic formulas required to solve each stage. We will use variables to represent the numbers in your unique dataset.</p>

              {/* Round 1 */}
              <div className="mb-10 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 m-0">6.1. Round 1: Angel Investment</h3>
                  <p className="text-sm text-slate-500 mt-1">Data Provided: Investment Amount (Inv₁), Pre-Money Valuation (Pre₁)</p>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <strong className="text-slate-800">Step 1: Post-Money Valuation</strong>
                    <div className="bg-slate-900 text-emerald-400 font-mono p-3 rounded mt-2">Post₁ = Pre₁ + Inv₁</div>
                  </div>
                  <div>
                    <strong className="text-slate-800">Step 2: Investor Ownership %</strong>
                    <div className="bg-slate-900 text-emerald-400 font-mono p-3 rounded mt-2">Pct₁ = (Inv₁ / Post₁) × 100</div>
                  </div>
                  <div>
                    <strong className="text-slate-800">Step 3: Share Calculation</strong>
                    <p className="text-sm text-slate-600 mt-1 mb-2">Let X be the new shares issued to the Angel. The founders have 10,000 shares. The Angel's shares (X) divided by the total new shares (10,000 + X) must equal their ownership percentage.</p>
                    <div className="bg-slate-900 text-emerald-400 font-mono p-3 rounded space-y-2">
                      <div>X / (10,000 + X) = Pct₁ <span className="text-slate-500 text-sm ml-2">// expressed as a decimal, e.g., 0.20</span></div>
                      <div className="text-indigo-300 border-t border-slate-700 pt-2">Solving for X:</div>
                      <div className="text-lg font-bold text-white">X = (Pct₁ × 10,000) / (1 - Pct₁)</div>
                    </div>
                    <div className="mt-3 text-sm font-semibold text-indigo-700 bg-indigo-50 inline-block px-3 py-1 rounded">
                      Note your new Total Shares (Total₁) = 10,000 + X
                    </div>
                  </div>
                </div>
              </div>

              {/* Round 2 */}
              <div className="mb-10 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 m-0">6.2. Round 2: The VC Round & ESOP</h3>
                  <p className="text-sm text-slate-500 mt-1">Data Provided: Investment Amount (Inv₂), Pre-Money Valuation (Pre₂), ESOP Requirement (10%)</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="border-l-4 border-rose-500 pl-4 py-1 mb-6">
                    <strong className="text-rose-700 block text-lg">Step 1: Create ESOP Pool (Pre-Money)</strong>
                    <p className="text-sm text-slate-600 mt-1 mb-3">The VC requires a 10% ESOP pool on the pre-money shares. This means the ESOP shares (Y) plus the existing shares (Total₁) will form the new pre-money share base. The ESOP must equal 10% of this new base.</p>
                    <div className="bg-slate-900 text-rose-300 font-mono p-3 rounded space-y-2">
                      <div>Y / (Total₁ + Y) = 0.10</div>
                      <div className="text-white border-t border-slate-700 pt-2 font-bold">Y = (0.10 × Total₁) / (1 - 0.10)</div>
                    </div>
                    <div className="mt-3 text-sm font-semibold text-rose-700 bg-rose-50 inline-block px-3 py-1 rounded">
                      Note your new Pre-Money Total Shares (Total_2_Pre) = Total₁ + Y
                    </div>
                  </div>

                  <div>
                    <strong className="text-slate-800">Step 2: VC Ownership %</strong>
                    <div className="bg-slate-900 text-emerald-400 font-mono p-3 rounded mt-2 space-y-1">
                      <div>Post₂ = Pre₂ + Inv₂</div>
                      <div>Pct₂ = (Inv₂ / Post₂) × 100</div>
                    </div>
                  </div>
                  <div>
                    <strong className="text-slate-800">Step 3: Calculate VC Shares</strong>
                    <p className="text-sm text-slate-600 mt-1 mb-2">Let Z be the new shares issued to the VC. Their shares divided by the new total must equal their percentage.</p>
                    <div className="bg-slate-900 text-emerald-400 font-mono p-3 rounded space-y-2">
                      <div>Z / (Total_2_Pre + Z) = Pct₂</div>
                      <div className="text-white border-t border-slate-700 pt-2 font-bold">Z = (Pct₂ × Total_2_Pre) / (1 - Pct₂)</div>
                    </div>
                    <div className="mt-3 text-sm font-semibold text-indigo-700 bg-indigo-50 inline-block px-3 py-1 rounded">
                      Note your new Total Shares (Total₂) = Total_2_Pre + Z
                    </div>
                  </div>
                </div>
              </div>

              {/* Round 3 */}
              <div className="mb-10 border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                  <h3 className="text-xl font-bold text-slate-800 m-0">6.3. Round 3: Series B</h3>
                  <p className="text-sm text-slate-500 mt-1">Data Provided: Investment Amount (Inv₃), Pre-Money Valuation (Pre₃)</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <strong className="text-slate-800 text-sm">Step 1: Post-Money Valuation</strong>
                      <div className="bg-slate-900 text-emerald-400 font-mono p-3 rounded mt-2 text-sm">Post₃ = Pre₃ + Inv₃</div>
                    </div>
                    <div>
                      <strong className="text-slate-800 text-sm">Step 2: Investor Ownership %</strong>
                      <div className="bg-slate-900 text-emerald-400 font-mono p-3 rounded mt-2 text-sm">Pct₃ = (Inv₃ / Post₃) × 100</div>
                    </div>
                  </div>
                  <div>
                    <strong className="text-slate-800">Step 3: Shares Issued</strong>
                    <p className="text-sm text-slate-600 mt-1 mb-2">Let W be the new shares issued to Series B.</p>
                    <div className="bg-slate-900 text-emerald-400 font-mono p-3 rounded space-y-2">
                      <div>W / (Total₂ + W) = Pct₃</div>
                      <div className="text-white border-t border-slate-700 pt-2 font-bold">W = (Pct₃ × Total₂) / (1 - Pct₃)</div>
                    </div>
                    <div className="mt-3 text-sm font-semibold text-indigo-700 bg-indigo-50 inline-block px-3 py-1 rounded">
                      Final Total Shares (Total₃) = Total₂ + W
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary and Exit */}
              <div className="mb-10 border border-slate-800 rounded-xl overflow-hidden shadow-lg bg-slate-800 text-white">
                <div className="px-6 py-4 border-b border-slate-700 bg-slate-900">
                  <h3 className="text-xl font-bold text-white m-0 flex items-center gap-2"><Trophy size={20} className="text-yellow-400"/> 6.4. Founder Summary & Exit Scenario</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <strong className="text-indigo-300">Combined Founders Shares</strong>
                    <p className="text-sm text-slate-300 mt-1">Sum of original shares (A+B+C = 10,000). Founders rarely get new shares; they only get diluted.</p>
                    <div className="font-mono bg-slate-950 p-2 rounded mt-2 text-emerald-400">Final Ownership % = (10,000 / Total₃) × 100</div>
                  </div>
                  <div>
                    <strong className="text-indigo-300">Exit Distributions</strong>
                    <p className="text-sm text-slate-300 mt-1 mb-3">You will be given an Acquisition Value (ExitVal). Calculate final percentage and multiply by ExitVal for every party (Founders, Angel, ESOP, VC Series A, VC Series B).</p>
                    <div className="font-mono bg-slate-950 p-3 rounded space-y-2 text-emerald-400 text-sm">
                      <div>Party's Final % = (Party's Shares / Total₃)</div>
                      <div className="text-yellow-400 border-t border-slate-800 pt-2 font-bold">Party's Payout = Party's Final % × ExitVal</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Evaluation & Scoring */}
            <section id="scoring" className="scroll-mt-24 mb-16">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg"><Trophy size={24} /></div>
                <h2 className="text-3xl font-bold m-0 text-slate-900">7. Evaluation, Scoring, & Time Limits</h2>
              </div>
              <p className="text-slate-600 mb-6">To make this a true test of your financial acumen and ability to work under pressure, the simulation features a strict, live-updating scoring engine.</p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-xl mb-4">100</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Earning Marks</h3>
                  <p className="text-sm text-slate-600">Your base score is calculated purely on mathematical accuracy. There are 18 input fields. As you successfully input correct answers (triggering green checkmarks), your base score proportionally increases toward a maximum of 100.</p>
                </div>

                <div className="bg-rose-50 p-6 border border-rose-200 rounded-xl shadow-sm relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-rose-100"><Clock size={120} /></div>
                  <h3 className="text-xl font-bold text-rose-900 mb-4 relative z-10 flex items-center gap-2">
                    The Time Penalty
                  </h3>
                  <div className="space-y-3 relative z-10">
                    <p className="text-sm text-rose-800"><strong>Grace Period:</strong> The first 20 minutes are penalty-free.</p>
                    <p className="text-sm text-rose-800"><strong>Penalty Phase:</strong> When timer drops below 10:00 (20 mins elapsed), the timer turns red. <strong>1 mark is deducted for every additional minute taken.</strong></p>
                    <div className="bg-rose-900 text-rose-100 p-3 rounded text-xs font-mono">
                      Example: Finish in 24m 30s = 4-mark penalty (Mins 21, 22, 23, 24).
                    </div>
                    <p className="text-sm text-rose-800 font-bold mt-2">Time's Up: At 30:00, the simulation force-stops.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 8. Certification */}
            <section id="certification" className="scroll-mt-24 mb-16">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-blue-100 text-blue-700 rounded-lg"><Share2 size={24} /></div>
                <h2 className="text-3xl font-bold m-0 text-slate-900">8. Certification & LinkedIn</h2>
              </div>
              <p className="text-slate-600 mb-6">Taxila Business School encourages you to leverage your academic successes for professional networking and career advancement.</p>
              
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bg-slate-50 p-6 rounded-xl border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-800 mb-2">Official .PNG Certificate</h3>
                  <p className="text-sm text-slate-600 mb-4">Clicking "Download Certificate" dynamically generates a high-resolution certificate featuring:</p>
                  <ul className="text-sm text-slate-600 list-disc pl-5 space-y-1">
                    <li>Your Name & Startup Name</li>
                    <li>Your precise Final Score</li>
                    <li>Official digital signature of Dean Prof. Rajat Bohra</li>
                  </ul>
                </div>
                <div className="flex-1 bg-blue-50 p-6 rounded-xl border border-blue-200">
                  <h3 className="text-lg font-bold text-blue-900 mb-2">One-Click LinkedIn Sharing</h3>
                  <p className="text-sm text-blue-800">
                    Stand out to recruiters and VC firms. A pre-populated post celebrating your achievement will open with relevant hashtags (#VentureCapital, #CapTable, #TaxilaBusinessSchool). Attach your downloaded certificate to maximize engagement!
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Tips for Success */}
            <section id="tips" className="scroll-mt-24 mb-8">
              <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-2 bg-indigo-900 text-indigo-100 rounded-lg"><AlertCircle size={24} /></div>
                <h2 className="text-3xl font-bold m-0 text-slate-900">9. Tips for Success & High Scores</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Have your tools ready', desc: 'Keep a physical calculator, Excel spreadsheet, or notepad open before you begin. Do not try to do the algebraic share calculations in your head.' },
                  { title: 'Watch your decimals', desc: 'The simulation allows for minor rounding differences. However, for maximum accuracy, carry your decimals to at least two places during intermediate steps. Use standard rounding rules for final whole number share counts.' },
                  { title: 'Remember the ESOP Pre-Money rule', desc: 'The most common mistake! Remember, the ESOP expands the pre-money share base before the VC gets their shares. Review section 6.2 carefully!', highlight: true },
                  { title: 'Don\'t panic at the Exit', desc: 'The exit is a pro-rata distribution. Ensure final percentages from Round 3 add up to exactly 100%. Multiply percentages by the Exit Value to find Crores.' },
                  { title: 'Breathe and focus', desc: '20 minutes is more than enough time to complete 18 calculations if you know the formulas. Read data, execute math, type answer, move forward.' }
                ].map((tip, i) => (
                  <div key={i} className={`p-4 rounded-xl border ${tip.highlight ? 'bg-rose-50 border-rose-200' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <h3 className={`font-bold text-lg mb-1 ${tip.highlight ? 'text-rose-900' : 'text-slate-800'}`}>
                      {i + 1}. {tip.title}
                    </h3>
                    <p className={`text-sm ${tip.highlight ? 'text-rose-800' : 'text-slate-600'}`}>{tip.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center p-8 bg-indigo-50 rounded-2xl border border-indigo-100">
                <p className="text-xl font-medium text-indigo-900 italic">"Good luck, future founders and financiers. The board is waiting."</p>
                <p className="text-sm text-indigo-500 mt-2 font-semibold uppercase tracking-widest">End of Player Manual</p>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}