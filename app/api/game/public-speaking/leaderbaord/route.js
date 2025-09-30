import clientPromise from "@/lib/mongodb"; // adjust path if needed

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change to your DB name

    const leaderboard = await db.collection("publicSpeaking").aggregate([
      { $unwind: "$sessions" },
      {
        $sort: {
          "sessions.score": -1,
          "sessions.duration": -1,
        },
      },
      {
        $group: {
          _id: "$userId",
          name: { $first: "$sessions.profile.name" },
          topic: { $first: "$sessions.profile.speechTopic" },
          duration: { $first: "$sessions.duration" },
          score: { $first: "$sessions.score" },
          date: { $first: "$sessions.timestamp" },
          language: { $first: "$sessions.profile.language" },
        },
      },
      { $sort: { score: -1, duration: -1 } }, // final sorting
    ]).toArray();

    return Response.json({ success: true, leaderboard });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
