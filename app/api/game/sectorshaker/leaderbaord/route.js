// /app/api/game/sectorshaker/leaderboard/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const leaderboard = await db.collection("sectorShaker").aggregate([
      {
        $project: {
          userId: 1,
          name:1,
          updatedAt:1,
          playerCompany: "$gameState.playerCompany",
          turnoverNum: "$gameState.playerCompany.baseTurnover", // safe numeric field
          cagrNum: { $toDouble: "$gameState.playerCompany.cagr" },
          // strip "%" and convert share safely
          shareNum: {
            $convert: {
              input: {
                $replaceAll: {
                  input: { $toString: "$gameState.playerCompany.share" },
                  find: "%",
                  replacement: ""
                }
              },
              to: "double",
              onError: 0,
              onNull: 0
            }
          }
        }
      },
      {
        $addFields: {
          score: {
            $add: [
              { $divide: ["$turnoverNum", 1000] }, // scale turnover
              { $multiply: ["$cagrNum", 5] },      // CAGR weight
              { $multiply: ["$shareNum", 2] }      // Market share weight
            ]
          }
        }
      },
      { $sort: { score: -1 } },
      {
        $project: {
          _id: 0,
          userId: 1,
          name:1,
          updatedAt:1,
          comname: "$playerCompany.name",
          turnover: "$turnoverNum",
          cagr: "$cagrNum",
          share: "$shareNum",
          score: 1
        }
      }
    ]).toArray();

    return NextResponse.json({ leaderboard });
  } catch (err) {
    console.error("❌ Leaderboard API error:", err);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
