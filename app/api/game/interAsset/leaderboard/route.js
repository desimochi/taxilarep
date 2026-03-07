import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db()

    const leaderboard = await db
      .collection("interAsset")
      .aggregate([
        {
          $project: {
            userId: 1,
            playerName: "$gameState.playerName",
            cash: "$gameState.account.cash",
            updatedAt: 1
          }
        },
        {
          $sort: { cash: -1 }
        },
        {
          $limit: 50
        }
      ])
      .toArray()

    return NextResponse.json({
      success: true,
      data: leaderboard
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json({
      success: false,
      message: "Failed to fetch leaderboard"
    })
  }
}