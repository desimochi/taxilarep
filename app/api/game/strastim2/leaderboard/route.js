import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const sortBy = searchParams.get("sortBy") || "spi";
    const order = searchParams.get("order") === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db();

    const leaderboard = await db
      .collection("strastim2")
      .aggregate([
        {
          $project: {
            _id: 0,
            userId: 1,
            username: "$gameState.un",
            firmName: "$gameState.fn",
            period: "$gameState.period",

            spi: "$gameState.user.spi",
            totalRevenue: "$gameState.user.cumulative.rev",
            totalProfit: "$gameState.user.cumulative.profit",
            lastProfit: "$gameState.user.lastProfit",

            marketEvent: "$gameState.activeEvent.title"
          }
        },
        { $sort: { [sortBy]: order } },
        { $skip: skip },
        { $limit: limit }
      ])
      .toArray();

    return NextResponse.json({
      success: true,
      page,
      limit,
      count: leaderboard.length,
      data: leaderboard
    });
  } catch (error) {
    console.error("Leaderboard API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to load leaderboard" },
      { status: 500 }
    );
  }
}
