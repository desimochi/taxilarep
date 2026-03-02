import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db();
    const collection = db.collection("project");

    const leaderboard = await collection.aggregate([
      {
        $addFields: {
          totalTasks: { $size: "$gameState.gameState.tasks" },
          completedTasks: {
            $size: {
              $filter: {
                input: "$gameState.gameState.tasks",
                cond: { $eq: ["$$this.completed", true] }
              }
            }
          },
          totalDependencies: {
            $sum: {
              $map: {
                input: "$gameState.gameState.tasks",
                as: "t",
                in: { $size: "$$t.dependencies" }
              }
            }
          }
        }
      },
      {
        $addFields: {
          resolvedDependencies: 0, // placeholder unless you track completed deps
          budgetScore: { $divide: ["$gameState.gameState.budget", 100000] },
          taskCompletionScore: {
            $cond: [
              { $eq: ["$totalTasks", 0] },
              0,
              { $multiply: [{ $divide: ["$completedTasks", "$totalTasks"] }, 100] }
            ]
          },
          dependencyScore: {
            $cond: [
              { $eq: ["$totalDependencies", 0] },
              0,
              { $multiply: [{ $divide: [0, "$totalDependencies"] }, 100] } // change 0 to actual resolved count
            ]
          },
          qualityScore: {
            $subtract: ["$gameState.gameState.quality", { $multiply: ["$gameState.gameState.bugs", 5] }]
          },
          overtimePenalty: {
            $cond: ["$gameState.gameState.overtimeActive", -20, 0]
          }
        }
      },
      {
        $addFields: {
          criticalThinkingScore: {
            $add: [
              { $multiply: ["$budgetScore", 0.2] },
              { $multiply: ["$taskCompletionScore", 0.3] },
              { $multiply: ["$dependencyScore", 0.3] },
              { $multiply: ["$qualityScore", 0.2] },
              "$overtimePenalty"
            ]
          }
        }
      },
      {
        $project: {
          name: 1,
          userId: 1,
          criticalThinkingScore: { $round: ["$criticalThinkingScore", 2] },
          budget: "$gameState.gameState.budget",
          totalTasks: 1,
          completedTasks: 1,
          quality: "$gameState.gameState.quality",
          bugs: "$gameState.gameState.bugs",
          updatedAt: 1
        }
      },
      { $sort: { criticalThinkingScore: -1 } }
    ]).toArray();

    return NextResponse.json({ leaderboard });
  } catch (err) {
    console.error("Leaderboard API error:", err);
    return NextResponse.json({ error: "Failed to load leaderboard" }, { status: 500 });
  }
}
