import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change if DB name is different

    // Fetch all users' gameState data
    const leaderboard = await db
      .collection("diligence") // <-- your collection name
      .find({})
      .project({
        userId: 1,
        "gameState.playerName": 1,
        "gameState.currentStageScore": 1,
        "gameState.stageResults": 1,
        updatedAt: 1
      })
      .toArray();

    // Format & sort leaderboard
    const formatted = leaderboard
      .map((doc) => {
        // Total score calculation
        const totalScore = Array.isArray(doc.gameState?.stageResults)
          ? doc.gameState.stageResults.reduce((acc, x) => acc + (x.score || 0), 0)
          : doc.gameState?.currentStageScore || 0;

        return {
          userId: doc.userId,
          name: doc.gameState?.playerName || "Unknown",
          currentStageScore: doc.gameState?.currentStageScore || 0,
          totalScore,
          lastUpdated: doc.updatedAt,
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore); // high → low

    return NextResponse.json({
      success: true,
      count: formatted.length,
      leaderboard: formatted,
    });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
