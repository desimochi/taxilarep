import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // 1️⃣ Fetch & sort leaderboard data
    const rows = await db
      .collection("nego2")
      .find(
        {},
        {
          projection: {
            userId: 1,
            "gameState.playerName": 1,
            "gameState.state.threat": 1,
            "gameState.state.time": 1,
            "gameState.state.trust": 1,
            "gameState.scenario.name": 1,
            "gameState.scenario.flight": 1,
            updatedAt: 1,
          },
        }
      )
      .sort({
        "gameState.state.threat": 1, // lower better
        "gameState.state.time": 1,   // faster better
        "gameState.state.trust": -1, // higher better
      })
      .limit(50)
      .toArray();

    // 2️⃣ Add rank manually
    const leaderboard = rows.map((doc, index) => ({
      rank: index + 1,
      userId: doc.userId,
      playerName: doc.gameState.playerName,
      threat: doc.gameState.state.threat,
      time: doc.gameState.state.time,
      trust: doc.gameState.state.trust,
      scenario: doc.gameState.scenario.name,
      flight: doc.gameState.scenario.flight,
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
