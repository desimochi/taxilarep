import clientPromise from "@/lib/mongodb";


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const leaderboard = await db
      .collection("samudra")
      .find({})
      .sort({ "gameState.score": -1 })
      .limit(10)
      .project({
        "gameState.playerName": 1,
        "gameState.score": 1,
        "gameState.turn": 1,
        "gameState.budget": 1,
        updatedAt:1,
      })
      .toArray();

    return new Response(JSON.stringify({ success: true, leaderboard }), {
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
