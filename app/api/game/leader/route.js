import clientPromise from "@/lib/mongodb";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // allow all origins
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

// Dynamic calculation based on the 4 game pillars if missing from gameState
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

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("leaderChallenge");
    const game = await collection.findOne({ userId });

    return new Response(JSON.stringify(game || {}), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("❌ Error loading game:", error);
    return new Response(JSON.stringify({ error: "Failed to load game" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}

export async function POST(req) {
  try {
    const { userId, name, gameState } = await req.json();
    if (!userId || !gameState) {
      return new Response(JSON.stringify({ error: "Missing userId or gameState" }), {
        status: 400,
        headers: corsHeaders(),
      });
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("leaderChallenge");

    const player = gameState?.player || {};

    // Determine Leadership Score from gameState or compute dynamically
    const leadershipScore =
      gameState?.leadershipScore ??
      player?.leadershipScore ??
      calculateLeadershipScore(player);

    await collection.updateOne(
      { userId },
      {
        $set: {
          gameState,
          userId,
          name,
          leadershipScore, // <-- Saves leadershipScore at the document root level
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return new Response(
      JSON.stringify({ success: true, leadershipScore }),
      {
        status: 200,
        headers: corsHeaders(),
      }
    );
  } catch (error) {
    console.error("❌ Error saving game:", error);
    return new Response(JSON.stringify({ error: "Failed to save game" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}