import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change db name if needed

    const users = await db
      .collection("airthniti")
      .find({})
      .project({
        name: 1,
        updatedAt: 1,
        "gameState.gameState.gdp": 1,
        "gameState.gameState.publicApproval": 1,
        "gameState.gameState.sensex": 1,
        "gameState.gameState.year": 1,
        "gameState.gameState.quarter": 1,
      })
      .toArray();

    // leaderboard sorted by GDP
    const leaderboard = users
      .map((u) => ({
        id: u._id.toString(),
        name: u.name,
        gdp: u?.gameState?.gameState?.gdp || 0,
        approval: u?.gameState?.gameState?.publicApproval || 0,
        sensex: u?.gameState?.gameState?.sensex || 0,
        year: u?.gameState?.gameState?.year || 0,
        quarter: u?.gameState?.gameState?.quarter || 0,
        updatedAt: u?.updatedAt ? new Date(u.updatedAt).toISOString() : null,
      }))
      .sort((a, b) => b.gdp - a.gdp);

    return Response.json({ success: true, leaderboard });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return Response.json(
      { success: false, error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
