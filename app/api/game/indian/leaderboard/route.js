// app/api/leaderboard/route.ts
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // your mongo connection

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Fetch all users with gameState
    const users = await db.collection("indian").find({}).toArray();

    // Transform into leaderboard data
    const leaderboard = users.map((u) => {
      const company = u.gameState.companies.find((c) => c.isPlayer);

      const netProfit = company?.lastYear?.netProfit ?? 0;
      const marketShare = company?.marketShare ?? 0;
      const brandImage = company?.brandImage ?? 0;

      // Scoring formula (adjust weights as you like)
      const score = (marketShare * 50) + (brandImage * 0.3) + (netProfit / 1000);

      return {
        userId: u.userId,
        name: u.name,
        companyName: u.gameState.companyName,
        netProfit,
        marketShare,
        brandImage,
        score,
      };
    });

    // Sort by score (highest first)
    leaderboard.sort((a, b) => b.score - a.score);

    return NextResponse.json({ success: true, leaderboard });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
