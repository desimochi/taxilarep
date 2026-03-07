"use client";
import { useState, useEffect } from "react";

const sections = [
  {
    id: "prerequisites",
    num: "01",
    title: "Prerequisites to Play",
    tag: "FOUNDATION",
    content: () => (
      <div>
        <p className="lead">Before engaging with the Live Exchange, players should possess a foundational understanding of:</p>
        <div className="prereq-grid">
          {[
            { icon: "◈", label: "Global Macro Assets", desc: "DXY, Brent Crude Oil, USD/INR exchange rates, Gold, Silver, and the Nifty 50." },
            { icon: "◉", label: "Import Parity Pricing", desc: "Domestic commodities (Gold/Silver in INR) are impacted by both the global USD asset price and the USD/INR exchange rate." },
            { icon: "⬡", label: "Leverage & Margin", desc: "Difference between Normal (1x) capital deployment and Intraday/MIS (5x) leveraged margin." },
            { icon: "▣", label: "Risk Management", desc: "How to calculate and place Stop Loss (SL) and Take Profit (TP) orders." },
          ].map((p, i) => (
            <div key={i} className="prereq-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="prereq-icon">{p.icon}</div>
              <div className="prereq-label">{p.label}</div>
              <div className="prereq-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "objectives",
    num: "02",
    title: "Learning Objectives",
    tag: "CURRICULUM",
    content: () => (
      <div>
        <p className="lead">By completing a full 30-day cycle in this simulation, you will achieve:</p>
        <div className="obj-list">
          {[
            { num: "I", title: "Correlation Mastery", desc: "Instantly recognize how a shock in one core asset (e.g., a spike in Crude Oil) ripples through currency markets and equities." },
            { num: "II", title: "Dynamic Risk Assessment", desc: "Learn to adjust portfolio exposure based on daily intelligence briefings and surprise geopolitical events." },
            { num: "III", title: "Leverage Discipline", desc: "Understand the double-edged nature of margin trading during periods of high macroeconomic volatility." },
            { num: "IV", title: "Alpha Generation", desc: "Develop foresight to consistently beat the baseline market return (7% annualized India GDP growth benchmark) through active management." },
          ].map((o, i) => (
            <div key={i} className="obj-item" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="obj-roman">{o.num}</div>
              <div className="obj-content">
                <div className="obj-title">{o.title}</div>
                <div className="obj-desc">{o.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "dashboard",
    num: "03",
    title: "Dashboard Modules",
    tag: "PLATFORM",
    content: () => (
      <div>
        <div className="module-stack">
          {[
            {
              letter: "A",
              title: "Deterministic Shock Simulator",
              desc: "A sandbox tool. Input a theoretical shock (e.g., +5% DXY) to instantly see the historically accurate, beta-adjusted ripple effects on India's economy. Use this to study correlations before risking capital.",
              color: "var(--gold)",
            },
            {
              letter: "B",
              title: "Real Historical Data (3Y)",
              desc: "An analytical charting tool. Select timeframes (Daily to Yearly) and map two assets against each other to visually verify how events over the last 36 months impacted different asset classes.",
              color: "var(--silver)",
            },
            {
              letter: "C",
              title: "Live Exchange (MCX Terminal)",
              desc: "The core game. You are granted ₹1,00,000 in virtual capital. Trade the live, ticking market while navigating daily news, automated square-offs, and surprise macroeconomic shocks.",
              color: "var(--emerald)",
              highlight: true,
            },
          ].map((m, i) => (
            <div key={i} className={`module-card ${m.highlight ? "module-highlight" : ""}`} style={{ "--mc": m.color, animationDelay: `${i * 0.12}s` }}>
              <div className="module-letter" style={{ color: m.color }}>{m.letter}</div>
              <div className="module-content">
                <div className="module-title">{m.title}</div>
                <div className="module-desc">{m.desc}</div>
              </div>
              {m.highlight && <div className="module-badge">CORE</div>}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "mechanics",
    num: "04",
    title: "Gameplay Mechanics",
    tag: "EXECUTION",
    content: () => (
      <div>
        <div className="mech-section">
          <div className="mech-label">GETTING STARTED</div>
          <div className="steps-list">
            {[
              { n: "1", t: "Enter Your Name", d: "Required for your final certification." },
              { n: "2", t: "Review the Intelligence Desk", d: "The DEPR Market Intelligence Desk provides a daily forecast — projecting magnitude of a specific asset's movement over an upcoming timeframe (Intraday, 7 Days, or 15 Days)." },
              { n: "3", t: "Formulate a Strategy", d: 'If the desk forecasts a 5% drop in Oil, consult your Macro Matrix. Falling oil generally strengthens the INR and boosts the Nifty.' },
            ].map((s, i) => (
              <div key={i} className="step-item">
                <div className="step-n">{s.n}</div>
                <div><div className="step-t">{s.t}</div><div className="step-d">{s.d}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="alert-box">
          <span className="alert-icon">⚠</span>
          <span className="alert-text">You are restricted to holding exactly <strong>ONE active position</strong> at a time.</span>
        </div>

        <div className="mech-section">
          <div className="mech-label">ORDER TYPES</div>
          <div className="order-grid">
            <div className="order-card">
              <div className="order-tag">NRML</div>
              <div className="order-name">Normal</div>
              <div className="order-desc">Requires 100% upfront capital. Can be held indefinitely. No automatic square-off.</div>
              <div className="order-leverage">1× Capital</div>
            </div>
            <div className="order-card order-mis">
              <div className="order-tag mis-tag">MIS</div>
              <div className="order-name">Intraday</div>
              <div className="order-desc">₹20,000 margin allows ₹1,00,000 exposure. Auto squared-off past 11:30 PM or on day rollover.</div>
              <div className="order-leverage gold-text">5× Leverage</div>
            </div>
          </div>
        </div>

        <div className="mech-section">
          <div className="mech-label">VOLATILITY & FEES</div>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Tick Rate</div>
              <div className="info-val">Every 1.5 sec</div>
            </div>
            <div className="info-item">
              <div className="info-label">Exchange Fee</div>
              <div className="info-val">0.002% per transaction</div>
              <div className="info-note">Calculated on total exposure, not margin</div>
            </div>
            <div className="info-item">
              <div className="info-label">Macro Shocks</div>
              <div className="info-val danger-text">Constant Background Risk</div>
              <div className="info-note">Cyberattacks, Fed Rate Hikes — can cause instant portfolio wipeout if leveraged without SL</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "scoring",
    num: "05",
    title: "Scoring & Evaluation",
    tag: "ASSESSMENT",
    content: () => (
      <div>
        <div className="thirty-day-rule">
          <div className="rule-eyebrow">THE 30-DAY RULE</div>
          <p className="rule-text">You must keep the simulation active and trade across a minimum of <strong>30 real-world days</strong>. Ending before 30 days results in automatic disqualification — <span className="danger-text">Score: 0 / 100</span>.</p>
        </div>

        <div className="formula-section">
          <div className="formula-label">MATHEMATICAL SCORING — EXPONENTIAL DAMPENING CURVE</div>
          <p className="formula-note">Your score utilizes an exponential dampening curve. Average scores are manageable; achieving 90+ is an elite, mathematically rigorous challenge.</p>
          <div className="formula-cards">
            <div className="formula-card">
              <div className="formula-condition">IF ROI IS NEGATIVE</div>
              <div className="formula-eq">Score = max(0, Round(50 + (ROI × 2)))</div>
              <div className="formula-example">e.g. −25% ROI → Score: 0</div>
            </div>
            <div className="formula-card formula-positive">
              <div className="formula-condition">IF ROI IS POSITIVE</div>
              <div className="formula-eq">Score = Round( 50 + 50 × (1 − e<sup>−0.015 × ROI</sup>) )</div>
              <div className="formula-example">Asymptotic — harder to gain points near 100</div>
            </div>
          </div>
        </div>

        <div className="tiers">
          <div className="tiers-label">PERFORMANCE TIERS</div>
          <div className="tier-list">
            {[
              { range: "50–69", label: "Average", req: "Capital preservation + minor gains (0% to +15% ROI)", color: "#9ca3af" },
              { range: "70–79", label: "Distinguished", req: "Exceptional alpha (~+35% ROI)", color: "#60a5fa" },
              { range: "80–89", label: "Exceptional", req: "Heavy, successful use of MIS leverage (~+65% ROI)", color: "#a78bfa" },
              { range: "90–100", label: "Legendary Alpha", req: "Elite ~+110% ROI. Requires perfectly timing leveraged trades alongside massive geopolitical shocks.", color: "var(--gold)" },
            ].map((t, i) => (
              <div key={i} className="tier-row" style={{ "--tc": t.color }}>
                <div className="tier-range" style={{ color: t.color }}>{t.range}</div>
                <div className="tier-label-text">{t.label}</div>
                <div className="tier-req">{t.req}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="cert-box">
          <div className="cert-icon">✦</div>
          <div>
            <div className="cert-title">Certificate of Excellence</div>
            <div className="cert-desc">Upon finishing, receive a comprehensive analytical breakdown of win rate, fee efficiency, risk management, and a digitally signed Certificate of Excellence from Taxila Business School.</div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function MacroManual() {
  const [active, setActive] = useState("prerequisites");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const activeSection = sections.find((s) => s.id === active);
  const ActiveContent = activeSection.content;

  return (
    <div className={`root ${visible ? "visible" : ""}`}>
      {/* HEADER */}
      <header className="header">
        <div className="header-inner">
          <div className="header-eyebrow">Taxila Business School</div>
          <h1 className="header-title">Advanced Macroeconomic &<br />Cross-Asset Trading Simulation</h1>
          <div className="header-sub">Player's Manual — Analysts, Policymakers & Finance Students</div>
          <div className="header-capital">
            <span className="capital-label">VIRTUAL CAPITAL</span>
            <span className="capital-value">₹1,00,000</span>
            <span className="capital-divider">|</span>
            <span className="capital-label">DURATION</span>
            <span className="capital-value">30 DAYS</span>
          </div>
        </div>
        <div className="header-ticker">
          <span className="ticker-item"><span className="ticker-asset">DXY</span> <span className="ticker-up">↑ +0.34%</span></span>
          <span className="ticker-sep">·</span>
          <span className="ticker-item"><span className="ticker-asset">BRENT</span> <span className="ticker-down">↓ −1.12%</span></span>
          <span className="ticker-sep">·</span>
          <span className="ticker-item"><span className="ticker-asset">USD/INR</span> <span className="ticker-up">↑ +0.07%</span></span>
          <span className="ticker-sep">·</span>
          <span className="ticker-item"><span className="ticker-asset">NIFTY 50</span> <span className="ticker-up">↑ +0.58%</span></span>
          <span className="ticker-sep">·</span>
          <span className="ticker-item"><span className="ticker-asset">GOLD</span> <span className="ticker-up">↑ +0.21%</span></span>
          <span className="ticker-sep">·</span>
          <span className="ticker-item"><span className="ticker-asset">SILVER</span> <span className="ticker-down">↓ −0.44%</span></span>
        </div>
      </header>

      <div className="body-layout">
        {/* SIDEBAR */}
        <nav className="sidebar">
          {sections.map((s) => (
            <button key={s.id} className={`nav-item ${active === s.id ? "nav-active" : ""}`} onClick={() => setActive(s.id)}>
              <div className="nav-num">{s.num}</div>
              <div>
                <div className="nav-tag">{s.tag}</div>
                <div className="nav-title">{s.title}</div>
              </div>
            </button>
          ))}
        </nav>

        {/* CONTENT */}
        <main className="content" key={active}>
          <div className="content-head">
            <div className="ch-meta">
              <span className="ch-num">{activeSection.num}</span>
              <span className="ch-tag">{activeSection.tag}</span>
            </div>
            <h2 className="ch-title">{activeSection.title}</h2>
          </div>
          <div className="content-body">
            <ActiveContent />
          </div>
        </main>
      </div>

      <footer className="footer">
        © 2026 Taxila Business School · Advanced Macroeconomic Simulation · All rights reserved
      </footer>

      <style>{css}</style>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

  :root {
    --navy: #05111f;
    --navy2: #081928;
    --navy3: #0d2236;
    --border: #1a3048;
    --border2: #244460;
    --gold: #c8a96e;
    --gold-light: #e8c98a;
    --silver: #94a3b8;
    --emerald: #2dd4a4;
    --text: #8faec4;
    --text-bright: #d8eaf5;
    --text-dim: #3d6280;
    --red: #f43f5e;
    --bg-page: #060e18;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .root {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg-page);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: translateY(8px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .root.visible { opacity: 1; transform: translateY(0); }

  /* HEADER */
  .header {
    background: linear-gradient(160deg, #05111f 0%, #081a2e 60%, #0a2240 100%);
    border-bottom: 1px solid var(--border);
    position: relative;
    overflow: hidden;
  }
  .header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      90deg,
      transparent 0px, transparent 60px,
      rgba(200,169,110,0.025) 60px, rgba(200,169,110,0.025) 61px
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0px, transparent 40px,
      rgba(200,169,110,0.015) 40px, rgba(200,169,110,0.015) 41px
    );
    pointer-events: none;
  }
  .header-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 3rem 2rem 2rem;
    text-align: center;
    position: relative;
  }
  .header-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .header-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 3rem);
    font-weight: 900;
    color: var(--text-bright);
    line-height: 1.2;
    margin-bottom: 0.75rem;
  }
  .header-sub {
    font-size: 0.85rem;
    color: var(--text-dim);
    letter-spacing: 0.08em;
    margin-bottom: 1.75rem;
  }
  .header-capital {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    border: 1px solid rgba(200,169,110,0.3);
    padding: 0.4rem 1.25rem;
    background: rgba(200,169,110,0.06);
  }
  .capital-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    color: var(--text-dim);
    letter-spacing: 0.15em;
  }
  .capital-value {
    font-family: 'DM Mono', monospace;
    font-size: 0.85rem;
    color: var(--gold);
    font-weight: 500;
  }
  .capital-divider { color: var(--border2); }
  .header-ticker {
    background: rgba(0,0,0,0.3);
    border-top: 1px solid var(--border);
    padding: 0.55rem 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
    position: relative;
  }
  .ticker-item { display: flex; align-items: center; gap: 0.4rem; }
  .ticker-asset {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: var(--text-dim);
    letter-spacing: 0.08em;
  }
  .ticker-up {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: var(--emerald);
  }
  .ticker-down {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    color: var(--red);
  }
  .ticker-sep { color: var(--border2); }

  /* BODY LAYOUT */
  .body-layout {
    display: flex;
    flex: 1;
    max-width: 1100px;
    width: 100%;
    margin: 0 auto;
    padding: 0;
  }

  /* SIDEBAR */
  .sidebar {
    width: 230px;
    flex-shrink: 0;
    border-right: 1px solid var(--border);
    padding: 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }
  .nav-item {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    padding: 0.85rem 1.25rem;
    background: none;
    border: none;
    border-right: 2px solid transparent;
    cursor: pointer;
    text-align: left;
    color: var(--text-dim);
    transition: all 0.15s;
    width: 100%;
  }
  .nav-item:hover {
    background: rgba(200,169,110,0.04);
    color: var(--text);
    border-right-color: var(--border2);
  }
  .nav-active {
    background: rgba(200,169,110,0.07) !important;
    color: var(--gold) !important;
    border-right-color: var(--gold) !important;
  }
  .nav-num {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 900;
    color: rgba(200,169,110,0.15);
    line-height: 1;
    margin-top: 2px;
  }
  .nav-active .nav-num { color: rgba(200,169,110,0.4); }
  .nav-tag {
    font-family: 'DM Mono', monospace;
    font-size: 0.5rem;
    letter-spacing: 0.18em;
    color: var(--text-dim);
    margin-bottom: 0.2rem;
  }
  .nav-active .nav-tag { color: rgba(200,169,110,0.6); }
  .nav-title {
    font-size: 0.82rem;
    font-weight: 600;
    line-height: 1.2;
  }

  /* CONTENT */
  .content {
    flex: 1;
    overflow-y: auto;
    padding: 2rem 2.5rem;
    animation: fadeIn 0.3s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateX(6px); } to { opacity: 1; transform: translateX(0); } }
  .content-head {
    margin-bottom: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid var(--border);
  }
  .ch-meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.5rem;
  }
  .ch-num {
    font-family: 'Playfair Display', serif;
    font-size: 0.85rem;
    font-style: italic;
    color: var(--gold);
    opacity: 0.6;
  }
  .ch-tag {
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--text-dim);
    border: 1px solid var(--border);
    padding: 0.15rem 0.45rem;
  }
  .ch-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.7rem;
    font-weight: 700;
    color: var(--text-bright);
    line-height: 1.2;
  }

  /* CONTENT ELEMENTS */
  .lead {
    font-size: 0.95rem;
    line-height: 1.75;
    color: var(--text-bright);
    margin-bottom: 1.5rem;
    font-weight: 300;
  }

  /* PREREQ GRID */
  .prereq-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
  }
  .prereq-card {
    background: var(--navy2);
    border: 1px solid var(--border);
    border-top: 2px solid var(--gold);
    padding: 1.2rem;
    animation: slideUp 0.4s ease both;
  }
  @keyframes slideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  .prereq-icon {
    font-size: 1.1rem;
    color: var(--gold);
    margin-bottom: 0.5rem;
    opacity: 0.7;
  }
  .prereq-label {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-bright);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.35rem;
  }
  .prereq-desc { font-size: 0.82rem; color: var(--text); line-height: 1.5; }

  /* OBJECTIVES */
  .obj-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .obj-item {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    padding: 1rem 1.25rem;
    background: var(--navy2);
    border: 1px solid var(--border);
    border-left: 2px solid var(--gold);
    animation: slideUp 0.4s ease both;
  }
  .obj-roman {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-style: italic;
    color: rgba(200,169,110,0.25);
    min-width: 28px;
    line-height: 1;
    margin-top: 2px;
  }
  .obj-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--text-bright);
    letter-spacing: 0.04em;
    margin-bottom: 0.3rem;
    text-transform: uppercase;
  }
  .obj-desc { font-size: 0.84rem; color: var(--text); line-height: 1.55; }

  /* MODULES */
  .module-stack { display: flex; flex-direction: column; gap: 0.85rem; }
  .module-card {
    display: flex;
    align-items: flex-start;
    gap: 1.25rem;
    padding: 1.25rem;
    background: var(--navy2);
    border: 1px solid var(--border);
    position: relative;
    animation: slideUp 0.4s ease both;
    transition: border-color 0.2s;
  }
  .module-card:hover { border-color: var(--mc, var(--border2)); }
  .module-highlight {
    border-color: rgba(45,212,164,0.3);
    background: rgba(45,212,164,0.04);
  }
  .module-letter {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 900;
    line-height: 1;
    opacity: 0.6;
    flex-shrink: 0;
  }
  .module-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-bright);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.4rem;
  }
  .module-desc { font-size: 0.84rem; color: var(--text); line-height: 1.55; }
  .module-badge {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.5rem;
    letter-spacing: 0.15em;
    color: var(--emerald);
    border: 1px solid var(--emerald);
    padding: 0.1rem 0.35rem;
    opacity: 0.7;
  }

  /* MECHANICS */
  .mech-section { margin-bottom: 1.75rem; }
  .mech-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--gold);
    margin-bottom: 0.85rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--border);
  }
  .steps-list { display: flex; flex-direction: column; gap: 0.6rem; }
  .step-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 0.85rem 1rem;
    background: var(--navy2);
    border: 1px solid var(--border);
  }
  .step-n {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
    font-style: italic;
    color: rgba(200,169,110,0.2);
    min-width: 22px;
    line-height: 1;
  }
  .step-t {
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--text-bright);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
  }
  .step-d { font-size: 0.82rem; color: var(--text); line-height: 1.5; }
  .alert-box {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 0.9rem 1.25rem;
    background: rgba(244,63,94,0.07);
    border: 1px solid rgba(244,63,94,0.3);
    border-left: 3px solid var(--red);
    margin-bottom: 1.75rem;
  }
  .alert-icon { font-size: 1rem; color: var(--red); }
  .alert-text { font-size: 0.86rem; color: var(--text-bright); line-height: 1.5; }
  .order-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
  .order-card {
    padding: 1.25rem;
    background: var(--navy2);
    border: 1px solid var(--border);
  }
  .order-mis { border-color: rgba(200,169,110,0.25); background: rgba(200,169,110,0.04); }
  .order-tag {
    font-family: 'DM Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    color: var(--text-dim);
    border: 1px solid var(--border);
    display: inline-block;
    padding: 0.1rem 0.4rem;
    margin-bottom: 0.5rem;
  }
  .mis-tag { color: var(--gold); border-color: rgba(200,169,110,0.4); }
  .order-name {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-bright);
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .order-desc { font-size: 0.8rem; color: var(--text); line-height: 1.5; margin-bottom: 0.6rem; }
  .order-leverage {
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
    color: var(--silver);
    font-weight: 500;
  }
  .gold-text { color: var(--gold) !important; }
  .info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
  .info-item {
    padding: 1rem;
    background: var(--navy2);
    border: 1px solid var(--border);
  }
  .info-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.12em;
    color: var(--text-dim);
    margin-bottom: 0.4rem;
  }
  .info-val {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--text-bright);
    margin-bottom: 0.3rem;
  }
  .info-note { font-size: 0.75rem; color: var(--text-dim); line-height: 1.4; }
  .danger-text { color: var(--red); }

  /* SCORING */
  .thirty-day-rule {
    background: linear-gradient(135deg, var(--navy3), var(--navy2));
    border: 1px solid var(--border2);
    border-top: 2px solid var(--gold);
    padding: 1.5rem;
    margin-bottom: 1.75rem;
  }
  .rule-eyebrow {
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--gold);
    margin-bottom: 0.65rem;
  }
  .rule-text { font-size: 0.9rem; color: var(--text-bright); line-height: 1.6; }
  .formula-section { margin-bottom: 1.75rem; }
  .formula-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--gold);
    margin-bottom: 0.5rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid var(--border);
  }
  .formula-note { font-size: 0.85rem; color: var(--text); margin-bottom: 1rem; line-height: 1.55; }
  .formula-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
  .formula-card {
    padding: 1.25rem;
    background: var(--navy2);
    border: 1px solid var(--border);
  }
  .formula-positive { border-color: rgba(200,169,110,0.2); background: rgba(200,169,110,0.03); }
  .formula-condition {
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.12em;
    color: var(--text-dim);
    margin-bottom: 0.6rem;
  }
  .formula-eq {
    font-family: 'DM Mono', monospace;
    font-size: 0.78rem;
    color: var(--gold);
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }
  .formula-example { font-size: 0.75rem; color: var(--text-dim); font-style: italic; }
  .tiers { margin-bottom: 1.75rem; }
  .tiers-label {
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.2em;
    color: var(--gold);
    margin-bottom: 0.75rem;
  }
  .tier-list { display: flex; flex-direction: column; gap: 0.5rem; }
  .tier-row {
    display: grid;
    grid-template-columns: 70px 160px 1fr;
    gap: 1rem;
    align-items: center;
    padding: 0.85rem 1rem;
    background: var(--navy2);
    border: 1px solid var(--border);
    border-left: 2px solid var(--tc);
  }
  .tier-range {
    font-family: 'DM Mono', monospace;
    font-size: 0.75rem;
    font-weight: 500;
  }
  .tier-label-text {
    font-size: 0.82rem;
    font-weight: 700;
    color: var(--text-bright);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .tier-req { font-size: 0.8rem; color: var(--text); line-height: 1.4; }
  .cert-box {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.25rem;
    background: rgba(45,212,164,0.05);
    border: 1px solid rgba(45,212,164,0.2);
  }
  .cert-icon { font-size: 1.2rem; color: var(--emerald); flex-shrink: 0; margin-top: 2px; }
  .cert-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: var(--text-bright);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 0.3rem;
  }
  .cert-desc { font-size: 0.82rem; color: var(--text); line-height: 1.55; }

  /* FOOTER */
  .footer {
    text-align: center;
    padding: 1.25rem;
    border-top: 1px solid var(--border);
    font-family: 'DM Mono', monospace;
    font-size: 0.55rem;
    letter-spacing: 0.12em;
    color: var(--text-dim);
  }

  @media (max-width: 768px) {
    .body-layout { flex-direction: column; }
    .sidebar { width: 100%; flex-direction: row; overflow-x: auto; padding: 0.5rem; border-right: none; border-bottom: 1px solid var(--border); }
    .nav-item { flex-direction: column; min-width: 100px; padding: 0.6rem; }
    .nav-num { font-size: 1rem; }
    .prereq-grid { grid-template-columns: 1fr; }
    .formula-cards { grid-template-columns: 1fr; }
    .order-grid { grid-template-columns: 1fr; }
    .info-grid { grid-template-columns: 1fr; }
    .tier-row { grid-template-columns: 60px 1fr; }
    .tier-req { grid-column: 1 / -1; }
    .content { padding: 1.25rem; }
  }
`;