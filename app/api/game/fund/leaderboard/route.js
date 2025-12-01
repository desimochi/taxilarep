import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change if needed

    // Fetch all game states
    const users = await db.collection("fund").find({}).toArray();

    // Format leaderboard
    const leaderboard = users.map((user) => {
      const gs = user.gameState || {};

      // 🧮 Total Funds = Cash + value of holdings
      let holdingsValue = 0;

      if (gs.holdings) {
        for (const stockId in gs.holdings) {
          const qty = gs.holdings[stockId]?.quantity || 0;

          // Find the stock price inside stockData
          const stock = gs.stockData?.find((s) => s.id === stockId);
          const livePrice = stock?.currentPrice || 0;

          holdingsValue += qty * livePrice;
        }
      }

      const totalFunds = (gs.cash || 0) + holdingsValue;

      // 🧮 Total Score
      const totalScore =
        Array.isArray(gs.stageResults)
          ? gs.stageResults.reduce((a, b) => a + (b.score || 0), 0)
          : gs.currentStageScore || 0;

      // 🧮 Fees Paid
      const totalFees =
        Array.isArray(gs.transactions)
          ? gs.transactions.reduce((a, b) => a + (b.fee || 0), 0)
          : 0;

      return {
        userId: user.userId || "Unknown",
        name: gs.playerName || "Player",
        totalFunds: Number(totalFunds.toFixed(2)),
        totalScore,
        fees: totalFees,
        lastPlayed: user.updatedAt || user.createdAt || null
      };
    });

    // Sort by highest funds → highest score
    leaderboard.sort((a, b) => {
      if (b.totalFunds !== a.totalFunds) return b.totalFunds - a.totalFunds;
      return b.totalScore - a.totalScore;
    });

    // Add Ranking
    const final = leaderboard.map((u, i) => ({
      rank: i + 1,
      ...u
    }));

    return NextResponse.json({
      status: "success",
      leaderboard: final
    });
  } catch (e) {
    return NextResponse.json(
      { error: e.message },
      { status: 500 }
    );
  }
}
