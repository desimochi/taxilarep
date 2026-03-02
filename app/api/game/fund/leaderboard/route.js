import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch all users
    const users = await db.collection("fund").find({}).toArray();

    const leaderboard = users.map((user) => {
      const gs = user.gameState || {};

      // -------------------------------
      // 1️⃣ CALCULATE TOTAL FUNDS
      // -------------------------------
      let holdingsValue = 0;

      if (gs.holdings) {
        for (const stockId in gs.holdings) {
          const qty = gs.holdings[stockId]?.quantity || 0;
          const stock = gs.stockData?.find((s) => s.id === stockId);
          const livePrice = stock?.currentPrice || 0;
          holdingsValue += qty * livePrice;
        }
      }

      const totalFunds = (gs.cash || 0) + holdingsValue;

      // -------------------------------
      // 2️⃣ TOTAL SCORE
      // -------------------------------
      const totalScore =
        Array.isArray(gs.stageResults)
          ? gs.stageResults.reduce((a, b) => a + (b.score || 0), 0)
          : gs.currentStageScore || 0;

      // direct score if stored
      const finalScore = gs.score || totalScore;

      // -------------------------------
      // 3️⃣ FIX — TOTAL FEES (WORKS FOR ALL USERS)
      // -------------------------------
      let totalFees = 0;

      // Case A: If stored directly
      if (typeof gs.fees === "number") totalFees += gs.fees;

      // Case B: If stored as totalFees
      if (typeof gs.totalFees === "number") totalFees += gs.totalFees;

      // Case C: If stored inside gameState.transactions[]
      if (Array.isArray(gs.transactions)) {
        totalFees += gs.transactions.reduce(
          (sum, t) => sum + (t.fee || 0),
          0
        );
      }

      // Case D: Some DB store fees at root of the fund document
      if (typeof user.fees === "number") totalFees += user.fees;

      // Case E: Some DB store transactions[] at root level
      if (Array.isArray(user.transactions)) {
        totalFees += user.transactions.reduce(
          (sum, t) => sum + (t.fee || 0),
          0
        );
      }

      return {
        userId: user.userId || "Unknown",
        name: gs.playerName || "Player",
        totalFunds: Number(totalFunds.toFixed(2)),
        totalScore: finalScore,
        score: user.gameState.score,
        fees: totalFees,
        lastPlayed: user.updatedAt || user.createdAt || null,
      };
    });

    // -------------------------------
    // 4️⃣ SORTING
    // -------------------------------
    leaderboard.sort((a, b) => {
      if (b.totalFunds !== a.totalFunds) return b.totalFunds - a.totalFunds;
      return b.totalScore - a.totalScore;
    });

    // -------------------------------
    // 5️⃣ RANKING
    // -------------------------------
    const final = leaderboard.map((u, i) => ({
      rank: i + 1,
      ...u,
    }));

    return NextResponse.json({
      status: "success",
      leaderboard: final,
    });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
