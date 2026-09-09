// app/api/leaderboard/route.js
import clientPromise from "@/lib/mongodb"; // your existing client promise

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // replace with your db name

    // Fetch all users
    const users = await db
      .collection("leaderChallenge") // replace with your collection name
      .find({})
      .toArray();

    // Build leaderboard data
    const leaderboard = users.map(user => {
      const player = user.gameState?.player || {};
      return {
        userId: user.userId,
        name: user.name,
        ceo: player.ceo || user.gameState?.ceoName || "CEO",
        leadershipScore: user.leadershipScore || 0,
        valuation: player.valuation || 0,
        profit: player.profit || 0,
        marketShare: player.marketShare || 0,
        quality: player.quality || 0,
        brandReputation: player.brandReputation || 0,
        updatedAt: user.updatedAt 
      };
    });

    // Sort leaderboard by Leadership Score, the simulation's actual success metric
    leaderboard.sort((a, b) => b.leadershipScore - a.leadershipScore);

    return Response.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return Response.json(
      { success: false, message: "Failed to load leaderboard" },
      { status: 500 }
    );
  }
}
