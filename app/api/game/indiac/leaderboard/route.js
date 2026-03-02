import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // your DB name

    // Fetch game documents
    const users = await db
      .collection("indiaC") // <-- your collection name
      .find({})
      .toArray();

    const leaderboard = users.map((doc) => {
      const gs = doc.gameState || {};

      return {
        userId: doc.userId,
        playerName: gs.playerName || "Unknown",
        gameId: gs.gameId,
        product: gs.currentProductId || "N/A",

        totalNetProfit: gs.totalNetProfit ?? 0,
        totalGrossSales: gs.totalGrossSales ?? 0,
        cumulativeScore: gs.cumulativeScore ?? 0,
        productsSold: gs.productsSold ?? 0,

        updatedAt: doc.updatedAt,
      };
    });

    // Sorting: cumulativeScore > netProfit > productsSold
    leaderboard.sort(
      (a, b) =>
        b.cumulativeScore - a.cumulativeScore ||
        b.totalNetProfit - a.totalNetProfit ||
        b.productsSold - a.productsSold
    );

    return NextResponse.json({
      success: true,
      count: leaderboard.length,
      leaderboard,
    });

  } catch (err) {
    console.error("Leaderboard Error:", err);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
