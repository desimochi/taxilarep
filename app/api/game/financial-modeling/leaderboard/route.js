// app/api/leaderboard/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("fmmodeling"); // change if needed

    const leaderboard = await collection.aggregate([
      {
        $project: {
          userId: 1,
          playerName: "$gameState.playerName",
          status: "$gameState.status",
          bankrupt: "$gameState.bankrupt",
          breaches: "$gameState.breaches",
          updatedAt: 1,

          // Latest year played
          year: {
            $max: "$gameState.history.year",
          },

          // Total EBITDA generated (proxy for performance)
          totalEbitda: {
            $sum: "$gameState.history.ebitda",
          },

          // Latest snapshot values
          cash: { $last: "$gameState.history.cash" },
          seniorDebt: { $last: "$gameState.history.seniorDebt" },
          mezzDebt: { $last: "$gameState.history.mezzDebt" },
        },
      },

      {
        $addFields: {
          totalDebt: { $add: ["$seniorDebt", "$mezzDebt"] },

          // Simple score formula
          score: {
            $cond: [
              "$bankrupt",
              0,
              {
                $subtract: [
                  "$totalEbitda",
                  { $multiply: ["$breaches", 100] },
                ],
              },
            ],
          },
        },
      },

      {
        $sort: {
          bankrupt: 1,     // non-bankrupt first
          score: -1,       // higher score better
          breaches: 1,     // fewer breaches better
          updatedAt: -1,   // recent activity
        },
      },

      { $limit: 50 },
    ]).toArray();

    return NextResponse.json({
      success: true,
      count: leaderboard.length,
      leaderboard,
    });
  } catch (error) {
    console.error("Leaderboard Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to load leaderboard" },
      { status: 500 }
    );
  }
}
