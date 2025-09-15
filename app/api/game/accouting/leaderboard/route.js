import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // sort by deeply nested score
    const leaderboard = await db
      .collection("accoutingCycle")
      .find({})
      .sort({ "gameState.gameState.score": -1 }) // nested score
      .limit(10)
      .project({
        "gameState.gameState.playerName": 1,
        "gameState.gameState.score": 1,
        "gameState.gameState.currentStage": 1,
      })
      .toArray();

    // Format response
    const formatted = leaderboard.map((user) => ({
      name: user.gameState?.gameState?.playerName || "Unknown",
      score: user.gameState?.gameState?.score ?? 0,
      stage: user.gameState?.gameState?.currentStage ?? null,
      id: user._id.toString(),
    }));

    return new Response(JSON.stringify({ success: true, leaderboard: formatted }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
