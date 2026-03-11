'use client'
import { useState } from "react";

const sections = [
  { id: "intro", label: "01 / Intro", title: "Executive Introduction" },
  { id: "syllabus", label: "02 / Syllabus", title: "Academic Syllabus" },
  { id: "outcomes", label: "03 / Outcomes", title: "Learning Outcomes" },
  { id: "elasticity", label: "04 / Economics", title: "Price Elasticity Engine" },
  { id: "examples", label: "05 / History", title: "Real-Life Price Wars" },
  { id: "strategy", label: "06 / Strategy", title: "Winning Strategy" },
  { id: "barrier", label: "07 / Debug", title: "The 80 Barrier" },
  { id: "glossary", label: "08 / Glossary", title: "Glossary" },
];

const phaseData = [
  {
    phase: "Phase 1",
    name: "Hunker Down",
    months: "Months 1–10",
    color: "#c0392b",
    bg: "#1a0808",
    mrp: "₹24,000 – ₹28,000",
    marketing: "₹5L – ₹12L",
    goal: "Survive. Let Aether-AI drain its own capital. Aim for near-zero cumulative P/L.",
  },
  {
    phase: "Phase 2",
    name: "Executioner Pivot",
    months: "Months 11–17",
    color: "#e67e22",
    bg: "#1a0f00",
    mrp: "₹16,500",
    marketing: "₹85L (Spike)",
    goal: "Shock & Awe. Flip the Marketing Power bar. Deploy your saved capital now.",
  },
  {
    phase: "Phase 3",
    name: "Exit Harvest",
    months: "Months 18–20",
    color: "#27ae60",
    bg: "#081a0c",
    mrp: "Raise to ₹19,500",
    marketing: "Scale to ₹30L",
    goal: "Close with positive Cumulative P/L and 25%+ market share. Break the 80 Barrier.",
  },
];

const glossaryTerms = [
  { term: "Aether-AI", def: "A reactive neural-net competitor model that prioritizes undercutting the player by 10–15% of the player's current price." },
  { term: "Break-even MRP", def: "The price point where Revenue = (Variable Cost + Marketing Cost). Calculated with a 0.847 factor to account for GST/Net Revenue adjustments." },
  { term: "CEO Rating", def: "A proprietary Taxila index: 50% Profit Performance + 50% Volume Dominance, throttled by a Hardness Curve." },
  { term: "Intelligence Feed", def: "Real-time data logs providing insight into the AI's logic for the current month." },
  { term: "Market Power Bar", def: "A visual representation of advertising dominance. Directly influences the Gravity of your price moves." },
  { term: "Tenure Progress", def: "Your 20-cycle clock. Strategies must be back-loaded — take risks at the end once capital is preserved at the start." },
];

const warExamples = [
  {
    title: "Jio vs. Incumbents",
    label: "India Telecom",
    year: "2016",
    strategy: "Predatory Pricing",
    outcome: "Several incumbents went insolvent or forced into distressed mergers. Jio secured long-term market dominance.",
    lesson: "Market share during a predatory phase is only valuable if you survive long enough to monetize it.",
    icon: "📡",
  },
  {
    title: "Amazon vs. Diapers.com",
    label: "E-commerce",
    year: "2010s",
    strategy: "Mirroring / Bot Matching",
    outcome: "Amazon lost $100M in a single quarter on diapers alone. Quidsi eventually sold to Amazon.",
    lesson: "A competitor with a larger war chest can 'Out-Loss' you.",
    icon: "📦",
  },
  {
    title: "American Airlines vs. LCCs",
    label: "Aviation",
    year: "1990s",
    strategy: "Capacity Dumping",
    outcome: "Smaller airlines couldn't match low fares and went bankrupt.",
    lesson: "Pricing is a weapon used to protect Territory (Market Share).",
    icon: "✈️",
  },
];

export default function PlayerManual() {
  const [activeSection, setActiveSection] = useState("intro");
  const [expandedGlossary, setExpandedGlossary] = useState(null);

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0a0a0f",
      color: "#e8e0d0",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Code+Pro:wght@400;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0f; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #8b0000; }
        .nav-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Source Code Pro', monospace;
          font-size: 10px; letter-spacing: 2px; text-transform: uppercase;
          color: #666; padding: 8px 12px; border-left: 2px solid transparent;
          transition: all 0.2s; text-align: left; width: 100%;
        }
        .nav-btn:hover { color: #e8e0d0; border-left-color: #8b0000; }
        .nav-btn.active { color: #EE82EE; border-left-color: #EE82EE; background: rgba(139,0,0,0.1); }
        .phase-card {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 4px;
          padding: 20px;
          margin-bottom: 16px;
          transition: transform 0.2s, border-color 0.2s;
        }
        .phase-card:hover { transform: translateX(4px); }
        .war-card {
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 4px;
          padding: 20px;
          margin-bottom: 16px;
          background: rgba(255,255,255,0.02);
        }
        .glossary-item {
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 14px 0;
          cursor: pointer;
          transition: all 0.2s;
        }
        .glossary-item:hover { padding-left: 8px; }
        .pillar {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 4px;
          padding: 18px;
          margin-bottom: 14px;
          background: rgba(255,255,255,0.02);
        }
        .outcome-item {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .tag {
          display: inline-block;
          font-family: 'Source Code Pro', monospace;
          font-size: 10px;
          letter-spacing: 1px;
          padding: 3px 8px;
          border-radius: 2px;
          background: rgba(139,0,0,0.2);
          color: #ff6666;
          border: 1px solid rgba(139,0,0,0.4);
          margin-right: 6px;
          margin-bottom: 4px;
        }
        .stat-box {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 3px;
          padding: 12px 16px;
          text-align: center;
        }
        .section-content { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .barrier-item {
          display: flex; gap: 14px; padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .number-badge {
          font-family: 'Playfair Display', serif;
          font-size: 28px; font-weight: 900;
          color: rgba(139,0,0,0.4);
          line-height: 1;
          min-width: 32px;
        }
      `}</style>

      {/* Header */}
      <header style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "24px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div>
          <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", letterSpacing: "3px", color: "#8b0000", marginBottom: "4px" }}>
            TAXILA BUSINESS SCHOOL · STRATEGIC ANALYTICS SIMULATION
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px", fontWeight: 900,
            color: "#e8e0d0", letterSpacing: "1px",
          }}>
            PRICE WAR-1: Extreme Edition
          </h1>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div className="stat-box">
            <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", color: "#666", letterSpacing: "2px", marginBottom: "4px" }}>MARKET</div>
            <div style={{ fontSize: "14px", color: "#e8e0d0", fontWeight: "bold" }}>40,000 units</div>
          </div>
          <div className="stat-box">
            <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", color: "#666", letterSpacing: "2px", marginBottom: "4px" }}>TENURE</div>
            <div style={{ fontSize: "14px", color: "#e8e0d0", fontWeight: "bold" }}>20 Months</div>
          </div>
          <div className="stat-box">
            <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", color: "#666", letterSpacing: "2px", marginBottom: "4px" }}>LIMIT</div>
            <div style={{ fontSize: "14px", color: "#EE82EE", fontWeight: "bold" }}>₹50L</div>
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <nav style={{
          width: "180px",
          minWidth: "180px",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 0",
          background: "rgba(0,0,0,0.2)",
          position: "sticky", top: "73px",
          height: "calc(100vh - 73px)",
          overflow: "auto",
        }}>
          <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", color: "#444", letterSpacing: "3px", padding: "0 16px", marginBottom: "12px" }}>
            SECTIONS
          </div>
          {sections.map((s) => (
            <button
              key={s.id}
              className={`nav-btn ${activeSection === s.id ? "active" : ""}`}
              onClick={() => setActiveSection(s.id)}
            >
              {s.label}
            </button>
          ))}
          <div style={{ marginTop: "40px", padding: "16px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", color: "#444", letterSpacing: "2px", marginBottom: "8px" }}>TEAM</div>
            <div style={{ fontSize: "11px", color: "#888", lineHeight: 1.6 }}>Vayu-G<br />vs.<br /><span style={{ color: "#c0392b" }}>Aether-AI</span></div>
          </div>
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1, padding: "48px 56px", maxWidth: "860px" }}>

          {/* Section Header */}
          <div style={{ marginBottom: "40px" }}>
            <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", letterSpacing: "3px", color: "#8b0000", marginBottom: "8px" }}>
              {sections.find(s => s.id === activeSection)?.label}
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "36px", fontWeight: 900,
              color: "#e8e0d0",
              borderBottom: "2px solid #8b0000",
              paddingBottom: "16px",
            }}>
              {sections.find(s => s.id === activeSection)?.title}
            </h2>
          </div>

          {/* — INTRO — */}
          {activeSection === "intro" && (
            <div className="section-content">
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: "#ccc", marginBottom: "28px" }}>
                Welcome, CEO. You have been chosen to lead <strong style={{ color: "#e8e0d0" }}>Vayu-G</strong>, a disruptive force in the Jaipur Smart Air Purifier market. However, your arrival coincides with a period of unprecedented market hostility.
              </p>
              <p style={{ fontSize: "16px", lineHeight: 1.9, color: "#ccc", marginBottom: "32px" }}>
                <strong style={{ color: "#e8e0d0" }}>PRICE WAR-1: Extreme Edition</strong> is not a game of casual clicks; it is a hardened mathematical model designed to test your mental fortitude, quantitative precision, and strategic foresight.
              </p>
              <div style={{
                background: "rgba(139,0,0,0.1)",
                border: "1px solid rgba(139,0,0,0.3)",
                borderLeft: "4px solid #8b0000",
                borderRadius: "4px",
                padding: "24px",
                marginBottom: "32px",
              }}>
                <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", letterSpacing: "2px", color: "#ff6666", marginBottom: "10px" }}>INTELLIGENCE BRIEFING</div>
                <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#e8e0d0" }}>
                  In this environment, you are not merely selling a product — you are managing a war of attrition against <strong style={{ color: "#EE82EE" }}>Aether-AI</strong>, a competitor with a deep war chest and a predatory mandate. This manual provides the theoretical foundation and the tactical blueprint required to navigate your 20-month tenure.
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[["Market Potential", "40,000 units", "Total addressable units in Jaipur"],
                  ["Variable Cost", "₹9,200/unit", "Amortized marketing included"],
                  ["Insolvency Limit", "₹50 Lakhs", "Your strategic lifeblood floor"],
                ].map(([label, val, sub]) => (
                  <div key={label} className="stat-box" style={{ textAlign: "left", padding: "16px" }}>
                    <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", color: "#666", letterSpacing: "2px", marginBottom: "8px" }}>{label}</div>
                    <div style={{ fontSize: "18px", color: "#e8e0d0", fontWeight: "bold", marginBottom: "4px" }}>{val}</div>
                    <div style={{ fontSize: "11px", color: "#666" }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* — SYLLABUS — */}
          {activeSection === "syllabus" && (
            <div className="section-content">
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#aaa", marginBottom: "28px" }}>
                The simulation is a practical application of the Taxila Business School MBA curriculum. Master concepts across four core pillars to succeed.
              </p>
              {[
                {
                  label: "A", title: "Managerial Economics", items: [
                    ["Price Elasticity of Demand (PED)", "How sensitive the Jaipur consumer is to price fluctuations. Observe the \"Kinked Demand Curve\" — price cuts are matched, increases are not."],
                    ["Marginal Costing & Contribution Margin", "Surplus per unit after variable costs (₹9,200) and amortized marketing."],
                    ["The Bertrand Paradox", "Game-theory state where two firms competing purely on price drive market price to marginal cost — zero profit for both."],
                  ]
                },
                {
                  label: "B", title: "Strategic Marketing", items: [
                    ["Share of Voice (SoV) vs. Market Share", "How Marketing Power (visibility) acts as a buffer against price sensitivity."],
                    ["Diminishing Marginal Utility of Advertising", "Doubling budget does not double demand. The Square Root Effect models saturation."],
                    ["Brand Premiumization", "High-price positioning signals quality, attracting Inelastic customers who prioritize features."],
                  ]
                },
                {
                  label: "C", title: "Financial Management", items: [
                    ["Working Capital Resilience", "Managing the ₹50L insolvency limit. Treat cash reserves as your Strategic Lifeblood."],
                    ["Dynamic Breakeven Analysis", "Utilize the Breakeven MRP pill to know the minimum price to sustain operations."],
                    ["Capital Allocation", "Determine if a Rupee is better spent on Price Subsidy (lower MRP) or Demand Generation (Marketing)."],
                  ]
                },
                {
                  label: "D", title: "Strategic Management & Game Theory", items: [
                    ["Predatory Pricing", "Identifying phases where a competitor intentionally operates at a loss to force your exit."],
                    ["Zero-Sum Dynamics", "Every unit sold by Aether-AI is a unit lost by Vayu-G within the 40,000-unit market."],
                    ["Nash Equilibrium", "Seeking a stable state where neither party can improve position by unilateral change."],
                  ]
                },
              ].map((pillar) => (
                <div key={pillar.label} className="pillar">
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px", fontWeight: 900,
                      color: "#8b0000",
                      width: "32px",
                    }}>{pillar.label}.</span>
                    <span style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "11px", letterSpacing: "2px", color: "#e8e0d0", textTransform: "uppercase" }}>{pillar.title}</span>
                  </div>
                  {pillar.items.map(([term, def]) => (
                    <div key={term} style={{ paddingLeft: "44px", marginBottom: "12px" }}>
                      <div style={{ fontSize: "13px", color: "#e8e0d0", fontWeight: "bold", marginBottom: "3px" }}>{term}</div>
                      <div style={{ fontSize: "13px", color: "#888", lineHeight: 1.6 }}>{def}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* — OUTCOMES — */}
          {activeSection === "outcomes" && (
            <div className="section-content">
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#aaa", marginBottom: "28px" }}>
                By completing your 20-month tenure, you will achieve the following competencies verified by the simulations hardened evaluation engine.
              </p>
              {[
                { num: "01", title: "Quantitative Reasoning", desc: "The ability to look at a CEO Rating and Elasticity figure and reverse-engineer the market's mood." },
                { num: "02", title: "Resilience Under Pressure", desc: "Maintaining a long-term strategy even while the Intelligence Feed reports losses and aggressive competitor moves." },
                { num: "03", title: "Advanced Market Sensing", desc: "Learning to differentiate between Market Noise and Strategic Trends in the Trend Analysis chart." },
                { num: "04", title: "Competitive Intelligence", desc: "Interpreting the Aether-AI profile to predict its next move based on your previous month's price." },
              ].map((o) => (
                <div key={o.num} className="outcome-item">
                  <div className="number-badge">{o.num}</div>
                  <div>
                    <div style={{ fontSize: "15px", color: "#e8e0d0", fontWeight: "bold", marginBottom: "6px" }}>{o.title}</div>
                    <div style={{ fontSize: "14px", color: "#888", lineHeight: 1.7 }}>{o.desc}</div>
                  </div>
                </div>
              ))}
              <div style={{
                marginTop: "32px",
                background: "rgba(39,174,96,0.07)",
                border: "1px solid rgba(39,174,96,0.2)",
                borderRadius: "4px",
                padding: "20px",
              }}>
                <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", letterSpacing: "2px", color: "#27ae60", marginBottom: "10px" }}>COMPLETION REWARD</div>
                <p style={{ fontSize: "14px", color: "#aaa", lineHeight: 1.7 }}>
                  Upon completion of Month 20, the simulation generates a high-resolution certificate signed by <strong style={{ color: "#e8e0d0" }}>Prof. Rajat Bohra, Dean of Taxila Business School</strong>. CEOs breaking the <strong style={{ color: "#27ae60" }}>70-point barrier</strong> are encouraged to share their Strategic Performance Report on LinkedIn.
                </p>
              </div>
            </div>
          )}

          {/* — ELASTICITY — */}
          {activeSection === "elasticity" && (
            <div className="section-content">
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#aaa", marginBottom: "28px" }}>
                Price Elasticity is the core engine of the game — measuring how sensitively demand responds to price changes. In the Extreme Edition, the market is Hardened.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "28px" }}>
                <div style={{ background: "rgba(192,57,43,0.1)", border: "1px solid rgba(192,57,43,0.3)", borderRadius: "4px", padding: "20px" }}>
                  <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", letterSpacing: "2px", color: "#e74c3c", marginBottom: "10px" }}>ELASTIC MARKET (|ε| &gt; 1)</div>
                  <p style={{ fontSize: "13px", color: "#aaa", lineHeight: 1.7 }}>If you raise your price by <strong style={{ color: "#e8e0d0" }}>10%</strong>, you might lose <strong style={{ color: "#e74c3c" }}>25% of your volume</strong>. This usually occurs when your marketing power is low.</p>
                </div>
                <div style={{ background: "rgba(39,174,96,0.07)", border: "1px solid rgba(39,174,96,0.25)", borderRadius: "4px", padding: "20px" }}>
                  <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", letterSpacing: "2px", color: "#27ae60", marginBottom: "10px" }}>INELASTIC MARKET (|ε| &lt; 1)</div>
                  <p style={{ fontSize: "13px", color: "#aaa", lineHeight: 1.7 }}>With a massive Marketing Power bar, customers are loyal. You can raise prices with <strong style={{ color: "#27ae60" }}>minimal volume loss</strong>.</p>
                </div>
              </div>
              <div style={{
                background: "rgba(230,126,34,0.08)",
                border: "1px solid rgba(230,126,34,0.25)",
                borderLeft: "4px solid #e67e22",
                borderRadius: "4px",
                padding: "20px",
                marginBottom: "24px",
              }}>
                <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", letterSpacing: "2px", color: "#e67e22", marginBottom: "10px" }}>⚠ THE PRICE GAP MULTIPLIER</div>
                <p style={{ fontSize: "14px", color: "#ccc", lineHeight: 1.8 }}>
                  Aether-AI is obsessed with the <strong style={{ color: "#e8e0d0" }}>Price Gap</strong>. If you set your price at <strong>₹18,000</strong> and Aether-AI is at <strong>₹16,000</strong>, the ₹2,000 gap acts as a Gravity Well, pulling your customers toward the competitor. The <strong style={{ color: "#e67e22" }}>Substitutability Effect is amplified by 2.5×</strong> during the predatory phase.
                </p>
              </div>
              <div style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "4px",
                padding: "20px",
                fontFamily: "'Source Code Pro', monospace",
              }}>
                <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#666", marginBottom: "14px" }}>FORMULA</div>
                <div style={{ fontSize: "13px", color: "#e8e0d0", marginBottom: "8px" }}>Breakeven MRP = (Variable Cost + Marketing Cost per Unit) / 0.847</div>
                <div style={{ fontSize: "11px", color: "#666" }}>The 0.847 factor accounts for GST / Net Revenue adjustments</div>
              </div>
            </div>
          )}

          {/* — EXAMPLES — */}
          {activeSection === "examples" && (
            <div className="section-content">
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#aaa", marginBottom: "28px" }}>
                To understand the stakes of PRICE WAR-1, we examine historical precedents where companies engaged in the same brutal tactics modeled in the simulation.
              </p>
              {warExamples.map((ex) => (
                <div key={ex.title} className="war-card">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                      <span style={{ fontSize: "24px" }}>{ex.icon}</span>
                      <div>
                        <div style={{ fontSize: "16px", color: "#e8e0d0", fontWeight: "bold" }}>{ex.title}</div>
                        <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", color: "#666", letterSpacing: "1px" }}>{ex.label} · {ex.year}</div>
                      </div>
                    </div>
                    <span className="tag">{ex.strategy}</span>
                  </div>
                  <p style={{ fontSize: "13px", color: "#aaa", lineHeight: 1.7, marginBottom: "12px" }}>
                    <strong style={{ color: "#e8e0d0" }}>Outcome:</strong> {ex.outcome}
                  </p>
                  <div style={{
                    background: "rgba(139,0,0,0.1)",
                    borderLeft: "3px solid #8b0000",
                    padding: "10px 14px",
                    borderRadius: "0 4px 4px 0",
                  }}>
                    <span style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", color: "#ff6666", letterSpacing: "1px" }}>LESSON: </span>
                    <span style={{ fontSize: "13px", color: "#ccc" }}>{ex.lesson}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* — STRATEGY — */}
          {activeSection === "strategy" && (
            <div className="section-content">
              <div style={{
                background: "rgba(139,0,0,0.1)",
                border: "1px solid rgba(139,0,0,0.3)",
                borderRadius: "4px",
                padding: "20px",
                marginBottom: "32px",
              }}>
                <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", letterSpacing: "2px", color: "#ff6666", marginBottom: "10px" }}>THE S GRADE PATH — THE GOLDEN MEAN</div>
                <p style={{ fontSize: "14px", color: "#ccc", lineHeight: 1.8 }}>
                  In this version, achieving a score over 80 is nearly impossible because the algorithm penalizes Buying the Market. The only path to breaking the 80 Barrier is a disciplined three-phase approach.
                </p>
              </div>
              {phaseData.map((ph) => (
                <div key={ph.phase} className="phase-card" style={{ background: ph.bg, borderColor: `${ph.color}33` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                    <div>
                      <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", letterSpacing: "3px", color: ph.color, marginBottom: "4px" }}>{ph.phase} · {ph.months}</div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 900, color: "#e8e0d0" }}>{ph.name}</div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "14px" }}>
                    <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px 14px", borderRadius: "3px" }}>
                      <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", color: "#666", letterSpacing: "2px", marginBottom: "4px" }}>MRP TARGET</div>
                      <div style={{ fontSize: "14px", color: ph.color, fontWeight: "bold" }}>{ph.mrp}</div>
                    </div>
                    <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px 14px", borderRadius: "3px" }}>
                      <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", color: "#666", letterSpacing: "2px", marginBottom: "4px" }}>MARKETING</div>
                      <div style={{ fontSize: "14px", color: ph.color, fontWeight: "bold" }}>{ph.marketing}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: "13px", color: "#aaa", lineHeight: 1.7, borderTop: `1px solid ${ph.color}22`, paddingTop: "12px" }}>
                    <strong style={{ color: "#e8e0d0" }}>Goal: </strong>{ph.goal}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* — BARRIER — */}
          {activeSection === "barrier" && (
            <div className="section-content">
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#aaa", marginBottom: "28px" }}>
                If your score is stuck in the 60s or 70s, the Hardened evaluation script is likely flagging one of three critical issues:
              </p>
              {[
                {
                  n: "1", title: "Efficiency Drain",
                  desc: "You are spending too much on marketing for the volume you are getting. Check if your Marketing Power bar is significantly larger than your Market Share bar. If it is, you are wasting money.",
                  fix: "Reduce marketing spend until your Marketing Power ≈ Market Share."
                },
                {
                  n: "2", title: "Negative Elasticity Trap",
                  desc: "You are lowering prices in a month where demand is naturally low — giving away margins for no extra volume.",
                  fix: "Never cut prices during seasonal demand troughs. Watch the Intelligence Feed."
                },
                {
                  n: "3", title: "The Insolvency Penalty",
                  desc: "If you ever dipped below -₹30 Lakhs during the 20 months, the algorithm applies a Financial Risk multiplier that caps your final score at 75, regardless of your recovery.",
                  fix: "Never cross -₹30L. Treat this as a hard floor, not a guideline."
                },
              ].map((item) => (
                <div key={item.n} className="barrier-item">
                  <div className="number-badge">{item.n}</div>
                  <div>
                    <div style={{ fontSize: "15px", color: "#e8e0d0", fontWeight: "bold", marginBottom: "6px" }}>{item.title}</div>
                    <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.7, marginBottom: "10px" }}>{item.desc}</p>
                    <div style={{ background: "rgba(39,174,96,0.07)", borderLeft: "3px solid #27ae60", padding: "8px 12px", borderRadius: "0 3px 3px 0" }}>
                      <span style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "9px", color: "#27ae60", letterSpacing: "1px" }}>FIX: </span>
                      <span style={{ fontSize: "13px", color: "#aaa" }}>{item.fix}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* — GLOSSARY — */}
          {activeSection === "glossary" && (
            <div className="section-content">
              <p style={{ fontSize: "15px", lineHeight: 1.8, color: "#aaa", marginBottom: "24px" }}>
                Core terminology used throughout the simulation. Click any term to expand.
              </p>
              {glossaryTerms.map((item) => (
                <div
                  key={item.term}
                  className="glossary-item"
                  onClick={() => setExpandedGlossary(expandedGlossary === item.term ? null : item.term)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: "700", color: "#e8e0d0" }}>{item.term}</div>
                    <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "16px", color: "#8b0000", transition: "transform 0.2s", transform: expandedGlossary === item.term ? "rotate(45deg)" : "rotate(0deg)" }}>+</div>
                  </div>
                  {expandedGlossary === item.term && (
                    <div style={{ marginTop: "10px", fontSize: "14px", color: "#aaa", lineHeight: 1.7, paddingRight: "24px", animation: "fadeIn 0.2s ease" }}>
                      {item.def}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(0,0,0,0.3)",
      }}>
        <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", color: "#444", letterSpacing: "2px" }}>
          PRICE WAR-1: EXTREME EDITION · OFFICIAL PLAYERS MANUAL
        </div>
        <div style={{ fontFamily: "'Source Code Pro', monospace", fontSize: "10px", color: "#444", letterSpacing: "1px" }}>
          TAXILA BUSINESS SCHOOL · STRATEGIC ANALYTICS SIMULATION
        </div>
      </footer>
    </div>
  );
}