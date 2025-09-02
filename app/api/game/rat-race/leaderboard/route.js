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
          { $toDouble: { $ifNull: ["$player.liabilities.mortgage.principal", 0] } },
          { $toDouble: { $ifNull: ["$player.liabilities.carLoan.principal", 0] } },
          { $toDouble: { $ifNull: ["$player.liabilities.creditCard.principal", 0] } },
          { $toDouble: { $ifNull: ["$player.liabilities.studentLoan.principal", 0] } },
          { $toDouble: { $ifNull: ["$player.liabilities.bankLoan.principal", 0] } }
        ]
      },
      totalAssets: {
        $sum: {
          $map: {
            input: { $ifNull: ["$player.assets", []] },
            as: "a",
            in: { $toDouble: { $ifNull: ["$$a.cost", 0] } }
          }
        }
      }
    }
  },
  {
    $addFields: {
      netWorth: { 
        $subtract: [
          { $add: [{ $toDouble: { $ifNull: ["$player.cash", 0] } }, "$totalAssets"] },
          "$totalLiabilities"
        ]
      }
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
  { $limit: 1000 }
]).toArray();


    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
