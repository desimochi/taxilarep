"use client";
import { useState, useEffect, useRef } from "react";

const sections = [
  {
    id: "exec",
    code: "01",
    title: "Executive Briefing",
    icon: "◈",
    content: (
      <div>
        <p className="lead-text">
          The <span className="accent">Micro-Economic Strategy Terminal (MEST)</span> is a high-fidelity
          decision-support simulation designed to transition academic theory into executive execution.
        </p>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-label">CAPITAL RESERVE</div>
            <div className="stat-value">₹100,000,000</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">FISCAL CYCLES</div>
            <div className="stat-value">30 DAYS</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">YOUR FIRM</div>
            <div className="stat-value">ALPHA</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">RIVAL</div>
            <div className="stat-value danger">NEXUS Ω</div>
          </div>
        </div>
        <p className="body-text">
          As Lead Analyst for <span className="accent">Firm Alpha</span>, your mission is to navigate 30 fiscal
          cycles in a volatile industrial market, outmanoeuvring the incumbent rival while maintaining
          corporate liquidity and industrial growth.
        </p>
        <div className="golden-rule">
          <span className="rule-label">CORE DOCTRINE</span>
          <span className="rule-text">This is not a game of luck — it is a game of <strong>Marginalism</strong>.</span>
        </div>
      </div>
    ),
  },
  {
    id: "objectives",
    code: "02",
    title: "Learning Objectives",
    icon: "◉",
    content: (
      <div>
        <div className="obj-list">
          {[
            {
              tag: "PROFIT MAX",
              formula: "MR = MC",
              desc: "Internalizing the derivative logic where Profit is maximized strictly at the point where Marginal Revenue equals Marginal Cost.",
            },
            {
              tag: "PED",
              formula: "ΔQ / ΔP",
              desc: "Quantifying how macro-shocks and income shifts change consumer sensitivity to price fluctuations.",
            },
            {
              tag: "INDUSTRIAL PHYSICS",
              formula: "CAPEX → CAP",
              desc: "Understanding the Supply-Side Bottleneck — how physical plant limits create opportunity costs.",
            },
            {
              tag: "OPERATING LEVERAGE",
              formula: "₹850K / DAY",
              desc: "Managing the high fixed burn rate against variable production costs.",
            },
            {
              tag: "GAME THEORY",
              formula: "TIT-FOR-TAT",
              desc: "Predicting and reacting to the competitive heuristics of a duopolistic rival.",
            },
          ].map((o, i) => (
            <div key={i} className="obj-row">
              <div className="obj-tag">{o.tag}</div>
              <div className="obj-formula">{o.formula}</div>
              <div className="obj-desc">{o.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "theory",
    code: "03",
    title: "Theoretical Framework",
    icon: "⬡",
    content: (
      <div>
        <div className="theory-block">
          <div className="theory-header">A — THE CALCULUS OF THE MARGIN</div>
          <p className="body-text">In MEST, your decision-making must shift from "Total" thinking to "Marginal" thinking.</p>
          <div className="formula-grid">
            <div className="formula-item">
              <div className="formula-label">TOTAL REVENUE</div>
              <div className="formula-eq">P × Q</div>
              <div className="formula-desc">Total cash inflow</div>
            </div>
            <div className="formula-item">
              <div className="formula-label">MARGINAL REVENUE</div>
              <div className="formula-eq">ΔTR / ΔQ</div>
              <div className="formula-desc">Revenue from last unit. Falls faster than price in imperfect competition.</div>
            </div>
            <div className="formula-item">
              <div className="formula-label">MARGINAL COST</div>
              <div className="formula-eq">ΔTC / ΔQ</div>
              <div className="formula-desc">Base ₹4,500 + Marginal Fatigue near plant capacity.</div>
            </div>
          </div>
          <div className="golden-rule">
            <span className="rule-label">GOLDEN RULE</span>
            <span className="rule-text">
              Always produce until <strong>MR = MC</strong>. MR &gt; MC → leaving profit on the table. MC &gt; MR → destroying capital.
            </span>
          </div>
        </div>
        <div className="theory-block">
          <div className="theory-header">B — ELASTICITY & SUBSTITUTION</div>
          <p className="body-text">
            The simulation models a luxury industrial market with a structural demand floor of approximately{" "}
            <span className="accent">1,200 units</span>. Consumers are driven by the Substitution Effect.
            Your <span className="accent">Marketing OpEx</span> acts as a shield, making your demand curve inelastic.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "mechanics",
    code: "04",
    title: "Gameplay Mechanics",
    icon: "⬢",
    content: (
      <div>
        <div className="phase-block">
          <div className="phase-label">PHASE I — STRATEGIC HUB (READINESS)</div>
          <div className="phase-steps">
            {[
              { n: "1", title: "VISUAL ANALYSIS", desc: "Observe the Demand (Blue) and Supply (Red) curves." },
              { n: "2", title: "STRESS TESTING", desc: "Income Slider shifts Demand curve right (Bullish) or left (Bearish). Cost Slider shifts Supply curve up (Inflation) or down (Efficiency)." },
              { n: "3", title: "INTERACTION MANDATE", desc: "Spend ≥50 seconds in hub and perform 5 practice movements to unlock the Combat Terminal." },
            ].map((s) => (
              <div key={s.n} className="step-row">
                <div className="step-num">{s.n}</div>
                <div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="phase-block">
          <div className="phase-label">PHASE II — MARKET WAR (EXECUTION)</div>
          <div className="phase-steps">
            {[
              { n: "1", title: "ANALYZE FORECAST", desc: 'View current "Willing Consumers Active."' },
              { n: "2", title: "INPUT STRATEGY", desc: "Set your Price (P) and Batch Size (Q)." },
              { n: "3", title: "CAPACITY LOCK", desc: "Cannot exceed plant capacity. Expand plant to produce more. Violations trigger a Regulatory Alert." },
              { n: "4", title: "ACTION SEQUENCE", desc: 'Click "Execute Move" — terminal analyzes rivals, calculates elasticity, synchronizes logistics, finalizes ledger.' },
            ].map((s) => (
              <div key={s.n} className="step-row">
                <div className="step-num">{s.n}</div>
                <div>
                  <div className="step-title">{s.title}</div>
                  <div className="step-desc">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "constraints",
    code: "05",
    title: "Operational Constraints",
    icon: "▣",
    content: (
      <div>
        <div className="constraint-section">
          <div className="constraint-header">CAPITAL EXPENDITURE (CAPEX)</div>
          <div className="constraint-row">
            <div className="cost-badge capex">₹5,000,000</div>
            <div>
              <div className="constraint-title">Plant Expansion</div>
              <div className="constraint-desc">
                Permanently increases capacity by <span className="accent">+100 units</span>. With a market floor of 1,200 units,
                staying at starting capacity of 100 is a Supply Bottleneck costing millions in missed revenue.
              </div>
            </div>
          </div>
        </div>
        <div className="constraint-section">
          <div className="constraint-header">OPERATING EXPENDITURE (OPEX)</div>
          {[
            { cost: "₹850,000/day", label: "Fixed Overhead", desc: "Daily burn rate. Paid regardless of units sold — 1 to 1,000." },
            { cost: "₹4,500/unit", label: "Variable Cost (VC)", desc: "Per-unit production cost. Rises with Marginal Fatigue near capacity." },
            { cost: "₹2,000,000", label: "Tech R&D", desc: "Permanently reduces VC, enabling higher margins or lower prices." },
            { cost: "₹1,000,000", label: "Marketing", desc: "Temporarily boosts demand and decreases price sensitivity." },
          ].map((c, i) => (
            <div key={i} className="constraint-row">
              <div className="cost-badge opex">{c.cost}</div>
              <div>
                <div className="constraint-title">{c.label}</div>
                <div className="constraint-desc">{c.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "strategies",
    code: "06",
    title: "Winning Strategies",
    icon: "◆",
    content: (
      <div>
        <div className="strategy-header-note">To achieve CRI Score &gt; 90, follow the Maestro Blueprint:</div>
        {[
          {
            num: "01",
            title: 'POST-DOMINANCE BLITZ',
            range: "MOVES 1–11",
            color: "var(--amber)",
            steps: [
              "During the first 10 moves, a Dominance Tax applies if you grow aggressively.",
              "Match Nexus Omega's price exactly. Stay lean.",
              'On Move 11, tax expires. Execute Tech R&D + Marketing immediately.',
              "Drop price to ₹8,500 to capture the 1,200-unit floor.",
            ],
          },
          {
            num: "02",
            title: "PRE-EMPTIVE CAPACITY SCALING",
            range: "MOVES 1–15",
            color: "var(--cyan)",
            steps: [
              "Lost sales are more expensive than plant expansions.",
              "Reinvest first ₹15M of profit into three plant expansions.",
              "Target 500 capacity by Move 15.",
              "Every missed unit in a Bullish cycle = ₹5,500 in lost potential net profit.",
            ],
          },
          {
            num: "03",
            title: '"BUNKER" DEFENSE',
            range: "BLACK SWAN EVENT",
            color: "var(--red)",
            steps: [
              "Market shocks like Public Boycott reduce utility by 90%.",
              "Set Production (Q) to ZERO immediately.",
              'Do not try to "price your way out."',
              "Preserve your ₹100M reserve by avoiding unsellable production.",
            ],
          },
        ].map((s) => (
          <div key={s.num} className="strategy-card" style={{ "--card-color": s.color }}>
            <div className="strategy-card-head">
              <span className="strategy-num">{s.num}</span>
              <span className="strategy-title">{s.title}</span>
              <span className="strategy-range">{s.range}</span>
            </div>
            <ul className="strategy-steps">
              {s.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "cri",
    code: "07",
    title: "Evaluation Matrix (CRI)",
    icon: "◈",
    content: (
      <div>
        <p className="body-text">
          Your performance is measured by the <span className="accent">Corporate Rating Index (CRI)</span>:
        </p>
        <div className="cri-grid">
          {[
            { weight: "40%", label: "Liquidity ROI", desc: "How much did you grow the ₹100M reserve?", color: "var(--cyan)" },
            { weight: "40%", label: "Market Footprint", desc: "Total lifetime units sold. High margins with low volume yield a lower score.", color: "var(--amber)" },
            { weight: "20%", label: "Sustainability", desc: "Complete all 30 days without insolvency (₹0).", color: "var(--green)" },
          ].map((c, i) => (
            <div key={i} className="cri-card" style={{ "--cri-color": c.color }}>
              <div className="cri-weight">{c.weight}</div>
              <div className="cri-label">{c.label}</div>
              <div className="cri-desc">{c.desc}</div>
            </div>
          ))}
        </div>
        <div className="golden-rule board-seal">
          <span className="rule-label">BOARD VERIFIED</span>
          <span className="rule-text">Taxila Business School — Applied Micro-Economics Strategy Terminal v4.9.27</span>
        </div>
      </div>
    ),
  },
];

export default function MESTManual() {
  const [active, setActive] = useState("exec");
  const [booted, setBooted] = useState(false);
  const [bootText, setBootText] = useState("");
  const [scanline, setScanline] = useState(0);
  const contentRef = useRef(null);

  const bootLines = [
    "MEST TERMINAL v4.9.27 — INITIALIZING...",
    "LOADING MARKET SIMULATION ENGINE...",
    "CONNECTING TO EXCHANGE FEEDS...",
    "AUTHENTICATING LEAD ANALYST CREDENTIALS...",
    "SYSTEM READY. WELCOME, ANALYST.",
  ];

  useEffect(() => {
    let i = 0;
    let charIdx = 0;
    let lineIdx = 0;
    const interval = setInterval(() => {
      if (lineIdx >= bootLines.length) {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 400);
        return;
      }
      const line = bootLines[lineIdx];
      if (charIdx <= line.length) {
        setBootText(bootLines.slice(0, lineIdx).join("\n") + "\n" + line.slice(0, charIdx));
        charIdx++;
      } else {
        lineIdx++;
        charIdx = 0;
      }
    }, 22);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setScanline((s) => (s + 1) % 100), 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [active]);

  if (!booted) {
    return (
      <div className="boot-screen">
        <div className="boot-logo">
          <span className="boot-logo-text">MEST</span>
          <span className="boot-logo-sub">MICRO-ECONOMIC STRATEGY TERMINAL</span>
        </div>
        <pre className="boot-output">{bootText}<span className="cursor">█</span></pre>
        <div className="boot-bar">
          <div className="boot-progress" />
        </div>
        <style>{globalStyles}</style>
      </div>
    );
  }

  const activeSection = sections.find((s) => s.id === active);

  return (
    <div className="terminal-root">
      <div className="scanline-overlay" style={{ "--scan-pos": `${scanline}%` }} />

      {/* TOP BAR */}
      <header className="top-bar">
        <div className="top-bar-left">
          <span className="logo-mark">◈ MEST</span>
          <span className="top-divider">|</span>
          <span className="top-subtitle">STRATEGIC LEAD ANALYST'S MANUAL</span>
        </div>
        <div className="top-bar-right">
          <span className="top-tag">TAXILA BUSINESS SCHOOL</span>
          <span className="top-tag accent-tag">v4.9.27</span>
          <span className="live-dot" />
          <span className="top-status">LIVE</span>
        </div>
      </header>

      <div className="main-layout">
        {/* SIDEBAR NAV */}
        <nav className="sidebar">
          <div className="sidebar-label">SECTIONS</div>
          {sections.map((s) => (
            <button
              key={s.id}
              className={`nav-btn ${active === s.id ? "nav-active" : ""}`}
              onClick={() => setActive(s.id)}
            >
              <span className="nav-code">{s.code}</span>
              <span className="nav-icon">{s.icon}</span>
              <span className="nav-title">{s.title}</span>
            </button>
          ))}
          <div className="sidebar-footer">
            <div className="sidebar-firm">FIRM ALPHA</div>
            <div className="sidebar-rival danger-text">vs NEXUS Ω</div>
          </div>
        </nav>

        {/* CONTENT PANEL */}
        <main className="content-panel" ref={contentRef}>
          <div className="content-header">
            <span className="content-code">{activeSection.code}</span>
            <span className="content-icon">{activeSection.icon}</span>
            <h1 className="content-title">{activeSection.title}</h1>
          </div>
          <div className="content-body">{activeSection.content}</div>
        </main>
      </div>

      <style>{globalStyles}</style>
    </div>
  );
}

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600;700&family=Orbitron:wght@700;900&display=swap');

  :root {
    --bg: #050a0e;
    --bg2: #090f14;
    --bg3: #0d1821;
    --border: #1a2e3d;
    --border2: #234055;
    --cyan: #00e5ff;
    --amber: #ffab00;
    --green: #00e676;
    --red: #ff1744;
    --text: #b0ccd8;
    --text-dim: #4d7585;
    --text-bright: #e0f4fa;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Rajdhani', sans-serif;
    min-height: 100vh;
    overflow: hidden;
  }

  /* BOOT SCREEN */
  .boot-screen {
    min-height: 100vh;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
  }
  .boot-logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
  }
  .boot-logo-text {
    font-family: 'Orbitron', monospace;
    font-size: 4rem;
    font-weight: 900;
    color: var(--cyan);
    letter-spacing: 0.3em;
    text-shadow: 0 0 40px var(--cyan);
  }
  .boot-logo-sub {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    color: var(--text-dim);
    letter-spacing: 0.25em;
  }
  .boot-output {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.85rem;
    color: var(--cyan);
    max-width: 600px;
    width: 100%;
    min-height: 120px;
    opacity: 0.9;
    line-height: 1.8;
    white-space: pre-wrap;
  }
  .cursor {
    animation: blink 0.7s step-end infinite;
    color: var(--cyan);
  }
  @keyframes blink { 50% { opacity: 0; } }
  .boot-bar {
    width: 400px;
    max-width: 90%;
    height: 2px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
  }
  .boot-progress {
    height: 100%;
    background: var(--cyan);
    animation: bootprog 2.8s ease-in forwards;
    box-shadow: 0 0 12px var(--cyan);
  }
  @keyframes bootprog { from { width: 0; } to { width: 100%; } }

  /* SCANLINE */
  .scanline-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    pointer-events: none;
    z-index: 9999;
    background: linear-gradient(
      to bottom,
      transparent calc(var(--scan-pos) - 2px),
      rgba(0, 229, 255, 0.025) calc(var(--scan-pos) - 1px),
      transparent var(--scan-pos)
    );
  }

  /* LAYOUT */
  .terminal-root {
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
    background:
      repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.012) 2px, rgba(0,229,255,0.012) 4px),
      var(--bg);
  }

  /* TOP BAR */
  .top-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 1.5rem;
    background: var(--bg2);
    border-bottom: 1px solid var(--border2);
    flex-shrink: 0;
  }
  .top-bar-left, .top-bar-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .logo-mark {
    font-family: 'Orbitron', monospace;
    font-size: 1rem;
    font-weight: 900;
    color: var(--cyan);
    letter-spacing: 0.15em;
    text-shadow: 0 0 20px var(--cyan);
  }
  .top-divider { color: var(--border2); }
  .top-subtitle {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--text-dim);
    letter-spacing: 0.1em;
  }
  .top-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--text-dim);
    letter-spacing: 0.08em;
    border: 1px solid var(--border);
    padding: 0.1rem 0.4rem;
  }
  .accent-tag { color: var(--amber); border-color: var(--amber); }
  .live-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: var(--green);
    box-shadow: 0 0 8px var(--green);
    animation: pulse 1.4s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
  .top-status {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--green);
    letter-spacing: 0.1em;
  }

  /* MAIN LAYOUT */
  .main-layout {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  /* SIDEBAR */
  .sidebar {
    width: 220px;
    flex-shrink: 0;
    background: var(--bg2);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 1rem 0;
  }
  .sidebar::-webkit-scrollbar { width: 2px; }
  .sidebar::-webkit-scrollbar-thumb { background: var(--border2); }
  .sidebar-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    color: var(--text-dim);
    letter-spacing: 0.2em;
    padding: 0 1rem 0.75rem;
  }
  .nav-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    padding: 0.65rem 1rem;
    background: none;
    border: none;
    border-left: 2px solid transparent;
    cursor: pointer;
    text-align: left;
    transition: all 0.15s ease;
    color: var(--text-dim);
    font-family: 'Rajdhani', sans-serif;
  }
  .nav-btn:hover {
    background: rgba(0, 229, 255, 0.04);
    color: var(--text);
    border-left-color: var(--border2);
  }
  .nav-active {
    background: rgba(0, 229, 255, 0.07) !important;
    color: var(--cyan) !important;
    border-left-color: var(--cyan) !important;
  }
  .nav-code {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--text-dim);
    min-width: 18px;
  }
  .nav-active .nav-code { color: var(--cyan); opacity: 0.6; }
  .nav-icon { font-size: 0.8rem; }
  .nav-title {
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1;
  }
  .sidebar-footer {
    margin-top: auto;
    padding: 1rem;
    border-top: 1px solid var(--border);
  }
  .sidebar-firm {
    font-family: 'Orbitron', monospace;
    font-size: 0.7rem;
    color: var(--cyan);
    letter-spacing: 0.1em;
    margin-bottom: 0.25rem;
  }
  .sidebar-rival { font-size: 0.75rem; }

  /* CONTENT PANEL */
  .content-panel {
    flex: 1;
    overflow-y: auto;
    padding: 2rem;
  }
  .content-panel::-webkit-scrollbar { width: 4px; }
  .content-panel::-webkit-scrollbar-thumb { background: var(--border2); }
  .content-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.75rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }
  .content-code {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--text-dim);
  }
  .content-icon {
    font-size: 1.2rem;
    color: var(--cyan);
    text-shadow: 0 0 12px var(--cyan);
  }
  .content-title {
    font-family: 'Orbitron', monospace;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-bright);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  /* CONTENT ELEMENTS */
  .lead-text {
    font-size: 1rem;
    line-height: 1.7;
    color: var(--text-bright);
    margin-bottom: 1.5rem;
    font-weight: 500;
  }
  .body-text {
    font-size: 0.92rem;
    line-height: 1.7;
    color: var(--text);
    margin-bottom: 1rem;
  }
  .accent { color: var(--cyan); font-weight: 600; }
  .danger { color: var(--red); }
  .danger-text { color: var(--red); }

  .golden-rule {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.85rem 1.2rem;
    background: rgba(255, 171, 0, 0.06);
    border: 1px solid rgba(255, 171, 0, 0.3);
    border-left: 3px solid var(--amber);
    margin-top: 1.25rem;
  }
  .rule-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--amber);
    letter-spacing: 0.15em;
    white-space: nowrap;
    margin-top: 0.15rem;
  }
  .rule-text { font-size: 0.9rem; color: var(--text-bright); line-height: 1.5; }

  /* STAT GRID */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
  .stat-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    padding: 0.85rem;
    position: relative;
    overflow: hidden;
  }
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: var(--cyan);
    opacity: 0.4;
  }
  .stat-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    color: var(--text-dim);
    letter-spacing: 0.15em;
    margin-bottom: 0.4rem;
  }
  .stat-value {
    font-family: 'Orbitron', monospace;
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--cyan);
  }
  .stat-value.danger { color: var(--red); }

  /* OBJECTIVES */
  .obj-list { display: flex; flex-direction: column; gap: 0.6rem; }
  .obj-row {
    display: grid;
    grid-template-columns: 160px 110px 1fr;
    gap: 1rem;
    align-items: center;
    padding: 0.75rem 1rem;
    background: var(--bg3);
    border: 1px solid var(--border);
    border-left: 2px solid var(--cyan);
  }
  .obj-tag {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--cyan);
    letter-spacing: 0.1em;
  }
  .obj-formula {
    font-family: 'Orbitron', monospace;
    font-size: 0.75rem;
    color: var(--amber);
    font-weight: 700;
  }
  .obj-desc { font-size: 0.85rem; color: var(--text); line-height: 1.4; }

  /* THEORY */
  .theory-block {
    background: var(--bg3);
    border: 1px solid var(--border);
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
  .theory-header {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--amber);
    letter-spacing: 0.15em;
    margin-bottom: 0.75rem;
  }
  .formula-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    margin-top: 1rem;
  }
  .formula-item {
    border: 1px solid var(--border);
    padding: 0.85rem;
    text-align: center;
  }
  .formula-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    color: var(--text-dim);
    letter-spacing: 0.1em;
    margin-bottom: 0.4rem;
  }
  .formula-eq {
    font-family: 'Orbitron', monospace;
    font-size: 1rem;
    font-weight: 700;
    color: var(--cyan);
    margin-bottom: 0.4rem;
    text-shadow: 0 0 10px rgba(0,229,255,0.4);
  }
  .formula-desc { font-size: 0.78rem; color: var(--text-dim); line-height: 1.4; }

  /* PHASES */
  .phase-block { margin-bottom: 1.5rem; }
  .phase-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--amber);
    letter-spacing: 0.15em;
    margin-bottom: 0.75rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--border);
  }
  .phase-steps { display: flex; flex-direction: column; gap: 0.5rem; }
  .step-row {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 0.7rem 1rem;
    background: var(--bg3);
    border: 1px solid var(--border);
  }
  .step-num {
    font-family: 'Orbitron', monospace;
    font-size: 1.2rem;
    font-weight: 900;
    color: rgba(0,229,255,0.2);
    min-width: 24px;
    line-height: 1;
  }
  .step-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--cyan);
    letter-spacing: 0.1em;
    margin-bottom: 0.25rem;
  }
  .step-desc { font-size: 0.85rem; color: var(--text); line-height: 1.4; }

  /* CONSTRAINTS */
  .constraint-section { margin-bottom: 1.5rem; }
  .constraint-header {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.6rem;
    color: var(--amber);
    letter-spacing: 0.15em;
    margin-bottom: 0.75rem;
  }
  .constraint-row {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    margin-bottom: 0.6rem;
    padding: 0.85rem 1rem;
    background: var(--bg3);
    border: 1px solid var(--border);
  }
  .cost-badge {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    padding: 0.3rem 0.6rem;
    white-space: nowrap;
    border: 1px solid;
    flex-shrink: 0;
  }
  .cost-badge.capex { color: var(--cyan); border-color: var(--cyan); background: rgba(0,229,255,0.07); }
  .cost-badge.opex { color: var(--amber); border-color: var(--amber); background: rgba(255,171,0,0.07); }
  .constraint-title {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-bright);
    margin-bottom: 0.2rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  .constraint-desc { font-size: 0.82rem; color: var(--text); line-height: 1.4; }

  /* STRATEGIES */
  .strategy-header-note {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.65rem;
    color: var(--text-dim);
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
  }
  .strategy-card {
    border: 1px solid var(--border);
    border-left: 3px solid var(--card-color, var(--cyan));
    background: var(--bg3);
    margin-bottom: 0.85rem;
    overflow: hidden;
  }
  .strategy-card-head {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1.1rem;
    background: rgba(0,0,0,0.2);
    border-bottom: 1px solid var(--border);
  }
  .strategy-num {
    font-family: 'Orbitron', monospace;
    font-size: 1.4rem;
    font-weight: 900;
    color: var(--card-color, var(--cyan));
    opacity: 0.5;
    line-height: 1;
  }
  .strategy-title {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.7rem;
    color: var(--card-color, var(--cyan));
    letter-spacing: 0.12em;
    flex: 1;
  }
  .strategy-range {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.55rem;
    color: var(--text-dim);
    letter-spacing: 0.1em;
    border: 1px solid var(--border);
    padding: 0.15rem 0.4rem;
  }
  .strategy-steps {
    list-style: none;
    padding: 0.75rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .strategy-steps li {
    font-size: 0.87rem;
    color: var(--text);
    padding-left: 1rem;
    position: relative;
    line-height: 1.5;
  }
  .strategy-steps li::before {
    content: '›';
    position: absolute;
    left: 0;
    color: var(--card-color, var(--cyan));
  }

  /* CRI */
  .cri-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .cri-card {
    background: var(--bg3);
    border: 1px solid var(--border);
    border-top: 2px solid var(--cri-color);
    padding: 1.25rem;
    text-align: center;
  }
  .cri-weight {
    font-family: 'Orbitron', monospace;
    font-size: 2rem;
    font-weight: 900;
    color: var(--cri-color);
    text-shadow: 0 0 20px color-mix(in srgb, var(--cri-color) 50%, transparent);
    line-height: 1;
    margin-bottom: 0.5rem;
  }
  .cri-label {
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--text-bright);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.4rem;
  }
  .cri-desc { font-size: 0.8rem; color: var(--text-dim); line-height: 1.4; }
  .board-seal { margin-top: 1.5rem; }

  @media (max-width: 768px) {
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
    .formula-grid { grid-template-columns: 1fr; }
    .cri-grid { grid-template-columns: 1fr; }
    .obj-row { grid-template-columns: 1fr; gap: 0.4rem; }
    .sidebar { width: 160px; }
    .nav-title { font-size: 0.7rem; }
    .content-panel { padding: 1.25rem; }
  }
`;