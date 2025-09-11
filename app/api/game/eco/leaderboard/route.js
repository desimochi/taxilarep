import clientPromise from "@/lib/mongodb"; // adjust path if different

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change DB name
    const collection = db.collection("eco"); // change collection name

    // Fetch and sort by ecosystemValue
    const leaderboard = await collection
      .aggregate([
        {
          $project: {
            name: 1,
            userId: 1,
            "gameState.playerName": 1,
            "gameState.turn": 1,
            "gameState.capital": 1,
            "gameState.revenue": 1,
            "gameState.users": 1,
            "gameState.ecosystemValue": 1,
          },
        },
        { $sort: { "gameState.ecosystemValue": -1 } },
      ])
      .toArray();

    // Add rank manually since MongoDB doesn’t auto-generate row numbers
    const leaderboardWithRank = leaderboard.map((player, index) => ({
      rank: index + 1,
      name: player.name,
      userId: player.userId,
      playerName: player.gameState.playerName,
      turn: player.gameState.turn,
      capital: player.gameState.capital,
      revenue: player.gameState.revenue,
      users: player.gameState.users,
      ecosystemValue: player.gameState.ecosystemValue,
    }));

    return Response.json({ success: true, leaderboard: leaderboardWithRank });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
