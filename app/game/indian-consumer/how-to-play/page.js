"use client";

import { useEffect } from "react";
import {
  BookOpen,
  Target,
  Languages,
  Globe,
  IndianRupee,
  Sparkles,
  Layers,
  Rocket,
  Clock,
  Users,
  Map,
  Megaphone,
  Keyboard,
  Flame,
  BadgeCheck,
} from "lucide-react";
import BackButton from "@/components/ui/Backbutton";

export default function GuidePage() {
  // For fade-in animation
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-section");
    elements.forEach((el, i) => {
      setTimeout(() => el.classList.add("opacity-100", "translate-y-0"), i * 80);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 px-6">
      {/* Container */}
      <BackButton />
      <div className="max-w-5xl mx-auto space-y-16">

        {/* Title */}
        <section className="text-center fade-section opacity-0 translate-y-5 transition-all">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Indian Consumer Behavior Simulator (ICBS)
          </h1>
          <p className="text-slate-300 mt-3 text-lg">
            Master the psychology, economics, and culture of India’s 1.4 billion consumers.
          </p>
        </section>

        {/* Objective */}
        <section className="fade-section opacity-0 translate-y-5 transition-all">
          <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-4">
              <Target size={40} className="text-emerald-400" />
              <h2 className="text-3xl font-bold">🎯 Your Objective</h2>
            </div>
            <p className="text-slate-300 leading-relaxed">
              You are the <span className="font-semibold text-white">Chief Marketing Officer (CMO)</span>. 
              Your mission is to launch 10 products successfully across India by choosing the right states,
              languages, seasons, slogans, and marketing budgets to maximize:
            </p>
            <ul className="list-disc mt-4 pl-6 text-slate-300">
              <li>Total Net Profit</li>
              <li>Viral Impact Score</li>
              <li>Brand Resonance</li>
            </ul>
          </div>
        </section>

        {/* Gameplay Loop */}
        <section className="fade-section opacity-0 translate-y-5 transition-all">
          <div className="glass-card p-8 rounded-3xl border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-4">
              <Rocket size={40} className="text-blue-400" />
              <h2 className="text-3xl font-bold">🕹️ Gameplay Loop</h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Layers,
                  title: "1. Select Your Product",
                  desc: "Each round gives you a new product — from Smart Speakers to Chicken Nuggets.",
                },
                {
                  icon: Map,
                  title: "2. Choose Up to 5 States",
                  desc: "Large states cost more. States have cooldowns. Rotate your strategy wisely.",
                },
                {
                  icon: Megaphone,
                  title: "3. Create Your Marketing Pitch",
                  desc: "Use required keywords. Add a punchline. Translate into a regional language.",
                },
                {
                  icon: Clock,
                  title: "4. Pick Season & Context",
                  desc: "Wedding, Monsoon, Summer, Winter — season decides demand & veto risk.",
                },
                {
                  icon: IndianRupee,
                  title: "5. Set Campaign Intensity",
                  desc: "Pilot (0.2x) for testing or Blitz (2x) for domination.",
                },
                {
                  icon: Flame,
                  title: "6. Launch!",
                  desc: "AI calculates revenue, sales probability, net profit, and cumulative score.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/10 transition">
                  <item.icon size={32} className="text-teal-300 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="text-slate-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI & Language Engine */}
        <section className="fade-section opacity-0 translate-y-5 transition-all">
          <div className="glass-card p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-4">
              <Languages size={40} className="text-pink-400" />
              <h2 className="text-3xl font-bold">🌐 AI & Language Engine</h2>
            </div>

            <p className="text-slate-300 leading-relaxed">
              The Engine evaluates cultural fit, tone, keywords, and translation accuracy.
              Choosing the right language is critical:
            </p>

            <table className="w-full mt-6 text-left text-slate-200">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 font-semibold">
                  <th className="py-2">Language</th>
                  <th className="py-2">Sales Effectiveness</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Native Language", "100%"],
                  ["Hindi (North)", "90%"],
                  ["Hindi (South/NE)", "Penalty"],
                  ["English", "70% (Urban bias)"],
                  ["Wrong Language", "0% (Fails instantly)"],
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5">
                    <td className="py-2">{row[0]}</td>
                    <td className="py-2 text-emerald-300">{row[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Seasonal Dynamics */}
        <section className="fade-section opacity-0 translate-y-5 transition-all">
          <div className="glass-card p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-4">
              <Clock size={40} className="text-yellow-300" />
              <h2 className="text-3xl font-bold">🌦️ Seasonal Dynamics</h2>
            </div>

            <ul className="space-y-4 text-slate-300">
              <li>💍 <b>Wedding Season:</b> Boosts Gold, Beauty, Luxury items.</li>
              <li>☀️ <b>Summer:</b> Solar & Cotton boom. Winterwear suffers.</li>
              <li>🌧️ <b>Monsoon:</b> Indoor items shine. Outdoor is penalized.</li>
              <li>❄️ <b>Winter:</b> Thermals boom, but NOT in hot states.</li>
            </ul>
          </div>
        </section>

        {/* Family Gatekeepers */}
        <section className="fade-section opacity-0 translate-y-5 transition-all">
          <div className="glass-card p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-4">
              <Users size={40} className="text-purple-300" />
              <h2 className="text-3xl font-bold">👨‍👩‍👦 The Family Gatekeepers</h2>
            </div>

            <p className="text-slate-300 mb-4">
              Even if your product is perfect, *one family member* can veto the purchase:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["👵 Dadi (Tradition)", "Vetoes non-veg in veg homes, festive issues, modern insults."],
                ["👨 Father (Wallet)", "Rejects high-cost items without value angle."],
                ["👩 Mother (Health)", "Blocks unhealthy or unsafe products."],
                ["🧑 Son (Gen Z)", "Rejects cringe slogans or boring tech ads."],
              ].map((f, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-2xl">
                  <h3 className="font-bold mb-1 text-lg">{f[0]}</h3>
                  <p className="text-slate-300">{f[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Outcomes */}
        <section className="fade-section opacity-0 translate-y-5 transition-all mb-20">
          <div className="glass-card p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-4">
              <BookOpen size={40} className="text-green-300" />
              <h2 className="text-3xl font-bold">🎓 What You Learn</h2>
            </div>

            <ul className="space-y-3 text-slate-300">
              <li>🇮🇳 Hyper-localization across India's diverse states</li>
              <li>📊 Economic geography: population × income</li>
              <li>🎭 Cultural sensitivity: festivals, beliefs, habits</li>
              <li>🗣️ Language psychology & emotional resonance</li>
              <li>🧠 Real-world ad strategy & consumer behavior</li>
            </ul>
          </div>
        </section>
      </div>

      {/* Styles */}
      <style jsx>{`
        .glass-card {
          transition: all 0.4s ease;
        }
        .glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </div>
  );
}
