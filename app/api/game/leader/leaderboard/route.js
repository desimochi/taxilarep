import clientPromise from "@/lib/mongodb";

// Dynamic calculation based on the 4 game pillars if missing from DB
function calculateLeadershipScore(player = {}) {
  if (!player || Object.keys(player).length === 0) return 0;

  // 1. Financial Health (Valuation & Profit)
  const valuationScore = Math.min(100, (player.valuation || 0) / 10);
  const profitScore = Math.min(100, Math.max(0, (player.profit || 0) * 5));
  const financialHealth = (valuationScore + profitScore) / 2;

  // 2. Market Position (Market Share & Brand Reputation)
  const marketShareScore = Math.min(100, (player.marketShare || 0) * 2);
  const brandReputation = player.brandReputation || 0;
  const marketPosition = (marketShareScore + brandReputation) / 2;

  // 3. Operational Excellence (Quality & Supply Chain)
  const quality = player.quality || 0;
  const supplyChain = player.supplyChainStability || 0;
  const operationalExcellence = (quality + supplyChain) / 2;

  // 4. Human Capital (Morale & Skill Level)
  const morale = player.morale || 0;
  const skillLevel = player.skillLevel || 0;
  const humanCapital = (morale + skillLevel) / 2;

  // Final Composite Score (0 - 100 range)
  const score = (financialHealth + marketPosition + operationalExcellence + humanCapital) / 4;
  return Number(score.toFixed(2));
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const users = await db
      .collection("leaderChallenge")
      .find({})
      .toArray();

    const leaderboard = users.map(user => {
      const player = user.gameState?.player || {};

      // Check stored values first; fallback to dynamic calculation
      const score = 
        user.leadershipScore ?? 
        player.leadershipScore ?? 
        calculateLeadershipScore(player);

      return {
        userId: user.userId,
        name: user.name,
        ceo: player.ceo || user.gameState?.ceoName || "CEO",
        leadershipScore: Number(score) || 0,
        valuation: player.valuation || 0,
        profit: player.profit || 0,
        marketShare: player.marketShare || 0,
        quality: player.quality || 0,
        brandReputation: player.brandReputation || 0,
        updatedAt: user.updatedAt 
      };
    });

    // Primary sort: Leadership Score; Secondary sort: Valuation
    leaderboard.sort((a, b) => b.leadershipScore - a.leadershipScore || b.valuation - a.valuation);

    return Response.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return Response.json(
      { success: false, message: "Failed to load leaderboard" },
      { status: 500 }
    );
  }
}