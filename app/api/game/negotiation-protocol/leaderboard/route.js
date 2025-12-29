import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const leaderboard = await db
      .collection("negotiation-protocol")
      .aggregate([
        {
          $project: {
            _id: 0,
            userId: 1,
            playerName: "$gameState.state.playerName",
            score: "$gameState.state.score",
            timeLeft: "$gameState.timeLeft",
            updatedAt: 1,
          },
        },
        {
          $sort: {
            score: -1,        // highest score first
            timeLeft: -1,     // optional tie-breaker
            updatedAt: 1,
          },
        },
      ])
      .toArray();

    return NextResponse.json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
