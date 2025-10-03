import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb"; // <-- you should have a mongo connection util

// GET /api/users/:id
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db(); // change this

    const {id} = await params;

    // Fetch user with sessions
    const user = await db.collection("publicSpeaking").findOne({
      userId: id,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user sessions:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
