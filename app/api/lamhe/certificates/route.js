import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

/* ---------- CORS HEADERS ---------- */
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

/* ---------- PREFLIGHT ---------- */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/* ---------- POST ---------- */
export async function POST(req) {
  try {
    const { email, eventName } = await req.json();

    if (!email || !eventName) {
      return NextResponse.json(
        { success: false, message: "Email and event are required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("registrations");

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
        { status: 404, headers: corsHeaders }
      );
    }

    const event = record.events.find(e => e.name === eventName);

    let certificateName = record.participant.name;

    // ✅ IF EMAIL MATCHES A TEAM MEMBER
    if (event?.isTeamEvent && event.teamMembers?.length) {
      const teamMember = event.teamMembers.find(
        member => member.email === email
      );

      if (teamMember) {
        certificateName = teamMember.name;
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          name: certificateName,
          college: record.participant.college,
          eventName: event.name,
          position: "Participant",
          isTeamEvent: event.isTeamEvent || false,
        },
      },
      { headers: corsHeaders }
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
