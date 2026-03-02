import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

/* ---------------- CORS PREFLIGHT ---------------- */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

/* ---------------- POST ---------------- */
export async function POST(req) {
  try {
    const { email } = await req.json();

    /* -------- BASIC VALIDATION -------- */
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { message: "Invalid email" },
        { status: 400 }
      );
    }

    /* -------- DB INSERT -------- */
    const client = await clientPromise;
    const db = client.db(); // uses default DB from URI

    await db.collection("studyroi_email_requests").insertOne({
      email: email.trim().toLowerCase(),
      createdAt: new Date(),
      ip:
        req.headers.get("x-forwarded-for") ||
        req.headers.get("x-real-ip") ||
        "unknown",
    });

    return NextResponse.json(
      { message: "Form submitted successfully" },
      {
        status: 201,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("EMAIL_API_ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
