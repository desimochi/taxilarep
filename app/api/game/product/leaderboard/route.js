import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // default DB from connection string
    const users = await db.collection("product").find({}).toArray();

    // Calculate leaderboard
    const leaderboard = users
      .map((u) => ({
        name: u.name || u.gameState?.playerName || "Unknown",
        finalScore: u.gameState?.finalScore || 0,
        totalProfit: u.gameState?.totalProfit || 0,
        marketShare: u.gameState?.marketShare || 0,
        brandAwareness: u.gameState?.brandAwareness || 0,
        updatedAt: u.updatedAt,
      }))
      .sort((a, b) => b.finalScore - a.finalScore)
      .map((u, index) => ({
        rank: index + 1,
        ...u,
      }));

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
