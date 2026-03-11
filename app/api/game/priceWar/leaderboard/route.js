import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const leaderboard = await db
      .collection("priceWar")
      .aggregate([
        {
          $project: {
            userId: 1,
            executiveName: "$gameState.executiveName",
            score: "$gameState.lastCalculatedTotalScore",
            profit: "$gameState.cumulativeProfit",
            month: "$gameState.month",
          },
        },
        {
          $sort: { score: -1 }
        }
      ])
      .toArray();

    const ranked = leaderboard.map((player, index) => ({
      rank: index + 1,
      ...player
    }));

    return NextResponse.json({
      success: true,
      leaderboard: ranked
    });

  } catch (error) {
    console.error("Leaderboard Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}