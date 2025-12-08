import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ---------------- SCORE FUNCTION ----------------
function calculateScore(gameState) {
  const player = gameState.player || {};
  const segments = gameState.consumerSegments || [];

  // ---------- 1️⃣ MARKET SHARE SCORE (40 points) ----------
  let totalShare = 0;
  segments.forEach((seg) => {
    const playerShare = seg.shares?.player ?? 0;
    totalShare += seg.size * playerShare;
  });

  const marketShareScore = Math.min(40, totalShare * 40);

  // ---------- 2️⃣ PRODUCT SCORE (30 points) ----------
  const pq = player.productQuality || 0;
  const ba = player.brandAwareness || 0;
  const tech = player.technologyLevel || 0;

  const weightedProduct =
    pq * 0.5 +     // Quality is most important
    ba * 0.3 +     // Brand Awareness
    tech * 0.2;    // Technology

  const productScore = (weightedProduct / 100) * 30;

  // ---------- 3️⃣ FINANCIAL SCORE (20 points) ----------
  const cumulative = player.cumulativeSales || 0;

  // You can later update this max value dynamically
  const MAX_CUMULATIVE_SALES = 650000000;

  const financialScore =
    Math.min(20, (cumulative / MAX_CUMULATIVE_SALES) * 20);

  // ---------- 4️⃣ PENALTIES (–10 max) ----------
  let penalties = 0;

  if (player.zeroSalesQuarters >= 1) penalties += 5;

  // Price risk penalty
  if (player.price > 65000 || player.price < 50000) penalties += 5;

  // ---------- FINAL SCORE OUT OF 100 ----------
  const finalScore = Math.max(
    0,
    Math.min(100, Math.round(marketShareScore + productScore + financialScore - penalties))
  );

  return finalScore;
}

// -------------------------------------------------------------
// ---------------------- MAIN API HANDLER ----------------------
// -------------------------------------------------------------
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("consumer");

    // Get users
    const users = await collection
      .find({}, { projection: { userId: 1, gameState: 1 } })
      .toArray();

    // Build leaderboard
    const leaderboard = users.map((user) => {
      const gs = user.gameState || {};
      const player = gs.player || {};

      const score = calculateScore(gs);

      return {
        userId: user.userId,
        name: player.name || "Unknown",
        quarter: gs.quarter || 0,
        sales: player.sales || 0,
        cumulativeSales: player.cumulativeSales || 0,
        productQuality: player.productQuality || 0,
        brandAwareness: player.brandAwareness || 0,
        technologyLevel: player.technologyLevel || 0,
        score, // ⭐ FINAL SCORE OUT OF 100
      };
    });

    // Sort descending by score
    leaderboard.sort((a, b) => b.score - a.score);

    // Add rank
    const ranked = leaderboard.map((u, i) => ({
      rank: i + 1,
      ...u,
    }));

    return NextResponse.json({
      success: true,
      count: ranked.length,
      leaderboard: ranked,
    });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
