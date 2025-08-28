import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const leaderboard = await db.collection("ratRace").aggregate([
      {
        $addFields: {
          totalLiabilities: {
            $add: [
              { $ifNull: ["$player.liabilities.mortgage", 0] },
              { $ifNull: ["$player.liabilities.carLoan", 0] },
              { $ifNull: ["$player.liabilities.creditCard", 0] },
              { $ifNull: ["$player.liabilities.studentLoan", 0] },
              { $ifNull: ["$player.liabilities.bankLoan", 0] }
            ]
          },
          totalAssets: {
            $sum: {
              $map: {
                input: { $ifNull: ["$player.assets", []] },
                as: "a",
                in: { $ifNull: ["$$a.value", 0] }
              }
            }
          }
        }
      },
      {
        $addFields: {
          netWorth: { $subtract: [{ $add: ["$player.cash", "$totalAssets"] }, "$totalLiabilities"] }
        }
      },
      {
        $project: {
          userId: 1,
          "player.name": 1,
          "player.professionName": 1,
          "player.cash": 1,
          "player.passiveIncome": 1,
          "player.cashFlow": 1,
          netWorth: 1,
          updatedAt: 1
        }
      },
      { $sort: { netWorth: -1 } },
      { $limit: 10 }
    ]).toArray();

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
