import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const ALLOWED_ORIGIN = "https://studyroi.com";

/* ---------------- VALIDATORS ---------------- */

/* ---------------- CORS PREFLIGHT ---------------- */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

/* ---------------- POST ---------------- */
export async function POST(req) {
  try {
    const origin = req.headers.get("origin");
    if (origin !== ALLOWED_ORIGIN) {
      return NextResponse.json(
        { message: "Not allowed" },
        { status: 403 }
      );
    }

    const { email } = await req.json();

    

    if (!email )
      return NextResponse.json(
        { message: "Invalid email" },
        { status: 400 }
      );

    /* -------- DB INSERT -------- */
    const client = await clientPromise;
    const db = client.db();

    await db.collection("studyroi_email_requests").insertOne({
      email: email.trim(),
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
          "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
        },
      }
    );
  } catch (error) {
    console.error("CONTACT_API_ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
