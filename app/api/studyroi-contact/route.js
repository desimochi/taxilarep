import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

/* ---------------- VALIDATORS ---------------- */
const isValidName = (v) => typeof v === "string" && v.trim().length >= 2;
const isValidPhone = (v) => /^[6-9]\d{9}$/.test(v);
const isValidText = (v, min = 2) =>
  typeof v === "string" && v.trim().length >= min;

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
    const { name, phone, city, country, message } = await req.json();

    /* -------- VALIDATION -------- */
    if (!isValidName(name))
      return NextResponse.json({ message: "Invalid name" }, { status: 400 });

    if (!isValidPhone(phone))
      return NextResponse.json({ message: "Invalid phone" }, { status: 400 });

    if (!isValidText(city))
      return NextResponse.json({ message: "City required" }, { status: 400 });

    if (!isValidText(country))
      return NextResponse.json({ message: "Country required" }, { status: 400 });

    if (!isValidText(message, 10))
      return NextResponse.json(
        { message: "Message too short" },
        { status: 400 }
      );

    /* -------- DB INSERT -------- */
    const client = await clientPromise;
    const db = client.db();

    await db.collection("studyroi_contact_requests").insertOne({
      name: name.trim(),
      phone,
      city: city.trim(),
      country: country.trim(),
      message: message.trim(),
      source: "public",
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
    console.error("CONTACT_API_ERROR:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
