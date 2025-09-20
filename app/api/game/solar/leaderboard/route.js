import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change to your DB name
    const collection = db.collection("solar"); // change to collection name

    const leaderboard = await collection.aggregate([
      {
        $project: {
          userId: 1,
          name: 1,
          totalMass: { $sum: "$gameState.particles.mass" },
          updatedAt:1
        },
      },
      { $sort: { totalMass: -1 } }, // sort descending
      { $limit: 10 }, // top 10
    ]).toArray();

    return Response.json(leaderboard);
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch leaderboard" }), {
      status: 500,
    });
  }
}
