import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const rows = await db
      .collection("mircroEco") // corrected name
      .find(
        {},
        {
          projection: {
            userId: 1,
            "gameState.playerName": 1,
            "gameState.balance": 1,
            "gameState.day": 1,
            "gameState.lifetimeUnitsSold": 1,
            "gameState.playerMaxCapacity": 1,
            updatedAt: 1,
          },
        }
      )
      .sort({
        "gameState.balance": -1,
        "gameState.lifetimeUnitsSold": -1,
      })
      .limit(50)
      .toArray();

    const leaderboard = rows.map((doc, index) => ({
      rank: index + 1,
      userId: doc.userId,
      playerName: doc.gameState?.playerName || "Unknown Analyst",
      balance: doc.gameState?.balance || 0,
      day: doc.gameState?.day || 1,
      unitsSold: doc.gameState?.lifetimeUnitsSold || 0,
      capacity: doc.gameState?.playerMaxCapacity || 100,
      updatedAt: doc.updatedAt,
    }));

    return NextResponse.json({
      success: true,
      count: leaderboard.length,
      data: leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load leaderboard" },
      { status: 500 }
    );
  }
}