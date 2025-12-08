import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("consumer");

    // Fetch all users
    const users = await collection
      .find({}, { projection: { userId: 1, gameState: 1 } })
      .toArray();

    const leaderboard = users.map((user) => {
      const gs = user.gameState || {};
      const player = gs.player || {};

      const sales = player.sales || 0;
      const quality = player.productQuality || 0;
      const awareness = player.brandAwareness || 0;
      const cumulativeSales = player.cumulativeSales || 0;

      // ⭐ SCORE CALCULATION
      const score =
        sales * 2 +
        quality * 3 +
        awareness * 1.5 +
        cumulativeSales * 1;

      return {
        userId: user.userId,
        name: player.name || "Unknown",
        sales,
        quality,
        awareness,
        cumulativeSales,
        quarter: gs.quarter || 0,
        score: Math.round(score), // rounded score
      };
    });

    // Sort by score instead of cumulativeSales
    leaderboard.sort((a, b) => b.score - a.score);

    // Add ranking
    const ranked = leaderboard.map((user, index) => ({
      rank: index + 1,
      ...user,
    }));

    return NextResponse.json({
      success: true,
      count: ranked.length,
      leaderboard: ranked,
    });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
}
