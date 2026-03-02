// app/api/game/eco/leaderboard/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // replace with your DB name

    // Fetch leaderboard with projection
    const users = await db.collection("sariska")
      .find(
        {},
        {
          projection: {
            userId: 1,
            name: 1,
            updatedAt: 1,
            "gameState.playerName": 1,
            "gameState.score": 1,
            "gameState.timeRemaining": 1,
            "gameState.currentPhase": 1,
            "gameState.activeDatasetId": 1
            // 🚫 not fetching questions/journalData here
          }
        }
      )
      .sort({ "gameState.score": -1, "gameState.timeRemaining": -1 }) // rank by score, then time
      .toArray();

    // Format for frontend
    const leaderboard = users.map((u, i) => ({
      rank: i + 1,
      userId: u.userId,
      name: u.name || u.gameState?.playerName,
      score: u.gameState?.score ?? 0,
      timeRemaining: u.gameState?.timeRemaining ?? null,
      currentPhase: u.gameState?.currentPhase ?? null,
      dataset: u.gameState?.activeDatasetId ?? null,
      updatedAt: u.updatedAt,
    }));

    return Response.json({ success: true, leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return Response.json({ success: false, error: "Failed to load leaderboard" }, { status: 500 });
  }
}
