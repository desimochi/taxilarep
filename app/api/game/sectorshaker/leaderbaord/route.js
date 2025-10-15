// /app/api/game/sectorshaker/leaderboard/route.js
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

// --------------------------------------------------------
// 1. Define the FIXED, THEORETICAL MAXIMUM SCORE
// This is the max score achievable in the game, used for normalization.
// Calculation: (Max Turnover / 1000) + (Max CAGR * 5) + (Max Share * 2)
// Example: (500000 / 1000) + (50 * 5) + (100 * 2) = 950. Adjust this as needed.
// --------------------------------------------------------
const FIXED_MAX_SCORE = 950; 

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // 1️⃣ Fetch players and calculate raw score with optimized projection
    let leaderboard = await db.collection("sectorShaker").aggregate([
      {
        $project: {
          // --- FIELDS REQUIRED FOR FINAL OUTPUT & CALCULATION ---
          userId: 1,
          name: 1,
          updatedAt: 1,
          
          // Rename player company name to 'comname' for final output
          comname: "$gameState.playerCompany.name", 
          
          // Fields needed for raw score calculation (and final output)
          turnoverNum: "$gameState.playerCompany.baseTurnover",
          cagrNum: { $toDouble: "$gameState.playerCompany.cagr" },
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
        // 2️⃣ Calculate the raw score (now named 'score')
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
      { $sort: { score: -1 } }
    ]).toArray();

    // 3️⃣ Use the fixed maximum score for consistent normalization
    const maxScore = FIXED_MAX_SCORE; 

    // 4️⃣ Map to the final, required structure and calculate the normalized score
    leaderboard = leaderboard.map(player => {
      // Calculate the normalized score
      let normalizedScore = Math.round((player.score / maxScore) * 100);
      
      // Ensure the normalized score is never greater than 100
      const scoreOutOf100 = Math.min(100, normalizedScore);

      return {
        userId: player.userId,
        name: player.name,
        updatedAt: player.updatedAt,
        comname: player.comname, // Renamed in the $project stage
        turnover: player.turnoverNum,
        cagr: player.cagrNum,
        share: player.shareNum,
        scoreOutOf100: scoreOutOf100
      };
    });

    return NextResponse.json({ leaderboard });
  } catch (err) {
    console.error("❌ Leaderboard API error:", err);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}