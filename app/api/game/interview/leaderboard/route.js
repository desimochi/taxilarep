import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(); // change DB name
    const users = await db.collection("interview").find().toArray();

    const leaderboard = users
      .map((user) => {
        if (!user.sessions || user.sessions.length === 0) return null;

        // get highest score + last attempt
        let highestScore = -Infinity;
        let lastAttempt = null;

        user.sessions.forEach((session) => {
          if (session.overallScore > highestScore) {
            highestScore = session.overallScore;
          }
          if (!lastAttempt || new Date(session.date) > new Date(lastAttempt)) {
            lastAttempt = session.date;
          }
        });

        return {
          userId: user.userId,
          playerName: user.sessions[0].playerName, // assuming consistent name
          highestScore,
          lastAttempt,
          sessionCount: user.sessions.length,
        };
      })
      .filter(Boolean);

    // Sort by highest score (desc), then latest attempt
    leaderboard.sort((a, b) => {
      if (b.highestScore !== a.highestScore) {
        return b.highestScore - a.highestScore;
      }
      return new Date(b.lastAttempt) - new Date(a.lastAttempt);
    });

    // Add rank numbers
    const rankedLeaderboard = leaderboard.map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }));

    return NextResponse.json({ leaderboard: rankedLeaderboard }, { status: 200 });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
