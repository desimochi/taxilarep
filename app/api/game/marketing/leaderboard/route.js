import clientPromise from "@/lib/mongodb";
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change to your DB name
    const collection = db.collection("marketing"); // change to your collection name

    // Fetch all players
    const players = await collection
      .find({}, { projection: { playerName: 1, companyName: 1, gameState: 1, updatedAt: 1 } })
      .toArray();

    // Transform data
    const leaderboard = players.map((p) => {
      const history = p.gameState?.history || {};
      const scoreArr = history.balancedScorecard || [];
      const profitArr = history.netProfit || [];
      const shareArr = history.marketShare || [];

      return {
        playerName: p.playerName,
        companyName: p.companyName,
        latestBalancedScorecard: scoreArr[scoreArr.length - 1] ?? 0,
        latestNetProfit: profitArr[profitArr.length - 1] ?? 0,
        latestMarketShare: shareArr[shareArr.length - 1] ?? 0,
        updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : null
      };
    });

    // Sort leaderboard by Balanced Scorecard (highest first)
    leaderboard.sort(
      (a, b) => b.latestBalancedScorecard - a.latestBalancedScorecard
    );

    return new Response(
      JSON.stringify({ success: true, leaderboard }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch leaderboard" }),
      { status: 500 }
    );
  }
}
