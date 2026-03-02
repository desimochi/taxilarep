import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db();
    const collection = db.collection("lastcity");

    const leaderboard = await collection.aggregate([
      {
        $addFields: {
          resourceScore: {
            $divide: [
              {
                $add: [
                  "$gameState.resources.coal",
                  "$gameState.resources.wood",
                  "$gameState.resources.steel",
                  "$gameState.resources.rations"
                ]
              },
              "$gameState.population.total"
            ]
          },
          healthScore: {
            $multiply: [
              {
                $divide: [
                  {
                    $subtract: [
                      "$gameState.population.total",
                      "$gameState.population.sick"
                    ]
                  },
                  "$gameState.population.total"
                ]
              },
              100
            ]
          },
          moraleScore: {
            $subtract: ["$gameState.hope", "$gameState.discontent"]
          },
          assignmentScore: {
            $multiply: [
              {
                $divide: [
                  {
                    $add: [
                      "$gameState.assignments.coal",
                      "$gameState.assignments.wood",
                      "$gameState.assignments.steel",
                      "$gameState.assignments.hunters"
                    ]
                  },
                  "$gameState.population.workers"
                ]
              },
              100
            ]
          },
          generatorScore: {
            $cond: ["$gameState.generatorOn", 20, -20]
          }
        }
      },
      {
        $addFields: {
          criticalThinkingScore: {
            $add: [
              "$resourceScore",
              { $multiply: ["$healthScore", 0.5] },
              { $multiply: ["$moraleScore", 2] },
              "$assignmentScore",
              "$generatorScore"
            ]
          }
        }
      },
      {
        $project: {
          userId: 1,
          name: 1,
          criticalThinkingScore: { $round: ["$criticalThinkingScore", 2] },
          day: "$gameState.day",
          population: "$gameState.population.total",
          hope: "$gameState.hope",
          discontent: "$gameState.discontent",
          updatedAt: 1
        }
      },
      { $sort: { criticalThinkingScore: -1 } }
    ]).toArray();

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Leaderboard API error:", error);
    return NextResponse.json({ error: "Failed to load leaderboard" }, { status: 500 });
  }
}
