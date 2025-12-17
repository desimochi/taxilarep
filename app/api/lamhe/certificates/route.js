import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, eventName } = await req.json();

    if (!email || !eventName) {
      return NextResponse.json(
        { success: false, message: "Email and event are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("registrations"); // change if needed

    // Find by participant email OR team member email + event match
    const record = await collection.findOne({
      "events.name": eventName,
      $or: [
        { "participant.email": email },
        { "events.teamMembers.email": email },
      ],
    });

    if (!record) {
      return NextResponse.json(
        { success: false, message: "No record found" },
        { status: 404 }
      );
    }

    const event = record.events.find(e => e.name === eventName);

    return NextResponse.json({
      success: true,
      data: {
        name: record.participant.name,
        college: record.participant.college,
        eventName: event.name,
      },
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
