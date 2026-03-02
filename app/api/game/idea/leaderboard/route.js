// app/api/leaderboard/route.js
import clientPromise from "@/lib/mongodb"; // your clientPromise file

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // replace with your DB name
    const collection = db.collection("ideaGen"); // replace with collection name

    // Aggregate leaderboard
    const leaderboard = await collection.aggregate([
      {
        $project: {
          userId: 1,
          name: 1,
          updatedAt: 1,
          score: {
            $sum: "$gameState.observerData.nodes.influence", // sum of all node influences
          },
          generatedCount: {
            $size: {
              $filter: {
                input: "$gameState.observerData.nodes",
                as: "node",
                cond: { $eq: ["$$node.type", "generated"] },
              },
            },
          },
        },
      },
      { $sort: { score: -1, updatedAt: -1 } }, // sort by score, then latest activity
      { $limit: 20 }, // top 20 users
    ]).toArray();

    return new Response(JSON.stringify(leaderboard), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Leaderboard API error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch leaderboard" }), {
      status: 500,
    });
  }
}
