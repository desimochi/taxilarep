"use client"
import React from "react";
import { CheckCircle, AlertTriangle, Clock, DollarSign, Users, TargetIcon, ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectManagementSimulation() {
    const router = useRouter()
  return (
    <main className=" p-8 bg-slate-800 text-gray-100 rounded-2xl shadow-xl mt-8">
      <header className="text-center mb-12">
        <div className="px-8 py-8">
            <button onClick={()=>router.back()} className="text-gray-50 flex items-center gap-1"><ArrowBigLeft />Go Back</button>
        </div>
        <h1 className="text-4xl font-extrabold text-indigo-400 mb-3 drop-shadow-lg">
          Player's Manual: Project Management Simulation
        </h1>
        <p className="text-gray-300 italic">
          A hands-on learning experience by <span className="font-semibold">Taxila Business School</span>
        </p>
      </header>

      <section className="space-y-12">
        {/* Introduction */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-2 flex items-center gap-2">
            <CheckCircle className="w-6 h-6 text-green-400" /> 1. Introduction
          </h2>
          <p>
            Welcome, Project Manager! This simulation tests your decision-making skills in a dynamic project environment. Manage resources, budget, and time to achieve success.
          </p>
        </div>

        {/* Objective */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-2 flex items-center gap-2">
            <TargetIcon className="w-6 h-6 text-yellow-400" /> 2. Objective
          </h2>
          <p>
            Your primary goal is to complete your chosen project within budget and deadline while maintaining quality.
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><strong>Scope:</strong> The tasks required to finish the project.</li>
            <li><strong>Time:</strong> The schedule and deadline.</li>
            <li><strong>Budget:</strong> Your financial resources.</li>
            <li><strong>Quality:</strong> Impacted by bugs and performance.</li>
          </ul>
        </div>

        {/* Getting Started */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-2 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-400" /> 3. Getting Started
          </h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Enter your name for personalization and save feature.</li>
            <li>Choose your project: <br />
              <span className="block mt-2">🎉 <strong>Utsav</strong> – Festival App (Hard)</span>
              <span className="block">💻 <strong>InfraLeap</strong> – IT Overhaul (Expert)</span>
              <span className="block">🏗️ <strong>Samriddhi Cement</strong> – Plant Erection (Nightmare)</span>
            </li>
          </ol>
        </div>

        {/* Gameplay Mechanics Example */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-2 flex items-center gap-2">
            <Clock className="w-6 h-6 text-pink-400" /> 4. Core Gameplay Mechanics
          </h2>
          <p>
            Manage tasks, morale, bugs, and efficiency. Each decision impacts your project's success or failure. Complete tasks, fix bugs, and stay under budget!
          </p>
        </div>

        {/* Tips */}
        <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-indigo-300 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-400" /> 5. Tips for Success
          </h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Hire smart and early — balance skills with budget.</li>
            <li>Monitor morale — high morale means faster progress.</li>
            <li>Don’t ignore QA — fix bugs before they pile up.</li>
            <li>Use overtime carefully — it speeds progress but drains morale and funds.</li>
            <li>Plan ahead — anticipate required skills and dependencies.</li>
          </ul>
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-400 text-sm">
        <p>Good luck, Manager. The project’s success is in your hands. 🚀</p>
      </footer>
    </main>
  );
}
