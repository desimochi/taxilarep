import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db();

    const { searchParams } = new URL(request.url);

    // Pagination values
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit"))
    const skip = (page - 1) * limit;

    // Multi-select filters
    const days = searchParams.getAll("day");
    const events = searchParams.getAll("event");
    const team = searchParams.get("team");

    // Build MongoDB filter
    let filter = {};

    if (days.length > 0) {
      filter["events.day"] = { $in: days };
    }

    if (events.length > 0) {
      filter["events.name"] = { $in: events };
    }

    if (team === "true") {
      filter["events.isTeamEvent"] = true;
    }
    if (team === "false") {
      filter["events.isTeamEvent"] = false;
    }

    const collection = db.collection("registrations");

    // Count total docs (for frontend pagination)
    const totalItems = await collection.countDocuments(filter);

    // Apply pagination
    const registrations = await collection
      .find(filter)
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      filtersApplied: { days, events, team },
      data: registrations,
    });

  } catch (error) {
    console.error("Pagination API error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error", error },
      { status: 500 }
    );
  }
}
