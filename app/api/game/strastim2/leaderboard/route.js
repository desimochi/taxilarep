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

    const sortMap = {
      spi: "gameState.state.user.spi",
      profit: "gameState.state.user.cumulative.profit",
      revenue: "gameState.state.user.cumulative.rev",
      lastProfit: "gameState.state.user.lastProfit"
    };

    const sortField = sortMap[sortBy] || sortMap.spi;

    const client = await clientPromise;
    const db = client.db();

    const leaderboard = await db.collection("strastim2").aggregate([
      {
        $project: {
          _id: 0,
          userId: 1,
          username: "$gameState.state.un",
          firmName: "$gameState.state.fn",
          period: "$gameState.state.period",
          spi: "$gameState.state.user.spi",
          totalRevenue: "$gameState.state.user.cumulative.rev",
          totalProfit: "$gameState.state.user.cumulative.profit",
          lastProfit: "$gameState.state.user.lastProfit",
          marketEvent: "$gameState.state.activeEvent.title"
        }
      },
      { $sort: { [sortField]: order } },
      { $skip: skip },
      { $limit: limit }
    ]).toArray();

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
