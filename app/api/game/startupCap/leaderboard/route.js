import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const players = await db
      .collection("startupCap")
      .aggregate([
        {
          $project: {
            _id: 0,
            userId: 1,
            playerName: "$gameState.playerName",
            startupName: "$gameState.startupName",
            exitValue: "$gameState.ds.exitVal",
            simulationComplete: "$gameState.simulationComplete",
            timeLeft: "$gameState.timeLeft"
          }
        },
        {
          $sort: {
            exitValue: -1
          }
        }
      ])
      .toArray();

    const leaderboard = players.map((player, index) => ({
      rank: index + 1,
      ...player
    }));

    return NextResponse.json({
      success: true,
      totalPlayers: leaderboard.length,
      leaderboard
    });

  } catch (error) {
    console.error("Leaderboard API error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}