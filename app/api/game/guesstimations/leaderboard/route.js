import clientPromise from "@/lib/mongodb"; // your MongoDB connection helper

// GET /api/user-leaderboard
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change to your DB name

    const leaderboard = await db.collection("guesstimations").aggregate([
      {
        $project: {
          userId: 1,
          name: 1,
          human: {
            $first: {
              $filter: {
                input: "$players",
                as: "p",
                cond: { $eq: ["$$p.isAI", false] }
              }
            }
          }
        }
      },
      {
        $project: {
          userId: 1,
          name: 1,
          updatedAt:1,
          score: "$human.score"
        }
      },
      { $sort: { score: -1 } }
    ]).toArray();

    return new Response(JSON.stringify(leaderboard), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching user leaderboard:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
