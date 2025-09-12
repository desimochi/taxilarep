// app/api/game/eco/leaderboard/route.js
import clientPromise from "@/lib/mongodb"; // your MongoDB connection helper

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change to your DB name

    // Fetch only the required fields with projection
    const users = await db.collection("taxila-sim")
      .find(
        {},
        {
          projection: {
            userId: 1,
            name: 1,
            updatedAt: 1,
            "gameState.playerName": 1,
            "gameState.score": 1,
            "gameState.attempts": 1,
            "gameState.successes": 1,
            "gameState.currentRange": 1
          }
        }
      )
      .sort({ "gameState.score": -1, "gameState.successes": -1 }) // leaderboard sorting
      .toArray();

    // Format response
    const leaderboard = users.map((u) => ({
      userId: u.userId,
      name: u.name || u.gameState?.playerName,
      score: u.gameState?.score ?? 0,
      attempts: u.gameState?.attempts ?? 0,
      successes: u.gameState?.successes ?? 0,
      currentRange: u.gameState?.currentRange ?? null,
      updatedAt: u.updatedAt,
    }));

    return Response.json({ success: true, leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return Response.json({ success: false, error: "Failed to load leaderboard" }, { status: 500 });
  }
}
