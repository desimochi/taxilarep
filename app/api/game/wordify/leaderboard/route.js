// /app/api/leaderboard/route.ts
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch leaderboard data
    const leaderboard = await db.collection("wordify")
      .find({}, {
        projection: {
          name: 1,
          score: 1,
          totalTimePlayed: 1,
          totalAttempts: 1,
          wordsGuessedCorrectly: 1,
          updatedAt: 1
        }
      })
      .sort({ score: -1, totalTimePlayed: 1 }) // higher score, then less time
      .limit(50) // top 50
      .toArray();

    return NextResponse.json({ success: true, leaderboard });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ success: false, error: "Failed to load leaderboard" }, { status: 500 });
  }
}
