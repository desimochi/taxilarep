import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
export async function GET() {
  try {
    const client =  await clientPromise
    const db = client.db();
    const collection = db.collection("consumer");

    // Fetch all users with their player stats
    const users = await collection
      .find({}, { projection: { userId: 1, gameState: 1 } })
      .toArray();

    // Create leaderboard data
    const leaderboard = users.map((user) => {
      const player = user.gameState?.player || {};
      return {
        userId: user.userId,
        name: player.name || "Unknown",
        sales: player.sales || 0,
        quality: player.productQuality || 0,
        awareness: player.brandAwareness || 0,
        quarter: user.gameState?.quarter || 0,
        cumulativeSales: player.cumulativeSales || 0,
      };
    });

    // Sort by cumulativeSales (or any metric you prefer)
    leaderboard.sort((a, b) => b.cumulativeSales - a.cumulativeSales);

    // Add rank
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
