"use client"
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LastCitySurvivalPage() {
      const router = useRouter()
return (
<main className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl mt-8 text-gray-100">
<header className="mb-8 text-center">
     <div className="px-8 py-8">
            <button onClick={()=>router.back()} className="text-gray-50 flex items-center gap-1"><ArrowBigLeft />Go Back</button>
        </div>
<h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow-md mb-3">
LASTCITY SURVIVAL: Captain's Manual
</h1>
<p className="text-base text-gray-300 italic">
A guide from the Council of Engineers — your mandate for survival.
</p>
</header>


<section className="space-y-10">
<article>
<h2 className="text-2xl font-semibold text-yellow-300 mb-2">URGENT MEMORANDUM</h2>
<p>
<strong>TO:</strong> The New Captain <br />
<strong>FROM:</strong> The Council of Engineers <br />
<strong>SUBJECT:</strong> Your Mandate for Survival
</p>
<p className="mt-3">
Captain, welcome. If you're reading this, the previous leader has... been relieved.
The city is now yours. The generator sputters, the people are cold, and hope is scarce.
Your decisions, and yours alone, will determine if this last bastion of humanity survives the great frost.
Do not fail us.
</p>
</article>


<article>
<h2 className="text-2xl font-semibold text-yellow-300 mb-2">I. The City's Vitals: Hope & Discontent</h2>
<p>
Your primary goal is to balance two critical metrics:
</p>
<ul className="list-disc list-inside space-y-1 ml-4">
<li><strong>Hope:</strong> The will to live. Raise it by keeping people fed, warm, and healthy.</li>
<li><strong>Discontent:</strong> Frustration and anger. Starvation, sickness, and a failing generator raise it.</li>
</ul>
<p className="mt-3">
A high <strong>CTS (Critical Thinking Score)</strong> means the city thrives. A low CTS means crisis.
If Hope falls to zero or Discontent peaks, the city is lost.
</p>
</article>


<article>
<h2 className="text-2xl font-semibold text-yellow-300 mb-2">II. Managing the Daily Cycle</h2>
<ol className="list-decimal list-inside space-y-1 ml-4">
<li>Assign workers and build structures.</li>
<li>Press the <span className="px-2 py-1 bg-yellow-400 text-black rounded-md font-medium">End Day</span> button.</li>
<li>At night: resources gathered, food & coal consumed, sickness treated, consequences unfold.</li>
</ol>
</article>


<article>
<h2 className="text-2xl font-semibold text-yellow-300 mb-2">III. Resource Management</h2>
<ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<li className="bg-gray-800 p-4 rounded-xl border border-gray-700"><strong>Coal:</strong> Lifeblood of the city. Powers the generator.</li>
<li className="bg-gray-800 p-4 rounded-xl border border-gray-700"><strong>Wood:</strong> Used for basic structures.</li>
<li className="bg-gray-800 p-4 rounded-xl border border-gray-700"><strong>Steel:</strong> For advanced structures and tech.</li>
<li className="bg-gray-800 p-4 rounded-xl border border-gray-700"><strong>Raw Food:</strong> Gathered by Hunters.</li>
<li className="bg-gray-800 p-4 rounded-xl border border-gray-700"><strong>Rations:</strong> Processed food for daily survival.</li>
</ul>
</article>


<article>
<h2 className="text-2xl font-semibold text-yellow-300 mb-2">IV. Population & Workforce</h2>
<p>Your people are your most valuable asset.</p>
<ul className="list-disc list-inside ml-4 space-y-1">
<li><strong>Population:</strong> Total citizens under your care.</li>
<li><strong>Workers:</strong> Assign them to tasks: Coal Miners, Woodcutters, Steelworkers, Hunters.</li>
<li><strong>Sick & Homeless:</strong> Sick cannot work, homeless risk illness.</li>
</ul>
</article>


<article>
<h2 className="text-2xl font-semibold text-yellow-300 mb-2">V. Construction & Infrastructure</h2>
<div className="grid sm:grid-cols-2 gap-4">
<div className="bg-gray-800 p-4 rounded-xl border border-gray-700"><strong>Tent:</strong> Shelter for 10 people.</div>
<div className="bg-gray-800 p-4 rounded-xl border border-gray-700"><strong>Cookhouse:</strong> Turns raw food into rations.</div>
<div className="bg-gray-800 p-4 rounded-xl border border-gray-700"><strong>Medical Post:</strong> Treats the sick.</div>
<div className="bg-gray-800 p-4 rounded-xl border border-gray-700"><strong>Workshop:</strong> Researches new technologies.</div>
</div>
</article>


<article>
<h2 className="text-2xl font-semibold text-yellow-300 mb-2">VI. Imminent Threats</h2>
<ul className="list-disc list-inside ml-4 space-y-2">
<li><strong>The Cold:</strong> Temperatures drop, generator burns more coal.</li>
<li><strong>Starvation:</strong> Lack of rations causes sickness and discontent.</li>
<li><strong>Sickness:</strong> From homelessness, freezing, or starvation. Untreated citizens will die.</li>
</ul>
<p className="mt-3 font-semibold text-yellow-400">Your duty is clear, Captain. Lead well. Survive.</p>
</article>
</section>


<footer className="mt-10 text-center text-sm text-gray-400">
<p>Rendered as an interactive Next.js survival manual page.</p>
</footer>
</main>
);
}