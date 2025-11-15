import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";


// ---------------------------------------------
// CORS CONFIG
// ---------------------------------------------
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-domain.com",   // add your domain
  "https://www.your-domain.com"
];

function getCorsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin)
      ? origin
      : "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true"
  };
}

// ---------------------------------------------
// Handle OPTIONS Preflight
// ---------------------------------------------
export async function OPTIONS(request) {
  const origin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin)
  });
}

// ---------------------------------------------
// POST Handler
// ---------------------------------------------
export async function POST(request) {
  const origin = request.headers.get("origin");

  try {
    const body = await request.json();

    const { participant, events, registrationDate } = body;

    // Validation
    if (!participant?.name || !participant?.email || !participant?.mobile) {
      return NextResponse.json(
        { success: false, message: "Missing personal details" },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    if (!events || events.length === 0) {
      return NextResponse.json(
        { success: false, message: "Please select at least one event" },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    // Save to DB
    const client = await clientPromise;
    const db = client.db();
    const exist  = await db.collection("registrations").findOne({ 'participant.email': participant.email })
    if(exist){
      return NextResponse.json(
        { success: false, message: "You have already registered!" },
        { status: 400, headers: getCorsHeaders(origin) }
      );
    }

    await db.collection("registrations").insertOne({
      participant,
      events,
      registrationDate,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Registration saved!" },
      { status: 200, headers: getCorsHeaders(origin) }
    );

  } catch (err) {
    console.error("❌ API ERROR:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Server error. Please try again."
      },
      { status: 500, headers: getCorsHeaders(origin) }
    );
  }
}
