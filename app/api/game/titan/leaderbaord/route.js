import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("titan");

    // fetch top 10 users sorted by stockPrice (descending)
    const leaderboard = await collection
      .find({}, { projection: { userId: 1, name: 1, stockPrice: 1, tsr: 1, valuationMultiple: 1, updatedAt:1 } })
      .sort({ stockPrice: -1 }) // change metric if needed
      .limit(10)
      .toArray();

    return new Response(JSON.stringify({ success: true, leaderboard }), {
      status: 200,
      headers: corsHeaders(),
    });
  } catch (error) {
    console.error("❌ Error fetching leaderboard:", error);
    return new Response(JSON.stringify({ error: "Failed to load leaderboard" }), {
      status: 500,
      headers: corsHeaders(),
    });
  }
}
