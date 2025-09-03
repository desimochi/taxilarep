// /app/api/leaderboard/route.ts
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("");

    // Fetch all users' game states
    const leaderboard = await db.collection("quest")
      .find({}, {
        projection: {
          name: 1,
          "gameState.companyValue": 1,
          "gameState.cash": 1,
          "gameState.year": 1,
          updatedAt: 1
        }
      })
      .sort({ 
        "gameState.companyValue": -1, // higher company value first
        "gameState.cash": -1,         // then higher cash
        "gameState.year": 1           // then fewer years
      })
      .limit(50) // top 50
      .toArray();

    // Add rank numbers
    const formattedLeaderboard = leaderboard.map((row, index) => ({
      rank: index + 1,
      name: row.name,
      companyValue: row.gameState.companyValue,
      cash: row.gameState.cash,
      year: row.gameState.year,
      updatedAt: row.updatedAt
    }));

    return NextResponse.json({ success: true, leaderboard: formattedLeaderboard });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ success: false, error: "Failed to load leaderboard" }, { status: 500 });
  }
}
